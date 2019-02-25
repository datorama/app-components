import React from 'react';
import { ThemeProvider } from 'styled-components';

// LIB CORE
import * as libColors from '../src/components/colors';
import * as typography from '../src/components/typography';
import * as animation from '../src/components/animations';
import * as layout from '../src/components/layout';

// UTILS
export { hexToRgba, shadeColor } from '../src/components/utils';

// BASE COMPONENTS
export { default as Button } from '../src/components/base/Button';
export {
  default as SegmentedButton
} from '../src/components/base/SegmentedButton';
export { default as Card } from '../src/components/base/Card';
export { default as Carousel } from '../src/components/base/Carousel';
export { default as Checkbox } from '../src/components/base/Checkbox';
export { default as ClickOut } from '../src/components/base/ClickOut';
export { default as Collapse } from '../src/components/base/Collapse';
export { default as Draggable } from '../src/components/base/Draggable';
export {
  default as LinearProgress
} from '../src/components/base/LinearProgress';
export { default as Modal } from '../src/components/base/Modal';
// export { default as Select } from '../src/components/base/Select/Select';
export { default as Progress } from '../src/components/base/Progress';
export {
  default as RadialProgress
} from '../src/components/base/RadialProgress';
export { default as Range } from '../src/components/base/Range';
export { default as Spinner } from '../src/components/base/Spinner';
export { default as Stepper } from '../src/components/base/Stepper';
export { default as Tabs } from '../src/components/base/Tabs';
export { default as Tag } from '../src/components/base/Tag';
export { default as TagGroup } from '../src/components/base/TagGroup';
export { default as TextInput } from '../src/components/base/TextInput';
export {
  withToast,
  default as ToastsProvider
} from '../src/components/base/Toasts';
export { default as Toggle } from '../src/components/base/Toggle';
export { default as Tooltip } from '../src/components/base/Tooltip';
export { default as Widget } from '../src/components/base/Widget';
export { default as Pagination } from '../src/components/base/Pagination';
export { default as Datepicker } from '../src/components/base/Datepicker/Datepicker';

export const AppTheme = ({ provider: Provider, theme, children }) => (
  <Provider theme={theme}>
    <ThemeProvider theme={theme}>{children}</ThemeProvider>
  </Provider>
);

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
  animation,
  size
};

// DARK THEME
export const darkTheme = {
  ...libColors.darkTheme,
  lightTheme: libColors.lightTheme,
  darkTheme: libColors.darkTheme,
  text: typography,
  animation,
  size
};

// COLORS
export const lightPrimary = libColors.lightPrimary;
export const lightAccent = libColors.lightAccent;
export const darkPrimary = libColors.darkPrimary;
export const darkAccent = libColors.darkAccent;

export const reds = libColors.reds;
export const greens = libColors.greens;
export const yellows = libColors.yellows;
export const oranges = libColors.oranges;

// GRID LAYOUT
export const Container = layout.Container;
export const Row = layout.Row;
export const Col = layout.Col;
