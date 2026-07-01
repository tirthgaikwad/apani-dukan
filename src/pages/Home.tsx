import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Products from '@/components/sections/Products';
import WhyChoose from '@/components/sections/WhyChoose';
import Festival from '@/components/sections/Festival';
import Testimonials from '@/components/sections/Testimonials';
import Contact from '@/components/sections/Contact';
import Footer from '@/components/sections/Footer';
import DownloadCatalog from '@/components/DownloadCatalog';
import LanguageToggle from '@/components/LanguageToggle';
import FeedbackForm from '@/components/FeedbackForm';
import CustomerReviews from '@/components/CustomerReviews';
import GiftConcierge from '@/components/GiftConcierge';
import SEO from '@/components/SEO';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

export default function Home() {
  const location = useLocation();

  // Handle hash navigation for smooth scrolling to sections
  useEffect(() => {
    if (location.hash) {
      const elementId = location.hash.replace('#', '');
      const element = document.getElementById(elementId);
      if (element) {
        // Small delay to ensure DOM is ready
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    } else {
      // If no hash, scroll to top
      window.scrollTo(0, 0);
    }
  }, [location]);

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <SEO 
        canonicalUrl="https://apanidukanakole.com"
      />
      {/* Language Toggle - Fixed Position */}
      <div className="fixed top-16 right-4 xl:right-8 z-40">
        <LanguageToggle />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key="home-content"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div id="gift-concierge">
            <GiftConcierge />
          </div>
          <Hero />
          <div id="about">
            <About />
          </div>
          <div id="products">
            <Products />
          </div>
          <WhyChoose />
          <Festival />
          <DownloadCatalog />
          <div id="testimonials">
            <Testimonials />
          </div>
          <FeedbackForm />
          <div id="customer-reviews">
            <CustomerReviews />
          </div>
          <div id="contact">
            <Contact />
          </div>
          <Footer />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
