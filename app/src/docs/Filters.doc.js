import React from 'react';

// components
import Base from './Base';
import { Row, Col } from '../components/index';
import Snippet from './Snippet';

const snippet = `
() => {
  
   const initialFiltersState = [
    {
      operator: 'CONTAINS',
      val: '🍅',
      dimension: '🥗'
    },
    {
      val: '🍆',
      dimension: '🥗',
      operator: 'NOT_CONTAINS'
    },
    {
      val: '🐈',
      dimension: '🍲',
      operator: 'NOT_CONTAINS'
    }
  ];

  const [filters, setFilters] = useState(initialFiltersState);
  
  return (
    <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: 650,
          overflowY: 'auto'
        }}
      >
        <div style={{ padding: 20, marginBottom: 20, border: '1px dashed' }}>
          <Filters
            dimensions={[
              { value: 'Forename', label: 'Forename' },
              { value: 'Surname', label: 'Surname' },
              { value: 'Country', label: 'Country' },
              { value: 'City', label: 'City' },
              { value: 'Favorite Color', label: 'Favorite Color' }
            ]}
            deleteIconColor="#979797"
            dividerColor="#d8d8d8"
            warningColor="#999ca0"
          />
        </div>
        <div style={{ background: '#2e405c', color: '#fff', padding: 20 }}>
          <h3>Dark-Mode with initial-state (Switch to Dark Mode):</h3>
          <Filters
            dimensions={[
              { value: '🥗', label: '🥗' },
              { value: '🍲', label: '🍲' },
              { value: '🍕', label: '🍕' }
            ]}
            initialState={filters}
            onChange={setFilters}
            maxFilters={5}
            andColor="#00dff7"
            deleteIconColor="#ccced3"
          />
        </div>
      </div>
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
