import React, {Component} from 'react';
import styled, {withTheme} from 'styled-components';

// components
import Base from './Base';
import {Row, Col, Tabs} from '../components/index';
import Snippet from './Snippet';

const snippet = `
import { Tabs } from '../components/index';

const MyComp = ({ selected, handleSelect, contentRenderer, tabs }) => (
  <Tabs
    onSelect={handleSelect}
    selectedIndex={selected}
    contentRenderer={contentRenderer}
    tabs={tabs}
  />
);
`;

class TabsDoc extends Component {
	state = {
		selected: 0
	};
	
	render() {
		const title = 'tabs';
		const description = 'Tabs organize and allow navigation between groups of content that are related and at the same level of hierarchy.';
		const {selected} = this.state;
		
		return (
			<Base title={title} description={description} name="Tabs">
				<Row align="stretch">
					<Col>
						<Snippet snippet={snippet}/>
					</Col>
					<Col>
						<Box>
							<Tabs
								justify="flex-start"
								onSelect={selected => this.setState({selected})}
								tabs={[
									{id: 0, label: 'Explore'},
									{id: 1, label: 'Filters'},
									{id: 2, label: 'Summary'}
								]}
								selectedIndex={selected}
								contentRenderer={tab => (
									<Content>
										Content for tab {tab.label} - {tab.id}
									</Content>
								)}
							/>
						</Box>
					</Col>
				</Row>
			</Base>
		);
	}
}

export default withTheme(TabsDoc);

const Box = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  border-radius: 4px;
  justify-content: center;
`;

const Content = styled.div`
  ${({theme}) => theme.text.p};
`;
