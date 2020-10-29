import React, { useCallback, useEffect, useState } from 'react';

const POSITION = { x: 0, y: 0 };

export type DragParams = {
  translation: {
    x: number;
    y: number;
  };
};

interface Props {
  className?: string;
  onDrag: (params: DragParams) => void;
  onDragEnd: (params: DragParams) => void;
}

const Draggable = (props: Props) => {
  const { className, onDrag, onDragEnd } = props;

  const [state, setState] = useState({
    isDragging: false,
    origin: POSITION,
    translation: POSITION,
  });

  const handleMouseDown = useCallback(({ clientX, clientY }) => {
    setState((state) => ({
      ...state,
      isDragging: true,
      origin: { x: clientX, y: clientY },
    }));
  }, []);

  const handleMouseMove = useCallback(
    ({ clientX, clientY }) => {
      const translation = {
        x: clientX - state.origin.x,
        y: clientY - state.origin.y,
      };

      setState((state) => ({
        ...state,
        translation,
      }));

      onDrag({ translation });
    },
    [state.origin, onDrag]
  );

  const handleMouseUp = useCallback(() => {
    setState((state) => {
      return {
        ...state,
        isDragging: false,
      };
    });
  }, []);

  useEffect(() => {
    if (state.isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    } else {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);

      if (state.translation.x !== 0) {
        onDragEnd({ translation: state.translation });
      }

      setState((state) => ({ ...state, translation: { x: 0, y: 0 } }));
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [state.isDragging, handleMouseMove, handleMouseUp]);

  return <div className={className} onMouseDown={handleMouseDown} />;
};

export default Draggable;
