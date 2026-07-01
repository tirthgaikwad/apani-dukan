import { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Gift, Sparkles, ArrowLeft, RotateCcw, MessageCircle,
  Trophy, Star, TrendingUp, Bookmark, BookmarkCheck, ChevronRight, Zap, Clock
} from 'lucide-react';
import { sendStreamRequest } from '@/lib/sse';

// ─── Constants ───────────────────────────────────────────────────────────────

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as string;
const WHATSAPP_NUMBER = '919XXXXXXXXX'; // replace with actual number
const STORAGE_KEY = 'apani_dukan_last_recommendation';
const COOLDOWN_SECONDS = 15; // seconds to wait before retrying after an AI error

const OCCASIONS = [
  { label: 'Birthday', emoji: '🎂' },
  { label: 'Anniversary', emoji: '💕' },
  { label: "Valentine's Day", emoji: '💝' },
  { label: 'Raksha Bandhan', emoji: '🪢' },
  { label: 'Diwali', emoji: '🪔' },
  { label: 'Ganesh Chaturthi', emoji: '🐘' },
  { label: 'Holi', emoji: '🎨' },
  { label: 'Friendship Day', emoji: '🤝' },
  { label: 'Congratulations', emoji: '🎉' },
  { label: 'Housewarming', emoji: '🏠' },
  { label: 'Other', emoji: '✨' },
];

const RECIPIENTS = [
  { label: 'Friend', emoji: '👫' },
  { label: 'Girlfriend', emoji: '💃' },
  { label: 'Boyfriend', emoji: '🕺' },
  { label: 'Husband', emoji: '👨' },
  { label: 'Wife', emoji: '👩' },
  { label: 'Brother', emoji: '👦' },
  { label: 'Sister', emoji: '👧' },
  { label: 'Parents', emoji: '👨‍👩‍👧' },
  { label: 'Child', emoji: '🧒' },
  { label: 'Teacher', emoji: '👩‍🏫' },
  { label: 'Colleague', emoji: '💼' },
  { label: 'Other', emoji: '😊' },
];

const BUDGETS = [
  { label: 'Under ₹200', emoji: '💚' },
  { label: '₹200 – ₹500', emoji: '💛' },
  { label: '₹500 – ₹1000', emoji: '🧡' },
  { label: '₹1000 – ₹2500', emoji: '❤️' },
  { label: '₹2500+', emoji: '💜' },
];

const PERSONALITIES = [
  { label: 'Funny', emoji: '😄' },
  { label: 'Romantic', emoji: '❤️' },
  { label: 'Traditional', emoji: '🙏' },
  { label: 'Creative', emoji: '🎨' },
  { label: 'Stylish', emoji: '✨' },
  { label: 'Professional', emoji: '💼' },
  { label: 'Spiritual', emoji: '🪔' },
];

const STEPS = [
  { question: '🎉 What are you celebrating?', options: OCCASIONS },
  { question: '👤 Who is this gift for?', options: RECIPIENTS },
  { question: '💰 What\'s your budget?', options: BUDGETS },
  { question: '🎭 Describe the person.', options: PERSONALITIES },
];

const TRENDING_GIFTS = [
  { name: 'Diwali Gift Hamper', price: '₹999', emoji: '🪔', tag: 'Best Seller' },
  { name: 'Personalized Photo Frame', price: '₹499', emoji: '🖼️', tag: 'Trending' },
  { name: 'Chocolate Gift Box', price: '₹349', emoji: '🍫', tag: 'Popular' },
  { name: 'Scented Candle Set', price: '₹599', emoji: '🕯️', tag: 'New' },
  { name: 'Premium Rakhi Combo', price: '₹799', emoji: '🪢', tag: 'Hot' },
];

// ─── Local Fallback Data ──────────────────────────────────────────────────────

