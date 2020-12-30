import React, { ReactNode, useMemo } from 'react';
import styled from 'styled-components';

type GridProps = {
  gridGap?: number;
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
  sm?: number;
  md?: number;
}

export const GridLayout = (props: Props) => {
  const {
    children,
    className,
    gridGap,
    gridTemplateRows,
    gridTemplateColumns,
    gridTemplateAreas,
    justifyContent,
    justifyItems,
    alignContent,
    alignItems,
    gridAutoFlow,
    sm,
    md,
  } = props;

  const childrenWithProps = useMemo(
    () =>
      React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, { sm, md });
        }

        return child;
      }),
    [children, sm, md]
  );

  return (
    <Container
      className={className}
      gridGap={gridGap}
      gridTemplateRows={gridTemplateRows}
      gridTemplateColumns={gridTemplateColumns}
      gridTemplateAreas={gridTemplateAreas}
      justifyContent={justifyContent}
      justifyItems={justifyItems}
      alignContent={alignContent}
      alignItems={alignItems}
      gridAutoFlow={gridAutoFlow}
    >
      {childrenWithProps}
    </Container>
  );
};

GridLayout.defaultProps = {
  gridGap: 8,
  justifyItems: 'stretch',
  alignItems: 'stretch',
  justifyContent: 'stretch',
  alignContent: 'stretch',
  sm: 1000,
  md: 1400,
};

const Container = styled.div<GridProps>`
  display: grid;
  grid-gap: ${({ gridGap }) => `${gridGap}px`};

  grid-template-columns: ${({ gridTemplateColumns }) =>
    gridTemplateColumns || 'repeat(12, 1fr)'};
  grid-template-rows: ${({ gridTemplateRows }) => gridTemplateRows};
  grid-template-areas: ${({ gridTemplateAreas }) => gridTemplateAreas};

  justify-items: ${({ justifyItems }) => justifyItems};
  align-items: ${({ alignItems }) => alignItems};

  justify-content: ${({ justifyContent }) => justifyContent};
  align-content: ${({ alignContent }) => alignContent};
  grid-auto-flow: ${({ gridAutoFlow }) => gridAutoFlow};
`;
