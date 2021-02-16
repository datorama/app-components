import React, { useEffect, ReactNode } from 'react';
import { ThemeProvider } from 'styled-components';
import { isEmpty } from 'lodash/fp';
import { GlobalStyles } from './GlobalStyles/GlobalStyles';
import { loadFonts } from '../utils/theme.utils';

import { Theme } from '../types/theme.types';

interface Props {
  children?: ReactNode | ReactNode[];
  customColorPrefixes?: string[];
  theme: Theme;
  provider: typeof ThemeProvider;
}

export const AppTheme = (props: Props) => {
  const { provider: Provider, theme, children, customColorPrefixes } = props;

  useEffect(() => {
    if (!isEmpty(theme.font)) {
      loadFonts(theme.font);
    }
  }, [theme]);

  return (
    <Provider theme={theme}>
      <ThemeProvider theme={theme}>
        <GlobalStyles theme={theme} customColorPrefixes={customColorPrefixes} />
        {children}
      </ThemeProvider>
    </Provider>
  );
};

AppTheme.defaultProps = {
  customColorPrefixes: [],
};
