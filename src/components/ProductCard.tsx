import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';

interface ProductCardProps {
  image: string;
  name: string;
  description: string;
  price: number;
  onOrder?: () => void;
}

export default function ProductCard({ image, name, description, price, onOrder }: ProductCardProps) {
  const handleOrder = () => {
    if (onOrder) {
      onOrder();
    } else {
      window.open(
        `https://wa.me/919876543210?text=Hi!%20I%20want%20to%20order%20${encodeURIComponent(name)}%20-%20₹${price}`,
        '_blank'
      );
    }
  };

  return (
    <Card className="border-border shadow-card hover:shadow-hover transition-all duration-500 hover:-translate-y-2 bg-card overflow-hidden group sparkle-effect">
      <div className="relative overflow-hidden aspect-square">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
      <CardHeader>
        <CardTitle className="text-lg xl:text-xl text-foreground line-clamp-2 group-hover:text-primary transition-colors duration-300">
          {name}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm xl:text-base text-muted-foreground line-clamp-2 mb-3 group-hover:text-foreground transition-colors duration-300">
          {description}
        </p>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl xl:text-3xl font-bold text-primary group-hover:scale-110 transition-transform duration-300 origin-left">
            ₹{price}
          </span>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          onClick={handleOrder}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm hover:shadow-primary/20 transition-all duration-300 active:scale-95"
        >
          <ShoppingCart className="mr-2 h-4 w-4 group-hover:animate-bounce" />
          Order on WhatsApp
        </Button>
      </CardFooter>
    </Card>
  );
}
