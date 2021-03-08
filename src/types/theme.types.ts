import {
  FlattenInterpolation,
  FlattenSimpleInterpolation,
  ThemeProps,
} from 'styled-components';

type Size = {
  SMALL: string;
  MEDIUM: string;
  LARGE: string;
};

type Text = {
  headline: FlattenInterpolation<ThemeProps<any>>;
  subHeadline: FlattenInterpolation<ThemeProps<any>>;
  p: FlattenInterpolation<ThemeProps<any>>;
  pBold: FlattenInterpolation<ThemeProps<any>>;
  pLink: FlattenInterpolation<ThemeProps<any>>;
  pNote: FlattenInterpolation<ThemeProps<any>>;
  pItalic: FlattenInterpolation<ThemeProps<any>>;
  sm: FlattenInterpolation<ThemeProps<any>>;
  smBold: FlattenInterpolation<ThemeProps<any>>;
  smLink: FlattenInterpolation<ThemeProps<any>>;
  smNote: FlattenInterpolation<ThemeProps<any>>;
  smItalic: FlattenInterpolation<ThemeProps<any>>;
  tooltip: FlattenInterpolation<ThemeProps<any>>;
};

type Animation = {
  fade: FlattenSimpleInterpolation;
  fadeOut: FlattenSimpleInterpolation;
  fadeDown: FlattenSimpleInterpolation;
  fadeUpExit: FlattenSimpleInterpolation;
  fadeUp: FlattenSimpleInterpolation;
  fadeLeft: FlattenSimpleInterpolation;
  fadeRight: FlattenSimpleInterpolation;
  fadeRightExit: FlattenSimpleInterpolation;
  zoomIn: FlattenSimpleInterpolation;
  zoomOut: FlattenSimpleInterpolation;
};

type ThemeBase = {
  p0: string;
  p50: string;
  p100: string;
  p200: string;
  p300: string;
  p400: string;
  p500: string;
  p600: string;
  p700: string;
  s100: string;
  s200: string;
  s300: string;
  s350: string;
  s400: string;
  s500: string;
  s600: string;
  s700: string;
  s800: string;
  a100: string;
  a200: string;
  a300: string;
  a350: string;
  a400: string;
  a500: string;
  a600: string;
  a700: string;
  a800: string;
  r50: string;
  r100: string;
  r200: string;
  r300: string;
  r400: string;
  r500: string;
  r600: string;
  r700: string;
  r800: string;
  g50: string;
  g100: string;
  g200: string;
  g300: string;
  g400: string;
  g500: string;
  g600: string;
  g700: string;
  g800: string;
  y50: string;
  y100: string;
  y200: string;
  y300: string;
  y400: string;
  y500: string;
  y600: string;
  y700: string;
  y800: string;
  o50: string;
  o100: string;
  o200: string;
  o300: string;
  o400: string;
  o500: string;
  o600: string;
  o700: string;
  o800: string;
};

export type AppTheme = {
  size: Size;
  animation: Animation;
  text: Text;
  lightTheme: ThemeBase;
  darkTheme: ThemeBase;
  font?: string;
} & Record<string, any>;

export type PaletteAddition = {
  p0?: string;
  p50?: string;
  p100?: string;
  p200?: string;
  p300?: string;
  p400?: string;
  p500?: string;
  p600?: string;
  p700?: string;
  s100?: string;
  s200?: string;
  s300?: string;
  s350?: string;
  s400?: string;
  s500?: string;
  s600?: string;
  s700?: string;
  s800?: string;
  a100?: string;
  a200?: string;
  a300?: string;
  a350?: string;
  a400?: string;
  a500?: string;
  a600?: string;
  a700?: string;
  a800?: string;
};

export type PaletteAdditions = PaletteAddition[];
