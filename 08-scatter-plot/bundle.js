(function (React$1, ReactDOM, d3, ReactDropdown) {
  'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var React__default = /*#__PURE__*/_interopDefaultLegacy(React$1);
  var ReactDOM__default = /*#__PURE__*/_interopDefaultLegacy(ReactDOM);
  var ReactDropdown__default = /*#__PURE__*/_interopDefaultLegacy(ReactDropdown);

  var csvUrl =
    'https://gist.githubusercontent.com/curran/a08a1080b88344b0c8a7/raw/0e7a9b0a5d22642a06d3d5b9bcbad9890c8ee534/iris.csv';

  var useData = function () {
    var ref = React$1.useState(null);
    var data = ref[0];
    var setData = ref[1];

    React$1.useEffect(function () {
      var row = function (d) {
        d.sepal_length = +d.sepal_lengh;
        d.sepal_width = +d.sepal_width;
        d.petal_length = +d.petal_length;
        d.petal_width = +d.petal_width;
        return d;
      };
      d3.csv(csvUrl, row).then(setData);
    }, []);

    return data;
  };

  var AxisBottom = function (ref) {
      var xScale = ref.xScale;
      var innerHeight = ref.innerHeight;
      var tickOffset = ref.tickOffset; if ( tickOffset === void 0 ) tickOffset = 3;

      return xScale.ticks().map(function (tickValue) { return (
      React.createElement( 'g', {
        className: "tick", key: tickValue, transform: ("translate(" + (xScale(tickValue)) + ",0)") },
        React.createElement( 'line', { y2: innerHeight }),
        React.createElement( 'text', {
          style: { textAnchor: 'middle' }, dy: ".71em", y: innerHeight + tickOffset },
          tickValue
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
          key: tickValue, style: { textAnchor: 'end' }, x: -tickOffset, dy: ".32em" },
          tickValue
        )
      )
    ); });
  };

  var Marks = function (ref) {
      var data = ref.data;
      var xScale = ref.xScale;
      var yScale = ref.yScale;
      var colorScale = ref.colorScale;
      var xValue = ref.xValue;
      var yValue = ref.yValue;
      var colorValue = ref.colorValue;
      var circleRadius = ref.circleRadius;

      return data.map(function (d) { return (
      React.createElement( 'circle', {
        className: "mark", cx: xScale(xValue(d)), cy: yScale(yValue(d)), fill: colorScale(colorValue(d)), r: circleRadius })
    ); });
  };

  var ColorLegend = function (ref) {
      var colorScale = ref.colorScale;
      var tickSpacing = ref.tickSpacing; if ( tickSpacing === void 0 ) tickSpacing = 30;
      var tickSize = ref.tickSize; if ( tickSize === void 0 ) tickSize = 10;
      var tickTextOffset = ref.tickTextOffset; if ( tickTextOffset === void 0 ) tickTextOffset = 20;
      var onHover = ref.onHover;
      var hoveredValue = ref.hoveredValue;
      var fadeOpacity = ref.fadeOpacity;

      return colorScale.domain().map(function (domainValue, i) { return (
      React.createElement( 'g', {
        className: "tick", transform: ("translate(0," + (i * tickSpacing) + ")"), onMouseEnter: function () { return onHover(domainValue); }, onMouseOut: function () { return onHover(null); }, opacity: hoveredValue && domainValue !== hoveredValue
            ? fadeOpacity
            : 1.0 },
        React.createElement( 'circle', { fill: colorScale(domainValue), r: tickSize }),
        React.createElement( 'text', { x: tickTextOffset, dy: ".32em" },
          domainValue
        )
      )
    ); });
  };

  var width = 960;
  var menuHeight = 80;
  var height = 500 - menuHeight;
  var margin = {
    top: 20,
    right: 200,
    bottom: 80,
    left: 100,
  };
  var xAxisOffset = 60;
  var yAxisOffset = 50;

  var tickOffset = 16;

  var fadeOpacity = 0.2;

  var attributes = [
    { value: 'sepal_length', label: 'Sepal Length' },
    { value: 'sepal_width', label: 'Sepal Width' },
    { value: 'petal_length', label: 'Patal Length' },
    { value: 'petal_width', label: 'Patal Width' } ];

  var getLabel = function (attribute) {
    for (var i = 0; i < attributes.length; i++) {
      if (attributes[i].value === attribute) {
        return attributes[i].label;
      }
    }
  };

  var App = function () {
    var data = useData();

    var initialXAttribute = 'petal_length';
    var ref = React$1.useState(
      initialXAttribute
    );
    var xAttribute = ref[0];
    var setXAttribute = ref[1];
    var xValue = function (d) { return d[xAttribute]; };
    var xAxisLabel = getLabel(xAttribute);

    var initialYAttribute = 'sepal_width';
    var ref$1 = React$1.useState(
      initialYAttribute
    );
    var yAttribute = ref$1[0];
    var setYAttribute = ref$1[1];
    var yValue = function (d) { return d[yAttribute]; };
    var yAxisLabel = getLabel(yAttribute);

    var ref$2 = React$1.useState(null);
    var hoveredValue = ref$2[0];
    var setHoveredValue = ref$2[1];
    var colorValue = function (d) { return d.species; };
    var colorLegendLabel = 'Species';

    var circleRadius = 7;

    if (!data) {
      return React__default['default'].createElement( 'pre', null, "Loading...." );
    }
    var filteredData = data.filter(
      function (d) { return colorValue(d) === hoveredValue; }
    );

    var innerHeight = height - margin.top - margin.bottom;
    var innerWidth = width - margin.right - margin.left;

    var xScale = d3.scaleLinear()
      .domain(d3.extent(data, xValue))
      .range([0, innerWidth])
      .nice();

    var yScale = d3.scaleLinear()
      .domain(d3.extent(data, yValue))
      .range([0, innerHeight]);

    var colorScale = d3.scaleOrdinal()
      .domain(data.map(colorValue))
      .range(['#e6842a', '#137b80', '#8e6c8a']);

    return (
      React__default['default'].createElement( React__default['default'].Fragment, null,
        React__default['default'].createElement( 'div', { className: "menus-container" },
          React__default['default'].createElement( 'span', { className: "dropdown-label" }, "X"),
          React__default['default'].createElement( ReactDropdown__default['default'], {
            options: attributes, value: xAttribute, onChange: function (ref) {
              var value = ref.value;

              return setXAttribute(value);
    } }),
          React__default['default'].createElement( 'span', { className: "dropdown-label" }, "Y"),
          React__default['default'].createElement( ReactDropdown__default['default'], {
            options: attributes, value: yAttribute, onChange: function (ref) {
              var value = ref.value;

              return setYAttribute(value);
    } })
        ),
        React__default['default'].createElement( 'svg', { width: width, height: height },
          React__default['default'].createElement( 'g', {
            transform: ("translate(" + (margin.left) + "," + (margin.top) + ")") },
            React__default['default'].createElement( AxisBottom, {
              xScale: xScale, innerHeight: innerHeight, tickOffset: tickOffset }),
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
            React__default['default'].createElement( 'g', { transform: ("translate(" + (innerWidth + 50) + ",60)") },
              React__default['default'].createElement( 'text', {
                x: 50, y: -30, className: "axis-label", textAnchor: "middle" },
                colorLegendLabel
              ),
              React__default['default'].createElement( ColorLegend, {
                colorScale: colorScale, tickSpacing: 30, tickSize: circleRadius, tickTextOffset: 20, onHover: setHoveredValue, hoveredValue: hoveredValue, fadeOpacity: fadeOpacity })
            ),
            React__default['default'].createElement( 'g', { opacity: hoveredValue ? fadeOpacity : 1.0 },
              React__default['default'].createElement( Marks, {
                data: data, xScale: xScale, yScale: yScale, colorScale: colorScale, xValue: xValue, yValue: yValue, colorValue: colorValue, circleRadius: circleRadius })
            ),
            React__default['default'].createElement( Marks, {
              data: filteredData, xScale: xScale, yScale: yScale, colorScale: colorScale, xValue: xValue, yValue: yValue, colorValue: colorValue, circleRadius: circleRadius })
          )
        )
      )
    );
  };

  var rootElement = document.getElementById('root');
  ReactDOM__default['default'].render(React__default['default'].createElement( App, null ), rootElement);

}(React, ReactDOM, d3, ReactDropdown));
