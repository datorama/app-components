import React from 'react';
import styled from 'styled-components';
import Highlight from 'react-highlight-js';

// components
import Base from './Base';
import Modal from '../components/base/Modal';
import Button from '../components/base/Button';
import {Row, Col} from '../components/index';

const snippet = `
import { Modal } from 'app-components';

const MyComp = ({ modalOpen, toggleOpen ) => (
  <div>
    ...
    <Modal
      open={modalOpen}
      toggleOpen={toggleOpen}
      title="Modal Example"
      buttons={[
      	{ type: 'secondary', label: 'cancel', onClick: toggleOpen},
      	{ label: 'submit', onClick: doSomething}
      ]}
    >
      ...
    </Modal>
  </div>
);
`;

export default class ModalDoc extends React.Component {
	state = {
		modalOpen: false
	};
	
	toggleOpen = () => this.setState(prevState => ({modalOpen: !prevState.modalOpen}));
	
	render() {
		const {modalOpen} = this.state;
		const title = 'modal';
		const description = 'modal';
		
		return (
			<Base title={title} description={description} name="Modal">
				<Modal
					open={modalOpen}
					toggleOpen={this.toggleOpen}
					title="Modal Example"
					buttons={[
						{ type: 'secondary', label: 'cancel', onClick: null},
						{ label: 'submit', onClick: null}
					]}
				>
					<Text>
						Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolores et exercitationem ratione saepe sit. Alias consectetur delectus dolore ducimus ea eveniet hic neque praesentium reiciendis ut? Accusantium ad consequuntur fugiat.
					</Text>
				</Modal>
				<Row align="stretch">
					<Col>
						<Highlight language="javascript">{snippet}</Highlight>
					</Col>
					<Col>
						<Box>
							<Button onClick={this.toggleOpen}>Open modal</Button>
						</Box>
					</Col>
				</Row>
			</Base>
		);
	}
}

const Box = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	border-radius: 4px;
	justify-content: center;
	background: ${({theme}) => theme.p50};
`;

const Text = styled.div`
	${({theme}) => theme.text.p};
`;