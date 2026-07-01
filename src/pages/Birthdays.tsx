import { Button } from '@/components/ui/button';
import { Phone, MessageCircle, MapPin, Download } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { toast } from 'sonner';
import FestivalConfetti from '@/components/FestivalConfetti';
import FestivalProductCard from '@/components/FestivalProductCard';
import FestivalImagePreloader from '@/components/FestivalImagePreloader';

export default function Birthdays() {
  const navigate = useNavigate();

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleCall = () => {
    window.location.href = 'tel:+919876543210';
  };

  const handleWhatsApp = () => {
    window.open('https://wa.me/919876543210?text=Hello%20Apani%20Dukan!%20I%20want%20to%20order%20Birthday%20gifts.', '_blank');
  };

  const handleBackToFestivals = () => {
    navigate('/#festival-collections');
    setTimeout(() => {
      const element = document.getElementById('festival-collections');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  const handleDownloadCatalog = () => {
    const link = document.createElement('a');
    link.href = '/catalogs/birthday-catalog.pdf';
    link.download = 'Apani-Dukan-Birthday-Catalog.pdf';
    link.setAttribute('type', 'application/pdf');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('📥 Catalog download started successfully.', {
      description: 'Birthday Gift Catalog is being downloaded to your device.',
      duration: 3000,
    });
  };

  const products = [
    {
      image: 'https://miaoda-site-img.s3cdn.medo.dev/images/e7692216-9ea4-455a-b44d-32749b9da05b.jpg',
      name: 'Birthday Decoration Kit',
      description: 'Complete decoration set with balloons, banners, and party supplies',
      price: 799
    },
    {
      image: 'https://miaoda-site-img.s3cdn.medo.dev/images/6fbde5af-cbea-46e7-b07d-894603ae72f0.jpg',
      name: 'Photo Frame Gift',
      description: 'Personalized photo frame to capture precious birthday memories',
      price: 499
    },
    {
      image: 'https://miaoda-site-img.s3cdn.medo.dev/images/52c1b97c-2fbd-4e43-9936-5f3caf2e89c9.jpg',
      name: 'Surprise Gift Box',
      description: 'Exciting surprise box filled with birthday treats and gifts',
      price: 1299
    }
  ];

  const productImages = products.map(p => p.image);

  return (
    <div className="min-h-screen bg-background">
      <FestivalImagePreloader images={productImages} festivalName="Birthday" />
      <FestivalConfetti />
      <section className="relative min-h-[60vh] xl:min-h-[70vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary/15 via-secondary/15 to-accent/20">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZjk5MzMiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE2YzAtMi4yMSAxLjc5LTQgNC00czQgMS43OSA0IDQtMS43OSA0LTQgNC00LTEuNzktNC00em0wIDI0YzAtMi4yMSAxLjc5LTQgNC00czQgMS43OSA0IDQtMS43OSA0LTQgNC00LTEuNzktNC00ek0xMiAxNmMwLTIuMjEgMS43OS00IDQtNHM0IDEuNzkgNCA0LTEuNzkgNC00IDQtNC0xLjc5LTQtNHptMCAyNGMwLTIuMjEgMS43OS00IDQtNHM0IDEuNzkgNCA0LTEuNzkgNC00IDQtNC0xLjc5LTQtNHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-40" />
        
        <div className="container relative z-10 px-4 xl:px-8 py-12 xl:py-20">
          <div className="max-w-4xl mx-auto text-center space-y-4 xl:space-y-6">
            <Button
              variant="ghost"
              onClick={handleBackToFestivals}
              className="mb-4"
            >
              ← Back to Festival Collections
            </Button>
            <h1 className="text-4xl xl:text-6xl font-bold text-foreground leading-tight">
              Make Every Birthday Unforgettable{' '}
              <span className="inline-block">🎂</span>
            </h1>
            <p className="text-lg xl:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Celebrate special moments with perfect birthday gifts and decorations from Apani Dukan
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 xl:py-24 bg-background">
        <div className="container px-4 xl:px-8">
          <div className="max-w-4xl mx-auto space-y-6 xl:space-y-8 text-center">
            <h2 className="text-3xl xl:text-5xl font-bold text-foreground">
              About Birthday Celebrations
            </h2>
            <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
            <div className="space-y-4 text-base xl:text-lg text-muted-foreground leading-relaxed">
              <p>
                Birthdays are special milestones that deserve to be celebrated with joy, love, and memorable gifts. Whether it's for a child, teenager, adult, or elderly person, finding the perfect gift can make their day truly extraordinary.
              </p>
              <p>
                At Apani Dukan, we offer a wonderful selection of birthday gifts, decorations, and party supplies to make every celebration special. From colorful decoration kits and personalized photo frames to exciting surprise boxes, we have everything you need to create magical birthday moments.
              </p>
              <p>
                Our collection caters to all age groups and preferences. Whether you're planning a grand party or an intimate celebration, visit our store in <span translate="no" className="notranslate">Akole</span> or order through WhatsApp to make birthdays memorable!
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 xl:py-24 bg-accent/30">
        <div className="container px-4 xl:px-8">
          <div className="text-center mb-12 xl:mb-16 space-y-3 xl:space-y-4">
            <h2 className="text-3xl xl:text-5xl font-bold text-foreground">
              Birthday Special Products
            </h2>
            <p className="text-base xl:text-xl text-muted-foreground max-w-2xl mx-auto">
              Make birthdays special with our exclusive gift collection
            </p>
            <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 xl:gap-8 max-w-7xl mx-auto">
            {products.map((product, index) => (
              <FestivalProductCard
                key={index}
                product={product}
                index={index}
                isPriority={index < 6}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 xl:py-24 bg-gradient-to-br from-primary/5 to-background">
        <div className="container px-4 xl:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-6 xl:space-y-8">
            <h2 className="text-3xl xl:text-5xl font-bold text-foreground">
              Order Your Birthday Gifts Today!
            </h2>
            <p className="text-base xl:text-xl text-muted-foreground">
              Make birthdays memorable with gifts and decorations from Apani Dukan
            </p>
            <div className="flex flex-col xl:flex-row gap-4 justify-center items-center pt-4">
              <Button
                size="lg"
                onClick={handleWhatsApp}
                className="w-full xl:w-auto bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg hover:shadow-xl transition-all duration-300 text-base xl:text-lg px-8 py-6"
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                WhatsApp Now to Order
              </Button>
              <Button
                size="lg"
                onClick={handleCall}
                className="w-full xl:w-auto bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 text-base xl:text-lg px-8 py-6"
              >
                <Phone className="mr-2 h-5 w-5" />
                Call for Bulk Orders
              </Button>
              <Button
                size="lg"
                onClick={() => navigate('/#contact')}
                variant="outline"
                className="w-full xl:w-auto shadow-lg hover:shadow-xl transition-all duration-300 text-base xl:text-lg px-8 py-6"
              >
                <MapPin className="mr-2 h-5 w-5" />
                Visit Our Store in <span translate="no" className="notranslate">Akole</span>
              </Button>
              <Button
                size="lg"
                onClick={handleDownloadCatalog}
                variant="outline"
                className="w-full xl:w-auto shadow-lg hover:shadow-xl transition-all duration-300 text-base xl:text-lg px-8 py-6"
              >
                <Download className="mr-2 h-5 w-5" />
                Download Festival Gift Catalog
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
