import React from 'react';
import styled, {withTheme} from 'styled-components';
import Highlight from 'react-highlight-js';

// components
import Base from './Base';
import {Row, Col} from '../components/index';
import PropTable from './PropTable';
import Progress from '../components/base/Progress';
import RadialProgress from '../components/base/RadialProgress';

const snippet = `
import { Checkbox } from 'app-components';

const MyComp = () => (
  <div>
    <Progress percentage={50} label="50%"/>
  </div>
);
`;

const radialSnippet = `
import { Checkbox } from 'app-components';

const MyComp = () => (
  <div>
    <RadialProgress percentage={50} label="success"/>
  </div>
);
`;

const ProgressDoc = ({ theme }) => {
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
						<Progress label="20%" percentage={20} color={theme.a800}/>
						<Progress label="40%" percentage={30} color={theme.a700}/>
						<Progress label="60%" percentage={60} color={theme.a600}/>
						<Progress label="80%" percentage={80} color={theme.a500}/>
						<Progress label="100%" percentage={100} color={theme.a400}/>
					</Box>
				</Col>
			</Row>
			
			<Row>
				<Col>
					<PropTable compKey="Progress"/>
				</Col>
			</Row>
			
			<Row align="stretch">
				<Col>
					<Highlight language="javascript">{radialSnippet}</Highlight>
				</Col>
				
				<Col>
					<Box>
						<Row>
							<Col>
								<RadialProgress percentage={20} radius={26}/>
							</Col>
							<Col>
								<RadialProgress percentage={40} radius={26}/>
							</Col>
							<Col>
								<RadialProgress percentage={60} radius={26}/>
							</Col>
							<Col>
								<RadialProgress percentage={80} radius={26}/>
							</Col>
						</Row>
					</Box>
				</Col>
			</Row>
			
			<Row>
				<Col>
					<PropTable compKey="RadialProgress"/>
				</Col>
			</Row>
		</Base>
	);
};

export default withTheme(ProgressDoc);

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