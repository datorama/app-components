import React, { useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import { isEmpty } from 'lodash/fp';

// LIB CORE
import * as libColors from './colors';
import * as typography from './typography';
import * as animation from './animations';
import * as layout from './layout';

// UTILS
export {
  hexToRgba,
  shadeColor,
  uuid,
  extendTheme,
  hexToPalette
} from './utils';

// BASE COMPONENTS
export { default as Button } from './base/Button';
export { default as SegmentedButton } from './base/SegmentedButton';
export { default as Card } from './base/Card';
export { default as Carousel } from './base/Carousel';
export { default as Checkbox } from './base/Checkbox';
export { default as ClickOut } from './base/ClickOut';
export { default as Collapse } from './base/Collapse';
export { default as Collapsible } from './base/Collapsible';
export { default as Draggable } from './base/Draggable';
export { default as Droppable } from './base/Droppable';
export { default as DragDropProvider } from './base/DragDropProvider';
export { default as LinearProgress } from './base/LinearProgress';
export { default as Modal } from './base/Modal';
export { default as Select } from './base/Select/Select';
export { default as Progress } from './base/Progress';
export { default as RadialProgress } from './base/RadialProgress';
export { default as Range } from './base/Range';
export { default as Spinner } from './base/Spinner';
export { default as Stepper } from './base/Stepper';
export { default as Tabs } from './base/Tabs';
export { default as Tag } from './base/Tag';
export { default as TagGroup } from './base/TagGroup';
export { default as TextInput } from './base/TextInput';
export { default as Ellipsis } from './base/Ellipsis';
export { default as Table } from './base/Table';
export { default as Filters } from './base/Filters/Filters';
export { default as Tornado } from './base/Tornado/Tornado';
export { default as ThemePreview } from './base/ThemePreview';
export {
  TopTornadoLabel,
  BottomTornadoStatsLabel
} from './base/Tornado/retail-labels';
export {
  withToast,
  withSnackbar,
  default as ToastsProvider
} from './base/Toasts';
export {
  useSnackbar,
  useToast,
  NotificationsProvider
} from './base/Notifications';
export { default as Toggle } from './base/Toggle';
export { default as Tooltip } from './base/Tooltip';
export { default as Widget } from './base/Widget';
export { default as Pagination } from './base/Pagination';
export { default as Datepicker } from './base/Datepicker/Datepicker';
export { default as MultiProgress } from './base/MultiProgress';
export { default as ErrorPage } from './base/ErrorPage';
export { default as Sticky } from './base/Sticky';
export { default as SnailChart } from './base/charts/SnailChart';
export { default as GoalsChart } from './base/charts/GoalsChart';
export { default as Gauge } from './base/charts/Gauge';
export {
  default as IllustratedMessage
} from './base/EmptyState/IllustratedMessage';

const loadFonts = font => {
  const head = document.head || document.getElementsByTagName('head')[0],
    style = document.createElement('style');

  head.appendChild(style);

  const css = `
          ${font.url? `@import url('${font.url}');`:''} 

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

// DEFAULT COMPONENTS HEIGHTS
const SMALL = '24px';
const MEDIUM = '30px';
const LARGE = '34px';
const size = {
  SMALL,
  MEDIUM,
  LARGE
};

// LIGHT THEME
export const lightTheme = {
  ...libColors.lightTheme,
  darkTheme: libColors.darkTheme,
  lightTheme: libColors.lightTheme,
  text: typography,
  animation,
  size
};

// DARK THEME
export const darkTheme = {
  ...libColors.darkTheme,
  lightTheme: libColors.lightTheme,
  darkTheme: libColors.darkTheme,
  text: typography,
  animation,
  size
};

// COLORS
export const lightPrimary = libColors.lightPrimary;
export const lightAccent = libColors.lightAccent;
export const darkPrimary = libColors.darkPrimary;
export const darkAccent = libColors.darkAccent;
export const lightSecondary = libColors.lightSecondary;
export const darkSecondary = libColors.darkSecondary;

export const reds = libColors.reds;
export const greens = libColors.greens;
export const yellows = libColors.yellows;
export const oranges = libColors.oranges;

// GRID LAYOUT
export const Container = layout.Container;
export const Row = layout.Row;
export const Col = layout.Col;
