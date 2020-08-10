import React from "react";
import {
  withKnobs,
  object,
  select,
} from "@storybook/addon-knobs";

// Components
import Stepper, { StepperProps } from "packages/core/Stepper/Stepper";

export const Default = (props: StepperProps) => {
  const value = select('currentStep', [0, 1, 2], 0);
  const steps = object("steps", [
    { id: 0, label: "My brand", isEnabled: true, isTouched: true },
    { id: 1, label: "Competitors", isEnabled: true },
    { id: 2, label: "Summary", isEnabled: false },
  ]);

  return (
    <Stepper
      steps={steps}
      currentStep={value}
      selectStep={() => {}}
      {...props}
    />
  );
};

export default {
  title: "Core/Stepper",
  component: Stepper,
  decorators: [withKnobs],
};
