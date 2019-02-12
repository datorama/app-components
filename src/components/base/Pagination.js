import React from 'react';
import styled, {css} from 'styled-components';
import PropTypes from 'prop-types';

// todo:
/*
* prevent update selected only current on jump 3
what about 13?
// check selected ... 19 or 2


// line issue
* basic state
* generic variables
* arrows
* */


// next or prev
// 1. check if current is visible or not
// 2. if visible - update selected and current
// 3. not visible - update current

// click on ...
// 1. limits - set constant
// 2. jump on 3's

// set selected
// 1. set selected and current
// 2. set with limits

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
		const {current} = this.state;
		
		this.setState({current: current + 1});
	};
	
	prev = () => {
		const {total} = this.props;
		const {current} = this.state;
		
		this.setState({current: current - 1});
		
	};
	
	setSelected = id => () => {
		const {total} = this.props;
		const {current, selected} = this.state;
		
		// visible = current <= 4 or current > total - 4
		let dotsVisible = false;
		if (current <= 4 || current > total - 4) {
			dotsVisible = true;
		}
		
		console.log(dotsVisible);
		
		//const min = ;
		//const max = ;
		
		this.setState({selected: id});
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