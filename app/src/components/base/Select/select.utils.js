import { flatMap, get, sumBy, size } from 'lodash/fp';

export const hasGroups = options => get([0, 'options'], options);

export const getOptionsSize = options => {
  if (hasGroups(options)) {
    return sumBy(option => size(get('options', option)), options);
  } else {
    return size(options);
  }
};

/**
 * @param options An array of Option or GroupOption
 * @returns {...*[]|*} Array of flattened options
 */
export const getAllOptions = options => {
  if (hasGroups(options)) {
    return flatMap('options', options);
  } else {
    return [...options];
  }
};

export const getOptionByValue = (options, value) =>
  getAllOptions(options).find(option => option.value === value);
