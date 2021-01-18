import React, { ReactNode } from 'react';
import styled from 'styled-components';

type GridItemProps = {
  row?: string;
  column?: string;
  gridArea?: string;
  justifySelf?: 'start' | 'end' | 'center' | 'stretch';
  alignSelf?: 'start' | 'end' | 'center' | 'stretch';
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
  } = props;

  return (
    <Container
      className={className}
      row={row}
      column={column}
      gridArea={gridArea}
      justifySelf={justifySelf}
      alignSelf={alignSelf}
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
  justify-self: ${({ justifySelf }) => justifySelf};
  align-self: ${({ alignSelf }) => alignSelf};
  grid-row: ${({ row }) => row};
  grid-column: ${({ column }) => column};
  grid-area: ${({ gridArea }) => gridArea};
`;
