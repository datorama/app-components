import { css } from 'styled-components';

import { SIZE } from './empty-state.constants';

export const TEXT = {
  TITLE: {
    [SIZE.XS]: css``,
    [SIZE.S]: css`
      font-size: 19px;
    `,
    [SIZE.M]: css`
      font-size: 22px;
    `,
    [SIZE.L]: css`
      font-size: 24px;
    `,
    [SIZE.XL]: css`
      font-size: 30px;
    `
  },
  SUBTITLE: {
    [SIZE.XS]: css`
      font-size: 11px;
    `,
    [SIZE.S]: css`
      font-size: 17px;
    `,
    [SIZE.M]: css`
      font-size: 20px;
    `,
    [SIZE.L]: css`
      font-size: 22px;
    `,
    [SIZE.XL]: css`
      font-size: 26px;
    `
  }
};
