import React from 'react';
import styled from 'styled-components';
import Highlight from 'react-highlight-js';

// components
import Base from './Base';
import ClickOut from '../components/base/ClickOut';

const snippet = `
import { ClickOut } from 'app-components';

const MyComponent = ({ onClick }) => (
  <ClickOut onClick={onClick}>
    sample component
  </ClickOut>
);
`;

export default class ClickOutDoc extends React.Component {
	state = {
		counter: 0
	};
	
	handleClick = () => this.setState(prevState => ({counter: prevState.counter + 1}));
	
	render() {
		const {counter} = this.state;
		const title = 'click out';
		const description = 'click outside handler.';
		
		return (
			<Base title={title} description={description} name="ClickOut">
				<Highlight language="javascript">{snippet}</Highlight>
				
				<Container>
					<ClickOut onClick={this.handleClick}>
						<Card>
							<SmallTitle>Clicked {counter} times</SmallTitle>
							<div>(click outside the element)</div>
						</Card>
					</ClickOut>
				</Container>
			</Base>
		);
	}
}

const Container = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	height: 400px;
	background: ${({theme}) => theme.p50};
`;

const Card = styled.div`
	width: 400px;
	height: 200px;
	background: #fff;
	box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
	border-radius: 5px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	font-size: 14px;
	font-weight: 300;
	color: #444;
`;

const SmallTitle = styled.div`
	font-size: 14px;
	font-weight: 600;
`;