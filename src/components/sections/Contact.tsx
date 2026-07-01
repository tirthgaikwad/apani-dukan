import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Phone, Clock, MessageCircle, ExternalLink } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';

export default function Contact() {
  const { t } = useLanguage();

  const handleWhatsApp = () => {
    window.open('https://wa.me/919876543210?text=Namaste%20Apani%20Dukan!%20I%27m%20interested%20in%20your%20gifts.%20Could%20you%20share%20more%20details%20or%20photos%3F%20Looking%20forward%20to%20visiting%20your%20Akole%20store!', '_blank');
  };

  const handleCall = () => {
    window.location.href = 'tel:+919876543210';
  };

  const handleGetDirections = () => {
    window.open('https://www.google.com/maps?q=G2Q7+FC3, Akole, Maharashtra 422601', '_blank');
  };

  return (
    <section className="py-16 xl:py-24 bg-gradient-to-br from-accent/10 via-background to-secondary/5 relative overflow-hidden">
      {/* Decorative background pattern or image can go here if needed */}
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[url(https://miaoda-edit-image.s3cdn.medo.dev/93a4xgnxzu2p/IMG-93wdbw8mfbwg.png)] bg-cover bg-center" />
      
      <div className="container relative z-10 px-4 xl:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 xl:mb-16 space-y-3 xl:space-y-4"
        >
          <h2 className="text-3xl xl:text-5xl font-bold text-foreground">
            {t('contactTitle')}
          </h2>
          <p className="text-base xl:text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('contactSubtitle')}
          </p>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 xl:gap-12 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Card className="border-2 border-border/50 bg-card/80 backdrop-blur-sm hover:border-primary transition-all duration-500 shadow-sm hover:shadow-hover group hover:-translate-y-1 h-full">
              <CardContent className="p-6 xl:p-8 space-y-6">
                <div className="space-y-6">
                  <div className="flex items-start gap-4 group/item">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0 group-hover/item:scale-110 transition-transform">
                      <MapPin className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2 group-hover/item:text-primary transition-colors">{t('contactAddress')}</h3>
                      <p className="text-muted-foreground leading-relaxed group-hover/item:text-foreground transition-colors">
                        Mahalaxmi Mathuranagar Colony<br />
                        <span translate="no" className="notranslate">Akole</span>, Maharashtra – 422601
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 group/item">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0 group-hover/item:scale-110 transition-transform">
                      <Phone className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2 group-hover/item:text-primary transition-colors">{t('contactPhone')}</h3>
                      <p className="text-muted-foreground group-hover/item:text-foreground transition-colors">+91 98765 43210</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 group/item">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0 group-hover/item:scale-110 transition-transform">
                      <Clock className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2 group-hover/item:text-primary transition-colors">{t('contactHours')}</h3>
                      <p className="text-muted-foreground group-hover/item:text-foreground transition-colors leading-relaxed">
                        {t('contactHoursWeekdays')}<br />
                        {t('contactHoursWeekends')}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col xl:flex-row gap-4 pt-4">
                  <Button
                    onClick={handleCall}
                    className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground h-12 transition-all duration-300 active:scale-95 shadow-sm hover:shadow-primary/20"
                  >
                    <Phone className="mr-2 h-5 w-5" />
                    {t('callNow')}
                  </Button>
                  <Button
                    onClick={handleWhatsApp}
                    variant="outline"
                    className="flex-1 border-primary text-primary hover:bg-primary hover:text-primary-foreground h-12 transition-all duration-300 active:scale-95"
                  >
                    <MessageCircle className="mr-2 h-5 w-5" />
                    {t('whatsappUs')}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            {/* Single Map Section */}
            <Card className="border-2 border-border/50 bg-card/80 backdrop-blur-sm hover:border-primary transition-all duration-500 shadow-sm hover:shadow-hover overflow-hidden">
              <CardContent className="p-6 xl:p-8 space-y-6">
                {/* Map Header */}
                <div className="text-center space-y-2">
                  <h3 className="text-2xl xl:text-3xl font-bold text-foreground flex items-center justify-center gap-2">
                    <MapPin className="h-6 w-6 xl:h-7 xl:w-7 text-primary" />
                    {t('findOnMap')}
                  </h3>
                  <p className="text-sm xl:text-base text-muted-foreground">
                    Apani Dukan, G2Q7+FC3, <span translate="no" className="notranslate">Akole</span>, Maharashtra 422601
                  </p>
                </div>

                {/* Map Embed */}
                <div className="relative w-full h-[350px] xl:h-[400px] rounded-2xl overflow-hidden">
                  <iframe
                    src="https://www.google.com/maps?q=G2Q7+FC3, Akole, Maharashtra 422601&output=embed"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Apani Dukan Location - G2Q7+FC3, Akole, Maharashtra 422601"
                  />
                </div>

                {/* Map Description */}
                <div className="text-center">
                  <p className="text-sm xl:text-base text-muted-foreground font-medium mb-4">
                    Easy to find • Parking available • Local favorite
                  </p>
                  
                  {/* Open in Google Maps Button */}
                  <Button
                    onClick={handleGetDirections}
                    className="w-full xl:w-auto px-8 py-6 text-base xl:text-lg font-semibold rounded-full shadow-lg hover:shadow-primary/30 transition-all duration-300 active:scale-95 bg-primary hover:bg-primary/90"
                  >
                    <MapPin className="mr-2 h-5 w-5" />
                    📍 Open in Google Maps
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
