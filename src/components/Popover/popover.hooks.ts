import { debounce, get } from 'lodash/fp';
import { RefObject, useCallback, useEffect, useState } from 'react';

import { ARROW_SIZE, PopoverPosition } from '.';

const usePopover = (
  isOpened: boolean,
  onOpen: () => void,
  onClose: () => void,
  position: PopoverPosition,
  offset: number,
  width: number,
  height: number,
  enableDebounce: boolean,
  triggerRef?: RefObject<HTMLElement | SVGAElement>,
  absolutePosition?: [number, number]
) => {
  const [open, setOpen] = useState<boolean>(isOpened);
  const [renderPosition, setRenderPosition] = useState<[number, number]>([
    0,
    0,
  ]);
  const [renderArrowPosition, setRenderArrowPosition] = useState<
    [number, number]
  >([0, 0]);

  const handleClose = useCallback(() => {
    setOpen(false);
    onClose();
  }, [setOpen, onClose]);

  useEffect(() => {
    setOpen(isOpened);
    if (isOpened) {
      onOpen();
    } else {
      onClose();
    }
  }, [isOpened, onOpen, onClose]);

  const getPosition = useCallback(
    (elWidth: number, elHeight: number, x: number, y: number) => {
      const middleX = x + elWidth / 2;
      const middleY = y + elHeight / 2;
      let xPos = 0,
        yPos = 0,
        xPosArrow = 0,
        yPosArrow = 0;

      const yPosBottom = y + elHeight + offset;
      const yPosTop = y - height - offset;
      const xPosRight = x + offset + elWidth;
      const xPosLeft = x - offset - width;
      const xPosTopBottom = middleX - width / 2;
      const yPosLeftRight = middleY - height / 2;
      const yPosLeftRightTop = middleY - height + ARROW_SIZE * 2;
      const xPosBottomTopLeft = middleX - width + ARROW_SIZE * 2;
      const yPosRightLeftBottom = middleY - ARROW_SIZE * 2;

      const xPosArrowTopBottom = width / 2 - ARROW_SIZE;
      const xPosArrowBottomTopLeft = width - ARROW_SIZE * 3;
      const yPosArrowLeftRightTop = height - ARROW_SIZE * 3;
      const yPosArrowLeftRight = height / 2 - ARROW_SIZE;

      switch (position) {
        case 'bottom':
          yPos = yPosBottom;
          xPos = xPosTopBottom;
          xPosArrow = xPosArrowTopBottom;
          yPosArrow = -ARROW_SIZE;
          break;
        case 'bottomLeft':
          yPos = yPosBottom;
          xPos = xPosBottomTopLeft;
          xPosArrow = xPosArrowBottomTopLeft;
          yPosArrow = -ARROW_SIZE;
          break;
        case 'bottomRight':
          yPos = yPosBottom;
          xPos = middleX - ARROW_SIZE * 2;
          xPosArrow = ARROW_SIZE;
          yPosArrow = -ARROW_SIZE;
          break;
        case 'top':
          yPos = yPosTop;
          xPos = xPosTopBottom;
          xPosArrow = xPosArrowTopBottom;
          yPosArrow = height;
          break;
        case 'topLeft':
          yPos = yPosTop;
          xPos = xPosBottomTopLeft;
          xPosArrow = xPosArrowBottomTopLeft;
          yPosArrow = height;
          break;
        case 'topRight':
          yPos = yPosTop;
          xPos = middleX - ARROW_SIZE * 2;
          xPosArrow = ARROW_SIZE;
          yPosArrow = height;
          break;
        case 'left':
          yPos = yPosLeftRight;
          xPos = xPosLeft;
          xPosArrow = width;
          yPosArrow = yPosArrowLeftRight;
          break;
        case 'leftTop':
          yPos = yPosLeftRightTop;
          xPos = xPosLeft;
          xPosArrow = width;
          yPosArrow = yPosArrowLeftRightTop;
          break;
        case 'leftBottom':
          yPos = yPosRightLeftBottom;
          xPos = xPosLeft;
          xPosArrow = width;
          yPosArrow = ARROW_SIZE;
          break;
        case 'right':
          yPos = yPosLeftRight;
          xPos = xPosRight;
          xPosArrow = -ARROW_SIZE;
          yPosArrow = yPosArrowLeftRight;
          break;
        case 'rightTop':
          yPos = yPosLeftRightTop;
          xPos = xPosRight;
          xPosArrow = -ARROW_SIZE;
          yPosArrow = yPosArrowLeftRightTop;
          break;
        case 'rightBottom':
          yPos = yPosRightLeftBottom;
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

  const calcPositions = useCallback(() => {
    try {
      if (absolutePosition) {
        setRenderPosition([absolutePosition[0], absolutePosition[1]]);
      } else if (get('current', triggerRef) && isOpened) {
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
      } else {
        throw Error(
          'It was neither triggerRef nor absolutePosition provided, please provide at least one. (the fallback in that case will be [0, 0]'
        );
      }
    } catch (err) {
      console.error(err);
    }
  }, [isOpened, triggerRef, getPosition, absolutePosition]);

  useEffect(() => {
    const debouncedCalc = enableDebounce
      ? debounce(200, calcPositions)
      : calcPositions;
    window.addEventListener('resize', debouncedCalc);
    window.addEventListener('scroll', debouncedCalc);
    return () => {
      window.removeEventListener('resize', debouncedCalc);
      window.removeEventListener('scroll', debouncedCalc);
    };
  }, [calcPositions, enableDebounce]);

  useEffect(() => {
    if (isOpened) {
      calcPositions();
    }
  }, [position, isOpened, calcPositions]);

  const handleClickOut = useCallback(() => {
    if (open) {
      handleClose();
    }
  }, [open, handleClose]);

  return {
    open,
    renderPosition,
    renderArrowPosition,
    handleClose,
    handleClickOut,
  };
};

export default usePopover;
