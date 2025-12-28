import { useState } from "react";
import { useLanguage } from "../context/LanguageContext";

function Navbar() {
  const { language, setLanguage, content } = useLanguage();
  const [navOpen, setNavOpen] = useState(false);

  const closeNav = () => setNavOpen(false);
  const handleLanguageChange = (nextLanguage) => {
    setLanguage(nextLanguage);
    closeNav();
  };

  return (
    <nav
      className="navbar navbar-expand-lg navbar-light glass-nav sticky-top"
      aria-label={content.nav.ariaLabel}
    >
      <div className="container">
        <a
          className="navbar-brand brand d-flex align-items-center gap-3"
          href="#home"
          onClick={closeNav}
        >
          <span className="brand-mark">Yu</span>
          <span className="brand-text d-none d-sm-inline">
            <strong>{content.nav.brandName}</strong>
            <br />
            <span>{content.nav.brandTagline}</span>
          </span>
        </a>
        <button
          className="navbar-toggler"
          type="button"
          aria-controls="mainNav"
          aria-expanded={navOpen}
          aria-label={content.nav.toggleLabel}
          onClick={() => setNavOpen((open) => !open)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className={`collapse navbar-collapse ${navOpen ? "show" : ""}`}
          id="mainNav"
        >
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-lg-center gap-lg-2">
            {content.nav.items.map((item) => (
              <li
                className={`nav-item ${item.cta ? "ms-lg-2" : ""}`}
                key={item.href}
              >
                <a
                  className={item.cta ? "btn btn-primary nav-cta" : "nav-link"}
                  href={item.href}
                  onClick={closeNav}
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li className="nav-item ms-lg-3 mt-2 mt-lg-0">
              <div
                className="btn-group lang-toggle"
                role="group"
                aria-label={content.nav.languageLabel}
              >
                <button
                  className={`btn btn-sm ${
                    language === "zh" ? "btn-primary" : "btn-outline-dark"
                  }`}
                  type="button"
                  aria-pressed={language === "zh"}
                  onClick={() => handleLanguageChange("zh")}
                >
                  中文
                </button>
                <button
                  className={`btn btn-sm ${
                    language === "en" ? "btn-primary" : "btn-outline-dark"
                  }`}
                  type="button"
                  aria-pressed={language === "en"}
                  onClick={() => handleLanguageChange("en")}
                >
                  EN
                </button>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
