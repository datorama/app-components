import React from 'react';
import styled, { withTheme } from 'styled-components';
import Highlight from 'react-highlight-js';

// components
import Base from './Base';
import Spinner from '../components/base/Spinner';
import { Row, Col } from '../components/index';

const snippet = `
import { Spinner } from 'app-components';

const MyComp = () => (
  <div>
    <Spinner />
  </div>
);
`;

const colored = `
import { Spinner } from 'app-components';

const MyComp = () => (
  <div>
    <Spinner color={theme.g400} />
  </div>
);
`;

const SpinnerDoc = props => {
  const title = 'spinner';
  const description = 'spinner.';

  return (
    <Base title={title} description={description} name="Spinner">
      <Row align="stretch">
        <Col>
          <Highlight language="javascript">{snippet}</Highlight>
        </Col>
        <Col>
          <Box>
            <Spinner />
          </Box>
        </Col>
      </Row>

      <Row align="stretch">
        <Col>
          <Highlight language="javascript">{colored}</Highlight>
        </Col>
        <Col>
          <Box>
            <Spinner color={props.theme.g400} />
          </Box>
        </Col>
      </Row>
    </Base>
  );
};

export default withTheme(SpinnerDoc);

const Box = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  border-radius: 4px;
  justify-content: center;
  background: ${({ theme }) => theme.p50};
`;
