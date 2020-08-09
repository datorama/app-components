import React, { useState } from "react";

// Components
import Stepper, { StepperProps } from "packages/core/Stepper/Stepper";

export const DefaultStepper = (props: StepperProps) => {
  const [currentStep, setCurrentStep] = useState<number | string>(0);

  return (
    <Stepper
      steps={[
        { id: 0, label: "My brand", isEnabled: true, isTouched: true },
        { id: 1, label: "Competitors", isEnabled: true },
        { id: 2, label: "Summary", isEnabled: false },
      ]}
      currentStep={currentStep}
      selectStep={setCurrentStep}
      {...props}
    />
  );
};

export default {
  title: "Core/Stepper",
  component: Stepper
};
