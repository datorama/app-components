/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ReactElement } from 'react';
import styled from 'styled-components';

import { AutoSizer } from 'react-virtualized';
import { Line } from './Line';
import { Area } from './Area';
import { Interaction } from './Interaction';

export interface Props {
  data: Record<string, any>[];
  strokeWidth?: number;
  strokeColor?: string;
  fillColor?: string;
  tooltipRenderer?: (point: Record<string, any>) => ReactElement | null;
}

export const BasicLine = (props: Props) => (
  <AutoSizer>
    {({ width, height }) => (
      <Svg width={width} height={height}>
        {props.data.length ? (
          <>
            <Area
              width={width}
              height={height}
              data={props.data}
              fillColor={props.fillColor}
            />
            <Line
              width={width}
              height={height}
              data={props.data}
              strokeColor={props.strokeColor}
              strokeWidth={props.strokeWidth}
            />
            <Interaction
              width={width}
              height={height}
              data={props.data}
              strokeColor={props.strokeColor}
              strokeWidth={props.strokeWidth}
              tooltipRenderer={props.tooltipRenderer}
            />
          </>
        ) : null}
      </Svg>
    )}
  </AutoSizer>
);

BasicLine.defaultProps = {
  data: [],
  strokeWidth: 3,
};

const Svg = styled.svg<{ width: number; height: number }>`
  width: ${({ width }) => `${width}px`};
  height: ${({ height }) => `${height}px`};
`;
