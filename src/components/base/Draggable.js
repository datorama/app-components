import React from 'react';

export default class Draggable extends React.Component {
	state = {
		isDragging: false,
		clientX: 0,
		clientY: 0,
		
		originalX: 0,
		originalY: 0,
		
		translateX: 0,
		translateY: 0
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
		const {originalX, originalY, isDragging} = this.state;
		const {onDrag} = this.props;
		
		if (!isDragging) {
			return;
		}
		
		onDrag({
			translateX: clientX - originalX,
			translateY: clientY - originalY
		});
	};
	
	handleMouseUp = () => {
		window.removeEventListener('mousemove', this.handleMouseMove);
		window.removeEventListener('mouseup', this.handleMouseUp);
		
		this.setState(
			{
				clientX: 0,
				clientY: 0,
				
				originalX: 0,
				originalY: 0,
				
				translateX: 0,
				translateY: 0,
				
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
		
		return (
			<div onMouseDown={this.handleMouseDown}>
				{children}
			</div>
		);
	}
}
