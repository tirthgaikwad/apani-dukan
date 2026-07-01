import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const UPSTREAM_URL =
  "https://app-93a4xgnxzu2p-api-VaOwP8E7dJqa.gateway.appmedo.com/v1beta/models/gemini-2.5-flash:streamGenerateContent?alt=sse";

// Structured logger — never logs the API key
function log(level: "INFO" | "WARN" | "ERROR", message: string, meta?: Record<string, unknown>) {
  const entry = {
    timestamp: new Date().toISOString(),
    level,
    message,
    ...(meta ?? {}),
  };
  if (level === "ERROR") console.error(JSON.stringify(entry));
  else console.log(JSON.stringify(entry));
}

// Call upstream once; returns the raw Response
async function callUpstream(contents: unknown[], apiKey: string): Promise<Response> {
  return fetch(UPSTREAM_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Gateway-Authorization": `Bearer ${apiKey}`,
    },
    body: JSON.stringify({ contents }),
  });
}

// Sleep helper
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

serve(async (req: Request): Promise<Response> => {
  const requestId = crypto.randomUUID().slice(0, 8);

  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: CORS_HEADERS });
  }

  if (req.method !== "POST") {
    log("WARN", "Method not allowed", { requestId, method: req.method });
    return new Response(JSON.stringify({ error: "Method Not Allowed" }), {
      status: 405,
      headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
    });
  }

  // Parse and validate request body
  let contents: unknown[];
  try {
    const body = await req.json();
    contents = body.contents;
    if (!Array.isArray(contents) || contents.length === 0) {
      throw new Error("Missing or empty contents");
    }
  } catch {
    log("WARN", "Invalid request body", { requestId });
    return new Response(JSON.stringify({ error: "Invalid request body" }), {
      status: 400,
      headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
    });
  }

  // Retrieve platform-managed API key (never logged)
  const apiKey = Deno.env.get("INTEGRATIONS_API_KEY");
  if (!apiKey) {
    log("ERROR", "INTEGRATIONS_API_KEY not set", { requestId });
    return new Response(JSON.stringify({ error: "Server configuration error" }), {
      status: 500,
      headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
    });
  }

  log("INFO", "AI request received", { requestId });

  // Auto-retry on 429: up to 2 attempts with 4-second back-off between them
  const MAX_ATTEMPTS = 2;
  const RETRY_DELAY_MS = 4_000;
  let upstream: Response | null = null;

  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    try {
      upstream = await callUpstream(contents, apiKey);
    } catch (err) {
      log("ERROR", "Upstream connection failed", { requestId, attempt, error: String(err) });
      if (attempt === MAX_ATTEMPTS) {
        return new Response(JSON.stringify({ error: "AI service temporarily unavailable. Please try again shortly." }), {
          status: 502,
          headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
        });
      }
      await sleep(RETRY_DELAY_MS);
      continue;
    }

    log("INFO", "Upstream responded", { requestId, attempt, status: upstream.status });

    if (upstream.status === 429) {
      if (attempt < MAX_ATTEMPTS) {
        log("WARN", "Rate limited by upstream, retrying after delay", { requestId, attempt, retryAfterMs: RETRY_DELAY_MS });
        await sleep(RETRY_DELAY_MS);
        continue;
      }
      // All retries exhausted
      log("ERROR", "Rate limit persists after all retries", { requestId });
      return new Response(
        JSON.stringify({ error: "AI is busy right now. Please wait a few seconds and try again." }),
        { status: 429, headers: { ...CORS_HEADERS, "Content-Type": "application/json" } }
      );
    }

    if (upstream.status === 402) {
      log("ERROR", "Upstream quota exhausted", { requestId });
      return new Response(
        JSON.stringify({ error: "AI service unavailable right now. Please try again later." }),
        { status: 402, headers: { ...CORS_HEADERS, "Content-Type": "application/json" } }
      );
    }

    if (!upstream.ok || !upstream.body) {
      log("ERROR", "Non-OK upstream response", { requestId, status: upstream.status });
      return new Response(
        JSON.stringify({ error: `AI service error (${upstream.status}). Please try again.` }),
        { status: 502, headers: { ...CORS_HEADERS, "Content-Type": "application/json" } }
      );
    }

    // Success — stream through
    log("INFO", "Streaming response to client", { requestId });
    return new Response(upstream.body, {
      headers: {
        ...CORS_HEADERS,
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        "X-Content-Type-Options": "nosniff",
      },
    });
  }

  // Should never reach here
  return new Response(JSON.stringify({ error: "Unexpected error. Please try again." }), {
    status: 500,
    headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
  });
});
