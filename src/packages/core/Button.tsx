import React, {ReactNode} from 'react';
import styled from 'styled-components';
import {hexToRgba} from '../../common/utils';

type propTypes = {
  onClick: () => any,
  children: ReactNode,
  small: boolean,
  secondary: boolean,
  round: boolean,
  disabled: boolean,
  className?: string
};

const Button = (props: propTypes) => (
  <Container
    onClick={props.onClick}
    small={props.small}
    secondary={props.secondary}
    round={props.round}
    disabled={props.disabled}
    className={props.className}
  >
    {props.children}
  </Container>
);

Button.defaultProps = {
  small: false,
  secondary: false,
  round: false,
  disabled: false
};

export default Button;

type containerTypes = {
  small: boolean,
  secondary: boolean,
  round: boolean,
  disabled: boolean
};

const Container = styled.div<containerTypes>`
  padding: 0 16px;
  height: ${({theme}) => theme.size.LARGE};
  background: ${({theme}) => theme.a400};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 3px;
  ${({theme}) => theme.text.pLink};
  color: #fff;
  transition: all 300ms;
  line-height: ${({theme}) => theme.size.LARGE};

  ${({small, theme}) =>
  small && `
      height: ${theme.size.SMALL};
      ${theme.text.smLink};
      line-height: ${theme.size.SMALL};
      color: #fff;
      padding: 0 14px;
    `};

  ${({secondary, theme}) =>
  secondary && `
      background: ${hexToRgba(theme.p300, 15)};
      color: ${theme.p400};
    `};

  ${({round, small}) =>
  round && `
      padding: 0;
      border-radius: 50%;
      width: ${small ? '24px' : '34px'};
    `};

  &:hover {
    background: ${({theme}) => theme.a500};

    ${({theme, secondary}) =>
  secondary && `
        background: ${hexToRgba(theme.p300, 25)};
      `};
  }

  &:active {
    background: ${({theme}) => theme.a600};

    ${({theme, secondary}) =>
  secondary && `
        background: ${hexToRgba(theme.p300, 35)};
      `};
  }

  ${({disabled, theme}) =>
  disabled && `
      pointer-events: none;
      background: ${hexToRgba(theme.p300, 10)};
      color: ${hexToRgba(theme.p300, 50)};
    `};
`;