type FallbackKey = string;
const FALLBACK_CATALOG: Record<FallbackKey, RecommendationResult> = {
  // Occasion → Birthday
  'Birthday|Friend': {
    primaryGift: { name: 'Personalized Friendship Photo Frame', priceRange: '₹399 – ₹599', why: 'A custom photo frame with your shared memories makes every birthday unforgettable for a close friend.', confidence: '88' },
    alternativeGift: { name: 'Chocolate & Dry Fruit Gift Box', priceRange: '₹299 – ₹499', why: 'A sweet, shareable treat that\'s perfect for celebrating together.' },
    premiumUpgrade: { name: 'Luxury Perfume & Accessories Set', priceRange: '₹1200 – ₹1800', why: 'Upgrade to a premium fragrance set for a truly memorable birthday gift.' },
  },
  'Birthday|Girlfriend': {
    primaryGift: { name: 'Romantic Jewellery Gift Set', priceRange: '₹799 – ₹1500', why: 'A beautiful jewellery set shows thoughtfulness and makes her feel truly special on her birthday.', confidence: '92' },
    alternativeGift: { name: 'Scented Candle & Spa Kit', priceRange: '₹499 – ₹799', why: 'A relaxing spa set she can enjoy at home — practical and romantic.' },
    premiumUpgrade: { name: 'Gold-Plated Pendant Necklace', priceRange: '₹2000 – ₹3500', why: 'A luxurious gold-plated piece she\'ll treasure for years to come.' },
  },
  'Birthday|Sister': {
    primaryGift: { name: 'Skincare Gift Hamper', priceRange: '₹599 – ₹999', why: 'A curated skincare set she can pamper herself with — thoughtful and practical.', confidence: '86' },
    alternativeGift: { name: 'Stylish Tote Bag', priceRange: '₹349 – ₹599', why: 'A fashionable everyday bag she\'ll use and love.' },
    premiumUpgrade: { name: 'Premium Handbag & Wallet Combo', priceRange: '₹1500 – ₹2500', why: 'A premium accessory set she\'ll proudly carry every day.' },
  },
  'Birthday|Parents': {
    primaryGift: { name: 'Silver-Plated Puja Thali Set', priceRange: '₹799 – ₹1200', why: 'A traditional silver-plated puja set honours your parents with devotion and elegance.', confidence: '90' },
    alternativeGift: { name: 'Dry Fruits Premium Box', priceRange: '₹499 – ₹799', why: 'A healthy and wholesome gift that expresses love and care.' },
    premiumUpgrade: { name: 'Personalised Family Portrait', priceRange: '₹2000 – ₹3000', why: 'A beautifully painted family portrait they\'ll display with pride.' },
  },
  // Occasion → Diwali
  'Diwali|Friend': {
    primaryGift: { name: 'Diwali Sweet & Dry Fruit Hamper', priceRange: '₹599 – ₹999', why: 'A festive hamper full of sweets and dry fruits is the most cherished Diwali gift for a dear friend.', confidence: '94' },
    alternativeGift: { name: 'Decorative Diya Set (Pack of 12)', priceRange: '₹199 – ₹399', why: 'Hand-painted diyas light up their home and keep your friendship glowing.' },
    premiumUpgrade: { name: 'Premium Gift Hamper with Chocolates & Nuts', priceRange: '₹1200 – ₹2000', why: 'An indulgent hamper that makes a grand Diwali statement.' },
  },
  'Diwali|Colleague': {
    primaryGift: { name: 'Corporate Diwali Dry Fruit Box', priceRange: '₹499 – ₹899', why: 'A tasteful dry fruit assortment is the ideal professional Diwali gift — appreciated by everyone.', confidence: '91' },
    alternativeGift: { name: 'Scented Candle Gift Set', priceRange: '₹349 – ₹599', why: 'Elegant candles add warmth to any workspace or home during the festival.' },
    premiumUpgrade: { name: 'Premium Corporate Hamper with Sweets & Diary', priceRange: '₹1500 – ₹2500', why: 'A thoughtfully curated corporate hamper that leaves a lasting impression.' },
  },
  // Occasion → Anniversary
  'Anniversary|Wife': {
    primaryGift: { name: 'Gold-Plated Rose with Jewellery Box', priceRange: '₹1200 – ₹2000', why: 'A timeless gold rose paired with a jewellery box is deeply romantic — a keepsake she\'ll treasure.', confidence: '93' },
    alternativeGift: { name: 'Romantic Candle Light Dinner Setup Kit', priceRange: '₹799 – ₹1200', why: 'Create a magical evening at home with a curated romantic dinner kit.' },
    premiumUpgrade: { name: 'Diamond-Studded Pendant Set', priceRange: '₹3000 – ₹5000', why: 'A sparkling diamond pendant that says forever — the ultimate anniversary gift.' },
  },
  'Anniversary|Husband': {
    primaryGift: { name: 'Personalised Couple Photo Book', priceRange: '₹799 – ₹1299', why: 'A beautifully printed photo book of your journey together is a gift straight from the heart.', confidence: '90' },
    alternativeGift: { name: 'Premium Leather Wallet', priceRange: '₹599 – ₹999', why: 'A quality leather wallet he\'ll use every day — practical and stylish.' },
    premiumUpgrade: { name: 'Luxury Men\'s Grooming Kit', priceRange: '₹1800 – ₹2800', why: 'A premium grooming set that makes him feel pampered and appreciated.' },
  },
  // Occasion → Raksha Bandhan
  'Raksha Bandhan|Brother': {
    primaryGift: { name: 'Premium Rakhi with Chocolate Box', priceRange: '₹299 – ₹599', why: 'A designer Rakhi paired with his favourite chocolates — the classic Raksha Bandhan combo.', confidence: '95' },
    alternativeGift: { name: 'Gaming Accessories Pouch Set', priceRange: '₹399 – ₹699', why: 'Perfect for a tech-savvy brother who loves gaming.' },
    premiumUpgrade: { name: 'Rakhi Hamper with Dry Fruits & Watch', priceRange: '₹1500 – ₹2500', why: 'A grand Raksha Bandhan hamper that shows how much you truly care.' },
  },
  'Raksha Bandhan|Sister': {
    primaryGift: { name: 'Designer Jewellery & Rakhi Set', priceRange: '₹499 – ₹899', why: 'A gorgeous jewellery set alongside a beautiful Rakhi — your sister will feel absolutely cherished.', confidence: '93' },
    alternativeGift: { name: 'Personalised Nameplate Keychain + Chocolates', priceRange: '₹299 – ₹499', why: 'A sweet and personal gift she can carry with her every day.' },
    premiumUpgrade: { name: 'Premium Handbag & Cosmetics Hamper', priceRange: '₹2000 – ₹3000', why: 'A luxury gifting set your sister will brag about to all her friends.' },
  },
  // Housewarming
  'Housewarming|Friend': {
    primaryGift: { name: 'Decorative Ganesh Idol (Brass)', priceRange: '₹599 – ₹1200', why: 'A beautiful Ganesh idol blesses their new home with prosperity — a timeless housewarming gift.', confidence: '90' },
    alternativeGift: { name: 'Scented Candle & Home Fragrance Set', priceRange: '₹499 – ₹799', why: 'Elegant candles make any new home feel warm and inviting from day one.' },
    premiumUpgrade: { name: 'Premium Home Décor Hamper (Vase + Photo Frame + Candles)', priceRange: '₹1500 – ₹2500', why: 'A curated home décor set that turns their new house into a stylish home.' },
  },
};

