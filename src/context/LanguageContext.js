import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import content from '../content';

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('zh');

  useEffect(() => {
    document.documentElement.lang = language === 'zh' ? 'zh-Hant' : 'en';
  }, [language]);

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      content: content[language] || content.zh,
    }),
    [language]
  );

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }

  return context;
}
