/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import styled, { keyframes } from 'styled-components';
import * as d3 from 'd3-shape';
import { minBy, maxBy } from 'lodash/fp';
import { scaleFunction } from './charts.utils';

interface Props {
  width: number;
  height: number;
  data: Record<string, any>[];
  strokeWidth?: number;
  strokeColor?: string;
}

export const Line = (props: Props) => {
  const { width, height, data, strokeWidth, strokeColor } = props;
  const min = minBy((d) => d.y, data);
  const max = maxBy((d) => d.y, data);
  const padding = 20;
  const scaleY = scaleFunction([min.y, max.y], [height - padding, padding]);
  const scaleX = scaleFunction(
    [0, data.length - 1],
    [padding, width - padding]
  );

  const lineGenerator: any = d3
    .line()
    .x((_, index) => scaleX(index))
    .y((d: Record<string, any>) => scaleY(d.y))
    .curve(d3.curveCatmullRom.alpha(0.5));
  const linePath = lineGenerator(data);

  return (
    <Path d={linePath} strokeColor={strokeColor} strokeWidth={strokeWidth} />
  );
};

const animation = keyframes`
 to {
  stroke-dashoffset: 0;
 }
`;

const Path = styled.path<{
  strokeWidth?: number;
  strokeColor?: string;
}>`
  stroke: ${({ theme, strokeColor }) => strokeColor || theme.a400};
  stroke-width: ${({ strokeWidth }) => strokeWidth || 3};
  fill: none;
  stroke-linecap: round;

  stroke-dasharray: 1000;
  stroke-dashoffset: 1000;
  animation: ${animation} 2s linear forwards;
`;
