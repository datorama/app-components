import React, { Component } from 'react';
import styled, { css, keyframes } from 'styled-components';
import * as PropTypes from 'prop-types';
import { get } from 'lodash/fp';
import { shadeColor } from '../utils/theme.utils';
import { Tooltip } from './Tooltip';

export class MultiProgress extends Component {
  static propTypes = {
    values: PropTypes.array.isRequired,
    radius: PropTypes.number,
    strokeWidth: PropTypes.number,
    innerRadius: PropTypes.number,
    gap: PropTypes.number,
    className: PropTypes.string,
    meterColor: PropTypes.string,
  };

  static defaultProps = {
    strokeWidth: 10,
    innerRadius: 20,
    gap: 20,
  };

  state = {
    hoveredIndex: null,
  };

  setHover = (hoveredIndex) => () => this.setState({ hoveredIndex });

  render() {
    const { values, strokeWidth, innerRadius, gap, meterColor } = this.props;
    const { hoveredIndex } = this.state;
    const outerRadius =
      innerRadius + gap * (values.length - 1) + 0.5 * strokeWidth + 2;

    let label = get(`[${hoveredIndex}].percentage`, values);
    if (label) {
      label += '%';
    }

    if (get(`[${hoveredIndex}].label`, values)) {
      label = get(`[${hoveredIndex}].label`, values);
    }

    return (
      <Tooltip fixed title={label}>
        <svg
          className={this.props.className}
          width={2 * outerRadius}
          height={2 * outerRadius}
          viewBox={`0 0 ${2 * outerRadius} ${2 * outerRadius}`}
        >
          {values.map((value, index) => {
            const progress = value.percentage / 100;
            const rad = innerRadius + gap * index;
            const circumference = 2 * Math.PI * rad;
            const dashoffset = circumference * (1 - progress);

            return (
              <Group
                key={`bar-${index}`}
                color={value.color}
                onMouseEnter={this.setHover(index)}
                onMouseLeave={this.setHover(null)}
                strokeWidth={strokeWidth}
              >
                <Meter
                  cx={outerRadius}
                  cy={outerRadius}
                  r={rad}
                  strokeWidth={strokeWidth}
                  meterColor={meterColor}
                />
                <Value
                  cx={outerRadius}
                  cy={outerRadius}
                  r={rad}
                  strokeWidth={strokeWidth}
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

const animate = (dashoffset) => keyframes`
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

const Meter = styled(Circle)`
  stroke: ${({ theme, meterColor }) => meterColor || theme.p100};
  transition: all 300ms;
`;

const Group = styled.g`
  transform: rotate(-90deg);
  transform-origin: 50% 50%;

  &:hover {
    circle {
      stroke-width: ${({ strokeWidth }) => strokeWidth + 2}px;
    }

    ${Value} {
      stroke: ${({ color }) => shadeColor(color, 500)};
    }

    ${Meter} {
      stroke: ${({ theme }) => theme.p100};
    }
  }
`;
