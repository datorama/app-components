import React from 'react';

// components
import Base from './Base';
import { Col, Row } from '../components/index';
import Snippet from './Snippet';

const snippet = `
() => (
  <div>
    <Pagination
    	max={4}
    	total={256}
    	onChange={console.log}
    />
  </div>
);
`;

const snippetSmall = `
() => (
  <div>
    <Pagination
    	max={6}
    	total={6}
    	onChange={console.log}
    />
  </div>
);
`;

export default function PaginationDoc() {
  const title = 'pagination';
  const description = 'pagination.';

  return (
    <Base title={title} description={description} name="Pagination">
      <Row align="stretch">
        <Col>
          <Snippet snippet={snippet} />
        </Col>
      </Row>

      <Row align="stretch">
        <Col>
          <Snippet snippet={snippetSmall} />
        </Col>
      </Row>
    </Base>
  );
}
