import React, {Component, Fragment} from 'react';
import styled from 'styled-components';
import {throttle} from 'lodash/fp';
import PropTypes from 'prop-types';

// assets
import {ReactComponent as InfoIcon} from '../assets/info-line.svg';
import {ReactComponent as WarningIcon} from '../assets/warning-line.svg';
import {ReactComponent as SuccessIcon} from '../assets/success-line.svg';

// shared context
const Context = React.createContext();
const Consumer = Context.Consumer;
export const withToast = Comp => props => (
	<Consumer>
		{({addToast}) => (
			<Comp {...props} addToast={addToast}/>
		)}
	</Consumer>
);

class Toasts extends Component {
	static propTypes = {};
	
	state = {
		leaving: [],
		list: []
	};
	
	addToast = throttle(200, notif => {
		const id = Math.random();
		
		this.setState({
			list: [
				...this.state.list,
				{id, ...notif}
			]
		}, () => {
			setTimeout(() => {
				this.clearToast(id)();
			}, notif.timeout || 5000);
		})
	});
	
	clearToast = id => () => {
		this.setState({
			leaving: [id]
		}, () => {
			setTimeout(() => {
				this.setState({list: this.state.list.filter(notif => notif.id !== id)});
			}, 500);
		})
	};
	
	icon = type => {
		switch (type) {
			case 'info':
				return <StyledInfoIcon/>;
			
			case 'success':
				return <StyledSuccessIcon/>;
			
			case 'warning':
				return <StyledWarningIcon/>;
			
			default:
				return null;
		}
	};
	
	render() {
		const {list, leaving} = this.state;
		const {children} = this.props;
		const contextActions = {
			addToast: this.addToast
		};
		
		return (
			<Context.Provider value={contextActions}>
				<Fragment>
					{list.map(({id, title, subtitle, type}, index) => (
						<Toast
							key={`notif-${id}`}
							top={index * 80}
							leaving={leaving.includes(id)}
						>
							<CloseIcon onClick={this.clearToast(id)}/>
							{this.icon(type)}
							<Meta>
								<Title>{title}</Title>
								<Subtitle>{subtitle}</Subtitle>
							</Meta>
						</Toast>
					))}
					{children}
				</Fragment>
			</Context.Provider>
		);
	}
}

export default Toasts;

const Toast = styled.div`
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

const StyledInfoIcon = styled(InfoIcon)`
	width: 26px;
	height: 26px;
	margin-right: 4px;
	
	path {
		//fill: ${({theme}) => theme.p300};
	}
`;

const StyledWarningIcon = styled(WarningIcon)`
	width: 26px;
	height: 26px;
	margin-right: 4px;
	
	path {
		//fill: ${({theme}) => theme.p300};
	}
`;

const StyledSuccessIcon = styled(SuccessIcon)`
	width: 26px;
	height: 26px;
	margin-right: 4px;
	
	path {
		//fill: ${({theme}) => theme.p300};
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