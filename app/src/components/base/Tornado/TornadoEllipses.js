import React, { Fragment } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import * as CONSTANTS from './tornado.constants';
import { forEach } from 'lodash/fp';

const TornadoEllipses = ({ loading, numRows }) => {
  const ellipses = [];

  let ellipseIndex = 0;
  forEach(width => {
    const cx = CONSTANTS.MARGINS[ellipseIndex] + width / 2;
    const cy = ellipseIndex * (CONSTANTS.ROW_HEIGHT + CONSTANTS.MARGIN);
    const loadingYPos =
      3 * (CONSTANTS.ROW_HEIGHT + CONSTANTS.MARGIN) +
      CONSTANTS.ELLIPSES_VERTICAL_OFFSETS[ellipseIndex];
    const yPos = cy + CONSTANTS.ELLIPSES_VERTICAL_OFFSETS[ellipseIndex];

    ellipses.push(
      <Ellipse
        key={`ellipse-${ellipseIndex}`}
        cx={cx}
        cy={loading ? loadingYPos : yPos}
        rx={loading ? 10 : width / 2}
        opacity={loading ? 0 : 1}
        ry={CONSTANTS.ELLIPSES_RY[ellipseIndex]}
      />
    );
    ellipseIndex++;
  }, CONSTANTS.BASE(numRows));

  return <Fragment>{ellipses}</Fragment>;
};

TornadoEllipses.propTypes = {
  loading: PropTypes.bool
};

export default TornadoEllipses;

const Ellipse = styled.ellipse`
  fill: ${({ fill }) => fill || 'rgba(204, 206, 211, 0.75)'};
  transition: all 500ms;
  opacity: ${({ opacity }) => opacity};
`;
