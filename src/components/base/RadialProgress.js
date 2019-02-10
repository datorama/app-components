import React from 'react';
import styled, {css, keyframes} from 'styled-components';
import PropTypes from 'prop-types';

const DEF_RADIUS = 54;

const RadialProgress = ({disabled, label, color, percentage, radius}) => {
	const progress = percentage / 100;
	const rad = radius || DEF_RADIUS;
	const circumference = 2 * Math.PI * rad;
	const dashoffset = circumference - progress * circumference;
	const outerRadius = rad + 6;
	
	return (
		<Svg
			width={2 * outerRadius}
			height={2 * outerRadius}
			viewBox={`0 0 ${2 * outerRadius} ${2 * outerRadius}`}
		>
			<Group>
				<Meter
					cx={outerRadius}
					cy={outerRadius}
					r={rad}
					strokeWidth={2}
				/>
				<Value
					cx={outerRadius}
					cy={outerRadius}
					r={rad}
					strokeWidth={5}
					dashoffset={dashoffset}
					circumference={circumference}
				/>
			</Group>
			<Text
				y="50%"
				x="50%"
				dy={2}
			>
				{`${percentage}%`}
			</Text>
		</Svg>
	);
};

RadialProgress.propTypes = {
	label: PropTypes.string,
	color: PropTypes.string,
	percentage: PropTypes.number.isRequired,
	disabled: PropTypes.bool,
	radius: PropTypes.number
};

export default RadialProgress;

const animate = dashoffset => keyframes`
  to {
    stroke-dashoffset: ${dashoffset};
  }
`;

const Svg = styled.svg``;

const Group = styled.g`
  transform: rotate(-90deg);
  transform-origin: 50% 50%;
`;

const Circle = styled.circle`
	stroke-width: ${({strokeWidth}) => `${strokeWidth}px`};
	fill: none;
`;

const Meter = styled(Circle)`
	stroke: ${({theme}) => theme.p200};
`;

const Value = styled(Circle)`
	stroke: ${({theme}) => theme.a500};
  stroke-linecap: round;
  stroke-dashoffset: ${({circumference}) => circumference};
  stroke-dasharray: ${({circumference}) => circumference};

	${({dashoffset}) => dashoffset && css`
		animation: ${animate(dashoffset)} 1s linear forwards;
	`};
`;

const Text = styled.text`
	${({theme}) => theme.text.sm};
	fill: ${({theme}) => theme.p600};
	text-anchor: middle;
	alignment-baseline: middle;
`;