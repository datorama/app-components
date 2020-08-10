import React from "react";

import RadialProgress, { RadialProgressProps } from 'packages/core/Progress/RadialProgress';

export const Default = (props: RadialProgressProps) => {
  return (
    <RadialProgress
      percentage={20}
      radius={26}
      {...props}
    />
  );
};

export default {
  title: "Core/Radial Progress",
  component: RadialProgress,
  argTypes: {
    color: {
      control: { type: 'color' }
    },
    percentage: {},
    radius: {},
    className: {}
  }
};
