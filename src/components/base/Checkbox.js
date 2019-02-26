import styled, { css } from 'styled-components';
import React from 'react';
import { hexToRgba } from '../utils';
import PropTypes from 'prop-types';

// icons
import CheckIcon from '../icons/Check.icon';
import LineIcon from '../icons/Line.icon';

const Checkbox = ({
  checked,
  onClick,
  disabled,
  round,
  label,
  partial,
  className
}) => (
  <Strip onClick={onClick} disabled={disabled}>
    <CheckboxContainer
      selected={checked}
      round={round}
      disabled={disabled}
      partial={partial}
      className={className}
    >
      {partial && (
        <StyledLineIcon selected={checked} round={round} disabled={disabled} />
      )}
      {!partial && (
        <StyledCheckIcon selected={checked} round={round} disabled={disabled} />
      )}
    </CheckboxContainer>
    {label && <Label disabled={disabled}>{label}</Label>}
  </Strip>
);

Checkbox.propTypes = {
  checked: PropTypes.bool,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  round: PropTypes.bool,
  label: PropTypes.string,
  partial: PropTypes.bool,
  className: PropTypes.string
};

export default Checkbox;

const CheckboxContainer = styled.div`
  box-sizing: border-box;
  cursor: pointer;
  width: 16px;
  height: 16px;
  min-width: 16px;
  min-height: 16px;
  border: 1px solid ${({ theme }) => theme.p200};
  border-radius: 2px;
  position: relative;
  transition: all 200ms;
  overflow: hidden;
  background: transparent;

  ${({ round }) =>
    round &&
    css`
      border-radius: 50%;
    `};

  ${({ selected }) =>
    selected &&
    css`
      border-color: ${({ theme, partial }) =>
        partial ? theme.p200 : theme.a400};
      background: ${({ theme, partial }) =>
        partial ? theme.p200 : theme.a400};
    `};

  &:hover {
    border-color: ${({ theme }) => theme.a600};
    background: ${({ theme, selected }) =>
      selected ? theme.a600 : 'transparent'};
  }

  &:active {
    border-color: ${({ theme }) => theme.a700};
    background: ${({ theme, selected }) =>
      selected ? theme.a700 : 'transparent'};
  }

  ${({ disabled }) =>
    disabled &&
    css`
      background: ${({ theme }) => hexToRgba(theme.p200, 35)};
      border-color: ${({ theme }) => hexToRgba(theme.p200, 35)};
    `};
`;

export const iconStyles = css`
  width: 10px;
  height: 10px;
  position: absolute;
  left: 2px;
  transition: all 400ms;
  transform: translateY(-5px);
  opacity: 0;

  ${({ selected }) =>
    selected &&
    css`
      transform: translateY(0);
      opacity: 1;
    `};

  ${({ round }) =>
    round &&
    css`
      width: 8px;
      height: 8px;
      left: 3px;
      top: 3px;
    `};

  ${({ disabled, theme }) =>
    disabled &&
    css`
      path {
        fill: ${hexToRgba(theme.p300, 35)}};
      }
    `};
`;

const StyledLineIcon = styled(LineIcon)`
  top: 2px;
  ${iconStyles};
`;

const StyledCheckIcon = styled(CheckIcon)`
  top: 2px;
  ${iconStyles};
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

  ${({ disabled }) =>
    disabled &&
    css`
      color: ${({ theme }) => hexToRgba(theme.p300, 35)};
    `};
`;
