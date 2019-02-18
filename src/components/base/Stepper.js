import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

// components
import StepperBullet from './StepperBullet';

const Stepper = ({ steps = [], currentStep, selectStep, className }) => {
  return (
    <Container className={className}>
      {steps.map((step, index) => (
        <Step
          key={step.id}
          disabled={!step.enabled}
          onClick={() => selectStep(step.id)}
        >
          <StyledBullet
            selected={step.id === currentStep}
            enabled={step.enabled}
            touched={step.touched}
          />
          <Label disabled={!step.enabled} selected={step.id === currentStep}>
            {step.label}
          </Label>
          {index !== steps.length - 1 && <Divider />}
        </Step>
      ))}
    </Container>
  );
};

export default Stepper;

export const stepShape = PropTypes.shape({
  id: PropTypes.number,
  label: PropTypes.string,
  enabled: PropTypes.bool,
  touched: PropTypes.bool
});

Stepper.propTypes = {
  steps: PropTypes.arrayOf(stepShape),
  currentStep: PropTypes.number,
  selectStep: PropTypes.func,
  className: PropTypes.string
};

const Container = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

const Step = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;

  ${({ disabled }) =>
    disabled &&
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

const Label = styled.span`
  margin: 0 5px;
  ${({ theme }) => theme.text.p};
  color: ${({ theme }) => theme.p400};
  font-weight: 600;
  line-height: 14px;

  ${({ selected, theme }) =>
    selected &&
    css`
      color: ${theme.p600};
    `};

  ${({ disabled }) =>
    disabled &&
    css`
      pointer-events: none;
      color: ${({ theme }) => theme.p200};
    `};
`;

const StyledBullet = styled(StepperBullet)``;
