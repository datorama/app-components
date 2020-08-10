import React from 'react';

// Components
import Spinner, { SpinnerProps } from 'packages/core/Spinner'

export default {
  title: 'Core/Spinner',
  component: Spinner,
  argTypes: {
    color: {
      control: { type: 'color' }
    },
    className: {}
  }
};

export const Default = (props: SpinnerProps) => {
  return (
    <Spinner {...props}/>
  )
};
