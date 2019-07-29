import React from 'react';

// components
import Base from './Base';
import { Row, Col } from '../components/index';
import Snippet from './Snippet';
import styled from 'styled-components';

const snippet = `
() => (
  <div style={{ width: '100%' }}>
    <Range min={0} max={100} onChange={console.log} />
  </div>
);
`;

const withInitialValue = `
() => (
  <div style={{ width: '100%' }}>
    <Range min={100} max={200} initialValue={150} onChange={console.log} />
  </div>
);
`;

const alwaysShowValue = `
() => (
  <div style={{ width: '100%' }}>
    <Range min={0} max={100} showValue initialValue={35} onChange={console.log} />
  </div>
);
`;

const disabled = `
() => (
  <div style={{ width: '100%' }}>
    <Range min={0} max={100} disabled onChange={console.log} />
  </div>
);
`;

const RangeDoc = () => {
  const title = 'range';
  const description = 'range.';

  return (
    <Base title={title} description={description} name="Range">
      <Row>
        <Col>
          <SectionTitle>Basic</SectionTitle>
        </Col>
      </Row>
      <Row align="stretch">
        <Col>
          <Snippet snippet={snippet} />
        </Col>
      </Row>

      <Row>
        <Col>
          <SectionTitle>With initial value</SectionTitle>
        </Col>
      </Row>
      <Row align="stretch">
        <Col>
          <Snippet snippet={withInitialValue} />
        </Col>
      </Row>

      <Row>
        <Col>
          <SectionTitle>Always show value</SectionTitle>
        </Col>
      </Row>
      <Row align="stretch">
        <Col>
          <Snippet snippet={alwaysShowValue} />
        </Col>
      </Row>

      <Row>
        <Col>
          <SectionTitle>Disabled</SectionTitle>
        </Col>
      </Row>
      <Row align="stretch">
        <Col>
          <Snippet snippet={disabled} />
        </Col>
      </Row>
    </Base>
  );
};

const SectionTitle = styled.div`
  ${({ theme }) => theme.text.subHeadline};
`;

export default RangeDoc;
