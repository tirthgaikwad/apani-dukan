import ky, { type AfterResponseHook } from 'ky';
import { createParser } from 'eventsource-parser';

export interface SSEOptions {
  onData: (data: string) => void;
  onEvent?: (event: unknown) => void;
  onCompleted?: (error?: Error) => void;
  onAborted?: () => void;
}

export function createSSEHook(options: SSEOptions): AfterResponseHook {
  return async (request, _opts, response) => {
    // Handle non-2xx responses with meaningful messages (ky throwHttpErrors is disabled)
    if (!response.ok) {
      let message = `Request failed (${response.status})`;
      if (response.status === 429) {
        message = 'Too many requests — please wait a moment and try again.';
      } else if (response.status === 402) {
        message = 'AI service unavailable right now. Please try again later.';
      } else {
        try {
          const body = await response.clone().text();
          const parsed = JSON.parse(body);
          if (parsed?.error) message = parsed.error;
        } catch { /* ignore parse errors */ }
      }
      options.onCompleted?.(new Error(message));
      return;
    }
    if (!response.body) return;

    let done = false;
    const finish = (err?: Error) => {
      if (!done) {
        done = true;
        options.onCompleted?.(err);
      }
    };

    const reader = response.body.getReader();
    const decoder = new TextDecoder('utf8');
    const parser = createParser({
      onEvent: (event) => {
        if (!event.data) return;
        options.onEvent?.(event);
        for (const chunk of event.data.split('\n')) options.onData(chunk);
      },
    });

    const read = (): void => {
      reader
        .read()
        .then(({ done: streamDone, value }) => {
          if (streamDone) {
            finish();
            return;
          }
          parser.feed(decoder.decode(value, { stream: true }));
          read();
        })
        .catch((err: Error) => {
          if (request.signal?.aborted) {
            options.onAborted?.();
            return;
          }
          finish(err);
        });
    };
    read();
    return response;
  };
}

export interface StreamRequestOptions {
  functionUrl: string;
  requestBody: unknown;
  supabaseAnonKey: string;
  onData: (data: string) => void;
  onComplete: () => void;
  onError: (error: Error) => void;
  signal?: AbortSignal;
}

export async function sendStreamRequest(options: StreamRequestOptions): Promise<void> {
  const { functionUrl, requestBody, supabaseAnonKey, onData, onComplete, onError, signal } =
    options;

  const sseHook = createSSEHook({
    onData,
    onCompleted: (err) => (err ? onError(err) : onComplete()),
    onAborted: () => console.log('[sse] Stream aborted'),
  });

  try {
    await ky.post(functionUrl, {
      json: requestBody,
      headers: {
        Authorization: `Bearer ${supabaseAnonKey}`,
        apikey: supabaseAnonKey,
        'Content-Type': 'application/json',
      },
      signal,
      timeout: 90_000,
      throwHttpErrors: false,
      hooks: { afterResponse: [sseHook] },
    });
  } catch (err) {
    if (!signal?.aborted) onError(err as Error);
  }
}
