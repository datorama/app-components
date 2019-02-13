import React, {Component} from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

// components
import Draggable from './Draggable';

class Range extends Component {
	static propTypes = {
		value: PropTypes.number,
		min: PropTypes.number,
		max: PropTypes.number,
		step: PropTypes.number,
		disabled: PropTypes.bool,
		className: PropTypes.string
	};
	
	state = {
		value: 0
	};
	
	render() {
		return (
			<Container>
				<Outer>
					<Inner width={60}/>
				</Outer>
				<Draggable>
					<Thumb/>
				</Draggable>
			</Container>
		);
	}
}

export default Range;

const Container = styled.div`
	width: 100%;
	display: flex;
	position: relative;
	height: 6px;
	align-items: center;
`;

const Outer = styled.div`
	width: 100%;
	height: 2px;
	background: ${({theme}) => theme.p200};
	border-radius: 3px;
	position: relative;
	overflow: hidden;
`;

const Inner = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	height: 2px;
	width: ${({width}) => `${width}%`}
	background: ${({theme}) => theme.a500};
`;

const Thumb = styled.div`
	width: 12px;
	height: 12px;
	cursor: pointer;
	border-radius: 50%;
	background: ${({theme}) => theme.a500};
	box-shadow: 0 5px 10px rgba(0, 0, 0, 0.05);
	position: absolute;
	top: -6px;
	left: -6px;
	opacity: 1;
`;