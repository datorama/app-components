import { shadeColor } from '../../utils/theme.utils';

export const CONTAINER_HEIGHT = 500;
export const ROW_HEIGHT = 40;
export const MARGIN = 40;
export const BASE = (numRows) => [500, 400, 300, 200].slice(0, numRows);
export const MARGINS = [0, 50, 100, 150];
export const ELLIPSES_VERTICAL_OFFSETS = [1, 6, 12, 17];
export const ELLIPSES_RY = [19, 14, 10, 8];
export const INTER_SIN = 160;
export const TORNADO_OFFSET = (numRows) => [
  100,
  20 + (CONTAINER_HEIGHT - numRows * (ROW_HEIGHT + MARGIN)) / 2,
];

export const MAIN_COLORS = (theme) => [
  theme.a600,
  theme.a500,
  theme.a400,
  theme.a300,
  theme.a200,
];

export const CONNECTOR_COLORS = (theme) => [
  shadeColor(theme.a600, 500),
  shadeColor(theme.a500, 500),
  shadeColor(theme.a400, 500),
  shadeColor(theme.a300, 500),
  shadeColor(theme.a200, 500),
];
