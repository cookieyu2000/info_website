import { useLanguage } from "../context/LanguageContext";

function Hero() {
  const { content } = useLanguage();
  const { hero } = content;
  const { headline } = hero;

  return (
    <section className="hero-section py-5 py-lg-6" id="home">
      <div className="container">
        <div className="row align-items-center gy-5">
          <div className="col-lg-6 fade-up">
            <p className="eyebrow">{hero.eyebrow}</p>
            <h1 className="display-5 fw-semibold">
              {headline.prefix} <span>{headline.name}</span>
              {headline.connector}
            </h1>
            <p className="lead text-muted">{hero.lead}</p>
            <div className="d-flex flex-wrap gap-3">
              <a className="btn btn-primary btn-lg" href="#works">
                {hero.ctas.primary}
              </a>
              <a className="btn btn-outline-dark btn-lg" href="#contact">
                {hero.ctas.secondary}
              </a>
            </div>
          </div>
          <div className="col-lg-5 offset-lg-1 fade-up delay-1">
            <div className="hero-visual position-relative">
              <div className="card profile-card border-0">
                <div className="card-body">
                  <div className="d-flex align-items-center justify-content-between mb-3">
                    <span className="profile-pill">{hero.card.status}</span>
                    <span className="small text-muted">
                      {hero.card.location}
                    </span>
                  </div>
                  <img
                    src={`${process.env.PUBLIC_URL}/IMG_4359.JPG`}
                    alt={hero.imageAlt}
                    className="profile-image"
                  />
                  <h3 className="mt-3 mb-1">{hero.card.name}</h3>
                  <p className="text-muted mb-3">{hero.card.title}</p>
                  <div className="d-flex flex-wrap gap-2">
                    {hero.card.tags.map((tag) => (
                      <span className="profile-tag" key={tag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              {/* <div className="floating-card">{hero.floating}</div> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
