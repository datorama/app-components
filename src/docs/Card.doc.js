import React from 'react';
import styled from 'styled-components';
import Highlight from 'react-highlight-js';

// components
import Base from './Base';
import Card from '../components/base/Card';
import {Row, Col} from '../components/index';

const snippet = `
// inside a component
import { Card } from 'app-components';

const MyComp = () => (<Card>...</Card>);
`;

const clickable = `
// inside a component
import { Card } from 'app-components';

const MyComp = () => (<Card clickable>...</Card>);
`;

const CardDoc = () => {
	const title = 'card';
	const description = 'card. tile';
	
	return (
		<Base title={title} description={description} name="Card">
			<Row>
				<Col>
					<Highlight language="javascript">{snippet}</Highlight>
				</Col>
				<Col>
					<Card>
						<Inner>sample card content</Inner>
					</Card>
				</Col>
			</Row>
			
			<Row>
				<Col>
					<Highlight language="javascript">{clickable}</Highlight>
				</Col>
				<Col>
					<Card clickable>
						<Inner>clickable card</Inner>
					</Card>
				</Col>
			</Row>
		</Base>
	);
};

export default CardDoc;

const Inner = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 53px;
  background: ${({theme}) => theme.p100};
  ${({theme}) => theme.text.p};
`;