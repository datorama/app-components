import React from 'react';

import { NotificationsProvider } from '../src/packages/notifications'

const NotificationsDecorator = (Story: any) => (
  <NotificationsProvider>
    <Story/>
  </NotificationsProvider>
);

export default NotificationsDecorator;
