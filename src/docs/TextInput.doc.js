import React from 'react';
import styled from 'styled-components';
import Highlight from 'react-highlight-js';

// components
import Base from './Base';
import TextInput from '../components/base/TextInput';
import { Row, Col } from '../components/index';

const snippet = `
import { TextInput } from 'app-components';

const MyComp = ({ value, onChange }) => (
  <div>
    <TextInput
      value={value}
      onChange={onChange}
      placeholder="placeholder"
      label="label"
      required
    />
  </div>
);
`;

const valid = `
import { TextInput } from 'app-components';

const MyComp = ({ value, onChange }) => (
  <div>
    <TextInput
      value={value}
      onChange={onChange}
      placeholder="placeholder"
      label="label"
      valid
    />
  </div>
);
`;

const error = `
import { TextInput } from 'app-components';

const MyComp = ({ value, onChange }) => (
  <div>
    <TextInput
      value={value}
      onChange={onChange}
      placeholder="placeholder"
      label="label"
      error
      errorMessage="Not authorized"
    />
  </div>
);
`;

const disabled = `
import { TextInput } from 'app-components';

const MyComp = ({ value, onChange }) => (
  <div>
    <TextInput
      value={value}
      onChange={onChange}
      placeholder="placeholder"
      label="label"
      disabled
      validMessage="Valid input"
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
          <Highlight language="javascript">{snippet}</Highlight>
        </Col>
        <Col>
          <Box>
            <TextInput label="Label" placeholder="placeholder" required />
          </Box>
        </Col>
      </Row>

      <Row align="stretch">
        <Col>
          <Highlight language="javascript">{disabled}</Highlight>
        </Col>
        <Col>
          <Box>
            <TextInput label="Label" placeholder="placeholder" disabled />
          </Box>
        </Col>
      </Row>

      <Row align="stretch">
        <Col>
          <Highlight language="javascript">{valid}</Highlight>
        </Col>
        <Col>
          <Box>
            <TextInput
              label="Label"
              placeholder="placeholder"
              required
              valid
              validMessage="Valid input"
            />
          </Box>
        </Col>
      </Row>

      <Row align="stretch">
        <Col>
          <Highlight language="javascript">{error}</Highlight>
        </Col>
        <Col>
          <Box>
            <TextInput
              label="Label"
              placeholder="placeholder"
              required
              error
              errorMessage="Not authorized"
            />
          </Box>
        </Col>
      </Row>
    </Base>
  );
};

export default TextInputDoc;

const Box = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  border-radius: 4px;
  justify-content: center;
  background: ${({ theme }) => theme.p50};
`;
