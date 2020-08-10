import { css } from "styled-components";
import { ThemeContext } from "styled-components";
import { DocsContainer } from "@storybook/addon-docs/blocks";
import Highlight from "react-highlight.js";
import Color from 'color';

import * as typography from "common/typography";
import React, { ReactNode, useContext } from "react";


export const hexToRgba = (hex: string, opacity: number) => {
  hex = hex.replace("#", "");

  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  return `rgba(${r}, ${g}, ${b}, ${opacity / 100})`;
};

const getShadePercent = (varNum: number) => {
  const accent = varNum.toString();

  switch (accent) {
    case "0":
      return 1;
    case "50":
      return 0.9;
    case "100":
      return 0.75;
    case "200":
      return 0.6;
    case "300":
      return 0.3;
    case "350":
      return 0.3;
    case "400":
      return 0;
    case "500":
      return -0.25;
    case "600":
      return -0.45;
    case "700":
      return -0.55;
    case "800":
      return -0.75;
    default:
      return 1;
  }
};

export const shadeColor = (argColor: string, varNum: number) => {
  let color = argColor;
  if (color.toUpperCase() === "#FFF") {
    color = "#ffffff";
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
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0,
      v = c === "x" ? r : (r & 0x3) | 0x8;

    return v.toString(16);
  });
};

interface Colors {
  [key: string]: string;
}

export const getColors = (
  hex: string,
  arr: Array<number>,
  dark: boolean,
  prefix: string
) => {
  const result: Colors = {};

  for (let i = 0; i < arr.length; i++) {
    result[`${prefix}${arr[i]}`] =
      arr[i] === 400
        ? hex
        : shadeColor(hex, dark ? arr[arr.length - 1 - i] : arr[i]);
  }

  return result;
};

type extendConfig = {
  theme: object;
  options: {
    primary?: string;
    secondary?: string;
    dark: boolean;
    accent?: string;
    font?: string;
    scale?: number;
  };
};

export const extendTheme = ({ theme, options }: extendConfig) => {
  let newTheme: any = { ...theme };

  // colors
  if (options.primary) {
    const arr = [0, 50, 100, 200, 300, 400, 500, 600, 700];

    newTheme = {
      ...newTheme,
      ...getColors(options.primary, arr, options.dark, "p"),
    };
  }

  if (options.secondary) {
    const arr = [0, 50, 100, 200, 300, 400, 500, 600, 700];

    newTheme = {
      ...newTheme,
      ...getColors(options.secondary, arr, options.dark, "s"),
    };
  }

  if (options.accent) {
    const arr = [100, 200, 300, 350, 400, 500, 600, 700, 800];

    newTheme = {
      ...newTheme,
      ...getColors(options.accent, arr, options.dark, "a"),
    };
  }

  // typography
  newTheme.font = options.font || "open-sans";

  // scale
  const scale = options.scale ? 1 + options.scale / 10 : 1;

  newTheme.scale = scale;

  // scale size
  newTheme.size = {
    SMALL: `${24 * scale}px`,
    MEDIUM: `${30 * scale}px`,
    LARGE: `${34 * scale}px`,
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
    tooltip,
  };

  return newTheme;
};

export const noop = () => null;

export const useTheme = () => useContext(ThemeContext);

export const withTypesTable = (types: { label: string; type: string }[]) => ({
  children,
  context,
}: {
  children: ReactNode;
  context: any;
}) => (
  <DocsContainer context={context}>
    {children}

    <div className="types-table-title">Types</div>

    <div className="types-table-wrapper">
      <table className="types-table">
        <thead className="docblock-argstable-head">
          <tr className="types-table-th">
            <th className="types-table-th">Name</th>
            <th className="types-table-th">Type</th>
          </tr>
        </thead>

        <tbody className="types-table-body">
          {types.map(({ label, type }) => (
            <tr className="types-table-body-tr" key={label}>
              <td className="types-table-td ">{label}</td>
              <td className="types-table-td ">
                <Highlight language="typescript">{type}</Highlight>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </DocsContainer>
);

export const fadeColor = (color: string, amount: number) => Color(color).fade(amount).hsl().string();

export const lightenColor = (color: string, amount: number) => Color(color).lighten(amount).hsl().string();

export const darkenColor = (color: string, amount: number) => Color(color).darken(amount).hsl().string();

export const lightnessColor = (color: string, amount: number) => Color(color).lightness(amount).hsl().string();

export const saturateColor = (color: string, amount: number) => Color(color).saturate(amount).hsl().string();

export const desaturateColor = (color: string, amount: number) => Color(color).desaturate(amount).hsl().string();

export const grayscaleColor = (color: string) => Color(color).grayscale().hsl().string();

export const whitenColor = (color: string, amount: number) => Color(color).whiten(amount).hsl().string();

export const blackenColor = (color: string, amount: number) => Color(color).blacken(amount).hsl().string();

export const opaquerColor = (color: string, amount: number) => Color(color).opaquer(amount).hsl().string();

export const rotateColor = (color: string, amount: number) => Color(color).rotate(amount).hsl().string();

export const isLight = (color: string) => Color(color).isLight();

export const isDark = (color: string) => Color(color).isDark();

