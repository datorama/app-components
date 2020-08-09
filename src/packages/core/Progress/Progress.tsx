import React from 'react';
import styled, { css } from 'styled-components';

import { hexToRgba } from 'common/utils';

export interface ProgressProps {
  label?: string;
  color?: string;
  percentage: number;
  isDisabled?: boolean;
  className?: string;
}

const Progress = ({ label, color, percentage, isDisabled, className }: ProgressProps) => {
  return (
    <Strip className={className} isDisabled={isDisabled}>
      {label && (
        <Label className="label" isDisabled={isDisabled}>
          {label}
        </Label>
      )}

      <Outer className="outer">
        <Inner
          percentage={percentage}
          color={color}
          className="inner"
        />
      </Outer>
    </Strip>
  );
};

export default Progress;

const Outer = styled.div`
  width: 100%;
  height: 4px;
  border-radius: 4px;
  background: ${({ theme }) => theme.p100};
  position: relative;
  overflow: hidden;
`;

const Inner = styled.div<{ percentage: number; color?: string; }>`
  position: absolute;
  top: 0;
  left: 0;
  height: 4px;
  width: 0;
  background: ${({ theme, color }) => color || theme.a400};
  max-width: ${({ percentage }) => `${percentage}%`};
  transition: all 100ms;
  animation: 1000ms ease-out 0s 1 stretchRight forwards;

  @keyframes stretchRight {
    100% {
      width: 100%;
    }
  }
`;

const Strip = styled.div<{ isDisabled?: boolean; }>`
  display: flex;
  align-items: center;

  ${({ isDisabled }) =>
  isDisabled &&
  css`
      pointer-events: none;
    `};
`;

const Label = styled.div<{ isDisabled?: boolean; }>`
  ${({ theme }) => theme.text.sm};
  margin-right: 15px;
  width: 40px;
  text-align: right;
  color: ${({ theme }) => theme.p300};

  ${({ isDisabled, theme }) =>
  isDisabled &&
  css`
      color: ${hexToRgba(theme.p300, 35)};
    `};
`;
