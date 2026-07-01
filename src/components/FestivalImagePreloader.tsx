import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

interface FestivalImagePreloaderProps {
  images: string[];
  festivalName: string;
}

export default function FestivalImagePreloader({ images, festivalName }: FestivalImagePreloaderProps) {
  useEffect(() => {
    // Preload first 6 images immediately
    const priorityImages = images.slice(0, 6);
    priorityImages.forEach((src) => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = src;
      document.head.appendChild(link);
    });

    return () => {
      // Cleanup preload links on unmount
      const preloadLinks = document.querySelectorAll('link[rel="preload"][as="image"]');
      preloadLinks.forEach((link) => {
        if (priorityImages.includes(link.getAttribute('href') || '')) {
          link.remove();
        }
      });
    };
  }, [images]);

  return (
    <Helmet>
      <title>{festivalName} Gifts - Apani Dukan | Akole</title>
      <meta name="description" content={`Shop exclusive ${festivalName} gifts and decorations at Apani Dukan, Akole. Premium quality products at affordable prices.`} />
      {/* Preload critical images */}
      {images.slice(0, 6).map((src, index) => (
        <link key={index} rel="preload" as="image" href={src} />
      ))}
    </Helmet>
  );
}
