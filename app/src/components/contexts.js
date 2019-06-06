import React from 'react';
import { noop } from 'lodash/fp';

export const SelectMeuContext = React.createContext({
  onMenuEnter: noop,
  onMenuLeave: noop
});
