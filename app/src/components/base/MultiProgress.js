import React from 'react';
import styled, {css, keyframes} from 'styled-components';
import PropTypes from 'prop-types';

const DEF_RADIUS = 20;
const DEF_STROKE = 10;

const MultiProgress = props => {
	const {values} = props;
	const outerRadius = (DEF_RADIUS + 4) * values.length;
	
	return (
		<Svg
			width={2 * outerRadius}
			height={2 * outerRadius}
			viewBox={`0 0 ${2 * outerRadius} ${2 * outerRadius}`}
		>
			
			{
				values.map((value, index) => {
					const progress = value.percentage / 100;
					const rad = DEF_RADIUS * (index + 1);
					const circumference = 2 * Math.PI * rad;
					const dashoffset = circumference * (1 - progress);

					return (
						<Group key={`bar-${index}`}>
							<Meter cx={outerRadius} cy={outerRadius} r={rad} strokeWidth={DEF_STROKE} />
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
				})
			}
		</Svg>
	);
};

MultiProgress.propTypes = {
	values: PropTypes.array.isRequired,
	radius: PropTypes.number
};

export default MultiProgress;

const animate = dashoffset => keyframes`
  to {
    stroke-dashoffset: ${dashoffset};
  }
`;

const Svg = styled.svg``;

const Group = styled.g`
  transform: rotate(-90deg);
  transform-origin: 50% 50%;
  
  &:hover {
  	circle {
  		stroke-width: ${DEF_STROKE + 2}px;
  	}
  }
`;

const Circle = styled.circle`
  stroke-width: ${({strokeWidth}) => `${strokeWidth}px`};
  fill: none;
`;

const Meter = styled(Circle)`
  stroke: ${({ theme }) => theme.p100};
`;

const Value = styled(Circle)`
  stroke: ${({color}) => color};
  stroke-linecap: round;
  stroke-dashoffset: ${({circumference}) => circumference};
  stroke-dasharray: ${({circumference}) => circumference};
  transition: all 300ms;

  ${({dashoffset}) => css`
		animation: ${animate(dashoffset)} 1s linear forwards;
	`};
`;
