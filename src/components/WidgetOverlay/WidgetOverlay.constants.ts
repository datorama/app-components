import noDataLightS from '../../assets/no-data/no-data-s-light.svg';
import noDataDarkS from '../../assets/no-data/no-data-s-dark.svg';
import noDataLight from '../../assets/no-data/no-data-light.svg';
import noDataDark from '../../assets/no-data/no-data-dark.svg';

import tooMuchDataLightS from '../../assets/too-much-data/too-much-data-s-light.svg';
import tooMuchDataDarkS from '../../assets/too-much-data/too-much-data-s-dark.svg';
import tooMuchDataLight from '../../assets/too-much-data/too-much-data-light.svg';
import tooMuchDataDark from '../../assets/too-much-data/too-much-data-dark.svg';

import errorDark from '../../assets/error/error-dark.svg';
import errorLight from '../../assets/error/error-light.svg';

export const TYPE = {
  NO_DATA: 'NO_DATA',
  TOO_MUCH_DATA: 'TOO_MUCH_DATA',
  ERROR: 'ERROR',
};

export const MODE = {
  DARK: 'DARK',
  LIGHT: 'LIGHT',
};

const SIZE = {
  SMALL: 'SMALL',
  NORMAL: 'NORMAL',
};

export const getSize = (width: number) => {
  if (width > 300) {
    return SIZE.NORMAL;
  }

  return SIZE.SMALL;
};

export const ILLUSTRATION = {
  [TYPE.NO_DATA]: {
    [MODE.LIGHT]: {
      [SIZE.NORMAL]: noDataLight,
      [SIZE.SMALL]: noDataLightS,
    },
    [MODE.DARK]: {
      [SIZE.SMALL]: noDataDarkS,
      [SIZE.NORMAL]: noDataDark,
    },
  },
  [TYPE.TOO_MUCH_DATA]: {
    [MODE.LIGHT]: {
      [SIZE.SMALL]: tooMuchDataLightS,
      [SIZE.NORMAL]: tooMuchDataLight,
    },
    [MODE.DARK]: {
      [SIZE.SMALL]: tooMuchDataDarkS,
      [SIZE.NORMAL]: tooMuchDataDark,
    },
  },
  [TYPE.ERROR]: {
    [MODE.LIGHT]: {
      [SIZE.SMALL]: errorLight,
      [SIZE.NORMAL]: errorLight,
    },
    [MODE.DARK]: {
      [SIZE.SMALL]: errorDark,
      [SIZE.NORMAL]: errorDark,
    },
  },
};

export const TITLE = {
  [TYPE.NO_DATA]: "There's no data",
  [TYPE.TOO_MUCH_DATA]: "There's too much data",
  [TYPE.ERROR]: 'Oops! Something went wrong',
};

export const SUBTITLE = {
  [TYPE.NO_DATA]:
    "Try adjusting your search or filter to find what you're looking for",
  [TYPE.TOO_MUCH_DATA]:
    "Try adjusting your search or filter to find what you're looking for",
  [TYPE.ERROR]: 'Please try again later',
};
