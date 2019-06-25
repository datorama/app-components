import React, { useCallback, useEffect, useState } from 'react';
import { throttle as fpThrottle } from 'lodash/fp';

import {
  StyledInfoIcon,
  StyledSuccessIcon,
  StyledWarningIcon,
  StyledAlertIcon
} from './notifications.styles';

export const useNotifications = ({ throttle = 0 } = {}) => {
  const [list, setList] = useState([]);

  const clear = useCallback(
    id =>
      setList(prevState =>
        prevState.filter(notification => notification.id !== id)
      ),
    [setList]
  );

  const addNotification = useCallback(notification => {
    const id = Math.random();

    setList(prevState => [...prevState, { id, ...notification }]);
  }, []);

  return {
    list,
    setList,
    addNotification: fpThrottle(throttle, addNotification),
    clear
  };
};

export const useNotification = (id, clear) => {
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLeaving(true);
    }, 5000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  useEffect(() => {
    if (isLeaving) {
      const timeout = setTimeout(() => {
        clear(id);
      }, 500);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [clear, id, isLeaving]);

  return {
    isLeaving
  };
};

export const getIcon = type => {
  switch (type) {
    case 'info':
      return <StyledInfoIcon />;

    case 'alert':
      return <StyledAlertIcon />;

    case 'success':
      return <StyledSuccessIcon />;

    case 'warning':
      return <StyledWarningIcon />;

    default:
      return null;
  }
};
