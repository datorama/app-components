import React from 'react';

// components
import Base from './Base';
import { Row, Col } from '../components/index';
import Snippet from './Snippet';

const snippet = `
() => (
  <div>
    <Gauge />
  </div>
);
`;

const SpinnerDoc = () => {
  const title = 'gauge chart';
  const description = '';

  return (
    <Base title={title} description={description} name="Gauge">
      <Row align="stretch">
        <Col>
          <Snippet snippet={snippet} />
        </Col>
      </Row>
    </Base>
  );
};

export default SpinnerDoc;
