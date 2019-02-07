import React from 'react';
import styled from 'styled-components';
import {lightTheme} from '../components/index';

// components
import Base from './Base';

const Layout = () => {
	const title = 'layout';
	const description = 'The App-components responsive layout grid adapts to screen size and orientation, ensuring consistency across layouts. The grid creates visual consistency between layouts while allowing flexibility across a wide variety of designs. App-components Design’s responsive UI is based on a 12-column grid layout.';
	
	return (
		<Base title={title} description={description}>
			<Row>
				<Col size={2}><Box>size 2</Box></Col>
				<Col size={10}><Box>size 10</Box></Col>
			</Row>
			
			<Row>
				<Col size={4}><Box>size 4</Box></Col>
				<Col size={8}><Box>size 8</Box></Col>
			</Row>
			
			<Row>
				<Col size={6}><Box>size 6</Box></Col>
				<Col size={6}><Box>size 6</Box></Col>
			</Row>
			
			<Row>
				<Col size={8}><Box>size 8</Box></Col>
				<Col size={4}><Box>size 4</Box></Col>
			</Row>
			
			<Row>
				<Col size={10}><Box>size 10</Box></Col>
				<Col size={2}><Box>size 2</Box></Col>
			</Row>
		</Base>
	);
};

export default Layout;

const Row = styled.div`
  display: flex;
  margin: 10px 0;
`;

const Col = styled.div`
  flex: ${({size}) => size};
  margin: 0 5px;
`;

const Box = styled.div`
  width: 100%;
  height: 40px;
  background: ${lightTheme.p50};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  color: ${lightTheme.p400};
`;