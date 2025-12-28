import { useLanguage } from '../context/LanguageContext';

function Footer() {
  const { content } = useLanguage();
  const { footer } = content;

  return (
    <>
      <footer className="footer py-4">
        <div className="container d-flex flex-column flex-md-row justify-content-between align-items-center gap-2">
          <span>{footer.copyright}</span>
        </div>
      </footer>
      <a className="back-to-top" href="#home" aria-label={footer.backToTop}>
        ↑
      </a>
    </>
  );
}

export default Footer;
