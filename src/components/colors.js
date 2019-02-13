// light theme
export const lightPrimary = {
	p0: '#ffffff',
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
	p700: '#ffffff',
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

export const reds = {
	r50: '#FBEDED',
	r100: '#F6D1D2',
	r200: '#EEA5A5',
	r300: '#E67878',
	r400: '#DE4B4C',
	r500: '#B83E3F',
	r600: '#923132',
	r700: '#6B2424',
	r800: '#551C1D'
};

export const greens = {
	g50: '#E7F8EF',
	g100: '#C2EDD8',
	g200: '#86DBB1',
	g300: '#49C98A',
	g400: '#0DB864',
	g500: '#0A9853',
	g600: '#087941',
	g700: '#065930',
	g800: '#044626'
};

export const yellows = {
	y50: '#FFF8E7',
	y100: '#FFF2CF',
	y200: '#FFE6A0',
	y300: '#FFDA71',
	y400: '#FFCE42',
	y500: '#D4AB36',
	y600: '#A8872B',
	y700: '#7C6420',
	y800: '#624F19'
};

export const oranges = {
	o50: '#FFF4E6',
	o100: '#FFE5BF',
	o200: '#FFCB80',
	o300: '#FFB141',
	o400: '#FF9802',
	o500: '#FF8601',
	o600: '#FF7301',
	o700: '#994500',
	o800: '#402100'
};

const multi = {
	reds,
	greens,
	yellows,
	oranges
};

export const darkTheme = {...darkPrimary, ...darkAccent, ...multi};
export const lightTheme = {...lightPrimary, ...lightAccent, ...multi};

export const list = {
	...lightAccent,
	...lightPrimary,
	...darkAccent,
	...darkPrimary,
	...multi
};