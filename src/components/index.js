import * as libColors from './colors';
import * as typography from './typography';
import * as animation from './animations';
import * as layout from './layout';

// utils
export { default as ClickOut } from './base/ClickOut';

// base components
export { default as Button } from './base/Button';
export { default as Card } from './base/Card';
export { default as Datepicker } from './base/Datepicker';
export { default as Select } from './base/Select/Select';

// default sizes (height)
const SMALL = '24px';
const MEDIUM = '34px';
const LARGE = '44px';
const sizes = {
  SMALL,
  MEDIUM,
  LARGE
};

// light theme
export const lightTheme = {
  ...libColors.lightTheme,
  text: typography,
  animation,
  sizes
};

// dark theme
export const darkTheme = {
  ...libColors.darkTheme,
  text: typography,
  animation,
  sizes
};

export const lightPrimary = libColors.lightPrimary;
export const lightAccent = libColors.lightAccent;
export const darkPrimary = libColors.darkPrimary;
export const darkAccent = libColors.darkAccent;

export const reds = libColors.reds;
export const greens = libColors.greens;
export const yellows = libColors.yellows;
export const oranges = libColors.oranges;

// layout
export const Container = layout.Container;
export const Row = layout.Row;
export const Col = layout.Col;
