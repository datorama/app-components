import React, { Dispatch, SetStateAction, useMemo } from 'react';
import styled from 'styled-components';
import { findIndex, size, get } from 'lodash/fp';

import {
  getRgbaThemeColor,
  getStyledStringOrNumberValue,
} from '../../utils/theme.utils';

export type ButtonGroupOption = {
  label: string;
  value: string | number;
  isDisabled?: boolean;
};

export interface ButtonGroupProps {
  options: ButtonGroupOption[];
  onChange: (value: string | number) => void | Dispatch<SetStateAction<string>>;
  value: string | number;
  width: string | number;
  height: string | number;
  className?: string;
}

export const ButtonGroup = (props: ButtonGroupProps) => {
  const currentValueIndex = useMemo(
    () => findIndex({ value: props.value }, props.options),
    [props.value, props.options]
  );

  const options = useMemo(
    () =>
      props.options.map(({ label, value, isDisabled }, index) => (
        <Option
          className={`button-group button-group-option${
            currentValueIndex === index ? ' selected' : ''
          }${isDisabled ? ' disabled' : ''}`}
          key={value}
          isSelected={currentValueIndex === index}
          onClick={() => !isDisabled && props.onChange(value)}
        >
          {label}
        </Option>
      )),
    [currentValueIndex, props.options]
  );

  return (
    <Container
      width={props.width}
      height={props.height}
      className={
        props.className
          ? `button-group button-group-container ${props.className}`
          : 'button-group button-group-container'
      }
    >
      {options}

      <SelectedValueOverlay
        className="button-group button-group-selected-overlay"
        numOfOptions={size(props.options)}
        currentValueIndex={currentValueIndex}
      />
    </Container>
  );
};

const Container = styled.div<{
  width: string | number;
  height: string | number;
}>`
  width: ${getStyledStringOrNumberValue('width')};
  height: ${getStyledStringOrNumberValue('height')};
  position: relative;
  border-radius: 20px;
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.p50};
`;

const Option = styled.div<{ isSelected: boolean }>`
  flex: 1;
  flex-shrink: 0;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme, isSelected }) => (isSelected ? theme.p600 : theme.p400)};
  z-index: 1;
  transition: color 0.25s ease-in-out, transform 0.25s ease-in-out;
  cursor: pointer;
  transform: scale(${({ isSelected }) => (isSelected ? 1 : 0.97)});

  &.disabled {
    cursor: default;
    opacity: 0.5;
  }
`;

const SelectedValueOverlay = styled.div<{
  numOfOptions: number;
  currentValueIndex: number;
}>`
  position: absolute;
  left: ${({ numOfOptions, currentValueIndex }) =>
    (100 / numOfOptions) * currentValueIndex}%;
  height: 105%;
  width: calc(100% / ${get('numOfOptions')});
  background-color: ${({ theme }) => theme.p0};
  border-radius: 26px;
  transition: left 0.25s ease-in-out;
  box-shadow: 0 0 8px 0 ${getRgbaThemeColor('p700', 20)};
`;
