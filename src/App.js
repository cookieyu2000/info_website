import { useEffect } from 'react';
import './App.css';
import About from './components/About';
import Contact from './components/Contact';
import Education from './components/Education';
import Experience from './components/Experience';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Navbar from './components/Navbar';
import Works from './components/Works';
import { LanguageProvider } from './context/LanguageContext';

function App() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('cmsPreview') !== '1') return undefined;

    const handleMessage = (event) => {
      if (event.origin !== window.location.origin) return;
      const payload = event.data || {};

      if (payload.type !== 'cms-scroll' || !payload.section) return;
      const target =
        document.getElementById(payload.section) ||
        document.querySelector(payload.section);

      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  return (
    <LanguageProvider>
      <div className="page">
        <Navbar />
        <main>
          <Hero />
          <Education />
          <Experience />
          <About />
          <Works />
          <Contact />
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
}

export default App;
