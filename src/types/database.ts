// Database Types
export interface Festival {
  id: string;
  name: string;
  emoji: string;
  description: string;
  season: string;
  slug: string;
  created_at: string;
}

export interface Product {
  id: string;
  product_id: string;
  festival_id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  emoji: string;
  keywords: string[];
  image_url: string | null;
  is_available: boolean;
  created_at: string;
  updated_at: string;
}

export interface ProductWithFestival extends Product {
  festival: Festival;
}

export interface Feedback {
  id: string;
  name: string;
  rating: number;
  feedback_text: string;
  phone: string | null;
  is_approved: boolean;
  created_at: string;
}

export interface Testimonial {
  id: string;
  customer_name: string;
  rating: number;
  testimonial_text: string;
  location: string;
  is_active: boolean;
  display_order: number;
  created_at: string;
}

export interface Announcement {
  id: string;
  message_en: string;
  message_mr: string;
  is_active: boolean;
  priority: number;
  created_at: string;
  expires_at: string | null;
}

// Form submission types
export interface FeedbackFormData {
  name: string;
  rating: number;
  feedback: string;
  phone?: string;
}

// Customer Reviews Showcase types
export interface PublicReview {
  id: string;
  name: string;
  rating: number;
  feedback_text: string;
  created_at: string;
}

export interface PublicReviewsResult {
  reviews: PublicReview[];
  averageRating: number;
  totalCount: number;
  featuredReview: PublicReview | null;
}
