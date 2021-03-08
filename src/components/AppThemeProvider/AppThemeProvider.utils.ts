import {
  AppTheme,
  PaletteAddition,
  PaletteAdditions,
} from '../../types/theme.types';
import { extendTheme } from '../../utils/theme.utils';
import { darkTheme, lightTheme } from '../../constants/themes.constants';
import { get, isEmpty } from 'lodash/fp';

const GeneralPaletteReversedKeys = {
  '100': '800',
  '200': '700',
  '300': '600',
  '350': '500',
  '400': '400',
  '500': '350',
  '600': '300',
  '700': '200',
  '800': '100',
};

const PrimaryPaletteReversedKeys = {
  '0': '700',
  '50': '600',
  '100': '500',
  '200': '400',
  '300': '300',
  '400': '200',
  '500': '100',
  '600': '50',
  '700': '0',
};

const reversePaletteKey = (key: string): string => {
  const keyPrefix = key[0].toLowerCase();
  const keyNumber = key.substring(1);
  const reversedKeyNumber =
    keyPrefix === 'p'
      ? PrimaryPaletteReversedKeys[keyNumber]
      : GeneralPaletteReversedKeys[keyNumber];

  return `${keyPrefix}${reversedKeyNumber}`;
};

const reversePalette = (paletteAddition: PaletteAddition): PaletteAddition => {
  const reversedPalette: PaletteAddition = {};
  for (const key in paletteAddition) {
    if (paletteAddition.hasOwnProperty(key)) {
      reversedPalette[reversePaletteKey(key)] = paletteAddition[key];
    }
  }

  return reversedPalette;
};

const reversePaletteAdditions = (
  paletteAdditions: PaletteAdditions
): PaletteAdditions => {
  const reversed = [];
  for (const palette of paletteAdditions) {
    reversed.push(reversePalette(palette));
  }

  return reversed;
};

export const buildTheme = (
  customTheme: Partial<AppTheme>,
  paletteAdditions: PaletteAdditions,
  isOverrideForCustomTheme: boolean
): AppTheme => {
  const isDark = !!customTheme?.isDark;
  const baseTheme = isDark ? darkTheme : lightTheme;
  const overridePaletteArrays = isDark
    ? reversePaletteAdditions(paletteAdditions)
    : paletteAdditions;
  const overridePalette = overridePaletteArrays.reduce((acc, current) => {
    return Object.assign(acc, current);
  }, {});

  if (!isEmpty(customTheme)) {
    const extendedCustomTheme = {
      ...overridePalette,
      ...extendTheme(
        { ...baseTheme },
        {
          isDark,
          accent: get('accent', customTheme),
          primary: get('primary', customTheme),
          secondary: get('secondary', customTheme),
          customColors: get('customColors', customTheme),
          font: get('font', customTheme),
          scale: get('scale', customTheme),
        }
      ),
    };
    return isOverrideForCustomTheme
      ? { ...extendedCustomTheme, ...overridePalette }
      : extendedCustomTheme;
  }
  return {
    ...baseTheme,
    ...overridePalette,
  };
};
