import React from 'react';
import {ThemeProvider} from 'styled-components';
import {lightTheme} from '../src/index';

const ThemeDecorator = storyFn => (
	<React.StrictMode>
		<ThemeProvider theme={lightTheme}>{storyFn()}</ThemeProvider>
	</React.StrictMode>
);

export default ThemeDecorator
