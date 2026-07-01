import { Button } from '@/components/ui/button';
import { Phone, MessageCircle, ChevronDown } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';

export default function Hero() {
  const { t } = useLanguage();

  const handleCall = () => {
    window.location.href = 'tel:+919876543210';
  };

  const handleWhatsApp = () => {
    window.open('https://wa.me/919876543210?text=Namaste%20Apani%20Dukan!%20I%27m%20interested%20in%20your%20gifts.%20Could%20you%20share%20more%20details%20or%20photos%3F%20Looking%20forward%20to%20visiting%20your%20Akole%20store!', '_blank');
  };

  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden py-20 xl:py-0">
      {/* Background Image with Parallax effect (simulated) */}
      <motion.div 
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: 'url("https://miaoda-site-img.s3cdn.medo.dev/images/58874d09-c243-49fc-929d-bc796ce46407.jpg")',
          backgroundAttachment: 'fixed'
        }}
      />
      
      {/* Dark Overlay for contrast */}
      <div className="absolute inset-0 z-10 bg-black/60 backdrop-blur-[2px]" />

      <div className="container relative z-20 px-4 xl:px-8 flex flex-col items-center text-center">
        {/* Logo Animation */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-6 xl:mb-10"
        >
          <img 
            src="https://miaoda-conversation-file.s3cdn.medo.dev/user-93a4v9qir5s0/conv-93a4xgnxzu2o/20260125/file-96ft8dwgq5ts.png" 
            alt="Apani Dukan Logo" 
            className="h-28 xl:h-48 w-auto drop-shadow-[0_0_15px_rgba(212,175,55,0.5)]"
          />
        </motion.div>

        {/* Text Content with individual animations */}
        <div className="space-y-4 xl:space-y-6 max-w-4xl">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-3xl xl:text-7xl font-bold text-white leading-tight"
          >
            {t('heroTitle')}{' '}
            <motion.span 
              animate={{ rotate: [0, 10, -10, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: 1 }}
              className="inline-block text-primary"
            >
              🎁
            </motion.span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-base xl:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed"
          >
            {t('heroSubtitle')}
          </motion.p>
          
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-lg xl:text-3xl font-serif italic text-primary"
          >
            {t('heroTagline')}
          </motion.p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col xl:flex-row gap-4 mt-8 xl:mt-12 w-full max-w-md xl:max-w-none justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full xl:w-auto"
          >
            <Button
              size="lg"
              onClick={handleCall}
              className="w-full xl:w-auto bg-primary hover:bg-primary/90 text-primary-foreground shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:shadow-[0_0_30px_rgba(212,175,55,0.5)] transition-all duration-500 text-base xl:text-lg px-8 xl:px-10 py-6 xl:py-8 rounded-full"
            >
              <Phone className="mr-3 h-5 w-5 xl:h-6 xl:w-6" />
              {t('callNow')}
            </Button>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 1.2 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full xl:w-auto"
          >
            <Button
              size="lg"
              onClick={handleWhatsApp}
              variant="outline"
              className="w-full xl:w-auto border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground shadow-lg transition-all duration-500 text-base xl:text-lg px-8 xl:px-10 py-6 xl:py-8 rounded-full backdrop-blur-sm"
            >
              <MessageCircle className="mr-3 h-5 w-5 xl:h-6 xl:w-6" />
              {t('whatsappUs')}
            </Button>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.button 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ duration: 1, delay: 2 }}
          onClick={scrollToAbout}
          className="hidden xl:block absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 hover:text-primary transition-colors animate-bounce"
          aria-label="Scroll down"
        >
          <ChevronDown className="h-10 w-10" />
        </motion.button>
      </div>

      {/* Subtle bottom gradient transition to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10" />
    </section>
  );
}
