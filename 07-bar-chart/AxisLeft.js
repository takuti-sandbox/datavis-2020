export const AxisLeft = ({ yScale }) =>
  yScale.domain().map((tickValue) => (
    <g className="tick">
      <text
        key={tickValue}
        style={{ textAnchor: 'end' }}
        x={-3}
        y={yScale(tickValue) + yScale.bandwidth() / 2}
        dy=".32em"
      >
        {tickValue}
      </text>
    </g>
  ));
