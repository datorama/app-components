import React from 'react';
import styled from 'styled-components';
import Highlight from 'react-highlight-js';

// components
import Base from './Base';
import Card from '../components/base/Card';

const snippet = `
// inside a component
import { Card } from 'app-components';

const MyComp = () => (<Card clickable>>...</Card>);
`;

const CardDoc = () => {
	const title = 'card';
	const description = 'card. tile';
	
	return (
		<Base title={title} description={description} name="Card">
			<Highlight language="javascript">{snippet}</Highlight>
			
			<Card clickable>
				<Inner>sample card content</Inner>
			</Card>
		</Base>
	);
};

export default CardDoc;

const Inner = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 200px;
  background: ${({theme}) => theme.p100};
  ${({theme}) => theme.text.p};
`;