import { line, curveNatural } from 'd3';

export const Marks = ({
  data,
  xScale,
  yScale,
  xValue,
  yValue,
  circleRadius,
}) => (
  <g className="marks">
    <path
      d={line()
        .x((d) => xScale(xValue(d)))
        .y((d) => yScale(yValue(d)))
        .curve(curveNatural)(data)}
    />
    {data.map((d) => (
      <circle
        cx={xScale(xValue(d))}
        cy={yScale(yValue(d))}
        r={circleRadius}
      />
    ))}
  </g>
);
