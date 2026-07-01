import { Button } from '@/components/ui/button';
import { Phone, MessageCircle, MapPin, Download } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { toast } from 'sonner';
import FestivalConfetti from '@/components/FestivalConfetti';
import FestivalProductCard from '@/components/FestivalProductCard';
import FestivalImagePreloader from '@/components/FestivalImagePreloader';

export default function Holi() {
  const navigate = useNavigate();

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleCall = () => {
    window.location.href = 'tel:+919876543210';
  };

  const handleWhatsApp = () => {
    window.open('https://wa.me/919876543210?text=Hello%20Apani%20Dukan!%20I%20want%20to%20order%20Holi%20celebration%20items.', '_blank');
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
    link.href = '/catalogs/holi-catalog.pdf';
    link.download = 'Apani-Dukan-Holi-Catalog.pdf';
    link.setAttribute('type', 'application/pdf');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('📥 Catalog download started successfully.', {
      description: 'Holi Gift Catalog is being downloaded to your device.',
      duration: 3000,
    });
  };

  const products = [
    {
      image: 'https://miaoda-site-img.s3cdn.medo.dev/images/52b4b910-233f-45e5-81f0-0f96416f7f58.jpg',
      name: 'Organic Color Pack',
      description: 'Safe and eco-friendly gulal colors for vibrant Holi celebrations',
      price: 399
    },
    {
      image: 'https://miaoda-site-img.s3cdn.medo.dev/images/d107570c-8e1e-41f1-80ca-ebb639c833f0.jpg',
      name: 'Holi Celebration Combo',
      description: 'Complete Holi kit with colors, water guns, and party supplies',
      price: 999
    },
    {
      image: 'https://miaoda-site-img.s3cdn.medo.dev/images/bf56e177-6120-4b50-9ba9-e7db416bb71b.jpg',
      name: 'Water Gun (Pichkari) Set',
      description: 'Colorful and fun water guns for exciting Holi celebrations',
      price: 299
    }
  ];

  const productImages = products.map(p => p.image);

  return (
    <div className="min-h-screen bg-background">
      <FestivalImagePreloader images={productImages} festivalName="Holi" />
      <FestivalConfetti />
      <section className="relative min-h-[60vh] xl:min-h-[70vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-secondary/20 via-primary/10 to-accent/15">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmNjMDAiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE2YzAtMi4yMSAxLjc5LTQgNC00czQgMS43OSA0IDQtMS43OSA0LTQgNC00LTEuNzktNC00em0wIDI0YzAtMi4yMSAxLjc5LTQgNC00czQgMS43OSA0IDQtMS43OSA0LTQgNC00LTEuNzktNC00ek0xMiAxNmMwLTIuMjEgMS43OS00IDQtNHM0IDEuNzkgNCA0LTEuNzkgNC00IDQtNC0xLjc5LTQtNHptMCAyNGMwLTIuMjEgMS43OS00IDQtNHM0IDEuNzkgNCA0LTEuNzkgNC00IDQtNC0xLjc5LTQtNHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-40" />
        
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
              Celebrate Colors of Joy & Unity{' '}
              <span className="inline-block">🎨</span>
            </h1>
            <p className="text-lg xl:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Make your Holi vibrant and safe with organic colors and celebration items from Apani Dukan
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 xl:py-24 bg-background">
        <div className="container px-4 xl:px-8">
          <div className="max-w-4xl mx-auto space-y-6 xl:space-y-8 text-center">
            <h2 className="text-3xl xl:text-5xl font-bold text-foreground">
              About Holi
            </h2>
            <div className="w-20 h-1 bg-secondary mx-auto rounded-full" />
            <div className="space-y-4 text-base xl:text-lg text-muted-foreground leading-relaxed">
              <p>
                Holi, the Festival of Colors, is a joyous celebration that marks the arrival of spring and the victory of good over evil. It's a time when people come together, forget differences, and celebrate with vibrant colors, music, dance, and delicious food.
              </p>
              <p>
                At Apani Dukan, we prioritize your safety and the environment. Our organic color packs are made from natural ingredients, ensuring a safe and eco-friendly celebration. We also offer complete Holi celebration kits with water guns, party supplies, and everything you need for a memorable festival.
              </p>
              <p>
                Whether you're planning a big community celebration or a fun family gathering, we have all the essentials to make your Holi colorful and joyful. Visit our store in <span translate="no" className="notranslate">Akole</span> or order through WhatsApp for quick delivery!
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 xl:py-24 bg-accent/30">
        <div className="container px-4 xl:px-8">
          <div className="text-center mb-12 xl:mb-16 space-y-3 xl:space-y-4">
            <h2 className="text-3xl xl:text-5xl font-bold text-foreground">
              Holi Special Products
            </h2>
            <p className="text-base xl:text-xl text-muted-foreground max-w-2xl mx-auto">
              Play safe and celebrate with our exclusive Holi collection
            </p>
            <div className="w-20 h-1 bg-secondary mx-auto rounded-full" />
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

      <section className="py-16 xl:py-24 bg-gradient-to-br from-secondary/5 to-background">
        <div className="container px-4 xl:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-6 xl:space-y-8">
            <h2 className="text-3xl xl:text-5xl font-bold text-foreground">
              Order Your Holi Essentials Today!
            </h2>
            <p className="text-base xl:text-xl text-muted-foreground">
              Make this Holi safe, colorful, and memorable with Apani Dukan
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
