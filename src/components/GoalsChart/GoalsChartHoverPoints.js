/* eslint react/prop-types: 0 */
import React, { useMemo } from 'react';
import styled from 'styled-components';

const GoalsChartHoverPoints = ({
  data,
  width,
  padding,
  onMouseEnter,
  hovered,
  originalData,
  lineLabelRenderer,
  valueFormatter,
}) => {
  const rectWidth = useMemo(() => (width - 2 * padding - 70) / data.length, [
    data.length,
    padding,
    width,
  ]);

  if (rectWidth <= 0) {
    return null;
  }

  return (
    <g>
      {data.map((point, i) => (
        <HoverZone key={`point-${i}`} onMouseEnter={() => onMouseEnter(i)}>
          <HoverRect
            width={rectWidth}
            height="100%"
            x={point[0] - 0.5 * rectWidth}
            y={0}
          />
          <Circle cx={point[0]} cy={point[1]} r={3} selected={hovered === i} />

          {lineLabelRenderer ? (
            lineLabelRenderer({
              x: point[0] + 10,
              y: point[1] - 13,
              value: originalData[i][1],
              isHovered: hovered === i,
            })
          ) : (
            <svg
              x={point[0] - 20}
              y={point[1] - 25}
              width={40}
              height={20}
              id="hover-points-wrapper"
              style={{ overflow: 'visible' }}
            >
              <TextBg
                width="100%"
                height="100%"
                rx={4}
                ry={4}
                selected={hovered === i}
              />

              <TooltipLabel
                selected={hovered === i}
                alignmentBaseline="middle"
                textAnchor="middle"
              >
                {valueFormatter(originalData[i][1])}
              </TooltipLabel>
            </svg>
          )}
        </HoverZone>
      ))}
    </g>
  );
};

const Circle = styled.circle`
  stroke: none;
  fill: ${({ theme, color }) => color || theme.p600};
  opacity: 0;
  transition: all 300ms;

  ${({ selected }) =>
    selected &&
    `
    opacity: 1;
  `};
`;
const HoverRect = styled.rect`
  stroke: none;
  fill: transparent;
`;

const HoverZone = styled.g``;

const TooltipLabel = styled.text`
  font-size: 12px;
  font-weight: 600;
  fill: ${({ theme, color }) => color || theme.a400};
  transform: translateX(50%) translateY(50%);

  opacity: 0;
  transition: all 300ms;

  ${({ selected }) =>
    selected &&
    `
    opacity: 1;
  `};
`;

const TextBg = styled.rect`
  fill: ${({ theme }) => theme.a100};
  opacity: 0;

  ${({ selected }) =>
    selected &&
    `
    opacity: 1;
  `};
`;

export default GoalsChartHoverPoints;
