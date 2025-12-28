import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import content from '../content';

const LanguageContext = createContext(null);

const isPreviewMode =
  new URLSearchParams(window.location.search).get('cmsPreview') === '1';

const initialLanguage = () => {
  if (!isPreviewMode) {
    return 'zh';
  }

  const langParam = new URLSearchParams(window.location.search).get('lang');
  return langParam === 'en' ? 'en' : 'zh';
};

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(initialLanguage);
  const [previewContent, setPreviewContent] = useState({});

  useEffect(() => {
    document.documentElement.lang = language === 'zh' ? 'zh-Hant' : 'en';
  }, [language]);

  useEffect(() => {
    if (!isPreviewMode) return;

    const handleMessage = (event) => {
      if (event.origin !== window.location.origin) return;
      const payload = event.data || {};

      if (payload.type !== 'cms-preview') return;
      if (!payload.language || !payload.data) return;

      setPreviewContent((current) => ({
        ...current,
        [payload.language]: payload.data,
      }));
    };

    window.addEventListener('message', handleMessage);

    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      content: previewContent[language] || content[language] || content.zh,
    }),
    [language, previewContent]
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
