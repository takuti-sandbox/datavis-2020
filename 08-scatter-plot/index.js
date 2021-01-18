import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import {
  scaleLinear,
  scaleOrdinal,
  extent,
} from 'd3';
import ReactDropdown from 'react-dropdown';
// import { Dropdown } from './Dropdown';
import { useData } from './useData';
import { AxisBottom } from './AxisBottom';
import { AxisLeft } from './AxisLeft';
import { Marks } from './Marks';
import { ColorLegend } from './ColorLegend';

const width = 960;
const menuHeight = 80;
const height = 500 - menuHeight;
const margin = {
  top: 20,
  right: 200,
  bottom: 80,
  left: 100,
};
const xAxisOffset = 60;
const yAxisOffset = 50;

const tickOffset = 16;

const fadeOpacity = 0.2;

const attributes = [
  { value: 'sepal_length', label: 'Sepal Length' },
  { value: 'sepal_width', label: 'Sepal Width' },
  { value: 'petal_length', label: 'Patal Length' },
  { value: 'petal_width', label: 'Patal Width' },
];

const getLabel = (attribute) => {
  for (let i = 0; i < attributes.length; i++) {
    if (attributes[i].value === attribute) {
      return attributes[i].label;
    }
  }
};

const App = () => {
  const data = useData();

  const initialXAttribute = 'petal_length';
  const [xAttribute, setXAttribute] = useState(
    initialXAttribute
  );
  const xValue = (d) => d[xAttribute];
  const xAxisLabel = getLabel(xAttribute);

  const initialYAttribute = 'sepal_width';
  const [yAttribute, setYAttribute] = useState(
    initialYAttribute
  );
  const yValue = (d) => d[yAttribute];
  const yAxisLabel = getLabel(yAttribute);

  const [hoveredValue, setHoveredValue] = useState(null);
  const colorValue = (d) => d.species;
  const colorLegendLabel = 'Species';

  const circleRadius = 7;

  if (!data) {
    return <pre>Loading....</pre>;
  }
  const filteredData = data.filter(
    (d) => colorValue(d) === hoveredValue
  );

  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.right - margin.left;

  const xScale = scaleLinear()
    .domain(extent(data, xValue))
    .range([0, innerWidth])
    .nice();

  const yScale = scaleLinear()
    .domain(extent(data, yValue))
    .range([0, innerHeight]);

  const colorScale = scaleOrdinal()
    .domain(data.map(colorValue))
    .range(['#e6842a', '#137b80', '#8e6c8a']);

  return (
    <>
      <div className="menus-container">
        <span className="dropdown-label">X</span>
        <ReactDropdown
          options={attributes}
          value={xAttribute}
          onChange={({ value }) => setXAttribute(value)}
        />
        <span className="dropdown-label">Y</span>
        <ReactDropdown
          options={attributes}
          value={yAttribute}
          onChange={({ value }) => setYAttribute(value)}
        />
      </div>
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
          <g transform={`translate(${innerWidth + 50},60)`}>
            <text
              x={50}
              y={-30}
              className="axis-label"
              textAnchor="middle"
            >
              {colorLegendLabel}
            </text>
            <ColorLegend
              colorScale={colorScale}
              tickSpacing={30}
              tickSize={circleRadius}
              tickTextOffset={20}
              onHover={setHoveredValue}
              hoveredValue={hoveredValue}
              fadeOpacity={fadeOpacity}
            />
          </g>
          <g opacity={hoveredValue ? fadeOpacity : 1.0}>
            <Marks
              data={data}
              xScale={xScale}
              yScale={yScale}
              colorScale={colorScale}
              xValue={xValue}
              yValue={yValue}
              colorValue={colorValue}
              circleRadius={circleRadius}
            />
          </g>
          <Marks
            data={filteredData}
            xScale={xScale}
            yScale={yScale}
            colorScale={colorScale}
            xValue={xValue}
            yValue={yValue}
            colorValue={colorValue}
            circleRadius={circleRadius}
          />
        </g>
      </svg>
    </>
  );
};

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
