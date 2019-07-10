import React from 'react';
import styled from 'styled-components';

// components
import Base from './Base';
import { Row, Col, hexToRgba, Container } from '../components/index';
import Snippet from './Snippet';

const auto = `
// auto column size
() => (
  <Row>
        <Col>
          <Container>
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
        </Col>
      </Row>
);
`;

const nested = `
import { Container, Row, Col } from '@datorama/app-components';

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
import { Container, Row, Col } from '@datorama/app-components';

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
import { Container, Row, Col } from '@datorama/app-components';

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
import { Container, Row, Col } from '@datorama/app-components';

/* column distribution
*  flex-start, center, flex-end, space-between, space-evenly and space-around
*/
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
import { Container, Row, Col } from '@datorama/app-components';

/*
  the default break points are
  xs: max 576px
  sm: max 768px
  md: max 992px
  lg: max 1200px
  xl: min 1200px
*/
const MyComp = () => (
  <Container>
    <Row>
    	<Col size={3} sm={12}/>...</Col>
    	<Col size={3} sm={12}/>...</Col>
    	<Col size={3} sm={12}/>...</Col>
    	<Col size={3} sm={12}/>...</Col>
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
          <Snippet snippet={auto} />
        </Col>
      </Row>

      <Row>
        <Col>
          <StyledContainer>
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
          </StyledContainer>
        </Col>
      </Row>

      {/* - - - - - - */}

      <Row>
        <Col>
          <Subheadline>column sizes</Subheadline>
          <Snippet snippet={withSize} />
        </Col>
      </Row>

      <Row>
        <Col>
          <StyledContainer>
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
          </StyledContainer>
        </Col>
      </Row>

      {/* - - - - - - */}

      <Row>
        <Col>
          <Subheadline>offset</Subheadline>
          <Snippet snippet={withOffset} />
        </Col>
      </Row>

      <Row>
        <Col>
          <StyledContainer>
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
          </StyledContainer>
        </Col>
      </Row>

      {/* - - - - - - */}

      <Row>
        <Col>
          <Subheadline>distribution</Subheadline>
          <Snippet snippet={dist} />
        </Col>
      </Row>

      <Row>
        <Col>
          <StyledContainer>
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
          </StyledContainer>
        </Col>
      </Row>

      {/* - - - - - - */}

      <Row>
        <Col>
          <Subheadline>nested grids</Subheadline>
          <Snippet snippet={nested} />
        </Col>
      </Row>

      <Row>
        <Col>
          <StyledContainer>
            <Row>
              <Col>
                <Label>level 1</Label>
                <Box>
                  <Row>
                    <Col size={4}>
                      <Label>level 2</Label>
                      <Box dark>4</Box>
                    </Col>
                    <Col size={4}>
                      <Label>level 2</Label>
                      <Box dark>4</Box>
                    </Col>
                    <Col size={4}>
                      <Label>level 2</Label>
                      <Box dark>4</Box>
                    </Col>
                  </Row>
                </Box>
              </Col>
              <Col>
                <Label>level 1</Label>
                <Box>
                  <Row>
                    <Col size={4}>
                      <Label>level 2</Label>
                      <Box dark>4</Box>
                    </Col>
                    <Col size={4}>
                      <Label>level 2</Label>
                      <Box dark>4</Box>
                    </Col>
                    <Col size={4}>
                      <Label>level 2</Label>
                      <Box dark>4</Box>
                    </Col>
                  </Row>
                </Box>
              </Col>
            </Row>
          </StyledContainer>
        </Col>
      </Row>

      {/* - - - - - - */}

      <Row>
        <Col>
          <Subheadline>break points</Subheadline>
          <Snippet snippet={breakpoint} />
        </Col>
      </Row>

      <Row>
        <Col>
          <StyledContainer>
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
          </StyledContainer>
        </Col>
      </Row>
    </Base>
  );
};

export default Layout;

const StyledContainer = styled(Container)`
  background: ${({ theme }) => theme.p50};
  margin: 20px 0;
`;

const Box = styled.div`
  width: 100%;
  min-height: 40px;
  background: ${({ theme, dark }) =>
    hexToRgba(dark ? theme.p300 : theme.p200, 80)};
  display: flex;
  align-items: center;
  justify-content: center;
  ${({ theme }) => theme.text.sm};
`;

const Label = styled.div`
  ${({ theme }) => theme.text.sm};
  margin-bottom: 10px;
`;

const Subheadline = styled.div`
  width: 100%;
  ${({ theme }) => theme.text.subHeadline};
  text-transform: capitalize;
  margin-bottom: 20px;
`;
