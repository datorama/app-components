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
		
			<Button label="Small Button" small onClick={() => null} />
		</Base>
	);
};

export default ButtonDoc;