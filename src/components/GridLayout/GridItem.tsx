import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { isObject } from 'lodash/fp';

type SizeObject = {
  sm?: string;
  md?: string;
  lg?: string;
};

type GridItemProps = {
  row?: string | SizeObject;
  column?: string | SizeObject;
  gridArea?: string | SizeObject;
  justifySelf?: 'start' | 'end' | 'center' | 'stretch';
  alignSelf?: 'start' | 'end' | 'center' | 'stretch';
  sm?: number;
  md?: number;
};

export interface Props extends GridItemProps {
  children: ReactNode | ReactNode[];
  className?: string;
}

export const GridItem = (props: Props) => {
  const {
    children,
    className,
    row,
    column,
    gridArea,
    justifySelf,
    alignSelf,
    sm,
    md,
  } = props;

  return (
    <Container
      className={className}
      row={row}
      column={column}
      gridArea={gridArea}
      justifySelf={justifySelf}
      alignSelf={alignSelf}
      sm={sm}
      md={md}
    >
      {children}
    </Container>
  );
};

GridItem.defaultProps = {
  justifySelf: 'stretch',
  alignSelf: 'stretch',
};

const Container = styled.div<GridItemProps>`
  grid-row: ${({ row }) => (isObject(row) ? row.lg : row)};
  grid-column: ${({ column }) => (isObject(column) ? column.lg : column)};
  grid-area: ${({ gridArea }) => (isObject(gridArea) ? gridArea.lg : gridArea)};

  justify-self: ${({ justifySelf }) => justifySelf};
  align-self: ${({ alignSelf }) => alignSelf};

  @media only screen and (max-width: ${({ md }) => md}px) {
    grid-row: ${({ row }) => (isObject(row) ? row.md : row)};
    grid-column: ${({ column }) => (isObject(column) ? column.md : column)};
    grid-area: ${({ gridArea }) =>
      isObject(gridArea) ? gridArea.md : gridArea};
  }

  @media only screen and (max-width: ${({ sm }) => sm}px) {
    grid-row: ${({ row }) => (isObject(row) ? row.sm : row)};
    grid-column: ${({ column }) => (isObject(column) ? column.sm : column)};
    grid-area: ${({ gridArea }) =>
      isObject(gridArea) ? gridArea.sm : gridArea};
  }
`;
