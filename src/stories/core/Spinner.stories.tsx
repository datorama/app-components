import React from 'react';

// Components
import Spinner, { SpinnerProps } from 'packages/core/Spinner'

export default {
  title: 'Core/Spinner',
  component: Spinner
};

export const Default = (props: SpinnerProps) => {
  return (
    <Spinner {...props}/>
  )
};
