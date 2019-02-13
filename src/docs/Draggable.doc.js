import React from 'react';
import styled from 'styled-components';
import Highlight from 'react-highlight-js';

// components
import Base from './Base';
import Draggable from '../components/base/Draggable';
import {Row, Col} from '../components/index';

const snippet = `
import { Draggable } from 'app-components';

const MyComp = ({ handleDrag }) => (
  <div>
    <Draggable onDrag={handleDrag}>
      <CustomComp />
    </Draggable>
  </div>
);
`;

class DraggableDoc extends React.Component {
	state = {
		translateX: 0,
		translateY: 0
	};
	
	handleDrag = ({translateX, translateY}) => this.setState({translateX, translateY});
	
	handleDragEnd = () => this.setState({
		translateX: 0,
		translateY: 0
	});
	
	render() {
		const {translateX, translateY} = this.state;
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
							<Draggable
								onDrag={this.handleDrag}
								onDragEnd={this.handleDragEnd}
							>
								<Circle translateX={translateX} translateY={translateY}/>
							</Draggable>
						</Box>
					</Col>
				</Row>
			</Base>
		);
	}
}

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

const Circle = styled.div.attrs({
	style: ({translateX, translateY}) => ({
		transform: `translate(${translateX}px, ${translateY}px)`
	}),
})`
	background: ${({theme}) => theme.p300};
	width: 40px;
	height: 40px;
	border-radius: 50%;
`;