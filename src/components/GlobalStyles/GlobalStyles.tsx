import React from 'react';
import {
  createGlobalStyle,
  DefaultTheme,
  GlobalStyleComponent,
} from 'styled-components';

const getThemeColor = (
  theme: Record<string, any>,
  colorPrefix: string,
  index: number
) => theme[`${colorPrefix}${index}`];

const generateSvgMixinsRules = (
  theme: Record<string, any>,
  colorPrefix: string,
  paletteStops: number[],
  styleAttribute: string
): string[] => {
  const rules: string[] = [];

  for (const index of paletteStops) {
    rules.push(`.${colorPrefix}-${index}-${styleAttribute} {
     ${styleAttribute}: ${getThemeColor(theme, colorPrefix, index)};
   };`);
  }
  return rules;
};

const generateSvgMixins = (
  svgMixinsArray: string[],
  theme: Record<string, any>,
  customColorPrefixes: string[]
) => {
  const colorPrefixes = [
    'a',
    's',
    'p',
    ...customColorPrefixes.map((prefix) => `custom-${prefix}`),
  ];
  let result: string[][] = [];

  for (const colorPrefix of colorPrefixes) {
    const paletteStops =
      colorPrefix === 'p'
        ? [0, 50, 100, 200, 300, 400, 500, 600, 700]
        : [100, 200, 300, 350, 400, 500, 600, 700, 800];

    result = result.concat(
      svgMixinsArray.map((x) => {
        return generateSvgMixinsRules(theme, colorPrefix, paletteStops, x);
      })
    );
  }

  return result
    .reduce((allRules: string[], rules: string[]) => allRules.concat(rules), [])
    .join('');
};

export function generateGlobalStyles(
  theme: Record<string, any>,
  customColorPrefixes: string[]
): GlobalStyleComponent<any, DefaultTheme> {
  const globalStyles = createGlobalStyle`
    ${generateSvgMixins(
      ['fill', 'stroke', 'stop-color'],
      theme,
      customColorPrefixes
    )}`;

  return globalStyles;
}

export interface GlobalStylesProps {
  theme: Record<string, any>;
  customColorPrefixes?: string[];
}

export const GlobalStyles = ({
  theme,
  customColorPrefixes,
}: GlobalStylesProps) => {
  const GlobalStyleElement = generateGlobalStyles(theme, customColorPrefixes);
  return <GlobalStyleElement />;
};
