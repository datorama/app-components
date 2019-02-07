import React, {Component, Fragment} from 'react';
import styled, {css, ThemeProvider} from 'styled-components';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {withRouter} from 'react-router';
import {lightTheme, darkTheme} from './components';

// docs
import Home from './docs/Home.doc';

import Colors from './docs/Colors.doc';
import Layout from './docs/Layout.doc';
import Datepicker from './docs/Datepicker.doc';
import ClickOut from './docs/ClickOut.doc';
import Typography from './docs/Typography.doc';
import Button from './docs/Button.doc';
import Animations from './docs/Animations';
import Card from './docs/Card.doc';

const Navigation = ({list, history}) => (
	<Fragment>
		<Header>
			<Title onClick={() => history.push('/')}>
				Apps design system
			</Title>
		</Header>
		<Menu>
			{
				list.map(({key, label, type, path}) => (
					<MenuItem
						key={key}
						type={type}
						onClick={() => history.push(`/${path}`)}
					>
						{label}
					</MenuItem>
				))
			}
		</Menu>
	</Fragment>
);

const ConnectedNavigation = withRouter(Navigation);

class App extends Component {
	state = {
		light: true
	};
	
	toggleTheme = () => this.setState(prevState => ({light: !prevState.light}));
	
	render() {
		const {light} = this.state;
		
		const list = [
			{key: 'colors', label: 'colors', path: 'colors'},
			{key: 'typography', label: 'typography', path: 'typography'},
			{key: 'layout', label: 'layout', path: 'layout'},
			{key: 'animations', label: 'animations', path: 'animations'},
			
			{key: 'components', label: 'components', type: 'title'},
			{key: 'button', label: 'button', path: 'button'},
			{key: 'card', label: 'card', path: 'card'},
			{key: 'dialog', label: 'dialog'},
			{key: 'switch', label: 'switch'},
			{key: 'progress', label: 'progress'},
			{key: 'snackbar', label: 'snackbar'},
			{key: 'stepper', label: 'stepper'},
			{key: 'tooltip', label: 'tooltip'},
			{key: 'range-input', label: 'range input'},
			{key: 'text-input', label: 'text-input'},
			{key: 'tabs', label: 'tabs'},
			{key: 'collapse', label: 'collapse'},
			{key: 'table', label: 'table'},
			{key: 'list', label: 'list'},
			{key: 'select', label: 'select'},
			{key: 'date-picker', label: 'date picker', path: 'datepicker'},
			{key: 'carousel', label: 'carousel'},
			{key: 'pagination', label: 'pagination'},
			{key: 'widget', label: 'widget'},
			
			{key: 'utils', label: 'utils', type: 'title'},
			{key: 'click-out', label: 'click out', path: 'click-out'},
			{key: 'popup', label: 'popup'}
		];
		
		const theme = light ? lightTheme : darkTheme;
		
		return (
			<Router>
				<ThemeProvider theme={theme}>
					<Container>
						<Sidebar light={light}>
							<ConnectedNavigation list={list}/>
						</Sidebar>
						
						<ThemeButton onClick={this.toggleTheme}><DropIcon/></ThemeButton>
						
						<Content light={light}>
							<Route exact path="/" component={Home}/>
							<Route exact path="/colors" component={Colors}/>
							<Route exact path="/typography" component={Typography}/>
							<Route exact path="/layout" component={Layout}/>
							<Route exact path="/animations" component={Animations}/>
							
							<Route exact path="/button" component={Button}/>
							<Route exact path="/datepicker" component={Datepicker}/>
							<Route exact path="/card" component={Card}/>
							
							<Route exact path="/click-out" component={ClickOut}/>
						</Content>
					</Container>
				</ThemeProvider>
			</Router>
		);
	}
}

export default App;

const Container = styled.div`
  width: 100vw;
  min-height: 100vh;
  display: flex;
  justify-content: space-between;
  user-select: none;
`;

const Sidebar = styled.div`
  width: 300px;
  height: 100vh;
  background: #fff;
  box-sizing: border-box;
  border-right: 1px solid #eeeeee;
  padding: 40px;
  position: fixed;
  top: 0;
  left: 0;
  transition: all 300ms;
  
  ${({light}) => !light && css`
		background: #272727;
		border-color: #404040;
	`};
`;

const Content = styled.div`
  width: 100vw;
  min-height: 100vh;
  box-sizing: border-box;
  padding: 40px 40px 40px 340px;
  transition: all 300ms;
  background: #fff;
  
  ${({light}) => !light && css`
		background: #272727;
	`};
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 30px;
`;

const Title = styled.div`
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 5px;
  color: ${({theme}) => theme.p400};
  cursor: pointer;
`;

const Menu = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const MenuItem = styled.div`
  width: 100%;
  font-size: 14px;
  font-weight: 400;
  color: ${lightTheme.p300};
  margin: 5px 0;
  text-transform: capitalize;
  cursor: pointer;
  transition: all 300ms;
  
  ${({type}) => type === 'title' && css`
		font-weight: 700;
		color: ${lightTheme.p400};
		margin: 20px 0 5px 0;
		cursor: default;
		pointer-events: none;
	`}
  
  &:hover {
    color: ${lightTheme.a400};
  }
`;

const ThemeButton = styled.div`
	position: fixed;
	top: 20px;
	right: 20px;
	z-index: 1;
	width:40px;
	height: 40px;
	border-radius: 50%;
	background: #777777;
	cursor: pointer;
	display: flex;
	align-items: center;
	justify-content: center;
	transition: sll 300ms;
	box-shadow: 0 5px 20px rgba(0, 0, 0, 0);

	&:hover {
		box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
	}
`;

const DropIcon = styled.div`
	width: 30px;
	height: 30px;
	background: url(${require('./docs/assets/drop.svg')}) no-repeat;
	background-size: contain;
`;