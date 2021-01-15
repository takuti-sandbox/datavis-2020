(function (React$1, ReactDOM, d3, topojson) {
  'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var React__default = /*#__PURE__*/_interopDefaultLegacy(React$1);
  var ReactDOM__default = /*#__PURE__*/_interopDefaultLegacy(ReactDOM);

  var jsonUrl = 'https://unpkg.com/world-atlas@2.0.2/countries-50m.json';

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
          land: topojson.feature(topology, land),
          interiors: topojson.mesh(topology, countries, function (a, b) { return a !== b; })
        });
      });
    }, []);
    
    return data;
  };

  var csvUrl = 'https://gist.githubusercontent.com/curran/13d30e855d48cdd6f22acdf0afe27286/raw/0635f14817ec634833bb904a47594cc2f5f9dbf8/worldcities_clean.csv';

  var row = function (d) {
  	d.lat = +d.lat;
    d.lng = +d.lng;
    d.population = +d.population;
    return d;
  };

  var useCities = function () {
    var ref = React$1.useState(null);
    var data = ref[0];
    var setData = ref[1];

    React$1.useEffect(function () {
      d3.csv(csvUrl, row).then(setData);
    }, []);
    
    return data;
  };

  var projection = d3.geoNaturalEarth1();
  var path = d3.geoPath(projection);
  var graticule = d3.geoGraticule();

  var Marks = function (ref) {
    var ref_worldAtlas = ref.worldAtlas;
    var land = ref_worldAtlas.land;
    var interiors = ref_worldAtlas.interiors;
    var cities = ref.cities;
    var sizeScale = ref.sizeScale;
    var sizeValue = ref.sizeValue;

    return (
    React.createElement( 'g', { className: "marks" },
      React.createElement( 'path', { className: "sphere", d: path({ type: 'Sphere' }) }),
      React.createElement( 'path', { className: "graticule", d: path(graticule()) }),
      land.features.map(function (feature) { return (
        React.createElement( 'path', { className: "land", d: path(feature) })
      ); }),
      React.createElement( 'path', { className: "interiors", d: path(interiors) }),
      cities.map(function (d) {
        var ref = projection([d.lng, d.lat]);
        var x = ref[0];
        var y = ref[1];
        return (
          React.createElement( 'circle', { cx: x, cy: y, r: sizeScale(sizeValue(d)) })
        );
      })
    )
  );
  };

  var width = 960;
  var height = 500;

  var App = function () {
    var worldAtlas = useWorldAtlas();
    var cities = useCities();

    if (!worldAtlas || !cities) {
      return React__default['default'].createElement( 'pre', null, "Loading...." );
    }

    var sizeValue = function (d) { return d.population; };
    var maxRadius = 15;

    var sizeScale = d3.scaleSqrt()
      .domain([0, d3.max(cities, sizeValue)])
      .range([0, maxRadius]);

    return (
      React__default['default'].createElement( 'svg', { width: width, height: height },
        React__default['default'].createElement( Marks, {
          worldAtlas: worldAtlas, cities: cities, sizeScale: sizeScale, sizeValue: sizeValue })
      )
    );
  };

  var rootElement = document.getElementById('root');
  ReactDOM__default['default'].render(React__default['default'].createElement( App, null ), rootElement);

}(React, ReactDOM, d3, topojson));
//# sourceMappingURL=bundle.js.map
