import React from 'react';
import styled from 'styled-components';
import { size } from 'lodash/fp';
import PropTypes from 'prop-types';

import * as CONSTANTS from './tornado.constants';
import { normalize } from './tornado.utils';

const calcArrowPos = (total, index, centered, containerWidth) => {
  if (containerWidth) {
    const padding = 0;
    const step = (containerWidth - 2 * padding) / total;

    if (total === 1) {
      return padding + step / 2 - 2;
    }

    let result = padding;
    for (let i = 0; i <= index; i++) {
      result += i === index && centered ? step / 2 : step;
    }

    return result - 2;
  }

  return -999;
};

const TornadoArrows = props => {
  const { rows, selectedIndex, amount, containerWidth } = props;
  const numRows = size(rows);
  const BASE = CONSTANTS.BASE(numRows);
  const OFFSET = CONSTANTS.TORNADO_OFFSET(numRows);

  const firstRow = normalize(rows[0].data, BASE[0]);
  const lastRow = normalize(rows[numRows - 1].data, BASE[numRows - 1]);

  const topTo = [OFFSET[0], 40];

  const bottomTo = [
    calcArrowPos(amount, selectedIndex, true, containerWidth),
    440
  ];

  // from position
  const topFrom = [
    calcArrowPos(amount, selectedIndex, true, containerWidth),
    20
  ];
  const bottomFrom = [OFFSET[0] + CONSTANTS.MARGINS[numRows - 1], 420];

  // calculate sums
  for (let i = 0; i <= selectedIndex; i++) {
    const factor = i === selectedIndex ? 0.5 : 1;
    topTo[0] += firstRow[i] * factor;
    bottomFrom[0] += lastRow[i] * factor;
  }

  return (
    <Svg
      height={CONSTANTS.CONTAINER_HEIGHT}
      className="tornado tornado-chart tornado-chart-arrows tornado-chart-arrows-container"
    >
      <ArrowLine
        id="tornado-top-line"
        d={`M ${topFrom[0]},${topFrom[1]} l 0,20 L ${topTo[0]},${
          topTo[1]
        } l 0,20`}
        color={CONSTANTS.MAIN_COLORS[selectedIndex % 6]}
      />
      <Arrow
        id="tornado-top-line-arrow"
        d={`M ${topTo[0] - 8}, ${topTo[1] + 20} l 16 0, l -8 8 z`}
        color={CONSTANTS.MAIN_COLORS[selectedIndex % 6]}
      />
      <ArrowLine
        id="tornado-bottom-line"
        d={`M ${bottomFrom[0]},${bottomFrom[1]} l 0,20 L ${bottomTo[0]},${
          bottomTo[1]
        } l 0,20`}
        color={CONSTANTS.MAIN_COLORS[selectedIndex % 6]}
      />
      <Arrow
        id="tornado-bottom-line-arrow"
        d={`M ${bottomTo[0] - 8}, ${bottomTo[1] + 20} l 16 0, l -8 8 z`}
        color={CONSTANTS.MAIN_COLORS[selectedIndex % 6]}
      />
    </Svg>
  );
};

TornadoArrows.propTypes = {
  selectedIndex: PropTypes.number,
  amount: PropTypes.number,
  containerWidth: PropTypes.number,
  rows: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      data: PropTypes.arrayOf(PropTypes.number),
      label: PropTypes.string,
      totalValue: PropTypes.number,
      totalPercentage: PropTypes.string
    })
  ),
  stats: PropTypes.array
};

export default TornadoArrows;

const Svg = styled.svg`
  width: 100%;
  height: ${({ height }) => `${height}px`};
  background: transparent;
  position: absolute;
  top: 0;
  left: 0;
  pointer-events: none;
`;

const ArrowLine = styled.path`
  stroke: ${({ color }) => color};
  stroke-width: 4px;
  fill: transparent;
  stroke-linecap: round;
  transition: all 300ms;

  opacity: 0;
  visibility: hidden;
  animation: 1s ease-out 0s 1 appear forwards;
  animation-delay: 1000ms;

  @keyframes appear {
    100% {
      opacity: 1;
      visibility: visible;
    }
  }
`;

const Arrow = styled.path`
  fill: ${({ color }) => color};
  stroke: ${({ color }) => color};
  stroke-width: 2px;
  stroke-linejoin: round;
  transition: all 300ms;

  opacity: 0;
  visibility: hidden;
  animation: 500ms ease-out 0s 1 appear forwards;
  animation-delay: 1000ms;

  @keyframes appear {
    100% {
      transform: translateY(0);
      opacity: 1;
      visibility: visible;
    }
  }
`;
