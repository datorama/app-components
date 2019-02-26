import React from 'react';
import styled, { withTheme } from 'styled-components';
import Highlight from 'react-highlight.js';

// components
import Base from './Base';
import {Row, Col, withToast, Button} from '../components/index';

const snippet = `
import { ToastsProvider, withToast } from '../components/index';

const App = () => (
  <ToastsProvider>
    ... wrap your entire app
  </ToastsProvider>
);

const NestedComp = ({ addToast }) => ();

export const withToast(NestedComp);

// toast object. types - info (default), success, warning and alert
{ title: '',  subtitle: '', type: 'alert', timeout: 3000 }
`;

const ToastDoc = props => {
  const title = 'toasts';
  const description = 'toasts.';

  const notif = {
    title: 'Toast title',
    subtitle: 'Toast subtitle.'
  };

  return (
    <Base title={title} description={description}>
      <Row align="stretch">
        <Col>
          <Highlight language="javascript">{snippet}</Highlight>
        </Col>
      </Row>
      <Row>
        <Col>
          <Box>
            <StyledButton
              onClick={() => props.addToast({ ...notif, type: 'info' })}
            >
              Info toast
            </StyledButton>

            <StyledButton
              onClick={() => props.addToast({ ...notif, type: 'alert' })}
            >
              Alert toast
            </StyledButton>

            <StyledButton
              onClick={() => props.addToast({ ...notif, type: 'success' })}
            >
              Success toast
            </StyledButton>

            <StyledButton
              onClick={() => props.addToast({ ...notif, type: 'warning' })}
            >
              Warning toast
            </StyledButton>
          </Box>
        </Col>
      </Row>
    </Base>
  );
};

export default withToast(withTheme(ToastDoc));

const Box = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  border-radius: 4px;
  justify-content: center;
  background: ${({ theme }) => theme.p50};
  box-sizing: border-box;
  padding: 40px;
  flex-wrap: wrap;
`;

const StyledButton = styled(Button)`
  margin: 4px;
  min-width: 100px;
`;
