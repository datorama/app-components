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
  component: Stepper,
  argTypes: {
    'Type: Step': {
      type: "",
      description: "`{\n" +
        "  id: StepId;\n" +
        "  label: string;\n" +
        "  isEnabled: boolean;\n" +
        "  isTouched?: boolean;\n" +
        "}`"
    },
    steps: {
      type: {
        required: true
      },
      control: 'object',
      description: "Array of steps",
    },
    currentStep: {
      type: {
        required: true
      },
      control: { type: 'number', min: 0, max: 2 },
      description: "Current step index"
    },
    selectStep: {
      type: {
        required: true
      },
      description: 'Callback on step selection'
    },
    className: {
      control: 'text',
      description: 'Custom class name passed to main container'
    }
  }
};
