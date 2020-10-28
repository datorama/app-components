import React from 'react';
import styled, { css } from 'styled-components';
import * as PropTypes from 'prop-types';
import { hexToRgba } from '../utils/theme.utils';

export const Tag = (props) => (
  <Container
    className={props.className}
    onClick={props.onClick}
    color={props.color}
    disabled={props.disabled}
    selected={props.selected}
  >
    {props.label}
  </Container>
);

Tag.propTypes = {
  label: PropTypes.string,
  color: PropTypes.string,
  onClick: PropTypes.func,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  selected: PropTypes.bool,
};

const Container = styled.div`
  background: ${({ theme }) => hexToRgba(theme.p300, 15)};
  ${({ theme }) => theme.text.pLink};
  color: ${({ theme }) => theme.lightTheme.p300};
  height: 24px;
  padding: 0 16px;
  border-radius: 12px;
  line-height: 14px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: all 300ms;
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.lightTheme.p0};
    background: ${({ theme, color }) => color || theme.a400};
  }

  ${({ selected }) =>
    selected &&
    css`
      color: ${({ theme }) => theme.lightTheme.p0};
      background: ${({ theme, color }) => color || theme.a400};
    `};

  ${({ disabled, theme }) =>
    disabled &&
    css`
      pointer-events: none;
      color: ${hexToRgba(theme.lightTheme.p300, 50)};
    `};
`;
