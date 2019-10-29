import React, { useMemo } from 'react';
import styled from 'styled-components';

import DragSvg from '../DragSvg';

import { hexToRgba } from '../../../utils';

const GoalsChartDrag = ({
  handleDrag,
  dragColor,
  padding,
  width,
  height,
  dragTranslation,
  dragging,
  setDragging
}) => (
  <DragSvg
    onChange={handleDrag}
    initialTranslation={useMemo(() => [0, dragTranslation], [dragTranslation])}
    minY={-1 * (height - 2 * padding)}
    maxY={0}
    dragging={dragging}
    setDragging={setDragging}
  >
    <DragLineZone
      x1={2 * padding - 2}
      x2={width - 2 * padding + 2}
      y1={height - padding + dragTranslation}
      y2={height - padding + dragTranslation}
      color={dragColor}
    />
    <DragLine
      x1={2 * padding - 2}
      x2={width - 2 * padding + 2}
      y1={height - padding + dragTranslation}
      y2={height - padding + dragTranslation}
      color={dragColor}
    />
    <Arrow
      color={dragColor}
      d={[
        `M ${2 * padding - 1}, ${height - padding + dragTranslation + 4}`,
        'l 4, 4',
        'l 4, -4',
        'z'
      ].join(' ')}
    />
    <Arrow
      color={dragColor}
      d={[
        `M ${2 * padding - 1}, ${height - padding + dragTranslation - 4}`,
        'l 4, -4',
        'l 4, 4',
        'z'
      ].join(' ')}
    />
    <Arrow
      color={dragColor}
      d={[
        `M ${width - 2 * padding - 7}, ${height -
          padding +
          dragTranslation +
          4}`,
        'l 4, 4',
        'l 4, -4',
        'z'
      ].join(' ')}
    />
    <Arrow
      color={dragColor}
      d={[
        `M ${width - 2 * padding - 7}, ${height -
          padding +
          dragTranslation -
          4}`,
        'l 4, -4',
        'l 4, 4',
        'z'
      ].join(' ')}
    />
  </DragSvg>
);

const Arrow = styled.path`
  fill: ${({ theme, color }) => color || theme.a500};
`;

const DragLine = styled.line`
  stroke: ${({ theme, color }) => color || theme.a500};
  stroke-linecap: round;
  stroke-width: 2;
  pointer-events: none;
`;

const DragLineZone = styled.line`
  stroke-width: 20;
  stroke: transparent;

  &:hover {
    stroke: ${({ theme, color }) => hexToRgba(color || theme.a100, 20)};
  }
`;

export default GoalsChartDrag;
