import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useAnimation } from '../../hooks/common.hooks';
import { useTheme } from '../../hooks/theme.hooks';

const SIZE = 400;
const Gauge = props => {
  const theme = useTheme();

  const startOffset = props.start / (props.max - props.min);
  const endOffset = props.end / (props.max - props.min);
  const percent = 0.5;
  const selected = props.value / (props.max - props.min);

  const R1 = SIZE - 110;
  const outerCircumference = (2 * Math.PI * R1) / 2;

  const R2 = SIZE - 160;
  const circumference = (2 * Math.PI * R2) / 2;

  const outerPlaceholderDashoffset =
    outerCircumference - (75 / 100) * outerCircumference;
  const placeholderDashoffset = circumference - (75 / 100) * circumference;

  const time = useAnimation('elastic', 2000, 500);
  const alpha = (-1 * Math.PI) / 4 - selected * time * 1.5 * Math.PI;

  return (
    <Container viewBox={`0 0 ${SIZE} ${SIZE}`} className={props.className}>
      <defs>
        <linearGradient id="gauge-colors" x1="100%" y1="0%" x2="0%" y2="0%">
          <stop
            offset="0%"
            style={{ stopColor: theme.p200, stopOpacity: 0.5 }}
          />
          <stop
            offset="100%"
            style={{ stopColor: theme.p300, stopOpacity: 1 }}
          />
        </linearGradient>
      </defs>

      <ThickPlaceholder
        className="value-placeholder"
        cx={SIZE / 2}
        cy={SIZE / 2}
        r={R2 / 2}
        dashoffset={placeholderDashoffset}
        circumference={circumference}
        stroke={theme.p100}
      />

      <ThickCircle
        className="value"
        cx={SIZE / 2}
        cy={SIZE / 2}
        r={R2 / 2}
        dashoffset={time * 0.75 * (endOffset - startOffset) * circumference}
        circumference={0.75 * circumference}
        stroke="url(#gauge-colors)"
      />

      <ThinPlaceholder
        className="outer-placeholder"
        cx={SIZE / 2}
        cy={SIZE / 2}
        r={R1 / 2}
        dashoffset={outerPlaceholderDashoffset}
        circumference={outerCircumference}
        stroke={theme.p100}
      />

      <ThinCircle
        className="outer-value"
        cx={SIZE / 2}
        cy={SIZE / 2}
        r={R1 / 2}
        dashoffset={time * 0.75 * percent * outerCircumference}
        circumference={0.75 * outerCircumference}
        stroke={theme.a400}
      />

      <Line
        className="line"
        d={[
          `M ${SIZE / 2}, ${SIZE / 2 + 50}`,
          `L ${SIZE / 2 + 90 * Math.sin(alpha)}, ${SIZE / 2 +
            15 +
            90 * Math.cos(alpha)}`
        ].join(' ')}
      />

      <Dot
        cx={SIZE / 2 + 145 * Math.sin(alpha)}
        cy={SIZE / 2 + 145 * Math.cos(alpha)}
        r={12}
      />

      <Percent x={SIZE / 2} y={SIZE - 50} className="percent">
        {props.labelRenderer
          ? props.labelRenderer(Math.round(time * props.value))
          : Math.round(time * props.value)}
      </Percent>

      <SmallLabel x={SIZE / 2 - 100} y={SIZE - 50} className="min">
        {props.labelRenderer ? props.labelRenderer(props.min) : props.min}
      </SmallLabel>
      <SmallLabel x={SIZE / 2 + 100} y={SIZE - 50} className="max">
        {props.labelRenderer ? props.labelRenderer(props.max) : props.max}
      </SmallLabel>
      <SmallLabel
        className="outer-label"
        x={SIZE / 2 + 180 * Math.sin(alpha)}
        y={SIZE / 2 + 180 * Math.cos(alpha)}
        size={22}
      >
        {props.labelRenderer
          ? props.labelRenderer(Math.round(time * props.value))
          : Math.round(time * props.value)}
      </SmallLabel>
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
`;

const ThickCircle = styled.circle`
  fill: transparent;
  stroke-width: 30;

  transform: rotate(135deg);
  transform-origin: 50% 50%;
  stroke: ${({ stroke }) => stroke};
  stroke-linecap: round;
  stroke-dashoffset: ${({ dashoffset }) => dashoffset};
  stroke-dasharray: ${({ circumference }) => circumference};
`;

const ThinCircle = styled(ThickCircle)`
  stroke: ${({ stroke }) => stroke};
  stroke-width: 10;
`;

const ThinPlaceholder = styled(ThinCircle)`
  stroke-dashoffset: ${({ dashoffset }) => dashoffset};
`;

const ThickPlaceholder = styled(ThickCircle)`
  stroke-dashoffset: ${({ dashoffset }) => dashoffset};
`;

const Percent = styled.text`
  fill: ${({ theme }) => theme.p600};
  font-size: 40px;
  text-anchor: middle;
  font-weight: 700;
`;

const SmallLabel = styled.text`
  fill: ${({ theme }) => theme.p200};
  font-size: ${({ size }) => size || 24}px;
  text-anchor: middle;
  font-weight: 700;
`;

const Line = styled.path`
  stroke-width: 5;
  stroke-linecap: round;
  stroke: ${({ theme }) => theme.p300};
`;

const Dot = styled.circle`
  fill: ${({ theme }) => theme.a400};
`;
