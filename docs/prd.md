# Requirements Document

## 1. Project Overview

### 1.1 Application Name
Apani Dukan

### 1.2 Application Description
A high-conversion, mobile-first business website for a local Indian gift shop located in Akole, Maharashtra. The website aims to build trust, attract walk-in customers, enable WhatsApp inquiries, and highlight festival & custom gifts with warm, Indian, and modern design aesthetics. The website features dedicated festival pages with clickable navigation, product showcases with images and pricing, an AI Gift Assistant accessible via popup window, announcement bar, downloadable catalogs, customer feedback form with backend data storage, dynamic customer reviews showcase section, bilingual support (Marathi + English), and a flagship AI Gift Concierge feature for personalized gift recommendations.

### 1.3 Tagline
Aapli Aapli, Apani Dukan

### 1.4 Business Type
Gift Store & More (gifts, stationery, festival items, home décor, custom surprises)

### 1.5 Business Address
Mahalaxmi Mathuranagar Colony, Akole, Maharashtra – 422601

---

## 2. Website Goals
- Build trust for a local business
- Attract walk-in customers
- Enable WhatsApp inquiries
- Highlight festival & custom gifts
- Create a warm, Indian, and modern feel
- Provide dedicated festival shopping experiences
- Increase customer engagement through AI-powered gift recommendations
- Improve conversion rates via intelligent product suggestions
- Create urgency with festival announcements
- Enable easy catalog sharing for bulk buyers
- Build local trust through Marathi language support
- Collect and persistently store genuine customer feedback to improve services
- Showcase authentic customer reviews to build credibility and trust
- Deliver personalized gift recommendations in under 30 seconds via AI Gift Concierge

---

## 3. Design Requirements

### 3.1 Visual Style
- Clean, modern, premium UI
- Indian color palette: saffron, warm yellow, white, soft green accents
- Festival-specific colors per dedicated page
- Smooth animations & hover effects
- Card hover animations
- Rounded cards with soft shadows
- Attractive hero section with clear CTAs
- Smooth transitions between pages
- Glassmorphism effects for premium features
- Dark theme with gold/saffron accents for AI Gift Concierge

### 3.2 Responsive Design
- Fully responsive (mobile-first approach)
- Optimized for all screen sizes
- Optimized for low-end mobile devices

### 3.3 Typography
- Modern fonts: Poppins or Inter

---

## 4. Website Structure & Content

### 4.1 AI Gift Concierge (NEW FLAGSHIP FEATURE)

#### 4.1.1 Section Placement
- **Position**: TOP of homepage, above all other sections
- **Visibility**: Immediately visible on landing
- **Purpose**: Deliver personalized gift recommendations in under 30 seconds

#### 4.1.2 Main Card Design
- **Title**: 🎁 Find the Perfect Gift
- **Subtitle**: Let our AI Gift Concierge help you discover the perfect gift in under 30 seconds.
- **Visual Style**:
  - Glassmorphism card effect
  - Rounded corners with soft shadows
  - Dark theme with gold/saffron palette matching Apani Dukan branding
  - Premium modern aesthetic
  - Mobile-friendly layout
  - Smooth animations on load

#### 4.1.3 4-Step Guided Flow

**Flow Structure:**
- Display one step at a time
- Progress indicator at top showing current step (1/4, 2/4, 3/4, 4/4)
- Smooth fade+slide transitions between steps
- Large clickable option cards
- Mobile: One question per screen, large touch targets (minimum 44x44px)

**Step 1 — Occasion:**
- Question: 🎉 What are you celebrating?
- Options (large clickable cards):
  - Birthday
  - Anniversary
  - Valentine's Day
  - Raksha Bandhan
  - Diwali
  - Ganesh Chaturthi
  - Holi
  - Friendship Day
  - Congratulations
  - Housewarming
  - Other

**Step 2 — Recipient:**
- Question: 👤 Who is this gift for?
- Options:
  - Friend
  - Girlfriend
  - Boyfriend
  - Husband
  - Wife
  - Brother
  - Sister
  - Parents
  - Child
  - Teacher
  - Colleague
  - Other

**Step 3 — Budget:**
- Question: 💰 What's your budget?
- Options:
  - Under ₹200
  - ₹200–₹500
  - ₹500–₹1000
  - ₹1000–₹2500
  - ₹2500+

**Step 4 — Personality:**
- Question: 🎭 Describe the person.
- Options (with emoji):
  - Funny 😄
  - Romantic ❤️
  - Traditional 🙏
  - Creative 🎨
  - Stylish ✨
  - Professional 💼
  - Spiritual 🪔

#### 4.1.4 AI Integration

**Backend Processing:**
- After Step 4 completion, call Edge Function `large-language-model` via SSE streaming
- Edge Function endpoint: `supabase/functions/large-language-model/index.ts`
- System prompt instructs AI to act as Apani Dukan's Gift Concierge in Akole, Maharashtra
- Input data sent to AI: occasion, recipient, budget, personality
- AI processes request and returns JSON response

**AI Response Format:**
```json
{
  \"primaryGift\": {
    \"name\": \"Gift name\",
    \"priceRange\": \"Price range\",
    \"why\": \"Explanation text\",
    \"confidence\": \"95\"
  },
  \"alternativeGift\": {
    \"name\": \"Gift name\",
    \"priceRange\": \"Price range\",
    \"why\": \"Explanation text\"
  },
  \"premiumUpgrade\": {
    \"name\": \"Gift name\",
    \"priceRange\": \"Price range\",
    \"why\": \"Explanation text\"
  }
}
```

**Frontend Processing:**
- Parse JSON from SSE stream
- Render results screen with recommendations

#### 4.1.5 Results Screen — 🎯 Recommended For You

