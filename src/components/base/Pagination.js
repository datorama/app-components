import React from 'react';
import styled, {css} from 'styled-components';
import PropTypes from 'prop-types';

// dynamic

export default class Pagination extends React.Component {
	static propTypes = {
		total: PropTypes.number.isRequired,
		//onChange: PropTypes.func.isRequired
	};
	
	state = {
		current: 4,
		selected: 1
	};
	
	next = () => {
		const {total} = this.props;
		const {current, selected} = this.state;
		
		if (selected + 1 > total) {
			return;
		}
		
		let dotsVisible = false;
		if (current <= 4 || current > total - 4) {
			if (selected < 4 || selected > 16) {
				dotsVisible = true;
			}
		}
		
		if (dotsVisible) {
			this.setState({selected: selected + 1});
		}
		
		// todo: check if selected is visible or not
		if (!dotsVisible) {
			this.setState({selected: selected + 1, current: current + 1});
		}
	};
	
	prev = () => {
		const {current, selected} = this.state;
		
		if (selected - 1 <= 0) {
			return;
		}
		
		let dotsVisible = false;
		if (this.isInDotsRange(current)) {
			if (selected < 5 || selected > 17) {
				dotsVisible = true;
			}
		}
		
		if (dotsVisible) {
			this.setState({selected: selected - 1});
		}
		
		// todo: check if selected is visible or not
		if (!dotsVisible) {
			this.setState({selected: selected - 1, current: current - 1});
		}
	};
	
	isInDotsRange = id => id <= 4 || id > this.props.total - 4;
	
	setSelected = id => () => {
		const {total} = this.props;
		const {current, selected} = this.state;
		
		let nextSelected = id;
		let nextCurrent = current;
		
		const dotsVisible = this.isInDotsRange(current);
		const leftVisible = current <= 4;
		const rightVisible = current > total - 4;
		
		// dots visible
		if (dotsVisible && id === 'left' && leftVisible) {
			nextSelected = 2;
		}
		
		if (dotsVisible && id === 'right' && rightVisible) {
			nextSelected = total - 1;
		}
		
		// dots hidden - jump
		if (!leftVisible && id === 'left') {
			// jump in 3
			if (current - 3 > 3) {
				nextCurrent -= 3;
			} else {
				// set left limit
				nextCurrent = 4;
			}
		}
		
		if (!rightVisible && id === 'right') {
			nextSelected = selected;
			// jump in 3
			if (current + 3 < total - 2) {
				nextCurrent += 3;
			} else {
				// set right limit
				nextCurrent = total - 3;
			}
		}
		
		let calcId = id;
		if (id === 'left') {
			calcId = 2;
		}
		if (id === 'right') {
			calcId = total - 1;
		}
		
		if (!this.isInDotsRange(calcId)) {
			nextCurrent = calcId;
		} else {
			// update current to limits
			if (calcId !== 2 && calcId !== total - 1) {
				if (calcId <= 4) {
					nextCurrent = 4;
				}
				
				if (calcId > total - 4) {
					nextCurrent = total - 3;
				}
			}
		}
		
		this.setState({selected: nextSelected, current: nextCurrent});
	};
	
	render() {
		const {total} = this.props;
		const {current, selected} = this.state;
		console.log({
			current,
			selected
		});
		
		const leftBtn = current - 2 === 2 ? 2 : '...';
		const rightBtn = current + 2 === total - 1 ? total - 1 : '...';
		
		return (
			<Container>
				<Button filled onClick={this.prev}/>
				<Button onClick={this.setSelected(1)} selected={selected === 1}>1</Button>
				<Button selected={selected === 2} onClick={this.setSelected('left')}>{leftBtn}</Button>
				
				<Button onClick={this.setSelected(current - 1)} selected={selected === current - 1}>{current - 1}</Button>
				<Button onClick={this.setSelected(current)} selected={selected === current}>{current}</Button>
				<Button onClick={this.setSelected(current + 1)} selected={selected === current + 1}>{current + 1}</Button>
				
				<Button selected={selected === total - 1} onClick={this.setSelected('right')}>{rightBtn}</Button>
				<Button onClick={this.setSelected(total)} selected={selected === total}>{total}</Button>
				<Button filled onClick={this.next}/>
			</Container>
		);
	}
}

const Container = styled.div`
	display: flex;
	align-items: center;
`;

const Button = styled.div`
	width: 24px;
	height: 24px;
	background: ${({theme, filled}) => filled ? theme.p100 : 'transparent'};
	cursor: pointer;
	display: flex;
	align-items: center;
	justify-content: center;
	transition: all 300ms;
	border-radius: 2px;
	
	${({theme}) => theme.text.smLink};
	color: ${({theme}) => theme.p200};
	
	${({selected, theme}) => selected && css`
		color: ${theme.p700};
	`};
`;