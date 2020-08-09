import React, { useMemo, useContext, ReactNode } from "react";
import { noop } from "lodash/fp";

import {
  Meta,
  Subtitle,
  Title,
  CloseIcon,
  Toast,
} from "packages/core/Notifications/notifications.styles";

import {
  useNotifications,
  useNotification,
  getIcon,
  ToastItem as ToastItemProps,
} from "packages/core/Notifications/notifications.utils";

const Context = React.createContext<{
  addToast: (toastItem: ToastItemProps) => void;
}>({
  addToast: noop,
});

const ToastItem = ({
  id,
  title,
  subtitle,
  type,
  index,
  clear,
}: ToastItemProps & { clear: (id: number | string) => void }) => {
  const { isLeaving } = useNotification(id, clear);

  return (
    <Toast key={`notif-${id}`} top={index * 80} leaving={isLeaving}>
      <CloseIcon onClick={() => clear(id)} />
      {getIcon(type)}

      <Meta>
        <Title>{title}</Title>
        <Subtitle>{subtitle}</Subtitle>
      </Meta>
    </Toast>
  );
};

export const ToastsProvider = ({ children }: { children: ReactNode }) => {
  const { list, clear, addNotification } = useNotifications<ToastItemProps>();

  const toasts = useMemo(
    () =>
      list.map((config, index) => (
        <ToastItem key={config.id} {...config} index={index} clear={clear} />
      )),
    [clear, list]
  );

  return (
    <Context.Provider value={{ addToast: addNotification }}>
      {toasts}

      {children}
    </Context.Provider>
  );
};

export const useToast = () => useContext(Context);
