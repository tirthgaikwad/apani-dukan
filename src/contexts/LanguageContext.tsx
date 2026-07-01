import { createContext, useContext, useState, useEffect, ReactNode, useCallback, useMemo } from 'react';
import { Language, translations } from '@/data/translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    // Get language from localStorage or default to English
    const saved = localStorage.getItem('apani-dukan-language');
    return (saved === 'mr' ? 'mr' : 'en') as Language;
  });

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('apani-dukan-language', lang);
  }, []);

  // Translation function - memoized to prevent unnecessary re-renders
  const t = useCallback((key: string): string => {
    const translationKey = key as keyof typeof translations.en;
    return translations[language][translationKey] || key;
  }, [language]);

  useEffect(() => {
    // Save language preference
    localStorage.setItem('apani-dukan-language', language);
  }, [language]);

  const value = useMemo(
    () => ({ language, setLanguage, t }),
    [language, setLanguage, t]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
