import { Button } from '@/components/ui/button';
import { Phone, MessageCircle, MapPin, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import FestivalConfetti from '@/components/FestivalConfetti';
import FestivalProductCard from '@/components/FestivalProductCard';
import FestivalImagePreloader from '@/components/FestivalImagePreloader';

export default function GaneshChaturthi() {
  const navigate = useNavigate();

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleCall = () => {
    window.location.href = 'tel:+919876543210';
  };

  const handleWhatsApp = () => {
    window.open('https://wa.me/919876543210?text=Hello%20Apani%20Dukan!%20I%20want%20to%20order%20Ganesh%20Chaturthi%20items.', '_blank');
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



  const products = [
    {
      image: 'https://miaoda-site-img.s3cdn.medo.dev/images/df21cd74-3e95-4c07-8488-aa7b34b8ce8b.jpg',
      name: 'Eco-friendly Ganpati Idol',
      description: 'Beautiful clay Ganesh idol, environment-friendly and traditional',
      price: 899
    },
    {
      image: 'https://miaoda-site-img.s3cdn.medo.dev/images/ac07df07-2e69-4f1f-921a-e79b9af50992.jpg',
      name: 'Puja Samagri Kit',
      description: 'Complete puja items kit for Ganesh Chaturthi rituals',
      price: 599
    },
    {
      image: 'https://miaoda-site-img.s3cdn.medo.dev/images/6d677915-0673-46dd-9d93-3264d97543a1.jpg',
      name: 'Ganpati Decoration Set',
      description: 'Beautiful decoration set with flowers and backdrop for Ganpati',
      price: 1499
    }
  ];

  const productImages = products.map(p => p.image);

  return (
    <div className="min-h-screen bg-background">
      <FestivalImagePreloader images={productImages} festivalName="Ganesh Chaturthi" />
      <FestivalConfetti />
      <section className="relative min-h-[60vh] xl:min-h-[70vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary/20 via-accent/10 to-background">
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
              Welcome Lord Ganesha with Devotion{' '}
              <span className="inline-block">🐘</span>
            </h1>
            <p className="text-lg xl:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Celebrate Ganesh Chaturthi with eco-friendly idols and puja essentials from Apani Dukan
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 xl:py-24 bg-background">
        <div className="container px-4 xl:px-8">
          <div className="max-w-4xl mx-auto space-y-6 xl:space-y-8 text-center">
            <h2 className="text-3xl xl:text-5xl font-bold text-foreground">
              About Ganesh Chaturthi
            </h2>
            <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
            <div className="space-y-4 text-base xl:text-lg text-muted-foreground leading-relaxed">
              <p>
                Ganesh Chaturthi is one of the most beloved Hindu festivals celebrating the birth of Lord Ganesha, the remover of obstacles and the god of wisdom and prosperity. This auspicious festival brings families and communities together in devotion, celebration, and joy.
              </p>
              <p>
                At Apani Dukan, we offer a complete range of Ganesh Chaturthi essentials. Our eco-friendly clay Ganpati idols are crafted with care, respecting both tradition and the environment. We also provide complete puja samagri kits and beautiful decoration items to make your celebrations divine.
              </p>
              <p>
                Whether you're bringing Ganpati home for the first time or continuing a cherished tradition, we have everything you need for a blessed and memorable celebration. Visit our store in <span translate="no" className="notranslate">Akole</span> or order through WhatsApp for convenient shopping!
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 xl:py-24 bg-accent/30">
        <div className="container px-4 xl:px-8">
          <div className="text-center mb-12 xl:mb-16 space-y-3 xl:space-y-4">
            <h2 className="text-3xl xl:text-5xl font-bold text-foreground">
              Ganesh Chaturthi Special Products
            </h2>
            <p className="text-base xl:text-xl text-muted-foreground max-w-2xl mx-auto">
              Welcome Bappa with our exclusive Ganpati collection
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
              Order Your Ganpati Essentials Today!
            </h2>
            <p className="text-base xl:text-xl text-muted-foreground">
              Celebrate Ganesh Chaturthi with devotion - Shop from Apani Dukan
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
              <div
                className="w-full xl:w-auto h-14 xl:h-auto rounded-md border border-border/40 bg-muted/40 flex items-center justify-center gap-2 text-muted-foreground text-base xl:text-lg px-8 py-4 cursor-not-allowed select-none"
                title="Ganesh Chaturthi catalog coming soon"
              >
                <Clock className="h-5 w-5 shrink-0" />
                Catalog Coming Soon
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
