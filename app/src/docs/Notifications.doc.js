import React from 'react';

// components
import Base from './Base';
import { Row, Col } from '../components/index';
import Snippet from './Snippet';

const snippet = `
// first wrap your root component with <NotificationsProvider />

// use addToast and addSnackbar hooks to dispatch notifications
() => {
  const { addToast } = useToast();
  const { addSnackbar } = useSnackbar();
  
  const config = {
    type: 'info', // [info, alert, success, warning]
    title: 'Notification title',
    subtitle: 'Notification Subtitle',
    timeout: 2000,
    top: 0 // snackbar top offset
  };
 
  const triggerToast = useCallback(
    () => addToast(config),
    []
  );
  
  const triggerSnack = useCallback(
    () => addSnackbar(config),
    []
  );
  
  return (
    <div style={{ display: 'flex', justifyContent: 'space-around', width: 240 }}>
      <Button onClick={triggerToast}>Add Toast</Button>
      <Button onClick={triggerSnack}>Add Snackbar</Button>
    </div>
  );
};
`;

const NotificationsDoc = () => {
  const title = 'notifications';
  const description = 'Toasts and Snackbar notifications component';

  return (
    <Base title={title} description={description}>
      <Row align="stretch">
        <Col>
          <Snippet snippet={snippet} />
        </Col>
      </Row>
    </Base>
  );
};

export default NotificationsDoc;
