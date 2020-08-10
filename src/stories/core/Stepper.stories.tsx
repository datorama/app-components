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
      description: "Array of steps: `{ id: number | string; label: string; isEnabled: boolean; isTouched?: boolean; }[]`"
    },
    currentStep: {
      control: { type: 'number', min: 0, max: 2 },
      description: "Current step index: `number`"
    },
    selectStep: {
      description: 'Callback on step selection: `(stepIndex: number) => void`'
    },
    className: {
      control: 'text',
      description: 'Custom class name passed to main container'
    }
  }
};
