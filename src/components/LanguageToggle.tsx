import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1, duration: 0.5 }}
      className="flex items-center gap-1 bg-card border border-border rounded-full p-1 shadow-sm"
    >
      <Button
        variant={language === 'mr' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => setLanguage('mr')}
        className={`rounded-full px-3 py-1 text-xs xl:text-sm transition-all duration-200 ${
          language === 'mr'
            ? 'bg-primary text-primary-foreground'
            : 'hover:bg-accent'
        }`}
      >
        मराठी
      </Button>
      <Button
        variant={language === 'en' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => setLanguage('en')}
        className={`rounded-full px-3 py-1 text-xs xl:text-sm transition-all duration-200 ${
          language === 'en'
            ? 'bg-primary text-primary-foreground'
            : 'hover:bg-accent'
        }`}
      >
        English
      </Button>
    </motion.div>
  );
}
