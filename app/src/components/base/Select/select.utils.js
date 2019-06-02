import { flatMap, get, sumBy, size } from 'lodash/fp';

export const hasGroups = options => get([0, 'options'], options);

export const getOptionsSize = options => {
  if (hasGroups(options)) {
    return sumBy(option => size(get('options', option)), options);
  } else {
    return size(options);
  }
};

export const getOptionsValues = options => {
  if (hasGroups(options)) {
    return flatMap('options', options);
  } else {
    return [...options];
  }
};
