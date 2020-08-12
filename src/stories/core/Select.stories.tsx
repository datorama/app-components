import React from "react";

import Select from "packages/select/Select";

import { SelectProps } from "packages/select/types";

import { withTypesTable } from "common/utils";

export const Default = (props: SelectProps) => {
  return (
    <div style={{ height: 200, width: 170 }}>
      <Select {...props} />
    </div>
  );
};

const DEFAULT_ARGS = {
  options: [
    { value: "1", label: "orange" },
    { value: "2", label: "purple" },
    { value: "3", label: "black" },
    { value: "4", label: "green" },
    { value: "5", label: "yellow" },
    { value: "6", label: "white" },
  ],
  placeholder: "Select colors",
  onChange: () => {},
  values: [],
};

Default.args = DEFAULT_ARGS;

export const Group = (props: SelectProps) => (
  <div style={{ height: 200, width: 170 }}>
    <Select {...props} />
  </div>
);

Group.args = {
  options: [
    {
      label: "Colors",
      options: [
        { value: "1", label: "orange" },
        { value: "2", label: "purple" },
        { value: "3", label: "black" },
        { value: "4", label: "green" },
        { value: "5", label: "yellow" },
        { value: "6", label: "white" },
      ],
    },
    {
      label: "Fruits",
      options: [
        { value: "7", label: "apple" },
        { value: "8", label: "orange" },
        { value: "9", label: "pear" },
        { value: "10", label: "melon" },
      ],
    },
  ],
  placeholder: "Select colors / fruits",
  isSearchable: true,
  isInlineSearch: true,
  isMulti: true,
  maxTags: 2,
  values: [],
};

export const Searchable = (props: SelectProps) => (
  <div style={{ height: 200, width: 170 }}>
    <Select {...props} />
  </div>
);

Searchable.args = {
  ...DEFAULT_ARGS,
  isSearchable: true,
  isSmall: true,
};

export const InlineSearch = (props: SelectProps) => (
  <div style={{ height: 200, width: 170 }}>
    <Select {...props} />
  </div>
);

InlineSearch.args = {
  ...DEFAULT_ARGS,
  isInlineSearch: true,
};

export const MultiSelect = (props: SelectProps) => (
  <div style={{ height: 200, width: 170 }}>
    <Select {...props} />
  </div>
);

MultiSelect.args = {
  ...DEFAULT_ARGS,
  isInlineSearch: true,
  isMulti: true,
  maxTags: 2,
};

export const Loading = (props: SelectProps) => (
  <div style={{ height: 200, width: 170 }}>
    <Select {...props} />
  </div>
);

Loading.args = {
  ...DEFAULT_ARGS,
  isInlineSearch: true,
  isMulti: true,
  maxTags: 2,
  isLoading: true,
};

export default {
  title: "Core/Select",
  component: Select,
  parameters: {
    docs: {
      container: withTypesTable([
        {
          label: "Option",
          type: `{
  value: string | number;
  label: string;
}`,
        },
        {
          label: "GroupOption",
          type: `{
  label: string;
  options: Option[];
}`,
        },
        {
          label: "HeaderRenderer",
          type: `({
  values,
  placeholder,
  options,
  isOpen,
  toggleOpen
}): {
  values: Option[];
  placeholder?: string;
  options: Option[] | GroupOption[];
  isOpen: boolean;
  toggleOpen: () => void;
}) => ReactNode`,
        },
        {
          label: "OptionRenderer",
          type: `({
  option,
  selected,
  toggleOpen
}: {
  option: Option;
  selected?: Option;
  toggleOpen?: () => void;
}) => ReactNode`,
        },
        {
          label: "OptionLabelRenderer",
          type: `(option: Option) => ReactNode`,
        },
        {
          label: "PlaceholderRenderer",
          type: `({
  label,
  isAllSelected,
  numOFSelected,
  total,
}: {
  label: string;
  isAllSelected: boolean;
  numOFSelected: number;
  total: number;
}) => ReactNode`,
        },
      ]),
    },
  },
  argTypes: {
    options: {
      description: "Array of Option[] or GroupOption[] objects",
    },
    values: {
      description: "Array of selected options",
    },
  },
};
