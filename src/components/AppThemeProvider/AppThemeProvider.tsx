import React, { useEffect, ReactNode, useState, useMemo } from 'react';
import { ThemeProvider } from 'styled-components';
import { isEmpty } from 'lodash/fp';
import { GlobalStyles } from '../GlobalStyles/GlobalStyles';
import { loadFonts } from '../../utils/theme.utils';

import { AppTheme, PaletteAdditions } from '../../types/theme.types';
import { buildTheme } from './AppThemeProvider.utils';

interface Props {
  children?: ReactNode | ReactNode[];
  customColorPrefixes?: string[];
  theme?: Partial<AppTheme>;
  provider: typeof ThemeProvider;
  paletteAdditions?: PaletteAdditions;
  isOverrideForCustomTheme?: boolean;
}

export const AppThemeProvider = (props: Props) => {
  const {
    provider: Provider,
    theme = {},
    children,
    customColorPrefixes = [],
    paletteAdditions = [],
    isOverrideForCustomTheme = false,
  } = props;

  const appTheme = useMemo(
    () => buildTheme(theme, paletteAdditions, isOverrideForCustomTheme),
    [theme, paletteAdditions, isOverrideForCustomTheme]
  );

  useEffect(() => {
    if (!isEmpty(theme.font)) {
      loadFonts(theme.font);
    }
  }, [theme]);

  return (
    <Provider theme={appTheme}>
      <ThemeProvider theme={appTheme}>
        <GlobalStyles
          theme={appTheme}
          customColorPrefixes={customColorPrefixes}
        />
        {children}
      </ThemeProvider>
    </Provider>
  );
};

AppThemeProvider.defaultProps = {
  customColorPrefixes: [],
};
