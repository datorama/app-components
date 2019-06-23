import React from 'react';

import { ToastsProvider, useToast } from './Toasts';
import { SnackbarProvider, useSnackbar } from './Snackbars';

const NotificationsProvider = ({ children }) => (
  <ToastsProvider>
    <SnackbarProvider>{children}</SnackbarProvider>
  </ToastsProvider>
);

export { NotificationsProvider, useToast, useSnackbar };
