import React from 'react';
import styled, {css} from 'styled-components';
import PropTypes from 'prop-types';

// todo:
/*
* click on page - set current
* click on ... jump in three
* basic state
* generic variables
* arrows
*
* */
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
		const {current} = this.state;
		const {total} = this.props;
		const next = current + 1;
		
		if (next <= total - 3) {
			this.setState({current: next});
		}
	};
	
	prev = () => {
		const {current} = this.state;
		const prev = current - 1;
		
		if (prev >= 4) {
			this.setState({current: prev});
		}
	};
	
	setSelected = selected => () => this.setState({selected});
	
	render() {
		const {total} = this.props;
		const {current, selected} = this.state;
		
		const leftBtn = current - 2 === 2 ? 2 : '...';
		const rightBtn = current + 2 === total - 1 ? total - 1 : '...';
		
		return (
			<Container>
				<Button filled onClick={this.prev}/>
				
				<Button onClick={this.setSelected(1)} selected={selected === 1}>1</Button>
				<Button>{leftBtn}</Button>
				<Button onClick={this.setSelected(current - 1)} selected={selected === current - 1}>{current - 1}</Button>
				<Button onClick={this.setSelected(current)} selected={selected === current}>{current}</Button>
				<Button onClick={this.setSelected(current + 1)} selected={selected === current + 1}>{current + 1}</Button>
				<Button>{rightBtn}</Button>
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
	//margin: 0 2px;
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