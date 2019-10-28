import React, { useState, useCallback, useEffect, useMemo } from 'react';

const DragSvg = ({
  children,
  onChange,
  minY,
  maxY,
  initialTranslation = [0, 0]
}) => {
  const [state, setState] = useState({
    dragging: false,
    origin: [0, 0],
    translation: [0, 0],
    lastTranslation: initialTranslation
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

      setState(current => ({
        ...current,
        translation: [x, y]
      }));
    },
    [maxY, minY, state.lastTranslation, state.origin]
  );

  const handleMouseUp = useCallback(() => {
    window.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('mouseup', handleMouseUp);

    setState(current => ({
      ...current,
      dragging: false,
      translation: [0, 0],
      lastTranslation: [
        current.translation[0] + current.lastTranslation[0],
        current.translation[1] + current.lastTranslation[1]
      ]
    }));
  }, [handleMouseMove]);

  const handleMouseDown = useCallback(({ clientX, clientY }) => {
    setState(current => ({
      ...current,
      dragging: true,
      origin: [clientX, clientY]
    }));
  }, []);

  useEffect(() => {
    if (state.dragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp, state.dragging]);

  useEffect(() => {
    onChange(
      [
        state.translation[0] + state.lastTranslation[0],
        state.translation[1] + state.lastTranslation[1]
      ],
      state.dragging
    );
  }, [onChange, state.lastTranslation, state.translation, state.dragging]);

  useEffect(() => {
    if (!state.dragging) {
      setState(state => ({
        ...state,
        lastTranslation: initialTranslation
      }));
    }
  }, [initialTranslation, state.dragging]);

  const styles = useMemo(
    () => ({
      cursor: state.dragging ? '-webkit-grabbing' : '-webkit-grab'
    }),
    [state.dragging]
  );

  return (
    <g style={styles} onMouseDown={handleMouseDown}>
      {children}
    </g>
  );
};

export default DragSvg;
