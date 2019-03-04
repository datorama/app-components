import React from 'react';
import styled from 'styled-components';

// components
import Base from './Base';
import {Checkbox, Row, Col, Toggle} from '../components/index';
import PropTable from './PropTable';
import Snippet from './Snippet';

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

const toggleSnippet = `
import { Toggle } from 'app-components';

const MyComp = () => (
  <div>
    <Toggle
      checked
      disabled
      onClick={toggle}
      label="label"
    />
  </div>
);
`;

export default class TogglesDoc extends React.Component {
	state = {
		checked: false
	};
	
	toggle = () => this.setState(prevState => ({checked: !prevState.checked}));
	
	render() {
		const title = 'toggles';
		const description =
			'Selection controls allow users to complete tasks that involve making choices such as selecting options, or switching settings on or off. Selection controls are found on screens that ask users to make decisions or declare preferences such as settings or dialogs.';
		const {checked} = this.state;
		
		return (
			<Base title={title} description={description}>
				<Row align="stretch">
					<Col>
						<Snippet snippet={snippet}/>
					</Col>
					
					<Col>
						<Box>
							<Checkbox
								onClick={this.toggle}
								checked={checked}
								label="default"
							/>
							<Checkbox
								onClick={this.toggle}
								checked={checked}
								partial
								label="default"
							/>
							<Checkbox
								onClick={this.toggle}
								checked={checked}
								disabled
								label="disabled"
							/>
							<Checkbox
								onClick={this.toggle}
								checked
								disabled
								label="disabled"
							/>
							<Checkbox
								onClick={this.toggle}
								checked={checked}
								round
								label="round"
							/>
							<Checkbox
								onClick={this.toggle}
								checked={checked}
								disabled
								round
								label="round disabled"
							/>
						</Box>
					</Col>
				</Row>
				
				<StyledRow>
					<Col size={6}>
						<PropTable compKey="Checkbox"/>
					</Col>
				</StyledRow>
				
				<Row align="stretch">
					<Col>
						<Snippet snippet={toggleSnippet}/>
					</Col>
					
					<Col>
						<Box>
							<Toggle onClick={this.toggle} checked={checked} label="default"/>
							<Toggle
								onClick={this.toggle}
								checked={checked}
								label="default"
								disabled
							/>
							<Toggle onClick={this.toggle} checked={checked} label="default"/>
							<Toggle onClick={this.toggle} checked={checked} label="default"/>
							<Toggle onClick={this.toggle} checked={checked} label="default"/>
						</Box>
					</Col>
				</Row>
				
				<StyledRow>
					<Col size={6}>
						<PropTable compKey="Toggle"/>
					</Col>
				</StyledRow>
			</Base>
		);
	}
}

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

const StyledRow = styled(Row)`
  margin-bottom: 40px;
`;
