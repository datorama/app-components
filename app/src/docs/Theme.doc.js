import React from 'react';
import styled from 'styled-components';

// components
import { Row, Col, Container, Card, Button } from '../components/index';

// todo: extend the theme for this.
const extend = {};
const ThemeDoc = () => {
  return (
    <Container>
      <Row>
        <Col>
          <PageTitle>Theme</PageTitle>
        </Col>
      </Row>

      <Row>
        <Col>Colors - pick primary accent</Col>
      </Row>

      <Row>
        <Col>Font - select from dropdown</Col>
      </Row>

      <Row>
        <Col>Scale - range</Col>
      </Row>

      <Row>
        <Col>
          <Card>
            <Button onClick={() => null}>Default</Button>
          </Card>
        </Col>
        <Col>
          <Card></Card>
        </Col>
        <Col>
          <Card></Card>
        </Col>
        <Col>
          <Card></Card>
        </Col>
      </Row>

      <Row>
        <Col>
          <Card></Card>
        </Col>
        <Col>
          <Card></Card>
        </Col>
        <Col>
          <Card></Card>
        </Col>
        <Col>
          <Card></Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ThemeDoc;

const PageTitle = styled.div`
  ${({ theme }) => theme.text.headline};
  text-transform: capitalize;
  margin-bottom: 20px;
`;
