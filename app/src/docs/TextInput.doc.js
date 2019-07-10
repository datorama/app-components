import React from 'react';

// components
import Base from './Base';
import { Row, Col } from '../components/index';
import Snippet from './Snippet';

const snippet = `
() => (
  <div>
    <TextInput label="Label" placeholder="placeholder" />
  </div>
);
`;

const sizesSnippet = `
() => (
  <div>
    <TextInput large label="Label" placeholder="placeholder" required />
  </div>
);
`;

const valid = `
() => (
  <div>
    <TextInput
      // onChange={onChange}
      placeholder="placeholder"
      label="label"
      valid
      validMessage="Valid input"
    />
  </div>
);
`;

const error = `
() => (
  <div>
    <TextInput
      // value={value}
      // onChange={onChange}
      placeholder="placeholder"
      label="label"
      error
      errorMessage="Not authorized"
    />
  </div>
);
`;

const disabled = `
() => (
  <div>
    <TextInput
      placeholder="placeholder"
      label="label"
      disabled
    />
  </div>
);
`;

const TextInputDoc = () => {
  const title = 'text input';
  const description = 'Text inputs let users enter and edit text.';

  return (
    <Base title={title} description={description} name="TextInput">
      <Row align="stretch">
        <Col>
          <Snippet snippet={snippet} />
        </Col>
      </Row>

      <Row align="stretch">
        <Col>
          <Snippet snippet={sizesSnippet} />
        </Col>
      </Row>

      <Row align="stretch">
        <Col>
          <Snippet snippet={disabled} />
        </Col>
      </Row>

      <Row align="stretch">
        <Col>
          <Snippet snippet={valid} />
        </Col>
      </Row>

      <Row align="stretch">
        <Col>
          <Snippet snippet={error} />
        </Col>
      </Row>
    </Base>
  );
};

export default TextInputDoc;
