import React, { useCallback, useEffect, useState } from 'react';
import { throttle as fpThrottle } from 'lodash/fp';

import {
  StyledInfoIcon,
  StyledSuccessIcon,
  StyledWarningIcon,
  StyledAlertIcon,
} from './notifications.styles';

export const useNotifications = ({ throttle = 0 } = {}) => {
  const [list, setList] = useState([]);

  const clear = useCallback(
    (id) =>
      setList((prevState) =>
        prevState.filter((notification) => notification.id !== id)
      ),
    [setList]
  );

  const clearAll = useCallback(() => setList([]), [setList]);

  const addNotification = useCallback((notification) => {
    const id = Math.random();

    setList((prevState) => [...prevState, { id, ...notification }]);

    return id;
  }, []);

  return {
    list,
    setList,
    addNotification: fpThrottle(throttle, addNotification),
    clear,
    clearAll,
  };
};

export const useNotification = (id, clear, timeout) => {
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    if (timeout === Infinity) return;

    const clearDelay = setTimeout(() => {
      setIsLeaving(true);
    }, timeout);

    return () => {
      clearTimeout(clearDelay);
    };
  }, [timeout]);

  useEffect(() => {
    if (isLeaving) {
      const clearDelay = setTimeout(() => {
        clear(id);
      }, 500);

      return () => {
        clearTimeout(clearDelay);
      };
    }
  }, [clear, id, isLeaving]);

  return {
    isLeaving,
  };
};

export const getIcon = (type) => {
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
