import React, { ReactNode } from "react";
import styled from "styled-components";

import { hexToRgba } from "common/utils";

interface Button {
  onClick: () => void;
  children: ReactNode;
  isSmall?: boolean;
  isSecondary?: boolean;
  isRound?: boolean;
  isDisabled?: boolean;
  className?: string;
}

const Button = (props: Button) => (
  <Container
    onClick={props.onClick}
    isSmall={props.isSmall}
    isSecondary={props.isSecondary}
    isRound={props.isRound}
    isDisabled={props.isDisabled}
    className={props.className}
  >
    {props.children}
  </Container>
);

Button.defaultProps = {
  isSmall: false,
  isSecondary: false,
  isRound: false,
  isDisabled: false,
};

export default Button;

type containerTypes = {
  isSmall?: boolean;
  isSecondary?: boolean;
  isRound?: boolean;
  isDisabled?: boolean;
};

const Container = styled.div<containerTypes>`
  padding: 0 16px;
  height: ${({ theme }) => theme.size.LARGE};
  background: ${({ theme }) => theme.a400};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 3px;
  ${({ theme }) => theme.text.pLink};
  color: #fff;
  transition: all 300ms;
  line-height: ${({ theme }) => theme.size.LARGE};

  ${({ isSmall, theme }) =>
    isSmall &&
    `
      height: ${theme.size.SMALL};
      ${theme.text.smLink};
      line-height: ${theme.size.SMALL};
      color: #fff;
      padding: 0 14px;
    `};

  ${({ isSecondary, theme }) =>
    isSecondary &&
    `
      background: ${hexToRgba(theme.p300, 15)};
      color: ${theme.p400};
    `};

  ${({ isRound, isSmall }) =>
    isRound &&
    `
      padding: 0;
      border-radius: 50%;
      width: ${isSmall ? "24px" : "34px"};
    `};

  &:hover {
    background: ${({ theme }) => theme.a500};

    ${({ theme, isSecondary }) =>
      isSecondary &&
      `
        background: ${hexToRgba(theme.p300, 25)};
      `};
  }

  &:active {
    background: ${({ theme }) => theme.a600};

    ${({ theme, isSecondary }) =>
      isSecondary &&
      `
        background: ${hexToRgba(theme.p300, 35)};
      `};
  }

  ${({ isDisabled, theme }) =>
    isDisabled &&
    `
      pointer-events: none;
      background: ${hexToRgba(theme.p300, 10)};
      color: ${hexToRgba(theme.p300, 50)};
    `};
`;