// Default fallback used when no specific match is found
const DEFAULT_FALLBACK: RecommendationResult = {
  primaryGift: { name: 'Personalised Gift Hamper', priceRange: '₹499 – ₹999', why: 'A thoughtfully curated hamper from Apani Dukan, tailored to make your special occasion truly memorable.', confidence: '85' },
  alternativeGift: { name: 'Decorative Photo Frame', priceRange: '₹299 – ₹499', why: 'A beautiful frame to capture and display your most cherished memories.' },
  premiumUpgrade: { name: 'Premium Gift Box with Sweets & Dry Fruits', priceRange: '₹999 – ₹1800', why: 'A premium indulgent gift box that impresses on any occasion.' },
};

function getFallbackResult(
  occasion: string,
  recipient: string,
  budget: string
): RecommendationResult {
  // Try specific occasion+recipient match first
  const key = `${occasion}|${recipient}`;
  if (FALLBACK_CATALOG[key]) return { ...FALLBACK_CATALOG[key], occasion, recipient, budget };

  // Try occasion-only match with a generic recipient
  const genericKeys = Object.keys(FALLBACK_CATALOG).filter((k) => k.startsWith(`${occasion}|`));
  if (genericKeys.length > 0) return { ...FALLBACK_CATALOG[genericKeys[0]], occasion, recipient, budget };

  return { ...DEFAULT_FALLBACK, occasion, recipient, budget };
}

// ─── Types ────────────────────────────────────────────────────────────────────

interface GiftItem {
  name: string;
  priceRange: string;
  why: string;
  confidence?: string;
}

interface RecommendationResult {
  primaryGift: GiftItem;
  alternativeGift: GiftItem;
  premiumUpgrade: GiftItem;
  occasion?: string;
  recipient?: string;
  budget?: string;
}

// ─── Confetti Component ───────────────────────────────────────────────────────

function ConfettiPop() {
  const pieces = Array.from({ length: 18 });
  const colors = ['#F59E0B', '#EF4444', '#10B981', '#3B82F6', '#8B5CF6', '#EC4899'];
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {pieces.map((_, i) => {
        const color = colors[i % colors.length];
        const left = `${(i / pieces.length) * 100}%`;
        const delay = (i * 0.06) % 0.8;
        const size = 8 + (i % 3) * 4;
        return (
          <motion.div
            key={i}
            className="absolute top-4 rounded-sm"
            style={{ left, width: size, height: size, background: color, opacity: 0.9 }}
            initial={{ y: 0, scale: 0, rotate: 0 }}
            animate={{ y: [0, -80, 200], scale: [0, 1, 0.8], rotate: [0, 180, 360], opacity: [0, 1, 0] }}
            transition={{ duration: 1.8, delay, ease: 'easeOut' }}
          />
        );
      })}
    </div>
  );
}

// ─── Progress Bar ─────────────────────────────────────────────────────────────

function ProgressBar({ step, total }: { step: number; total: number }) {
  const pct = Math.round(((step) / total) * 100);
  return (
    <div className="mb-5">
      <div className="flex justify-between text-xs text-amber-400/70 mb-1.5 font-medium">
        <span>Step {step} of {total}</span>
        <span>{pct}% complete</span>
      </div>
      <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-amber-400 to-orange-500"
          initial={false}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </div>
  );
}

// ─── Option Card ──────────────────────────────────────────────────────────────

function OptionCard({
  label, emoji, selected, onClick,
}: { label: string; emoji: string; selected: boolean; onClick: () => void }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.03, y: -2 }}
      whileTap={{ scale: 0.96 }}
      className={`
        relative flex items-center gap-2.5 px-3.5 py-3 rounded-xl border text-sm font-medium
        transition-all duration-200 text-left min-h-[52px] focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400
        ${selected
          ? 'bg-amber-400/20 border-amber-400 text-amber-300 shadow-lg shadow-amber-400/20'
          : 'bg-white/5 border-white/10 text-white/80 hover:bg-white/10 hover:border-white/25 hover:text-white'}
      `}
      aria-pressed={selected}
    >
      <span className="text-xl shrink-0 leading-none">{emoji}</span>
      <span className="truncate">{label}</span>
      {selected && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="ml-auto shrink-0 w-5 h-5 rounded-full bg-amber-400 flex items-center justify-center"
        >
          <span className="text-black text-xs font-bold">✓</span>
        </motion.div>
      )}
    </motion.button>
  );
}

