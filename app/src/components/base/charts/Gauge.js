import React, { useState, useEffect } from 'react';
import styled, { css, keyframes } from 'styled-components';

const SIZE = 400;
const Gauge = () => {
  const percent = 0.5;

  const R1 = SIZE - 20;
  const outerCircumference = (2 * Math.PI * R1) / 2;
  const outerDashoffset =
    outerCircumference - ((percent * 75) / 100) * outerCircumference;

  const R2 = SIZE - 80;
  const circumference = (2 * Math.PI * R2) / 2;
  const dashoffset = circumference - ((percent * 75) / 100) * circumference;

  const outerPlaceholderDashoffset =
    outerCircumference - (75 / 100) * outerCircumference;
  const placeholderDashoffset = circumference - (75 / 100) * circumference;

  const [alpha, setAlpha] = useState(Math.PI);

  useEffect(() => {
    const interval = setInterval(() => {
      setAlpha(alpha => alpha + Math.PI / 30);
    }, 200);
  }, []);

  return (
    <Container>
      <defs>
        <linearGradient id="solids" x1="100%" y1="0%" x2="0%" y2="0%">
          <stop
            offset="0%"
            style={{ stopColor: 'rgb(255,255,255)', stopOpacity: 0.5 }}
          />
          <stop
            offset="100%"
            style={{ stopColor: 'rgb(255,255,255)', stopOpacity: 1 }}
          />
        </linearGradient>
      </defs>

      <ThickPlaceholder
        cx={SIZE / 2}
        cy={SIZE / 2}
        r={R2 / 2}
        dashoffset={placeholderDashoffset}
        circumference={circumference}
        stroke="rgba(255,255,255,0.2)"
      />

      <ThickCircle
        cx={SIZE / 2}
        cy={SIZE / 2}
        r={R2 / 2}
        dashoffset={dashoffset}
        circumference={circumference}
        stroke="url(#solids)"
      />

      <ThinPlaceholder
        cx={SIZE / 2}
        cy={SIZE / 2}
        r={R1 / 2}
        dashoffset={outerPlaceholderDashoffset}
        circumference={outerCircumference}
        stroke="#fff"
      />

      <ThinCircle
        cx={SIZE / 2}
        cy={SIZE / 2}
        r={R1 / 2}
        dashoffset={outerDashoffset}
        circumference={outerCircumference}
        stroke="red"
      />

      <Line
        d={[
          `M ${SIZE / 2}, ${SIZE / 2}`,
          `l ${200 * Math.sin(alpha)}, ${200 * Math.cos(alpha)}`
        ].join(' ')}
      />

      <Percent x={SIZE / 2} y={SIZE - 50}>
        40%
      </Percent>
    </Container>
  );
};

export default Gauge;

const Container = styled.svg`
  width: ${SIZE}px;
  height: ${SIZE}px;
  background: #ffce42;
`;

const animate = dashoffset => keyframes`
  to {
    stroke-dashoffset: ${dashoffset};
  }
`;

const ThickCircle = styled.circle`
  fill: transparent;
  stroke-width: 40;

  transform: rotate(135deg);
  transform-origin: 50% 50%;
  stroke: ${({ stroke }) => stroke};
  stroke-linecap: round;
  stroke-dashoffset: ${({ circumference }) => circumference};
  stroke-dasharray: ${({ circumference }) => circumference};

  ${({ dashoffset }) => css`
    animation: ${animate(dashoffset)} 2s linear forwards;
  `};
`;

const ThinCircle = styled(ThickCircle)`
  stroke: ${({ stroke }) => stroke};
  stroke-width: 10;
`;

const ThinPlaceholder = styled(ThinCircle)`
  animation: none !important;
  stroke-dashoffset: ${({ dashoffset }) => dashoffset};
`;

const ThickPlaceholder = styled(ThickCircle)`
  animation: none !important;
  stroke-dashoffset: ${({ dashoffset }) => dashoffset};
`;

const Percent = styled.text`
  fill: #fff;
  font-size: 50px;
  text-anchor: middle;
  font-weight: 700;
`;

const Line = styled.path`
  stroke-width: 5;
  stroke-linecap: round;
  stroke: #444;
  transition: all 2000ms;
`;
