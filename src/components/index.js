import * as libColors from './colors';
import * as typography from './typography';
import * as animate from './animations';

// light theme
export const lightTheme = {
	...libColors.lightTheme,
	text: typography,
	animate
};

// dark theme
export const darkTheme = {
	...libColors.darkTheme,
	text: typography,
	animate
};

export const lightPrimary = libColors.lightPrimary;
export const lightAccent = libColors.lightAccent;
export const darkPrimary = libColors.darkPrimary;
export const darkAccent = libColors.darkAccent;