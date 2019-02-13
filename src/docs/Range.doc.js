import React from 'react';
import styled, {withTheme} from 'styled-components';
import Highlight from 'react-highlight-js';

// components
import Base from './Base';
import Range from '../components/base/Range';
import {Row, Col} from '../components/index';

const snippet = `
import { Range } from 'app-components';

const MyComp = () => (
  <div>
    <Range />
  </div>
);
`;

const RangeDoc = props => {
	const title = 'range';
	const description = 'range.';
	
	return (
		<Base title={title} description={description} name="Spinner">
			<Row align="stretch">
				<Col>
					<Highlight language="javascript">{snippet}</Highlight>
				</Col>
				<Col>
					<Box>
						<Range/>
					</Box>
				</Col>
			</Row>
		</Base>
	);
};

export default withTheme(RangeDoc);

const Box = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	border-radius: 4px;
	justify-content: center;
	box-sizing: border-box;
	padding: 40px;
	background: ${({theme}) => theme.p50};
`;