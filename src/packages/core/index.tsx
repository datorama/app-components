import React, {ReactNode} from 'react';
import {ThemeProvider} from 'styled-components';

// LIB CORE
import * as libColors from 'common/colors';
import * as typography from 'common/typography';
import { fade, fadeDown, fadeLeft, fadeOut, fadeRight, fadeRightExit, fadeUp, fadeUpExit, zoomIn, zoomOut } from 'common/animations';
import * as layout from 'common/layout';

// UTILS
export {hexToRgba, shadeColor, uuid, extendTheme} from '../../common/utils';

type appThemeProps = {
  provider: any,
  theme: object,
  children: ReactNode
};

export const AppTheme = ({provider: Provider, theme, children}: appThemeProps) => {
  // useEffect(() => {
  //   loadFonts(theme.font);
  // }, [theme]);

  return (
    <Provider theme={theme}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </Provider>
  );
};

// Hooks
export * from '../../common/hooks';

// DEFAULT COMPONENTS HEIGHTS
const SMALL = '24px';
const MEDIUM = '30px';
const LARGE = '34px';

const size = {
  SMALL,
  MEDIUM,
  LARGE
};

// LIGHT THEME
export const lightTheme = {
  ...libColors.lightTheme,
  darkTheme: libColors.darkTheme,
  lightTheme: libColors.lightTheme,
  text: typography,
  animation: { fade, fadeDown, fadeLeft, fadeOut, fadeRight, fadeRightExit, fadeUp, fadeUpExit, zoomIn, zoomOut },
  size
};

// DARK THEME
export const darkTheme = {
  ...libColors.darkTheme,
  lightTheme: libColors.lightTheme,
  darkTheme: libColors.darkTheme,
  text: typography,
  animation: { fade, fadeDown, fadeLeft, fadeOut, fadeRight, fadeRightExit, fadeUp, fadeUpExit, zoomIn, zoomOut },
  size
};

// COLORS
export const lightPrimary = libColors.lightPrimary;
export const lightAccent = libColors.lightAccent;
export const darkPrimary = libColors.darkPrimary;
export const darkAccent = libColors.darkAccent;
export const lightSecondary = libColors.lightSecondary;
export const darkSecondary = libColors.darkSecondary;

export const reds = libColors.reds;
export const greens = libColors.greens;
export const yellows = libColors.yellows;
export const oranges = libColors.oranges;

// GRID LAYOUT
export const Container = layout.Container;
export const Row = layout.Row;
export const Col = layout.Col;

// COMPONENTS
export {default as Button} from './Button';
