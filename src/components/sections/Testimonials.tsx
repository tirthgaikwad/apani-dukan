import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Star, Quote } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import { getFeaturedTestimonials } from '@/db/api';
import type { Testimonial } from '@/types/database';
import { Skeleton } from '@/components/ui/skeleton';

export default function Testimonials() {
  const { t } = useLanguage();
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadTestimonials() {
      try {
        const data = await getFeaturedTestimonials(5);
        setTestimonials(data);
      } catch (error) {
        console.error('Error loading testimonials:', error);
      } finally {
        setLoading(false);
      }
    }

    loadTestimonials();
  }, []);

  if (loading) {
    return (
      <section className="py-16 xl:py-24 bg-gradient-to-br from-background via-secondary/5 to-background overflow-hidden">
        <div className="container px-4 xl:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12 xl:mb-16 space-y-3 xl:space-y-4">
              <Skeleton className="h-12 w-64 mx-auto bg-muted" />
              <Skeleton className="h-6 w-96 mx-auto bg-muted" />
            </div>
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 xl:gap-8">
              {[1, 2, 3, 4].map((i) => (
                <Card key={i} className="border-border">
                  <CardContent className="p-6 xl:p-8 space-y-4">
                    <Skeleton className="h-20 w-full bg-muted" />
                    <Skeleton className="h-6 w-32 bg-muted" />
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (testimonials.length === 0) {
    return null;
  }

  return (
    <section className="py-16 xl:py-24 bg-gradient-to-br from-background via-secondary/5 to-background overflow-hidden">
      <div className="container px-4 xl:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 xl:mb-16 space-y-3 xl:space-y-4"
          >
            <h2 className="text-3xl xl:text-5xl font-bold text-foreground">
              {t('testimonialsTitle')}
            </h2>
            <p className="text-base xl:text-xl text-muted-foreground max-w-2xl mx-auto">
              {t('testimonialsSubtitle')}
            </p>
            <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
          </motion.div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 xl:gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card
                  className="border-border shadow-sm hover:shadow-hover transition-all duration-500 bg-card/50 backdrop-blur-sm hover:-translate-y-1 hover:border-primary/30 group h-full"
                >
                  <CardContent className="p-6 xl:p-8 space-y-4">
                    <div className="flex items-start justify-between">
                      <Quote className="h-8 w-8 xl:h-10 xl:w-10 text-primary/20 group-hover:text-primary/40 transition-colors" />
                      <div className="flex gap-1">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star
                            key={i}
                            className="h-4 w-4 xl:h-5 xl:w-5 fill-primary text-primary"
                          />
                        ))}
                      </div>
                    </div>

                    <p className="text-base xl:text-lg text-muted-foreground leading-relaxed italic group-hover:text-foreground transition-colors">
                      "{testimonial.testimonial_text}"
                    </p>

                    <div className="pt-4 border-t border-border group-hover:border-primary/20 transition-colors">
                      <p className="font-semibold text-foreground text-base xl:text-lg">
                        {testimonial.customer_name}
                      </p>
                      <p className="text-sm xl:text-base text-muted-foreground">
                        {testimonial.location}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-center mt-8 xl:mt-12"
          >
            <p className="text-base xl:text-lg text-muted-foreground">
              {t('testimonialsFooter')} 🌟
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
