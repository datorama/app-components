import React, {Component, Fragment} from 'react';
import styled, {css} from 'styled-components';
import PropTypes from 'prop-types';

class Notifications extends Component {
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
						onClick={this.clearNotification(id)}
						leaving={leaving.includes(id)}
					>
						<Title>{title}</Title>
						<Subtitle>{subtitle}</Subtitle>
					</Notification>
				))}
				
				<div onClick={this.addNotification}>add</div>
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
	flex-direction: column;
`;

const Title = styled.div`
	${({theme}) => theme.text.pBold};
`;

const Subtitle = styled.div`
	${({theme}) => theme.text.smNote};
`;