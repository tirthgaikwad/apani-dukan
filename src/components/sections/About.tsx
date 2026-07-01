import { Card, CardContent } from '@/components/ui/card';
import { Heart, Award, Users } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';

export default function About() {
  const { t } = useLanguage();

  const features = [
    {
      icon: Heart,
      titleKey: 'aboutLocalStore',
      descKey: 'aboutLocalDesc'
    },
    {
      icon: Award,
      titleKey: 'aboutQuality',
      descKey: 'aboutQualityDesc'
    },
    {
      icon: Users,
      titleKey: 'aboutCommunity',
      descKey: 'aboutCommunityDesc'
    }
  ];

  return (
    <section className="py-16 xl:py-24 bg-gradient-to-br from-background via-accent/10 to-background overflow-hidden">
      <div className="container px-4 xl:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 xl:mb-16 space-y-3 xl:space-y-4"
        >
          <h2 className="text-3xl xl:text-5xl font-bold text-foreground">
            {t('aboutTitle')}
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 xl:gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card
                className="border-2 border-border hover:border-primary transition-all duration-500 hover:shadow-hover group hover:-translate-y-2 h-full"
              >
                <CardContent className="p-6 xl:p-8 text-center space-y-4">
                  <div className="inline-flex items-center justify-center w-16 h-16 xl:w-20 xl:h-20 rounded-full bg-primary/10 group-hover:bg-primary/20 group-hover:rotate-12 transition-all duration-500">
                    <feature.icon className="h-8 w-8 xl:h-10 xl:w-10 text-primary" />
                  </div>
                  <h3 className="text-xl xl:text-2xl font-semibold text-foreground group-hover:text-primary transition-colors">
                    {t(feature.titleKey)}
                  </h3>
                  <p className="text-sm xl:text-base text-muted-foreground leading-relaxed transition-colors group-hover:text-foreground">
                    {t(feature.descKey)}
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
