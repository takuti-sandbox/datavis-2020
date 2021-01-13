(function (vega, vegaLite, vl, vegaTooltip, d3) {
  'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var vega__default = /*#__PURE__*/_interopDefaultLegacy(vega);
  var vegaLite__default = /*#__PURE__*/_interopDefaultLegacy(vegaLite);
  var vl__default = /*#__PURE__*/_interopDefaultLegacy(vl);

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

  var csvUrl = 'https://gist.githubusercontent.com/curran/8c131a74b85d0bb0246233de2cff3f52/raw/194c2fc143790b937c42bf086a5a44cb3c55340e/auto-mpg.csv';

  var getData = async function () {
    var data = await d3.csv(csvUrl);
    
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

}(vega, vegaLite, vl, vegaTooltip, d3));
