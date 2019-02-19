import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { hexToRgba } from '../utils';

const Toggle = ({ onClick, checked, disabled, label, className }) => (
  <Strip onClick={onClick} disabled={disabled}>
    <Container className={className} checked={checked} disabled={disabled}>
      <Inner checked={checked} disabled={disabled} />
    </Container>
    {label && <Label disabled={disabled}>{label}</Label>}
  </Strip>
);

Toggle.propTypes = {
  checked: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  label: PropTypes.string,
  className: PropTypes.string
};

export default Toggle;

const Container = styled.div`
  width: 26px;
  height: 12px;
  position: relative;
  border-radius: 6px;
  background: ${({ theme, checked }) => (checked ? theme.a400 : theme.p200)};
  transition: all 300ms;

  ${({ disabled, theme }) =>
    disabled &&
    css`
      background: ${hexToRgba(theme.p200, 60)};
    `};
`;

const Inner = styled.div`
  position: absolute;
  width: 8px;
  height: 8px;
  background: ${({ theme, disabled }) =>
    disabled ? hexToRgba(theme.p300, 60) : '#fff'};
  top: 2px;
  border-radius: 50%;
  transition: all 300ms;
  left: ${({ checked }) => (checked ? 16 : 2)}px;
`;

const Strip = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;

  ${({ disabled }) =>
    disabled &&
    css`
      pointer-events: none;
    `};
`;

const Label = styled.div`
  ${({ theme }) => theme.text.sm};
  margin-left: 10px;

  ${({ disabled, theme }) =>
    disabled &&
    css`
      color: ${hexToRgba(theme.p300, 35)};
    `};
`;
