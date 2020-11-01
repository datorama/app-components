/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ReactElement, useCallback, useState } from 'react';
import styled from 'styled-components';
import { maxBy, minBy, isNumber } from 'lodash/fp';
import { scaleFunction } from './charts.utils';
import { hexToRgba } from '../../utils/theme.utils';
import { lightTheme } from '../../constants/themes.constants';
import { ChartTooltip } from './ChartTooltip';

interface Props {
  width: number;
  height: number;
  data: Record<string, any>[];
  strokeWidth?: number;
  strokeColor?: string;
  tooltipRenderer?: (point: Record<string, any>) => ReactElement | null;
}

export const Interaction = (props: Props) => {
  const {
    width,
    height,
    data,
    strokeColor,
    strokeWidth,
    tooltipRenderer,
  } = props;
  const min = minBy((d) => d.y, data);
  const max = maxBy((d) => d.y, data);
  const padding = 20;
  const scaleY = scaleFunction([min.y, max.y], [height - padding, padding]);
  const scaleX = scaleFunction(
    [0, data.length - 1],
    [padding, width - padding]
  );
  const [hovered, setHovered] = useState(null);
  const points = [];
  const [tipPos, setTipPos] = useState({ top: 0, left: 0 });

  const handleMouseMove = useCallback(
    (e) => {
      const rect = e.target.getBoundingClientRect();
      const step = (width - 2 * padding) / (data.length - 1);
      const index = Math.min(
        Math.round((e.clientX - rect.left) / step),
        data.length - 1
      );

      setHovered(index);
      setTipPos({
        top: rect.top + scaleY(data[index].y),
        left: padding + rect.left + index * step,
      });
    },
    [data, width, scaleX, scaleY, padding]
  );

  const handleMouseLeave = useCallback(() => setHovered(null), []);

  let x = -999;
  let y = -999;

  if (isNumber(hovered)) {
    x = scaleX(hovered);
    y = scaleY(data[hovered].y);
  }

  return (
    <g>
      <HoverRect
        width={width}
        height={height}
        x={0}
        y={0}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      />
      {points}

      {isNumber(hovered) ? (
        <g>
          <Line
            x1={x}
            x2={x}
            y1={y + 4}
            y2={scaleY(0)}
            strokeColor={strokeColor}
          />
          <Point
            cx={x}
            cy={y}
            r={5}
            strokeWidth={strokeWidth}
            strokeColor={strokeColor}
            fill="transparent"
          />
          <Point
            cx={x}
            cy={y}
            r={3}
            strokeWidth={1}
            strokeColor="#fff"
            fill={hexToRgba(strokeColor || lightTheme.a400, 60)}
          />
          <ChartTooltip top={tipPos.top} left={tipPos.left}>
            {tooltipRenderer ? tooltipRenderer(data[hovered]) : data[hovered].y}
          </ChartTooltip>
        </g>
      ) : null}
    </g>
  );
};

const Point = styled.circle<{
  strokeColor?: string;
  strokeWidth: number;
  fill: string;
}>`
  stroke: ${({ theme, strokeColor }) => strokeColor || theme.a400};
  fill: ${({ fill }) => fill};
  stroke-width: ${({ strokeWidth }) => strokeWidth};
  pointer-events: none;
`;

const Line = styled.line<{ strokeColor?: string }>`
  stroke-width: 1;
  stroke: ${({ theme, strokeColor }) => strokeColor || theme.a400};
  stroke-dasharray: 2, 2;
  pointer-events: none;
`;

const HoverRect = styled.rect`
  fill: transparent;
`;
