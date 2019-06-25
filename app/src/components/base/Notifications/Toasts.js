import React, { useMemo, Fragment, useContext } from 'react';

// Styles
import {
  Meta,
  Subtitle,
  Title,
  CloseIcon,
  Toast
} from './notifications.styles';

// Utils
import {
  useNotifications,
  useNotification,
  getIcon
} from './notifications.utils';

const Context = React.createContext();

const ToastItem = ({ id, title, subtitle, type, index, clear }) => {
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

export const ToastsProvider = ({ children }) => {
  const { list, clear, addNotification } = useNotifications();

  const toasts = useMemo(
    () =>
      list.map((config, index) => (
        <ToastItem key={config.id} {...config} index={index} clear={clear} />
      )),
    [clear, list]
  );

  return (
    <Context.Provider value={{ addToast: addNotification }}>
      <Fragment>
        {toasts}

        {children}
      </Fragment>
    </Context.Provider>
  );
};

export const useToast = () => useContext(Context);
