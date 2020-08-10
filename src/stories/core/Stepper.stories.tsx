import React from "react";

// Components
import Stepper, { StepperProps } from "packages/core/Stepper/Stepper";

export const Default = (props: StepperProps) => {
  return (
    <Stepper
      {...props}
    />
  );
};

Default.args = {
  steps: [
    { id: 0, label: "My brand", isEnabled: true, isTouched: true },
    { id: 1, label: "Competitors", isEnabled: true },
    { id: 2, label: "Summary", isEnabled: false },
  ],
  currentStep: 0,
  selectStep: () => {},
  className: ' '
};

export default {
  title: "Core/Stepper",
  argTypes: {
    steps: {
      control: 'object',
    },
    currentStep: {
      control: { type: 'number', min: 0, max: 2 }
    },
    selectStep: {
      table: { disable: true }
    },
    className: {
      control: 'text'
    }
  }
};
