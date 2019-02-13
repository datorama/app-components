import React from 'react';
import styled, {css} from 'styled-components';
import PropTypes from 'prop-types';

export default class Draggable extends React.Component {
	static propTypes = {
		children: PropTypes.node,
		onDragStart: PropTypes.func,
		onDrag: PropTypes.func,
		onDragEnd: PropTypes.func
	};
	
	state = {
		isDragging: false,
		
		originalX: 0,
		originalY: 0,
		
		translateX: 0,
		translateY: 0,
		
		lastTranslateX: 0,
		lastTranslateY: 0
	};
	
	componentWillUnmount() {
		window.removeEventListener('mousemove', this.handleMouseMove);
		window.removeEventListener('mouseup', this.handleMouseUp);
	}
	
	handleMouseDown = ({clientX, clientY}) => {
		window.addEventListener('mousemove', this.handleMouseMove);
		window.addEventListener('mouseup', this.handleMouseUp);
		
		if (this.props.onDragStart) {
			this.props.onDragStart();
		}
		
		this.setState({
			originalX: clientX,
			originalY: clientY,
			isDragging: true
		});
	};
	
	handleMouseMove = ({clientX, clientY}) => {
		const {isDragging} = this.state;
		const {onDrag} = this.props;
		
		if (!isDragging) {
			return;
		}
		
		this.setState(prevState => ({
			translateX: clientX - prevState.originalX + prevState.lastTranslateX,
			translateY: clientY - prevState.originalY + prevState.lastTranslateY
		}), () => {
			if (onDrag) {
				onDrag({
					translateX: this.state.translateX,
					translateY: this.state.translateY
				});
			}
		});
	};
	
	handleMouseUp = () => {
		window.removeEventListener('mousemove', this.handleMouseMove);
		window.removeEventListener('mouseup', this.handleMouseUp);
		
		this.setState(
			{
				originalX: 0,
				originalY: 0,
				lastTranslateX: this.state.translateX,
				lastTranslateY: this.state.translateY,
				
				isDragging: false
			},
			() => {
				if (this.props.onDragEnd) {
					this.props.onDragEnd();
				}
			}
		);
	};
	
	render() {
		const {children} = this.props;
		const {translateX, translateY, isDragging} = this.state;
		
		return (
			<Container
				onMouseDown={this.handleMouseDown}
				x={translateX}
				y={translateY}
				isDragging={isDragging}
			>
				{children}
			</Container>
		);
	}
}

const Container = styled.div.attrs({
	style: ({x, y}) => ({
		transform: `translate(${x}px, ${y}px)`
	}),
})`
  cursor: grab;
  
  ${({isDragging}) =>
	isDragging && css`
    opacity: 0.8;
    cursor: grabbing;
  `};
`;