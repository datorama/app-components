import { useCallback, useRef, useState } from 'react';

export const useConfirmationModal = (shouldConfirm: boolean) => {
  const [isOpen, setIsOpen] = useState(false);

  const resolve = useRef<(isConfirmed: boolean) => void>();
  const setResolveFn = useCallback(
    (resolveFn) => (resolve.current = resolveFn),
    [resolve]
  );

  const asyncConfirmationCheck = useCallback(() => {
    if (shouldConfirm) {
      setIsOpen(true);

      return new Promise<boolean>((resolve) => {
        setResolveFn(resolve);
      });
    }

    return Promise.resolve(true);
  }, [shouldConfirm, setResolveFn, setIsOpen]);

  const onResolve = useCallback(
    (isConfirmed) => {
      if (!resolve.current) return;

      return resolve.current(isConfirmed);
    },
    [resolve]
  );

  return {
    isOpen,
    toggleOpen: () => setIsOpen((isOpen) => !isOpen),
    onResolve,
    asyncConfirmationCheck,
  };
};
