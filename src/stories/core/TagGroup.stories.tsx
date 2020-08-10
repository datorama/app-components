import React from "react";
import { action } from "@storybook/addon-actions";

// Components
import TagGroup, { TagGroupProps } from "packages/core/TagGroup";

export const Default = (props: TagGroupProps) => <TagGroup onChange={action("clicked")} {...props} />;

Default.args = {
  onChange: () => {},
  isDisabled: false,
  tags: [
    {id: 'marketing', label: 'Marketing'},
    {id: 'social', label: 'Social'},
    {id: 'media', label: 'Media'}
  ],
  selected: ['marketing']
};

export default {
  title: "Core/TagGroup",
  component: TagGroup,
  argTypes: {
    color: {
      control: {
        type: 'color'
      }
    }
  },
};
