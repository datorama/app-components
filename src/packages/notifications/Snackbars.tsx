import React, { useContext, useMemo, ReactNode } from "react";
import { noop } from "lodash/fp";

import {
  Meta,
  SnackbarTitle,
  CloseIcon,
  Snackbar,
} from "packages/notifications/notifications.styles";

import {
  useNotifications,
  useNotification,
  getIcon,
  SnackbarItem as SnackbarItemProps,
} from "packages/notifications/notifications.utils";

const Context = React.createContext<{
  addSnackbar: (item: SnackbarItemProps) => void;
}>({
  addSnackbar: noop,
});

const SnackbarItem = ({
  id,
  title,
  type,
  top = 0,
  speed = 150,
  className,
  index,
  clear,
}: SnackbarItemProps & { clear: (id: number | string) => void }) => {
  const { isLeaving } = useNotification(id, clear);

  return (
    <Snackbar
      top={top + index * 40}
      speed={speed}
      leaving={isLeaving}
      className={className}
    >
      <CloseIcon onClick={() => clear(id)} />
      {getIcon(type)}

      <Meta>
        <SnackbarTitle>{title}</SnackbarTitle>
      </Meta>
    </Snackbar>
  );
};

export const SnackbarProvider = ({
  children,
  throttle = 200,
}: {
  children: ReactNode;
  throttle?: number;
}) => {
  const { list, clear, addNotification } = useNotifications<SnackbarItemProps>({ throttle });

  const snackbars = useMemo(
    () =>
      list.map((config, index) => (
        <SnackbarItem key={config.id} {...config} index={index} clear={clear} />
      )),
    [clear, list]
  );

  return (
    <Context.Provider value={{ addSnackbar: addNotification }}>
      {snackbars}

      {children}
    </Context.Provider>
  );
};

export const useSnackbar = () => useContext(Context);
