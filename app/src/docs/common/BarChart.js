import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const BarChart = () => {
  const [bars, setBars] = useState([]);

  useEffect(() => {
    const tmpBars = [];

    for (let i = 0; i < 50; i++) {
      tmpBars.push(
        <Bar
          key={i}
          width={20}
          height={200}
          x={i * 24}
          y={60 + Math.random() * 120}
          rx={4}
          ry={4}
        />
      );
    }

    setBars(tmpBars);
  }, []);

  return (
    <Container>
      <Line x1="0" x2="100%" y1="20px" y2="20px" />
      <Line x1="0" x2="100%" y1="70px" y2="70px" />
      <Line x1="0" x2="100%" y1="120px" y2="120px" />
      {bars}
    </Container>
  );
};

export default BarChart;

const Container = styled.svg`
  width: 100%;
  background: ${({ theme }) => theme.p50};
  height: 240px;
  margin-top: 10px;
  border-radius: 10px;
`;

const Bar = styled.rect`
  fill: ${({ theme }) => theme.a300};
  cursor: pointer;
  &:hover {
    fill: ${({ theme }) => theme.a400};
  }
`;

const Line = styled.line`
  stroke: ${({ theme }) => theme.p100};
  stroke-width: 2;
`;
