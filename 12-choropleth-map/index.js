import React from 'react';
import ReactDOM from 'react-dom';
import {
  interpolateYlOrRd,
  scaleSequential,
  max,
} from 'd3';
import { useWorldAtlas } from './useWorldAtlas';
import { useData } from './useData';
import { useCodes } from './useCodes';
import { Marks } from './Marks';

const width = 960;
const height = 500;

const selectedYear = '2017';

const App = () => {
  const worldAtlas = useWorldAtlas();
  const data = useData();
  const codes = useCodes();

  if (!worldAtlas || !data || !codes) {
    return <pre>Loading....</pre>;
  }

  const numericCodeByAlpha3Code = new Map();
  codes.forEach((code) => {
    numericCodeByAlpha3Code.set(
      code['alpha-3'],
      code['country-code']
    );
  });

  const filteredData = data.filter(
    (d) => d.Year === selectedYear
  );

  const rowByNumericCode = new Map();
  filteredData.forEach((d) => {
    const alpha3Code = d.Code;
    const numericCode = numericCodeByAlpha3Code.get(
      alpha3Code
    );
    rowByNumericCode.set(numericCode, d);
  });

  const colorValue = (d) => d.aids;

  const colorScale = scaleSequential(
    interpolateYlOrRd
  ).domain([0, max(data, colorValue)]);

  return (
    <svg width={width} height={height}>
      <Marks
        worldAtlas={worldAtlas}
        rowByNumericCode={rowByNumericCode}
        colorScale={colorScale}
        colorValue={colorValue}
      />
    </svg>
  );
};

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
