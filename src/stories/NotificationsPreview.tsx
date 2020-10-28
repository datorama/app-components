import React from 'react';
import { Button } from '../components/Button';
import {
  NotificationsProvider,
  useToast,
  useSnackbar,
} from '../components/Notifications/index';
import styled, { ThemeProvider } from 'styled-components';
import { lightTheme } from '../constants/themes.constants';

const InnerComponent = () => {
  const { addToast } = useToast();
  const { addSnackbar } = useSnackbar();

  const config = {
    type: 'info', // [info, alert, success, warning]
    title: 'Notification title',
    subtitle: 'Notification Subtitle',
    timeout: 3000,
    top: 0, // snackbar top offset
  };

  return (
    <>
      <Button onClick={() => addToast(config)}>Trigger Toast</Button>
      <StyledButton onClick={() => addSnackbar(config)}>
        Trigger Snackbar
      </StyledButton>
    </>
  );
};

export const Notifications = () => (
  <ThemeProvider theme={lightTheme}>
    <NotificationsProvider>
      <InnerComponent />
    </NotificationsProvider>
  </ThemeProvider>
);

const StyledButton = styled(Button)`
  margin-left: 10px;
`;
