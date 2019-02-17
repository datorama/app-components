import React from 'react';
import styled, { withTheme } from 'styled-components';
import Highlight from 'react-highlight-js';

// components
import Base from './Base';
import Popup from '../components/base/Popup';
import { Row, Col } from '../components/index';

const snippet = `
import { Popup } from 'app-components';

const MyComp = () => (
  <div>
    <Popup />
  </div>
);
`;

const PopupDoc = props => {
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
            <Popup />
          </Box>
        </Col>
      </Row>
    </Base>
  );
};

export default withTheme(PopupDoc);

const Box = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  border-radius: 4px;
  justify-content: center;
  background: ${({ theme }) => theme.p50};
`;
