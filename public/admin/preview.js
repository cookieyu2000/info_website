/* global CMS, createClass, h */
(function () {
  function buildPreviewUrl(lang) {
    var params = new URLSearchParams({ cmsPreview: "1", lang: lang });
    return "/?" + params.toString();
  }

  var PreviewFrame = createClass({
    componentDidMount: function () {
      this.postPreviewData();
    },
    componentDidUpdate: function () {
      this.postPreviewData();
    },
    postPreviewData: function () {
      var frame = this.refs.previewFrame;
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
        ref: "previewFrame",
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
