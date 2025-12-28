(function () {
  var h = window.h;
  var createClass = window.createClass;

  var basePath = window.location.pathname.replace(/\/admin\/.*$/, "");
  window.CMS.registerPreviewStyle(basePath + "/admin/preview-styles.css");

  function safeArray(value) {
    return Array.isArray(value) ? value : [];
  }

  function text(value, fallback) {
    if (typeof value === "string" && value.trim() !== "") {
      return value;
    }
    return fallback || "";
  }

  function renderList(list, formatter) {
    var items = safeArray(list);
    if (!items.length) {
      return h("p", { className: "preview-empty" }, "(empty)");
    }
    return h(
      "ol",
      { className: "preview-list" },
      items.map(function (item, index) {
        return h(
          "li",
          { key: index, className: "preview-list-item" },
          formatter(item, index)
        );
      })
    );
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
        { className: "preview-root" },
        h(
          "section",
          { className: "preview-section" },
          h("h1", null, text(nav.brandName, "Site")),
          h("p", { className: "preview-muted" }, text(nav.brandTagline))
        ),
        h(
          "section",
          { className: "preview-section" },
          h("h2", null, "Navigation"),
          renderList(nav.items, function (item) {
            return text(item.label, "Item") + " → " + text(item.href, "#");
          })
        ),
        h(
          "section",
          { className: "preview-section" },
          h("h2", null, "Hero"),
          h("p", { className: "preview-muted" }, text(hero.eyebrow)),
          h(
            "div",
            { className: "preview-grid" },
            h(
              "div",
              { className: "preview-card" },
              h("h3", null, "Headline"),
              h(
                "p",
                null,
                text(hero.headline && hero.headline.prefix),
                " ",
                text(hero.headline && hero.headline.name),
                text(hero.headline && hero.headline.connector)
              ),
              h("p", { className: "preview-muted" }, text(hero.lead))
            ),
            h(
              "div",
              { className: "preview-card" },
              h("h3", null, "Card"),
              h(
                "p",
                null,
                text(hero.card && hero.card.name),
                " · ",
                text(hero.card && hero.card.title)
              ),
              renderList(hero.card && hero.card.tags, function (tag) {
                return text(tag);
              })
            )
          )
        ),
        h(
          "section",
          { className: "preview-section" },
          h("h2", null, text(education.title, "Education")),
          h("p", { className: "preview-muted" }, text(education.eyebrow)),
          renderList(education.items, function (item) {
            return (
              text(item.year) +
              " · " +
              text(item.school) +
              (item.degree ? " · " + text(item.degree) : "")
            );
          })
        ),
        h(
          "section",
          { className: "preview-section" },
          h("h2", null, text(experience.title, "Experience")),
          h("p", { className: "preview-muted" }, text(experience.eyebrow)),
          renderList(experience.items, function (item) {
            return (
              text(item.period) +
              " · " +
              text(item.company) +
              (item.role ? " · " + text(item.role) : "")
            );
          })
        ),
        h(
          "section",
          { className: "preview-section" },
          h("h2", null, text(about.title, "About")),
          h("p", { className: "preview-muted" }, text(about.eyebrow)),
          renderList(about.introParagraphs, function (paragraph) {
            return text(paragraph);
          })
        ),
        h(
          "section",
          { className: "preview-section" },
          h("h2", null, text(works.title, "Works")),
          h("p", { className: "preview-muted" }, text(works.eyebrow)),
          renderList(works.items, function (item) {
            return (
              text(item.year) +
              " · " +
              text(item.title) +
              (item.type ? " · " + text(item.type) : "")
            );
          })
        ),
        h(
          "section",
          { className: "preview-section" },
          h("h2", null, text(contact.title, "Contact")),
          h("p", { className: "preview-muted" }, text(contact.eyebrow)),
          h("p", null, text(contact.quickTitle))
        ),
        h(
          "section",
          { className: "preview-section" },
          h("h2", null, "Footer"),
          h("p", null, text(footer.copyright))
        )
      );
    },
  });

  window.CMS.registerPreviewTemplate("zh", ContentPreview);
  window.CMS.registerPreviewTemplate("en", ContentPreview);
})();
