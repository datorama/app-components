import { useCallback, useEffect, useRef } from 'react';
import Mark, { MarkOptions } from 'mark.js';

export const useTextHighlight = (
  text: string,
  options?: MarkOptions,
  isHighlightEnabled = true
) => {
  const markInstance = useRef<Mark>();

  const onRef = useCallback((node) => {
    if (!node) return;

    markInstance.current = new Mark(node);
  }, []);

  useEffect(
    function markText() {
      if (!markInstance.current) return;

      markInstance.current.unmark();

      if (!isHighlightEnabled) return;

      markInstance.current.mark(text, options);
    },
    [isHighlightEnabled, text, options]
  );

  return onRef;
};
