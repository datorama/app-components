/* eslint react/prop-types: 0 */
import React, { useState, useCallback, useEffect, useRef } from 'react';
import styled, { css } from 'styled-components';
import { isNil } from 'lodash/fp';
import * as PropTypes from 'prop-types';

import { hexToRgba } from '../utils/theme.utils';

// components
import { Draggable } from './Draggable';

export const Range = (props) => {
  const {
    min,
    max,
    initialValue,
    disabled,
    showValue,
    className,
    onChange,
    innerMax,
    valueLabelRenderer,
    boundaryLabelRenderer,
  } = props;
  const initialPercentage =
    initialValue !== undefined
      ? Math.max(((initialValue - min) / (max - min)) * 100)
      : 0;

  const innerMaxPercentage =
    innerMax !== undefined
      ? Math.max(((innerMax - min) / (max - min)) * 100)
      : undefined;

  const [percentage, setPercentage] = useState(initialPercentage);
  const [lastPercentage, setLastPercentage] = useState(initialPercentage);
  const [dragging, setDragging] = useState(false);
  const [value, setValue] = useState(initialValue || min);
  const outerEl = useRef();

  const handleDrag = useCallback(
    ({ translateX }) => {
      const { width } = outerEl.current.getBoundingClientRect();
      const calcPercentage = Math.min(
        100,
        lastPercentage + (translateX / width) * 100
      );
      const currentPercentage = Math.max(0, calcPercentage);

      if (
        !isNil(innerMaxPercentage) &&
        currentPercentage > innerMaxPercentage
      ) {
        return;
      }

      setPercentage(currentPercentage);
    },
    [outerEl, lastPercentage, innerMaxPercentage]
  );

  useEffect(() => {
    const newValue = Math.round((percentage / 100) * (max - min)) + min;
    setValue(newValue);
    onChange(newValue);
  }, [max, min, percentage, onChange]);

  const handleDragStart = useCallback(() => setDragging(true), [setDragging]);

  const handleDragEnd = useCallback(() => {
    setDragging(false);
    setPercentage(percentage);
    setLastPercentage(percentage);
  }, [percentage]);

  const handleClick = useCallback(
    (e) => {
      const { clientX } = e;
      const { x, width } = outerEl.current.getBoundingClientRect();

      const currentPercentage = Math.round(((clientX - x) / width) * 100);

      if (
        !isNil(innerMaxPercentage) &&
        currentPercentage > innerMaxPercentage
      ) {
        setPercentage(innerMaxPercentage);
        setLastPercentage(innerMaxPercentage);
        return;
      }

      if (currentPercentage !== value) {
        setPercentage(currentPercentage);
        setLastPercentage(currentPercentage);
      }
    },
    [outerEl, value, innerMaxPercentage]
  );

  return (
    <Container disabled={disabled} className={className} onClick={handleClick}>
      <Outer ref={outerEl} className="outer" disabled={disabled}>
        <Inner width={percentage} className="inner" />
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
        visible={showValue || dragging}
        className="value"
      >
        {valueLabelRenderer ? valueLabelRenderer(value) : value}
      </Value>

      <Label left="-20px" className="label">
        {boundaryLabelRenderer ? boundaryLabelRenderer(min) : min}
      </Label>
      <Label left="calc(100% - 20px)" className="label">
        {boundaryLabelRenderer ? boundaryLabelRenderer(max) : max}
      </Label>
    </Container>
  );
};

Range.propTypes = {
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  initialValue: PropTypes.number.isRequired,
  disabled: PropTypes.bool,
  showValue: PropTypes.bool,
  className: PropTypes.string,
  onChange: PropTypes.func,
  innerMax: PropTypes.number,
  boundaryLabelRenderer: PropTypes.func,
  valueLabelRenderer: PropTypes.func,
};

const Container = styled.div`
  width: 100%;
  display: flex;
  position: relative;
  height: 36px;
  cursor: pointer;
  align-items: center;

  ${({ disabled }) =>
    disabled &&
    css`
      pointer-events: none;
    `};
`;

const Outer = styled.div`
  width: 100%;
  height: 2px;
  background: ${({ theme, disabled }) =>
    disabled ? theme.p200 : hexToRgba(theme.a300, 40)};
  border-radius: 3px;
  position: relative;
  overflow: hidden;
`;

const Inner = styled.div.attrs(({ width }) => ({
  style: { width: `${width}%` },
}))`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  background: ${({ theme }) => theme.a400};
`;

const Thumb = styled.div.attrs(({ left }) => ({
  style: { left: `calc(${left}% - 6px)` },
}))`
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

const Label = styled.div`
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

const Value = styled.div.attrs(({ left }) => ({
  style: { left: `${left}%` },
}))`
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
