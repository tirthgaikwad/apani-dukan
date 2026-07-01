# Apani Dukan - Database Documentation

## Overview
This application uses **Supabase** as the backend database to store and manage all application data including products, festivals, customer feedback, testimonials, and announcements.

## Database Schema

### Tables

#### 1. **festivals**
Stores information about different festivals and occasions.

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| name | TEXT | Festival name (e.g., "Diwali", "Valentine's Day") |
| emoji | TEXT | Festival emoji icon |
| description | TEXT | Short description |
| season | TEXT | When the festival occurs |
| slug | TEXT | URL-friendly identifier (unique) |
| created_at | TIMESTAMPTZ | Creation timestamp |

**Sample Data:**
- Diwali, Valentine's Day, Raksha Bandhan, Birthdays, Ganesh Chaturthi, Holi

---

#### 2. **products**
Stores all gift products available in the store.

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| product_id | TEXT | Unique product identifier (e.g., "diw-001") |
| festival_id | UUID | Foreign key to festivals table |
| name | TEXT | Product name |
| description | TEXT | Product description |
| price | INTEGER | Price in rupees |
| category | TEXT | Product category |
| emoji | TEXT | Product emoji icon |
| keywords | TEXT[] | Search keywords array |
| image_url | TEXT | Product image URL (nullable) |
| is_available | BOOLEAN | Availability status |
| created_at | TIMESTAMPTZ | Creation timestamp |
| updated_at | TIMESTAMPTZ | Last update timestamp |

**Sample Products:**
- 24 products across 6 festivals
- Categories: Romantic Gifts, Festival Decorations, Religious Items, Party Supplies, etc.

---

#### 3. **feedback**
Stores customer feedback submissions from the website.

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| name | TEXT | Customer name |
| rating | INTEGER | Rating (1-5 stars) |
| feedback_text | TEXT | Feedback message |
| phone | TEXT | Phone number (optional) |
| is_approved | BOOLEAN | Admin approval status |
| created_at | TIMESTAMPTZ | Submission timestamp |

**Privacy:** Customers cannot read feedback (write-only for privacy). Only admins can approve feedback for display.

---

#### 4. **testimonials**
Stores approved customer testimonials for public display.

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| customer_name | TEXT | Customer name |
| rating | INTEGER | Rating (1-5 stars) |
| testimonial_text | TEXT | Testimonial message |
| location | TEXT | Customer location (default: "Akole") |
| is_active | BOOLEAN | Display status |
| display_order | INTEGER | Sort order for display |
| created_at | TIMESTAMPTZ | Creation timestamp |

**Sample Data:**
- 5 testimonials from local Akole customers
- All with 5-star ratings

---

#### 5. **announcements**
Stores promotional announcements for the announcement bar.

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| message_en | TEXT | English message |
| message_mr | TEXT | Marathi message |
| is_active | BOOLEAN | Active status |
| priority | INTEGER | Display priority (higher = shown first) |
| created_at | TIMESTAMPTZ | Creation timestamp |
| expires_at | TIMESTAMPTZ | Expiration date (nullable) |

**Sample Data:**
- Festival special offers
- Limited time promotions

---

## Row Level Security (RLS) Policies

### Public Access (No Authentication Required)

#### Festivals
- ✅ **SELECT**: Public can read all festivals

#### Products
- ✅ **SELECT**: Public can read available products (`is_available = true`)

#### Feedback
- ✅ **INSERT**: Public can submit feedback
- ❌ **SELECT**: No public read access (privacy protection)

#### Testimonials
- ✅ **SELECT**: Public can read active testimonials (`is_active = true`)

#### Announcements
- ✅ **SELECT**: Public can read active, non-expired announcements

---

## API Functions

All database queries are encapsulated in `/src/db/api.ts`:

### Festivals API
```typescript
getAllFestivals(): Promise<Festival[]>
getFestivalBySlug(slug: string): Promise<Festival | null>
```

### Products API
```typescript
getAllProducts(): Promise<Product[]>
getProductsByFestival(festivalSlug: string): Promise<Product[]>
getProductsWithFestival(): Promise<ProductWithFestival[]>
searchProducts(query: string): Promise<Product[]>
```

### Feedback API
```typescript
submitFeedback(data: FeedbackFormData): Promise<{ success: boolean; error?: string }>
```

### Testimonials API
```typescript
getActiveTestimonials(): Promise<Testimonial[]>
getFeaturedTestimonials(limit: number): Promise<Testimonial[]>
```

### Announcements API
```typescript
getActiveAnnouncements(): Promise<Announcement[]>
getTopAnnouncement(): Promise<Announcement | null>
```

---

## TypeScript Types

All database types are defined in `/src/types/database.ts`:

```typescript
interface Festival { ... }
interface Product { ... }
interface ProductWithFestival { ... }
interface Feedback { ... }
interface Testimonial { ... }
interface Announcement { ... }
interface FeedbackFormData { ... }
```

