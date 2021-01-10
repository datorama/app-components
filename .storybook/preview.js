import ThemeDecorator from './themeDecorator';
import '../src/index.css';

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" }
};

export const decorators = [ThemeDecorator];
