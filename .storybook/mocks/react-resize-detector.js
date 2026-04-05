var React = require('react');

function useResizeDetector() {
  var ref = React.useRef(null);
  var _React$useState = React.useState({ width: undefined, height: undefined }),
    size = _React$useState[0],
    setSize = _React$useState[1];

  React.useEffect(function () {
    var el = ref.current;
    if (!el) return;
    setSize({ width: el.offsetWidth, height: el.offsetHeight });
    var observer = new ResizeObserver(function (entries) {
      var entry = entries[0];
      if (entry) {
        setSize({
          width: entry.contentRect.width,
          height: entry.contentRect.height,
        });
      }
    });
    observer.observe(el);
    return function () {
      observer.disconnect();
    };
  }, []);

  return { ref: ref, width: size.width, height: size.height };
}

module.exports = { useResizeDetector: useResizeDetector };
