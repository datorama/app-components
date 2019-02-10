import React from 'react';
import styled from 'styled-components';
import Highlight from 'react-highlight-js';

// components
import Base from './Base';
import Pagination from '../components/base/Pagination';
import {Row, Col} from '../components/index';

const snippet = `
import { Pagination } from 'app-components';

const MyComp = () => (
  <div>
    <Pagination />
  </div>
);
`;

export default class PaginationDoc extends React.Component {
	state = {
		selected: 1
	};
	
	setSelected = selected => this.setState({selected});
	
	render() {
		const {selected} = this.state;
		const title = 'pagination';
		const description = 'pagination.';
		
		return (
			<Base title={title} description={description} name="Pagination">
				<Row align="stretch">
					<Col>
						<Highlight language="javascript">{snippet}</Highlight>
					</Col>
					<Col>
						<Box>
							<Pagination
								total={10}
								selected={selected}
								onChange={this.setSelected}
							/>
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
	// background: ${({theme}) => theme.p50};
`;