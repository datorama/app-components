import React from "react";
import Progress, { ProgressProps } from 'packages/core/Progress/Progress';

export const DefaultProgress = (props: ProgressProps) => {
  return (
    <Progress label="20%" percentage={20} {...props}/>
  );
};

export default {
  title: "Core/Progress",
  component: Progress,
};
