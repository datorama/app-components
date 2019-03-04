import React from 'react';
import styled from 'styled-components';

// components
import Base from './Base';
import {Row, Col, hexToRgba, Pagination} from '../components/index';
import Snippet from './Snippet';

const snippet = `
import { Pagination } from 'app-components';

const MyComp = ({ fetchData }) => (
  <div>
    <Pagination
    	max={4}
    	total={256}
    	onChange={fetchData}
    />
  </div>
);
`;

const snippetSmall = `
import { Pagination } from 'app-components';

const MyComp = ({ fetchData }) => (
  <div>
    <Pagination
    	max={6}
    	total={6}
    	onChange={fetchData}
    />
  </div>
);
`;

export default class PaginationDoc extends React.Component {
	render() {
		const title = 'pagination';
		const description = 'pagination.';
		
		return (
			<Base title={title} description={description} name="Pagination">
				<Row align="stretch">
					<Col>
						<Snippet snippet={snippet}/>
					</Col>
					<Col>
						<Box>
							<Pagination total={256} max={4} onChange={e => console.log(e)}/>
						</Box>
					</Col>
				</Row>
				
				<Row align="stretch">
					<Col>
						<Snippet snippet={snippetSmall}/>
					</Col>
					<Col>
						<Box>
							<Pagination total={6} max={10} onChange={e => console.log(e)}/>
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
  background: ${({theme}) => hexToRgba(theme.p50, 30)};
`;
