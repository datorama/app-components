import React from 'react';
import styled from 'styled-components';
import {hexToRgba} from '../components/utils';
import Highlight from 'react-highlight-js';

// components
import Base from './Base';
import {Container, Row, Col} from '../components/index';

const auto = `
// auto column size
const MyComp = () => (
  <Container>
    <Row>
      <Col>...</Col>
      <Col>...</Col>
    </Row>
  </Container>
);
`;

const nested = `
// nested rows
const MyComp = () => (
  <Container>
    <Row>
      <Col>
        <Row>
          <Col />
          <Col />
          <Col />
        </Row>
      </Col>
    </Row>
  </Container>
);
`;

const withSize = `
// with column size
const MyComp = () => (
  <Container>
    <Row>
      <Col size={8}>...</Col>
      <Col size={4}>...</Col>
    </Row>
  </Container>
);
`;

const withOffset = `
// column offset
const MyComp = () => (
  <Container>
    <Row>
      <Col size={4} offset={4}>...</Col>
      <Col size={4}>...</Col>
    </Row>
  </Container>
);
`;

const dist = `
/* column distribution (flex-start, center, flex-end, space-between, space-evenly, space-around) */
const MyComp = () => (
  <Container>
    <Row justify="space-evenly">
      <Col size={4} offset={4}>...</Col>
      <Col size={4}>...</Col>
    </Row>
  </Container>
);
`;

const breakpoint = `
/*
  the default break points are -
  xsmall : [max 576]
  small  : [max 768px]
  medium : [max 992]
  large  : [max 1200]
  xlarge : [min 1200]
*/
const MyComp = () => (
  <Container medium={800}>
    ...
  </Container>
);
`;

const Layout = () => {
	const title = 'layout';
	const description = 'The App-components responsive layout grid adapts to screen size and orientation, ensuring consistency across layouts. The grid creates visual consistency between layouts while allowing flexibility across a wide variety of designs. App-components Design’s responsive UI is based on a 12-column grid layout.';
	
	return (
		<Base title={title} description={description}>
			<Subheadline>auto width</Subheadline>
			<Highlight language="javascript">{auto}</Highlight>
			<StyledContainer>
				<Row>
					<Col><Box/></Col>
					<Col><Box/></Col>
				</Row>
				
				<Row>
					<Col><Box/></Col>
					<Col><Box/></Col>
					<Col><Box/></Col>
				</Row>
			</StyledContainer>
			
			<Subheadline>column sizes</Subheadline>
			<Highlight language="javascript">{withSize}</Highlight>
			<StyledContainer>
				<Row>
					<Col size={2}><Box>2</Box></Col>
					<Col size={10}><Box>10</Box></Col>
				</Row>
				
				<Row>
					<Col size={4}><Box>4</Box></Col>
					<Col size={8}><Box>8</Box></Col>
				</Row>
				
				<Row>
					<Col size={6}><Box>6</Box></Col>
					<Col size={6}><Box>6</Box></Col>
				</Row>
				
				<Row>
					<Col size={8}><Box>8</Box></Col>
					<Col size={4}><Box>4</Box></Col>
				</Row>
				
				<Row>
					<Col size={10}><Box>10</Box></Col>
					<Col size={2}><Box>2</Box></Col>
				</Row>
			</StyledContainer>
			
			<Subheadline>offset</Subheadline>
			<Highlight language="javascript">{withOffset}</Highlight>
			<StyledContainer>
				<Row>
					<Col size={4} offset={2}><Box>size 4 offset 2</Box></Col>
					<Col size={4}><Box>4</Box></Col>
				</Row>
				<Row>
					<Col size={4} offset={4}><Box>size 4 offset 4</Box></Col>
					<Col size={4}><Box>4</Box></Col>
				</Row>
				<Row>
					<Col size={2} offset={6}><Box>size 2 offset 6</Box></Col>
					<Col size={4}><Box>4</Box></Col>
				</Row>
			</StyledContainer>
			
			<Subheadline>distribution</Subheadline>
			<Highlight language="javascript">{dist}</Highlight>
			<StyledContainer>
				<Row>
					<Col size={2}><Box>2</Box></Col>
					<Col size={2}><Box>2</Box></Col>
					<Col size={2}><Box>2</Box></Col>
				</Row>
				<Row justify="center">
					<Col size={2}><Box>2</Box></Col>
					<Col size={2}><Box>2</Box></Col>
					<Col size={2}><Box>2</Box></Col>
				</Row>
				<Row justify="flex-end">
					<Col size={2}><Box>2</Box></Col>
					<Col size={2}><Box>2</Box></Col>
					<Col size={2}><Box>2</Box></Col>
				</Row>
				<Row justify="space-evenly">
					<Col size={2}><Box>2</Box></Col>
					<Col size={2}><Box>2</Box></Col>
					<Col size={2}><Box>2</Box></Col>
				</Row>
			</StyledContainer>
			
			<Subheadline>nested grids</Subheadline>
			<Highlight language="javascript">{nested}</Highlight>
			<StyledContainer>
				<Row>
					<Col>
						<Label>level 1</Label>
						<Box>
							<Row>
								<Col size={4}><Label>level 2</Label><Box dark>4</Box></Col>
								<Col size={4}><Label>level 2</Label><Box dark>4</Box></Col>
								<Col size={4}><Label>level 2</Label><Box dark>4</Box></Col>
							</Row>
						</Box>
					</Col>
					<Col>
						<Label>level 1</Label>
						<Box>
							<Row>
								<Col size={4}><Label>level 2</Label><Box dark>4</Box></Col>
								<Col size={4}><Label>level 2</Label><Box dark>4</Box></Col>
								<Col size={4}><Label>level 2</Label><Box dark>4</Box></Col>
							</Row>
						</Box>
					</Col>
				</Row>
			</StyledContainer>
			
			<Subheadline>break points</Subheadline>
			<Highlight language="javascript">{breakpoint}</Highlight>
		</Base>
	);
};

export default Layout;

const StyledContainer = styled(Container)`
	background: ${({theme}) => theme.p0};
	margin: 20px 0;
`;

const Box = styled.div`
	width: 100%;
	min-height: 40px;
  background: ${({theme, dark}) => hexToRgba(dark ? theme.p100 : theme.p50, 80)};
  display: flex;
  align-items: center;
  justify-content: center;
  ${({theme}) => theme.text.sm};
`;

const Label = styled.div`
	${({theme}) => theme.text.sm};
	margin-bottom: 10px;
`;

const Subheadline = styled.div`
	width: 100%;
	${({theme}) => theme.text.subHeadline};
	text-transform: capitalize;
`;