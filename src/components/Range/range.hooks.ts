import { isNil } from 'lodash/fp';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

export const useRange = (
  initialValue: number,
  min: number,
  max: number,
  onChange: (value: number) => void,
  innerMax?: number
) => {
  const initialPercentage = useMemo(
    () => Math.max(((initialValue - min) / (max - min)) * 100),
    [initialValue, min, max]
  );

  const innerMaxPercentage = useMemo(
    () =>
      innerMax !== undefined
        ? Math.max(((innerMax - min) / (max - min)) * 100)
        : undefined,
    [innerMax, min, max]
  );

  const [percentage, setPercentage] = useState(initialPercentage);
  const [lastPercentage, setLastPercentage] = useState(initialPercentage);
  const [dragging, setDragging] = useState(false);
  const value = useRef(initialValue || min);
  const outerEl = useRef<HTMLDivElement | null>(null);

  const handleDrag = useCallback(
    ({ translateX }) => {
      const { width } = outerEl.current.getBoundingClientRect();
      console.log(translateX);
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
    value.current = newValue;
    onChange(newValue);
  }, [max, min, percentage, onChange, value]);

  useEffect(() => {
    const newPercentage = Math.max(((value.current - min) / (max - min)) * 100);
    setPercentage(newPercentage);
  }, [max, min, value.current]);

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

      if (currentPercentage !== value.current) {
        setPercentage(currentPercentage);
        setLastPercentage(currentPercentage);
      }
    },
    [outerEl, value, innerMaxPercentage]
  );

  const setValue = useCallback(
    (newValue: number) => {
      if (innerMax < newValue || max < newValue || min > newValue) return;
      value.current = newValue;
      onChange(newValue);
    },
    [value.current, max, min, innerMax, onChange]
  );

  return {
    percentage,
    dragging,
    value: value.current,
    outerEl,
    handleDrag,
    handleDragStart,
    handleDragEnd,
    handleClick,
    setValue,
  };
};
