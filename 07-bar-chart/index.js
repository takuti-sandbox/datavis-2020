import React from 'react';
import ReactDOM from 'react-dom';
import { format, scaleBand, scaleLinear, max } from 'd3';
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
  left: 220,
};
const xAxisOffset = 60;

const App = () => {
  const data = useData();

  if (!data) {
    return <pre>Loading....</pre>;
  }

  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.right - margin.left;

  const xValue = (d) => d.Population;
  const yValue = (d) => d.Country;

  const yScale = scaleBand()
    .domain(data.map(yValue))
    .range([0, innerHeight])
    .paddingInner(0.15);

  const xScale = scaleLinear()
    .domain([0, max(data, xValue)])
    .range([0, innerWidth]);

  const siFormat = format('.2s');
  const xAxisTickFormat = (tickValue) =>
    siFormat(tickValue).replace('G', 'B');

  return (
    <svg width={width} height={height}>
      <g
        transform={`translate(${margin.left},${margin.top})`}
      >
        <AxisBottom
          xScale={xScale}
          innerHeight={innerHeight}
          tickFormat={xAxisTickFormat}
        />
        <AxisLeft yScale={yScale} />
        <text
          className="axis-label"
          x={innerWidth / 2}
          y={innerHeight + xAxisOffset}
          textAnchor="middle"
        >
          Population
        </text>
        <Marks
          data={data}
          xScale={xScale}
          yScale={yScale}
          xValue={xValue}
          yValue={yValue}
          tooltipFormat={xAxisTickFormat}
        />
      </g>
    </svg>
  );
};

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
