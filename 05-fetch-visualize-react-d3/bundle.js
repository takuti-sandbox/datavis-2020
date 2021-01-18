(function (React, ReactDOM, d3) {
  'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
  var ReactDOM__default = /*#__PURE__*/_interopDefaultLegacy(ReactDOM);

  var csvUrl =
    'https://gist.githubusercontent.com/curran/b236990081a24761f7000567094914e0/raw/acd2b8cecfe51c520622fbaf407ee88b8796bfc6/cssNamedColors.csv';

  var width = 960;
  var height = 500;
  var centerX = width / 2;
  var centerY = height / 2;

  var pieArc = d3.arc().innerRadius(0).outerRadius(width);
  var colorPie = d3.pie().value(1);

  var App = function () {
    var ref = React.useState(null);
    var data = ref[0];
    var setData = ref[1];

    React.useEffect(function () {
      d3.csv(csvUrl).then(setData);
    }, []);

    if (!data) {
      return React__default['default'].createElement( 'pre', null, "Loading...." );
    }

    return (
      React__default['default'].createElement( 'svg', { width: width, height: height },
        React__default['default'].createElement( 'g', { transform: ("translate(" + centerX + "," + centerY + ")") },
          colorPie(data).map(function (d) { return (
              React__default['default'].createElement( 'path', {
                fill: d.data['RGB hex value'], d: pieArc(d) })
            ); })
        )
      )
    );
  };

  var rootElement = document.getElementById('root');
  ReactDOM__default['default'].render(React__default['default'].createElement( App, null ), rootElement);

}(React, ReactDOM, d3));
