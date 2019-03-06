# app-components

> Datorama React components library

![Size](https://img.badgesize.io/datorama/app-components/master/dist/index.js?compression=gzip&label=Size%20(gzip)&color=blue)
![GitHub package.json version](https://img.shields.io/github/package-json/v/datorama/app-components.svg)
![GitHub issues](https://img.shields.io/github/issues-raw/datorama/app-components.svg)
![GitHub package.json dependency version (dev dep on branch)](https://img.shields.io/github/package-json/dependency-version/datorama/app-components/dev/react.svg)

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
