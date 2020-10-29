import noDataLightXS from './assets/no-data/no-data-xs-light.svg';
import noDataLightS from './assets/no-data/no-data-s-light.svg';
import noDataLightM from './assets/no-data/no-data-m-light.svg';
import noDataLightL from './assets/no-data/no-data-l-light.svg';
import noDataLightXL from './assets/no-data/no-data-xl-light.svg';
import noDataDarkXS from './assets/no-data/no-data-xs-dark.svg';
import noDataDarkS from './assets/no-data/no-data-s-dark.svg';
import noDataDarkM from './assets/no-data/no-data-m-dark.svg';
import noDataDarkL from './assets/no-data/no-data-l-dark.svg';
import noDataDarkXL from './assets/no-data/no-data-xl-dark.svg';
import tooMuchDataLightXS from './assets/too-much-data/too-much-data-xs-light.svg';
import tooMuchDataLightS from './assets/too-much-data/too-much-data-s-light.svg';
import tooMuchDataLightM from './assets/too-much-data/too-much-data-m-light.svg';
import tooMuchDataLightL from './assets/too-much-data/too-much-data-l-light.svg';
import tooMuchDataLightXL from './assets/too-much-data/too-much-data-xl-light.svg';
import tooMuchDataDarkXS from './assets/too-much-data/too-much-data-xs-dark.svg';
import tooMuchDataDarkS from './assets/too-much-data/too-much-data-s-dark.svg';
import tooMuchDataDarkM from './assets/too-much-data/too-much-data-m-dark.svg';
import tooMuchDataDarkL from './assets/too-much-data/too-much-data-l-dark.svg';
import tooMuchDataDarkXL from './assets/too-much-data/too-much-data-xl-dark.svg';
import errorDarkXS from './assets/error/error-l-dark.svg';
import errorDarkS from './assets/error/error-l-dark.svg';
import errorDarkM from './assets/error/error-l-dark.svg';
import errorDarkL from './assets/error/error-l-dark.svg';
import errorDarkXL from './assets/error/error-xl-dark.svg';
import errorLightXS from './assets/error/error-l-light.svg';
import errorLightS from './assets/error/error-l-light.svg';
import errorLightM from './assets/error/error-l-light.svg';
import errorLightL from './assets/error/error-l-light.svg';
import errorLightXL from './assets/error/error-xl-light.svg';

export const TYPE = {
  NO_DATA: 'NO_DATA',
  TOO_MUCH_DATA: 'TOO_MUCH_DATA',
  ERROR: 'ERROR',
};

export const MODE = {
  DARK: 'DARK',
  LIGHT: 'LIGHT',
};

export const SIZE = {
  XS: 'XS',
  S: 'S',
  M: 'M',
  L: 'L',
  XL: 'XL',
};

export const ILLUSTRATION = {
  [TYPE.NO_DATA]: {
    [MODE.LIGHT]: {
      [SIZE.XS]: noDataLightXS,
      [SIZE.S]: noDataLightS,
      [SIZE.M]: noDataLightM,
      [SIZE.L]: noDataLightL,
      [SIZE.XL]: noDataLightXL,
    },
    [MODE.DARK]: {
      [SIZE.XS]: noDataDarkXS,
      [SIZE.S]: noDataDarkS,
      [SIZE.M]: noDataDarkM,
      [SIZE.L]: noDataDarkL,
      [SIZE.XL]: noDataDarkXL,
    },
  },
  [TYPE.TOO_MUCH_DATA]: {
    [MODE.LIGHT]: {
      [SIZE.XS]: tooMuchDataLightXS,
      [SIZE.S]: tooMuchDataLightS,
      [SIZE.M]: tooMuchDataLightM,
      [SIZE.L]: tooMuchDataLightL,
      [SIZE.XL]: tooMuchDataLightXL,
    },
    [MODE.DARK]: {
      [SIZE.XS]: tooMuchDataDarkXS,
      [SIZE.S]: tooMuchDataDarkS,
      [SIZE.M]: tooMuchDataDarkM,
      [SIZE.L]: tooMuchDataDarkL,
      [SIZE.XL]: tooMuchDataDarkXL,
    },
  },
  [TYPE.ERROR]: {
    [MODE.LIGHT]: {
      [SIZE.XS]: errorLightXS,
      [SIZE.S]: errorLightS,
      [SIZE.M]: errorLightM,
      [SIZE.L]: errorLightL,
      [SIZE.XL]: errorLightXL,
    },
    [MODE.DARK]: {
      [SIZE.XS]: errorDarkXS,
      [SIZE.S]: errorDarkS,
      [SIZE.M]: errorDarkM,
      [SIZE.L]: errorDarkL,
      [SIZE.XL]: errorDarkXL,
    },
  },
};

export const TITLE = {
  [TYPE.NO_DATA]: "There's no data",
  [TYPE.TOO_MUCH_DATA]: "There's too much data",
  [TYPE.ERROR]: 'Oops! Something went wrong',
};

export const SUBTITLE = {
  [TYPE.NO_DATA]: '',
  [TYPE.TOO_MUCH_DATA]: '',
  [TYPE.ERROR]: 'Please try again later',
};
