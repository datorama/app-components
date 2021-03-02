# app-components

> Datorama React components library

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

1. Make sure that everything is working, well documented and backward compatible.
2. Clean up all the lint issues after running

```bash
npm run lint
``` 

3. Add your release notes with the next version to the notes page.

4. In your pull request bump the package version (`minor`, `major` or `patch`) by running:

```bash
npm version **** 
```
5. Before merging to master, check that you aren't overriding an existing version. If you are - update your branch version.
   
6. After the pull request is merged to master, checkout to master and run:

```bash
npm run build:package
```

7. To publish it to NPM - make sure you're in the root folder and run:

```bash
npm publish:package
```

Alternatively, you can go to the dist folder and run `npm publish`.

## Importing images

With the current Rollup loader all images are loaded as components!

