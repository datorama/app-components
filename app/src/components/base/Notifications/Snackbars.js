import React, { useContext, useMemo, Fragment } from 'react';

// Styles
import {
  Meta,
  SnackbarTitle,
  CloseIcon,
  Snackbar
} from './notifications.styles';

// Utils
import {
  useNotifications,
  useNotification,
  getIcon
} from './notifications.utils';

const Context = React.createContext();

const SnackbarItem = ({
  id,
  title,
  type,
  top = 0,
  speed = 150,
  className,
  index,
  clear
}) => {
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

export const SnackbarProvider = ({ children, throttle = 200 }) => {
  const { list, clear, addNotification } = useNotifications({ throttle });

  const snackbars = useMemo(
    () =>
      list.map((config, index) => (
        <SnackbarItem key={config.id} {...config} index={index} clear={clear} />
      )),
    [clear, list]
  );

  return (
    <Context.Provider value={{ addSnackbar: addNotification }}>
      <Fragment>
        {snackbars}

        {children}
      </Fragment>
    </Context.Provider>
  );
};

export const useSnackbar = () => useContext(Context);
