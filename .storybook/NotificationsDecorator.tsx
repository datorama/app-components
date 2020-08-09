import React from 'react';

import { NotificationsProvider } from '../src/packages/core/Notifications'

const NotificationsDecorator = (Story: any) => (
  <NotificationsProvider>
    <Story/>
  </NotificationsProvider>
);

export default NotificationsDecorator;
