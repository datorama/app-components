import React, { useCallback, useRef } from 'react';
import { Button } from '../components/Button';
import {
  NotificationsProvider,
  useToast,
  useSnackbar,
} from '../components/Notifications/index';
import styled, { ThemeProvider } from 'styled-components';
import { lightTheme } from '../constants/themes.constants';

const InnerComponent = () => {
  const { addToast, onClearAll: onClearAllToast } = useToast();
  const { addSnackbar, onClearAll: onClearAllSnackbar } = useSnackbar();

  const lastNotificationId = useRef(null);

  const config = {
    type: 'info', // [info, alert, success, warning]
    title: 'Notification title',
    subtitle: 'Notification Subtitle',
    timeout: 5000,
    top: 0, // snackbar top offset
  };

  const onAddSnackbar = useCallback(() => {
    lastNotificationId.current = addSnackbar(config);
  }, [addSnackbar, lastNotificationId, config]);

  return (
    <>
      <Button onClick={() => addToast(config)}>Trigger Toast</Button>
      <StyledButton onClick={onAddSnackbar}>Trigger Snackbar</StyledButton>
      <StyledButton
        onClick={() => {
          onClearAllToast();
          onClearAllSnackbar();
        }}
      >
        Clear All
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
