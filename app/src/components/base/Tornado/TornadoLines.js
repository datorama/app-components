import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { size } from 'lodash/fp';

import * as CONSTANTS from './tornado.constants';
import { abbreviateNumber } from './tornado.utils';

const TornadoLines = ({ rows, onMouseEnter, onMouseLeave }) => (
  <g>
    {rows.map((line, i) => {
      const xStart = CONSTANTS.MARGINS[i] + CONSTANTS.BASE(size(rows))[i];
      const yPos =
        i * (CONSTANTS.ROW_HEIGHT + CONSTANTS.MARGIN) +
        CONSTANTS.ROW_HEIGHT +
        20 * Math.sin(xStart / CONSTANTS.INTER_SIN);

      const rowValue = `${abbreviateNumber(rows[i].totalValue || 0)} (${
        rows[i].totalPercentage
      }%)`;

      return (
        <g key={`line-${i}`}>
          <Line x1={xStart} x2="70%" y1={yPos} y2={yPos} />
          <g style={{ transform: 'translateX(-130px)' }}>
            <LineLabel x="70%" y={yPos - 4}>
              {rows[i].label}
            </LineLabel>
          </g>
          <g
            onMouseEnter={() => onMouseEnter(rows[i])}
            onMouseLeave={onMouseLeave}
          >
            <LineLabel x="70%" y={yPos - 4} bold>
              {rowValue}
            </LineLabel>
          </g>
        </g>
      );
    })}
  </g>
);

TornadoLines.propTypes = {
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
  rows: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      data: PropTypes.arrayOf(PropTypes.number),
      label: PropTypes.string,
      totalValue: PropTypes.number,
      totalPercentage: PropTypes.string
    })
  )
};

export default TornadoLines;

const Line = styled.line`
  stroke: #f2f2f4;
  stroke-width: 2px;
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

const LineLabel = styled.text`
  fill: #666a6b;
  font-size: 14px;
  font-weight: 300;
  ${({ bold }) =>
    bold &&
    css`
      fill: #383838;
      font-weight: 600;
    `};

  opacity: 0;
  visibility: hidden;
  animation: 1s ease-out 0s 1 slideRight forwards;
  animation-delay: 1000ms;
  transform: translateX(-100px);

  @keyframes slideRight {
    100% {
      opacity: 1;
      visibility: visible;
      transform: translateX(0);
    }
  }
`;
