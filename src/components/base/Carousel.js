import React, {Component} from 'react';
import styled, {css} from 'styled-components';
import PropTypes from 'prop-types';

class Carousel extends Component {
	static propTypes = {
		loading: PropTypes.bool,
		disabled: PropTypes.bool,
		slides: PropTypes.arrayOf(PropTypes.object)
	};
	
	state = {
		current: 0
	};
	
	next = () => this.setState(prevState => ({current: prevState.current + 1}));
	
	prev = () => this.setState(prevState => ({current: prevState.current - 1}));
	
	setSlide = current => () => this.setState({current});
	
	render() {
		const {current} = this.state;
		const positions = [
			100 / 3 * 0,
			100 / 3 * 1,
			100 / 3 * 2
		];
		
		return (
			<Container>
				<Inner total={3} translate={-1 * current * (100 / 3)} onClick={this.next}>
					<Slide total={3} active={current === 0} left={positions[0]}>
						<SlideInner>
							<Demo>0</Demo>
						</SlideInner>
					</Slide>
					
					<Slide total={3} active={current === 1} left={positions[1]}>
						<SlideInner>
							<Demo>1</Demo>
						</SlideInner>
					</Slide>
					
					<Slide total={3} active={current === 2} left={positions[2]}>
						<SlideInner>
							<Demo>2</Demo>
						</SlideInner>
					</Slide>
				</Inner>
				<Bullets>
					<Bullet onClick={this.setSlide(0)} selected={current === 0}/>
					<Bullet onClick={this.setSlide(1)} selected={current === 1}/>
					<Bullet onClick={this.setSlide(2)} selected={current === 2}/>
				</Bullets>
			</Container>
		);
	}
}

export default Carousel;

const Container = styled.div`
	position: relative;
	overflow: hidden;
	width: 100%;
	box-sizing: border-box;
	
	${({theme}) => theme.animation.zoomIn};
`;

const Inner = styled.div`
	height: 400px;
	width: ${({total}) => `${total * 100}%`};
	transition: all 500ms ease-out;
	transform: ${({translate}) => `translateX(${translate}%)`}
	
`;

const Slide = styled.div`
	width: ${({total}) => `${100 / total}%`};
	min-height: 400px;
	box-sizing: border-box;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 20px;
	
	position: absolute;
	top: 0;
	left: ${({left}) => `${left}%`};
`;

const SlideInner = styled.div`
	background: ${({theme}) => theme.p50};
	width: 100%;
	border-radius: 4px;
	min-height: 360px;
	box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
	border: 1px solid ${({theme}) => theme.p200};
	display: flex;
	align-items: center;
	justify-content: center;
`;

const Bullets = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	margin-top: 20px;
`;

const Bullet = styled.div`
	width: 8px;
	height: 8px;
	background: ${({theme}) => theme.p200};
	border-radius: 50%;
	margin: 0 4px;
	cursor: pointer;
	transition: all 300ms;
	
	${({selected, theme}) => selected && css`
		background: ${theme.p300};
	`};
	
	&:hover {
		background: ${({theme}) => theme.p400};
	}
`;

const Demo = styled.div`
	font-size: 40px;
`;