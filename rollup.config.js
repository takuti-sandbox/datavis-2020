const buble = require('@rollup/plugin-buble');

const buildFolders = [
  '01-face',
  // '02-fetch-async',
  '03-interaction',
  // '04-fetch-d3',
  '05-fetch-visualize-react-d3',
  '06-vega-lite-api',
  '07-bar-chart',
  '08-scatter-plot',
  '09-line-chart',
  '10-world-map',
  '11-missing-migrants',
  '12-choropleth-map'
];

const configs = buildFolders.map(v => {
  return {
    input: v + '/index.js',
    external: ["d3","d3-array","d3-axis","d3-brush","d3-chord","d3-collection","d3-color","d3-contour","d3-dispatch","d3-drag","d3-dsv","d3-ease","d3-fetch","d3-force","d3-format","d3-geo","d3-hierarchy","d3-interpolate","d3-path","d3-polygon","d3-quadtree","d3-random","d3-scale","d3-scale-chromatic","d3-selection","d3-shape","d3-tile","d3-time","d3-time-format","d3-timer","d3-transition","d3-voronoi","d3-zoom","react","react-dom","react-dropdown-browser","react-dropdown","three","vega","vega-embed","vega-lite","vega-lite-api","vega-tooltip","vega-themes","vizhub-vega-lite-config","semiotic","viz.js","topojson"],
    output: {
      file: v + '/bundle.js',
      format: 'iife',
      sourcemap: false,
      globals: {"d3":"d3","d3-array":"d3","d3-axis":"d3","d3-brush":"d3","d3-chord":"d3","d3-collection":"d3","d3-color":"d3","d3-contour":"d3","d3-dispatch":"d3","d3-drag":"d3","d3-dsv":"d3","d3-ease":"d3","d3-fetch":"d3","d3-force":"d3","d3-format":"d3","d3-geo":"d3","d3-hierarchy":"d3","d3-interpolate":"d3","d3-path":"d3","d3-polygon":"d3","d3-quadtree":"d3","d3-random":"d3","d3-scale":"d3","d3-scale-chromatic":"d3","d3-selection":"d3","d3-shape":"d3","d3-tile":"d3","d3-time":"d3","d3-time-format":"d3","d3-timer":"d3","d3-transition":"d3","d3-voronoi":"d3","d3-zoom":"d3","react":"React","react-dom":"ReactDOM","react-dropdown-browser":"ReactDropdown","react-dropdown":"ReactDropdown","three":"THREE","vega":"vega","vega-embed":"vegaEmbed","vega-lite":"vegaLite","vega-lite-api":"vl","vega-tooltip":"vegaTooltip","vega-themes":"vegaThemes","vizhub-vega-lite-config":"vizhubVegaLiteConfig","semiotic":"Semiotic","viz.js":"Viz","topojson":"topojson"}
    },
    plugins: [
      buble({
        transforms: {
          asyncAwait: false
        }
      })
    ]
  }
});

export default configs;