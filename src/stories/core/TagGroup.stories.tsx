import React from "react";
import { action } from "@storybook/addon-actions";

import TagGroup, { TagGroupProps } from "packages/core/TagGroup";

import { withTypesTable } from "common/utils";

export const Default = (props: TagGroupProps) => <TagGroup {...props} />;

Default.args = {
  onChange: action("clicked"),
  isDisabled: false,
  tags: [
    { id: "marketing", label: "Marketing" },
    { id: "social", label: "Social" },
    { id: "media", label: "Media" },
  ],
  selected: ["marketing"],
};

export default {
  title: "Core/Tag Group",
  parameters: {
    docs: {
      container: withTypesTable([
        {
          label: "Tag",
          type: `{
  id: string | number;
  label: string;
}`,
        },
      ]),
    },
  },
  component: TagGroup,
  argTypes: {
    color: {
      control: {
        type: "color",
      },
    },
  },
};
