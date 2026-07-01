import { MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export default function FloatingWhatsApp() {
  const handleWhatsApp = () => {
    window.open('https://wa.me/919876543210?text=Namaste%20Apani%20Dukan!%20I%27m%20interested%20in%20your%20gifts.%20Could%20you%20share%20more%20details%20or%20photos%3F%20Looking%20forward%20to%20visiting%20your%20Akole%20store!', '_blank');
  };

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 3, duration: 0.5 }}
      className="fixed bottom-6 left-6 xl:bottom-8 xl:left-8 z-[999]"
    >
      <Button
        onClick={handleWhatsApp}
        size="lg"
        className="h-14 w-14 xl:h-16 xl:w-16 rounded-full shadow-hover bg-accent hover:bg-accent/90 text-accent-foreground animate-bounce-gentle hover:animate-none transition-all duration-300 group"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="h-6 w-6 xl:h-7 xl:w-7 group-hover:scale-110 transition-transform" />
      </Button>
    </motion.div>
  );
}
