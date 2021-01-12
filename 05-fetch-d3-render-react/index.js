import React, { useState, useCallback, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { csv } from 'd3';
import { message } from './message';

const csvUrl = 'https://gist.githubusercontent.com/takuti/409788f38199e8429384259d25dfc4b5/raw/8977da6e5bf29b156e5609cb6bb828ba6a31c0dc/churn.csv';

const App = () => {
  const [data, setData] = useState(null);
  
  useEffect(() => {
    csv(csvUrl).then(setData);
  }, []);

  return <pre>{data ? message(data) : 'Loading...'}</pre>;
};

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);