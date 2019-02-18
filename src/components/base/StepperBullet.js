import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

const StepperBullet = ({ touched, selected, enabled }) => (
  <Outer touched={touched} selected={selected} enabled={enabled}>
    <Inner touched={touched} selected={selected} enabled={enabled} />
  </Outer>
);

export default StepperBullet;

StepperBullet.propTypes = {
  className: PropTypes.string,
  touched: PropTypes.bool,
  selected: PropTypes.bool,
  enabled: PropTypes.bool
};

const Outer = styled.div`
  position: relative;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  transition: all 300ms;
  background: transparent;

  ${({ selected, theme }) =>
    selected &&
    css`
      background: ${theme.a400};
    `};
`;

const Inner = styled.div`
  position: absolute;
  border-radius: 50%;
  width: 10px;
  height: 10px;
  top: 4px;
  left: 4px;

  ${({ touched, selected, theme }) =>
    touched &&
    !selected &&
    css`
      background: ${theme.a400};
    `};

  ${({ selected, theme }) =>
    selected &&
    css`
      background: ${theme.p0};
      width: 6px;
      height: 6px;
      top: 6px;
      left: 6px;
    `};

  ${({ theme, selected, touched, enabled }) =>
    !selected &&
    enabled &&
    !touched &&
    css`
      background: ${theme.p200};
    `};

  ${({ enabled, theme }) =>
    !enabled &&
    css`
      background: ${theme.p200};
    `};
`;
