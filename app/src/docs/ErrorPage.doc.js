import React from 'react';

// components
import Base from './Base';
import { Col, Row } from '../components/index';
import Snippet from './Snippet';

const snippet = `
() => (
  <ErrorPage
    title="Oops…Something went wrong"
    subtitle="A problem was encountered while installing App Name"
    buttonLabel="Back to Market"
    fixed={false}
    onClick={() => null}
  />
);
`;

const ErrorPageDoc = () => {
  const title = 'error page';
  const description = 'generic error page';

  return (
    <Base title={title} description={description} name="ErrorPage">
      <Row>
        <Col>
          <Snippet snippet={snippet} direction="column" stretch />
        </Col>
      </Row>
    </Base>
  );
};

export default ErrorPageDoc;
