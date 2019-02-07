import * as libColors from './colors';
import * as typography from './typography';

// theme
export const lightTheme = {
	...libColors.lightTheme,
	text: typography
};
export const darkTheme = {
	...libColors.darkTheme,
	text: typography
};

export const lightPrimary = libColors.lightPrimary;
export const lightAccent = libColors.lightAccent;
export const darkPrimary = libColors.darkPrimary;
export const darkAccent = libColors.darkAccent;