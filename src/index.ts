import * as libColors from './constants/colors.constants';
import * as layout from './constants/layout.constants';

// UTILS
export {
  hexToRgba,
  shadeColor,
  extendTheme,
  hexToPalette,
} from './utils/theme.utils';
export { uuid } from './utils/common.utils';

// GRID LAYOUT
export const Container = layout.Container;
export const Row = layout.Row;
export const Col = layout.Col;

// THEMES
export { lightTheme, darkTheme } from './constants/themes.constants';

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

// Components
export { AppTheme } from './components/AppTheme';
export { Button } from './components/Button';
export { SegmentedButton } from './components/SegmentedButton/SegmentedButton';
export { Card } from './components/Card';
export { Carousel } from './components/Carousel';
export { Checkbox } from './components/Checkbox';
export { ClickOut } from './components/ClickOut';
export { Collapse } from './components/Collapse';
export { Collapsible } from './components/Collapsible';
export { LinearProgress } from './components/LinearProgress';
export { Modal } from './components/Modal';
export { Select } from './components/Select/Select';
export { Progress } from './components/Progress';
export { RadialProgress } from './components/RadialProgress';
export { Range } from './components/Range';
export { Spinner } from './components/Spinner';
export { Stepper } from './components/Stepper';
export { Tabs } from './components/Tabs';
export { Tag } from './components/Tag';
export { TagGroup } from './components/TagGroup';
export { TextInput } from './components/TextInput';
export { Filters } from './components/Filters/Filters';
export { Tornado } from './components/Tornado/Tornado';
export { ThemePreview } from './components/ThemePreview';
export {
  TopTornadoLabel,
  BottomTornadoStatsLabel,
} from './components/Tornado/TornadoLabels';
export { Toggle } from './components/Toggle';
export { Tooltip } from './components/Tooltip';
export { WidgetOverlay } from './components/WidgetOverlay/WidgetOverlay';
export { Pagination } from './components/Pagination';
export { Datepicker } from './components/Datepicker/Datepicker';
export { MultiProgress } from './components/MultiProgress';
export { ErrorPage } from './components/ErrorPage';
export {
  useSnackbar,
  useToast,
  NotificationsProvider,
} from './components/Notifications';
export { SnailChart } from './components/SnailChart';
export { GoalsChart } from './components/GoalsChart/GoalsChart';
export { Gauge } from './components/Gauge';
export { Grid } from './components/Grid/Grid';
export { GridLayout } from './components/GridLayout/GridLayout';
export { GridItem } from './components/GridLayout/GridItem';

// Hooks
export { useConfirmationModal } from './hooks/confirmation-modal.hooks';

// Pending Deprecation
export { IllustratedMessage } from './components/IllustratedMessage/IllustratedMessage';
export { Ellipsis } from './components/Ellipsis';
export { Draggable } from './components/Draggable';
export { Droppable } from './components/Droppable';
export { DragDropProvider } from './components/DragDropProvider';
export { withToast, withSnackbar, ToastsProvider } from './components/Toasts';
export { Table } from './components/Table';
export { BasicLine } from './components/BasicLine/BasicLine';
export { Asset } from './components/Asset';
