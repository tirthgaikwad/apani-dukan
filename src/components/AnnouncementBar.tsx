import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { getActiveAnnouncements } from '@/db/api';
import type { Announcement } from '@/types/database';

export default function AnnouncementBar() {
  const { language } = useLanguage();
  const [isVisible, setIsVisible] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadAnnouncements() {
      try {
        const data = await getActiveAnnouncements();
        setAnnouncements(data);
      } catch (error) {
        console.error('Error loading announcements:', error);
      } finally {
        setLoading(false);
      }
    }

    loadAnnouncements();
  }, []);

  useEffect(() => {
    // Check if user has closed the announcement bar
    const isClosed = localStorage.getItem('announcement-bar-closed');
    if (isClosed === 'true') {
      setIsVisible(false);
    }

    // Rotate announcements every 5 seconds
    if (announcements.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % announcements.length);
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [announcements]);

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem('announcement-bar-closed', 'true');
  };

  if (!isVisible || loading || announcements.length === 0) return null;

  const currentAnnouncement = announcements[currentIndex];
  const message = language === 'mr' ? currentAnnouncement.message_mr : currentAnnouncement.message_en;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-primary via-secondary to-primary text-primary-foreground shadow-lg animate-in slide-in-from-top duration-500">
      <div className="container mx-auto px-4 py-2 xl:py-3">
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1 text-center">
            <p className="text-sm xl:text-base font-medium animate-in fade-in duration-500">
              {message}
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClose}
            className="shrink-0 h-6 w-6 p-0 hover:bg-primary-foreground/20 rounded-full"
            aria-label="Close announcement"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
