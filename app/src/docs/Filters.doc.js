import React from 'react';

// components
import Base from './Base';
import { Row, Col } from '../components/index';
import Snippet from './Snippet';

const snippet = `
() => {
  const dimensions = [
    { value: 'COUNTRY', label: 'Country' },
    { value: 'CITY', label: 'City' },
    { value: 'COLOR', label: 'Color' },
  ];
  
  return (
    <Filters
      dimensions={dimensions}
      onChange={console.log}
      min={1}
      max={3}
      defaultOperator={'CONTAINS'}
      dropDownOptions={[
        { dimension:'COUNTRY', 
          options:[
          { value: 'ISRAEL', label: 'Israel'}, 
          { value: 'UK', label: 'United Kingdom'}, 
          { value: 'FRANCE', label: 'France'}
        ] }
      ]}
      initialState={[
        { val: 'Purple', dimension: 'COLOR', operator: 'NOT_CONTAINS' },
        { val: 'Tel Aviv', dimension: 'CITY', operator: 'CONTAINS' },
        { val: 'ISRAEL', dimension: 'COUNTRY', operator: 'CONTAINS' },
      ]}
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
