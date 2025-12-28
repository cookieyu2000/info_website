import { useState } from "react";
import { useLanguage } from "../context/LanguageContext";

function Works() {
  const { content } = useLanguage();
  const { works } = content;
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const resolveImage = (src) =>
    src && src.startsWith("/") ? `${process.env.PUBLIC_URL}${src}` : src;

  return (
    <section className="section section-muted py-5 py-lg-6 fade-up delay-3" id="works">
      <div className="container">
        <div className="row align-items-end g-4 section-header">
          <div className="col-lg-7">
            <p className="section-eyebrow">{works.eyebrow}</p>
            <h2>{works.title}</h2>
          </div>
          <div className="col-lg-5">
            <p className="section-description">{works.description}</p>
          </div>
        </div>
        <div className="row g-4 mt-1">
          {works.items.map((item, index) => (
            <div className="col-md-6 col-lg-4" key={`${item.year}-${item.title}`}>
              <article
                className={`card work-card h-100 border-0 ${
                  hoveredIndex !== null && hoveredIndex !== index
                    ? "work-card-dim"
                    : ""
                }`}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div className="card-body">
                  {item.image && (
                    <a
                      href={item.link || "#works"}
                      className="work-media"
                      target={item.link ? "_blank" : undefined}
                      rel={item.link ? "noreferrer" : undefined}
                    >
                      <img
                        src={resolveImage(item.image)}
                        alt={item.title}
                        className="work-image"
                        loading="lazy"
                      />
                    </a>
                  )}
                  <div className="work-header">
                    <span>{item.year}</span>
                    <span>{item.type}</span>
                  </div>
                  <h3>
                    {item.link ? (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noreferrer"
                        className="work-title-link"
                      >
                        {item.title}
                      </a>
                    ) : (
                      item.title
                    )}
                  </h3>
                  <p className="text-muted">{item.description}</p>
                  <div className="d-flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <span className="badge rounded-pill" key={tag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Works;
