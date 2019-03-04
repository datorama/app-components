import React from 'react';
import styled from 'styled-components';

// components
import Base from './Base';
import {Row, Col} from '../components/index';
import Snippet from './Snippet';

const snippet = `npm i --save git+ssh://git@github.com/datorama/app-components.git`;

const theme = `
  import { AppTheme, lightTheme } from 'app-components';
  import {ThemeProvider} from 'styled-components';
  
  const App = () => (
    <AppTheme theme={lightTheme} provider={ThemeProvider}>
     ...app main
    </AppTheme>
  );
`;

const components = `
  import { Button } from 'app-components';
  
  const MyComp = ({ handleClick }) => (
    <div>
     ...your comp
     <Button onClick={handleClick}>click here</Button>
    <div>
  );
`;

const styling = `
  // add to your css file -
  // @import '~app-components/dist/index.css';

  const MyComp = styled.div'
    // typography
    $\{({ theme }) => theme.text.smLink};
    
    // animations
    $\{({ theme }) => theme.animation.fadeLeft};
    
    // colors
    color: $\{({ theme }) => theme.p400};
  ';
`;

const GettingStarted = () => {
	const title = 'Getting started';
	const description = '';
	
	return (
		<Base title={title} description={description}>
			<Row align="stretch">
				<Col>
					<Title>Setup</Title>
				</Col>
			</Row>
			
			<Row align="stretch">
				<Col>
					<Snippet snippet={snippet}/>
				</Col>
			</Row>
			
			<Row align="stretch">
				<Col>
					<Snippet snippet={theme}/>
				</Col>
			</Row>
			
			<Row align="stretch">
				<Col>
					<Title>Components example</Title>
				</Col>
			</Row>
			
			<Row align="stretch">
				<Col>
					<Snippet snippet={components}/>
				</Col>
			</Row>
			
			<Row align="stretch">
				<Col>
					<Title>Styling example</Title>
				</Col>
			</Row>
			
			<Row align="stretch">
				<Col>
					<Snippet snippet={styling}/>
				</Col>
			</Row>
		</Base>
	);
};

export default GettingStarted;

const Title = styled.div`
  ${({theme}) => theme.text.subHeadline};
`;
