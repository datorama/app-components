import React, {useState, useCallback, useMemo} from "react";
import styled, { css } from "styled-components";

import StepperBullet from "packages/core/Stepper/StepperBullet";

type StepId = number | string;

type StepType = {
  id: StepId;
  label: string;
  isEnabled: boolean;
  isTouched?: boolean;
};

export interface StepperProps {
  steps: StepType[];
  currentStep: StepId;
  selectStep: (stepId: StepId) => void;
  className?: string;
}

const Stepper = (props: StepperProps) => {
  const { steps = [], currentStep, selectStep, className } = props;
  const [hovered, setHovered] = useState(null);

  const toggleHover = useCallback((id) => setHovered(id), []);

  const content = useMemo(
    () =>
      steps.map((step, index) => (
        <Step
          key={step.id}
          isDisabled={!step.isEnabled}
          onClick={() => selectStep(step.id)}
          onMouseEnter={() => toggleHover(step.id)}
          onMouseLeave={() => toggleHover(null)}
        >
          <StyledBullet
            isHovered={
              hovered === step.id && step.id !== currentStep && step.isEnabled
            }
            isSelected={step.id === currentStep}
            isEnabled={step.isEnabled}
            isTouched={step.isTouched}
          />

          <Label
            isDisabled={!step.isEnabled}
            isSelected={step.id === currentStep}
          >
            {step.label}
          </Label>

          {index !== steps.length - 1 && <Divider />}
        </Step>
      )),
    [currentStep, hovered, selectStep, steps, toggleHover]
  );

  return <Container className={className}>{content}</Container>;
};

const Container = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

const Step = styled.div<{ isDisabled: boolean }>`
  display: flex;
  align-items: center;
  cursor: pointer;

  ${({ isDisabled }) =>
    isDisabled &&
    css`
      pointer-events: none;
    `};
`;

const Divider = styled.div`
  width: 40px;
  height: 1px;
  background: ${({ theme }) => theme.p200};
  margin: 0 10px;
  pointer-events: none;
`;

const Label = styled.span<{ isSelected: boolean; isDisabled: boolean }>`
  margin: 0 5px;
  ${({ theme }) => theme.text.p};
  color: ${({ theme }) => theme.p400};
  font-weight: 600;
  line-height: 14px;

  ${({ isSelected, theme }) =>
    isSelected &&
    css`
      color: ${theme.p600};
    `};

  ${({ isDisabled }) =>
    isDisabled &&
    css`
      pointer-events: none;
      color: ${({ theme }) => theme.p200};
    `};
`;

const StyledBullet = styled(StepperBullet)``;

export default Stepper;
