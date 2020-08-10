import React from "react";
import { action } from "@storybook/addon-actions";

// Components
import Tag, { TagProps } from "packages/core/Tag";

export const Default = (props: TagProps) => {
  return (
    <Tag onClick={action("clicked")} {...props}>
      Default Tag
    </Tag>
  );
};

export default {
  title: "Core/Tag",
  component: Tag
};
