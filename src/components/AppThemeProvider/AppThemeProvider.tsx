import React, { useEffect, ReactNode, useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { isEmpty } from 'lodash/fp';
import { GlobalStyles } from '../GlobalStyles/GlobalStyles';
import { loadFonts } from '../../utils/theme.utils';

import { AppTheme, PaletteAdditions } from '../../types/theme.types';
import { buildTheme } from './AppThemeProvider.utils';

interface Props {
  children?: ReactNode | ReactNode[];
  customColorPrefixes?: string[];
  theme: AppTheme;
  provider: typeof ThemeProvider;
  paletteAdditions?: PaletteAdditions;
}

export const AppThemeProvider = (props: Props) => {
  const {
    provider: Provider,
    theme,
    children,
    customColorPrefixes,
    paletteAdditions = [],
  } = props;
  const [appTheme, setAppTheme] = useState<AppTheme>(theme);

  useEffect(() => {
    if (!isEmpty(theme.font)) {
      loadFonts(theme.font);
    }
    setAppTheme(buildTheme(theme, paletteAdditions));
  }, [theme, paletteAdditions]);

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
