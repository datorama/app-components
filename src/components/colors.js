// light theme
export const lightPrimary = {
	p0: '#ﬀﬀﬀ',
	p50: '#F7F8FA',
	p100: '#F1F2F5',
	p200: '#CCCED3',
	p300: '#9EA0A5',
	p400: '#67696F',
	p500: '#4F5053',
	p600: '#37383A',
	p700: '#2E2F30'
};

export const lightAccent = {
	a100: '#E3F2FD',
	a200: '#BBDEFB',
	a300: '#77C5FD',
	a350: '#40B2FE',
	a400: '#09A0FF',
	a500: '#317EEB',
	a600: '#1C61D7',
	a700: '#0D47A1',
	a800: '#072A60'
};

// dark theme
export const darkPrimary = {
	p700: '#ﬀﬀﬀ',
	p600: '#F7F8FA',
	p500: '#F1F2F5',
	p400: '#CCCED3',
	p300: '#9EA0A5',
	p200: '#67696F',
	p100: '#4F5053',
	p50: '#37383A',
	p0: '#2E2F30'
};

export const darkAccent = {
	a800: '#E3F2FD',
	a700: '#BBDEFB',
	a600: '#77C5FD',
	a500: '#40B2FE',
	a400: '#09A0FF',
	a350: '#317EEB',
	a300: '#1C61D7',
	a200: '#0D47A1',
	a100: '#072A60'
};

export const darkTheme = {...darkPrimary, ...darkAccent};
export const lightTheme = {...lightPrimary, ...lightAccent};

export const list = {
	...lightAccent,
	...lightPrimary,
	...darkAccent,
	...darkPrimary
};