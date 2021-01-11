import * as React from 'react';

// Assets
import { ReactComponent as ErrorLight } from '../assets/error/error-light.svg';
import { ReactComponent as ErrorDark } from '../assets/error/error-dark.svg';

import { ReactComponent as NoDataLight } from '../assets/no-data/no-data-light.svg';
import { ReactComponent as NoDataDark } from '../assets/no-data/no-data-dark.svg';

import { ReactComponent as NoDataSmallLight } from '../assets/no-data/no-data-s-light.svg';
import { ReactComponent as NoDataSmallDark } from '../assets/no-data/no-data-s-dark.svg';

import { ReactComponent as TooMuchDataLight } from '../assets/too-much-data/too-much-data-light.svg';
import { ReactComponent as TooMuchDataDark } from '../assets/too-much-data/too-much-data-dark.svg';

import { ReactComponent as TooMuchDataSmallLight } from '../assets/too-much-data/too-much-data-s-light.svg';
import { ReactComponent as TooMuchDataSmallDark } from '../assets/too-much-data/too-much-data-s-dark.svg';

type NameTypes =
  | 'error-state'
  | 'no-data'
  | 'no-data-small'
  | 'too-much-data'
  | 'too-much-data-small';

export interface Props {
  className?: string;
  isDark?: boolean;
  name: NameTypes;
}

export const Asset = (props: Props) => {
  const { isDark, className, name } = props;

  let Comp = null;
  let viewBox = '';

  switch (name) {
    case 'error-state':
      Comp = isDark ? ErrorDark : ErrorLight;
      viewBox = '0 0 340 197';
      break;

    case 'no-data':
      Comp = isDark ? NoDataDark : NoDataLight;
      viewBox = isDark ? '0 0 500 314' : '0 0 503 316';
      break;

    case 'no-data-small':
      Comp = isDark ? NoDataSmallDark : NoDataSmallLight;
      viewBox = '0 0 110 83';
      break;

    case 'too-much-data':
      Comp = isDark ? TooMuchDataDark : TooMuchDataLight;
      viewBox = isDark ? '0 0 520 326' : '0 0 520 317';
      break;

    case 'too-much-data-small':
      Comp = isDark ? TooMuchDataSmallDark : TooMuchDataSmallLight;
      viewBox = '0 0 110 83';
      break;

    default:
      return null;
  }

  return (
    <Comp
      preserveAspectRatio="xMidYMid meet"
      viewBox={viewBox}
      className={className}
    />
  );
};
