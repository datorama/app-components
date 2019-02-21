import * as libColors from './colors';
import * as typography from './typography';
import * as animation from './animations';
import * as layout from './layout';

// UTILS
//export { default as ClickOut } from './base/ClickOut';

// BASE COMPONENTS
// export { default as Button } from './base/Button';
// export { default as Card } from './base/Card';
// export { default as Datepicker } from './base/Datepicker';
// export { default as Select } from './base/Select/Select';

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
