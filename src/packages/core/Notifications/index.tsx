import React, { ReactNode } from 'react';

import { ToastsProvider, useToast } from 'packages/core/Notifications/Toasts';
import { SnackbarProvider, useSnackbar } from 'packages/core/Notifications/Snackbars';
import { NotificationType } from 'packages/core/Notifications/notifications.utils';

const NotificationsProvider = ({ children }: { children: ReactNode }) => (
  <ToastsProvider>
    <SnackbarProvider>{children}</SnackbarProvider>
  </ToastsProvider>
);

export { NotificationsProvider, useToast, useSnackbar, NotificationType };
