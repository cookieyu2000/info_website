import { useLanguage } from "../context/LanguageContext";
import allContent from "../content";

function Experience() {
  const { content, language } = useLanguage();
  const { experience } = content;
  const isEnglish = language === "en";
  const items = Array.isArray(experience?.items) ? experience.items : [];
  const fallbackItems = allContent.zh?.experience?.items || [];
  const experienceItems = items.map((item, index) => {
    const fallbackItem = fallbackItems[index];

    if (!fallbackItem) {
      return item;
    }

    return {
      ...item,
      company_En: item.company_En ?? fallbackItem.company_En,
      role_En: item.role_En ?? fallbackItem.role_En,
      description_En: item.description_En ?? fallbackItem.description_En,
      tags: item.tags ?? fallbackItem.tags,
    };
  });

  if (!experience) {
    return null;
  }

  return (
    <section className="section py-5 py-lg-6 fade-up delay-2" id="experience">
      <div className="container">
        <div className="row align-items-end g-4 section-header">
          <div className="col-lg-7">
            <p className="section-eyebrow">{experience.eyebrow}</p>
            <h2>{experience.title}</h2>
          </div>
          <div className="col-lg-5">
            <p className="section-description">{experience.description}</p>
          </div>
        </div>
        <div className="row g-4 mt-1">
          {experienceItems.map((item) => {
            const tags = Array.isArray(item.tags) ? item.tags : [];

            return (
              <div className="col-md-6" key={`${item.period}-${item.company}`}>
                <article className="card timeline-card h-100 border-0">
                  <div className="card-body">
                  <div className="d-flex flex-wrap align-items-center gap-2 mb-2">
                    <div className="timeline-year mb-0">{item.period}</div>
                    {item.role && (
                      <span className="degree-badge">
                        {isEnglish ? item.role_En || item.role : item.role}
                      </span>
                    )}
                  </div>
                  <h3>
                    {isEnglish
                      ? item.company_En || item.company
                      : item.company}
                  </h3>
                    {isEnglish
                      ? item.description_En && (
                          <p className="text-muted">{item.description_En}</p>
                        )
                      : item.description && (
                          <p className="text-muted">{item.description}</p>
                        )}
                    <div className="d-flex flex-wrap gap-2">
                      {tags.map((tag) => (
                        <span className="badge rounded-pill" key={tag}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Experience;
