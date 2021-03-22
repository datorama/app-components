import { RefObject, useEffect } from 'react';

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
