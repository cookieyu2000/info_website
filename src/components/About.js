import { useLanguage } from "../context/LanguageContext";

function About() {
  const { content } = useLanguage();
  const { about } = content;
  const renderParagraph = (text) => {
    const lines = text.split("\n");
    const nodes = [];

    lines.forEach((line, lineIndex) => {
      const parts = line.split(/(\*\*[^*]+\*\*)/g).filter(Boolean);

      parts.forEach((part, partIndex) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          nodes.push(
            <strong key={`bold-${lineIndex}-${partIndex}`}>
              {part.slice(2, -2)}
            </strong>
          );
        } else {
          nodes.push(
            <span key={`text-${lineIndex}-${partIndex}`}>{part}</span>
          );
        }
      });

      if (lineIndex < lines.length - 1) {
        nodes.push(<br key={`br-${lineIndex}`} />);
      }
    });

    return nodes;
  };
  const highlightBlocks =
    about.highlights && about.highlights.length
      ? about.highlights
      : [
          ...(about.strengthsTitle && about.strengths
            ? [{ title: about.strengthsTitle, items: about.strengths }]
            : []),
          ...(about.workflowTitle && about.workflow
            ? [{ title: about.workflowTitle, items: about.workflow }]
            : []),
        ];
  const highlightClasses = [
    "about-card-highlight-1",
    "about-card-highlight-2",
    "about-card-highlight-3",
  ];

  return (
    <section className="section py-5 py-lg-6 fade-up delay-2" id="about">
      <div className="container">
        <div className="row align-items-end g-4 section-header">
          <div className="col-lg-7">
            <p className="section-eyebrow">{about.eyebrow}</p>
            <h2>{about.title}</h2>
          </div>
          <div className="col-lg-5">
            <p className="section-description">{about.description}</p>
          </div>
        </div>
        <div className="row g-4 mt-1">
          <div className="col-lg-6">
            <article className="card about-card about-card-intro h-100 border-0">
              <div className="card-body">
                <h3>{about.introTitle}</h3>
                {about.introParagraphs.map((paragraph) => (
                  <p key={paragraph}>{renderParagraph(paragraph)}</p>
                ))}
                <img
                  src={`${process.env.PUBLIC_URL}/IMG_4360.JPG`}
                  alt="About portrait"
                  className="about-intro-image"
                />
              </div>
            </article>
          </div>
          <div className="col-lg-6">
            <div className="row g-4">
              {highlightBlocks.map((block, index) => {
                const items = Array.isArray(block.items)
                  ? block.items
                  : [block.items];
                return (
                  <div className="col-md-6" key={block.title}>
                    <article
                      className={`card about-card about-card-highlight ${
                        highlightClasses[index % highlightClasses.length]
                      } h-100 border-0`}
                    >
                      <div className="card-body">
                        <h4>{block.title}</h4>
                        <div className="about-highlight-body">
                          {items.map((item, itemIndex) => (
                            <p key={`${block.title}-${itemIndex}`}>
                              {renderParagraph(item)}
                            </p>
                          ))}
                        </div>
                      </div>
                    </article>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
