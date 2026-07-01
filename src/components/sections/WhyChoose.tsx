import { Card, CardContent } from '@/components/ui/card';
import { DollarSign, Package, Heart, Calendar, Star } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';

export default function WhyChoose() {
  const { t } = useLanguage();

  const reasons = [
    {
      icon: DollarSign,
      titleKey: 'affordablePrices',
      descKey: 'affordablePricesDesc'
    },
    {
      icon: Package,
      titleKey: 'wideVariety',
      descKey: 'wideVarietyDesc'
    },
    {
      icon: Heart,
      titleKey: 'localService',
      descKey: 'localServiceDesc'
    },
    {
      icon: Calendar,
      titleKey: 'everyOccasion',
      descKey: 'everyOccasionDesc'
    },
    {
      icon: Star,
      titleKey: 'trustedCustomers',
      descKey: 'trustedCustomersDesc'
    }
  ];

  return (
    <section className="py-16 xl:py-24 bg-gradient-to-br from-secondary/10 via-background to-accent/10 overflow-hidden">
      <div className="container px-4 xl:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 xl:mb-16 space-y-3 xl:space-y-4"
        >
          <h2 className="text-3xl xl:text-5xl font-bold text-foreground">
            {t('whyChooseTitle')}
          </h2>
          <p className="text-base xl:text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('whyChooseSubtitle')}
          </p>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 xl:gap-8 max-w-6xl mx-auto">
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card
                className="border-2 border-border hover:border-primary transition-all duration-500 hover:shadow-hover group text-center hover:-translate-y-2 h-full"
              >
                <CardContent className="p-6 xl:p-8 space-y-4">
                  <div className="inline-flex items-center justify-center w-16 h-16 xl:w-20 xl:h-20 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-all duration-500 mx-auto">
                    <reason.icon className="h-8 w-8 xl:h-10 xl:w-10 text-primary group-hover:scale-110 transition-transform" />
                  </div>
                  <h3 className="text-xl xl:text-2xl font-semibold text-foreground group-hover:text-primary transition-colors">
                    {t(reason.titleKey)}
                  </h3>
                  <p className="text-sm xl:text-base text-muted-foreground transition-colors group-hover:text-foreground">
                    {t(reason.descKey)}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
