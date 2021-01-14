/* eslint react/prop-types: 0 */
import React, { useContext, useMemo, Fragment } from 'react';

// Styles
import {
  Meta,
  SnackbarTitle,
  CloseIcon,
  Snackbar,
} from './notifications.styles';

// Utils
import {
  useNotifications,
  useNotification,
  getIcon,
} from './notifications.utils';

const Context = React.createContext();

const SnackbarItem = ({
  id,
  title,
  type,
  timeout = 5000,
  top = 0,
  speed = 150,
  className,
  index,
  clear,
}) => {
  const { isLeaving } = useNotification(id, clear, timeout);

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
  const { list, clear, addNotification, clearAll } = useNotifications({
    throttle,
  });

  const snackbars = useMemo(
    () =>
      list.map((config, index) => (
        <SnackbarItem key={config.id} {...config} index={index} clear={clear} />
      )),
    [clear, list]
  );

  return (
    <Context.Provider
      value={{
        addSnackbar: addNotification,
        onClearAll: clearAll,
        onClear: clear,
      }}
    >
      <Fragment>
        {snackbars}

        {children}
      </Fragment>
    </Context.Provider>
  );
};

export const useSnackbar = () => useContext(Context);
