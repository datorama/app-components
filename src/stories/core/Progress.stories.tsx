import React from "react";
import Progress, { ProgressProps } from "packages/core/Progress/Progress";

export const Default = (props: ProgressProps) => <Progress {...props} />;
;
Default.arg = {
  label: "20%",
  percentage: 20,
};

export default {
  title: "Core/Progress",
  component: Progress,
  argTypes: {
    label: {},
    color: {
      control: { type: "color" },
    },
    percentage: {},
    isDisabled: {},
    className: {},
  },
};
