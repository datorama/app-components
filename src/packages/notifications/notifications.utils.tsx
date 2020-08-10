import React, { useCallback, useEffect, useState } from "react";
import { throttle as fpThrottle } from "lodash/fp";

import {
  StyledInfoIcon,
  StyledSuccessIcon,
  StyledWarningIcon,
  StyledAlertIcon,
} from "packages/notifications/notifications.styles";

interface NotificationItem {
  id: number | string;
  title: string;
  type: NotificationType;
  index: number;
}

export interface SnackbarItem extends NotificationItem {
  top?: number;
  speed?: number;
  className?: string;
}

export interface ToastItem extends NotificationItem {
  subtitle: string;
}

export const useNotifications = <T extends NotificationItem>({
  throttle = 0,
} = {}) => {
  const [list, setList] = useState<T[]>([]);

  const clear = useCallback(
    (id) =>
      setList((prevState) =>
        prevState.filter((notification) => notification.id !== id)
      ),
    [setList]
  );

  const addNotification = useCallback((notification) => {
    const id = Math.random();

    setList((prevState) => [...prevState, { id, ...notification }]);
  }, []);

  return {
    list,
    setList,
    addNotification: fpThrottle(throttle, addNotification),
    clear,
  };
};

export const useNotification = (
  id: string | number,
  clear: (id: string | number) => void
) => {
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
    isLeaving,
  };
};

export enum NotificationType {
  Info = "info",
  Alert = "alert",
  Success = "success",
  Warning = "warning",
}

export const getIcon = (type: NotificationType) => {
  switch (type) {
    case NotificationType.Info:
      return <StyledInfoIcon />;

    case NotificationType.Alert:
      return <StyledAlertIcon />;

    case NotificationType.Success:
      return <StyledSuccessIcon />;

    case NotificationType.Warning:
      return <StyledWarningIcon />;

    default:
      return null;
  }
};
