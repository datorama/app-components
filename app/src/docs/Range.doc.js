import React from 'react';

// components
import Base from './Base';
import { Row, Col } from '../components/index';
import Snippet from './Snippet';

const snippet = `
() => (
  <div style={{ width: '100%' }}>
    <Range min={0} max={100} initialValue={50} onChange={console.log} />
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
      <Row align="stretch">
        <Col>
          <Snippet snippet={snippet} />
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

export default RangeDoc;
