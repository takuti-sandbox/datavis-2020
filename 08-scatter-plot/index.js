import React from 'react';
import ReactDOM from 'react-dom';
import { scaleBand, scaleLinear, extent } from 'd3';
import { useData } from './useData';
import { AxisBottom } from './AxisBottom';
import { AxisLeft } from './AxisLeft';
import { Marks } from './Marks';

const width = 960;
const height = 500;
const margin = {
  top: 20,
  right: 30,
  bottom: 80,
  left: 100,
};
const xAxisOffset = 60;
const yAxisOffset = 50;

const tickOffset = 16;

const App = () => {
  const data = useData();

  if (!data) {
    return <pre>Loading....</pre>;
  }

  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.right - margin.left;

  const xValue = (d) => d.petal_length;
  const xAxisLabel = 'Petal Length';

  const yValue = (d) => d.sepal_width;
  const yAxisLabel = 'Sepal Width';

  const xScale = scaleLinear()
    .domain(extent(data, xValue))
    .range([0, innerWidth])
    .nice();

  const yScale = scaleLinear()
    .domain(extent(data, yValue))
    .range([0, innerHeight]);

  return (
    <svg width={width} height={height}>
      <g
        transform={`translate(${margin.left},${margin.top})`}
      >
        <AxisBottom
          xScale={xScale}
          innerHeight={innerHeight}
          tickOffset={tickOffset}
        />
        <text
          className="axis-label"
          x={innerWidth / 2}
          y={innerHeight + xAxisOffset}
          textAnchor="middle"
        >
          {xAxisLabel}
        </text>
        <AxisLeft
          yScale={yScale}
          innerWidth={innerWidth}
          tickOffset={tickOffset}
        />
        <text
          className="axis-label"
          textAnchor="middle"
          transform={`translate(${-yAxisOffset},${
            innerHeight / 2
          }) rotate(-90)`}
        >
          {yAxisLabel}
        </text>
        <Marks
          data={data}
          xScale={xScale}
          yScale={yScale}
          xValue={xValue}
          yValue={yValue}
          circleRadius={7}
        />
      </g>
    </svg>
  );
};

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);