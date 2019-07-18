import React from 'react';
import styled, { withTheme, keyframes } from 'styled-components';
import PropTypes from 'prop-types';

const angleToRad = angle => ((angle - 90) * Math.PI) / 180.0;
const polarToCartesian = (centerX, centerY, radius, angleInDegrees) => ({
  x: centerX + radius * Math.cos(angleToRad(angleInDegrees)),
  y: centerY + radius * Math.sin(angleToRad(angleInDegrees))
});

const describeArc = (x, y, radius, startAngle, endAngle) => {
  const start = polarToCartesian(x, y, radius, endAngle);
  const end = polarToCartesian(x, y, radius, startAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';

  return [
    'M',
    start.x,
    start.y,
    'A',
    radius,
    radius,
    0,
    largeArcFlag,
    0,
    end.x,
    end.y
  ].join(' ');
};

const SnailChart = ({
  theme,
  linecap = 'none',
  data = [],
  dividers = 5,
  className,
  mouseEnter,
  mouseLeave
}) => {
  // local center
  const center = { x: 250, y: 250 };
  const amount = data.length;
  const barWidth = 30;
  const circumference = Math.ceil(2 * Math.PI * (50 + barWidth * amount));
  const elementsRadius = 50 + amount * barWidth + barWidth + 30;

  const elementMouseEnter = item => (event) => mouseEnter && mouseEnter({event, item});
  const elementMouseLeave = item => (event) => mouseLeave && mouseLeave({event, item});

  const elements = [];

  // inner circles
  for (let i = 0; i < amount + 1; i++) {
    elements.push(
      <Path
          key={`arc-${i}`}
          d={describeArc(center.x, center.y, 50 + barWidth * i, 0, 270)}
      />
    );
  }

  for (let i = amount - 1; i >= 0; i--) {
    const item = data[i];

    elements.push(
      <FilledPath
          linecap={linecap}
          hoverColor={item.hoverColor || theme.a500}
          stroke={item.color || theme.a400}
          circumference={circumference}
          barWidth={barWidth}
          key={`arc-fill-${i}`}
          d={describeArc(
              center.x,
              center.y,
              50 + barWidth * i + barWidth / 2,
              0,
              270 * (item.percentage / 100)
          )}
          onMouseEnter={elementMouseEnter(item)}
          onMouseLeave={elementMouseLeave(item)}
      />,
      <Label
          key={`label-${i}`}
          x={center.x - 30}
          y={center.y - 50 - i * barWidth - barWidth / 2}
      >
        {item.label || 'untitled'}
      </Label>
    );
  }

  // dividers
  for (let i = 0; i < dividers + 1; i++) {
    const alpha = -((0.75 * 2 * Math.PI) / dividers) * i;
    // line start
    const x = center.x - 50 * Math.sin(alpha);
    const y = center.y - 50 * Math.cos(alpha);

    // line end
    const x2 = center.x - (50 + amount * barWidth) * Math.sin(alpha);
    const y2 = center.y - (50 + amount * barWidth) * Math.cos(alpha);

    // labels (text) position
    const x3 = center.x - (50 + amount * barWidth + 30) * Math.sin(alpha);
    const y3 = center.y - (50 + amount * barWidth + 30) * Math.cos(alpha);

    let percentage = (100 / dividers) * i;
    percentage = percentage % 1 > 0 ? percentage.toFixed(1) : percentage;

    elements.push(
      <Path key={`divider-${i}`} d={`M ${x}, ${y} L ${x2}, ${y2}`} />,
      <Label
          key={`percentage-label-${i}`}
          x={x3}
          y={y3}
          textAnchor="middle"
          fontSize={16}
      >
        {percentage}
      </Label>
    );
  }

  return (
    <Container
        className={className}
        viewBox={`${center.x - elementsRadius} ${center.y - elementsRadius} ${2 *
        elementsRadius} ${2 * elementsRadius}`}
    >
      {elements}
    </Container>
  );
};

SnailChart.propTypes = {
  className: PropTypes.string,
  linecap: PropTypes.string,
  dividers: PropTypes.number,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      percentage: PropTypes.number,
      color: PropTypes.string,
      hoverColor: PropTypes.string
    })
  ),
  mouseEnter: PropTypes.func,
  mouseLeave: PropTypes.func
};

export default withTheme(SnailChart);

const Container = styled.svg`
  width: 400px;
  height: 400px;
`;

const Path = styled.path`
  stroke: ${({ theme }) => theme.p200};
  fill: transparent;
  stroke-width: 1;
`;

const animation = circumference => keyframes`
	to {
		stroke-dashoffset: ${2 * circumference};
	}
`;

const FilledPath = styled.path`
  stroke: ${({ stroke }) => stroke};
  fill: transparent;
  stroke-width: 20px;
  stroke-linecap: ${({ linecap }) => linecap};

  stroke-dasharray: ${({ circumference }) => circumference};
  stroke-dashoffset: ${({ circumference }) => circumference};
  animation: ${({ circumference }) => animation(circumference)} 2s linear
    forwards;
  transition: all 300ms;

  &:hover {
    stroke-width: 24px;
    stroke: ${({ hoverColor }) => hoverColor};
  }
`;

const Label = styled.text`
  fill: ${({ theme }) => theme.p600};
  font-size: ${({ fontSize }) => fontSize || '16px'};
  font-weight: 500;
  text-anchor: ${({ textAnchor }) => textAnchor || 'end'};
  alignment-baseline: middle;
`;
