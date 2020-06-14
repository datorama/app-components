import React, { useMemo, useState, useEffect } from 'react';
import styled from 'styled-components';
import * as d3 from 'd3-shape';

const LineChart = ({ className, height = 25, lineWidth = 400 }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const tmpData = [];

    for (let i = 0; i < 20; i++) {
      tmpData.push([i * 30, Math.random() * height]);
    }

    setData(tmpData);
  }, [height]);

  const lineGenerator = useMemo(() => d3.line().curve(d3.curveCatmullRom), []);
  const lineData = lineGenerator(data);

  return (
    <Container className={className}>
      <Path d={lineData} lineWidth={lineWidth} />
    </Container>
  );
};

export default LineChart;

const Container = styled.svg`
  width: 100%;
  height: 40px;
  margin-top: 10px;
`;

const Path = styled.path`
  stroke: ${({ theme }) => theme.a400};
  fill: transparent;
  stroke-width: 2;

  stroke-dasharray: ${({ lineWidth }) => lineWidth};
  stroke-dashoffset: ${({ lineWidth }) => lineWidth};
  animation: dash 1s linear forwards;

  @keyframes dash {
    to {
      stroke-dashoffset: 0;
    }
  }
`;
