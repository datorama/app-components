import React, { Component } from 'react';
import styled, { css, keyframes } from 'styled-components';
import PropTypes from 'prop-types';
import { get } from 'lodash/fp';
import { shadeColor } from '../utils';
import Tooltip from './Tooltip';

const DEF_RADIUS = 20;
const DEF_STROKE = 10;

export default class MultiProgress extends Component {
  static propTypes = {
    values: PropTypes.array.isRequired,
    radius: PropTypes.number,
    className: PropTypes.string
  };

  state = {
    hoveredIndex: null
  };

  setHover = hoveredIndex => () => this.setState({ hoveredIndex });

  render() {
    const { values } = this.props;
    const { hoveredIndex } = this.state;
    const outerRadius = (DEF_RADIUS + 4) * values.length;

    return (
      <Tooltip fixed title={`${get(`[${hoveredIndex}].percentage`, values)}%`}>
        <svg
          className={this.props.className}
          width={2 * outerRadius}
          height={2 * outerRadius}
          viewBox={`0 0 ${2 * outerRadius} ${2 * outerRadius}`}
        >
          {values.map((value, index) => {
            const progress = value.percentage / 100;
            const rad = DEF_RADIUS * (index + 1);
            const circumference = 2 * Math.PI * rad;
            const dashoffset = circumference * (1 - progress);

            return (
              <Group
                key={`bar-${index}`}
                color={value.color}
                onMouseEnter={this.setHover(index)}
              >
                <Meter
                  cx={outerRadius}
                  cy={outerRadius}
                  r={rad}
                  strokeWidth={DEF_STROKE}
                />
                <Value
                  cx={outerRadius}
                  cy={outerRadius}
                  r={rad}
                  strokeWidth={DEF_STROKE}
                  dashoffset={dashoffset}
                  circumference={circumference}
                  color={value.color}
                />
              </Group>
            );
          })}
        </svg>
      </Tooltip>
    );
  }
}

const animate = dashoffset => keyframes`
  to {
    stroke-dashoffset: ${dashoffset};
  }
`;

const Circle = styled.circle`
  stroke-width: ${({ strokeWidth }) => `${strokeWidth}px`};
  fill: none;
`;

const Value = styled(Circle)`
  stroke: ${({ color }) => color};
  stroke-linecap: round;
  stroke-dashoffset: ${({ circumference }) => circumference};
  stroke-dasharray: ${({ circumference }) => circumference};
  transition: all 300ms;

  ${({ dashoffset }) => css`
    animation: ${animate(dashoffset)} 1s linear forwards;
  `};
`;

const Group = styled.g`
  transform: rotate(-90deg);
  transform-origin: 50% 50%;

  &:hover {
    circle {
      stroke-width: ${DEF_STROKE + 2}px;
    }

    ${Value} {
      stroke: ${({ color }) => shadeColor(color, 500)};
    }
  }
`;

const Meter = styled(Circle)`
  stroke: ${({ theme }) => theme.p100};
`;
