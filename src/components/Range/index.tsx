/* eslint react/prop-types: 0 */
import React, { ChangeEvent, useCallback, useMemo } from 'react';
import styled, { css } from 'styled-components';

import { hexToRgba } from '../../utils/theme.utils';

import { useRange } from './range.hooks';

// components
import { Draggable } from '../Draggable';
import { TextInput } from '../TextInput';
import { noop, toString } from 'lodash/fp';

interface RangeProps {
  min?: number;
  max: number;
  initialValue?: number;
  disabled?: boolean;
  showValue?: boolean;
  className?: string;
  onChange: (value: number) => void;
  onCommit?: (value: number) => void;
  innerMax?: number;
  valueLabelRenderer?: (value: number) => JSX.Element;
  boundaryLabelRenderer?: (value: number) => JSX.Element;
  renderInput?: boolean;
}

export const Range = ({
  min = 0,
  max,
  initialValue = 0,
  disabled = false,
  showValue = false,
  className = 'range',
  onChange,
  onCommit = noop,
  innerMax,
  valueLabelRenderer,
  boundaryLabelRenderer,
  renderInput = false,
}: RangeProps) => {
  const {
    handleClick,
    handleDrag,
    handleDragEnd,
    handleDragStart,
    outerEl,
    percentage,
    dragging,
    value,
    setValue,
  } = useRange(initialValue, min, max, onChange, onCommit, innerMax);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value: currentValue } = event.target;
    setValue(+currentValue);
  };

  const renderValueContent = useMemo(() => {
    return valueLabelRenderer ? (
      valueLabelRenderer(value)
    ) : renderInput ? (
      <TextInput
        className="value-input-wrapper"
        type="number"
        value={toString(value)}
        onChange={handleInputChange}
      />
    ) : (
      value
    );
  }, [valueLabelRenderer, value, renderInput, handleInputChange]);

  return (
    <Container className={className}>
      <DragArea
        className="drag-area"
        disabled={disabled}
        onMouseDown={handleClick}
      >
        <Outer ref={outerEl} className="outer" disabled={disabled}>
          <Inner width={percentage} className="inner" />
          <Label left="-20px" className="label">
            {boundaryLabelRenderer ? boundaryLabelRenderer(min) : min}
          </Label>
        </Outer>
        <Draggable
          onDragStart={handleDragStart}
          onDrag={handleDrag}
          onDragEnd={handleDragEnd}
          controlled
        >
          <Thumb
            className="thumb"
            left={percentage}
            dragging={dragging}
            disabled={disabled}
          />
        </Draggable>
        <Value
          left={percentage}
          visible={renderInput || showValue || dragging}
          className="value"
        >
          {renderValueContent}
        </Value>

        <Label left="-20px" className="label">
          {boundaryLabelRenderer ? boundaryLabelRenderer(min) : min}
        </Label>
        <Label left="calc(100% - 20px)" className="label">
          {boundaryLabelRenderer ? boundaryLabelRenderer(max) : max}
        </Label>
      </DragArea>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  .value-input-wrapper {
    max-width: 30px;
    .text-input {
      background: transparent;
      color: ${({ theme }) => theme.p0};
      border: none;
      height: 16px;
      font-size: 12px;
      padding: 0;
      text-align: center;
      &::-webkit-inner-spin-button {
        -webkit-appearance: none;
      }
    }
  }
`;

const DragArea = styled.div<{ disabled: boolean }>`
  display: flex;
  position: relative;
  height: 36px;
  width: 100%;
  cursor: pointer;
  align-items: center;

  ${({ disabled }) =>
    disabled &&
    css`
      pointer-events: none;
    `};
`;

const Outer = styled.div<{ disabled: boolean }>`
  width: 100%;
  height: 2px;
  background: ${({ theme, disabled }) =>
    disabled ? theme.p200 : hexToRgba(theme.a300, 40)};
  border-radius: 3px;
  position: relative;
  overflow: hidden;
`;

const Inner = styled.div.attrs(({ width }: { width: number }) => ({
  style: { width: `${width}%` },
}))<{ width: number }>`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  background: ${({ theme }) => theme.a400};
`;

const Thumb = styled.div.attrs(({ left }: { left: number }) => ({
  style: { left: `calc(${left}% - 6px)` },
}))<{ disabled: boolean; dragging: boolean; left: number }>`
  width: 12px;
  height: 12px;
  cursor: pointer;
  border-radius: 50%;
  background: ${({ theme }) => theme.a400};
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  position: absolute;
  top: 50%;
  left: -6px;
  margin-top: -6px;
  opacity: 1;

  ${({ dragging }) =>
    dragging &&
    css`
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
      transform: scale(1.1);
    `};

  ${({ disabled, theme }) =>
    disabled &&
    css`
      background: ${theme.p200};
    `};

  &:hover {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    transform: scale(1.1);
  }
`;

const Label = styled.div<{ left: string }>`
  position: absolute;
  top: 25px;
  left: ${({ left }) => left};
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 20px;
  pointer-events: none;
  ${({ theme }) => theme.text.sm};
  color: ${({ theme }) => theme.p300};
`;

const Value = styled.div.attrs(({ left }: { left: number }) => ({
  style: { left: `${left}%` },
}))<{ visible: boolean; left: number }>`
  padding: 2px 6px;
  ${({ theme }) => theme.text.sm};
  color: ${({ theme }) => theme.p0};
  border-radius: 3px;
  background: ${({ theme }) => hexToRgba(theme.p500, 90)};
  transform: translateX(-50%);
  position: absolute;
  transition: all 100ms;
  top: -50%;
  opacity: 0;

  &:after {
    position: absolute;
    top: 100%;
    left: 50%;
    width: 0;
    height: 0;
    margin-left: -4px;
    border: 4px solid transparent;
    border-top-color: ${({ theme }) => hexToRgba(theme.p500, 90)};
    pointer-events: none;
    content: ' ';
  }

  ${({ visible }) =>
    visible &&
    css`
      opacity: 1;
    `};
`;
