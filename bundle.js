(function (exports, React$1, ReactDOM, d3, vega, vegaLite, vl, vegaTooltip, ReactDropdown, topojson) {
  'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var React__default = /*#__PURE__*/_interopDefaultLegacy(React$1);
  var ReactDOM__default = /*#__PURE__*/_interopDefaultLegacy(ReactDOM);
  var vega__default = /*#__PURE__*/_interopDefaultLegacy(vega);
  var vegaLite__default = /*#__PURE__*/_interopDefaultLegacy(vegaLite);
  var vl__default = /*#__PURE__*/_interopDefaultLegacy(vl);
  var ReactDropdown__default = /*#__PURE__*/_interopDefaultLegacy(ReactDropdown);

  var BackgroundCircle = function (ref) {
    var radius = ref.radius;
    var strokeWidth = ref.strokeWidth;

    return (
  	React.createElement( 'circle', {
      r: radius, fill: "yellow", stroke: "black", 'stroke-width': strokeWidth }
    )
  );
  };

  var Eyes = function (ref) {
    var eyeOffsetX = ref.eyeOffsetX;
    var eyeOffsetY = ref.eyeOffsetY;
    var eyeRadius = ref.eyeRadius;

    return (
  	React.createElement( React.Fragment, null,
      React.createElement( 'circle', { 
        cx: -eyeOffsetX, cy: -eyeOffsetY, r: eyeRadius }
      ),
      React.createElement( 'circle', { 
        cx: eyeOffsetX, cy: -eyeOffsetY, r: eyeRadius }
      )
    )
  );
  };

  var Mouth = function (ref) {
    var mouthRadius = ref.mouthRadius;
    var mouthWidth = ref.mouthWidth;

    var mouthArc = d3.arc()
      .innerRadius(mouthRadius)
      .outerRadius(mouthRadius + mouthWidth)
      .startAngle(Math.PI / 2)
      .endAngle(Math.PI * 3 / 2);  
    return React.createElement( 'path', { d: mouthArc() });
  };

  var FaceContainer = function (ref) {
    var children = ref.children;
    var width = ref.width;
    var height = ref.height;
    var centerX = ref.centerX;
    var centerY = ref.centerY;

    return (
  	React.createElement( 'svg', { width: width, height: height },
      React.createElement( 'g', { transform: ("translate(" + centerX + "," + centerY + ")") },
        children
      )
    )
  );
  };

  var Face = function (ref) {
    var width = ref.width;
    var height = ref.height;
    var centerX = ref.centerX;
    var centerY = ref.centerY;
    var strokeWidth = ref.strokeWidth;
    var eyeOffsetX = ref.eyeOffsetX;
    var eyeOffsetY = ref.eyeOffsetY;
    var eyeRadius = ref.eyeRadius;
    var mouthWidth = ref.mouthWidth;
    var mouthRadius = ref.mouthRadius;

    return (
    React.createElement( FaceContainer, {
    	width: width, height: height, centerX: centerX, centerY: centerY },
    	React.createElement( BackgroundCircle, { 
        radius: centerY - strokeWidth / 2, strokeWidth: strokeWidth }),
      React.createElement( Eyes, {
        eyeOffsetX: eyeOffsetX, eyeOffsetY: eyeOffsetY, eyeRadius: eyeRadius }),
      React.createElement( Mouth, { 
        mouthRadius: mouthRadius, mouthWidth: mouthWidth })
  	)
  );
  };

  console.log(ReactDOM__default['default']);

  var width = 160;
  var height = 160;

  var array = d3.range(6 * 3);

  var App = function () { return array.map(function () { return (
    React__default['default'].createElement( Face, { 
    	width: width, height: height, centerX: width / 2, centerY: height / 2, strokeWidth: 6 + Math.random() * 3, eyeOffsetX: 20 + Math.random() * 9, eyeOffsetY: 20 + Math.random() * 15, eyeRadius: 5 + Math.random() * 10, mouthWidth: 7  + Math.random() * 9, mouthRadius: 30 + Math.random() * 10 })
  ); }); };

  var rootElement = document.getElementById('root');
  ReactDOM__default['default'].render(React__default['default'].createElement( App, null ), rootElement);

  var csvUrl =
    'https://gist.githubusercontent.com/curran/b236990081a24761f7000567094914e0/raw/acd2b8cecfe51c520622fbaf407ee88b8796bfc6/cssNamedColors.csv';

  var width$1 = 960;
  var height$1 = 500;
  var centerX = width$1 / 2;
  var centerY = height$1 / 2;

  var pieArc = d3.arc().innerRadius(0).outerRadius(width$1);
  var colorPie = d3.pie().value(1);

  var App$1 = function () {
    var ref = React$1.useState(null);
    var data = ref[0];
    var setData = ref[1];

    React$1.useEffect(function () {
      d3.csv(csvUrl).then(setData);
    }, []);

    if (!data) {
      return React__default['default'].createElement( 'pre', null, "Loading...." );
    }

    return (
      React__default['default'].createElement( 'svg', { width: width$1, height: height$1 },
        React__default['default'].createElement( 'g', { transform: ("translate(" + centerX + "," + centerY + ")") },
          colorPie(data).map(function (d) { return (
              React__default['default'].createElement( 'path', {
                fill: d.data['RGB hex value'], d: pieArc(d) })
            ); })
        )
      )
    );
  };

  var rootElement$1 = document.getElementById('root');
  ReactDOM__default['default'].render(React__default['default'].createElement( App$1, null ), rootElement$1);

  var width$2 = window.innerWidth;
  var height$2 = window.innerHeight;
  var circleRadius = 30;
  var initialMousePosition = { x: width$2 / 2, y: height$2 / 2 };

  var App$2 = function () {
    var ref = React$1.useState(initialMousePosition);
    var mousePosition = ref[0];
    var setMousePosition = ref[1];
    var handleMouseMove = React$1.useCallback(function (event) {
  	  var clientX = event.clientX;
  	  var clientY = event.clientY;
    	setMousePosition({ x: clientX, y: clientY });
  	}, [setMousePosition]);
    return (
      React__default['default'].createElement( 'svg', { width: width$2, height: height$2, onMouseMove: handleMouseMove },
        React__default['default'].createElement( 'circle', {
          cx: mousePosition.x, cy: mousePosition.y, r: circleRadius })
      )
    )
  };

  var rootElement$2 = document.getElementById('root');
  ReactDOM__default['default'].render(React__default['default'].createElement( App$2, null ), rootElement$2);

  // Appearance customization to improve readability.
  // See https://vega.github.io/vega-lite/docs/
  var dark = '#3e3c38';
  var config = {
    axis: {
      domain: false,
      tickColor: 'lightGray'
    },
    style: {
      "guide-label": {
        fontSize: 20,
        fill: dark
      },
      "guide-title": {
        fontSize: 30,
        fill: dark
      }
    }
  };

  var csvUrl$1 = 'https://gist.githubusercontent.com/curran/8c131a74b85d0bb0246233de2cff3f52/raw/194c2fc143790b937c42bf086a5a44cb3c55340e/auto-mpg.csv';

  var getData = async function () {
    var data = await d3.csv(csvUrl$1);
    
    // Have a look at the attributes available in the console!
    console.log(data[0]);

    return data;
  };

  var viz = vl__default['default']
  	.markCircle({ 
      opacity: 0.2, 
      size: 100 
    })
    .encode(
      vl__default['default'].x().fieldQ('weight').scale({ zero: false }),
      vl__default['default'].y().fieldQ('horsepower').scale({ zero: false }),
  		vl__default['default'].tooltip().fieldN('name'),
      vl__default['default'].color().fieldN('origin'),
      vl__default['default'].size().fieldQ('mpg')
    );

  vl__default['default'].register(vega__default['default'], vegaLite__default['default'], {
    view: { renderer: 'svg' },
    init: function (view) { view.tooltip(new vegaTooltip.Handler().call); }
  });

  var run = async function () {
    var marks = viz
      .data(await getData())
      .width(window.innerWidth)
      .height(window.innerHeight)
      .autosize({ type: 'fit', contains: 'padding' })
      .config(config);
    
    document.body.appendChild(await marks.render());
  };
  run();

  var csvUrl$2 =
    'https://gist.githubusercontent.com/curran/0ac4077c7fc6390f5dd33bf5c06cb5ff/raw/605c54080c7a93a417a3cea93fd52e7550e76500/UN_Population_2019.csv';

  var useData = function () {
    var ref = React$1.useState(null);
    var data = ref[0];
    var setData = ref[1];

    React$1.useEffect(function () {
      var row = function (d) {
        d.Population = +d['2020'] * 1000;
        return d;
      };
      d3.csv(csvUrl$2, row).then(function (data) {
        setData(data.slice(0, 10));
      });
    }, []);

  	return data;
  };

  var AxisBottom = function (ref) {
      var xScale = ref.xScale;
      var innerHeight = ref.innerHeight;
      var tickFormat = ref.tickFormat;

      return xScale.ticks().map(function (tickValue) { return (
      React.createElement( 'g', {
        className: "tick", key: tickValue, transform: ("translate(" + (xScale(tickValue)) + ",0)") },
        React.createElement( 'line', { y2: innerHeight }),
        React.createElement( 'text', {
          style: { textAnchor: 'middle' }, dy: ".71em", y: innerHeight + 3 },
          tickFormat(tickValue)
        )
      )
    ); });
  };

  var AxisLeft = function (ref) {
      var yScale = ref.yScale;

      return yScale.domain().map(function (tickValue) { return (
      React.createElement( 'g', { className: "tick" },
        React.createElement( 'text', {
          key: tickValue, style: { textAnchor: 'end' }, x: -3, y: yScale(tickValue) + yScale.bandwidth() / 2, dy: ".32em" },
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
      var tooltipFormat = ref.tooltipFormat;

      return data.map(function (d) { return (
      React.createElement( 'rect', {
        className: "mark", key: yValue(d), x: 0, y: yScale(yValue(d)), width: xScale(xValue(d)), height: yScale.bandwidth() },
        React.createElement( 'title', null, tooltipFormat(xValue(d)) )
      )
    ); });
  };

  var width$3 = 960;
  var height$3 = 500;
  var margin = {
    top: 20,
    right: 30,
    bottom: 80,
    left: 220,
  };
  var xAxisOffset = 60;

  var App$3 = function () {
    var data = useData();

    if (!data) {
      return React__default['default'].createElement( 'pre', null, "Loading...." );
    }

    var innerHeight = height$3 - margin.top - margin.bottom;
    var innerWidth = width$3 - margin.right - margin.left;

    var xValue = function (d) { return d.Population; };
    var yValue = function (d) { return d.Country; };

    var yScale = d3.scaleBand()
      .domain(data.map(yValue))
      .range([0, innerHeight])
      .paddingInner(0.15);

    var xScale = d3.scaleLinear()
      .domain([0, d3.max(data, xValue)])
      .range([0, innerWidth]);

    var siFormat = d3.format('.2s');
    var xAxisTickFormat = function (tickValue) { return siFormat(tickValue).replace('G', 'B'); };

    return (
      React__default['default'].createElement( 'svg', { width: width$3, height: height$3 },
        React__default['default'].createElement( 'g', {
          transform: ("translate(" + (margin.left) + "," + (margin.top) + ")") },
          React__default['default'].createElement( AxisBottom, {
            xScale: xScale, innerHeight: innerHeight, tickFormat: xAxisTickFormat }),
          React__default['default'].createElement( AxisLeft, { yScale: yScale }),
          React__default['default'].createElement( 'text', {
            className: "axis-label", x: innerWidth / 2, y: innerHeight + xAxisOffset, textAnchor: "middle" }, "Population"),
          React__default['default'].createElement( Marks, {
            data: data, xScale: xScale, yScale: yScale, xValue: xValue, yValue: yValue, tooltipFormat: xAxisTickFormat })
        )
      )
    );
  };

  var rootElement$3 = document.getElementById('root');
  ReactDOM__default['default'].render(React__default['default'].createElement( App$3, null ), rootElement$3);

  var csvUrl$3 =
    'https://gist.githubusercontent.com/curran/a08a1080b88344b0c8a7/raw/0e7a9b0a5d22642a06d3d5b9bcbad9890c8ee534/iris.csv';

  var useData$1 = function () {
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
      d3.csv(csvUrl$3, row).then(setData);
    }, []);

    return data;
  };

  var AxisBottom$1 = function (ref) {
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

  var AxisLeft$1 = function (ref) {
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

  var Marks$1 = function (ref) {
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

  var width$4 = 960;
  var menuHeight = 80;
  var height$4 = 500 - menuHeight;
  var margin$1 = {
    top: 20,
    right: 200,
    bottom: 80,
    left: 100,
  };
  var xAxisOffset$1 = 60;
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

  var App$4 = function () {
    var data = useData$1();

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

    var innerHeight = height$4 - margin$1.top - margin$1.bottom;
    var innerWidth = width$4 - margin$1.right - margin$1.left;

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
        React__default['default'].createElement( 'svg', { width: width$4, height: height$4 },
          React__default['default'].createElement( 'g', {
            transform: ("translate(" + (margin$1.left) + "," + (margin$1.top) + ")") },
            React__default['default'].createElement( AxisBottom$1, {
              xScale: xScale, innerHeight: innerHeight, tickOffset: tickOffset }),
            React__default['default'].createElement( 'text', {
              className: "axis-label", x: innerWidth / 2, y: innerHeight + xAxisOffset$1, textAnchor: "middle" },
              xAxisLabel
            ),
            React__default['default'].createElement( AxisLeft$1, {
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
              React__default['default'].createElement( Marks$1, {
                data: data, xScale: xScale, yScale: yScale, colorScale: colorScale, xValue: xValue, yValue: yValue, colorValue: colorValue, circleRadius: circleRadius })
            ),
            React__default['default'].createElement( Marks$1, {
              data: filteredData, xScale: xScale, yScale: yScale, colorScale: colorScale, xValue: xValue, yValue: yValue, colorValue: colorValue, circleRadius: circleRadius })
          )
        )
      )
    );
  };

  var rootElement$4 = document.getElementById('root');
  ReactDOM__default['default'].render(React__default['default'].createElement( App$4, null ), rootElement$4);

  var csvUrl$4 =
    'https://gist.githubusercontent.com/curran/90240a6d88bdb1411467b21ea0769029/raw/7d4c3914cc6a29a7f5165f7d5d82b735d97bcfe4/week_temperature_sf.csv';

  var useData$2 = function () {
    var ref = React$1.useState(null);
    var data = ref[0];
    var setData = ref[1];

    React$1.useEffect(function () {
      var row = function (d) {
        d.temperature = +d.temperature;
        d.timestamp = new Date(d.timestamp);
        return d;
      };
      d3.csv(csvUrl$4, row).then(setData);
    }, []);

    return data;
  };

  var AxisBottom$2 = function (ref) {
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

  var AxisLeft$2 = function (ref) {
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

  var Marks$2 = function (ref) {
    var data = ref.data;
    var xScale = ref.xScale;
    var yScale = ref.yScale;
    var xValue = ref.xValue;
    var yValue = ref.yValue;
    var circleRadius = ref.circleRadius;

    return (
    React.createElement( 'g', { className: "marks" },
      React.createElement( 'path', {
        d: d3.line()
          .x(function (d) { return xScale(xValue(d)); })
          .y(function (d) { return yScale(yValue(d)); })
          .curve(d3.curveNatural)(data) }),
      data.map(function (d) { return (
        React.createElement( 'circle', {
          cx: xScale(xValue(d)), cy: yScale(yValue(d)), r: circleRadius })
      ); })
    )
  );
  };

  var width$5 = 960;
  var height$5 = 500;
  var margin$2 = {
    top: 20,
    right: 30,
    bottom: 80,
    left: 100,
  };
  var xAxisOffset$2 = 60;
  var yAxisOffset$1 = 50;

  var tickOffset$1 = 16;

  var App$5 = function () {
    var data = useData$2();

    if (!data) {
      return React__default['default'].createElement( 'pre', null, "Loading...." );
    }

    var innerHeight = height$5 - margin$2.top - margin$2.bottom;
    var innerWidth = width$5 - margin$2.right - margin$2.left;

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
      .range([innerHeight, 0])
      .nice();

    var xAxisTickFormat = d3.timeFormat('%a');

    return (
      React__default['default'].createElement( 'svg', { width: width$5, height: height$5 },
        React__default['default'].createElement( 'g', {
          transform: ("translate(" + (margin$2.left) + "," + (margin$2.top) + ")") },
          React__default['default'].createElement( AxisBottom$2, {
            xScale: xScale, innerHeight: innerHeight, tickFormat: xAxisTickFormat, tickOffset: tickOffset$1 }),
          React__default['default'].createElement( 'text', {
            className: "axis-label", x: innerWidth / 2, y: innerHeight + xAxisOffset$2, textAnchor: "middle" },
            xAxisLabel
          ),
          React__default['default'].createElement( AxisLeft$2, {
            yScale: yScale, innerWidth: innerWidth, tickOffset: tickOffset$1 }),
          React__default['default'].createElement( 'text', {
            className: "axis-label", textAnchor: "middle", transform: ("translate(" + (-yAxisOffset$1) + "," + (innerHeight / 2) + ") rotate(-90)") },
            yAxisLabel
          ),
          React__default['default'].createElement( Marks$2, {
            data: data, xScale: xScale, yScale: yScale, xValue: xValue, yValue: yValue, circleRadius: 3 })
        )
      )
    );
  };

  var rootElement$5 = document.getElementById('root');
  ReactDOM__default['default'].render(React__default['default'].createElement( App$5, null ), rootElement$5);

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

  var csvUrl$5 = 'https://gist.githubusercontent.com/curran/13d30e855d48cdd6f22acdf0afe27286/raw/0635f14817ec634833bb904a47594cc2f5f9dbf8/worldcities_clean.csv';

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
      d3.csv(csvUrl$5, row).then(setData);
    }, []);
    
    return data;
  };

  var projection = d3.geoNaturalEarth1();
  var path = d3.geoPath(projection);
  var graticule = d3.geoGraticule();

  var Marks$3 = function (ref) {
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

  var width$6 = 960;
  var height$6 = 500;

  var App$6 = function () {
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
      React__default['default'].createElement( 'svg', { width: width$6, height: height$6 },
        React__default['default'].createElement( Marks$3, {
          worldAtlas: worldAtlas, cities: cities, sizeScale: sizeScale, sizeValue: sizeValue })
      )
    );
  };

  var rootElement$6 = document.getElementById('root');
  ReactDOM__default['default'].render(React__default['default'].createElement( App$6, null ), rootElement$6);

  var jsonUrl$1 = 'https://unpkg.com/world-atlas@2.0.2/countries-50m.json';

  var useWorldAtlas$1 = function () {
    var ref = React$1.useState(null);
    var data = ref[0];
    var setData = ref[1];

    React$1.useEffect(function () {
      d3.json(jsonUrl$1).then(function (topology) {
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

  var csvUrl$6 =
    'https://gist.githubusercontent.com/curran/a9656d711a8ad31d812b8f9963ac441c/raw/267eac8b97d161c479d950ffad3ddd5ce2d1f370/MissingMigrants-Global-2019-10-08T09-47-14-subset.csv';

  var row$1 = function (d) {
    d.coords = d['Location Coordinates']
      .split(',')
      .map(function (d) { return +d; })
      .reverse();
    d['Total Dead and Missing'] = +d[
      'Total Dead and Missing'
    ];
    d['Reported Date'] = new Date(d['Reported Date']);
    return d;
  };

  var useData$3 = function () {
    var ref = React$1.useState(null);
    var data = ref[0];
    var setData = ref[1];

    React$1.useEffect(function () {
      d3.csv(csvUrl$6, row$1).then(setData);
    }, []);

    return data;
  };

  var projection$1 = d3.geoNaturalEarth1();
  var path$1 = d3.geoPath(projection$1);
  var graticule$1 = d3.geoGraticule();

  var Marks$4 = function (ref) {
    var ref_worldAtlas = ref.worldAtlas;
    var land = ref_worldAtlas.land;
    var interiors = ref_worldAtlas.interiors;
    var data = ref.data;
    var sizeScale = ref.sizeScale;
    var sizeValue = ref.sizeValue;

    return (
    React.createElement( 'g', { className: "marks" },
      React$1.useMemo(
        function () { return React.createElement( React.Fragment, null,
            React.createElement( 'path', { className: "sphere", d: path$1({ type: 'Sphere' }) }),
            React.createElement( 'path', { className: "graticule", d: path$1(graticule$1()) }),
            land.features.map(function (feature) { return (
              React.createElement( 'path', { className: "land", d: path$1(feature) })
            ); }),
            React.createElement( 'path', { className: "interiors", d: path$1(interiors) })
          ); },
        [path$1, graticule$1, land, interiors]
      ),
      data.map(function (d) {
        var ref = projection$1(d.coords);
        var x = ref[0];
        var y = ref[1];
        return (
          React.createElement( 'circle', { cx: x, cy: y, r: sizeScale(sizeValue(d)) })
        );
      })
    )
  );
  };

  var sizeValue = function (d) { return d['Total Dead and Missing']; };
  var maxRadius = 15;

  var BubbleMap = function (ref) {
    var data = ref.data;
    var filteredData = ref.filteredData;
    var worldAtlas = ref.worldAtlas;

    var sizeScale = React$1.useMemo(
      function () { return d3.scaleSqrt()
          .domain([0, d3.max(data, sizeValue)])
          .range([0, maxRadius]); },
      [data, sizeValue, maxRadius]
    );    

    return (
      React__default['default'].createElement( Marks$4, {
        worldAtlas: worldAtlas, data: filteredData, sizeScale: sizeScale, sizeValue: sizeValue })
    );
  };

  var AxisBottom$3 = function (ref) {
      var xScale = ref.xScale;
      var innerHeight = ref.innerHeight;
      var tickFormat = ref.tickFormat;
      var tickOffset = ref.tickOffset; if ( tickOffset === void 0 ) tickOffset = 3;

      return xScale.ticks().map(function (tickValue) { return (
      React.createElement( 'g', {
        className: "tick", key: tickValue, transform: ("translate(" + (xScale(tickValue)) + ",0)") },
        React.createElement( 'line', { y2: innerHeight }),
        React.createElement( 'text', { style: { textAnchor: 'middle' }, dy: ".71em", y: innerHeight + tickOffset },
          tickFormat(tickValue)
        )
      )
    ); });
  };

  var AxisLeft$3 = function (ref) {
      var yScale = ref.yScale;
      var innerWidth = ref.innerWidth;
      var tickOffset = ref.tickOffset; if ( tickOffset === void 0 ) tickOffset = 3;

      return yScale.ticks().map(function (tickValue) { return (
      React.createElement( 'g', { className: "tick", transform: ("translate(0," + (yScale(tickValue)) + ")") },
        React.createElement( 'line', { x2: innerWidth }),
        React.createElement( 'text', {
          key: tickValue, style: { textAnchor: 'end' }, x: -tickOffset, dy: ".32em" },
          tickValue
        )
      )
    ); });
  };

  var Marks$5 = function (ref) {
      var data = ref.data;
      var xScale = ref.xScale;
      var yScale = ref.yScale;
      var tooltipFormat = ref.tooltipFormat;
      var innerHeight = ref.innerHeight;

      return data.map(function (d) { return (
      React.createElement( 'rect', {
        className: "mark", x: xScale(d.x0), y: yScale(d.y), width: xScale(d.x1) - xScale(d.x0), height: innerHeight - yScale(d.y) },
        React.createElement( 'title', null, tooltipFormat(d.y) )
      )
    ); });
  };

  var margin$3 = { top: 0, right: 30, bottom: 20, left: 50 };
  var xAxisLabelOffset = 50;
  var yAxisLabelOffset = 30;
  var xAxisTickFormat = d3.timeFormat('%m/%d/%Y');

  var xAxisLabel = 'Time';

  var yValue = function (d) { return d['Total Dead and Missing']; };
  var yAxisLabel = 'Total Dead and Missing';

  var DateHistogram = function (ref) {
    var data = ref.data;
    var width = ref.width;
    var height = ref.height;
    var setBrushExtent = ref.setBrushExtent;
    var xValue = ref.xValue;

    var innerHeight = height - margin$3.top - margin$3.bottom;
    var innerWidth = width - margin$3.left - margin$3.right;

    var xScale = React$1.useMemo(
      function () { return d3.scaleTime()
          .domain(d3.extent(data, xValue))
          .range([0, innerWidth])
          .nice(); }, 
      [data, xValue, innerWidth]
    );

    var binnedData = React$1.useMemo(function () {
      var ref = xScale.domain();
      var start = ref[0];
      var stop = ref[1];
      return d3.histogram()
        .value(xValue)
        .domain(xScale.domain())
        .thresholds(d3.timeMonths(start, stop))(data)
        .map(function (array) { return ({
          y: d3.sum(array, yValue),
          x0: array.x0,
          x1: array.x1,
        }); });
    }, [xValue, xScale, data, yValue]);

    var yScale = React$1.useMemo(
      function () { return d3.scaleLinear()
          .domain([0, d3.max(binnedData, function (d) { return d.y; })])
          .range([innerHeight, 0]); },
      [binnedData, innerHeight]
    );

    var brushRef = React$1.useRef();

    React$1.useEffect(function () {
      var brush = d3.brushX().extent([
        [0, 0],
        [innerWidth, innerHeight] ]);
      brush(d3.select(brushRef.current));
      brush.on('brush end', function () {
        setBrushExtent(
          d3.event.selection &&
            d3.event.selection.map(xScale.invert)
        );
      });
    }, [innerWidth, innerHeight]);

    return (
      React.createElement( React.Fragment, null,
        React.createElement( 'rect', { width: width, height: height, fill: "white" }),
        React.createElement( 'g', {
          transform: ("translate(" + (margin$3.left) + "," + (margin$3.top) + ")") },
          React.createElement( AxisBottom$3, {
            xScale: xScale, innerHeight: innerHeight, tickFormat: xAxisTickFormat, tickOffset: 5 }),
          React.createElement( 'text', {
            className: "axis-label", textAnchor: "middle", transform: ("translate(" + (-yAxisLabelOffset) + "," + (innerHeight / 2) + ") rotate(-90)") },
            yAxisLabel
          ),
          React.createElement( AxisLeft$3, {
            yScale: yScale, innerWidth: innerWidth, tickOffset: 5 }),
          React.createElement( 'text', {
            className: "axis-label", x: innerWidth / 2, y: innerHeight + xAxisLabelOffset, textAnchor: "middle" },
            xAxisLabel
          ),
          React.createElement( Marks$5, {
            data: binnedData, xScale: xScale, yScale: yScale, tooltipFormat: function (d) { return d; }, innerHeight: innerHeight }),
          React.createElement( 'g', { ref: brushRef })
        )
      )
    );
  };

  var width$7 = 960;
  var height$7 = 500;
  var dateHistogramSize = 0.2;

  var xValue = function (d) { return d['Reported Date']; };

  var App$7 = function () {
    var worldAtlas = useWorldAtlas$1();
    var data = useData$3();
    var ref = React$1.useState();
    var brushExtent = ref[0];
    var setBrushExtent = ref[1];

    if (!worldAtlas || !data) {
      return React__default['default'].createElement( 'pre', null, "Loading...." );
    }

    var filteredData = brushExtent
      ? data.filter(function (d) {
          var date = xValue(d);
          return (
            brushExtent[0] < date && date < brushExtent[1]
          );
        })
      : data;

    return (
      React__default['default'].createElement( 'svg', { width: width$7, height: height$7 },
        React__default['default'].createElement( BubbleMap, {
          data: data, filteredData: filteredData, worldAtlas: worldAtlas }),
        React__default['default'].createElement( 'g', {
          transform: ("translate(0," + (height$7 - dateHistogramSize * height$7) + ")") },
          React__default['default'].createElement( DateHistogram, {
            data: data, width: width$7, height: dateHistogramSize * height$7, setBrushExtent: setBrushExtent, xValue: xValue })
        )
      )
    );
  };

  var rootElement$7 = document.getElementById('root');
  ReactDOM__default['default'].render(React__default['default'].createElement( App$7, null ), rootElement$7);

  var jsonUrl$2 =
    'https://unpkg.com/world-atlas@2.0.2/countries-50m.json';

  var useWorldAtlas$2 = function () {
    var ref = React$1.useState(null);
    var data = ref[0];
    var setData = ref[1];

    React$1.useEffect(function () {
      d3.json(jsonUrl$2).then(function (topology) {
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

  var csvUrl$7 =
    'https://gist.githubusercontent.com/curran/470752f12c027f8ff4266e7c96f26a56/raw/66908b56e371e7c9f5a1c0911ac3250f570a4c83/share-of-population-infected-with-hiv-ihme.csv';

  var row$2 = function (d) {
    d.aids = +d[
      'Prevalence - HIV/AIDS - Sex: Both - Age: 15-49 years (Percent) (%)'
    ];
    return d;
  };

  var useData$4 = function () {
    var ref = React$1.useState(null);
    var data = ref[0];
    var setData = ref[1];

    React$1.useEffect(function () {
      d3.csv(csvUrl$7, row$2).then(setData);
    }, []);

    return data;
  };

  var csvUrl$8 =
    'https://raw.githubusercontent.com/lukes/ISO-3166-Countries-with-Regional-Codes/master/slim-3/slim-3.csv';

  var useCodes = function () {
    var ref = React$1.useState(null);
    var data = ref[0];
    var setData = ref[1];

    React$1.useEffect(function () {
      d3.csv(csvUrl$8).then(setData);
    }, []);

    return data;
  };

  var projection$2 = d3.geoNaturalEarth1();
  var path$2 = d3.geoPath(projection$2);
  var graticule$2 = d3.geoGraticule();

  var missingDataColor = 'gray';

  var Marks$6 = function (ref) {
    var ref_worldAtlas = ref.worldAtlas;
    var countries = ref_worldAtlas.countries;
    var interiors = ref_worldAtlas.interiors;
    var rowByNumericCode = ref.rowByNumericCode;
    var colorScale = ref.colorScale;
    var colorValue = ref.colorValue;

    return (
    React.createElement( 'g', { className: "marks" },
      React.createElement( 'path', { className: "sphere", d: path$2({ type: 'Sphere' }) }),
      React.createElement( 'path', { className: "graticule", d: path$2(graticule$2()) }),
      countries.features.map(function (feature) {
        var d = rowByNumericCode.get(feature.id);
        return (
          React.createElement( 'path', {
            fill: d ? colorScale(colorValue(d)) : missingDataColor, d: path$2(feature) })
        );
      }),
      React.createElement( 'path', { className: "interiors", d: path$2(interiors) })
    )
  );
  };

  var width$8 = 960;
  var height$8 = 500;

  var selectedYear = '2017';

  var App$8 = function () {
    var worldAtlas = useWorldAtlas$2();
    var data = useData$4();
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
      React__default['default'].createElement( 'svg', { width: width$8, height: height$8 },
        React__default['default'].createElement( Marks$6, {
          worldAtlas: worldAtlas, rowByNumericCode: rowByNumericCode, colorScale: colorScale, colorValue: colorValue })
      )
    );
  };

  var rootElement$8 = document.getElementById('root');
  ReactDOM__default['default'].render(React__default['default'].createElement( App$8, null ), rootElement$8);

  exports.BubbleMap = BubbleMap;
  exports.DateHistogram = DateHistogram;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

}({}, React, ReactDOM, d3, vega, vegaLite, vl, vegaTooltip, ReactDropdown, topojson));
