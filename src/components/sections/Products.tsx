import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Gift, Sparkles, PenTool, Home, Package } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';

export default function Products() {
  const { t } = useLanguage();

  const products = [
    {
      icon: Gift,
      titleKey: 'birthdayGifts',
      descKey: 'birthdayGiftsDesc',
      color: 'bg-primary/10 text-primary'
    },
    {
      icon: Sparkles,
      titleKey: 'festivalItems',
      descKey: 'festivalItemsDesc',
      color: 'bg-secondary/20 text-secondary-foreground'
    },
    {
      icon: PenTool,
      titleKey: 'stationery',
      descKey: 'stationeryDesc',
      color: 'bg-accent text-accent-foreground'
    },
    {
      icon: Home,
      titleKey: 'homeDecor',
      descKey: 'homeDecorDesc',
      color: 'bg-primary/10 text-primary'
    },
    {
      icon: Package,
      titleKey: 'customGifts',
      descKey: 'customGiftsDesc',
      color: 'bg-secondary/20 text-secondary-foreground'
    }
  ];

  return (
    <section className="py-16 xl:py-24 bg-accent/30 overflow-hidden">
      <div className="container px-4 xl:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 xl:mb-16 space-y-3 xl:space-y-4"
        >
          <h2 className="text-3xl xl:text-5xl font-bold text-foreground">
            {t('productsTitle')}
          </h2>
          <p className="text-base xl:text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('productsSubtitle')}
          </p>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 xl:gap-8 max-w-6xl mx-auto">
          {products.map((product, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card
                className="border-2 border-border hover:border-primary transition-all duration-500 hover:shadow-hover group hover:-translate-y-2 h-full"
              >
                <CardHeader>
                  <div className={`inline-flex items-center justify-center w-14 h-14 xl:w-16 xl:h-16 rounded-full ${product.color} mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                    <product.icon className="h-7 w-7 xl:h-8 xl:w-8" />
                  </div>
                  <CardTitle className="text-xl xl:text-2xl transition-colors duration-300 group-hover:text-primary">{t(product.titleKey)}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm xl:text-base text-muted-foreground leading-relaxed transition-colors duration-300 group-hover:text-foreground">
                    {t(product.descKey)}
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
