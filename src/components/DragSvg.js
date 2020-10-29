/* eslint react/prop-types: 0 */
import React, { useState, useCallback, useEffect, useMemo } from 'react';

const DragSvg = ({
  children,
  onChange,
  minY,
  maxY,
  initialTranslation = [0, 0],
  dragging,
  setDragging,
}) => {
  const [state, setState] = useState({
    origin: [0, 0],
    translation: [0, 0],
    lastTranslation: initialTranslation,
  });

  const handleMouseMove = useCallback(
    ({ clientX, clientY }) => {
      const x = clientX - state.origin[0];
      const y = clientY - state.origin[1];

      if (
        y + state.lastTranslation[1] > maxY ||
        y + state.lastTranslation[1] < minY
      ) {
        return;
      }

      setState((current) => ({
        ...current,
        translation: [x, y],
      }));
    },
    [maxY, minY, state.lastTranslation, state.origin]
  );

  const handleMouseUp = useCallback(() => {
    window.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('mouseup', handleMouseUp);

    setState((current) => ({
      ...current,
      translation: [0, 0],
      lastTranslation: [
        current.translation[0] + current.lastTranslation[0],
        current.translation[1] + current.lastTranslation[1],
      ],
    }));
    setDragging(false);
  }, [handleMouseMove, setDragging]);

  const handleMouseDown = useCallback(
    ({ clientX, clientY }) => {
      setState((current) => ({
        ...current,
        origin: [clientX, clientY],
      }));
      setDragging(true);
    },
    [setDragging]
  );

  useEffect(() => {
    if (dragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [dragging, handleMouseMove, handleMouseUp, state.dragging]);

  useEffect(() => {
    if (dragging) {
      onChange([
        state.translation[0] + state.lastTranslation[0],
        state.translation[1] + state.lastTranslation[1],
      ]);
    }
  }, [onChange, state.lastTranslation, state.translation, dragging]);

  useEffect(() => {
    if (!dragging) {
      setState((state) => ({
        ...state,
        lastTranslation: initialTranslation,
      }));
    }
  }, [dragging, initialTranslation]);

  const styles = useMemo(
    () => ({
      cursor: dragging ? '-webkit-grabbing' : '-webkit-grab',
    }),
    [dragging]
  );

  return (
    <g style={styles} onMouseDown={handleMouseDown}>
      {children}
    </g>
  );
};

export default DragSvg;
