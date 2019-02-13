import React, {Fragment} from 'react';
import styled, {css} from 'styled-components';
import {range} from 'lodash/fp';
import PropTypes from 'prop-types';

// assets
import {ReactComponent as ArrowDown} from '../assets/arrow-down.svg';
import {ReactComponent as DoubleArrowDown} from '../assets/double-arrow-down.svg';

export default class Pagination extends React.Component {
	static propTypes = {
		total: PropTypes.number.isRequired,
		max: PropTypes.number.isRequired,
		onChange: PropTypes.func.isRequired
	};
	
	state = {
		current: 1,
		selected: 1
	};
	
	next = () => {
		const {total, max} = this.props;
		const {current, selected} = this.state;
		const next = current + 1;
		const nextSelected = selected + 1;
		
		if (nextSelected > total) {
			return;
		}
		
		this.setState({
			selected: nextSelected,
			current: nextSelected > max && next < total - max + 2 ? next : current
		}, this.update);
	};
	
	update() {
		this.props.onChange(this.state.selected);
	}
	
	prev = () => {
		const {current, selected} = this.state;
		const {total, max} = this.props;
		const next = current - 1;
		const nextSelected = selected - 1;
		
		if (next <= 0) {
			return;
		}
		
		const updateCurrent = total - selected > max - 2;
		
		this.setState({
			selected: nextSelected,
			current: updateCurrent ? next : current
		}, this.update);
	};
	
	setPage = selected => () => {
		const {current} = this.state;
		const {total, max} = this.props;
		
		// update current
		let next = current;
		if (selected === 1) {
			next = 1;
		}
		
		if (selected === total && total > max) {
			next = total - max + 1;
		}
		
		this.setState({
			selected,
			current: next
		}, this.update);
	};
	
	getPages() {
		const {total, max} = this.props;
		const {current, selected} = this.state;
		
		let pageRange = range(current, current + max);
		
		// show all
		if (total <= max) {
			pageRange = range(1, total + 1);
		}
		
		return pageRange.map(page => (
			<Button
				key={`page-${page}`}
				onClick={this.setPage(page)}
				selected={page === selected}
			>
				{page}
			</Button>
		));
	}
	
	render() {
		const {max, total} = this.props;
		const {selected} = this.state;
		const noControlls = total <= max;
		
		return (
			<Container>
				{!noControlls && (
					<Fragment>
						<Button filled onClick={this.setPage(1)}><DoubleArrow rotate={90}/></Button>
						<Button filled onClick={this.prev}><Arrow rotate={90}/></Button>
					</Fragment>
				)}
				
				{this.getPages()}
				
				{!noControlls && (
					<Fragment>
						<Button filled onClick={this.next}><Arrow rotate={-90}/></Button>
						<Button filled onClick={this.setPage(total)}><DoubleArrow rotate={-90}/></Button>
					</Fragment>
				)}
				
				<Divider/>
				
				<Info>{selected} out of {total}</Info>
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
	margin: 0 4px;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 2px;
	transition: ${({filled}) => filled ? 'all 300ms' : 'none'};
	
	${({theme}) => theme.text.smLink};
	color: ${({theme}) => theme.p200};
	
	${({selected, theme}) => selected && css`
		color: ${theme.p600};
	`};
	
	&:hover {
		background: ${({theme}) => theme.p200};
	}
`;

const Divider = styled.div`
	width: 1px;
	height: 18px;
	margin: 0 8px;
	background: ${({theme}) => theme.p200};
`;

const Info = styled.div`
	${({theme}) => theme.text.smNote};
	width: 90px;
`;

const Arrow = styled(ArrowDown)`
	width: 14px;
	height: 14px;
	transform: rotate(${({rotate}) => `${rotate}deg`});
	* {
		fill: ${({theme}) => theme.p400};
	}
`;

const DoubleArrow = styled(DoubleArrowDown)`
	width: 14px;
	height: 14px;
	transform: rotate(${({rotate}) => `${rotate}deg`});
	* {
		fill: ${({theme}) => theme.p400};
	}
`;