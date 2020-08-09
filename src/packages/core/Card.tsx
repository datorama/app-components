import React, {ReactNode} from 'react';
import styled from 'styled-components';

export interface CardProps {
  className?: string;
  onClick?: () => any;
  children: ReactNode;
}

const Card = (props: CardProps) => (
  <Container
    className={props.className}
    clickable={!!props.onClick}
    onClick={props.onClick}
  >
    {props.children}
  </Container>
);

export default Card;

const Container = styled.div<{clickable?: boolean}>`
  background: ${({theme}) => theme.p0};
  width: 100%;
  border-radius: 2px;
  box-shadow: 0 4px 23px 0 rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  padding: 30px 40px;
  transition: all 300ms;
  border: 1px solid transparent;

  ${({clickable, theme}) =>
  clickable && `
    cursor: pointer;

    &:hover {
      box-shadow: 0 2px 14px 0 ${theme.a200};
      border-color: ${theme.a400};
    }
  `}
`;
