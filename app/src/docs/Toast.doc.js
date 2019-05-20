import React from 'react';
import styled, { withTheme } from 'styled-components';

// components
import Base from './Base';
import { Row, Col, withToast, Button, withSnackbar } from '../components/index';
import Snippet from './Snippet';

const snippet = `

import { ToastsProvider, withToast } from '@datorama/app-components';

const App = () => (
  <ToastsProvider>
    ... wrap your entire app
  </ToastsProvider>
);

const NestedComp = ({ addToast }) => ();

export const withToast(NestedComp);

// toast object. types - info (default), success, warning and alert
// { title: '',  subtitle: '', type: 'alert', timeout: 3000 }
`;

const snippetSnackbar = `
import { ToastsProvider, withSnackbar } from '@datorama/app-components';

const App = () => (
  <ToastsProvider>
    ... wrap your entire app
  </ToastsProvider>
);

const NestedComp = ({ addSnackbar }) => ();

export const withSnackbar(NestedComp);

// toast object. types - info (default), success, warning and alert
// { title: '', type: 'alert', timeout: 3000, top: 0 }
`;

const ToastDoc = props => {
  const title = 'toasts';
  const description = 'toasts & snackbars';

  const notif = {
    title: 'Toast title',
    subtitle: 'Toast subtitle.'
  };

  const snackNotif = {
    title: 'Snackbar notification'
  };

  return (
    <Base title={title} description={description}>
      <Row>
        <Col>
          <SectionTitle>Toasts</SectionTitle>
        </Col>
      </Row>

      <Row align="stretch">
        <Col>
          <Snippet snippet={snippet} />
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

      <Row>
        <Col>
          <SectionTitle>Snackbar</SectionTitle>
        </Col>
      </Row>

      <Row align="stretch">
        <Col>
          <Snippet snippet={snippetSnackbar} />
        </Col>
      </Row>
      <Row>
        <Col>
          <Box>
            <StyledButton
              onClick={() => props.addSnackbar({ ...snackNotif, type: 'info' })}
            >
              Info Snackbar
            </StyledButton>
            <StyledButton
              onClick={() =>
                props.addSnackbar({ ...snackNotif, type: 'alert' })
              }
            >
              Alert Snackbar
            </StyledButton>
            <StyledButton
              onClick={() =>
                props.addSnackbar({ ...snackNotif, type: 'success' })
              }
            >
              Success Snackbar
            </StyledButton>
            <StyledButton
              onClick={() =>
                props.addSnackbar({ ...snackNotif, type: 'warning' })
              }
            >
              Warning Snackbar
            </StyledButton>
          </Box>
        </Col>
      </Row>
    </Base>
  );
};

export default withToast(withSnackbar(withTheme(ToastDoc)));

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

const SectionTitle = styled.div`
  font-size: 18px;
  color: ${({ theme }) => theme.p600};
  font-weight: 300;
  text-transform: capitalize;
  margin: 40px 0 20px 0;
`;
