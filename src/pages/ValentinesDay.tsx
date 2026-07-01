import { Button } from '@/components/ui/button';
import { Phone, MessageCircle, MapPin, Download, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { toast } from 'sonner';
import FestivalConfetti from '@/components/FestivalConfetti';
import FestivalProductCard from '@/components/FestivalProductCard';
import FestivalImagePreloader from '@/components/FestivalImagePreloader';

export default function ValentinesDay() {
  const navigate = useNavigate();

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleCall = () => {
    window.location.href = 'tel:+919876543210';
  };

  const handleWhatsApp = () => {
    window.open('https://wa.me/919876543210?text=Hello%20Apani%20Dukan!%20I%20want%20to%20order%20Valentine%27s%20Day%20gifts.', '_blank');
  };

  const handleBackToFestivals = () => {
    navigate('/#festival-collections');
    // Small delay to ensure navigation completes before scrolling
    setTimeout(() => {
      const element = document.getElementById('festival-collections');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  const handleDownloadCatalog = () => {
    const link = document.createElement('a');
    link.href = '/catalogs/valentines-day-catalog.pdf';
    link.download = 'Apani-Dukan-Valentines-Day-Catalog.pdf';
    link.setAttribute('type', 'application/pdf');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('📥 Catalog download started successfully.', {
      description: "Valentine's Day Gift Catalog is being downloaded to your device.",
      duration: 3000,
    });
  };

  const products = [
    {
      image: 'https://miaoda-site-img.s3cdn.medo.dev/images/4e881d45-e4bf-4bb5-a0dd-8f1822492725.jpg',
      name: 'Heart Shape Gift Box',
      description: 'Beautiful red heart-shaped gift box perfect for expressing your love',
      price: 499
    },
    {
      image: 'https://miaoda-site-img.s3cdn.medo.dev/images/aceaa456-7c36-40a7-96c8-20f2efdb86f3.jpg',
      name: 'Teddy Bear with Rose',
      description: 'Adorable teddy bear holding a red rose, a classic romantic gift',
      price: 699
    },
    {
      image: 'https://miaoda-site-img.s3cdn.medo.dev/images/f0864c8a-61f1-45dc-95c2-d480676dcfc2.jpg',
      name: 'Chocolate Love Combo',
      description: 'Premium assorted chocolates in elegant packaging',
      price: 899
    },
    {
      image: 'https://miaoda-site-img.s3cdn.medo.dev/images/00847f3a-2350-4325-a446-6f0d23e98e2e.jpg',
      name: 'Love Message Bottle',
      description: 'Romantic message in a decorative glass bottle',
      price: 299
    },
    {
      image: 'https://miaoda-site-img.s3cdn.medo.dev/images/523c2613-d7bb-4e88-86b0-87c3421ca537.jpg',
      name: 'Premium Valentine Hamper',
      description: 'Luxury gift hamper with chocolates, flowers, and romantic items',
      price: 1499
    },
    {
      image: 'https://miaoda-site-img.s3cdn.medo.dev/images/1848850a-31c3-4006-ae05-dc1c28b8dcd5.jpg',
      name: 'Scented Candle Set',
      description: 'Romantic scented candles for a perfect ambiance',
      price: 599
    }
  ];

  const productImages = products.map(p => p.image);

  return (
    <div className="min-h-screen bg-background">
      <FestivalImagePreloader images={productImages} festivalName="Valentine's Day" />
      <FestivalConfetti />
      <section className="relative min-h-[60vh] xl:min-h-[70vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-destructive/10 via-background to-destructive/5">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZjAwMDAiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDE2YzAtMi4yMSAxLjc5LTQgNC00czQgMS43OSA0IDQtMS43OSA0LTQgNC00LTEuNzktNC00em0wIDI0YzAtMi4yMSAxLjc5LTQgNC00czQgMS43OSA0IDQtMS43OSA0LTQgNC00LTEuNzktNC00ek0xMiAxNmMwLTIuMjEgMS43OS00IDQtNHM0IDEuNzkgNCA0LTEuNzkgNC00IDQtNC0xLjc5LTQtNHptMCAyNGMwLTIuMjEgMS43OS00IDQtNHM0IDEuNzkgNCA0LTEuNzkgNC00IDQtNC0xLjc5LTQtNHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-40" />
        
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
              Celebrate Love with Perfect Gifts{' '}
              <span className="inline-block">❤️</span>
            </h1>
            <p className="text-lg xl:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Make this Valentine's Day unforgettable with thoughtful gifts from Apani Dukan
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 xl:py-24 bg-background">
        <div className="container px-4 xl:px-8">
          <div className="max-w-4xl mx-auto space-y-6 xl:space-y-8 text-center">
            <h2 className="text-3xl xl:text-5xl font-bold text-foreground">
              About Valentine's Day
            </h2>
            <div className="w-20 h-1 bg-destructive mx-auto rounded-full" />
            <div className="space-y-4 text-base xl:text-lg text-muted-foreground leading-relaxed">
              <p>
                Valentine's Day is a celebration of love, care, and togetherness. It's a special day to express your feelings to those who matter most in your life. Whether it's your partner, family, or friends, a thoughtful gift can express emotions better than words.
              </p>
              <p>
                At Apani Dukan, we understand the importance of making this day memorable. Our carefully curated collection of Valentine's gifts includes romantic presents, sweet treats, and personalized items that will make your loved ones feel truly special.
              </p>
              <p>
                From classic teddy bears and chocolates to unique gift hampers and romantic décor, we have everything you need to celebrate love in the most beautiful way. Visit us in Akole or order through WhatsApp for quick delivery!
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 xl:py-24 bg-accent/30">
        <div className="container px-4 xl:px-8">
          <div className="text-center mb-12 xl:mb-16 space-y-3 xl:space-y-4">
            <h2 className="text-3xl xl:text-5xl font-bold text-foreground">
              Valentine's Day Special Products
            </h2>
            <p className="text-base xl:text-xl text-muted-foreground max-w-2xl mx-auto">
              Express your love with our exclusive Valentine's collection
            </p>
            <div className="w-20 h-1 bg-destructive mx-auto rounded-full" />
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

      <section className="py-16 xl:py-24 bg-gradient-to-br from-destructive/5 to-background">
        <div className="container px-4 xl:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-6 xl:space-y-8">
            <h2 className="text-3xl xl:text-5xl font-bold text-foreground">
              Order Your Valentine's Gifts Today!
            </h2>
            <p className="text-base xl:text-xl text-muted-foreground">
              Make this Valentine's Day special with gifts from Apani Dukan
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
