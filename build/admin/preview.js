/* global CMS, createClass, h */
(function () {
  var isLocalHost =
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1";
  var autoPublishTimer = null;

  function scheduleAutoPublish(entry) {
    if (!isLocalHost) return;

    if (autoPublishTimer) {
      clearTimeout(autoPublishTimer);
    }

    autoPublishTimer = setTimeout(function () {
      var payload = {
        collection: entry && entry.getIn(["collection"]),
        slug: entry && entry.getIn(["slug"]),
      };

      fetch("http://localhost:8090/publish", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }).catch(function () {});
    }, 1200);
  }

  if (typeof CMS !== "undefined" && CMS.registerEventListener) {
    CMS.registerEventListener({
      name: "postSave",
      handler: function ({ entry }) {
        scheduleAutoPublish(entry);
      },
    });
  }

  function buildPreviewUrl(lang) {
    var params = new URLSearchParams({ cmsPreview: "1", lang: lang });
    return "/?" + params.toString();
  }

  var PreviewFrame = createClass({
    setFrameRef: function (element) {
      this.previewFrame = element;
    },
    componentDidMount: function () {
      this.postPreviewData();
    },
    componentDidUpdate: function () {
      this.postPreviewData();
    },
    postPreviewData: function () {
      var frame = this.previewFrame;
      if (!frame || !frame.contentWindow) return;

      var entry = this.props.entry;
      var data = entry && entry.getIn(["data"]);
      var payload = {
        type: "cms-preview",
        language: this.props.lang,
        data: data ? data.toJS() : {},
      };

      frame.contentWindow.postMessage(payload, window.location.origin);
    },
    render: function () {
      return h("iframe", {
        ref: this.setFrameRef,
        src: buildPreviewUrl(this.props.lang),
        style: {
          width: "100%",
          height: "100vh",
          border: "0",
          background: "#f5f5f5",
        },
        onLoad: this.postPreviewData,
        title: "Site preview",
      });
    },
  });

  CMS.registerPreviewTemplate("zh", function (props) {
    return h(PreviewFrame, { entry: props.entry, lang: "zh" });
  });

  CMS.registerPreviewTemplate("en", function (props) {
    return h(PreviewFrame, { entry: props.entry, lang: "en" });
  });
})();
