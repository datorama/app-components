import React from 'react';
import styled from 'styled-components';

// components
import Base from './Base';
import { Row, Col, Spinner, LinearProgress } from '../components/index';
import Snippet from './Snippet';
import { useTheme } from '../hooks/theme.hooks';

const snippet = `
import { Spinner } from '@datorama/app-components';

const MyComp = () => (
  <div>
    <Spinner />
  </div>
);
`;

const colored = `
import { Spinner } from '@datorama/app-components';

const MyComp = () => (
  <div>
    <Spinner color={theme.g400} />
  </div>
);
`;

const linear = `
import { LinearProgress } from '@datorama/app-components';

const MyComp = () => (
  <div>
    <LinearProgress />
  </div>
);
`;

const SpinnerDoc = () => {
  const theme = useTheme();
  const title = 'spinner';
  const description =
    'Progress indicators inform users about the status of ongoing processes, such as loading an app, submitting a form, or saving updates. They communicate an app’s state and indicate available actions, such as whether users can navigate away from the current screen.';

  return (
    <Base title={title} description={description} name="Spinner">
      <Row align="stretch">
        <Col>
          <Snippet snippet={snippet} />
        </Col>
        <Col>
          <Box>
            <Spinner />
          </Box>
        </Col>
      </Row>

      <Row align="stretch">
        <Col>
          <Snippet snippet={colored} />
        </Col>
        <Col>
          <Box>
            <Spinner color={theme.g400} />
          </Box>
        </Col>
      </Row>

      <Row align="stretch">
        <Col>
          <Snippet snippet={linear} />
        </Col>
        <Col>
          <Box>
            <LinearProgress />
          </Box>
        </Col>
      </Row>
    </Base>
  );
};

export default SpinnerDoc;

const Box = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  border-radius: 4px;
  justify-content: center;
  background: ${({ theme }) => theme.p50};
  box-sizing: border-box;
  padding: 60px;
`;
