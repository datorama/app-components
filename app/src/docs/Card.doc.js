import React from 'react';

// components
import Base from './Base';
import { Row, Col } from '../components/index';
import Snippet from './Snippet';

const snippet = `
() => (
  <Card>
    <CardInner />
  </Card>
);
`;

const clickable = `
() => (
  <Card clickable onClick={() => null}>
      <CardInner />
  </Card>
);
`;

const CardDoc = () => {
  const title = 'card';
  const description =
    'Cards are surfaces that display content and actions on a single topic. They should be easy to scan for relevant and actionable information. Elements, like text and images, should be placed on them in a way that clearly indicates hierarchy.';

  return (
    <Base title={title} description={description} name="Card">
      <Row>
        <Col>
          <Snippet snippet={snippet} stretch />
        </Col>
      </Row>

      <Row>
        <Col>
          <Snippet snippet={clickable} stretch />
        </Col>
      </Row>
    </Base>
  );
};

export default CardDoc;
