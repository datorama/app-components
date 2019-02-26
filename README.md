# app-components

> Datorama React components lib

[![NPM](https://img.shields.io/npm/v/app-components.svg)](https://www.npmjs.com/package/app-components) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install
```bash
npm install --save git+ssh://git@github.com/datorama/app-components.git
```

#### Set up global theme
```jsx
import { AppTheme, lightTheme } from 'app-components';
import { ThemeProvider } from 'styled-components';
    
const App = () => (
  <AppTheme theme={lightTheme} provider={ThemeProvider}>
    ...
  </AppTheme>
);

// CSS
// @import '~app-components/dist/index.css';
```
