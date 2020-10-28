/* eslint react/prop-types: 0 */
import React, { useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import { isEmpty } from 'lodash/fp';

const loadFonts = (font) => {
  const head = document.head || document.getElementsByTagName('head')[0],
    style = document.createElement('style');

  head.appendChild(style);

  const css = `
          ${font.url ? `@import url('${font.url}');` : ''}

          body, input, select, textarea, button {
            font-family: ${font.family};
          }
        `;

  style.type = 'text/css';
  if (style.styleSheet) {
    // This is required for IE8 and below.
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
};

export const AppTheme = ({ provider: Provider, theme, children }) => {
  useEffect(() => {
    if (!isEmpty(theme.font)) {
      loadFonts(theme.font);
    }
  }, [theme]);

  return (
    <Provider theme={theme}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </Provider>
  );
};
