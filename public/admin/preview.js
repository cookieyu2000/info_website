/* global CMS, createClass, h */
(function () {
  var headerFont =
    "https://fonts.googleapis.com/css2?family=Noto+Serif+TC:wght@400;600&family=DM+Sans:wght@400;600&display=swap";
  CMS.registerPreviewStyle(headerFont);

  function safeList(list) {
    return Array.isArray(list) ? list : [];
  }

  function splitParagraphs(text) {
    if (!text) return [];
    return String(text).split("\n\n");
  }

  var SitePreview = createClass({
    render: function () {
      var entry = this.props.entry;
      var data = entry && entry.getIn(["data"]);
      var site = data ? data.toJS() : {};

      var nav = site.nav || {};
      var hero = site.hero || {};
      var headline = hero.headline || {};
      var ctas = hero.ctas || {};
      var card = hero.card || {};
      var education = site.education || {};
      var experience = site.experience || {};
      var about = site.about || {};
      var works = site.works || {};
      var contact = site.contact || {};
      var footer = site.footer || {};

      var containerStyle = {
        fontFamily: "'DM Sans', 'Noto Serif TC', sans-serif",
        color: "#0f2d2e",
        background:
          "radial-gradient(circle at 10% 10%, #fef4e8 0%, #f9efe4 35%, #e4efe9 100%)",
        padding: "28px",
        lineHeight: 1.6,
      };

      var sectionStyle = {
        background: "rgba(255, 255, 255, 0.75)",
        borderRadius: "16px",
        padding: "20px 22px",
        marginBottom: "18px",
        boxShadow: "0 18px 45px rgba(15, 45, 46, 0.08)",
      };

      var chipStyle = {
        display: "inline-block",
        padding: "4px 10px",
        borderRadius: "999px",
        border: "1px solid rgba(15, 45, 46, 0.2)",
        marginRight: "8px",
        marginBottom: "6px",
        fontSize: "12px",
        letterSpacing: "0.02em",
      };

      return h(
        "div",
        { style: containerStyle },
        h(
          "div",
          { style: { marginBottom: "18px" } },
          h(
            "div",
            { style: { fontSize: "14px", textTransform: "uppercase" } },
            nav.brandTagline || ""
          ),
          h(
            "div",
            { style: { fontSize: "26px", fontWeight: 600 } },
            nav.brandName || "品牌名稱"
          ),
          h(
            "div",
            { style: { marginTop: "8px", color: "#4a6666" } },
            safeList(nav.items)
              .map(function (item) {
                return item && item.label;
              })
              .filter(Boolean)
              .join(" ・ ")
          )
        ),
        h(
          "section",
          { style: sectionStyle },
          h(
            "div",
            { style: { color: "#5a7474", fontSize: "12px" } },
            hero.eyebrow || ""
          ),
          h(
            "div",
            { style: { fontSize: "28px", fontWeight: 600 } },
            (headline.prefix || "") + (headline.name || "") + (headline.connector || "")
          ),
          h(
            "div",
            { style: { marginTop: "8px", color: "#344c4c" } },
            hero.lead || ""
          ),
          h(
            "div",
            { style: { marginTop: "12px", display: "flex", gap: "12px" } },
            h(
              "span",
              {
                style: {
                  padding: "8px 14px",
                  borderRadius: "999px",
                  background: "#0f2d2e",
                  color: "#fff",
                  fontSize: "13px",
                },
              },
              ctas.primary || "主要按鈕"
            ),
            h(
              "span",
              {
                style: {
                  padding: "8px 14px",
                  borderRadius: "999px",
                  border: "1px solid #0f2d2e",
                  fontSize: "13px",
                },
              },
              ctas.secondary || "次要按鈕"
            )
          ),
          h(
            "div",
            {
              style: {
                marginTop: "16px",
                padding: "12px",
                borderRadius: "12px",
                background: "rgba(15, 45, 46, 0.05)",
              },
            },
            h(
              "div",
              { style: { fontWeight: 600, marginBottom: "4px" } },
              card.name || ""
            ),
            h("div", null, card.title || ""),
            h("div", { style: { color: "#5a7474", marginTop: "6px" } }, card.status || ""),
            h(
              "div",
              { style: { marginTop: "8px" } },
              safeList(card.tags).map(function (tag, index) {
                return h("span", { key: "card-tag-" + index, style: chipStyle }, tag);
              })
            )
          )
        ),
        h(
          "section",
          { style: sectionStyle },
          h(
            "div",
            { style: { color: "#5a7474", fontSize: "12px" } },
            education.eyebrow || ""
          ),
          h("div", { style: { fontSize: "22px", fontWeight: 600 } }, education.title || ""),
          safeList(education.items).map(function (item, index) {
            return h(
              "div",
              {
                key: "edu-" + index,
                style: {
                  marginTop: "14px",
                  padding: "12px",
                  borderRadius: "12px",
                  background: "rgba(255, 255, 255, 0.8)",
                },
              },
              h("div", { style: { fontWeight: 600 } }, item.school || ""),
              h("div", { style: { color: "#5a7474" } }, item.year || ""),
              h("div", null, item.degree || ""),
              item.description
                ? h("div", { style: { marginTop: "6px" } }, item.description)
                : null,
              h(
                "div",
                { style: { marginTop: "6px" } },
                safeList(item.tags).map(function (tag, tagIndex) {
                  return h("span", { key: "edu-tag-" + tagIndex, style: chipStyle }, tag);
                })
              )
            );
          })
        ),
        h(
          "section",
          { style: sectionStyle },
          h(
            "div",
            { style: { color: "#5a7474", fontSize: "12px" } },
            experience.eyebrow || ""
          ),
          h("div", { style: { fontSize: "22px", fontWeight: 600 } }, experience.title || ""),
          safeList(experience.items).map(function (item, index) {
            return h(
              "div",
              { key: "exp-" + index, style: { marginTop: "12px" } },
              h("div", { style: { fontWeight: 600 } }, item.company || ""),
              h("div", { style: { color: "#5a7474" } }, item.period || ""),
              h("div", null, item.role || ""),
              item.description ? h("div", null, item.description) : null
            );
          })
        ),
        h(
          "section",
          { style: sectionStyle },
          h(
            "div",
            { style: { color: "#5a7474", fontSize: "12px" } },
            about.eyebrow || ""
          ),
          h("div", { style: { fontSize: "22px", fontWeight: 600 } }, about.title || ""),
          h(
            "div",
            { style: { marginTop: "8px" } },
            safeList(about.introParagraphs).map(function (paragraph, index) {
              return h(
                "p",
                { key: "intro-" + index, style: { marginBottom: "10px" } },
                paragraph
              );
            })
          ),
          safeList(about.highlights).map(function (item, index) {
            return h(
              "div",
              { key: "highlight-" + index, style: { marginTop: "14px" } },
              h("div", { style: { fontWeight: 600 } }, item.title || ""),
              safeList(item.items).map(function (content, contentIndex) {
                return h(
                  "p",
                  { key: "highlight-item-" + contentIndex, style: { marginBottom: "8px" } },
                  splitParagraphs(content).map(function (section, sectionIndex) {
                    return h(
                      "span",
                      { key: "highlight-section-" + sectionIndex },
                      section,
                      sectionIndex < splitParagraphs(content).length - 1
                        ? h("br", null)
                        : null,
                      sectionIndex < splitParagraphs(content).length - 1
                        ? h("br", null)
                        : null
                    );
                  })
                );
              })
            );
          })
        ),
        h(
          "section",
          { style: sectionStyle },
          h(
            "div",
            { style: { color: "#5a7474", fontSize: "12px" } },
            works.eyebrow || ""
          ),
          h("div", { style: { fontSize: "22px", fontWeight: 600 } }, works.title || ""),
          safeList(works.items).map(function (item, index) {
            return h(
              "div",
              { key: "work-" + index, style: { marginTop: "14px" } },
              h("div", { style: { fontWeight: 600 } }, item.title || ""),
              h("div", { style: { color: "#5a7474" } }, item.year || ""),
              item.description ? h("div", null, item.description) : null,
              h(
                "div",
                { style: { marginTop: "6px" } },
                safeList(item.tags).map(function (tag, tagIndex) {
                  return h("span", { key: "work-tag-" + tagIndex, style: chipStyle }, tag);
                })
              )
            );
          })
        ),
        h(
          "section",
          { style: sectionStyle },
          h(
            "div",
            { style: { color: "#5a7474", fontSize: "12px" } },
            contact.eyebrow || ""
          ),
          h("div", { style: { fontSize: "22px", fontWeight: 600 } }, contact.title || ""),
          h(
            "div",
            { style: { marginTop: "10px", color: "#5a7474" } },
            contact.quickTitle || ""
          ),
          h(
            "div",
            { style: { marginTop: "6px" } },
            footer.backToTop ? footer.backToTop : "回到頂端"
          )
        )
      );
    },
  });

  CMS.registerPreviewTemplate("zh", SitePreview);
})();
