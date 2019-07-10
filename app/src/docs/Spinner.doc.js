import React from 'react';

// components
import Base from './Base';
import { Row, Col } from '../components/index';
import Snippet from './Snippet';

const snippet = `
() => (
  <div>
    <Spinner />
  </div>
);
`;

const colored = `
() => (
  <div>
    <Spinner color={theme.p600} />
  </div>
);
`;

const linear = `
() => (
  <div style={{ width: '100%' }}>
    <LinearProgress color={theme.g400} />
  </div>
);
`;

const SpinnerDoc = () => {
  const title = 'spinner';
  const description =
    'Progress indicators inform users about the status of ongoing processes, such as loading an app, submitting a form, or saving updates. They communicate an app’s state and indicate available actions, such as whether users can navigate away from the current screen.';

  return (
    <Base title={title} description={description} name="Spinner">
      <Row align="stretch">
        <Col>
          <Snippet snippet={snippet} />
        </Col>
      </Row>

      <Row align="stretch">
        <Col>
          <Snippet snippet={colored} />
        </Col>
      </Row>

      <Row align="stretch">
        <Col>
          <Snippet snippet={linear} />
        </Col>
      </Row>
    </Base>
  );
};

export default SpinnerDoc;
