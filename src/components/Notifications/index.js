/* eslint react/prop-types: 0 */
import React from 'react';
import * as PropTypes from 'prop-types';

import { ToastsProvider, useToast } from './Toasts';
import { SnackbarProvider, useSnackbar } from './Snackbars';

const NotificationsProvider = ({ children }) => (
  <ToastsProvider>
    <SnackbarProvider>{children}</SnackbarProvider>
  </ToastsProvider>
);

NotificationsProvider.propTypes = {
  children: PropTypes.node,
};

export { NotificationsProvider, useToast, useSnackbar };
