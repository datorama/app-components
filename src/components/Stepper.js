import React, { useState, useCallback, useMemo } from 'react';
import styled, { css } from 'styled-components';
import * as PropTypes from 'prop-types';

// components
import { StepperBullet } from './StepperBullet';

export const Stepper = (props) => {
  const { steps, currentStep, selectStep, className } = props;
  const [hovered, setHovered] = useState(null);

  const toggleHover = useCallback((id) => setHovered(id), []);

  return (
    <Container className={className}>
      {useMemo(
        () =>
          steps.map((step, index) => (
            <Step
              key={step.id}
              disabled={!step.enabled}
              onClick={() => selectStep(step.id)}
              onMouseEnter={() => toggleHover(step.id)}
              onMouseLeave={() => toggleHover(null)}
            >
              <StyledBullet
                hovered={
                  hovered === step.id && step.id !== currentStep && step.enabled
                }
                selected={step.id === currentStep}
                enabled={step.enabled}
                touched={step.touched}
              />
              <Label
                disabled={!step.enabled}
                selected={step.id === currentStep}
              >
                {step.label}
              </Label>
              {index !== steps.length - 1 && <Divider />}
            </Step>
          )),
        [currentStep, hovered, selectStep, steps, toggleHover]
      )}
    </Container>
  );
};

Stepper.defaultProps = { steps: [] };

export const stepShape = PropTypes.shape({
  id: PropTypes.number,
  label: PropTypes.string,
  enabled: PropTypes.bool,
  touched: PropTypes.bool,
});

Stepper.propTypes = {
  steps: PropTypes.arrayOf(stepShape).isRequired,
  currentStep: PropTypes.number.isRequired,
  selectStep: PropTypes.func.isRequired,
  className: PropTypes.string,
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
