(function (React, ReactDOM, d3$1) {
  'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
  var ReactDOM__default = /*#__PURE__*/_interopDefaultLegacy(ReactDOM);

  var message = function (data) {
    var message = '';
    message += Math.round(d3.csvFormat(data).length / 1024) + ' kB\n';
    message += data.length + ' rows\n';
    message += data.columns.length + ' columns';
    return message;
  };

  var csvUrl = 'https://gist.githubusercontent.com/takuti/409788f38199e8429384259d25dfc4b5/raw/8977da6e5bf29b156e5609cb6bb828ba6a31c0dc/churn.csv';

  var App = function () {
    var ref = React.useState(null);
    var data = ref[0];
    var setData = ref[1];
    
    React.useEffect(function () {
      d3$1.csv(csvUrl).then(setData);
    }, []);

    return React__default['default'].createElement( 'pre', null, data ? message(data) : 'Loading...' );
  };

  var rootElement = document.getElementById('root');
  ReactDOM__default['default'].render(React__default['default'].createElement( App, null ), rootElement);

}(React, ReactDOM, d3));
//# sourceMappingURL=bundle.js.map
