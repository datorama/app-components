import React from 'react';
import styled from 'styled-components';

// components
import Base from './Base';
import Range from '../components/base/Range';
import { Row, Col } from '../components/index';
import Snippet from './Snippet';

const snippet = `
import { Range } from 'app-components';

const MyComp = ({ handleChange }) => (
  <div>
    <Range min={0} max={100} onChange={handleChange} />
  </div>
);
`;

const disabled = `
import { Range } from 'app-components';

const MyComp = ({ handleChange }) => (
  <div>
    <Range disabled onChange={handleChange} />
  </div>
);
`;

const RangeDoc = () => {
  const title = 'range';
  const description = 'range.';

  return (
    <Base title={title} description={description} name="Range">
      <Row align="stretch">
        <Col>
          <Snippet snippet={snippet} />
        </Col>
        <Col>
          <Box>
            <Range min={0} max={100} />
          </Box>
        </Col>
      </Row>

      <Row align="stretch">
        <Col>
          <Snippet snippet={disabled} />
        </Col>
        <Col>
          <Box>
            <Range min={0} max={100} disabled />
          </Box>
        </Col>
      </Row>
    </Base>
  );
};

export default RangeDoc;

const Box = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  border-radius: 4px;
  justify-content: center;
  box-sizing: border-box;
  padding: 40px;
  background: ${({ theme }) => theme.p50};
`;
