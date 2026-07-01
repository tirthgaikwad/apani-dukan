import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

interface FestivalProductCardProps {
  product: {
    image: string;
    name: string;
    description: string;
    price: number;
  };
  index: number;
  isPriority?: boolean;
}

export default function FestivalProductCard({ product, index, isPriority = false }: FestivalProductCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleOrder = () => {
    window.open(
      `https://wa.me/919876543210?text=Hi!%20I%20want%20to%20order%20${encodeURIComponent(product.name)}%20-%20₹${product.price}`,
      '_blank'
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-card rounded-lg border border-border shadow-card hover:shadow-hover transition-all duration-300 hover:-translate-y-1 overflow-hidden group"
    >
      <div className="relative overflow-hidden aspect-square bg-muted">
        {/* Skeleton Loader */}
        {!imageLoaded && (
          <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-muted via-muted/50 to-muted" />
        )}
        
        {/* Product Image */}
        <img
          src={product.image}
          alt={product.name}
          width={600}
          height={600}
          className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-110 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setImageLoaded(true)}
          loading={isPriority ? 'eager' : 'lazy'}
          fetchPriority={isPriority ? 'high' : 'auto'}
        />
      </div>
      
      <div className="p-6 space-y-4">
        <h3 className="text-lg xl:text-xl font-semibold text-foreground">
          {product.name}
        </h3>
        <p className="text-sm xl:text-base text-muted-foreground">
          {product.description}
        </p>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl xl:text-3xl font-bold text-primary">
            ₹{product.price}
          </span>
        </div>
        <Button
          onClick={handleOrder}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
        >
          <MessageCircle className="mr-2 h-4 w-4" />
          Order on WhatsApp
        </Button>
      </div>
    </motion.div>
  );
}
