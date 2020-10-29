import React, { ReactNode } from 'react';
import styled from 'styled-components';
import WidgetOverlayInner from './WidgetOverlayInner';
import { AutoSizer } from 'react-virtualized';

export interface Props {
  children: ReactNode;
  isLoading?: boolean;
  isEmpty?: boolean;
  isError?: boolean;
  isDark?: boolean;
  isDisabled?: boolean;
  title?: string;
  subtitle?: string;
}

export const WidgetOverlay = (props: Props) => {
  const {
    children,
    title,
    subtitle,
    isError,
    isEmpty,
    isLoading,
    isDark,
    isDisabled,
  } = props;
  const showIllustration = isError || isEmpty || isLoading;

  return (
    <AutoSizer>
      {({ width, height }) => (
        <Container width={width} height={height} isDisabled={isDisabled}>
          {showIllustration ? (
            <WidgetOverlayInner
              isLoading={isLoading}
              isError={isError}
              isEmpty={isEmpty}
              isDark={!!isDark}
              width={width}
              height={height}
              title={title}
              subtitle={subtitle}
            />
          ) : (
            children
          )}
        </Container>
      )}
    </AutoSizer>
  );
};

WidgetOverlay.defaultProps = {
  isLoading: false,
  isEmpty: false,
  isError: false,
  isDark: false,
  isDisabled: false,
};

const Container = styled.div<{
  width: number;
  height: number;
  isDisabled: boolean;
}>`
  width: ${({ width }) => `${width}px`};
  height: ${({ height }) => `${height}px`};
  display: flex;
  align-items: center;
  justify-content: center;

  ${({ isDisabled }) =>
    isDisabled &&
    `
    pointer-events: none;
    opacity: 0.7;
  `};
`;
