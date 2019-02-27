import React from 'react';
import styled from 'styled-components';

// components
import Base from './Base';
import {Row, Col, Range, hexToRgba} from '../components/index';
import Snippet from './Snippet';

const snippet = `
import { Range } from '../components/index';

const MyComp = ({ handleChange }) => (
  <div>
    <Range min={0} max={100} onChange={handleChange} />
  </div>
);
`;

const disabled = `
import { Range } from '../components/index';

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
          <Snippet snippet={snippet} />
        </Col>
        <Col>
          <Box>
            <CustomRange min={200} max={600} />
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

const CustomRange = styled(Range)`
  .outer {
    background: ${({ theme }) => hexToRgba(theme.g300, 20)};
  }
  
  .thumb {
    background: ${({ theme }) => theme.g600};
  }
  .inner {
    background: ${({ theme }) => theme.g300}; /* Old browsers */
    background: -moz-linear-gradient(
      left,
      ${({ theme }) => theme.g300} 0%,
      ${({ theme }) => theme.g600} 100%
    ); /* FF3.6-15 */
    background: -webkit-linear-gradient(
      left,
      ${({ theme }) => theme.g300} 0%,
      ${({ theme }) => theme.g600} 100%
    ); /* Chrome10-25,Safari5.1-6 */
    background: linear-gradient(
      to right,
      ${({ theme }) => theme.g300} 0%,
      ${({ theme }) => theme.g600} 100%
    ); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='${({
      theme
    }) => theme.g300}', endColorstr='${({ theme }) =>
  theme.g600}',GradientType=1 ); /* IE6-9 */
  }
  
  .value {
    background: ${({ theme }) => theme.g500};
  }
`;
