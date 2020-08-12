import { flatMap, get, sumBy, size, forEach } from "lodash/fp";

import { GroupOptionType, OptionType } from "packages/select/types";

export const hasGroups = (options: OptionType[] | GroupOptionType[]) =>
  get([0, "options"], options);

export const getOptionsSize = (options: OptionType[] | GroupOptionType[]) => {
  if (hasGroups(options)) {
    return sumBy(
      (option) => size(option?.options),
      options as GroupOptionType[]
    );
  } else {
    return size(options);
  }
};

/**
 * @param options An array of Option or GroupOption
 * @returns {...*[]|*} Array of flattened options
 */
export const getAllOptions = (options: OptionType[] | GroupOptionType[]) => {
  if (hasGroups(options)) {
    return flatMap("options", options);
  } else {
    return [...options];
  }
};

export const getOptionByValue = (
  options: OptionType[] | GroupOptionType[],
  value: string | number | null
) =>
  value
    ? getAllOptions(options).find((option) => option.value === value)
    : null;

export const calcScrollTop = (
  optionElement: HTMLElement,
  containerElement: HTMLElement,
  offset = 0
) => {
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

export const getOptionHeight = ({
  isSmall,
  isLarge,
  theme,
}: {
  isSmall?: boolean;
  isLarge?: boolean;
  theme: Record<string, any>;
}) => {
  if (isSmall) return parseInt(theme.size.SMALL);
  if (isLarge) return parseInt(theme.size.LARGE);
  return parseInt(theme.size.MEDIUM);
};

export const getFlatOptions = (groups: GroupOptionType[]): OptionType[] => {
  const flatOptions: OptionType[] = [];

  forEach((group) => {
    flatOptions.push(...group.options);
  }, groups);

  return flatOptions;
};
