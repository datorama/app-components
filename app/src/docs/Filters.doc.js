import React from 'react';

// components
import Base from './Base';
import { Row, Col } from '../components/index';
import Snippet from './Snippet';

const snippet = `
() => {
  const dimensions = [
    { value: 'COUNTRY', label: 'Country' },
    { value: 'CITY', label: 'city' },
    { value: 'COLOR', label: 'Color' },
  ];
  
  return (
    <Filters
      dimensions={dimensions}
      onChange={console.log}
      min={1}
      max={3}
    />
  );
}
`;

const SpinnerDoc = () => {
  const title = 'filters';
  const description = '';

  return (
    <Base title={title} description={description} name="Filters">
      <Row align="stretch">
        <Col>
          <Snippet snippet={snippet} />
        </Col>
      </Row>
    </Base>
  );
};

export default SpinnerDoc;
