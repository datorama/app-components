import React from 'react';

// components
import Base from './Base';
import { Row, Col } from '../components/index';
import Snippet from './Snippet';

const snippet = `
() => (
  <div>
    <Gauge
      // range start - [0 - 360]
      start={90}
      // range end - [0 - 360]
      end={150}
      min={50}
      max={150}
      value={125}
      labelRenderer={value => '$' + Math.round(value)}
    />
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
