import React from 'react';
import styled, { css } from 'styled-components';
import * as PropTypes from 'prop-types';

export const StepperBullet = ({
  touched,
  selected,
  enabled,
  hovered,
  className,
}) => (
  <Outer
    touched={touched}
    selected={selected}
    enabled={enabled}
    className={className}
  >
    <Inner
      touched={touched}
      selected={selected}
      enabled={enabled}
      hovered={hovered}
    />
  </Outer>
);

StepperBullet.propTypes = {
  className: PropTypes.string,
  touched: PropTypes.bool,
  selected: PropTypes.bool,
  enabled: PropTypes.bool,
  hovered: PropTypes.bool,
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

  ${({ theme, hovered }) =>
    hovered &&
    css`
      background: ${theme.a400};
    `};
`;
