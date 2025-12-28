import { useLanguage } from "../context/LanguageContext";
import allContent from "../content";

function Education() {
  const { content, language } = useLanguage();
  const { education } = content;
  const isEnglish = language === "en";
  const fallbackItems = allContent.zh?.education?.items || [];
  const educationItems = education.items.map((item, index) => {
    const fallbackItem = fallbackItems[index];

    if (!fallbackItem) {
      return item;
    }

    return {
      ...item,
      school_En: item.school_En ?? fallbackItem.school_En,
      description_En: item.description_En ?? fallbackItem.description_En,
      degree_En: item.degree_En ?? fallbackItem.degree_En,
      logos: item.logos ?? fallbackItem.logos,
    };
  });

  return (
    <section
      className="section section-muted py-5 py-lg-6 fade-up delay-1"
      id="education"
    >
      <div className="container">
        <div className="row align-items-end g-4 section-header">
          <div className="col-lg-7">
            <p className="section-eyebrow">{education.eyebrow}</p>
            <h2>{education.title}</h2>
          </div>
          <div className="col-lg-5">
            <p className="section-description">{education.description}</p>
          </div>
        </div>
        <div className="row g-4 mt-1">
          {educationItems.map((item) => (
            <div className="col-md-6" key={item.year}>
                <div className="card timeline-card h-100 border-0 position-relative">
                  {(item.degree === "碩士" ||
                    item.degree_En === "Master's") && (
                    <span className="highest-degree-badge">
                      <svg viewBox="0 0 24 24" role="presentation" aria-hidden="true">
                        <path d="M3 7l4 4 5-6 5 6 4-4v10H3V7zm2 8h14V9l-2.8 2.8-4.2-5-4.2 5L5 9v6z" />
                      </svg>
                      {isEnglish ? "Highest Degree" : "最高學歷"}
                    </span>
                  )}
                <div className="card-body">
                  {item.logos && item.logos.length > 0 && (
                    <div className="education-logos">
                      {item.logos.map((logo) => (
                        <img
                          key={logo.src}
                          src={
                            logo.src.startsWith("/")
                              ? `${process.env.PUBLIC_URL}${logo.src}`
                              : logo.src
                          }
                          alt={logo.alt || ""}
                          className="education-logo"
                          loading="lazy"
                        />
                      ))}
                    </div>
                  )}
                  <div className="d-flex flex-wrap align-items-center gap-2 mb-2">
                    <div className="timeline-year mb-0">{item.year}</div>
                    {item.degree && (
                      <span className="degree-badge">
                        {isEnglish ? item.degree_En || item.degree : item.degree}
                      </span>
                    )}
                  </div>
                  <h3>
                    {isEnglish ? item.school_En || item.school : item.school}
                  </h3>
                  {isEnglish
                    ? (item.description_En || item.description) && (
                        <p className="text-muted">
                          {item.description_En || item.description}
                        </p>
                      )
                    : item.description && (
                        <p className="text-muted">{item.description}</p>
                      )}
                  <div className="d-flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <span className="badge rounded-pill" key={tag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Education;
