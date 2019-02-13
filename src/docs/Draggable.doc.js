import React from 'react';
import styled from 'styled-components';
import Highlight from 'react-highlight-js';

// components
import Base from './Base';
import Draggable from '../components/base/Draggable';
import {Row, Col} from '../components/index';

const snippet = `
import { Draggable } from 'app-components';

const MyComp = () => (
  <div>
    <Draggable>
      <CustomComp />
    </Draggable>
  </div>
);
`;

const DraggableDoc = () => {
	const title = 'spinner';
	const description = 'spinner.';
	
	return (
		<Base title={title} description={description} name="Draggable">
			<Row align="stretch">
				<Col>
					<Highlight language="javascript">{snippet}</Highlight>
				</Col>
				<Col>
					<Box>
						<Draggable>
							<Circle/>
						</Draggable>
					</Box>
				</Col>
			</Row>
		</Base>
	);
};

export default DraggableDoc;

const Box = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	border-radius: 4px;
	justify-content: center;
	background: ${({theme}) => theme.p50};
`;

const Circle = styled.div`
	background: ${({theme}) => theme.p400};
	width: 50px;
	height: 50px;
	border-radius: 50%;
`;