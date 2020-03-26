import styled, { css } from 'styled-components';
import React from 'react';

const focusedStyle = css`
  background: rgba(121, 84, 182, 0.05);
`;

export const TopTornadoLabel = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  min-height: 80px;
  font-size: 18px;
  font-weight: 400;
  color: ${({ color }) => color};

  &:hover {
    ${focusedStyle}
  }

  ${({ isSelected }) => isSelected && focusedStyle};
`;

const BottomStats = styled.div`
  width: 100%;
  height: 100%;
  padding: 20px;

  &:hover {
    ${focusedStyle}
  }

  ${({ isSelected }) => isSelected && focusedStyle};
`;

const Revenue = styled.div`
  color: ${({ color }) => color};
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 8px;
`;
const Orders = styled.div`
  color: rgb(158, 160, 165);
  font-size: 14px;
  font-weight: 600;
`;
const Roas = styled.div`
  color: rgb(56, 56, 56);
  font-size: 14px;
  font-weight: 600;
`;

export const BottomTornadoStatsLabel = ({ stats, pathColor, isSelected }) => (
  <BottomStats isSelected={isSelected}>
    <Revenue color={pathColor}>{stats.revenue}</Revenue>
    <Orders>{`${stats.orders} Orders`}</Orders>
    <Roas>{`${stats.roas} % ROAS`}</Roas>
  </BottomStats>
);
