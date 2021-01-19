import { RefObject, useCallback, useEffect, useState } from 'react';
import { ARROW_SIZE, PopoverPosition } from '.';

const usePopover = (
  isOpened: boolean,
  onOpen: () => void,
  onClose: () => void,
  position: PopoverPosition,
  offset: number,
  triggerRef: RefObject<HTMLElement | SVGAElement>,
  width: number,
  height: number
) => {
  const [open, setOpen] = useState<boolean>(isOpened);
  const [renderPosition, setRenderPosition] = useState<[number, number]>([
    0,
    0,
  ]);
  const [renderArrowPosition, setRenderArrowPosition] = useState<
    [number, number]
  >([0, 0]);

  useEffect(() => {
    setOpen(isOpened);
    if (isOpened) {
      onOpen();
    }
  }, [isOpened]);

  const handleClose = useCallback(() => {
    setOpen(false);
    onClose();
  }, [setOpen, onClose]);

  const calcPositions = useCallback(() => {
    if (triggerRef.current && isOpened) {
      const {
        height,
        width,
        x,
        y,
      } = triggerRef.current.getBoundingClientRect();

      const { xPos, yPos, xPosArrow, yPosArrow } = getPosition(
        width,
        height,
        x,
        y
      );
      setRenderPosition([xPos, yPos]);
      setRenderArrowPosition([xPosArrow, yPosArrow]);
    }
  }, [isOpened, triggerRef, position]);

  useEffect(() => {
    window.addEventListener('resize', calcPositions);
    window.addEventListener('scroll', calcPositions);
    return () => {
      window.removeEventListener('resize', calcPositions);
      window.removeEventListener('scroll', calcPositions);
    };
  }, [calcPositions]);

  useEffect(() => {
    if (isOpened) {
      calcPositions();
    }
  }, [position, isOpened]);

  const getPosition = useCallback(
    (elWidth: number, elHeight: number, x: number, y: number) => {
      const middleX = x + elWidth / 2;
      const middleY = y + elHeight / 2;
      let xPos = 0,
        yPos = 0,
        xPosArrow = 0,
        yPosArrow = 0;

      const xPosBottom = middleX - width / 2;
      const yPosBottom = y + elHeight + offset;
      const xPosTop = middleX - width / 2;
      const yPosTop = y - height - offset;
      const xPosRight = x + offset + elWidth;
      const xPosLeft = x - offset - width;

      switch (position) {
        case 'bottom':
          yPos = yPosBottom;
          xPos = xPosBottom;
          xPosArrow = width / 2 - ARROW_SIZE;
          yPosArrow = -ARROW_SIZE;
          break;
        case 'bottomLeft':
          yPos = yPosBottom;
          xPos = middleX - width;
          xPosArrow = width - ARROW_SIZE * 3;
          yPosArrow = -ARROW_SIZE;
          break;
        case 'bottomRight':
          yPos = yPosBottom;
          xPos = middleX;
          xPosArrow = ARROW_SIZE;
          yPosArrow = -ARROW_SIZE;
          break;
        case 'top':
          yPos = yPosTop;
          xPos = xPosTop;
          xPosArrow = width / 2 - ARROW_SIZE;
          yPosArrow = height;
          break;
        case 'topLeft':
          yPos = yPosTop;
          xPos = middleX - width;
          xPosArrow = width - ARROW_SIZE * 3;
          yPosArrow = height;
          break;
        case 'topRight':
          yPos = yPosTop;
          xPos = middleX;
          xPosArrow = ARROW_SIZE;
          yPosArrow = height;
          break;
        case 'left':
          yPos = middleY - height / 2;
          xPos = xPosLeft;
          xPosArrow = width;
          yPosArrow = height / 2 - ARROW_SIZE / 2;
          break;
        case 'leftTop':
          yPos = middleY - height;
          xPos = xPosLeft;
          xPosArrow = width;
          yPosArrow = height - ARROW_SIZE * 3;
          break;
        case 'leftBottom':
          yPos = middleY;
          xPos = xPosLeft;
          xPosArrow = width;
          yPosArrow = ARROW_SIZE;
          break;
        case 'right':
          yPos = middleY - height / 2;
          xPos = xPosRight;
          xPosArrow = -ARROW_SIZE;
          yPosArrow = height / 2 - ARROW_SIZE / 2;
          break;
        case 'rightTop':
          yPos = middleY - height;
          xPos = xPosRight;
          xPosArrow = -ARROW_SIZE;
          yPosArrow = height - ARROW_SIZE * 3;
          break;
        case 'rightBottom':
          yPos = middleY;
          xPos = xPosRight;
          xPosArrow = -ARROW_SIZE;
          yPosArrow = ARROW_SIZE;
          break;
        default:
          break;
      }

      return { xPos, yPos, xPosArrow, yPosArrow };
    },
    [position, width, height, offset]
  );

  return {
    open,
    renderPosition,
    renderArrowPosition,
    handleClose,
  };
};

export default usePopover;
