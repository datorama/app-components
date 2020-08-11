import React from "react";
import styled, { css } from "styled-components";

import { hexToRgba } from "common/utils";

export interface ToggleProps {
  isChecked: boolean;
  isDisabled?: boolean;
  onClick: () => void;
  label?: string;
  className?: string;
}

const Toggle = ({
  onClick,
  isChecked,
  isDisabled,
  label,
  className,
}: ToggleProps) => (
  <Strip onClick={onClick} isDisabled={isDisabled}>
    <Container
      className={className}
      isChecked={isChecked}
      isDisabled={isDisabled}
    >
      <Inner isChecked={isChecked} isDisabled={isDisabled} />
    </Container>
    {label && <Label isDisabled={isDisabled}>{label}</Label>}
  </Strip>
);

const Container = styled.div<Pick<ToggleProps, "isDisabled" | "isChecked">>`
  width: 26px;
  height: 12px;
  position: relative;
  border-radius: 6px;
  background: ${({ theme, isChecked }) =>
    isChecked ? theme.a400 : theme.p200};
  transition: all 300ms;

  &:hover {
    background: ${({ theme }) => theme.a500};
  }

  ${({ isChecked, theme }) =>
    !isChecked &&
    css`
      &:hover {
        background: ${theme.p300};
      }
    `};

  ${({ isDisabled, theme }) =>
    isDisabled &&
    css`
      background: ${hexToRgba(theme.p200, 60)};
    `};
`;

const Inner = styled.div<Pick<ToggleProps, "isDisabled" | "isChecked">>`
  position: absolute;
  width: 8px;
  height: 8px;
  background: ${({ theme, isDisabled }) =>
    isDisabled ? hexToRgba(theme.p300, 60) : "#fff"};
  top: 2px;
  border-radius: 50%;
  transition: all 300ms;
  left: ${({ isChecked }) => (isChecked ? 16 : 2)}px;
`;

const Strip = styled.div<Pick<ToggleProps, "isDisabled">>`
  display: flex;
  align-items: center;
  cursor: pointer;

  ${({ isDisabled }) =>
    isDisabled &&
    css`
      pointer-events: none;
    `};
`;

const Label = styled.div<Pick<ToggleProps, "isDisabled">>`
  ${({ theme }) => theme.text.sm};
  margin-left: 10px;

  ${({ isDisabled, theme }) =>
    isDisabled &&
    css`
      color: ${hexToRgba(theme.p300, 35)};
    `};
`;

export default Toggle;
