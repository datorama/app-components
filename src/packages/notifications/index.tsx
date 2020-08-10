import React, { ReactNode } from 'react';

import { ToastsProvider, useToast } from 'packages/notifications/Toasts';
import { SnackbarProvider, useSnackbar } from 'packages/notifications/Snackbars';
import { NotificationType } from 'packages/notifications/notifications.utils';

const NotificationsProvider = ({ children }: { children: ReactNode }) => (
  <ToastsProvider>
    <SnackbarProvider>{children}</SnackbarProvider>
  </ToastsProvider>
);

export { NotificationsProvider, useToast, useSnackbar, NotificationType };
