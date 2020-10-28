import * as libColors from './colors.constants';
import * as typography from './typography.constants';
import * as animation from './animations.constants';

const SMALL = '24px';
const MEDIUM = '30px';
const LARGE = '34px';
const size = {
  SMALL,
  MEDIUM,
  LARGE,
};

export const lightTheme = {
  ...libColors.lightTheme,
  darkTheme: libColors.darkTheme,
  lightTheme: libColors.lightTheme,
  text: typography,
  animation,
  size,
};

export const darkTheme = {
  ...libColors.darkTheme,
  lightTheme: libColors.lightTheme,
  darkTheme: libColors.darkTheme,
  text: typography,
  animation,
  size,
};
