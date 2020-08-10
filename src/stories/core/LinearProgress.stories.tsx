import React from 'react';

// Components
import LinearProgress, { LinearProgressProps } from 'packages/core/LinearProgress'

export const Default = (props: LinearProgressProps) => {
  return (
    <LinearProgress {...props}/>
  );
};

Default.args = {}

export default {
  title: 'Core/LinearProgress',
  component: LinearProgress,
  argTypes: {
    color: {
      control: { type: 'color' }
    },
    className: {
      control: null
    }
  }
};
