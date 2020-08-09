import React from 'react';

// Components
import LinearProgress, { LinearProgressProps } from 'packages/core/LinearProgress'

export default {
  title: 'Core/LinearProgress',
  component: LinearProgress
};

export const Default = (props: LinearProgressProps) => {
  return (
    <LinearProgress {...props}/>
  );
};
