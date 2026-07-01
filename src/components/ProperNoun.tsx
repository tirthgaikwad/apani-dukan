/**
 * ProperNoun Component
 * 
 * Protects proper nouns (like place names) from auto-translation.
 * Wraps text with translate="no" and notranslate class to prevent
 * Google Translate and other translation services from modifying it.
 * 
 * Usage:
 * <ProperNoun>Akole</ProperNoun>
 * 
 * This ensures "Akole" is never translated to incorrect forms like "आकोले"
 * and always remains as "Akole" in English or "अकोले" in Marathi.
 */

interface ProperNounProps {
  children: React.ReactNode;
  className?: string;
}

export default function ProperNoun({ children, className = '' }: ProperNounProps) {
  return (
    <span translate="no" className={`notranslate ${className}`}>
      {children}
    </span>
  );
}

/**
 * Location Name Component
 * 
 * Specialized component for location names with proper Marathi translation.
 * Ensures "Akole" is displayed correctly in both English and Marathi.
 */

interface LocationNameProps {
  location: 'Akole';
  language?: 'en' | 'mr';
  className?: string;
}

export function LocationName({ location, language = 'en', className = '' }: LocationNameProps) {
  const locationMap = {
    Akole: {
      en: 'Akole',
      mr: 'अकोले' // Correct Marathi spelling
    }
  };

  const displayName = locationMap[location][language];

  return (
    <span translate="no" className={`notranslate ${className}`}>
      {displayName}
    </span>
  );
}
