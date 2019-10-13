import React, { useMemo } from 'react';
import styled from 'styled-components';

const GoalsChartAxis = ({
  min,
  max,
  steps,
  height,
  padding,
  ticksColor,
  labelsColor,
  axisLabelRenderer,
  valueFormatter
}) => {
  const lines = [];
  const step = useMemo(() => (height - 2 * padding) / (steps - 1), [
    height,
    padding,
    steps
  ]);

  for (let i = 0; i < steps; i++) {
    const y = padding + i * step;

    lines.push(
      <Tick
        key={`line-${i}`}
        x1={2 * padding}
        x2={2 * padding + 5}
        y1={y}
        y2={y}
        color={ticksColor}
      />
    );
  }

  const bottomValueProps = useMemo(
    () => ({
      key: 'bottom-value',
      x: 2 * padding - 5,
      y: padding,
      value: max
    }),
    [max, padding]
  );

  const topValueProps = useMemo(
    () => ({
      key: 'top-value',
      x: 2 * padding - 5,
      y: padding + (steps - 1) * step,
      value: min
    }),
    [min, padding, step, steps]
  );

  lines.push(
    axisLabelRenderer ? (
      axisLabelRenderer(bottomValueProps)
    ) : (
      <Label
        {...bottomValueProps}
        alignmentBaseline="middle"
        textAnchor="end"
        color={labelsColor}
      >
        {valueFormatter(max)}
      </Label>
    ),
    axisLabelRenderer ? (
      axisLabelRenderer(topValueProps)
    ) : (
      <Label
        {...topValueProps}
        alignmentBaseline="middle"
        textAnchor="end"
        color={labelsColor}
      >
        {valueFormatter(min)}
      </Label>
    )
  );

  return <g>{lines}</g>;
};

const Tick = styled.line`
  stroke: ${({ theme, color }) => color || theme.p400};
  stroke-width: 1;
  stroke-linecap: round;
`;

const Label = styled.text`
  font-size: 11px;
  font-weight: 500;
  fill: ${({ theme, color }) => color || theme.p400};
`;

export default GoalsChartAxis;
