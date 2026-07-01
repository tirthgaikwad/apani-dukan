import { useState } from 'react';
import { Download, FileText, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

interface CatalogItem {
  id: string;
  emoji: string;
  title: string;
  subtitle: string;
  filename: string;
  downloadName: string;
  fileSize: string;
  accentColor: string;
  available: boolean;
}

const CATALOGS: CatalogItem[] = [
  {
    id: 'valentines',
    emoji: '❤️',
    title: "Valentine's Day",
    subtitle: 'Love & Romance Gifts',
    filename: '/catalogs/valentines-day-catalog.pdf',
    downloadName: 'Apani-Dukan-Valentines-Day-Catalog.pdf',
    fileSize: '35 KB',
    accentColor: 'from-rose-900/40 to-rose-800/20',
    available: true,
  },
  {
    id: 'holi',
    emoji: '🎨',
    title: 'Holi',
    subtitle: 'Festival of Colors',
    filename: '/catalogs/holi-catalog.pdf',
    downloadName: 'Apani-Dukan-Holi-Catalog.pdf',
    fileSize: '4 KB',
    accentColor: 'from-purple-900/40 to-pink-800/20',
    available: true,
  },
  {
    id: 'diwali',
    emoji: '🪔',
    title: 'Diwali',
    subtitle: 'Festival of Lights',
    filename: '/catalogs/diwali-catalog.pdf',
    downloadName: 'Apani-Dukan-Diwali-Catalog.pdf',
    fileSize: '4 KB',
    accentColor: 'from-orange-900/40 to-yellow-800/20',
    available: true,
  },
  {
    id: 'birthday',
    emoji: '🎂',
    title: 'Birthday',
    subtitle: 'Celebration Gifts',
    filename: '/catalogs/birthday-catalog.pdf',
    downloadName: 'Apani-Dukan-Birthday-Catalog.pdf',
    fileSize: '4 KB',
    accentColor: 'from-green-900/40 to-emerald-800/20',
    available: true,
  },
  {
    id: 'raksha',
    emoji: '🎀',
    title: 'Raksha Bandhan',
    subtitle: 'Bond of Love',
    filename: '',
    downloadName: '',
    fileSize: '',
    accentColor: 'from-muted/40 to-muted/20',
    available: false,
  },
  {
    id: 'ganesh',
    emoji: '🐘',
    title: 'Ganesh Chaturthi',
    subtitle: 'Ganpati Essentials',
    filename: '',
    downloadName: '',
    fileSize: '',
    accentColor: 'from-muted/40 to-muted/20',
    available: false,
  },
];

interface CatalogCardProps {
  catalog: CatalogItem;
}

function CatalogCard({ catalog }: CatalogCardProps) {
  const [downloading, setDownloading] = useState(false);

  const handleDownload = () => {
    if (!catalog.available) return;
    setDownloading(true);

    const link = document.createElement('a');
    link.href = catalog.filename;
    link.download = catalog.downloadName;
    link.setAttribute('type', 'application/pdf');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast.success('📥 Catalog download started successfully.', {
      description: `${catalog.title} Gift Catalog is being downloaded to your device.`,
      duration: 3000,
    });

    setTimeout(() => setDownloading(false), 1200);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={catalog.available ? { y: -4 } : {}}
      className="h-full"
    >
      <div
        className={`
          relative h-full flex flex-col rounded-2xl border overflow-hidden
          bg-gradient-to-br ${catalog.accentColor}
          ${catalog.available
            ? 'border-border hover:border-primary/50 hover:shadow-[0_8px_32px_rgba(212,175,55,0.25)] transition-all duration-300'
            : 'border-border/40 opacity-60'
          }
        `}
      >
        {/* Coming Soon overlay badge */}
        {!catalog.available && (
          <div className="absolute top-3 right-3 z-10">
            <Badge
              variant="secondary"
              className="bg-muted text-muted-foreground border border-border/60 text-xs font-medium px-2.5 py-1 flex items-center gap-1"
            >
              <Clock className="h-3 w-3" />
              Coming Soon
            </Badge>
          </div>
        )}

        {/* Card body */}
        <div className="flex flex-col flex-1 p-5 md:p-6 gap-4">
          {/* Icon + title */}
          <div className="flex items-start gap-3">
            <div
              className={`
                w-14 h-14 rounded-xl flex items-center justify-center text-3xl shrink-0
                bg-card/60 border border-border/60
                ${catalog.available ? '' : 'grayscale'}
              `}
            >
              {catalog.emoji}
            </div>
            <div className="min-w-0">
              <h3 className={`font-bold text-base md:text-lg leading-tight text-balance ${catalog.available ? 'text-foreground' : 'text-muted-foreground'}`}>
                {catalog.title} Catalog
              </h3>
              <p className="text-xs md:text-sm text-muted-foreground mt-0.5">{catalog.subtitle}</p>
            </div>
          </div>

          {/* File meta */}
          {catalog.available && (
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <FileText className="h-3.5 w-3.5 shrink-0" />
              <span>PDF · {catalog.fileSize}</span>
            </div>
          )}

          {/* Spacer */}
          <div className="flex-1" />

          {/* CTA */}
          {catalog.available ? (
            <motion.div
              animate={downloading ? { scale: 0.95 } : { scale: 1 }}
              transition={{ duration: 0.15 }}
            >
              <Button
                onClick={handleDownload}
                disabled={downloading}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-sm h-10 transition-all duration-200 group"
                aria-label={`Download ${catalog.title} Catalog PDF`}
              >
                <Download
                  className={`mr-2 h-4 w-4 transition-transform duration-300 ${
                    downloading ? 'animate-bounce' : 'group-hover:translate-y-0.5'
                  }`}
                />
                {downloading ? 'Downloading…' : 'Download Catalog'}
              </Button>
            </motion.div>
          ) : (
            <div
              className="w-full h-10 rounded-md border border-border/40 bg-muted/40 flex items-center justify-center gap-2 text-muted-foreground text-sm cursor-not-allowed"
              aria-label={`${catalog.title} catalog coming soon`}
            >
              <Clock className="h-4 w-4" />
              Coming Soon
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function CatalogDownloadSection() {
  return (
    <section className="py-16 md:py-24 bg-background overflow-hidden">
      <div className="container px-4 md:px-8 max-w-5xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center space-y-3 mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/30 rounded-full px-4 py-1.5 text-sm font-medium text-primary mb-2">
            <FileText className="h-4 w-4" />
            Festival Gift Catalogs
          </div>
          <h2 className="text-2xl md:text-4xl font-bold text-foreground text-balance">
            Download Festival Gift Catalogs
          </h2>
          <p className="text-sm md:text-base text-muted-foreground max-w-xl mx-auto text-pretty">
            Browse our curated festival gift collections. Download the PDF catalog to explore all products, prices, and special offers — share with family &amp; friends on WhatsApp!
          </p>
        </motion.div>

        {/* Catalog grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {CATALOGS.map((catalog, index) => (
            <motion.div
              key={catalog.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.07 }}
              className="h-full"
            >
              <CatalogCard catalog={catalog} />
            </motion.div>
          ))}
        </div>

        {/* Footer note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center text-xs md:text-sm text-muted-foreground mt-8"
        >
          📱 Catalogs work on Android, iPhone &amp; Desktop · New catalogs added every season
        </motion.p>
      </div>
    </section>
  );
}
