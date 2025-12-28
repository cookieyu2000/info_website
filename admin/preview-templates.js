(function () {
  var h = window.h;
  var createClass = window.createClass;

  var basePath = window.location.pathname.replace(/\/admin(\/.*)?$/, "");
  var publicBase = basePath === "/" ? "" : basePath;

  window.CMS.registerPreviewStyle(
    "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
  );
  window.CMS.registerPreviewStyle(publicBase + "/admin/preview-app.css");
  window.CMS.registerPreviewStyle(publicBase + "/admin/preview-styles.css");

  function safeArray(value) {
    return Array.isArray(value) ? value : [];
  }

  function text(value, fallback) {
    if (typeof value === "string" && value.trim() !== "") {
      return value;
    }
    return fallback || "";
  }

  function resolvePublic(path) {
    if (!path) {
      return "";
    }
    if (typeof path !== "string") {
      return "";
    }
    if (path.startsWith("http://") || path.startsWith("https://")) {
      return path;
    }
    if (path.startsWith("/")) {
      return publicBase + path;
    }
    return publicBase + "/" + path;
  }

  function renderTags(tags, className) {
    var items = safeArray(tags);
    if (!items.length) {
      return null;
    }
    return h(
      "div",
      { className: "d-flex flex-wrap gap-2" },
      items.map(function (tag) {
        return h(
          "span",
          { className: className || "badge rounded-pill", key: tag },
          tag
        );
      })
    );
  }

  function renderParagraph(textValue, key) {
    if (!textValue) {
      return null;
    }
    var parts = textValue.split(/(\*\*[^*]+\*\*)/g).filter(Boolean);
    var nodes = parts.map(function (part, index) {
      if (part.startsWith("**") && part.endsWith("**")) {
        return h(
          "strong",
          { key: "bold-" + key + "-" + index },
          part.slice(2, -2)
        );
      }
      return h("span", { key: "text-" + key + "-" + index }, part);
    });
    return h("p", { key: key }, nodes);
  }

  function renderParagraphBlocks(textValue, keyPrefix) {
    if (!textValue) {
      return null;
    }
    var blocks = textValue.split("\n\n");
    return blocks.map(function (block, index) {
      return renderParagraph(block, keyPrefix + "-" + index);
    });
  }

  var ContentPreview = createClass({
    render: function () {
      var data = this.props.entry.getIn(["data"]).toJS();
      var nav = data.nav || {};
      var hero = data.hero || {};
      var education = data.education || {};
      var experience = data.experience || {};
      var about = data.about || {};
      var works = data.works || {};
      var contact = data.contact || {};
      var footer = data.footer || {};

      return h(
        "div",
        { className: "page" },
        h(
          "nav",
          { className: "navbar navbar-expand-lg navbar-light glass-nav" },
          h(
            "div",
            { className: "container" },
            h(
              "a",
              {
                className: "navbar-brand brand d-flex align-items-center gap-3",
                href: "#home",
              },
              h("span", { className: "brand-mark" }, "Yu"),
              h(
                "span",
                { className: "brand-text d-none d-sm-inline" },
                h("strong", null, text(nav.brandName)),
                h("br"),
                h("span", null, text(nav.brandTagline))
              )
            ),
            h(
              "ul",
              { className: "navbar-nav ms-auto mb-2 mb-lg-0 gap-lg-2" },
              safeArray(nav.items).map(function (item) {
                return h(
                  "li",
                  {
                    key: item.href,
                    className: "nav-item" + (item.cta ? " ms-lg-2" : ""),
                  },
                  h(
                    "a",
                    {
                      className: item.cta
                        ? "btn btn-primary nav-cta"
                        : "nav-link",
                      href: item.href || "#",
                    },
                    text(item.label)
                  )
                );
              })
            )
          )
        ),
        h(
          "main",
          null,
          h(
            "section",
            { className: "hero-section py-5 py-lg-6", id: "home" },
            h(
              "div",
              { className: "container" },
              h(
                "div",
                { className: "row align-items-center gy-5" },
                h(
                  "div",
                  { className: "col-lg-6 fade-up" },
                  h("p", { className: "eyebrow" }, text(hero.eyebrow)),
                  h(
                    "h1",
                    { className: "display-5 fw-semibold" },
                    text(hero.headline && hero.headline.prefix),
                    " ",
                    h(
                      "span",
                      null,
                      text(hero.headline && hero.headline.name)
                    ),
                    text(hero.headline && hero.headline.connector)
                  ),
                  h("p", { className: "lead text-muted" }, text(hero.lead)),
                  h(
                    "div",
                    { className: "d-flex flex-wrap gap-3" },
                    h(
                      "a",
                      { className: "btn btn-primary btn-lg", href: "#works" },
                      text(hero.ctas && hero.ctas.primary)
                    ),
                    h(
                      "a",
                      { className: "btn btn-outline-dark btn-lg", href: "#contact" },
                      text(hero.ctas && hero.ctas.secondary)
                    )
                  )
                ),
                h(
                  "div",
                  { className: "col-lg-5 offset-lg-1 fade-up delay-1" },
                  h(
                    "div",
                    { className: "hero-visual position-relative" },
                    h(
                      "div",
                      { className: "card profile-card border-0" },
                      h(
                        "div",
                        { className: "card-body" },
                        h(
                          "div",
                          {
                            className:
                              "d-flex align-items-center justify-content-between mb-3",
                          },
                          h(
                            "span",
                            { className: "profile-pill" },
                            text(hero.card && hero.card.status)
                          ),
                          h(
                            "span",
                            { className: "small text-muted" },
                            text(hero.card && hero.card.location)
                          )
                        ),
                        h("img", {
                          src: resolvePublic("/IMG_4359.JPG"),
                          alt: text(hero.imageAlt, "Profile"),
                          className: "profile-image",
                        }),
                        h(
                          "h3",
                          { className: "mt-3 mb-1" },
                          text(hero.card && hero.card.name)
                        ),
                        h(
                          "p",
                          { className: "text-muted mb-3" },
                          text(hero.card && hero.card.title)
                        ),
                        renderTags(hero.card && hero.card.tags, "profile-tag")
                      )
                    )
                  )
                )
              )
            )
          ),
          h(
            "section",
            {
              className: "section section-muted py-5 py-lg-6 fade-up delay-1",
              id: "education",
            },
            h(
              "div",
              { className: "container" },
              h(
                "div",
                { className: "row align-items-end g-4 section-header" },
                h(
                  "div",
                  { className: "col-lg-7" },
                  h("p", { className: "section-eyebrow" }, text(education.eyebrow)),
                  h("h2", null, text(education.title))
                ),
                h(
                  "div",
                  { className: "col-lg-5" },
                  h(
                    "p",
                    { className: "section-description" },
                    text(education.description)
                  )
                )
              ),
              h(
                "div",
                { className: "row g-4 mt-1" },
                safeArray(education.items).map(function (item) {
                  var showBadge =
                    item.degree === "碩士" || item.degree === "Master's";
                  return h(
                    "div",
                    { className: "col-md-6", key: item.year },
                    h(
                      "div",
                      {
                        className:
                          "card timeline-card h-100 border-0 position-relative",
                      },
                      showBadge
                        ? h(
                            "span",
                            { className: "highest-degree-badge" },
                            h(
                              "svg",
                              {
                                viewBox: "0 0 24 24",
                                role: "presentation",
                                "aria-hidden": "true",
                              },
                              h("path", {
                                d: "M3 7l4 4 5-6 5 6 4-4v10H3V7zm2 8h14V9l-2.8 2.8-4.2-5-4.2 5L5 9v6z",
                              })
                            ),
                            item.degree === "Master's" ? "Highest Degree" : "最高學歷"
                          )
                        : null,
                      h(
                        "div",
                        { className: "card-body" },
                        safeArray(item.logos).length
                          ? h(
                              "div",
                              { className: "education-logos" },
                              safeArray(item.logos).map(function (logo) {
                                return h("img", {
                                  key: logo.src,
                                  src: resolvePublic(logo.src),
                                  alt: logo.alt || "",
                                  className: "education-logo",
                                  loading: "lazy",
                                });
                              })
                            )
                          : null,
                        h(
                          "div",
                          {
                            className:
                              "d-flex flex-wrap align-items-center gap-2 mb-2",
                          },
                          h("div", { className: "timeline-year mb-0" }, text(item.year)),
                          item.degree
                            ? h(
                                "span",
                                { className: "degree-badge" },
                                text(item.degree)
                              )
                            : null
                        ),
                        h("h3", null, text(item.school)),
                        item.description
                          ? h("p", { className: "text-muted" }, text(item.description))
                          : null,
                        renderTags(item.tags)
                      )
                    )
                  );
                })
              )
            )
          ),
          h(
            "section",
            { className: "section py-5 py-lg-6 fade-up delay-2", id: "experience" },
            h(
              "div",
              { className: "container" },
              h(
                "div",
                { className: "row align-items-end g-4 section-header" },
                h(
                  "div",
                  { className: "col-lg-7" },
                  h("p", { className: "section-eyebrow" }, text(experience.eyebrow)),
                  h("h2", null, text(experience.title))
                ),
                h(
                  "div",
                  { className: "col-lg-5" },
                  h(
                    "p",
                    { className: "section-description" },
                    text(experience.description)
                  )
                )
              ),
              h(
                "div",
                { className: "row g-4 mt-1" },
                safeArray(experience.items).map(function (item) {
                  return h(
                    "div",
                    { className: "col-md-6", key: item.period },
                    h(
                      "article",
                      { className: "card timeline-card h-100 border-0" },
                      h(
                        "div",
                        { className: "card-body" },
                        h(
                          "div",
                          {
                            className:
                              "d-flex flex-wrap align-items-center gap-2 mb-2",
                          },
                          h("div", { className: "timeline-year mb-0" }, text(item.period)),
                          item.role
                            ? h("span", { className: "degree-badge" }, text(item.role))
                            : null
                        ),
                        h("h3", null, text(item.company)),
                        item.description
                          ? h("p", { className: "text-muted" }, text(item.description))
                          : null,
                        renderTags(item.tags)
                      )
                    )
                  );
                })
              )
            )
          ),
          h(
            "section",
            { className: "section py-5 py-lg-6 fade-up delay-3", id: "about" },
            h(
              "div",
              { className: "container" },
              h(
                "div",
                { className: "row align-items-end g-4 section-header" },
                h(
                  "div",
                  { className: "col-lg-7" },
                  h("p", { className: "section-eyebrow" }, text(about.eyebrow)),
                  h("h2", null, text(about.title))
                ),
                h(
                  "div",
                  { className: "col-lg-5" },
                  h(
                    "p",
                    { className: "section-description" },
                    text(about.description)
                  )
                )
              ),
              h(
                "div",
                { className: "row g-4 mt-1" },
                h(
                  "div",
                  { className: "col-lg-6" },
                  h(
                    "article",
                    { className: "card about-card about-card-intro h-100 border-0" },
                    h(
                      "div",
                      { className: "card-body" },
                      h("h3", null, text(about.introTitle)),
                      safeArray(about.introParagraphs).map(function (paragraph, index) {
                        return renderParagraphBlocks(paragraph, "intro-" + index);
                      }),
                      h("img", {
                        src: resolvePublic("/IMG_4360.JPG"),
                        alt: "About portrait",
                        className: "about-intro-image",
                      })
                    )
                  )
                ),
                h(
                  "div",
                  { className: "col-lg-6" },
                  h(
                    "div",
                    { className: "row g-4" },
                    safeArray(about.highlights).map(function (block, index) {
                      var highlightClasses = [
                        "about-card-highlight-1",
                        "about-card-highlight-2",
                        "about-card-highlight-3",
                      ];
                      return h(
                        "div",
                        { className: "col-md-6", key: block.title || index },
                        h(
                          "article",
                          {
                            className:
                              "card about-card about-card-highlight " +
                              highlightClasses[index % highlightClasses.length] +
                              " h-100 border-0",
                          },
                          h(
                            "div",
                            { className: "card-body" },
                            h("h4", null, text(block.title)),
                            h(
                              "div",
                              { className: "about-highlight-body" },
                              safeArray(block.items).map(function (item, itemIndex) {
                                return renderParagraphBlocks(
                                  item,
                                  "highlight-" + index + "-" + itemIndex
                                );
                              })
                            )
                          )
                        )
                      );
                    })
                  )
                )
              )
            )
          ),
          h(
            "section",
            { className: "section section-muted py-5 py-lg-6 fade-up delay-3", id: "works" },
            h(
              "div",
              { className: "container" },
              h(
                "div",
                { className: "row align-items-end g-4 section-header" },
                h(
                  "div",
                  { className: "col-lg-7" },
                  h("p", { className: "section-eyebrow" }, text(works.eyebrow)),
                  h("h2", null, text(works.title))
                ),
                h(
                  "div",
                  { className: "col-lg-5" },
                  h(
                    "p",
                    { className: "section-description" },
                    text(works.description)
                  )
                )
              ),
              h(
                "div",
                { className: "row g-4 mt-1" },
                safeArray(works.items).map(function (item) {
                  return h(
                    "div",
                    {
                      className: "col-md-6 col-lg-4",
                      key: (item.year || "") + "-" + (item.title || ""),
                    },
                    h(
                      "article",
                      { className: "card work-card h-100 border-0" },
                      h(
                        "div",
                        { className: "card-body" },
                        item.image
                          ? h(
                              "div",
                              { className: "work-media" },
                              h("img", {
                                src: resolvePublic(item.image),
                                alt: text(item.title),
                                className: "work-image",
                                loading: "lazy",
                              })
                            )
                          : null,
                        h(
                          "div",
                          { className: "work-header" },
                          h("span", null, text(item.year)),
                          h("span", null, text(item.type))
                        ),
                        h("h3", null, text(item.title)),
                        h("p", { className: "text-muted" }, text(item.description)),
                        renderTags(item.tags)
                      )
                    )
                  );
                })
              )
            )
          ),
          h(
            "section",
            { className: "section py-5 py-lg-6 fade-up delay-4", id: "contact" },
            h(
              "div",
              { className: "container" },
              h(
                "div",
                { className: "row align-items-end g-4 section-header" },
                h(
                  "div",
                  { className: "col-lg-7" },
                  h("p", { className: "section-eyebrow" }, text(contact.eyebrow)),
                  h("h2", null, text(contact.title))
                ),
                h(
                  "div",
                  { className: "col-lg-5" },
                  h(
                    "p",
                    { className: "section-description" },
                    text(contact.description)
                  )
                )
              ),
              h(
                "div",
                { className: "row g-4 mt-1 align-items-stretch" },
                h(
                  "div",
                  { className: "col-lg-5" },
                  h(
                    "div",
                    { className: "card contact-card h-100 border-0" },
                    h(
                      "div",
                      { className: "card-body d-flex flex-column" },
                      h("h3", null, text(contact.quickTitle)),
                      h(
                        "p",
                        { className: "text-muted" },
                        text(contact.quickDescription)
                      )
                    )
                  )
                ),
                h(
                  "div",
                  { className: "col-lg-7" },
                  h(
                    "form",
                    { className: "card contact-form h-100 border-0" },
                    h(
                      "div",
                      { className: "card-body" },
                      h(
                        "div",
                        { className: "row g-3" },
                        h(
                          "div",
                          { className: "col-md-6" },
                          h(
                            "label",
                            { className: "form-label" },
                            text(contact.form && contact.form.labels && contact.form.labels.name)
                          ),
                          h("input", {
                            className: "form-control",
                            type: "text",
                            disabled: true,
                            placeholder:
                              contact.form &&
                              contact.form.placeholders &&
                              contact.form.placeholders.name,
                          })
                        ),
                        h(
                          "div",
                          { className: "col-md-6" },
                          h(
                            "label",
                            { className: "form-label" },
                            text(contact.form && contact.form.labels && contact.form.labels.email)
                          ),
                          h("input", {
                            className: "form-control",
                            type: "email",
                            disabled: true,
                            placeholder:
                              contact.form &&
                              contact.form.placeholders &&
                              contact.form.placeholders.email,
                          })
                        ),
                        h(
                          "div",
                          { className: "col-12" },
                          h(
                            "label",
                            { className: "form-label" },
                            text(contact.form && contact.form.labels && contact.form.labels.message)
                          ),
                          h("textarea", {
                            className: "form-control",
                            rows: 5,
                            disabled: true,
                            placeholder:
                              contact.form &&
                              contact.form.placeholders &&
                              contact.form.placeholders.message,
                          })
                        ),
                        h(
                          "div",
                          { className: "col-12 d-flex flex-wrap align-items-center gap-3" },
                          h(
                            "button",
                            { className: "btn btn-primary", type: "button", disabled: true },
                            text(contact.form && contact.form.submit, "Send")
                          ),
                          h(
                            "p",
                            { className: "form-note mb-0" },
                            text(contact.form && contact.form.note)
                          )
                        )
                      )
                    )
                  )
                )
              )
            )
          )
        ),
        h(
          "footer",
          { className: "footer-section" },
          h(
            "div",
            { className: "container" },
            h("p", { className: "mb-0" }, text(footer.copyright)),
            h(
              "a",
              { className: "back-to-top", href: "#home" },
              text(footer.backToTop)
            )
          )
        )
      );
    },
  });

  window.CMS.registerPreviewTemplate("zh", ContentPreview);
  window.CMS.registerPreviewTemplate("en", ContentPreview);
})();
