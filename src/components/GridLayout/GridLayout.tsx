import React, { ReactNode } from 'react';
import styled from 'styled-components';

type GridProps = {
  gridTemplateRows?: string;
  gridTemplateColumns?: string;
  gridTemplateAreas?: string;
  justifyItems?: 'start' | 'end' | 'center' | 'stretch';
  alignItems?: 'start' | 'end' | 'center' | 'stretch';
  justifyContent?:
    | 'start'
    | 'end'
    | 'center'
    | 'stretch'
    | 'space-around'
    | 'space-between'
    | 'space-evenly';
  alignContent?:
    | 'start'
    | 'end'
    | 'center'
    | 'stretch'
    | 'space-around'
    | 'space-between'
    | 'space-evenly';
  gridAutoFlow?: 'row' | 'column' | 'dense';
};

export interface Props extends GridProps {
  children: ReactNode | ReactNode[];
  className?: string;
}

export const GridLayout = (props: Props) => {
  const {
    children,
    className,
    gridTemplateRows,
    gridTemplateColumns,
    gridTemplateAreas,
    justifyContent,
    justifyItems,
    alignContent,
    alignItems,
    gridAutoFlow,
  } = props;

  return (
    <Container
      className={className}
      gridTemplateRows={gridTemplateRows}
      gridTemplateColumns={gridTemplateColumns}
      gridTemplateAreas={gridTemplateAreas}
      justifyContent={justifyContent}
      justifyItems={justifyItems}
      alignContent={alignContent}
      alignItems={alignItems}
      gridAutoFlow={gridAutoFlow}
    >
      {children}
    </Container>
  );
};

GridLayout.defaultProps = {
  justifyItems: 'stretch',
  alignItems: 'stretch',
  justifyContent: 'stretch',
  alignContent: 'stretch',
};

const Container = styled.div<GridProps>`
  display: grid;
  grid-gap: 24px;
  box-sizing: content-box;
  margin: 0 32px;

  grid-template-columns: ${({ gridTemplateColumns }) =>
    gridTemplateColumns || 'repeat(12, 1fr)'};
  grid-template-rows: ${({ gridTemplateRows }) => gridTemplateRows};
  grid-template-areas: ${({ gridTemplateAreas }) => gridTemplateAreas};

  justify-items: ${({ justifyItems }) => justifyItems};
  align-items: ${({ alignItems }) => alignItems};

  justify-content: ${({ justifyContent }) => justifyContent};
  align-content: ${({ alignContent }) => alignContent};
  grid-auto-flow: ${({ gridAutoFlow }) => gridAutoFlow};

  @media only screen and (max-width: 1408px) {
    grid-gap: 16px;
  }
`;
