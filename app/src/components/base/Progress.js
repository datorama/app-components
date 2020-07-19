import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { hexToRgba } from '../utils';

const Progress = ({ label, color, percentage, disabled, className }) => {
  return (
    <Strip className={className} disabled={disabled}>
      {label && (
        <Label className="label" disabled={disabled}>
          {label}
        </Label>
      )}
      <Outer className="outer">
        <Inner
          percentage={percentage}
          color={color}
          disabled={disabled}
          className="inner"
        />
      </Outer>
    </Strip>
  );
};

Progress.propTypes = {
  label: PropTypes.string,
  color: PropTypes.string,
  percentage: PropTypes.number.isRequired,
  disabled: PropTypes.bool,
  className: PropTypes.string
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

const Inner = styled.div`
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

const Strip = styled.div`
  display: flex;
  align-items: center;

  ${({ disabled }) =>
    disabled &&
    css`
      pointer-events: none;
    `};
`;

const Label = styled.div`
  ${({ theme }) => theme.text.sm};
  margin-right: 15px;
  width: 40px;
  text-align: right;
  color: ${({ theme }) => theme.p300};

  ${({ disabled, theme }) =>
    disabled &&
    css`
      color: ${hexToRgba(theme.p300, 35)};
    `};
`;