// ─── Gift Result Card ─────────────────────────────────────────────────────────

function GiftCard({
  gift, variant, index,
}: {
  gift: GiftItem;
  variant: 'primary' | 'alternative' | 'premium';
  index: number;
}) {
  const configs = {
    primary: {
      label: '🎯 Perfect Match',
      bg: 'bg-gradient-to-br from-amber-500/20 via-orange-500/10 to-amber-400/5',
      border: 'border-amber-400/50',
      badge: 'bg-amber-400 text-black',
    },
    alternative: {
      label: '🔄 Alternative',
      bg: 'bg-white/5',
      border: 'border-white/15',
      badge: 'bg-white/20 text-white',
    },
    premium: {
      label: '👑 Premium Upgrade',
      bg: 'bg-gradient-to-br from-purple-500/10 to-pink-500/5',
      border: 'border-purple-400/40',
      badge: 'bg-purple-500/80 text-white',
    },
  };
  const cfg = configs[variant];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className={`rounded-2xl border p-4 ${cfg.bg} ${cfg.border}`}
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${cfg.badge}`}>
          {cfg.label}
        </span>
        {variant === 'primary' && gift.confidence && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: 'spring', stiffness: 300 }}
            className="text-xs font-bold bg-green-500/20 text-green-400 border border-green-500/30 px-2 py-1 rounded-full"
          >
            {gift.confidence}% Match
          </motion.span>
        )}
      </div>
      <h4 className="font-bold text-white text-base mb-1 text-balance">{gift.name}</h4>
      <p className="text-amber-300 font-semibold text-sm mb-2">{gift.priceRange}</p>
      <p className="text-white/65 text-xs leading-relaxed text-pretty">{gift.why}</p>
    </motion.div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function GiftConcierge() {
  const [phase, setPhase] = useState<'intro' | 'steps' | 'loading' | 'results'>('intro');
  const [currentStep, setCurrentStep] = useState(0);
  const [selections, setSelections] = useState<string[]>([]);
  const [result, setResult] = useState<RecommendationResult | null>(null);
  const [isFallback, setIsFallback] = useState(false);
  const [streamBuffer, setStreamBuffer] = useState('');
  const [aiError, setAiError] = useState<string | null>(null);
  const [cooldown, setCooldown] = useState(0);          // seconds remaining
  const [followUpInput, setFollowUpInput] = useState('');
  const [showFollowUp, setShowFollowUp] = useState(false);
  const [saved, setSaved] = useState(false);
  const [hasSaved, setHasSaved] = useState(false);
  const [showSavedBanner, setShowSavedBanner] = useState(false);

  // Refs for dedup & abort
  const abortRef = useRef<AbortController | null>(null);
  const inFlightRef = useRef(false);          // prevents duplicate simultaneous calls
  const cooldownTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Check for saved recommendation on mount
  useEffect(() => {
    const entry = localStorage.getItem(STORAGE_KEY);
    if (entry) setHasSaved(true);
  }, []);

  // Countdown ticker — clears itself when it reaches 0
  const startCooldown = useCallback(() => {
    if (cooldownTimerRef.current) clearInterval(cooldownTimerRef.current);
    setCooldown(COOLDOWN_SECONDS);
    cooldownTimerRef.current = setInterval(() => {
      setCooldown((prev) => {
        if (prev <= 1) {
          clearInterval(cooldownTimerRef.current!);
          cooldownTimerRef.current = null;
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, []);

  // Clean up timer on unmount
  useEffect(() => () => {
    if (cooldownTimerRef.current) clearInterval(cooldownTimerRef.current);
  }, []);

  const parseResult = useCallback((raw: string): RecommendationResult | null => {
    try {
      const jsonMatch = raw.match(/\{[\s\S]*\}/);
      if (!jsonMatch) return null;
      const parsed = JSON.parse(jsonMatch[0]);
      if (!parsed.primaryGift || !parsed.alternativeGift || !parsed.premiumUpgrade) return null;
      return parsed as RecommendationResult;
    } catch {
      return null;
    }
  }, []);

  const callAI = useCallback(
    async (occasion: string, recipient: string, budget: string, personality: string) => {
      // ── Dedup guard: block if a request is already running ──
      if (inFlightRef.current) {
        console.log(`[GiftConcierge] ${new Date().toISOString()} — duplicate call blocked`);
        return;
      }
      // ── Cooldown guard: block rapid retries ──
      if (cooldown > 0) {
        console.log(`[GiftConcierge] ${new Date().toISOString()} — in cooldown (${cooldown}s remaining)`);
        return;
      }

      inFlightRef.current = true;
      setPhase('loading');
      setStreamBuffer('');
      setAiError(null);
      setIsFallback(false);

      abortRef.current = new AbortController();

      const systemPrompt = `You are the AI Gift Concierge for Apani Dukan, a beloved local gift shop in Akole, Maharashtra, India.

Customer Details:
- Occasion: ${occasion}
- Recipient: ${recipient}
- Budget: ${budget}
- Personality: ${personality}

Recommend thoughtful, culturally-relevant gifts available at a local Indian gift shop. Be warm, specific, and practical.

Respond ONLY with valid JSON in this exact structure (no markdown, no explanation outside JSON):
{
  "primaryGift": {
    "name": "Specific gift name",
    "priceRange": "₹XXX – ₹XXX",
    "why": "2-3 sentence personalized explanation",
    "confidence": "92"
  },
  "alternativeGift": {
    "name": "Specific gift name",
    "priceRange": "₹XXX – ₹XXX",
    "why": "1-2 sentence explanation"
  },
  "premiumUpgrade": {
    "name": "Premium gift name",
    "priceRange": "₹XXX – ₹XXX",
    "why": "1-2 sentence explanation of luxury appeal"
  }
}`;

      let accumulated = '';
      const reqStart = Date.now();

      await sendStreamRequest({
        functionUrl: `${SUPABASE_URL}/functions/v1/large-language-model`,
        requestBody: {
          contents: [{ role: 'user', parts: [{ text: systemPrompt }] }],
        },
        supabaseAnonKey: SUPABASE_ANON_KEY,
        onData: (chunk) => {
          try {
            const parsed = JSON.parse(chunk);
            const text = parsed?.candidates?.[0]?.content?.parts?.[0]?.text ?? '';
            if (text) {
              accumulated += text;
              setStreamBuffer(accumulated);
            }
          } catch {
            // incomplete SSE frame — skip
          }
        },
        onComplete: () => {
          inFlightRef.current = false;
          const durationMs = Date.now() - reqStart;
          const res = parseResult(accumulated);
          if (res) {
            console.log(JSON.stringify({ timestamp: new Date().toISOString(), status: 200, message: 'AI stream complete', durationMs }));
            setResult({ ...res, occasion, recipient, budget });
            setAiError(null);
            setPhase('results');
          } else {
            // AI responded but JSON was malformed → show fallback silently
            console.warn(JSON.stringify({ timestamp: new Date().toISOString(), status: 200, message: 'AI response unparseable — using fallback', durationMs }));
            setIsFallback(true);
            setResult(getFallbackResult(occasion, recipient, budget));
            setAiError(null);
            setPhase('results');
          }
        },
        onError: (err) => {
          inFlightRef.current = false;
          const durationMs = Date.now() - reqStart;
          const isRateLimit = err?.message?.toLowerCase().includes('busy') ||
            err?.message?.toLowerCase().includes('too many') ||
            err?.message?.includes('429');
          console.error(JSON.stringify({ timestamp: new Date().toISOString(), status: isRateLimit ? 429 : 500, message: err?.message, durationMs }));

          // Always show fallback recommendations so the user gets something useful
          setIsFallback(true);
          setResult(getFallbackResult(occasion, recipient, budget));

          // Show a friendly error banner and start cooldown
          const friendlyMsg = isRateLimit
            ? 'AI is busy right now — showing our best curated picks instead.'
            : 'AI is unavailable — here are our top recommendations for you.';
          setAiError(friendlyMsg);
          setPhase('results');  // go to results even on error (fallback is shown)
          startCooldown();
        },
        signal: abortRef.current.signal,
      });
    },
    [parseResult, cooldown, startCooldown]
  );

  const handleSelect = useCallback(
    (label: string) => {
      if (inFlightRef.current) return;          // block if mid-request
      const newSelections = [...selections];
      newSelections[currentStep] = label;
      setSelections(newSelections);

      if (currentStep < STEPS.length - 1) {
        setTimeout(() => setCurrentStep((s) => s + 1), 200);
      } else {
        const [occasion, recipient, budget, personality] = newSelections;
        callAI(occasion, recipient, budget, personality);
      }
    },
    [currentStep, selections, callAI]
  );

  const handleSurpriseMe = useCallback(() => {
    if (inFlightRef.current || cooldown > 0) return;
    const pick = (arr: { label: string }[]) => arr[Math.floor(Math.random() * arr.length)].label;
    const occasion = pick(OCCASIONS);
    const recipient = pick(RECIPIENTS);
    const budget = pick(BUDGETS);
    const personality = pick(PERSONALITIES);
    setSelections([occasion, recipient, budget, personality]);
    callAI(occasion, recipient, budget, personality);
  }, [callAI, cooldown]);

  const handleStartOver = useCallback(() => {
    abortRef.current?.abort();
    inFlightRef.current = false;
    if (cooldownTimerRef.current) { clearInterval(cooldownTimerRef.current); cooldownTimerRef.current = null; }
    setCooldown(0);
    setPhase('intro');
    setCurrentStep(0);
    setSelections([]);
    setResult(null);
    setStreamBuffer('');
    setAiError(null);
    setIsFallback(false);
    setShowFollowUp(false);
    setSaved(false);
  }, []);

  const handleSave = useCallback(() => {
    if (!result) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(result));
    setSaved(true);
    setHasSaved(true);
    setShowSavedBanner(true);
    setTimeout(() => setShowSavedBanner(false), 3000);
  }, [result]);

  const handleLoadSaved = useCallback(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    try {
      const savedResult = JSON.parse(raw) as RecommendationResult;
      setResult(savedResult);
      setPhase('results');
    } catch {
      localStorage.removeItem(STORAGE_KEY);
      setHasSaved(false);
    }
  }, []);

  const buildWhatsAppMessage = () => {
    if (!result) return `https://wa.me/${WHATSAPP_NUMBER}?text=Hi! I need help with a gift from Apani Dukan.`;
    const msg = encodeURIComponent(
      `Hi Apani Dukan! 🎁\n\nI'm looking for a gift for ${result.recipient || 'someone special'} on ${result.occasion || 'a special occasion'}.\n\nRecommendation: *${result.primaryGift.name}* (${result.primaryGift.priceRange})\n\nCan you help me get this? 😊`
    );
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`;
  };

  const isLoading = phase === 'loading' && !aiError;

  // ─── Render Phases ────────────────────────────────────────────────────────

  return (
    <section
      id="gift-concierge"
      aria-label="AI Gift Concierge"
      className="relative py-8 md:py-12 overflow-hidden"
      style={{
        background:
          'linear-gradient(135deg, hsl(0 0% 6%) 0%, hsl(30 25% 8%) 50%, hsl(0 0% 5%) 100%)',
      }}
    >
      {/* Decorative background glows */}
      <div
        className="pointer-events-none absolute -top-24 -left-24 w-96 h-96 rounded-full opacity-20 blur-3xl z-0"
        style={{ background: 'radial-gradient(circle, hsl(45 100% 50%), transparent 70%)' }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-24 -right-24 w-80 h-80 rounded-full opacity-15 blur-3xl z-0"
        style={{ background: 'radial-gradient(circle, hsl(270 60% 60%), transparent 70%)' }}
        aria-hidden
      />

      <div className="container relative z-10 px-4 xl:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-6 md:mb-8"
        >
          <div className="inline-flex items-center gap-2 bg-amber-400/10 border border-amber-400/30 rounded-full px-4 py-1.5 mb-4">
            <Sparkles className="h-3.5 w-3.5 text-amber-400" />
            <span className="text-amber-400 text-xs font-semibold tracking-wide uppercase">
              Powered by AI
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl xl:text-4xl font-bold text-white mb-2 text-balance">
            🎁 Find the Perfect Gift
          </h2>
          <p className="text-white/60 text-sm md:text-base max-w-xl mx-auto text-pretty">
            Let our AI Gift Concierge help you discover the perfect gift in under 30 seconds.
          </p>
        </motion.div>

        <div className="max-w-2xl mx-auto">
          {/* ── Glassmorphism Card ── */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="relative rounded-3xl border border-white/10 overflow-hidden"
            style={{
              background: 'rgba(255,255,255,0.04)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              boxShadow: '0 8px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.06) inset',
            }}
          >
            <div className="p-5 md:p-7">
              <AnimatePresence mode="wait">
                {/* ── INTRO ── */}
                {phase === 'intro' && (
                  <motion.div
                    key="intro"
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    transition={{ duration: 0.35 }}
                  >
                    <div className="text-center mb-6">
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-amber-400/15 border border-amber-400/30 mb-4">
                        <Gift className="h-8 w-8 text-amber-400" />
                      </div>
                      <p className="text-white/70 text-sm">
                        Answer 4 quick questions and our AI will suggest the <strong className="text-white">perfect gift</strong> for your occasion.
                      </p>
                    </div>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 mb-5">
                      <motion.button
                        whileHover={isLoading ? {} : { scale: 1.02, y: -1 }}
                        whileTap={isLoading ? {} : { scale: 0.97 }}
                        onClick={() => !isLoading && setPhase('steps')}
                        disabled={isLoading}
                        className={`flex-1 flex items-center justify-center gap-2 py-3.5 px-5 rounded-xl font-bold text-sm shadow-lg shadow-amber-400/25 transition-all
                          ${isLoading ? 'opacity-50 cursor-not-allowed bg-amber-400/50 text-black' : 'bg-gradient-to-r from-amber-400 to-orange-500 text-black'}`}
                      >
                        <Gift className="h-4 w-4" />
                        Find My Perfect Gift
                        <ChevronRight className="h-4 w-4" />
                      </motion.button>
                      <motion.button
                        whileHover={isLoading || cooldown > 0 ? {} : { scale: 1.02, y: -1 }}
                        whileTap={isLoading || cooldown > 0 ? {} : { scale: 0.97 }}
                        onClick={handleSurpriseMe}
                        disabled={isLoading || cooldown > 0}
                        className={`flex-1 flex items-center justify-center gap-2 py-3.5 px-5 rounded-xl border font-semibold text-sm transition-all
                          ${isLoading || cooldown > 0
                            ? 'opacity-50 cursor-not-allowed bg-white/5 border-white/10 text-white/50'
                            : 'bg-white/8 border-white/15 text-white hover:bg-white/12 hover:border-white/25'}`}
                      >
                        {cooldown > 0 ? (
                          <><Clock className="h-4 w-4 text-amber-400" /> Wait {cooldown}s</>
                        ) : (
                          <><Zap className="h-4 w-4 text-amber-400" /> 🎁 Surprise Me</>
                        )}
                      </motion.button>
                    </div>

                    {/* Saved recommendation restore */}
                    {hasSaved && (
                      <motion.button
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        onClick={handleLoadSaved}
                        className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-dashed border-amber-400/30 text-amber-400/80 text-xs hover:border-amber-400/60 hover:text-amber-400 transition-all"
                      >
                        <BookmarkCheck className="h-3.5 w-3.5" />
                        View Last Recommendation
                      </motion.button>
                    )}

                    {/* Error from previous attempt */}
                    {aiError && (
                      <p className="mt-3 text-center text-red-400 text-xs">{aiError}</p>
                    )}
                  </motion.div>
                )}

                {/* ── STEPS ── */}
                {phase === 'steps' && (
                  <motion.div
                    key={`step-${currentStep}`}
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -40 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <ProgressBar step={currentStep + 1} total={STEPS.length} />

                    {/* Back button */}
                    {currentStep > 0 && (
                      <motion.button
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        onClick={() => setCurrentStep((s) => s - 1)}
                        className="flex items-center gap-1.5 text-white/50 text-xs hover:text-white/80 transition-colors mb-3"
                      >
                        <ArrowLeft className="h-3.5 w-3.5" />
                        Back
                      </motion.button>
                    )}

                    <h3 className="text-white font-bold text-lg mb-4 text-balance">
                      {STEPS[currentStep].question}
                    </h3>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                      {STEPS[currentStep].options.map(({ label, emoji }) => (
                        <OptionCard
                          key={label}
                          label={label}
                          emoji={emoji}
                          selected={selections[currentStep] === label}
                          onClick={() => handleSelect(label)}
                        />
                      ))}
                    </div>

                    {aiError && (
                      <p className="mt-3 text-center text-red-400 text-xs">{aiError}</p>
                    )}
                  </motion.div>
                )}

                {/* ── LOADING ── */}
                {phase === 'loading' && (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ duration: 0.35 }}
                    className="py-10 text-center"
                  >
                    <div className="relative inline-flex items-center justify-center w-20 h-20 mb-5">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                        className="absolute inset-0 rounded-full border-2 border-amber-400/30 border-t-amber-400"
                      />
                      <Gift className="h-9 w-9 text-amber-400" />
                    </div>
                    <h3 className="text-white font-bold text-lg mb-2">
                      Finding the perfect gift…
                    </h3>
                    <p className="text-white/50 text-sm max-w-xs mx-auto">
                      Our AI is analysing your preferences. This usually takes a few seconds.
                    </p>
                    {streamBuffer && (
                      <p className="mt-4 text-white/30 text-xs animate-pulse">
                        Processing response...
                      </p>
                    )}
                  </motion.div>
                )}

                {/* ── RESULTS ── */}
                {phase === 'results' && result && (
                  <motion.div
                    key="results"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="relative"
                  >
                    {!isFallback && <ConfettiPop />}

                    {/* Fallback / AI-busy notice */}
                    {isFallback && aiError && (
                      <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-start gap-2.5 bg-amber-400/8 border border-amber-400/25 rounded-xl px-4 py-3 mb-4"
                      >
                        <span className="text-base shrink-0 mt-0.5">⚡</span>
                        <div className="flex-1 min-w-0">
                          <p className="text-amber-300 text-xs font-semibold mb-0.5">
                            Showing curated picks
                          </p>
                          <p className="text-white/55 text-xs text-pretty">{aiError}</p>
                        </div>
                        {cooldown > 0 && (
                          <span className="shrink-0 flex items-center gap-1 text-amber-400 text-xs font-bold">
                            <Clock className="h-3.5 w-3.5" />
                            {cooldown}s
                          </span>
                        )}
                      </motion.div>
                    )}

                    {/* Header */}
                    <div className="flex items-center justify-between mb-5">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <Trophy className="h-4 w-4 text-amber-400" />
                          <span className="text-amber-400 text-xs font-semibold uppercase tracking-wide">
                            {isFallback ? 'Curated For You' : 'Recommended For You'}
                          </span>
                        </div>
                        {result.occasion && (
                          <p className="text-white/50 text-xs">
                            For {result.recipient} • {result.occasion}
                            {result.budget ? ` • ${result.budget}` : ''}
                          </p>
                        )}
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleSave}
                        className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border transition-all ${
                          saved
                            ? 'bg-amber-400/15 border-amber-400/40 text-amber-400'
                            : 'border-white/15 text-white/50 hover:border-white/30 hover:text-white/80'
                        }`}
                      >
                        {saved ? <BookmarkCheck className="h-3.5 w-3.5" /> : <Bookmark className="h-3.5 w-3.5" />}
                        {saved ? 'Saved' : 'Save'}
                      </motion.button>
                    </div>

                    {/* Gift cards */}
                    <div className="space-y-3 mb-5">
                      <GiftCard gift={result.primaryGift} variant="primary" index={0} />
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <GiftCard gift={result.alternativeGift} variant="alternative" index={1} />
                        <GiftCard gift={result.premiumUpgrade} variant="premium" index={2} />
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="flex flex-col sm:flex-row gap-2.5 mb-4">
                      <motion.a
                        href={buildWhatsAppMessage()}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.02, y: -1 }}
                        whileTap={{ scale: 0.97 }}
                        className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-green-600 hover:bg-green-500 text-white font-semibold text-sm transition-all shadow-lg shadow-green-600/25"
                      >
                        <span>📲</span> Order on WhatsApp
                      </motion.a>
                      {isFallback && cooldown > 0 ? (
                        // Retry AI button with countdown
                        <motion.button
                          disabled
                          className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-white/5 border border-white/10 text-white/40 font-semibold text-sm cursor-not-allowed"
                        >
                          <Clock className="h-4 w-4" />
                          Retry AI in {cooldown}s
                        </motion.button>
                      ) : isFallback ? (
                        // Retry AI button (cooldown expired)
                        <motion.button
                          whileHover={{ scale: 1.02, y: -1 }}
                          whileTap={{ scale: 0.97 }}
                          onClick={() => {
                            const [occ, rec, bud, per] = selections;
                            if (occ && rec && bud && per) callAI(occ, rec, bud, per);
                          }}
                          className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-amber-400/15 border border-amber-400/40 text-amber-300 font-semibold text-sm hover:bg-amber-400/25 transition-all"
                        >
                          <Sparkles className="h-4 w-4" /> Try AI Again
                        </motion.button>
                      ) : (
                        <motion.button
                          whileHover={{ scale: 1.02, y: -1 }}
                          whileTap={{ scale: 0.97 }}
                          onClick={() => setShowFollowUp((v) => !v)}
                          className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-white/8 border border-white/15 text-white font-semibold text-sm hover:bg-white/12 transition-all"
                        >
                          <MessageCircle className="h-4 w-4" /> Ask AI More
                        </motion.button>
                      )}
                    </div>

                    {/* Follow-up input */}
                    <AnimatePresence>
                      {showFollowUp && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden mb-4"
                        >
                          <div className="flex gap-2">
                            <input
                              value={followUpInput}
                              onChange={(e) => setFollowUpInput(e.target.value)}
                              placeholder="e.g. Can you suggest something eco-friendly?"
                              className="flex-1 bg-white/8 border border-white/15 rounded-xl px-4 py-2.5 text-white text-sm placeholder-white/30 focus:outline-none focus:border-amber-400/50 transition-colors"
                            />
                            <motion.button
                              whileTap={{ scale: 0.95 }}
                              onClick={() => {
                                if (!followUpInput.trim()) return;
                                const msg = encodeURIComponent(
                                  `Hi Apani Dukan! I need help with: ${followUpInput}`
                                );
                                window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, '_blank');
                                setFollowUpInput('');
                                setShowFollowUp(false);
                              }}
                              className="px-4 py-2.5 rounded-xl bg-amber-400 text-black font-bold text-sm"
                            >
                              Ask
                            </motion.button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Start over */}
                    <motion.button
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={handleStartOver}
                      className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-dashed border-white/15 text-white/50 text-xs hover:border-white/30 hover:text-white/70 transition-all"
                    >
                      <RotateCcw className="h-3.5 w-3.5" /> Start Over
                    </motion.button>

                    {/* Saved banner */}
                    <AnimatePresence>
                      {showSavedBanner && (
                        <motion.div
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 8 }}
                          className="mt-3 text-center text-xs text-amber-400 font-medium"
                        >
                          ✅ Recommendation saved! You can view it next time you visit.
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* ── Trending Gifts ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-5"
          >
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="h-4 w-4 text-orange-400" />
              <span className="text-white/70 text-sm font-semibold">
                🔥 Most Popular Choices This Week
              </span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
              {TRENDING_GIFTS.map((gift, i) => (
                <motion.div
                  key={gift.name}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.35 + i * 0.06 }}
                  className="flex flex-col items-start gap-2 h-full bg-white/4 border border-white/8 rounded-xl p-3 hover:bg-white/7 hover:border-white/15 transition-all"
                >
                  {/* Icon */}
                  <span className="text-2xl leading-none shrink-0">{gift.emoji}</span>

                  {/* Text block — fills remaining height so tag always sits at bottom */}
                  <div className="flex flex-col flex-1 gap-1 min-w-0 w-full">
                    <p className="text-white/90 text-xs font-semibold leading-snug line-clamp-2 text-balance">
                      {gift.name}
                    </p>
                    <p className="text-amber-400 text-xs font-bold mt-auto pt-1">{gift.price}</p>
                    <span className="self-start text-[10px] font-medium text-white/50 bg-white/8 border border-white/10 px-2 py-0.5 rounded-full mt-0.5">
                      {gift.tag}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* ── Stars trust bar ── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-4 flex flex-wrap items-center justify-center gap-3 text-white/35 text-xs"
          >
            <div className="flex items-center gap-1">
              {[1,2,3,4,5].map((s) => (
                <Star key={s} className="h-3 w-3 fill-amber-400 text-amber-400" />
              ))}
              <span className="ml-1">4.9/5</span>
            </div>
            <span>•</span>
            <span>Personalized recommendations</span>
            <span>•</span>
            <span>Free gift guidance</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
