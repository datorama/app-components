# app-components

> Datorama React components library

![Size](https://img.shields.io/static/v1.svg?label=Size%20(gzip)&message=54.81KB&color=blue)
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
