(function (React$1, ReactDOM, d3, topojson) {
  'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var React__default = /*#__PURE__*/_interopDefaultLegacy(React$1);
  var ReactDOM__default = /*#__PURE__*/_interopDefaultLegacy(ReactDOM);

  var jsonUrl =
    'https://unpkg.com/world-atlas@2.0.2/countries-50m.json';

  var useWorldAtlas = function () {
    var ref = React$1.useState(null);
    var data = ref[0];
    var setData = ref[1];

    React$1.useEffect(function () {
      d3.json(jsonUrl).then(function (topology) {
        var ref = topology.objects;
        var countries = ref.countries;
        var land = ref.land;
        setData({
          countries: topojson.feature(topology, countries),
          interiors: topojson.mesh(
            topology,
            countries,
            function (a, b) { return a !== b; }
          ),
        });
      });
    }, []);

    return data;
  };

  var csvUrl =
    'https://gist.githubusercontent.com/curran/470752f12c027f8ff4266e7c96f26a56/raw/66908b56e371e7c9f5a1c0911ac3250f570a4c83/share-of-population-infected-with-hiv-ihme.csv';

  var row = function (d) {
    d.aids = +d[
      'Prevalence - HIV/AIDS - Sex: Both - Age: 15-49 years (Percent) (%)'
    ];
    return d;
  };

  var useData = function () {
    var ref = React$1.useState(null);
    var data = ref[0];
    var setData = ref[1];

    React$1.useEffect(function () {
      d3.csv(csvUrl, row).then(setData);
    }, []);

    return data;
  };

  var csvUrl$1 =
    'https://raw.githubusercontent.com/lukes/ISO-3166-Countries-with-Regional-Codes/master/slim-3/slim-3.csv';

  var useCodes = function () {
    var ref = React$1.useState(null);
    var data = ref[0];
    var setData = ref[1];

    React$1.useEffect(function () {
      d3.csv(csvUrl$1).then(setData);
    }, []);

    return data;
  };

  var projection = d3.geoNaturalEarth1();
  var path = d3.geoPath(projection);
  var graticule = d3.geoGraticule();

  var missingDataColor = 'gray';

  var Marks = function (ref) {
    var ref_worldAtlas = ref.worldAtlas;
    var countries = ref_worldAtlas.countries;
    var interiors = ref_worldAtlas.interiors;
    var rowByNumericCode = ref.rowByNumericCode;
    var colorScale = ref.colorScale;
    var colorValue = ref.colorValue;

    return (
    React.createElement( 'g', { className: "marks" },
      React.createElement( 'path', { className: "sphere", d: path({ type: 'Sphere' }) }),
      React.createElement( 'path', { className: "graticule", d: path(graticule()) }),
      countries.features.map(function (feature) {
        var d = rowByNumericCode.get(feature.id);
        return (
          React.createElement( 'path', {
            fill: d ? colorScale(colorValue(d)) : missingDataColor, d: path(feature) })
        );
      }),
      React.createElement( 'path', { className: "interiors", d: path(interiors) })
    )
  );
  };

  var width = 960;
  var height = 500;

  var selectedYear = '2017';

  var App = function () {
    var worldAtlas = useWorldAtlas();
    var data = useData();
    var codes = useCodes();

    if (!worldAtlas || !data || !codes) {
      return React__default['default'].createElement( 'pre', null, "Loading...." );
    }

    var numericCodeByAlpha3Code = new Map();
    codes.forEach(function (code) {
      numericCodeByAlpha3Code.set(
        code['alpha-3'],
        code['country-code']
      );
    });

    var filteredData = data.filter(
      function (d) { return d.Year === selectedYear; }
    );

    var rowByNumericCode = new Map();
    filteredData.forEach(function (d) {
      var alpha3Code = d.Code;
      var numericCode = numericCodeByAlpha3Code.get(
        alpha3Code
      );
      rowByNumericCode.set(numericCode, d);
    });

    var colorValue = function (d) { return d.aids; };

    var colorScale = d3.scaleSequential(
      d3.interpolateYlOrRd
    ).domain([0, d3.max(data, colorValue)]);

    return (
      React__default['default'].createElement( 'svg', { width: width, height: height },
        React__default['default'].createElement( Marks, {
          worldAtlas: worldAtlas, rowByNumericCode: rowByNumericCode, colorScale: colorScale, colorValue: colorValue })
      )
    );
  };

  var rootElement = document.getElementById('root');
  ReactDOM__default['default'].render(React__default['default'].createElement( App, null ), rootElement);

}(React, ReactDOM, d3, topojson));
//# sourceMappingURL=bundle.js.map
