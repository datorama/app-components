import {
  useCallback,
  useState,
  useEffect,
  useLayoutEffect,
  RefObject,
} from 'react';

// Returns the element's dimensions, recalculates on resize event
export const useElementDimensions = (
  elementRef: RefObject<any>,
  debounceTime = 200
) => {
  const getDimensions = useCallback(() => {
    if (!elementRef.current) return {};

    const { width, height, x, y } = elementRef.current.getBoundingClientRect();

    return {
      width,
      height,
      x,
      y,
    };
  }, [elementRef]);

  const [elementDimensions, setElementDimensions] = useState(getDimensions);

  const handleResize = useCallback(() => {
    if (!elementRef.current) return;

    const { width, height, x, y } = getDimensions();

    if (
      elementDimensions.width !== width ||
      elementDimensions.height !== height
    ) {
      setElementDimensions({ width, height, x, y });
    }
  }, [
    elementDimensions.height,
    elementDimensions.width,
    elementRef,
    getDimensions,
  ]);

  useLayoutEffect(() => handleResize(), [handleResize]);
  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [handleResize, getDimensions]);

  return elementDimensions;
};
