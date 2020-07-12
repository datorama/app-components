import {RefObject, useEffect, useState, useCallback} from 'react';

type OutsideClickEvent = MouseEvent | TouchEvent;

// Triggers a handler when user clicks / touches outside of the element (ref)
export const useOnClickOutside = (
  ref: RefObject<HTMLElement>,
  handler: (event: OutsideClickEvent) => any,
  isActive: boolean
) => {
  useEffect(() => {
    if (isActive) {
      const listener = (event: OutsideClickEvent) => {
        if (!ref.current || ref.current.contains(event.target as HTMLElement)) {
          return;
        }

        handler(event);
      };

      document.addEventListener('mousedown', listener);
      document.addEventListener('touchstart', listener);

      return () => {
        document.removeEventListener('mousedown', listener);
        document.removeEventListener('touchstart', listener);
      };
    }
  }, [ref, handler, isActive]);
};

const getSize = () => ({
  innerHeight: window.innerHeight,
  innerWidth: window.innerWidth,
  outerHeight: window.outerHeight,
  outerWidth: window.outerWidth
});

export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState(getSize());

  const handleResize = useCallback(() => {
    setWindowSize(getSize());
  }, []);

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [handleResize]);

  return windowSize;
};