**Featured Gift Card:**
- Gift name
- Price range
- \"Why it matches\" explanation text
- Confidence score badge (e.g., \"95% Match\")
- AI Confidence Score badge on primary recommendation

**Alternative Gift Card:**
- Gift name
- Price range
- \"Why it matches\" explanation text

**Premium Upgrade Card:**
- Gift name
- Price range
- \"Why it matches\" explanation text

**Action Buttons:**
- 📲 Order on WhatsApp (links to WhatsApp with pre-filled message including gift details)
- 💬 Ask AI More (opens follow-up input for additional questions)
- 🔄 Start Over (resets flow to Step 1)

**Animations:**
- Celebration animation (confetti or sparkle) when results appear
- Smooth fade-in for gift cards
- Hover effects on action buttons

#### 4.1.6 Extra Features

**🎁 Surprise Me Button:**
- Placement: Below main card or as alternative entry point
- Behavior: Skips all 4 steps, sends random prompt to AI, shows instant recommendation
- Purpose: Quick gift suggestion for users in a hurry

**🔥 Trending Gifts Section:**
- Static section showing 5 popular gift suggestions for Apani Dukan
- Display below AI Gift Concierge card
- Simple card layout with gift name and price

**Save Recommendation Feature:**
- Save last recommendation to localStorage
- User can return and see previous result
- Display \"View Last Recommendation\" button if saved data exists

#### 4.1.7 Technical Implementation

**Backend — Edge Function:**
- Create Edge Function: `supabase/functions/large-language-model/index.ts`
- API endpoint: `https://app-93a4xgnxzu2p-api-VaOwP8E7dJqa.gateway.appmedo.com/v1beta/models/gemini-2.5-flash:streamGenerateContent?alt=sse`
- Authentication header: `X-Gateway-Authorization: Bearer ${INTEGRATIONS_API_KEY}` (platform_managed)
- Pass contents array to API
- Stream SSE response to frontend

**Frontend — Dependencies:**
- Install `ky@^1.2.3` for HTTP requests
- Install `eventsource-parser@^3.0.3` for SSE parsing
- Create `@/lib/sse.ts` SSE utility for stream handling
- Create `@/components/GiftConcierge.tsx` as main component
- Add GiftConcierge to `Home.tsx` as FIRST section above Hero

#### 4.1.8 User Experience Flow

1. User lands on homepage
2. AI Gift Concierge card visible at top
3. User clicks to start or clicks \"Surprise Me\"
4. User answers 4 questions (or skips via Surprise Me)
5. AI processes request via Edge Function
6. Results screen displays with 3 gift recommendations
7. User clicks \"Order on WhatsApp\" or \"Ask AI More\" or \"Start Over\"
8. Recommendation saved to localStorage for future reference

#### 4.1.9 Mobile Optimization
- One question per screen
- Large touch targets (minimum 44x44px)
- Fast responsive layout
- Smooth transitions optimized for mobile
- Progress indicator always visible

#### 4.1.10 Animations
- Smooth fade+slide transitions between steps
- Progress bar animation at top of card
- Celebration animation (confetti or sparkle) when results appear
- Hover effects on option cards
- Card lift effect on hover

### 4.2 Sticky Announcement Bar
- **Position**: Top of website, sticky while scrolling
- **Design**: Compact, non-intrusive, smooth slide-in animation
- **Content Examples**:
  - Diwali Gifts Available Now!
  - Limited Festival Offers – Visit Today
- **Features**:
  - Optional close button
  - Mobile-friendly
  - Easy content updates
  - Stays visible during scroll

### 4.3 Language Toggle
- **Button Text**: मराठी | English
- **Position**: Top navigation area
- **Default Language**: English
- **Functionality**:
  - No page reload on switch
  - Remember user choice (localStorage)
  - Smooth transition animation
- **Translation Scope**:
  - Headings
  - Buttons
  - Festival descriptions
  - Product categories
  - CTAs
  - AI Gift Concierge interface text
- **Marathi Tone**: Simple, friendly, local Maharashtra style

### 4.4 Hero Section
- **Design**: Modern hero section with full-width background image
- **Background Image**: Use uploaded image ideogram-v3.0_Create_a_high-quality_logo_image_with_the_text_Apani_Dukan\"_written_clearly-0.jpg as hero background
- **Overlay**: Dark overlay for text contrast
- **Height**: Responsive height (adjusts based on screen size)
- **Content Position**: Centered content
- **Animations**: Smooth animations on load
- **Optimization**: Mobile-first optimization
- **Headline**: Perfect Gifts for Every Moment
- **Sub-headline**: From birthdays to festivals, Apani Dukan brings smiles with thoughtful gifts and everyday essentials.
- **CTA Buttons**:
  - Call Now
  - WhatsApp Us

### 4.5 About Us Section
- Warm, emotional story emphasizing:
  - Apani Dukan is a local, family-friendly store
  - Focus on quality, affordability, and trust
  - Serving the Akole community with dedication

### 4.6 Our Products Section
Display attractive product cards for:
- Birthday & Anniversary Gifts
- Festival Items (Diwali, Raksha Bandhan, Ganpati, etc.)
- Stationery & Daily Essentials
- Home Décor & Showpieces
- Custom Gift Packs

### 4.7 Festival Section (Clickable Navigation)
Create interactive festival cards that link to dedicated festival pages:
- Diwali → /diwali
- Raksha Bandhan → /raksha-bandhan
- Valentine's Day → /valentines-day
- Birthdays → /birthdays
- Ganesh Chaturthi → /ganesh-chaturthi
- Holi → /holi

Each festival card should be clickable and visually appealing with festival-themed imagery.

### 4.8 Why Choose Apani Dukan Section
Use icons & short points:
- Affordable Prices
- Wide Variety
- Friendly Local Service
- Perfect for Every Occasion
- Trusted by Local Customers

### 4.9 Customer Trust Section
- 4–5 short testimonial samples
- Star ratings display
- Emphasis on local customers

### 4.10 Customer Reviews Showcase Section

#### 4.10.1 Section Placement
- **Position**: Between Customer Feedback Form section and Footer
- **Section Title**: What Our Customers Say
- **Subtitle**: Real feedback from happy customers of Apani Dukan.

#### 4.10.2 Review Display Logic
- **Data Source**: Read directly from existing `feedback` database table
- **Display Filter**: Only show reviews with rating >= 3 (3, 4, 5 stars)
- **Hidden Reviews**: Reviews with rating 1–2 stars stored in database but never displayed publicly
- **Dynamic Updates**: New qualifying reviews automatically appear without code changes

#### 4.10.3 Review Card Content
Each review card displays:
- Star rating (filled stars visualization)
- Customer name
- Review text (sanitized, minimum 5 characters enforced)
- Review date (formatted)

#### 4.10.4 Featured Review
- **Selection Criteria**: Highest-rated + most recent review
- **Label**: Featured Customer Review
- **Position**: Pinned at top of review grid

#### 4.10.5 Review Statistics
- **Average Rating Display**: X.X/5 Average Rating (calculated dynamically from database)
- **Review Count**: Based on X customer reviews (dynamic count)
- **Position**: Above review cards

#### 4.10.6 Empty State
- **Message**: Be the first customer to share your experience with Apani Dukan!
- **Display Condition**: When no qualifying reviews exist in database

#### 4.10.7 UI & UX Design
- Premium modern card layout with rounded corners
- Soft shadows for depth
- Responsive grid layout:
  - Mobile: 1 column
  - Tablet: 2 columns
  - Desktop: 3 columns
- Mobile-friendly spacing
- No text overflow
- Fade-in animation for review cards (soft, subtle)

#### 4.10.8 Security & Quality
- Sanitize review content before display
- Minimum 5 characters for review text (enforced at form submission level)
- No empty or duplicate display issues

#### 4.10.9 SEO Enhancement
- Add JSON-LD review schema markup (structured data) for search engines
- Improve local business visibility

### 4.11 Customer Feedback Form Section

#### 4.11.1 Section Placement
- **Position**: Below Customer Trust / Testimonials section
- **Section Title**: Your Feedback Matters to Us

#### 4.11.2 Form Fields

**Required Fields:**
- Name (text input)
- Rating (1 to 5 stars – clickable interactive stars)
- Feedback / Review (textarea)

**Optional Fields:**
- Phone number (optional text input)

#### 4.11.3 UI & UX Design
- Clean card layout with rounded corners
- Soft shadows for depth
- Clear, readable labels
- Rounded input fields
- Mobile-friendly spacing
- Large tap areas for star rating
- Consistent with overall site design (Indian color palette)

#### 4.11.4 Star Rating Behavior
- Interactive star icons (clickable)
- Highlight on hover (desktop)
- Highlight on tap (mobile)
- Selected rating clearly visible with filled stars
- Visual feedback on selection

#### 4.11.5 Trust & Privacy Microcopy
Add below the form:
- Your feedback helps us serve you better. We respect your privacy.

#### 4.11.6 Form Validation
- Name field required
- Feedback field required
- Rating must be selected
- Friendly error messages:
  - Please share your experience
  - Please tell us your name
  - Please select a rating

#### 4.11.7 Submission Behavior
- On submit:
  - Save feedback data to backend database
  - Show success message: Thank you for your valuable feedback!
  - Reset form fields
  - No page reload
  - Smooth transition animation

#### 4.11.8 Encouragement Microcopy
Add near submit button:
- Happy with our service? Leave us a review!

#### 4.11.9 Optional Enhancements
- Auto-suggest: What did you like most?
- Show latest 2–3 approved reviews below the form (fetched from backend database)

### 4.12 Contact & Location Section

#### 4.12.1 Section Heading
- **Heading**: Visit Apani Dukan – Akole

#### 4.12.2 Google Map Embed
- **Implementation**: Embedded Google Map iframe
- **Location**: G2Q7+FC3, Akole, Maharashtra 422601
- **Map Code**:
```html
<iframe
  src=\"https://www.google.com/maps?q=G2Q7+FC3, Akole, Maharashtra 422601&output=embed\"
  width=\"100%\"
  height=\"350\"
  style=\"border:0; border-radius:16px;\"
  allowfullscreen=\"\"
  loading=\"lazy\"
  referrerpolicy=\"no-referrer-when-downgrade\">
</iframe>
```
- **Design Requirements**:
  - Responsive width (100%)
  - Rounded corners (border-radius: 16px)
  - Lazy loading enabled
  - Mobile-friendly
  - No API key required

#### 4.12.3 Map Description Text
Add below the map:
- Easy to find • Parking available • Local favorite

#### 4.12.4 Open in Google Maps Button
- **Button Text**: Open in Google Maps
- **Link**: https://www.google.com/maps?q=G2Q7+FC3, Akole, Maharashtra 422601
- **Behavior**: Opens in new tab
- **Purpose**: Boost walk-in customers

#### 4.12.5 Additional Contact Information
- Full address: Mahalaxmi Mathuranagar Colony, Akole, Maharashtra – 422601
- Phone number placeholder
- WhatsApp button
- Store open timings

### 4.13 Footer
- Shop name: Apani Dukan
- Address
- Quick links
- Social media icons
- Footer text: Made with love for Akole

---

## 5. Festival Gift Catalog Download System

### 5.1 Overview
- **Purpose**: Enable users to download festival-specific PDF catalogs for offline viewing and sharing
- **Integration Scope**: Integrate into existing website without redesigning other sections
- **Target**: Increase engagement and facilitate bulk orders through easy catalog access

### 5.2 Available Catalogs

#### 5.2.1 Ready for Download (4 catalogs)
- Valentine's Day Catalog (PDF file available)
- Holi Catalog (PDF file available)
- Diwali Catalog (PDF file available)
- Birthday Catalog (PDF file available)

#### 5.2.2 Coming Soon (2 catalogs)
- Raksha Bandhan Catalog (placeholder only)
- Ganesh Chaturthi Catalog (placeholder only)

### 5.3 Download Card Design

#### 5.3.1 Card Structure
Each catalog card includes:
- Festival icon or image
- Catalog title
- PDF file size (if available)
- Download button (for available catalogs) or Coming Soon badge (for unavailable catalogs)

#### 5.3.2 Visual Design
- Premium card design consistent with Apani Dukan branding
- Rounded corners with soft shadows
- Indian color palette (saffron, warm yellow, white, soft green accents)
- Festival-specific accent colors per card
- Hover animations (lift effect, shadow increase)
- Mobile-friendly layout

#### 5.3.3 Card Layout
- Grid layout: 2 columns on mobile, 3 columns on tablet, 3 columns on desktop
- Equal card heights
- Responsive spacing
- Clear visual hierarchy

### 5.4 Download Behavior

#### 5.4.1 Direct Download Implementation
- Use HTML `<a>` tag with `download` attribute
- Direct file linking (no redirects or blank pages)
- PDF files stored in `/public/catalogs/` directory
- File naming convention: `festival-name-catalog.pdf`
  - Example: `/catalogs/valentines-day-catalog.pdf`

#### 5.4.2 Download Button Specifications
- **Button Text**: Download Catalog
- **Icon**: Download icon
- **Behavior**: Initiates immediate download on click
- **HTML Structure**:
```html
<a href=\"/catalogs/valentines-day-catalog.pdf\" download=\"Valentines-Day-Catalog.pdf\">
  Download Catalog
</a>
```

#### 5.4.3 Cross-Device Compatibility
- Works on Android devices
- Works on iPhone/iOS devices
- Works on Desktop browsers
- No console errors
- Graceful fallback for unsupported browsers

### 5.5 Coming Soon Placeholders

#### 5.5.1 Visual Treatment
- Display Coming Soon badge instead of download button
- Badge text: Coming Soon
- Badge styling: Subtle, non-clickable, visually distinct from download button
- Festival icon and title still visible

#### 5.5.2 Card Behavior
- Non-interactive (no hover effects)
- Slightly muted appearance compared to available catalogs
- Clear indication that catalog is not yet available

### 5.6 UX Enhancements

#### 5.6.1 Download Animation
- Smooth scale-down animation on button click
- Visual feedback confirming download initiation

#### 5.6.2 Success Message
- Toast notification appears after download starts
- Message text: Catalog download started successfully.
- Toast styling: Clean, modern, consistent with site design
- Auto-dismiss after 3 seconds
- Mobile-friendly positioning

#### 5.6.3 Error Handling
- If download fails, show error toast: Download failed. Please try again.
- Retry button available in error state

### 5.7 Integration Points

#### 5.7.1 Homepage Integration
- Add Download Catalogs section after Festival Section
- Section heading: Download Festival Gift Catalogs
- Display all 6 catalog cards (4 available + 2 coming soon)

#### 5.7.2 Festival Page Integration
- Each festival page includes Download Catalog button
- Button placement: Below Festival Special Products section
- Button links to corresponding PDF file
- Button text: Download Festival Gift Catalog
- For coming soon catalogs (Raksha Bandhan, Ganesh Chaturthi): Display Coming Soon badge instead of button

#### 5.7.3 DownloadCatalog.tsx Component Update
- Replace navigation buttons with download cards
- Implement direct download functionality
- Add coming soon placeholders
- Maintain existing component structure

### 5.8 File Management

#### 5.8.1 PDF File Storage
- Location: `/public/catalogs/` directory
- File naming:
  - `/catalogs/valentines-day-catalog.pdf`
  - `/catalogs/holi-catalog.pdf`
  - `/catalogs/diwali-catalog.pdf`
  - `/catalogs/birthday-catalog.pdf`

#### 5.8.2 File Size Display
- Show file size on download card (e.g., 2.5 MB)
- Calculate file size dynamically or hardcode per catalog

### 5.9 Accessibility

#### 5.9.1 Keyboard Navigation
- Download buttons accessible via Tab key
- Enter/Space to trigger download
- Focus indicators visible

#### 5.9.2 Screen Reader Support
- Proper ARIA labels for download buttons
- Descriptive button text: Download [Festival Name] Catalog
- Coming Soon badge announced to screen readers

#### 5.9.3 Visual Accessibility
- High contrast for buttons and text
- Clear visual distinction between available and coming soon catalogs
- Readable font sizes

### 5.10 Performance Optimization

#### 5.10.1 Loading Strategy
- Lazy load catalog cards below the fold
- Preload PDF files on hover (optional enhancement)
- Optimize card images

#### 5.10.2 Mobile Optimization
- Fast loading on 3G/4G networks
- Minimal data usage for card rendering
- Touch-friendly button sizes (minimum 44x44px)

---

## 6. Festival Pages Structure

### 6.1 Common Structure for All Festival Pages
Each festival page follows this consistent structure:

#### Announcement Bar
- Festival-specific announcement at top

#### Language Toggle
- Available on all festival pages

#### Hero Section
- Big festival-themed banner
- Festival title
- Emotional headline related to the festival

#### About the Festival
- Emotional, easy-to-read content
- Meaning of the festival
- Why gifting is important
- Indian cultural context

#### Festival Special Products
- 5–10 product cards with:
  - Product Image (high quality, clean background, Indian aesthetic)
  - Product Name
  - Short description
  - Price (₹)

#### Download Catalog Button
- Button text: Download Festival Gift Catalog
- Festival-specific PDF catalog (if available)
- Direct download functionality
- For coming soon catalogs: Display Coming Soon badge

#### Call to Action
- WhatsApp Now to Order
- Call for Bulk Orders
- Visit Our Store in Akole

### 6.2 Diwali Page (/diwali)

**Hero Section:**
- Title: Celebrate the Festival of Lights

**About:**
Diwali is the festival of lights, symbolizing the victory of light over darkness and good over evil. Gifting during Diwali strengthens bonds and spreads joy among loved ones.

**Products:**
1. Decorative Diyas – ₹299
2. Diwali Gift Hamper – ₹999
3. LED Light Series – ₹499
4. Sweets Box – ₹799
5. Lakshmi-Ganesh Frame – ₹1,199

**Catalog**: Diwali Gift Catalog PDF (available for download)

### 6.3 Raksha Bandhan Page (/raksha-bandhan)

**Hero Section:**
- Title: Celebrate the Bond of Love

**About:**
Raksha Bandhan celebrates the sacred bond between brothers and sisters. A beautiful rakhi with thoughtful gifts expresses love and protection.

**Products:**
1. Designer Rakhis – ₹199
2. Rakhi + Chocolate Combo – ₹499
3. Premium Rakhi Gift Box – ₹999

**Catalog**: Raksha Bandhan Gift Catalog (Coming Soon)

### 6.4 Valentine's Day Page (/valentines-day)

**Hero Section:**
- Title: Celebrate Love with Perfect Gifts

**About:**
Valentine's Day is a celebration of love, care, and togetherness. A thoughtful gift can express emotions better than words.

**Products:**
1. Heart Shape Gift Box – ₹499
2. Teddy Bear with Rose – ₹699
3. Chocolate Love Combo – ₹899
4. Love Message Bottle – ₹299
5. Premium Valentine Hamper – ₹1,499
6. Scented Candle Set – ₹599

**Catalog**: Valentine's Day Gift Catalog PDF (available for download)

### 6.5 Birthdays Page (/birthdays)

**Hero Section:**
- Title: Make Every Birthday Special

**About:**
Birthdays are moments to celebrate life and create memories. The perfect gift adds joy and makes the day unforgettable.

**Products:**
1. Birthday Decoration Kit – ₹799
2. Photo Frame Gift – ₹499
3. Surprise Gift Box – ₹1,299

**Catalog**: Birthday Gift Catalog PDF (available for download)

### 6.6 Ganesh Chaturthi Page (/ganesh-chaturthi)

**Hero Section:**
- Title: Welcome Lord Ganesha with Joy

**About:**
Ganesh Chaturthi celebrates the birth of Lord Ganesha, the remover of obstacles. Bringing home Ganpati with proper puja items brings blessings and prosperity.

**Products:**
1. Eco-friendly Ganpati Idol – ₹899
2. Puja Samagri Kit – ₹599
3. Ganpati Decoration Set – ₹1,499

**Catalog**: Ganesh Chaturthi Gift Catalog (Coming Soon)

### 6.7 Holi Page (/holi)

**Hero Section:**
- Title: Celebrate Colors of Joy

**About:**
Holi is the festival of colors, celebrating the arrival of spring and the triumph of good over evil. Playing with colors brings happiness and unity.

**Products:**
1. Organic Color Pack – ₹399
2. Holi Celebration Combo – ₹999
3. Water Gun (Pichkari) Set – ₹299

**Catalog**: Holi Gift Catalog PDF (available for download)

---

## 7. Festival Pages Image Performance Optimization

### 7.1 Instant Image Rendering Strategy
- Disable lazy-loading for all festival product images
- Images must start rendering immediately when page opens
- No visible delay or blank gaps
- Eliminate blank space appearance during image load

### 7.2 Image Preloading Implementation
- Use `<link rel=\"preload\">` for hero images on all festival pages
- Preload first 4–6 product images above the fold
- Ensure browser fetches critical images early in page load sequence
- Prioritize above-the-fold content rendering

### 7.3 Image Format & Optimization
- Automatic conversion to WebP format for all festival images
- Implement proper `width` and `height` attributes on all `<img>` tags to prevent layout shift
- Use responsive `srcset` attribute for mobile and desktop variants
- Optimize image file sizes without quality loss

### 7.4 UX Enhancement During Image Load
- Implement blur-up placeholder technique for smooth visual transition
- Add skeleton loader as fallback for slow connections
- Smooth fade-in animation once image is fully loaded
- No spinner or loading text visible to users
- Maintain layout stability throughout load process

### 7.5 Technical Implementation Rules
- Use modern HTML + CSS only (no heavy JS image loaders)
- No third-party image CDN dependencies
- No blocking scripts that delay image rendering
- Inline critical CSS for above-the-fold images
- Avoid JavaScript-based lazy loading libraries

### 7.6 Performance Goals
- Festival pages must feel instant on load
- No visible image delay even on slow mobile networks (3G)
- Images should feel already there when page opens
- Premium e-commerce website experience
- Smooth, fast, confident user experience

### 7.7 Implementation Scope
- Apply optimization to ALL festival pages:
  - Diwali (/diwali)
  - Raksha Bandhan (/raksha-bandhan)
  - Valentine's Day (/valentines-day)
  - Birthdays (/birthdays)
  - Ganesh Chaturthi (/ganesh-chaturthi)
  - Holi (/holi)

---

## 8. AI Gift Assistant Integration

### 8.1 Assistant Overview
- **Purpose**: Provide AI-powered gift recommendations and customer assistance
- **Chatbot URL**: https://huggingface.co/spaces/TirthGaikwad/gemini-elevenlabs-chatbot
- **Integration Method**: Floating button that opens chatbot in popup window or new browser tab
- **Target**: Increase engagement and WhatsApp inquiries through conversational AI
- **Performance**: Optimized for mobile and desktop with no iframe blocking issues

### 8.2 Floating Chat Button

#### 8.2.1 Button Design
- **Icon**: Robot or chat icon
- **Text**: Ask AI
- **Position**: Bottom-right corner of website
- **Style**:
  - Rounded button
  - Clean modern UI
  - Consistent with site color palette (Indian warm tones)
  - Soft shadow for depth
- **Behavior**:
  - Fixed position (stays visible while scrolling)
  - Smooth hover animation
  - Pulse animation every 10–15 seconds (subtle)
- **Mobile Optimization**:
  - Large enough for easy tapping
  - Positioned to avoid blocking main content
  - Responsive sizing

#### 8.2.2 Button Interaction
- **Click Action**: Opens chatbot URL in popup window or new browser tab
- **Animation**: Smooth scale-up transition on hover
- **Feedback**: Visual indication on tap/click

### 8.3 Popup Window Implementation

#### 8.3.1 Opening Behavior
- **Method**: Use `window.open()` JavaScript function
- **URL**: https://huggingface.co/spaces/TirthGaikwad/gemini-elevenlabs-chatbot
- **Options**:
  - Popup window (preferred)
  - New browser tab (fallback)

#### 8.3.2 Popup Window Configuration
```javascript
window.open(
  'https://huggingface.co/spaces/TirthGaikwad/gemini-elevenlabs-chatbot',
  'AI Gift Assistant',
  'width=420,height=600,left=100,top=100,resizable=yes,scrollbars=yes'
);
```

#### 8.3.3 Popup Window Specifications
- **Desktop**:
  - Width: 420px
  - Height: 600px
  - Resizable: Yes
  - Scrollbars: Yes
  - Position: Centered or offset from main window
- **Mobile**:
  - Opens in new browser tab (popup not supported on most mobile browsers)
  - Full-screen experience
  - Easy to switch back to main site

### 8.4 User Experience Flow

#### 8.4.1 Initial State
1. User lands on website
2. Floating chat button visible at bottom-right
3. No external resources loaded yet (performance optimization)

#### 8.4.2 Opening Assistant
1. User clicks floating chat button
2. Popup window or new tab opens with Hugging Face chatbot
3. User can interact with AI assistant
4. Main website remains accessible

#### 8.4.3 Closing Assistant
1. User closes popup window or switches back to main tab
2. Floating button remains visible
3. User can reopen anytime

#### 8.4.4 Persistent Availability
- Chat button available on all pages
- Easy to access from anywhere on site
- No session management required

### 8.5 Mobile Optimization

#### 8.5.1 Mobile Behavior
- **Button Size**: Large enough for thumb interaction (minimum 56×56px)
- **Touch Targets**: Minimum 44×44px for accessibility
- **Opening Method**: New browser tab (popup not supported)
- **Navigation**: Easy to switch between tabs

#### 8.5.2 Mobile Performance
- Lightweight implementation
- Fast loading on 3G/4G networks
- Minimal data usage
- No blocking of main content

### 8.6 Accessibility Requirements

#### 8.6.1 Keyboard Navigation
- Chat button accessible via Tab key
- Enter/Space to open chatbot
- Focus management

#### 8.6.2 Screen Reader Support
- Proper ARIA labels for chat button
- Descriptive button text: Ask AI or AI Gift Assistant
- Announce button purpose

#### 8.6.3 Visual Accessibility
- High contrast for chat button
- Clear visual focus indicators
- Readable text sizes
- Color-blind friendly design

### 8.7 Technical Implementation

#### 8.7.1 HTML Structure
```html
<button id=\"ai-assistant-btn\" aria-label=\"Open AI Gift Assistant\">
  <span class=\"icon\">Robot Icon</span>
  <span class=\"text\">Ask AI</span>
</button>
```

#### 8.7.2 CSS Requirements
- Fixed positioning for button
- z-index management to stay above content
- Smooth transitions and animations
- Responsive breakpoints
- Mobile-first styling

#### 8.7.3 JavaScript Functionality
```javascript
document.getElementById('ai-assistant-btn').addEventListener('click', function() {
  window.open(
    'https://huggingface.co/spaces/TirthGaikwad/gemini-elevenlabs-chatbot',
    'AI Gift Assistant',
    'width=420,height=600,left=100,top=100,resizable=yes,scrollbars=yes'
  );
});
```

#### 8.7.4 Performance Optimization
- No external resources loaded until button click
- Lightweight button implementation
- Use CSS transforms for animations (GPU-accelerated)
- Minimize JavaScript execution
- No blocking of page load

### 8.8 Integration Scope

#### 8.8.1 Pages with AI Assistant Button
- Homepage
- All festival pages (Diwali, Raksha Bandhan, Valentine's Day, etc.)
- Product sections
- Contact page
- All website pages

#### 8.8.2 Consistent Behavior
- Same button design across all pages
- Uniform positioning and styling
- Consistent animations and interactions

### 8.9 Fallback & Error Handling

#### 8.9.1 Popup Blocker Detection
- Detect if popup is blocked by browser
- Show friendly message: Please allow popups to use AI Assistant
- Provide alternative: Open in New Tab button

#### 8.9.2 Browser Compatibility
- Fallback for older browsers
- Progressive enhancement approach
- Core functionality works without JavaScript

### 8.10 Design Consistency

#### 8.10.1 Visual Integration
- Button matches site color scheme
- Design consistent with site aesthetics
- Indian warm tones and modern feel
- Rounded corners matching site style

#### 8.10.2 Animation Consistency
- Timing matches site animations (300–400ms)
- Easing curves consistent with site
- Smooth, natural movements

### 8.11 Key Advantages Over iframe
- No iframe blocking errors
- No huggingface.co refused to connect issues
- Better performance (no iframe overhead)
- Cleaner user experience
- Works on all browsers and devices
- No CORS or embedding restrictions

---

## 9. Animation & Motion Design Requirements

### 9.1 Animation Goals
- Make the site feel alive and friendly
- Guide user attention naturally
- Improve engagement & conversions
- Keep animations subtle, fast, and purposeful
- Maintain premium, modern feel with Indian warmth

### 9.2 Global Page Load Animation
- **Effect**: Soft fade-in + slight upward motion
- **Duration**: 400–600ms
- **Easing**: Smooth / natural
- **Behavior**: No flashing or delay
- **Purpose**: Clean first impression

### 9.3 Hero Section Animation
- **Headline**: Slides up gently
- **Sub-headline**: Fades in
- **CTA Buttons**: Appear with slight scale-up
- **Timing**: Sequential, not simultaneous
- **Purpose**: Draw attention to CTAs

### 9.4 Scroll-Reveal Animations
- **Apply to**:
  - AI Gift Concierge section
  - About section
  - Product cards
  - Festival cards
  - Testimonials
  - Why Choose Apani Dukan section
  - Customer Feedback Form section
  - Customer Reviews Showcase section
  - Download Catalogs section
- **Behavior**:
  - Animate only once
  - Trigger when section enters viewport
- **Effects**:
  - Fade-up
  - Slight zoom-in for cards
- **Performance**: GPU-friendly transforms only

### 9.5 Product & Festival Card Hover Effects
- **Lift Effect**: translateY −4px
- **Shadow**: Soft shadow increase
- **Image**: Very subtle zoom
- **Timing**: Fast and responsive
- **Purpose**: Encourage clicks

### 9.6 CTA Button Animations
- **Hover State**: Gentle pulse or glow
- **Tap Interaction**: Micro-interaction feedback
- **Mobile**: Ripple effect on tap
- **Purpose**: Increase interaction rates

### 9.7 Festival Highlight Section (Special)
- **Festival Badges**: Animate on entry
- **Limited-Time Offer Tag**:
  - Slow attention-grabbing shimmer
  - Not excessive or annoying
- **Purpose**: Create urgency without distraction

### 9.8 Testimonial Animation
- **Cards**: Fade in sequentially
- **Star Rating**: Subtle sparkle effect (once)
- **Timing**: Staggered appearance
- **Purpose**: Build trust & credibility

### 9.9 Floating WhatsApp Button
- **Idle State**: Soft bounce every 10–15 seconds
- **Hover**: Pulse effect
- **Behavior**: Never annoying
- **Purpose**: Guide user action without distraction

### 9.10 Floating AI Assistant Button
- **Idle State**: Soft pulse every 10–15 seconds
- **Hover**: Scale-up effect with glow
- **Click**: Quick scale-down then return
- **Behavior**: Smooth and professional
- **Purpose**: Encourage AI assistant usage

### 9.11 Download Catalog Card Animations
- **Card Hover**: Lift effect with shadow increase
- **Download Button Hover**: Gentle pulse
- **Download Button Click**: Scale-down animation
- **Coming Soon Badge**: No hover effects (non-interactive)
- **Purpose**: Encourage catalog downloads

### 9.12 Customer Reviews Card Animations
- **Review Cards**: Soft fade-in animation on scroll reveal
- **Featured Review Badge**: Subtle glow effect
- **Star Rating**: Smooth fill animation
- **Purpose**: Build trust and credibility

### 9.13 AI Gift Concierge Animations
- **Main Card**: Soft fade-in + slight upward motion on page load
- **Step Transitions**: Smooth fade+slide between steps
- **Progress Bar**: Animated fill as user progresses
- **Option Cards**: Lift effect on hover, scale-down on click
- **Results Screen**: Celebration animation (confetti or sparkle) when results appear
- **Gift Cards**: Sequential fade-in with stagger effect
- **Confidence Badge**: Subtle pulse animation
- **Action Buttons**: Hover pulse effect
- **Purpose**: Create engaging, delightful user experience

### 9.14 Festival Celebration Micro-Moment
- **Location**: Festival pages only
- **Effect**: Tiny confetti or sparkle effect once on load
- **Duration**: Automatically disabled after 2 seconds
- **Purpose**: Create emotional delight without annoyance
- **Performance**: Lightweight, GPU-accelerated

### 9.15 Feedback Form Animations
- **Star Rating**: Smooth fill animation on selection
- **Form Submission**: Success message fade-in with gentle scale
- **Error Messages**: Subtle shake animation for invalid fields
- **Input Focus**: Smooth border color transition

### 9.16 Animations to Avoid
- No excessive bouncing
- No auto-playing heavy animations
- No long delays
- No scroll-jacking
- No layout shifts

### 9.17 Technical Implementation Rules
- **Mobile-First**: All animations optimized for mobile devices
- **Accessibility**: Respect prefers-reduced-motion
- **Performance**: GPU-friendly transforms only (translate, scale, opacity)
- **Layout Stability**: No layout shifts during animations
- **Loading Strategy**: Lazy-load animation libraries
- **Consistency**: Uniform timing and easing across site

### 9.18 Animation Style & Timing
- **Visual Tone**: Indian-warm aesthetic
- **Easing**: Smooth, natural curves
- **Timing**: Consistent across all sections
- **Duration Guidelines**:
  - Micro-interactions: 150–250ms
  - Card animations: 300–400ms
  - Section reveals: 400–600ms
  - Page transitions: 400–600ms

### 9.19 Performance Optimization
- Use CSS transforms and opacity only
- Avoid animating width, height, top, left
- Implement Intersection Observer for scroll-reveal
- Debounce scroll events
- Use will-change property sparingly
- Test on low-end devices

---

## 10. Backend Database Requirements

### 10.1 Overview
All application data generated by user interactions must be persistently stored in a backend database to ensure data durability, accessibility, and future scalability.

### 10.2 Customer Feedback Storage

#### 10.2.1 Data to Store
Each feedback submission must persist the following fields:

| Field | Type | Required |
|---|---|---|
| id | Auto-generated unique identifier | Yes |
| name | Text | Yes |
| rating | Integer (1–5) | Yes |
| feedback_text | Text | Yes |
| phone_number | Text | No |
| submitted_at | Timestamp | Yes |

#### 10.2.2 Write Operation
- On successful form submission, write the feedback record to the database
- Return a success response to trigger the on-screen confirmation message: Thank you for your valuable feedback!
- On write failure, display a friendly error message and allow the user to retry without losing their input

#### 10.2.3 Read Operation for Feedback Form Display
- Fetch the latest 2–3 approved/most-recent feedback records to display below the feedback form
- Records are ordered by submitted_at descending
- Display fields: name, rating (stars), feedback_text

#### 10.2.4 Read Operation for Customer Reviews Showcase
- Fetch all feedback records with rating >= 3 from the database
- Order by rating descending, then by submitted_at descending
- Display fields: name, rating (stars), feedback_text, submitted_at (formatted)
- Calculate average rating dynamically from all qualifying reviews
- Count total number of qualifying reviews

### 10.3 Database Access Policy Update

#### 10.3.1 Row Level Security (RLS) Policy
- **Current Policy**: `is_approved = true`
- **Updated Policy**: `rating >= 3`
- **Purpose**: Auto-publish qualifying reviews without manual admin approval
- **Scope**: Apply to SELECT operations only
- **INSERT Policy**: Keep existing policy untouched

#### 10.3.2 Policy Implementation
- Update existing RLS SELECT policy on `feedback` table
- Change filter condition from `is_approved = true` to `rating >= 3`
- Ensure policy applies to both feedback form display and customer reviews showcase

### 10.4 Data Integrity & Validation
- Server-side validation must mirror client-side rules:
  - name: non-empty string
  - rating: integer between 1 and 5
  - feedback_text: non-empty string, minimum 5 characters
  - phone_number: optional, no strict format enforcement
- Reject and return a clear error for any submission that fails server-side validation
- Sanitize all text inputs before storage to prevent injection

### 10.5 Security
- All database read/write operations must occur over HTTPS
- Input sanitization applied to all stored fields
- No sensitive personal data beyond what is listed in Section 10.2.1 should be collected or stored

---

## 11. Backend Edge Function Requirements

### 11.1 Overview
- **Purpose**: Enable AI Gift Concierge feature by connecting frontend to large language model API
- **Function Name**: `large-language-model`
- **Location**: `supabase/functions/large-language-model/index.ts`
- **Method**: Server-Sent Events (SSE) streaming

### 11.2 API Integration

#### 11.2.1 External API Endpoint
- **URL**: `https://app-93a4xgnxzu2p-api-VaOwP8E7dJqa.gateway.appmedo.com/v1beta/models/gemini-2.5-flash:streamGenerateContent?alt=sse`
- **Method**: POST
- **Content-Type**: application/json

#### 11.2.2 Authentication
- **Header**: `X-Gateway-Authorization: Bearer ${INTEGRATIONS_API_KEY}`
- **Key Type**: platform_managed (do NOT register as secret)
- **Access**: Automatically available in Edge Function environment

### 11.3 Request Structure

#### 11.3.1 Input from Frontend
Edge Function receives from frontend:
- occasion (string)
- recipient (string)
- budget (string)
- personality (string)

#### 11.3.2 System Prompt Construction
Edge Function constructs system prompt:
```
You are the AI Gift Concierge for Apani Dukan, a beloved local gift shop in Akole, Maharashtra. Your role is to recommend perfect gifts based on customer preferences.

Customer Details:
- Occasion: {occasion}
- Recipient: {recipient}
- Budget: {budget}
- Personality: {personality}

Provide gift recommendations in JSON format with the following structure:
{
  \"primaryGift\": {
    \"name\": \"Gift name\",
    \"priceRange\": \"Price range in ₹\",
    \"why\": \"Brief explanation why this gift matches\",
    \"confidence\": \"95\"
  },
  \"alternativeGift\": {
    \"name\": \"Gift name\",
    \"priceRange\": \"Price range in ₹\",
    \"why\": \"Brief explanation\"
  },
  \"premiumUpgrade\": {
    \"name\": \"Gift name\",
    \"priceRange\": \"Price range in ₹\",
    \"why\": \"Brief explanation\"
  }
}

Recommend gifts available at Apani Dukan. Be warm, friendly, and culturally aware of Indian gifting traditions.
```

#### 11.3.3 Request Payload to External API
```json
{
  \"contents\": [
    {
      \"role\": \"user\",
      \"parts\": [
        {
          \"text\": \"[System prompt with customer details]\"
        }
      ]
    }
  ]
}
```

### 11.4 Response Handling

#### 11.4.1 SSE Stream Processing
- Edge Function receives SSE stream from external API
- Parse SSE events
- Extract text content from stream
- Forward stream to frontend in real-time

#### 11.4.2 Response Format to Frontend
- Stream SSE events directly to frontend
- Frontend parses JSON from stream
- No additional processing required in Edge Function

### 11.5 Error Handling

#### 11.5.1 API Errors
- Catch API connection errors
- Return error response to frontend with status code and message
- Log errors for debugging

#### 11.5.2 Timeout Handling
- Set reasonable timeout (e.g., 30 seconds)
- Return timeout error to frontend if exceeded

#### 11.5.3 Invalid Response
- Validate JSON structure from API
- Return error if response does not match expected format

### 11.6 Security

#### 11.6.1 Input Validation
- Validate all input parameters from frontend
- Sanitize user input before constructing prompt
- Prevent prompt injection attacks

#### 11.6.2 Rate Limiting
- Implement rate limiting to prevent abuse
- Limit requests per user/IP

#### 11.6.3 CORS Configuration
- Configure CORS headers to allow frontend domain
- Restrict to specific origins in production

### 11.7 Performance Optimization

#### 11.7.1 Streaming Efficiency
- Use efficient SSE parsing
- Minimize processing overhead
- Stream data as soon as available

#### 11.7.2 Connection Management
- Properly close connections after streaming completes
- Handle client disconnections gracefully

---

## 12. Bonus Features
- Floating WhatsApp button (on all pages)
- Click-to-call functionality on mobile
- Festival banner auto-switch
- Simple image gallery
- Image lazy loading for fast performance (except festival product images)
- AI Gift Assistant with popup window integration
- Sticky announcement bar
- Downloadable festival catalogs with direct download functionality
- Bilingual support (Marathi + English)
- Premium motion design & animations
- Customer feedback form with persistent backend database storage
- Dynamic customer reviews showcase section with auto-publishing
- Instant image rendering on festival pages
- AI Gift Concierge with 4-step guided flow and SSE streaming
- Surprise Me quick recommendation feature
- Trending Gifts static section
- Save Recommendation to localStorage

---

## 13. Technical Requirements

### 13.1 SEO Optimization
- Local SEO focused on Akole, Maharashtra
- Structured data for local business
- SEO-friendly URLs for festival pages
- JSON-LD review schema markup for customer reviews

### 13.2 Performance
- Fast loading speed
- Clean semantic HTML structure
- Image lazy loading (except festival product images)
- Optimized for low-end mobile devices
- No heavy libraries
- Animation performance optimization
- Instant image rendering on festival pages
- WebP image format support
- Image preloading for critical content
- No iframe blocking issues
- Lightweight AI assistant button implementation
- Direct PDF download without redirects
- Efficient SSE streaming for AI Gift Concierge

### 13.3 Accessibility
- Mobile-first responsive design
- Clear navigation structure
- Smooth page transitions
- Touch-friendly interface elements
- Accessible buttons and controls
- Semantic HTML for screen readers
- Respect prefers-reduced-motion for animations
- Form accessibility with proper labels and ARIA attributes
- Keyboard navigation support for AI assistant button
- Keyboard navigation support for download buttons
- Keyboard navigation support for AI Gift Concierge

### 13.4 Security
- HTTPS encryption
- Secure external link handling
- Input validation and sanitization
- Secure file upload handling
- Form data protection
- Secure backend API endpoints for database operations
- Safe PDF file serving
- Secure Edge Function implementation
- Rate limiting for AI Gift Concierge
- Prompt injection prevention

### 13.5 Language Support
- Bilingual implementation (Marathi + English)
- No page reload on language switch
- localStorage for user preference
- Consistent translation across all pages
- Simple, friendly Marathi tone
- AI Gift Concierge interface translated

### 13.6 Dependencies
- `ky@^1.2.3` for HTTP requests
- `eventsource-parser@^3.0.3` for SSE parsing

---

## 14. Acceptance Criteria

1. User visits homepage
2. User sees AI Gift Concierge card at top of page
3. User clicks to start AI Gift Concierge
4. User answers Step 1 (Occasion) and clicks option
5. User answers Step 2 (Recipient) and clicks option
6. User answers Step 3 (Budget) and clicks option
7. User answers Step 4 (Personality) and clicks option
8. AI processes request via Edge Function and external API
9. Results screen displays with 3 gift recommendations
10. User sees primary gift with confidence score
11. User clicks \"Order on WhatsApp\" button
12. WhatsApp opens with pre-filled message including gift details
13. User returns to website and clicks \"Start Over\"
14. AI Gift Concierge resets to Step 1
15. User clicks \"Surprise Me\" button
16. AI instantly shows random gift recommendation
17. Recommendation saved to localStorage
18. User refreshes page and sees \"View Last Recommendation\" button

---

## 15. Features Not Implemented in This Release
- Admin approval workflow for reviews
- Review editing by customers
- Review reply by business owner
- Review flagging/reporting system
- Review sorting options (most recent, highest rated, etc.)
- Review filtering by rating
- Review pagination
- Review search functionality
- Review verification badges
- Review photos/images upload
- Review helpful/unhelpful voting
- Review analytics dashboard
- Catalog preview before download
- Email catalog sharing
- Catalog customization
- Print catalog directly from website
- Catalog version history
- Catalog analytics tracking
- Multi-language catalog support
- Catalog search functionality
- Catalog favorites/bookmarking
- Catalog comparison tool
- AI Gift Concierge conversation history
- AI Gift Concierge user accounts
- AI Gift Concierge gift comparison feature
- AI Gift Concierge gift wishlist
- AI Gift Concierge gift reminders
- AI Gift Concierge analytics dashboard
- AI Gift Concierge A/B testing
- AI Gift Concierge multi-language support beyond Marathi/English
- AI Gift Concierge voice input
- AI Gift Concierge image-based gift search

---

## 16. Reference Files
1. Hero Background Image: ideogram-v3.0_Create_a_high-quality_logo_image_with_the_text_Apani_Dukan\"_written_clearly-0.jpg
2. Hugging Face Chatbot URL: https://huggingface.co/spaces/TirthGaikwad/gemini-elevenlabs-chatbot
3. PDF Catalogs (to be placed in `/public/catalogs/` directory):
   - valentines-day-catalog.pdf
   - holi-catalog.pdf
   - diwali-catalog.pdf
   - birthday-catalog.pdf
4. Database: Existing `feedback` table with updated RLS policy (rating >= 3)
5. API Integration: Use existing `supabase` client and `@/db/api.ts` for database operations
6. Edge Function: `supabase/functions/large-language-model/index.ts`
7. External API: `https://app-93a4xgnxzu2p-api-VaOwP8E7dJqa.gateway.appmedo.com/v1beta/models/gemini-2.5-flash:streamGenerateContent?alt=sse`
8. SSE Utility: `@/lib/sse.ts`
9. AI Gift Concierge Component: `@/components/GiftConcierge.tsx`