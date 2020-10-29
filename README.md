# app-components

> Datorama React components library

![Size](https://img.badgesize.io/datorama/app-components/master/dist/index.js?compression=gzip&label=Size%20(gzip)&color=blue)
![GitHub package.json version](https://img.shields.io/github/package-json/v/datorama/app-components.svg)
![GitHub issues](https://img.shields.io/github/issues-raw/datorama/app-components.svg)
![GitHub package.json dependency version (dev dep on branch)](https://img.shields.io/github/package-json/dependency-version/datorama/app-components/dev/react.svg)

## Installation
```bash
npm install --save @datorama/app-components
```

```jsx
import { AppTheme, lightTheme } from '@datorama/app-components';
import { ThemeProvider } from 'styled-components';
    
const App = () => (
  <AppTheme theme={lightTheme} provider={ThemeProvider}>
    ...
  </AppTheme>
);

// CSS
// @import '~@datorama/app-components/index.css';
```

## Local Development

Clone the repo, install packages and run;

```bash
npm run storybook
```

## Publish a new release

First, Make sure that everything is working, well documented and backward compatible.
Clean up all the lint issues after running

```bash
npm run lint
``` 

In your pull request bump the package version (`minor`, `major` or `patch`) by running:

```bash
npm version **** 
```

After the pull request is merged to master, checkout to master and run:

```bash
npm run build:package
```

and to publish it to NPM - make sure your'e in the root folder and run:

```bash
npm publish:package
```

Alternatively, you can go to the dist folder and run `npm publish`.

## Importing images

With the current Rollup loader all images are loaded as components!
