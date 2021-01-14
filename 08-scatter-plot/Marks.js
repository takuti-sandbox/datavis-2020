export const Marks = ({
  data,
  xScale,
  yScale,
  colorScale,
  xValue,
  yValue,
  colorValue,
  circleRadius
}) =>
  data.map(d => (
    <circle
      className="mark"
      cx={xScale(xValue(d))}
      cy={yScale(yValue(d))}
      fill={colorScale(colorValue(d))}
     	r={circleRadius}
    />
  ));
