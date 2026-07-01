import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function FestivalConfetti() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  const particles = Array.from({ length: 25 });

  return (
    <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden">
      {particles.map((_, i) => (
        <motion.div
          key={i}
          initial={{ 
            top: "-5%", 
            left: `${Math.random() * 100}%`,
            scale: Math.random() * 0.3 + 0.3,
            rotate: 0,
            opacity: 1
          }}
          animate={{ 
            top: "105%",
            left: `${(Math.random() - 0.5) * 30 + (i / 25) * 100}%`,
            rotate: 720 * (Math.random() > 0.5 ? 1 : -1),
            opacity: 0
          }}
          transition={{ 
            duration: Math.random() * 1.5 + 1.5,
            ease: "easeOut",
            delay: Math.random() * 0.8
          }}
          className="absolute w-3 h-3 rounded-sm"
          style={{ 
            backgroundColor: [
              '#FFD700', // Gold
              '#FF9933', // Saffron
              '#FF69B4', // HotPink
              '#00FF00', // Lime
              '#00FFFF'  // Cyan
            ][Math.floor(Math.random() * 5)]
          }}
        />
      ))}
    </div>
  );
}
