import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Trophy, Users, RefreshCw } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getPublicReviews } from '@/db/api';
import type { PublicReview, PublicReviewsResult } from '@/types/database';

// ─── Helpers ────────────────────────────────────────────────────────────────

/** Sanitize text for safe display – strips HTML tags and trims. */
function sanitize(text: string): string {
  return text.replace(/<[^>]*>/g, '').trim();
}

/** Format ISO date to human-readable string. */
function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  } catch {
    return '';
  }
}

// ─── Sub-components ─────────────────────────────────────────────────────────

function StarRating({ rating, size = 'sm' }: { rating: number; size?: 'sm' | 'md' | 'lg' }) {
  const sizeClass = size === 'lg' ? 'h-6 w-6' : size === 'md' ? 'h-5 w-5' : 'h-4 w-4';
  return (
    <div className="flex items-center gap-0.5" aria-label={`Rating: ${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          className={`${sizeClass} transition-colors duration-150 ${
            s <= rating ? 'fill-primary text-primary' : 'text-muted-foreground/30'
          }`}
        />
      ))}
    </div>
  );
}

function ReviewCard({
  review,
  index,
  isFeatured = false,
}: {
  review: PublicReview;
  index: number;
  isFeatured?: boolean;
}) {
  const name = sanitize(review.name);
  const text = sanitize(review.feedback_text);
  const date = formatDate(review.created_at);
  const initials = name.slice(0, 2).toUpperCase();

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.45, delay: Math.min(index * 0.08, 0.4), ease: [0.22, 1, 0.36, 1] }}
      className="h-full"
    >
      <Card
        className={`h-full flex flex-col border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
          isFeatured
            ? 'border-primary/50 bg-gradient-to-br from-primary/5 via-card to-accent/10 shadow-md shadow-primary/10'
            : 'border-border/60 bg-card hover:border-primary/30'
        }`}
      >
        <CardContent className="p-5 flex flex-col gap-3 h-full">
          {/* Top row: badge + date */}
          <div className="flex items-start justify-between gap-2">
            {isFeatured ? (
              <Badge className="bg-primary/10 text-primary border border-primary/30 text-xs font-semibold px-2 py-0.5 flex items-center gap-1 shrink-0">
                <Trophy className="h-3 w-3" />
                Featured Review
              </Badge>
            ) : (
              <span />
            )}
            {date && (
              <span className="text-xs text-muted-foreground shrink-0">{date}</span>
            )}
          </div>

          {/* Star rating */}
          <StarRating rating={review.rating} size={isFeatured ? 'md' : 'sm'} />

          {/* Review text */}
          <blockquote className="flex-1 text-sm md:text-base text-foreground/90 leading-relaxed italic text-pretty">
            "{text}"
          </blockquote>

          {/* Author */}
          <div className="flex items-center gap-2.5 mt-auto pt-3 border-t border-border/40">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/15 flex items-center justify-center">
              <span className="text-xs font-bold text-primary">{initials}</span>
            </div>
            <span className="text-sm font-semibold text-foreground truncate">— {name}</span>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function StatsBar({
  averageRating,
  totalCount,
}: {
  averageRating: number;
  totalCount: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 p-4 md:p-6 rounded-2xl bg-primary/8 border border-primary/20 mb-10"
    >
      {/* Average rating */}
      <div className="flex items-center gap-2">
        <span className="text-3xl md:text-4xl font-bold text-primary tabular-nums">
          {averageRating.toFixed(1)}
        </span>
        <div className="flex flex-col">
          <StarRating rating={Math.round(averageRating)} size="md" />
          <span className="text-xs text-muted-foreground mt-0.5">Average Rating</span>
        </div>
      </div>

      <div className="hidden sm:block w-px h-10 bg-border/60" />

      {/* Count */}
      <div className="flex items-center gap-2 text-muted-foreground">
        <Users className="h-5 w-5 text-primary/70" />
        <span className="text-sm md:text-base">
          Based on{' '}
          <strong className="text-foreground">{totalCount}</strong>{' '}
          customer review{totalCount !== 1 ? 's' : ''}
        </span>
      </div>
    </motion.div>
  );
}

function EmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="text-center py-16 px-4"
    >
      <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-5">
        <span className="text-4xl" role="img" aria-label="Gift">🎁</span>
      </div>
      <p className="text-lg md:text-xl font-semibold text-foreground mb-2">
        Be the first customer to share your experience with Apani Dukan!
      </p>
      <p className="text-sm text-muted-foreground max-w-sm mx-auto">
        Your feedback helps us serve the Akole community better.
      </p>
    </motion.div>
  );
}

// ─── JSON-LD Schema ──────────────────────────────────────────────────────────

function ReviewSchema({ data }: { data: PublicReviewsResult }) {
  if (data.totalCount === 0) return null;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Apani Dukan',
    description: 'Gift store in Akole, Maharashtra offering gifts, stationery, home décor, and festival items.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Mahalaxmi Mathuranagar Colony',
      addressLocality: 'Akole',
      addressRegion: 'Maharashtra',
      postalCode: '422601',
      addressCountry: 'IN',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: data.averageRating.toFixed(1),
      reviewCount: data.totalCount,
      bestRating: '5',
      worstRating: '1',
    },
    review: data.reviews.slice(0, 10).map((r) => ({
      '@type': 'Review',
      author: { '@type': 'Person', name: sanitize(r.name) },
      reviewRating: {
        '@type': 'Rating',
        ratingValue: String(r.rating),
        bestRating: '5',
        worstRating: '1',
      },
      reviewBody: sanitize(r.feedback_text),
      datePublished: r.created_at.split('T')[0],
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────

export default function CustomerReviews() {
  const [data, setData] = useState<PublicReviewsResult>({
    reviews: [],
    averageRating: 0,
    totalCount: 0,
    featuredReview: null,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchReviews = useCallback(async () => {
    setLoading(true);
    setError(false);
    try {
      const result = await getPublicReviews();
      setData(result);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  // Non-featured reviews = everything after the first (featured) entry
  const otherReviews = data.reviews.slice(1);

  return (
    <section
      id="customer-reviews"
      aria-label="Customer Reviews"
      className="py-16 xl:py-24 bg-gradient-to-br from-background via-accent/5 to-primary/5 overflow-hidden"
    >
      {/* JSON-LD structured data */}
      <ReviewSchema data={data} />

      <div className="container px-4 xl:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-10 xl:mb-14"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 xl:w-20 xl:h-20 rounded-full bg-primary/10 mb-5">
            <span className="text-3xl xl:text-4xl">⭐</span>
          </div>
          <h2 className="text-2xl md:text-3xl xl:text-4xl font-bold text-foreground mb-3 text-balance">
            What Our Customers Say
          </h2>
          <p className="text-sm md:text-base text-muted-foreground max-w-xl mx-auto text-pretty">
            Real feedback from happy customers of Apani Dukan.
          </p>
        </motion.div>

        {/* Loading skeleton */}
        <AnimatePresence mode="wait">
          {loading && (
            <motion.div
              key="skeleton"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5"
            >
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="h-52 rounded-xl bg-muted animate-pulse"
                />
              ))}
            </motion.div>
          )}

          {/* Error state */}
          {!loading && error && (
            <motion.div
              key="error"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-12 space-y-4"
            >
              <p className="text-muted-foreground text-sm">
                Could not load reviews right now. Please try again.
              </p>
              <button
                onClick={fetchReviews}
                className="inline-flex items-center gap-2 text-sm text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-primary rounded"
              >
                <RefreshCw className="h-4 w-4" />
                Retry
              </button>
            </motion.div>
          )}

          {/* Content */}
          {!loading && !error && (
            <motion.div
              key="content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {data.totalCount === 0 ? (
                <EmptyState />
              ) : (
                <>
                  {/* Stats bar */}
                  <StatsBar
                    averageRating={data.averageRating}
                    totalCount={data.totalCount}
                  />

                  {/* Featured review (full width) */}
                  {data.featuredReview && (
                    <div className="mb-6 max-w-2xl mx-auto">
                      <ReviewCard
                        review={data.featuredReview}
                        index={0}
                        isFeatured
                      />
                    </div>
                  )}

                  {/* Other reviews grid */}
                  {otherReviews.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                      {otherReviews.map((review, idx) => (
                        <ReviewCard
                          key={review.id}
                          review={review}
                          index={idx + 1}
                        />
                      ))}
                    </div>
                  )}
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
