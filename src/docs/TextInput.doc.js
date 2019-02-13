import React from 'react';
import styled from 'styled-components';
import Highlight from 'react-highlight-js';

// components
import Base from './Base';
import TextInput from '../components/base/TextInput';
import {Row, Col} from '../components/index';

const snippet = `
import { TextInput } from 'app-components';

const MyComp = () => (
  <div>
    <TextInput />
  </div>
);
`;

const TextInputDoc = () => {
	const title = 'spinner';
	const description = 'spinner.';
	
	return (
		<Base title={title} description={description} name="TextInput">
			<Row align="stretch">
				<Col>
					<Highlight language="javascript">{snippet}</Highlight>
				</Col>
				<Col>
					<Box>
						<TextInput
							label="Label"
							placeholder="placeholder"
							required
							disabled={false}
						/>
					</Box>
				</Col>
			</Row>
		</Base>
	);
};

export default TextInputDoc;

const Box = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	border-radius: 4px;
	justify-content: center;
	background: ${({theme}) => theme.p50};
`;