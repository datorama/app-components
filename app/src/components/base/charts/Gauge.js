import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useAnimation } from '../../hooks/common.hooks';
import { useTheme } from '../../hooks/theme.hooks';

const SIZE = 400;

const polarToCartesian = (centerX, centerY, radius, angleInDegrees) => {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;

  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians)
  };
};

const describeArc = (x, y, radius, startAngle, endAngle) => {
  const start = polarToCartesian(x, y, radius, endAngle);
  const end = polarToCartesian(x, y, radius, startAngle);
  const arcSweep = endAngle - startAngle <= 180 ? '0' : '1';

  return [
    'M',
    start.x,
    start.y,
    'A',
    radius,
    radius,
    0,
    arcSweep,
    0,
    end.x,
    end.y
  ].join(' ');
};

const Gauge = props => {
  const { className, min, max, labelRenderer, start, end, value } = props;
  const theme = useTheme();
  const time = useAnimation('elastic', 2000, 0);

  const calcValue = (value - min) / (max - min);

  const rangeStart = (start - min) / (max - min);
  const rangeEnd = (end - min) / (max - min);
  const range = start <= min ? rangeEnd : rangeStart;
  const floatingLabel = rangeStart <= min ? end : start;

  const RADIUS = 110;

  const valuePos = polarToCartesian(
    SIZE / 2,
    SIZE / 2,
    RADIUS + 25,
    -135 + time * 275 * calcValue
  );

  const rangePos = polarToCartesian(
    SIZE / 2,
    SIZE / 2,
    RADIUS + 60,
    -135 + time * 275 * range
  );

  const tickCenter = { x: SIZE / 2, y: SIZE / 2 + 60 };
  const tickVector = {
    x: valuePos.x - tickCenter.x,
    y: valuePos.y - tickCenter.y
  };
  const tickPos = {
    x: tickCenter.x + tickVector.x * 0.8,
    y: tickCenter.y + tickVector.y * 0.8
  };

  return (
    <Container viewBox={`0 0 ${SIZE} ${SIZE}`} className={className}>
      <Path
        d={describeArc(SIZE / 2, SIZE / 2, RADIUS, 0, time * 275)}
        stroke={theme.p100}
        width={30}
        className="thick-bg"
      />

      <Path
        d={describeArc(
          SIZE / 2,
          SIZE / 2,
          RADIUS,
          time * 275 * rangeStart,
          time * 275 * rangeEnd
        )}
        stroke={theme.p200}
        width={30}
        className="thick-value"
      />

      <Path
        d={describeArc(SIZE / 2, SIZE / 2, RADIUS + 25, 0, time * 275)}
        stroke={theme.g100}
        width={10}
        className="thin-bg"
      />

      <Path
        d={describeArc(
          SIZE / 2,
          SIZE / 2,
          RADIUS + 25,
          time * 275 * rangeStart,
          time * 275 * rangeEnd
        )}
        stroke={theme.g300}
        width={10}
        className="thin-value"
      />

      <Label
        x={SIZE / 2 - 90}
        y={SIZE - 60}
        fill={theme.p200}
        size={26}
        anchor="end"
        className="small-label"
      >
        {labelRenderer ? labelRenderer(min) : min}
      </Label>

      <Label
        x={SIZE / 2 + 90}
        y={SIZE - 60}
        fill={theme.p200}
        size={26}
        anchor="start"
        className="small-label"
      >
        {labelRenderer ? labelRenderer(max) : max}
      </Label>

      <Label
        x={SIZE / 2}
        y={SIZE - 80}
        fill={theme.p300}
        size={40}
        className="large-label"
      >
        {labelRenderer
          ? labelRenderer(Math.round(time * value))
          : Math.round(time * value)}
      </Label>

      <Label
        x={rangePos.x}
        y={rangePos.y}
        fill={theme.p200}
        size={26}
        className="small-label"
      >
        {labelRenderer
          ? labelRenderer(Math.round(time * floatingLabel))
          : Math.round(time * floatingLabel)}
      </Label>

      <Circle
        cx={valuePos.x}
        cy={valuePos.y}
        r={13}
        fill={theme.g300}
        className="circle"
      />

      <Tick
        d={[
          `M ${tickCenter.x}, ${tickCenter.y}`,
          `L ${tickPos.x}, ${tickPos.y} z`
        ].join(' ')}
        fill={theme.p400}
        className="tick"
      />
    </Container>
  );
};

export default Gauge;

Gauge.propTypes = {
  start: PropTypes.number.isRequired,
  end: PropTypes.number.isRequired,
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
  className: PropTypes.string,
  labelRenderer: PropTypes.func
};

const Container = styled.svg`
  width: ${SIZE}px;
  height: ${SIZE}px;
  ${({ theme }) => theme.animation.fade};
`;

const Path = styled.path`
  stroke-linecap: round;
  fill: transparent;
  stroke: ${({ stroke }) => stroke};
  stroke-width: ${({ width }) => width};
  transform-origin: 50% 50%;
  transform: rotate(-135deg);
`;

const Label = styled.text`
  font-size: ${({ size }) => size}px;
  fill: ${({ fill }) => fill};
  font-weight: 700;
  text-anchor: ${({ anchor }) => anchor || 'middle'};
  alignment-baseline: middle;
`;

const Circle = styled.circle`
  stroke: transparent;
  fill: ${({ fill }) => fill};
`;

const Tick = styled.path`
  stroke: ${({ fill }) => fill};
  stroke-width: 4;
  fill: ${({ fill }) => fill};
  stroke-linecap: round;
  stroke-linejoin: round;
`;
