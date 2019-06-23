import React from 'react';
import styled, { withTheme } from 'styled-components';

// components
import Base from './Base';
import { Row, Col, Button } from '../components/index';
import { useToast } from '../components/base/Notifications/Toasts';
import { useSnackbar } from '../components/base/Notifications/Snackbars';
import Snippet from './Snippet';

const snippet = `
import { NotificationsProvider, useToast, useSnackbar } from '@datorama/app-components';

const App = () => (
  <NotificationsProvider>
    ... wrap your entire app
  </NotificationsProvider>
);

const NestedComp = () => {
    const { addToast } = useToast();
    const { addSnackbar } = useSnackbar(); 
};

// toast object. types - info (default), success, warning and alert
// { title: '',  subtitle: '', type: 'alert', timeout: 3000 }
// toast object. types - info (default), success, warning and alert
// { title: '', type: 'alert', timeout: 3000, top: 0 }
`;

const ToastDoc = () => {
  const { addToast } = useToast();
  const { addSnackbar } = useSnackbar();

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
      <Row align="stretch">
        <Col>
          <Snippet snippet={snippet} />
        </Col>
      </Row>

      <Row>
        <Col>
          <SectionTitle>Toasts</SectionTitle>
        </Col>
      </Row>
      <Row>
        <Col>
          <Box>
            <StyledButton onClick={() => addToast({ ...notif, type: 'info' })}>
              Info toast
            </StyledButton>

            <StyledButton onClick={() => addToast({ ...notif, type: 'alert' })}>
              Alert toast
            </StyledButton>

            <StyledButton
              onClick={() => addToast({ ...notif, type: 'success' })}
            >
              Success toast
            </StyledButton>

            <StyledButton
              onClick={() => addToast({ ...notif, type: 'warning' })}
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
      <Row>
        <Col>
          <Box>
            <StyledButton
              onClick={() => addSnackbar({ ...snackNotif, type: 'info' })}
            >
              Info Snackbar
            </StyledButton>
            <StyledButton
              onClick={() => addSnackbar({ ...snackNotif, type: 'alert' })}
            >
              Alert Snackbar
            </StyledButton>
            <StyledButton
              onClick={() => addSnackbar({ ...snackNotif, type: 'success' })}
            >
              Success Snackbar
            </StyledButton>
            <StyledButton
              onClick={() => addSnackbar({ ...snackNotif, type: 'warning' })}
            >
              Warning Snackbar
            </StyledButton>
          </Box>
        </Col>
      </Row>
    </Base>
  );
};

export default withTheme(ToastDoc);

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
