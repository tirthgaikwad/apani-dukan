import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Star } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { submitFeedback } from '@/db/api';

export default function FeedbackForm() {
  const { t } = useLanguage();

  const [formData, setFormData] = useState({
    name: '',
    rating: 0,
    feedback: '',
    phone: ''
  });
  
  const [hoveredRating, setHoveredRating] = useState(0);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = t('feedbackErrorName');
    }
    
    if (formData.rating === 0) {
      newErrors.rating = t('feedbackErrorRating');
    }
    
    if (!formData.feedback.trim()) {
      newErrors.feedback = t('feedbackErrorMessage');
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Submit feedback to database
      const result = await submitFeedback({
        name: formData.name,
        rating: formData.rating,
        feedback: formData.feedback,
        phone: formData.phone || undefined
      });

      if (result.success) {
        // Show success message
        toast.success(t('feedbackSuccess'), {
          description: t('feedbackSuccessMessage'),
          duration: 5000,
        });

        // Reset form
        setFormData({
          name: '',
          rating: 0,
          feedback: '',
          phone: ''
        });
        setErrors({});
      } else {
        throw new Error(result.error || 'Failed to submit feedback');
      }

    } catch (error) {
      console.error('Feedback submission error:', error);
      toast.error('Something went wrong. Please try again.', {
        description: error instanceof Error ? error.message : 'Please check your connection and retry.',
        duration: 4000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRatingClick = (rating: number) => {
    setFormData(prev => ({ ...prev, rating }));
    if (errors.rating) {
      setErrors(prev => ({ ...prev, rating: '' }));
    }
  };

  return (
    <section className="py-16 xl:py-24 bg-gradient-to-br from-accent/10 via-background to-primary/5 overflow-hidden">
      <div className="container px-4 xl:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto"
        >
          <Card className="border-2 border-border hover:border-primary/30 transition-all duration-500 shadow-hover">
            <CardContent className="p-6 xl:p-12 space-y-6 xl:space-y-8">
              {/* Header */}
              <div className="text-center space-y-3 xl:space-y-4">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="inline-flex items-center justify-center w-16 h-16 xl:w-20 xl:h-20 rounded-full bg-primary/10 mb-4"
                >
                  <span className="text-3xl xl:text-4xl">💬</span>
                </motion.div>
                <h2 className="text-2xl xl:text-4xl font-bold text-foreground">
                  {t('feedbackTitle')}
                </h2>
                <p className="text-sm xl:text-base text-muted-foreground max-w-xl mx-auto">
                  {t('feedbackSubtitle')}
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Field */}
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-base font-medium">
                    {t('feedbackName')} <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder={t('feedbackNamePlaceholder')}
                    value={formData.name}
                    onChange={(e) => {
                      setFormData(prev => ({ ...prev, name: e.target.value }));
                      if (errors.name) setErrors(prev => ({ ...prev, name: '' }));
                    }}
                    className={`h-12 text-base ${errors.name ? 'border-destructive' : ''}`}
                  />
                  <AnimatePresence>
                    {errors.name && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="text-sm text-destructive"
                      >
                        {errors.name}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                {/* Rating Field */}
                <div className="space-y-3">
                  <Label className="text-base font-medium">
                    {t('feedbackRating')} <span className="text-destructive">*</span>
                  </Label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <motion.button
                        key={star}
                        type="button"
                        onClick={() => handleRatingClick(star)}
                        onMouseEnter={() => setHoveredRating(star)}
                        onMouseLeave={() => setHoveredRating(0)}
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        className="focus:outline-none focus:ring-2 focus:ring-primary rounded-full p-1"
                      >
                        <Star
                          className={`h-10 w-10 xl:h-12 xl:w-12 transition-all duration-200 ${
                            star <= (hoveredRating || formData.rating)
                              ? 'fill-primary text-primary'
                              : 'text-muted-foreground'
                          }`}
                        />
                      </motion.button>
                    ))}
                    {formData.rating > 0 && (
                      <motion.span
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="ml-2 text-lg font-semibold text-primary"
                      >
                        {formData.rating}/5
                      </motion.span>
                    )}
                  </div>
                  <AnimatePresence>
                    {errors.rating && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="text-sm text-destructive"
                      >
                        {errors.rating}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                {/* Feedback Field */}
                <div className="space-y-2">
                  <Label htmlFor="feedback" className="text-base font-medium">
                    {t('feedbackMessage')} <span className="text-destructive">*</span>
                  </Label>
                  <Textarea
                    id="feedback"
                    placeholder={t('feedbackMessagePlaceholder')}
                    value={formData.feedback}
                    onChange={(e) => {
                      setFormData(prev => ({ ...prev, feedback: e.target.value }));
                      if (errors.feedback) setErrors(prev => ({ ...prev, feedback: '' }));
                    }}
                    rows={5}
                    className={`text-base resize-none ${errors.feedback ? 'border-destructive' : ''}`}
                  />
                  <AnimatePresence>
                    {errors.feedback && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="text-sm text-destructive"
                      >
                        {errors.feedback}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                {/* Phone Field (Optional) */}
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-base font-medium">
                    {t('feedbackPhone')}
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder={t('feedbackPhonePlaceholder')}
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    className="h-12 text-base"
                  />
                </div>

                {/* Privacy Notice */}
                <div className="flex items-start gap-2 p-4 bg-muted/50 rounded-lg border border-border">
                  <span className="text-lg shrink-0">🔒</span>
                  <p className="text-xs xl:text-sm text-muted-foreground leading-relaxed">
                    {t('feedbackPrivacy')}
                  </p>
                </div>

                {/* CTA Message */}
                <div className="text-center">
                  <p className="text-sm xl:text-base text-primary font-medium">
                    {t('feedbackCTA')}
                  </p>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-14 text-lg font-semibold bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-primary/20 transition-all duration-300 active:scale-95"
                >
                  {isSubmitting ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-6 h-6 border-2 border-primary-foreground border-t-transparent rounded-full"
                    />
                  ) : (
                    t('feedbackSubmit')
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
