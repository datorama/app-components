import React from 'react';
import styled from 'styled-components';

// components
import Base from './Base';
import { Row, Col } from '../components/index';
import Snippet from './Snippet';

const auto = `
// auto column size
() => (
  <Container style={{ background: theme.p100 }}>
    <Row>
      <Col>
        <Box />
      </Col>
      <Col>
        <Box />
      </Col>
    </Row>

    <Row>
      <Col>
        <Box />
      </Col>
      <Col>
        <Box />
      </Col>
      <Col>
        <Box />
      </Col>
    </Row>
  </Container>
);
`;

const nested = `
// nested rows
() => (
  <Container style={{ background: theme.p100 }}>
    <Row>
      <Col>
        <LayoutLabel>level 1</LayoutLabel>
        <Box>
          <Row>
            <Col size={4}>
              <LayoutLabel>level 2</LayoutLabel>
              <Box dark>4</Box>
            </Col>
            <Col size={4}>
              <LayoutLabel>level 2</LayoutLabel>
              <Box dark>4</Box>
            </Col>
            <Col size={4}>
              <LayoutLabel>level 2</LayoutLabel>
              <Box dark>4</Box>
            </Col>
          </Row>
        </Box>
      </Col>
      <Col>
        <LayoutLabel>level 1</LayoutLabel>
        <Box>
          <Row>
            <Col size={4}>
              <LayoutLabel>level 2</LayoutLabel>
              <Box dark>4</Box>
            </Col>
            <Col size={4}>
              <LayoutLabel>level 2</LayoutLabel>
              <Box dark>4</Box>
            </Col>
            <Col size={4}>
              <LayoutLabel>level 2</LayoutLabel>
              <Box dark>4</Box>
            </Col>
          </Row>
        </Box>
      </Col>
    </Row>
  </Container>
);
`;

const withSize = `
// with column size
() => (
  <Container style={{ background: theme.p100 }}>
    <Row>
      <Col size={2}>
        <Box>2</Box>
      </Col>
      <Col size={10}>
        <Box>10</Box>
      </Col>
    </Row>

    <Row>
      <Col size={4}>
        <Box>4</Box>
      </Col>
      <Col size={8}>
        <Box>8</Box>
      </Col>
    </Row>

    <Row>
      <Col size={6}>
        <Box>6</Box>
      </Col>
      <Col size={6}>
        <Box>6</Box>
      </Col>
    </Row>

    <Row>
      <Col size={8}>
        <Box>8</Box>
      </Col>
      <Col size={4}>
        <Box>4</Box>
      </Col>
    </Row>

    <Row>
      <Col size={10}>
        <Box>10</Box>
      </Col>
      <Col size={2}>
        <Box>2</Box>
      </Col>
    </Row>
  </Container>
);
`;

const withOffset = `
// column offset
() => (
  <Container style={{ background: theme.p100 }}>
    <Row>
      <Col size={4} offset={2}>
        <Box>size 4 offset 2</Box>
      </Col>
      <Col size={4}>
        <Box>4</Box>
      </Col>
    </Row>
    
    <Row>
      <Col size={4} offset={4}>
        <Box>size 4 offset 4</Box>
      </Col>
      <Col size={4}>
        <Box>4</Box>
      </Col>
    </Row>
    
    <Row>
      <Col size={2} offset={6}>
        <Box>size 2 offset 6</Box>
      </Col>
      <Col size={4}>
        <Box>4</Box>
      </Col>
    </Row>
  </Container>
);
`;

const dist = `
/* column distribution
*  flex-start, center, flex-end, space-between, space-evenly and space-around
*/
() => (
  <Container style={{ background: theme.p100 }}>
    <Row>
      <Col size={2}>
        <Box>2</Box>
      </Col>
      <Col size={2}>
        <Box>2</Box>
      </Col>
      <Col size={2}>
        <Box>2</Box>
      </Col>
    </Row>
    
    <Row justify="center">
      <Col size={2}>
        <Box>2</Box>
      </Col>
      <Col size={2}>
        <Box>2</Box>
      </Col>
      <Col size={2}>
        <Box>2</Box>
      </Col>
    </Row>
    
    <Row justify="flex-end">
      <Col size={2}>
        <Box>2</Box>
      </Col>
      <Col size={2}>
        <Box>2</Box>
      </Col>
      <Col size={2}>
        <Box>2</Box>
      </Col>
    </Row>
    
    <Row justify="space-evenly">
      <Col size={2}>
        <Box>2</Box>
      </Col>
      <Col size={2}>
        <Box>2</Box>
      </Col>
      <Col size={2}>
        <Box>2</Box>
      </Col>
    </Row>
  </Container>
);
`;

const breakpoint = `
/*
  the default break points are
  xs: max 576px
  sm: max 768px
  md: max 992px
  lg: max 1200px
  xl: min 1200px
*/
() => (
  <Container style={{ background: theme.p100 }}>
    <Row>
      <Col size={3} lg={6} md={12}>
        <Box />
      </Col>
      <Col size={3} lg={6} md={12}>
        <Box />
      </Col>
      <Col size={3} lg={6} md={12}>
        <Box />
      </Col>
      <Col size={3} lg={6} md={12}>
        <Box />
      </Col>
    </Row>
  </Container>
);
`;

const Layout = () => {
  const title = 'layout';
  const description =
    'App components Design layouts encourage consistency across platforms, environments, and screen sizes by using uniform elements and spacing.';

  return (
    <Base title={title} description={description}>
      <Row>
        <Col>
          <Subheadline>auto width</Subheadline>
          <Snippet snippet={auto} direction="column" />
        </Col>
      </Row>

      {/* - - - - - - */}

      <Row>
        <Col>
          <Subheadline>column sizes</Subheadline>
          <Snippet snippet={withSize} direction="column" />
        </Col>
      </Row>

      {/* - - - - - - */}

      <Row>
        <Col>
          <Subheadline>offset</Subheadline>
          <Snippet snippet={withOffset} direction="column" />
        </Col>
      </Row>

      {/* - - - - - - */}

      <Row>
        <Col>
          <Subheadline>distribution</Subheadline>
          <Snippet snippet={dist} direction="column" />
        </Col>
      </Row>

      {/* - - - - - - */}

      <Row>
        <Col>
          <Subheadline>nested grids</Subheadline>
          <Snippet snippet={nested} direction="column" />
        </Col>
      </Row>

      {/* - - - - - - */}

      <Row>
        <Col>
          <Subheadline>break points</Subheadline>
          <Snippet snippet={breakpoint} direction="column" />
        </Col>
      </Row>
    </Base>
  );
};

export default Layout;

const Subheadline = styled.div`
  width: 100%;
  ${({ theme }) => theme.text.subHeadline};
  text-transform: capitalize;
  margin-bottom: 20px;
`;
