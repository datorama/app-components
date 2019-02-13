import React, {Fragment} from 'react';
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
		const {isDragging, originalX, originalY} = this.state;
		const {onDrag} = this.props;
		
		if (!isDragging) {
			return;
		}
		
		if (onDrag) {
			onDrag({
				translateX: clientX - originalX,
				translateY: clientY - originalY
			});
		}
	};
	
	handleMouseUp = () => {
		window.removeEventListener('mousemove', this.handleMouseMove);
		window.removeEventListener('mouseup', this.handleMouseUp);
		
		this.setState(
			{
				originalX: 0,
				originalY: 0,
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