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

const MyComp = () => (
  <div>
    <Progress percentage={50} label="50%"/>
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
						<Progress label="20%" percentage={20} color="#d34848"/>
						<Progress label="40%" percentage={30} color="#ff5733"/>
						<Progress label="60%" percentage={60} color="#ffc300"/>
						<Progress label="80%" percentage={80} color="#20716a"/>
						<Progress label="100%" percentage={100} color="#23a393"/>
					</Box>
				</Col>
			</Row>
			
			<Row>
				<Col>
					<PropTable compKey="Progress"/>
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