import React, {Component, Fragment} from 'react';
import styled, {css} from 'styled-components';
import PropTypes from 'prop-types';

// components
import {ReactComponent as NotifIcon} from '../assets/notif.svg';


class Notifications extends Component {
	static propTypes = {};
	
	state = {
		leaving: [],
		list: [
			{
				id: 0,
				title: 'notification',
				subtitle: 'notification subtitle'
			}
		]
	};
	
	addNotification = () => {
		const id = Math.random();
		
		this.setState({
			list: [
				...this.state.list,
				{id, title: 'untitled', subtitle: 'notification subtitle'}
			]
		})
	};
	
	clearNotification = id => () => {
		this.setState({
			leaving: [id]
		}, () => {
			setTimeout(() => {
				this.setState({list: this.state.list.filter(notif => notif.id !== id)});
			}, 500);
		})
	};
	
	render() {
		const {list, leaving} = this.state;
		
		return (
			<Fragment>
				{list.map(({id, title, subtitle}, index) => (
					<Notification
						key={`notif-${id}`}
						top={index * 80}
						leaving={leaving.includes(id)}
					>
						<CloseIcon onClick={this.clearNotification(id)}/>
						<StyledIcon/>
						<Meta>
							<Title>{title}</Title>
							<Subtitle>{subtitle}</Subtitle>
						</Meta>
					</Notification>
				))}
				
				<div onClick={this.addNotification}>ADD NOTIFICATION</div>
			</Fragment>
		);
	}
}

export default Notifications;

const Notification = styled.div`
	position: fixed;
	width: 360px;
	height: 70px;
	background: ${({theme}) => theme.p0};
	border-radius: 4px;
	box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
	box-sizing: border-box;
	padding: 12px;
	transition: all 1000ms;
	right: 20px;
	top: ${({top}) => `${20 + top}px`};
	z-index: 10;
	${({theme, leaving}) => leaving ? theme.animation.fadeRightExit : theme.animation.fadeLeft};
	display: flex;
`;

const Meta = styled.div`
	flex-direction: column;
	display: flex;
`;

const Title = styled.div`
	${({theme}) => theme.text.pBold};
	height: 22px;
	display: flex;
	align-items: center;
`;

const Subtitle = styled.div`
	${({theme}) => theme.text.smNote};
`;

const StyledIcon = styled(NotifIcon)`
	width: 26px;
	height: 26px;
	margin-right: 4px;
	
	path {
		fill: ${({theme}) => theme.p300};
	}
`;

const CloseIcon = styled.div`
	position: absolute;
	top: 15px;
	right: 15px;
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