import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';

const festivals = [
  { nameKey: 'catalogDiwali', emoji: '🪔', color: 'bg-primary/10 text-primary', path: '/diwali' },
  { nameKey: 'catalogRakhi', emoji: '🎀', color: 'bg-secondary/20 text-secondary-foreground', path: '/raksha-bandhan' },
  { nameKey: 'catalogValentine', emoji: '❤️', color: 'bg-destructive/10 text-destructive', path: '/valentines-day' },
  { nameKey: 'catalogBirthday', emoji: '🎂', color: 'bg-accent text-accent-foreground', path: '/birthdays' },
  { nameKey: 'catalogGanesh', emoji: '🐘', color: 'bg-primary/10 text-primary', path: '/ganesh-chaturthi' },
  { nameKey: 'catalogHoli', emoji: '🎨', color: 'bg-secondary/20 text-secondary-foreground', path: '/holi' }
];

export default function Festival() {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <section id="festival-collections" className="py-16 xl:py-24 bg-gradient-to-br from-primary/5 via-background to-accent/10 overflow-hidden">
      <div className="container px-4 xl:px-8">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto"
        >
          <Card className="border-2 border-primary/20 shadow-hover bg-card/50 backdrop-blur-sm overflow-hidden hover:border-primary/40 transition-all duration-500">
            <div className="absolute top-0 right-0 w-24 h-24 xl:w-32 xl:h-32 bg-primary/10 rounded-bl-full pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-24 h-24 xl:w-32 xl:h-32 bg-secondary/10 rounded-tr-full pointer-events-none" />
            
            <CardContent className="relative p-6 xl:p-12 space-y-6 xl:space-y-8">
              <div className="text-center space-y-3 xl:space-y-4">
                <motion.div 
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="inline-flex items-center justify-center w-16 h-16 xl:w-20 xl:h-20 rounded-full bg-primary/10 mb-4"
                >
                  <Sparkles className="h-8 w-8 xl:h-10 xl:w-10 text-primary" />
                </motion.div>
                <h2 className="text-3xl xl:text-5xl font-bold text-foreground">
                  {t('festivalTitle')} 🎉
                </h2>
                <p className="text-base xl:text-xl text-muted-foreground max-w-2xl mx-auto">
                  {t('festivalSubtitle')}
                </p>
              </div>

              <div className="flex flex-wrap justify-center gap-3 xl:gap-4 pt-4">
                {festivals.map((festival, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  >
                    <Badge
                      variant="outline"
                      onClick={() => navigate(festival.path)}
                      className={`${festival.color} px-4 xl:px-6 py-2 xl:py-3 text-base xl:text-lg font-medium border-2 hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer hover:text-white`}
                    >
                      <span className="mr-2 text-lg xl:text-xl">{festival.emoji}</span>
                      {t(festival.nameKey)}
                    </Badge>
                  </motion.div>
                ))}
              </div>

              <div className="text-center pt-4">
                <motion.div
                  animate={{ opacity: [1, 0.5, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Badge className="bg-primary text-primary-foreground px-6 py-2 text-base xl:text-lg relative overflow-hidden">
                    <span className="relative z-10">{t('limitedOffers')}</span>
                    <motion.div 
                      className="absolute inset-0 bg-white/20"
                      initial={{ left: '-100%' }}
                      animate={{ left: '100%' }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                    />
                  </Badge>
                </motion.div>
              </div>

              <p className="text-center text-base xl:text-lg text-muted-foreground transition-opacity hover:opacity-100 opacity-80">
                {t('festivalCTA')}
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
