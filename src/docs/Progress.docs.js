import React from 'react';
import styled from 'styled-components';
import Highlight from 'react-highlight-js';

// components
import Base from './Base';
import {Row, Col} from '../components/index';
import PropTable from './PropTable';
import Progress from '../components/base/Progress';

const snippet = `
import { Checkbox } from 'app-components';

const MyComp = ({ toggle }) => (
  <div>
    <Checkbox
      checked
      disabled
      onClick={toggle}
      label="label"
      round
      partial
    />
  </div>
);
`;

const ProgressDoc = () => {
	const title = 'progress';
	const description = 'preogress..';
	
	return (
		<Base title={title} description={description}>
			
			<Row align="stretch">
				<Col>
					<Highlight language="javascript">{snippet}</Highlight>
				</Col>
				
				<Col>
					<Box>
						<Progress label="20%" percentage={20}/>
						<Progress label="40%" percentage={30}/>
						<Progress label="60%" percentage={60}/>
						<Progress label="80%" percentage={80}/>
						<Progress label="100%" percentage={100}/>
					</Box>
				</Col>
			</Row>
		</Base>
	);
};

export default ProgressDoc;

const Box = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	border-radius: 4px;
	box-sizing: border-box;
	padding: 40px;
	justify-content: space-evenly;
	background: ${({theme}) => theme.p50};
`;