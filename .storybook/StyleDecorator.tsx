import React from 'react';
import '../src/index.css';
import {ThemeProvider} from 'styled-components';
import {lightTheme} from '../src/packages/core';

const StyleDecorator = (storyFn: any) => (
  <ThemeProvider theme={lightTheme}>
    {storyFn()}
  </ThemeProvider>
);

export default StyleDecorator;
