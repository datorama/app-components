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

export const calcScrollTop = (optionElement, containerElement, offset = 0) => {
  if (optionElement.offsetTop === offset) {
    return 0;
  } else if (
    optionElement.offsetTop + optionElement.clientHeight >
    containerElement.clientHeight + containerElement.scrollTop
  ) {
    return (
      optionElement.offsetTop +
      optionElement.clientHeight -
      containerElement.clientHeight
    );
  } else if (optionElement.offsetTop < containerElement.scrollTop) {
    return containerElement.scrollTop - optionElement.clientHeight;
  }

  return containerElement.scrollTop;
};
