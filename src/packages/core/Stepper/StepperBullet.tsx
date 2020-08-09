import React from "react";
import styled, { css } from "styled-components";

interface StepperBullet {
  isTouched?: boolean;
  isSelected: boolean;
  isEnabled: boolean;
  isHovered: boolean;
  className?: string;
}

const StepperBullet = ({
  isTouched,
  isSelected,
  isEnabled,
  isHovered,
  className,
}: StepperBullet) => (
  <Outer isSelected={isSelected} className={className}>
    <Inner
      isTouched={isTouched}
      isSelected={isSelected}
      isEnabled={isEnabled}
      isHovered={isHovered}
    />
  </Outer>
);

const Outer = styled.div<{ isSelected: boolean }>`
  position: relative;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  transition: all 300ms;
  background: transparent;

  ${({ isSelected, theme }) =>
    isSelected &&
    css`
      background: ${theme.a400};
    `};
`;

const Inner = styled.div<{
  isTouched?: boolean;
  isSelected: boolean;
  isEnabled: boolean;
  isHovered: boolean;
}>`
  position: absolute;
  border-radius: 50%;
  width: 10px;
  height: 10px;
  top: 4px;
  left: 4px;

  ${({ isTouched, isSelected, theme }) =>
    isTouched &&
    !isSelected &&
    css`
      background: ${theme.a400};
    `};

  ${({ isSelected, theme }) =>
    isSelected &&
    css`
      background: ${theme.p0};
      width: 6px;
      height: 6px;
      top: 6px;
      left: 6px;
    `};

  ${({ theme, isSelected, isTouched, isEnabled }) =>
    !isSelected &&
    isEnabled &&
    !isTouched &&
    css`
      background: ${theme.p200};
    `};

  ${({ isEnabled, theme }) =>
    !isEnabled &&
    css`
      background: ${theme.p200};
    `};

  ${({ theme, isHovered }) =>
    isHovered &&
    css`
      background: ${theme.a400};
    `};
`;

export default StepperBullet;
