import React, {ReactNode} from 'react';
import styled from 'styled-components';
import { hexToRgba } from '../../common/utils';

export interface TagProps {
  children?: ReactNode;
  className?: string;
  isSelected?: boolean;
  isDisabled?: boolean;
  onClick: () => any;
  color?: string;
}

const Tag = (props: TagProps) => (
  <Container
    className={props.className}
    onClick={props.onClick}
    color={props.color}
    isDisabled={props.isDisabled}
    isSelected={props.isDisabled ? false : props.isSelected}
  >
    {props.children}
  </Container>
);

export default Tag;

const Container = styled.div<{ color?: string, isDisabled?: boolean, isSelected?: boolean}>`
  background: ${({ theme }) => hexToRgba(theme.p300, 15)};
  ${({ theme }) => theme.text.pLink};
  color: ${({ theme }) => theme.p300};
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
    color: ${({ theme }) => theme.p0};
    background: ${({ theme, color }) => color || theme.a400};
  }
  
  ${({ isSelected, theme, color }) =>
  isSelected && `
    color: ${theme.p0};
    background: ${color || theme.a400};
  `};
  
  ${({ isDisabled, theme }) =>
  isDisabled && `
    pointer-events: none;
    color: ${hexToRgba(theme.lightTheme.p300, 50)};
  `};
`;
