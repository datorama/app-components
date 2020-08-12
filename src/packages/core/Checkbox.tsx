import styled, { css } from "styled-components";
import React from "react";

import { hexToRgba } from "common/utils";

import Check from "packages/core/Icons/Check";
import Line from "packages/core/Icons/Line";

export interface CheckboxProps {
  isChecked?: boolean;
  onClick?: () => void;
  isDisabled?: boolean;
  isRound?: boolean;
  label?: string;
  isPartial?: boolean;
  className?: string;
}

const Checkbox = ({
  isChecked,
  onClick,
  isDisabled,
  isRound,
  label,
  isPartial,
  className,
}: CheckboxProps) => (
  <Strip onClick={onClick} isDisabled={isDisabled}>
    <CheckboxContainer
      isSelected={isChecked}
      isRound={isRound}
      isDisabled={isDisabled}
      isPartial={isPartial}
      className={`${className} checkbox ${
        isChecked ? "isChecked" : "unisChecked"
      }`}
    >
      {isPartial ? (
        <StyledLineIcon
          isSelected={isChecked}
          isRound={isRound}
          isDisabled={isDisabled}
        />
      ) : (
        <StyledCheckIcon
          isSelected={isChecked}
          isRound={isRound}
          isDisabled={isDisabled}
        />
      )}
    </CheckboxContainer>

    {label && <Label isDisabled={isDisabled}>{label}</Label>}
  </Strip>
);

const CheckboxContainer = styled.div<{
  isSelected?: boolean;
  isRound?: boolean;
  isDisabled?: boolean;
  isPartial?: boolean;
}>`
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

  ${({ isRound }) =>
    isRound &&
    css`
      border-radius: 50%;
    `};

  ${({ theme, isSelected, isPartial }) =>
    isSelected &&
    `
      border-color: ${isPartial ? theme.p200 : theme.a400};
      background: ${isPartial ? theme.p200 : theme.a400};
    `};

  &:hover {
    border-color: ${({ theme }) => theme.a600};
    background: ${({ theme, isSelected }) =>
      isSelected ? theme.a600 : "transparent"};
  }

  &:active {
    border-color: ${({ theme }) => theme.a700};
    background: ${({ theme, isSelected }) =>
      isSelected ? theme.a700 : "transparent"};
  }

  ${({ isDisabled, theme }) =>
    isDisabled &&
    `
      background: ${hexToRgba(theme.p200, 35)};
      border-color: ${hexToRgba(theme.p200, 35)};
    `};
`;

export const iconStyles = css<{
  isSelected?: boolean;
  isRound?: boolean;
  isDisabled?: boolean;
}>`
  width: 10px;
  height: 10px;
  position: absolute;
  left: 2px;
  transition: all 400ms;
  transform: translateY(-5px);
  opacity: 0;
  pointer-events: none;

  ${({ isSelected }) =>
    isSelected &&
    css`
      transform: translateY(0);
      opacity: 1;
    `};

  ${({ isRound }) =>
    isRound &&
    `
      width: 8px;
      height: 8px;
      left: 3px;
      top: 3px;
    `};

  ${({ isDisabled, theme }) =>
    isDisabled &&
    css`
      path {
        fill: ${hexToRgba(theme.p300, 35)}};
      }
    `};
`;

const StyledLineIcon = styled(Line)`
  top: 2px;
  ${iconStyles};
`;

const StyledCheckIcon = styled(Check)`
  top: 2px;
  ${iconStyles};
`;

const Strip = styled.div<{ isDisabled?: boolean }>`
  display: flex;
  align-items: center;
  cursor: pointer;

  ${({ isDisabled }) =>
    isDisabled &&
    css`
      pointer-events: none;
    `};
`;

const Label = styled.div<{ isDisabled?: boolean }>`
  ${({ theme }) => theme.text.sm};
  margin-left: 10px;

  ${({ isDisabled }) =>
    isDisabled &&
    css`
      color: ${({ theme }) => hexToRgba(theme.p300, 35)};
    `};
`;

export default Checkbox;
