import * as libColors from './colors';
import * as typography from './typography';
import * as animation from './animations';
import * as layout from './layout';

// utils
export {default as ClickOut} from './base/ClickOut';

// base components
export {default as Button} from './base/Button';
export {default as Card} from './base/Card';
export {default as Datepicker} from './base/Datepicker';
export {default as Select} from './base/Select/Select';

// light theme
export const lightTheme = {
	...libColors.lightTheme,
	text: typography,
	animation
};

// dark theme
export const darkTheme = {
	...libColors.darkTheme,
	text: typography,
	animation
};

export const lightPrimary = libColors.lightPrimary;
export const lightAccent = libColors.lightAccent;
export const darkPrimary = libColors.darkPrimary;
export const darkAccent = libColors.darkAccent;

// layout
export const Container = layout.Container;
export const Row = layout.Row;
export const Col = layout.Col;