---

## Components Using Database

### 1. **FeedbackForm** (`/src/components/FeedbackForm.tsx`)
- Submits customer feedback to `feedback` table
- Shows success/error toast notifications
- Resets form after successful submission

### 2. **Testimonials** (`/src/components/sections/Testimonials.tsx`)
- Fetches and displays active testimonials
- Shows loading skeleton while fetching
- Displays up to 5 featured testimonials

### 3. **AnnouncementBar** (`/src/components/AnnouncementBar.tsx`)
- Fetches active announcements
- Rotates through announcements every 5 seconds
- Supports bilingual messages (English/Marathi)

---

## Database Connection

Supabase client is initialized in `/src/db/supabase.ts`:

```typescript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

Environment variables are stored in `.env`:
```
VITE_SUPABASE_URL=https://zodscqkdmxckrqhngdkt.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## Data Management

### Adding New Products
```sql
INSERT INTO products (product_id, festival_id, name, description, price, category, emoji, keywords)
VALUES ('new-001', (SELECT id FROM festivals WHERE slug = 'diwali'), 'New Product', 'Description', 599, 'Category', '🎁', ARRAY['keyword1', 'keyword2']);
```

### Adding New Testimonials
```sql
INSERT INTO testimonials (customer_name, rating, testimonial_text, location, is_active, display_order)
VALUES ('Customer Name', 5, 'Great experience!', 'Akole', true, 1);
```

### Adding New Announcements
```sql
INSERT INTO announcements (message_en, message_mr, is_active, priority)
VALUES ('English message', 'मराठी संदेश', true, 1);
```

### Approving Feedback
```sql
-- View pending feedback
SELECT * FROM feedback WHERE is_approved = false ORDER BY created_at DESC;

-- Approve feedback and convert to testimonial
INSERT INTO testimonials (customer_name, rating, testimonial_text, location, is_active, display_order)
SELECT name, rating, feedback_text, 'Akole', true, 0
FROM feedback
WHERE id = 'feedback-uuid-here';

-- Mark as approved
UPDATE feedback SET is_approved = true WHERE id = 'feedback-uuid-here';
```

---

## Performance Optimizations

### Indexes
- `idx_products_festival` - Fast product queries by festival
- `idx_products_available` - Fast filtering of available products
- `idx_feedback_approved` - Fast feedback approval queries
- `idx_testimonials_active` - Fast active testimonial queries
- `idx_announcements_active` - Fast active announcement queries

### Query Patterns
- Use `.maybeSingle()` instead of `.single()` to avoid errors
- Always use `.order()` with `.limit()` for pagination
- Return arrays safely: `Array.isArray(data) ? data : []`
- Protect against null values in components

---

## Future Enhancements

### Potential Features
1. **Admin Dashboard** - Manage products, testimonials, and announcements
2. **Product Images** - Upload product images to Supabase Storage
3. **Inventory Management** - Track stock levels
4. **Order Management** - Store customer orders
5. **Analytics** - Track popular products and customer behavior
6. **Email Notifications** - Send email on feedback submission
7. **Search Functionality** - Full-text search across products

### Storage Integration
For product images, use Supabase Storage:
```typescript
// Upload image
const { data, error } = await supabase.storage
  .from('product-images')
  .upload(`products/${productId}.jpg`, file);

// Get public URL
const { data: urlData } = supabase.storage
  .from('product-images')
  .getPublicUrl(`products/${productId}.jpg`);

// Update product with image URL
await supabase
  .from('products')
  .update({ image_url: urlData.publicUrl })
  .eq('id', productId);
```

---

## Troubleshooting

### Common Issues

**Issue: "Row Level Security policy violation"**
- Solution: Check RLS policies are correctly set up
- Verify the operation is allowed for public/anon role

**Issue: "Cannot read properties of null"**
- Solution: Always check for null/undefined before accessing properties
- Use optional chaining: `data?.field`

**Issue: "Duplicate key value violates unique constraint"**
- Solution: Check for existing records before inserting
- Use unique identifiers (product_id, slug)

**Issue: "Foreign key constraint violation"**
- Solution: Ensure referenced records exist (e.g., festival_id exists in festivals table)

---

## Database URL

**Supabase Project:** zodscqkdmxckrqhngdkt  
**Region:** us-west-1  
**Endpoint:** https://zodscqkdmxckrqhngdkt.supabase.co  
**Status:** ACTIVE_HEALTHY

---

## Support

For database-related issues:
1. Check Supabase dashboard logs
2. Review RLS policies
3. Verify environment variables
4. Check network connectivity
5. Review API error messages in browser console

---

**Last Updated:** 2026-01-21  
**Database Version:** PostgreSQL 15  
**Supabase Version:** Latest
