import styled, { css } from 'styled-components';

export const Option = styled.div`
  width: 100%;
  height: ${({ theme }) => theme.size.MEDIUM};
  display: flex;
  align-items: center;
  transition: all 300ms;
  cursor: pointer;
  box-sizing: border-box;
  padding: 0 10px;
  background: ${({ selected, theme }) =>
    selected ? theme.a200 : 'transparent'};
  margin: ${({ margin }) => margin || 0};

  &:hover {
    background: ${({ theme }) => theme.a100};
  }

  ${({ theme, small }) =>
    small &&
    css`
      height: ${theme.size.SMALL};
    `};

  ${({ theme, large }) =>
    large &&
    css`
      height: ${theme.size.LARGE};
    `};
`;

export const Label = styled.div`
  ${({ theme }) => theme.text.sm};
  color: ${({ color, theme }) => color || theme.p700};
  transition: all 300ms;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
  text-align: ${({ textAlign }) => textAlign || 'left'};
`;
