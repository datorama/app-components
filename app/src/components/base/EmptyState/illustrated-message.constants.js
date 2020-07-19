export const TYPE = {
  NO_DATA: 'NO_DATA',
  TOO_MUCH_DATA: 'TOO_MUCH_DATA',
  ERROR: 'ERROR'
};

export const MODE = {
  DARK: 'DARK',
  LIGHT: 'LIGHT'
};

export const SIZE = {
  XS: 'XS',
  S: 'S',
  M: 'M',
  L: 'L',
  XL: 'XL'
};

export const ILLUSTRATION = {
  [TYPE.NO_DATA]: {
    [MODE.LIGHT]: {
      [SIZE.XS]: require('./assets/no-data/no-data-xs-light.svg'),
      [SIZE.S]: require('./assets/no-data/no-data-s-light.svg'),
      [SIZE.M]: require('./assets/no-data/no-data-m-light.svg'),
      [SIZE.L]: require('./assets/no-data/no-data-l-light.svg'),
      [SIZE.XL]: require('./assets/no-data/no-data-xl-light.svg')
    },
    [MODE.DARK]: {
      [SIZE.XS]: require('./assets/no-data/no-data-xs-dark.svg'),
      [SIZE.S]: require('./assets/no-data/no-data-s-dark.svg'),
      [SIZE.M]: require('./assets/no-data/no-data-m-dark.svg'),
      [SIZE.L]: require('./assets/no-data/no-data-l-dark.svg'),
      [SIZE.XL]: require('./assets/no-data/no-data-xl-dark.svg')
    }
  },
  [TYPE.TOO_MUCH_DATA]: {
    [MODE.LIGHT]: {
      [SIZE.XS]: require('./assets/too-much-data/too-much-data-xs-light.svg'),
      [SIZE.S]: require('./assets/too-much-data/too-much-data-s-light.svg'),
      [SIZE.M]: require('./assets/too-much-data/too-much-data-m-light.svg'),
      [SIZE.L]: require('./assets/too-much-data/too-much-data-l-light.svg'),
      [SIZE.XL]: require('./assets/too-much-data/too-much-data-xl-light.svg')
    },
    [MODE.DARK]: {
      [SIZE.XS]: require('./assets/too-much-data/too-much-data-xs-dark.svg'),
      [SIZE.S]: require('./assets/too-much-data/too-much-data-s-dark.svg'),
      [SIZE.M]: require('./assets/too-much-data/too-much-data-m-dark.svg'),
      [SIZE.L]: require('./assets/too-much-data/too-much-data-l-dark.svg'),
      [SIZE.XL]: require('./assets/too-much-data/too-much-data-xl-dark.svg')
    }
  },
  [TYPE.ERROR]: {
    [MODE.LIGHT]: {
      [SIZE.XS]: require('./assets/error/error-l-light.svg'),
      [SIZE.S]: require('./assets/error/error-l-light.svg'),
      [SIZE.M]: require('./assets/error/error-l-light.svg'),
      [SIZE.L]: require('./assets/error/error-xl-light.svg'),
      [SIZE.XL]: require('./assets/error/error-xl-light.svg')
    },
    [MODE.DARK]: {
      [SIZE.XS]: require('./assets/error/error-l-dark.svg'),
      [SIZE.S]: require('./assets/error/error-l-dark.svg'),
      [SIZE.M]: require('./assets/error/error-l-dark.svg'),
      [SIZE.L]: require('./assets/error/error-xl-dark.svg'),
      [SIZE.XL]: require('./assets/error/error-xl-dark.svg')
    }
  }
};

export const TITLE = {
  [TYPE.NO_DATA]: "There's no data",
  [TYPE.TOO_MUCH_DATA]: "There's too much data",
  [TYPE.ERROR]: 'Oops! Something went wrong'
};

export const SUBTITLE = {
  [TYPE.NO_DATA]: '',
  [TYPE.TOO_MUCH_DATA]: '',
  [TYPE.ERROR]: 'Please try again later'
};
