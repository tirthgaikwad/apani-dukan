import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonicalUrl?: string;
  ogImage?: string;
}

export default function SEO({ 
  title = 'Apani Dukan - Gift Shop in Akole, Maharashtra | Festival Gifts & More',
  description = 'Apani Dukan is your trusted local gift shop in Akole, Maharashtra. We offer birthday gifts, festival items, stationery, home décor, and custom gift packs at affordable prices.',
  keywords = 'gift shop Akole, Akole gifts, Maharashtra gift store, birthday gifts Akole, festival items Akole, Diwali gifts, Rakhi gifts, custom gifts Akole',
  canonicalUrl,
  ogImage = 'https://apanidukanakole.com/og-image.jpg'
}: SEOProps) {
  const siteUrl = 'https://apanidukanakole.com';
  const fullCanonicalUrl = canonicalUrl || siteUrl;
  
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={fullCanonicalUrl} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={fullCanonicalUrl} />
      <meta property="og:site_name" content="Apani Dukan" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:locale" content="en_IN" />
      <meta property="og:locale:alternate" content="mr_IN" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={fullCanonicalUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      
      {/* Local Business Schema */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "name": "Apani Dukan",
          "description": "Gift Shop & More - Your trusted local destination for thoughtful gifts and festival essentials",
          "url": siteUrl,
          "image": ogImage,
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Mahalaxmi Mathuranagar Colony",
            "addressLocality": "Akole",
            "addressRegion": "Maharashtra",
            "postalCode": "422601",
            "addressCountry": "IN"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": "19.5385",
            "longitude": "74.0135"
          },
          "telephone": "+919876543210",
          "priceRange": "₹₹",
          "openingHours": "Mo-Su 09:00-21:00",
          "sameAs": [
            siteUrl
          ]
        })}
      </script>
    </Helmet>
  );
}
