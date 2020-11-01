/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import styled from 'styled-components';
import * as d3 from 'd3-shape';
import { minBy, maxBy } from 'lodash/fp';
import { scaleFunction } from './charts.utils';
import { lightTheme } from '../../constants/themes.constants';

interface Props {
  width: number;
  height: number;
  data: Record<string, any>[];
  fillColor?: string;
}

export const Area = (props: Props) => {
  const { width, height, data, fillColor } = props;
  const min = minBy((d) => d.y, data);
  const max = maxBy((d) => d.y, data);
  const padding = 20;
  const scaleY = scaleFunction([min.y, max.y], [height - padding, padding]);
  const scaleX = scaleFunction(
    [0, data.length - 1],
    [padding, width - padding]
  );

  const areaGenerator: any = d3
    .area()
    .y0(scaleY(0))
    .x((_, index) => scaleX(index))
    .y1((d: Record<string, any>) => scaleY(d.y))
    .curve(d3.curveCatmullRom.alpha(0.5));
  const areaPath = areaGenerator(data);

  return (
    <g>
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop
            offset="0%"
            style={{
              stopColor: fillColor || lightTheme.a400,
              stopOpacity: 0.6,
            }}
          />
          <stop
            offset="100%"
            style={{ stopColor: fillColor || lightTheme.a400, stopOpacity: 0 }}
          />
        </linearGradient>
      </defs>
      <Path d={areaPath} fill="url(#gradient)" />
    </g>
  );
};

const Path = styled.path`
  stroke-linecap: round;
  ${({ theme }) => theme.animation.fade};
  animation-delay: 1.5s;
`;
