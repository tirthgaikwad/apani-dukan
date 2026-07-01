import { Heart } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary/20 border-t border-border py-8 xl:py-12">
      <div className="container px-4 xl:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 mb-8">
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-foreground">{t('footerShopName')}</h3>
            <p className="text-sm text-muted-foreground">
              {t('footerTagline')}
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">{t('footerQuickLinks')}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#about" className="hover:text-primary transition-colors">{t('about')}</a></li>
              <li><a href="#products" className="hover:text-primary transition-colors">{t('products')}</a></li>
              <li><a href="#testimonials" className="hover:text-primary transition-colors">{t('footerTestimonials')}</a></li>
              <li><a href="#contact" className="hover:text-primary transition-colors">{t('contact')}</a></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">{t('contactAddress')}</h4>
            <p className="text-sm text-muted-foreground">
              Mahalaxmi Mathuranagar Colony<br />
              <span translate="no" className="notranslate">Akole</span>, Maharashtra<br />
              422601
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">{t('contactPhone')}</h4>
            <p className="text-sm text-muted-foreground">
              +91 98765 43210
            </p>
          </div>
        </div>

        <div className="border-t border-border pt-8 text-center">
          <p className="text-sm text-muted-foreground flex items-center justify-center gap-2">
            {t('footerMadeWith')} <Heart className="h-4 w-4 text-primary fill-primary" /> {t('footerForAkole')}
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            © {currentYear} {t('footerShopName')}. {t('footerRights')}
          </p>
        </div>
      </div>
    </footer>
  );
}
