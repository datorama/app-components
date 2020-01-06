import React from 'react';

// components
import Base from './Base';
import { Row, Col } from '../components/index';
import Snippet from './Snippet';

const snippet = `
() => {
  
  return (
    <Filters
      dimensions={[
            { value: 'Forename', label: "'Forename'" },
            { value: 'Surname', label: "'Surname'" },
            { value: 'Country', label: "'Country'" },
            { value: 'City', label: "'City'" },
            { value: 'Favorite Color', label: "'Favorite Color" }
          ]}
          onChange={nextFilters => console.log(nextFilters)}
          maxFilters={3}
    />
  );
}`;

const FiltersDoc = () => {
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

export default FiltersDoc;
