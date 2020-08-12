import { ChangeEvent, ReactNode } from "react";

export interface OptionType extends Record<string, any> {
  label: string;
  value: string | number;
}

export type GroupOptionType = {
  label: string;
  options: OptionType[];
};

type HeaderRenderer = ({
  values,
  placeholder,
  options,
  isOpen,
  toggleOpen,
}: {
  values: OptionType[];
  placeholder?: string;
  options: OptionType[] | GroupOptionType[];
  isOpen: boolean;
  toggleOpen: () => void;
}) => JSX.Element;

type OptionRenderer = ({
  option,
  selected,
  toggleOpen,
}: {
  option: OptionType;
  selected?: OptionType;
  toggleOpen?: () => void;
}) => JSX.Element;

type OptionLabelRenderer = (option: OptionType) => JSX.Element;

type PlaceholderRenderer = ({
  label,
  isAllSelected,
  numOFSelected,
  total,
}: {
  label: string;
  isAllSelected: boolean;
  numOFSelected: number;
  total: number;
}) => JSX.Element;

export interface SelectionMenuProps extends SelectProps {
  isOpen: boolean;
  onSearch: (event: ChangeEvent<HTMLInputElement>) => void;
  getOptions: () => OptionType[] | GroupOptionType[];
  selectAll: () => void;
  onSelect: (option: OptionType) => void;
  searchTerm: string;
  total: number;
  currentHoveredOptionValue?: string | number | null;
  toggleOpen: () => void;
  toggleFocus: () => void;
}

export interface SelectProps {
  className?: string;
  options: OptionType[] | GroupOptionType[];
  values: OptionType[];
  onChange: (values: OptionType[], isAllSelected: boolean) => void;
  onKeyDown?: () => void;
  onKeyUp?: () => void;
  onClose?: () => void;
  onOpen?: () => void;
  placeholder?: string;
  sortBy?: string;
  searchBy?: string[];
  debounce?: number;
  headerRenderer?: HeaderRenderer;
  optionRenderer?: OptionRenderer;
  optionLabelRenderer?: OptionLabelRenderer;
  placeholderRenderer?: PlaceholderRenderer;
  noResultsRenderer?: () => ReactNode;
  menuRenderer?: (
    props: Omit<SelectionMenuProps, "maxTags" | "onChange" | "options">
  ) => JSX.Element;
  maxItems?: number;
  maxTags: number;
  closeOnSelect?: boolean;
  sortDirection?: "asc" | "desc";
  spinnerColor?: string;
  searchPlaceholder?: string;
  isError?: boolean;
  isSmall?: boolean;
  isLarge?: boolean;
  isSortable?: boolean;
  isMulti?: boolean;
  isDisabled?: boolean;
  isSearchable?: boolean;
  isKeepOpen?: boolean;
  isLoading?: boolean;
  isInlineSearch?: boolean;
  isClearOnClose?: boolean;
  isKeepSelected?: boolean;
  isDisableSearch?: boolean;
}
