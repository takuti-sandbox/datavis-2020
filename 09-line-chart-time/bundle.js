(function (React$1, ReactDOM, d3) {
  'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var React__default = /*#__PURE__*/_interopDefaultLegacy(React$1);
  var ReactDOM__default = /*#__PURE__*/_interopDefaultLegacy(ReactDOM);

  var csvUrl =
    'https://gist.githubusercontent.com/curran/90240a6d88bdb1411467b21ea0769029/raw/7d4c3914cc6a29a7f5165f7d5d82b735d97bcfe4/week_temperature_sf.csv';

  var useData = function () {
    var ref = React$1.useState(null);
    var data = ref[0];
    var setData = ref[1];

    React$1.useEffect(function () {
      var row = function (d) {
        d.temperature = +d.temperature;
        d.timestamp = new Date(d.timestamp);
        return d;
      };
      d3.csv(csvUrl, row).then(setData);
    }, []);

    return data;
  };

  var AxisBottom = function (ref) {
      var xScale = ref.xScale;
      var innerHeight = ref.innerHeight;
      var tickFormat = ref.tickFormat;
      var tickOffset = ref.tickOffset; if ( tickOffset === void 0 ) tickOffset = 3;

      return xScale.ticks().map(function (tickValue) { return (
      React.createElement( 'g', {
        className: "tick", key: tickValue, transform: ("translate(" + (xScale(tickValue)) + ",0)") },
        React.createElement( 'line', { y2: innerHeight }),
        React.createElement( 'text', {
          style: { textAnchor: 'middle' }, dy: ".71em", y: innerHeight + tickOffset },
          tickFormat(tickValue)
        )
      )
    ); });
  };

  var AxisLeft = function (ref) {
      var yScale = ref.yScale;
      var innerWidth = ref.innerWidth;
      var tickOffset = ref.tickOffset; if ( tickOffset === void 0 ) tickOffset = 3;

      return yScale.ticks().map(function (tickValue) { return (
      React.createElement( 'g', {
        className: "tick", transform: ("translate(0," + (yScale(tickValue)) + ")") },
        React.createElement( 'line', { x2: innerWidth }),
        React.createElement( 'text', {
          key: tickValue, style: { textAnchor: 'end' }, x: -tickOffset, y: yScale(tickValue), dy: ".32em" },
          tickValue
        )
      )
    ); });
  };

  var Marks = function (ref) {
      var data = ref.data;
      var xScale = ref.xScale;
      var yScale = ref.yScale;
      var xValue = ref.xValue;
      var yValue = ref.yValue;
      var circleRadius = ref.circleRadius;

      return data.map(function (d) { return (
      React.createElement( 'circle', {
        className: "mark", cx: xScale(xValue(d)), cy: yScale(yValue(d)), r: circleRadius })
    ); });
  };

  var width = 960;
  var height = 500;
  var margin = {
    top: 20,
    right: 30,
    bottom: 80,
    left: 100,
  };
  var xAxisOffset = 60;
  var yAxisOffset = 50;

  var tickOffset = 16;

  var App = function () {
    var data = useData();

    if (!data) {
      return React__default['default'].createElement( 'pre', null, "Loading...." );
    }

    var innerHeight = height - margin.top - margin.bottom;
    var innerWidth = width - margin.right - margin.left;

    var xValue = function (d) { return d.timestamp; };
    var xAxisLabel = 'Time';

    var yValue = function (d) { return d.temperature; };
    var yAxisLabel = 'Temperature';

    var xScale = d3.scaleTime()
      .domain(d3.extent(data, xValue))
      .range([0, innerWidth])
      .nice();

    var yScale = d3.scaleLinear()
      .domain(d3.extent(data, yValue))
      .range([innerHeight, 0]);
    
    var xAxisTickFormat = d3.timeFormat('%a');

    return (
      React__default['default'].createElement( 'svg', { width: width, height: height },
        React__default['default'].createElement( 'g', {
          transform: ("translate(" + (margin.left) + "," + (margin.top) + ")") },
          React__default['default'].createElement( AxisBottom, {
            xScale: xScale, innerHeight: innerHeight, tickFormat: xAxisTickFormat, tickOffset: tickOffset }),
          React__default['default'].createElement( 'text', {
            className: "axis-label", x: innerWidth / 2, y: innerHeight + xAxisOffset, textAnchor: "middle" },
            xAxisLabel
          ),
          React__default['default'].createElement( AxisLeft, {
            yScale: yScale, innerWidth: innerWidth, tickOffset: tickOffset }),
          React__default['default'].createElement( 'text', {
            className: "axis-label", textAnchor: "middle", transform: ("translate(" + (-yAxisOffset) + "," + (innerHeight / 2) + ") rotate(-90)") },
            yAxisLabel
          ),
          React__default['default'].createElement( Marks, {
            data: data, xScale: xScale, yScale: yScale, xValue: xValue, yValue: yValue, circleRadius: 7 })
        )
      )
    );
  };

  var rootElement = document.getElementById('root');
  ReactDOM__default['default'].render(React__default['default'].createElement( App, null ), rootElement);

}(React, ReactDOM, d3));
//# sourceMappingURL=bundle.js.map
