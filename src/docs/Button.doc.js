import React from 'react';
import styled from 'styled-components';
import Highlight from 'react-highlight-js';

// components
import Base from './Base';
import Button from '../components/base/Button';

const snippet = `
import { Button } from 'app-components';

const MyComponent = ({ onClick }) => (
  <Button onClick={onClick}>
    Click Me
  </Button>
);
`;

const ButtonDoc = () => {
	const title = 'button';
	const description = 'Button component.';
	
	return (
		<Base title={title} description={description} name="Button">
			<Highlight language="javascript">{snippet}</Highlight>
			<Preview>
				<Button onClick={() => null}>Default</Button>
				<Button small onClick={() => null}>Small</Button>
				<Button secondry onClick={() => null}>Secondary</Button>
				<Button secondary small onClick={() => null}>Small secondary</Button>
				<Button round onClick={() => null}>+</Button>
				<Button secondary small round onClick={() => null}>+</Button>
			</Preview>
		</Base>
	);
};

export default ButtonDoc;

const Preview = styled.div`
	width: 100%;
	margin: 10px 0;
	display: flex;
	align-items: center;
	justify-content: space-evenly;
`;