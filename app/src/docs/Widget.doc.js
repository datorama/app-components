import React from 'react';
import styled from 'styled-components';

// components
import Base from './Base';
import { Row, Col } from '../components/index';
import Snippet from './Snippet';

const regular = `
() => {
  const contentStyles = {
    width: '100%',
    height: 100,
    background: theme.p100
  };
  
  return (
    <Widget>
      <div style={contentStyles} />
    </Widget>
  );
};
`;

const disabled = `
() => {
  const contentStyles = {
    width: '100%',
    height: 100,
    background: theme.p100
  };
  
  return (
    <Widget disabled>
      <div style={contentStyles} />
    </Widget>
  );
};
`;

const loading = `
() => (
  <Widget loading>
    ...
  </Widget>
);
`;

const empty = `
() => (
  <Widget empty>
    ...
  </Widget>
);
`;

const error = `
({ fetchData }) => (
  <Widget error onTryAgain={fetchData}>
    ...
  </Widget>
);
`;

const WidgetDoc = () => {
  const title = 'widget';
  const description = 'Common widget wrapper';

  return (
    <Base title={title} description={description} name="Widget">
      <Row>
        <Col>
          <Title>Default</Title>
        </Col>
      </Row>
      <Row align="stretch">
        <Col>
          <Snippet snippet={regular} stretch />
        </Col>
      </Row>

      <Row>
        <Col>
          <Title>Disabled</Title>
        </Col>
      </Row>
      <Row align="stretch">
        <Col>
          <Snippet snippet={disabled} stretch />
        </Col>
      </Row>

      <Row>
        <Col>
          <Title>Loading</Title>
        </Col>
      </Row>
      <Row align="stretch">
        <Col>
          <Snippet snippet={loading} stretch />
        </Col>
      </Row>

      <Row>
        <Col>
          <Title>Empty state</Title>
        </Col>
      </Row>
      <Row align="stretch">
        <Col>
          <Snippet snippet={empty} stretch />
        </Col>
      </Row>

      <Row>
        <Col>
          <Title>Error state</Title>
        </Col>
      </Row>
      <Row align="stretch">
        <Col>
          <Snippet snippet={error} stretch />
        </Col>
      </Row>
    </Base>
  );
};

export default WidgetDoc;

const Title = styled.div`
  width: 100%;
  ${({ theme }) => theme.text.subHeadline};
  text-transform: capitalize;
  margin-bottom: 20px;
`;
