import { css } from 'styled-components';
import * as typography from './typography';
import { isEmpty } from 'lodash/fp';

export const hexToRgba = (hex, opacity) => {
  if (typeof hex !== 'string') {
    return hex;
  }

  hex = hex.replace('#', '');

  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  return `rgba(${r}, ${g}, ${b}, ${opacity / 100})`;
};

const getShadePercent = varNum => {
  const accent = varNum.toString();
  switch (accent) {
    case '0':
      return 1;
    case '50':
      return 0.9;
    case '100':
      return 0.75;
    case '200':
      return 0.6;
    case '300':
      return 0.3;
    case '350':
      return 0.3;
    case '400':
      return 0;
    case '500':
      return -0.25;
    case '600':
      return -0.45;
    case '700':
      return -0.55;
    case '800':
      return -0.75;
    default:
      return 1;
  }
};

export const shadeColor = (argColor, varNum) => {
  let color = argColor;
  if (color.toUpperCase() === '#FFF') {
    color = '#ffffff';
  }

  const percent = getShadePercent(varNum);
  const f = parseInt(color.slice(1), 16),
    t = percent < 0 ? 0 : 255,
    p = percent < 0 ? percent * -1 : percent,
    R = f >> 16,
    G = (f >> 8) & 0x00ff,
    B = f & 0x0000ff;

  return `#${(
    0x1000000 +
    (Math.round((t - R) * p) + R) * 0x10000 +
    (Math.round((t - G) * p) + G) * 0x100 +
    (Math.round((t - B) * p) + B)
  )
    .toString(16)
    .slice(1)}`;
};

export const uuid = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = (Math.random() * 16) | 0,
      v = c === 'x' ? r : (r & 0x3) | 0x8;

    return v.toString(16);
  });
};

export const hexToPalette = ({ hex, isDark, prefix }) => {
  return getColors(
    hex,
    [100, 200, 300, 400, 500, 600, 700],
    isDark,
    prefix || ''
  );
};

export const getColors = (hex, arr, dark, prefix) => {
  const result = {};

  for (let i = 0; i < arr.length; i++) {
    result[`${prefix}${arr[i]}`] =
      arr[i] === 400
        ? hex
        : shadeColor(hex, dark ? arr[arr.length - 1 - i] : arr[i]);
  }

  return result;
};

export const extendTheme = ({ theme, options }) => {
  let newTheme = { ...theme };

  // colors
  if (options.primary) {
    const arr = [0, 50, 100, 200, 300, 400, 500, 600, 700];

    newTheme = {
      ...newTheme,
      ...getColors(options.primary, arr, options.isDark, 'p')
    };
  }

  if (options.secondary) {
    const arr = [0, 50, 100, 200, 300, 400, 500, 600, 700];

    newTheme = {
      ...newTheme,
      ...getColors(options.secondary, arr, options.isDark, 's')
    };
  }

  if (options.accent) {
    const arr = [100, 200, 300, 350, 400, 500, 600, 700, 800];

    newTheme = {
      ...newTheme,
      ...getColors(options.accent, arr, options.isDark, 'a')
    };
  }

  // handle custom colors
  if (!isEmpty(options.customColors)) {
    for (let i = 0; i < options.customColors.length; i++) {
      const prefix = `c${i + 1}`;

      newTheme[prefix] = hexToPalette({
        hex: options.customColors[i],
        isDark: options.isDark
      });
    }
  }

  // typography
  const defaultFont = {
    url: 'https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700',
    family: "'Open Sans', sans-serif"
  };

  newTheme.font = !isEmpty(options.font) ? options.font : defaultFont;

  // scale
  let scale = options.scale || 1;

  if (scale > 1) {
    scale = 1 + options.scale / 10;
  }

  newTheme.scale = scale;

  // scale size
  newTheme.size = {
    SMALL: `${24 * scale}px`,
    MEDIUM: `${30 * scale}px`,
    LARGE: `${34 * scale}px`
  };

  // scale typography
  const headline = css`
    ${typography.headline};
    font-size: ${34 * scale}px;
  `;

  const subHeadline = css`
    ${typography.subHeadline};
    font-size: ${18 * scale}px;
  `;

  const p = css`
    ${typography.p};
    font-size: ${14 * scale}px;
  `;

  const pBold = css`
    ${typography.pBold};
    font-size: ${14 * scale}px;
  `;

  const pLink = css`
    ${typography.pLink};
    font-size: ${14 * scale}px;
  `;

  const pNote = css`
    ${typography.pNote};
    font-size: ${14 * scale}px;
  `;

  const pItalic = css`
    ${typography.pItalic};
    font-size: ${14 * scale}px;
  `;

  const sm = css`
    ${typography.sm};
    font-size: ${12 * scale}px;
  `;

  const smBold = css`
    ${typography.smBold};
    font-size: ${12 * scale}px;
  `;

  const smLink = css`
    ${typography.smLink};
    font-size: ${12 * scale}px;
  `;

  const smNote = css`
    ${typography.smNote};
    font-size: ${12 * scale}px;
  `;

  const smItalic = css`
    ${typography.smItalic};
    font-size: ${12 * scale}px;
  `;

  const tooltip = css`
    ${typography.tooltip};
    font-size: ${11 * scale}px;
  `;

  newTheme.text = {
    headline,
    subHeadline,
    p,
    pBold,
    pLink,
    pNote,
    pItalic,
    sm,
    smBold,
    smLink,
    smNote,
    smItalic,
    tooltip
  };

  return newTheme;
};
