import React from 'react';
import '../src/index.css';
import "highlightjs/styles/agate.css";
import {ThemeProvider} from 'styled-components';
import {lightTheme} from '../src/packages/core';

const StyleDecorator = (Story: any) => (
  <ThemeProvider theme={lightTheme}>
    <Story />
  </ThemeProvider>
);

export default StyleDecorator;
