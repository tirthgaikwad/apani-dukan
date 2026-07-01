import { supabase } from './supabase';
import type { 
  Festival, 
  Product, 
  ProductWithFestival, 
  Feedback, 
  FeedbackFormData,
  PublicReview,
  PublicReviewsResult,
  Testimonial,
  Announcement 
} from '@/types/database';

// ============================================
// FESTIVALS API
// ============================================

/**
 * Get all festivals
 */
export async function getAllFestivals(): Promise<Festival[]> {
  const { data, error } = await supabase
    .from('festivals')
    .select('*')
    .order('name');

  if (error) {
    console.error('Error fetching festivals:', error);
    return [];
  }

  return Array.isArray(data) ? data : [];
}

/**
 * Get festival by slug
 */
export async function getFestivalBySlug(slug: string): Promise<Festival | null> {
  const { data, error } = await supabase
    .from('festivals')
    .select('*')
    .eq('slug', slug)
    .maybeSingle();

  if (error) {
    console.error('Error fetching festival:', error);
    return null;
  }

  return data;
}

// ============================================
// PRODUCTS API
// ============================================

/**
 * Get all available products
 */
export async function getAllProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('is_available', true)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching products:', error);
    return [];
  }

  return Array.isArray(data) ? data : [];
}

/**
 * Get products by festival slug
 */
export async function getProductsByFestival(festivalSlug: string): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select(`
      *,
      festival:festivals!inner(slug)
    `)
    .eq('festival.slug', festivalSlug)
    .eq('is_available', true)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching products by festival:', error);
    return [];
  }

  return Array.isArray(data) ? data : [];
}

/**
 * Get products with festival information
 */
export async function getProductsWithFestival(): Promise<ProductWithFestival[]> {
  const { data, error } = await supabase
    .from('products')
    .select(`
      *,
      festival:festivals(*)
    `)
    .eq('is_available', true)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching products with festival:', error);
    return [];
  }

  return Array.isArray(data) ? data : [];
}

/**
 * Search products by keyword
 */
export async function searchProducts(query: string): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('is_available', true)
    .or(`name.ilike.%${query}%,description.ilike.%${query}%,category.ilike.%${query}%`)
    .order('created_at', { ascending: false })
    .limit(20);

  if (error) {
    console.error('Error searching products:', error);
    return [];
  }

  return Array.isArray(data) ? data : [];
}

// ============================================
// FEEDBACK API
// ============================================

/**
 * Submit customer feedback
 */
export async function submitFeedback(feedbackData: FeedbackFormData): Promise<{ success: boolean; error?: string }> {
  // Validate required fields before hitting the DB
  if (!feedbackData.name?.trim()) {
    return { success: false, error: 'Name is required.' };
  }
  if (!feedbackData.rating || feedbackData.rating < 1 || feedbackData.rating > 5) {
    return { success: false, error: 'Rating must be between 1 and 5.' };
  }
  if (!feedbackData.feedback?.trim()) {
    return { success: false, error: 'Feedback message is required.' };
  }

  const payload = {
    name: feedbackData.name.trim(),
    rating: feedbackData.rating,
    feedback_text: feedbackData.feedback.trim(),
    phone: feedbackData.phone?.trim() || null,
    is_approved: false,
  };

  const { error } = await supabase
    .from('feedback')
    .insert(payload);

  if (error) {
    // Surface full Supabase error details for debugging
    console.error('[submitFeedback] Supabase insert failed:', {
      message: error.message,
      code: error.code,
      details: error.details,
      hint: error.hint,
      payload,
    });
    return {
      success: false,
      error: `Database error (${error.code}): ${error.message}`,
    };
  }

  console.info('[submitFeedback] Feedback saved successfully for:', payload.name);
  return { success: true };
}

/**
 * Get public customer reviews (rating >= 3), sorted by rating desc then date desc.
 * Computes average rating and total count from the same result set.
 * The featured review is the highest-rated, most-recent entry.
 */
export async function getPublicReviews(): Promise<PublicReviewsResult> {
  const { data, error } = await supabase
    .from('feedback')
    .select('id, name, rating, feedback_text, created_at')
    .gte('rating', 3)
    .order('rating', { ascending: false })
    .order('created_at', { ascending: false })
    .limit(50);

  if (error) {
    console.error('[getPublicReviews] Supabase fetch failed:', {
      message: error.message,
      code: error.code,
    });
    return { reviews: [], averageRating: 0, totalCount: 0, featuredReview: null };
  }

  const reviews: PublicReview[] = Array.isArray(data)
    ? data.filter(
        (r) =>
          r.feedback_text?.trim().length >= 5 &&
          r.name?.trim().length > 0
      )
    : [];

  const totalCount = reviews.length;
  const averageRating =
    totalCount > 0
      ? Math.round((reviews.reduce((sum, r) => sum + r.rating, 0) / totalCount) * 10) / 10
      : 0;

  // Featured = highest rating first, then most recent (already sorted that way)
  const featuredReview = reviews.length > 0 ? reviews[0] : null;

  return { reviews, averageRating, totalCount, featuredReview };
}

// ============================================
// TESTIMONIALS API
// ============================================

/**
 * Get all active testimonials
 */
export async function getActiveTestimonials(): Promise<Testimonial[]> {
  const { data, error } = await supabase
    .from('testimonials')
    .select('*')
    .eq('is_active', true)
    .order('display_order', { ascending: true })
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching testimonials:', error);
    return [];
  }

  return Array.isArray(data) ? data : [];
}

/**
 * Get limited testimonials for homepage
 */
export async function getFeaturedTestimonials(limit: number = 5): Promise<Testimonial[]> {
  const { data, error } = await supabase
    .from('testimonials')
    .select('*')
    .eq('is_active', true)
    .order('display_order', { ascending: true })
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Error fetching featured testimonials:', error);
    return [];
  }

  return Array.isArray(data) ? data : [];
}

// ============================================
// ANNOUNCEMENTS API
// ============================================

/**
 * Get active announcements
 */
export async function getActiveAnnouncements(): Promise<Announcement[]> {
  const { data, error } = await supabase
    .from('announcements')
    .select('*')
    .eq('is_active', true)
    .or('expires_at.is.null,expires_at.gt.' + new Date().toISOString())
    .order('priority', { ascending: false })
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching announcements:', error);
    return [];
  }

  return Array.isArray(data) ? data : [];
}

/**
 * Get top announcement for display
 */
export async function getTopAnnouncement(): Promise<Announcement | null> {
  const { data, error } = await supabase
    .from('announcements')
    .select('*')
    .eq('is_active', true)
    .or('expires_at.is.null,expires_at.gt.' + new Date().toISOString())
    .order('priority', { ascending: false })
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) {
    console.error('Error fetching top announcement:', error);
    return null;
  }

  return data;
}
