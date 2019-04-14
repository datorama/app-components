import React, { Component } from 'react';
import styled from 'styled-components';

// components
import Base from './Base';
import { Row, Col, MultiTagInput } from '../components/index';
import Snippet from './Snippet';

const MultiTag = `
import { MultiTagInput } from 'app-components';

const MyComp = ({ onChange, validate }) => (
  <div>
    <MultiTagInput
      onChange={onChange}
      placeholder="placeholder"
      validate={validate}
    />
  </div>
);
`;

class MultiTagInputDoc extends Component {
  render() {
    const title = 'multi tag Input';
    const description =
      'Multi tag input let users enter and edit tag-like properties.';

    return (
      <Base title={title} description={description} name="MultiTagInput">
        <Row align="stretch">
          <Col>
            <Snippet snippet={MultiTag} />
          </Col>
          <Col>
            <Box>
              <MultiTagInput
                placeholder="Add"
                onChange={() => undefined}
                validate={() => true}
              />
            </Box>
          </Col>
        </Row>
      </Base>
    );
  }
}

export default MultiTagInputDoc;

const Box = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  border-radius: 4px;
  justify-content: center;
  background: ${({ theme }) => theme.p50};
`;
