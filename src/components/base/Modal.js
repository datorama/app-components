import React, {Fragment} from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

// utils
import {hexToRgba} from '../utils';
import {throttle} from 'lodash/fp';

// components
import Card from './Card';
import Button from './Button';

export default class Modal extends React.Component {
	static propTypes = {
		children: PropTypes.node,
		toggleOpen: PropTypes.func.isRequired,
		open: PropTypes.bool.isRequired,
		title: PropTypes.string,
		className: PropTypes.string,
		buttons: PropTypes.arrayOf(PropTypes.object).isRequired
	};
	
	state = {
		localOpen: false
	};
	
	componentDidUpdate(prevProps) {
		if (!this.props.open && prevProps.open) {
			setTimeout(() => {
				this.setState({localOpen: false});
			}, 500)
		}
		
		if (this.props.open && !prevProps.open) {
			this.setState({localOpen: true});
		}
	}
	
	throttledToggle = throttle(500, this.props.toggleOpen);
	
	handleClick = onClick => () => {
		if (onClick) {
			onClick();
		}
		
		this.throttledToggle();
	};
	
	render() {
		const {open, className, title, buttons, children} = this.props;
		const {localOpen} = this.state;
		
		if (!localOpen) {
			return null;
		}
		
		return (
			<Fragment>
				<Overlay open={localOpen} onClick={this.throttledToggle} visible={open}/>
				<Container open={localOpen} className={className} visible>
					<StyledCard open={localOpen} className="modal-card" visible={open}>
						<CloseIcon onClick={this.throttledToggle}/>
						{title && (<Header><Title>{title}</Title></Header>)}
						<Content>
							{children}
						</Content>
						<Footer>
							{
								buttons.map((button, i) => (
									<StyledButton
										key={`btn-${i}`}
										secondary={button.type === 'secondary'}
										onClick={this.handleClick(button.onClick)}>
										{button.label}
									</StyledButton>
								))
							}
						</Footer>
					</StyledCard>
				</Container>
			</Fragment>
		);
	}
}

const Container = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	display: flex;
	align-items: center;
	justify-content: center;
	pointer-events: none;
`;

const Overlay = styled(Container)`
	background: ${({theme}) => hexToRgba(theme.p0, 60)};
	pointer-events: all;
	${({theme, visible}) => visible ? theme.animation.fade : theme.animation.fadeOut};
`;

const StyledCard = styled(Card)`
	width: 400px;
	min-height: 200px;
	padding: 0;
	pointer-events: all;
	display: flex;
	flex-direction: column;
	position: relative;
	${({theme, visible}) => visible ? theme.animation.fadeDown : theme.animation.fadeUpExit};
`;

const Header = styled.div`
	width: 100%;
	height: 50px;
	box-sizing: border-box;
	padding: 20px;
`;

const Footer = styled.div`
	width: 100%;
	border-top: 1px solid ${({theme}) => theme.p100};
	height: 50px;
	display: flex;
	align-items: center;
	justify-content: flex-end;
	box-sizing: border-box;
	padding: 0 20px;
`;

const Content = styled.div`
	flex: 1;
	width: 100%;
	box-sizing: border-box;
	padding: 20px;
`;

const StyledButton = styled(Button)`
	margin-left: 10px;
`;

const Title = styled.div`
	${({theme}) => theme.text.subHeadline};
`;

const CloseIcon = styled.div`
	position: absolute;
	top: 20px;
	right: 20px;
	cursor: pointer;
	
  width: 12px;
  height: 12px;
  overflow: hidden;
  
  &:hover {
    &::before, &::after {
      background: ${({theme}) => theme.p500};
    }
  }

  &::before, &::after {
    content: '';
    position: absolute;
    height: 2px;
    width: 100%;
    top: 50%;
    left: 0;
    margin-top: -1px;
    background: ${({theme}) => theme.p300};
  }
  
  &::before {
  	transform: rotate(45deg);
  }
  
  &::after {
    transform: rotate(-45deg);
  }
  
  &::before, &::after {
		height: 1px;
	}
`;