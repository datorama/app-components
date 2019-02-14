import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { hexToRgba } from '../utils';

const Tag = props => (
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
  selected: PropTypes.bool
};

export default Tag;

const Container = styled.div`
  background: ${({ theme }) => hexToRgba(theme.p300, 15)};
  ${({ theme }) => theme.text.pLink};
  color: ${({ theme }) => theme.p300};
  height: 25px;
  padding: 0 14px;
  border-radius: 13px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 300ms;
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.p0};
    background: ${({ theme, color }) => color || theme.a400};
  }

  ${({ selected }) =>
    selected &&
    css`
      color: ${({ theme }) => theme.p0};
      background: ${({ theme, color }) => color || theme.a400};
    `};

  ${({ disabled, theme }) =>
    disabled &&
    css`
      pointer-events: none;
      color: ${hexToRgba(theme.p300, 50)};
    `};
`;
