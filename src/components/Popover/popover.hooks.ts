import { RefObject, useCallback, useEffect, useState } from 'react';

export const ARROW_SIZE = 8;

export type PopoverPosition =
  | 'bottom'
  | 'bottomLeft'
  | 'bottomRight'
  | 'top'
  | 'topLeft'
  | 'topRight'
  | 'left'
  | 'leftTop'
  | 'leftBottom'
  | 'right'
  | 'rightTop'
  | 'rightBottom';

const usePopover = (
  isOpened: boolean,
  onOpen: () => void,
  onClose: () => void,
  position: PopoverPosition,
  offset: number,
  width: number,
  height: number,
  triggerRef?: RefObject<HTMLElement | SVGSVGElement>,
  absolutePosition?: [number, number]
) => {
  const [popoverPosition, setPopoverPosition] = useState<PopoverPosition>(
    position
  );
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
      const xPosBottomTopRight = middleX - ARROW_SIZE * 2;
      const yPosRightLeftBottom = middleY - ARROW_SIZE * 2;

      const xPosArrowTopBottom = width / 2 - ARROW_SIZE;
      const xPosArrowBottomTopLeft = width - ARROW_SIZE * 3;
      const yPosArrowLeftRightTop = height - ARROW_SIZE * 3;
      const yPosArrowLeftRight = height / 2 - ARROW_SIZE;

      const noRoomOnBottom = (yBottom: number) => yBottom > window.innerHeight;
      const noRoomOnTop = (yTop: number) => yTop <= 0;
      const noRoomOnLeft = (xLeft: number) => xLeft <= 0;
      const noRoomOnRight = (xRight: number) => xRight > window.innerWidth;

      const noRoomLeftForVerticalReposition =
        height * 2 + elHeight + offset * 2 > window.innerHeight;
      const noRoomLeftForHorizontalReposition =
        width * 2 + elWidth + offset * 2 > window.innerWidth;

      switch (popoverPosition) {
        case 'bottom':
          if (noRoomOnBottom(yPosBottom + height)) {
            setPopoverPosition(
              !noRoomLeftForVerticalReposition ? 'top' : 'right'
            );
          } else {
            yPos = yPosBottom;
            xPos = xPosTopBottom;
            xPosArrow = xPosArrowTopBottom;
            yPosArrow = -ARROW_SIZE;
          }
          break;
        case 'bottomLeft':
          if (noRoomOnBottom(yPosBottom + height)) {
            setPopoverPosition(
              !noRoomLeftForVerticalReposition ? 'topLeft' : 'right'
            );
          } else if (noRoomOnLeft(xPosBottomTopLeft)) {
            setPopoverPosition(
              !noRoomLeftForHorizontalReposition ? 'bottomRight' : 'bottom'
            );
          } else {
            yPos = yPosBottom;
            xPos = xPosBottomTopLeft;
            xPosArrow = xPosArrowBottomTopLeft;
            yPosArrow = -ARROW_SIZE;
          }
          break;
        case 'bottomRight':
          if (
            noRoomOnBottom(yPosBottom + height) &&
            !noRoomLeftForVerticalReposition
          ) {
            setPopoverPosition(
              !noRoomLeftForVerticalReposition ? 'topRight' : 'left'
            );
          } else if (
            noRoomOnRight(xPosBottomTopRight + width) &&
            !noRoomLeftForHorizontalReposition
          ) {
            setPopoverPosition(
              !noRoomLeftForHorizontalReposition ? 'bottomLeft' : 'bottom'
            );
          } else {
            yPos = yPosBottom;
            xPos = xPosBottomTopRight;
            xPosArrow = ARROW_SIZE;
            yPosArrow = -ARROW_SIZE;
          }
          break;
        case 'top':
          if (noRoomOnTop(yPosTop)) {
            setPopoverPosition(
              !noRoomLeftForVerticalReposition ? 'bottom' : 'right'
            );
          } else {
            yPos = yPosTop;
            xPos = xPosTopBottom;
            xPosArrow = xPosArrowTopBottom;
            yPosArrow = height;
          }
          break;
        case 'topLeft':
          if (noRoomOnTop(yPosTop)) {
            setPopoverPosition(
              !noRoomLeftForVerticalReposition ? 'bottomLeft' : 'right'
            );
          } else if (noRoomOnLeft(xPosBottomTopLeft)) {
            setPopoverPosition(
              !noRoomLeftForHorizontalReposition ? 'topRight' : 'top'
            );
          } else {
            yPos = yPosTop;
            xPos = xPosBottomTopLeft;
            xPosArrow = xPosArrowBottomTopLeft;
            yPosArrow = height;
          }
          break;
        case 'topRight':
          if (noRoomOnTop(yPosTop)) {
            setPopoverPosition(
              !noRoomLeftForVerticalReposition ? 'bottomRight' : 'left'
            );
          } else if (noRoomOnRight(xPosBottomTopRight + width)) {
            setPopoverPosition(
              !noRoomLeftForHorizontalReposition ? 'topLeft' : 'top'
            );
          } else {
            yPos = yPosTop;
            xPos = xPosBottomTopRight;
            xPosArrow = ARROW_SIZE;
            yPosArrow = height;
          }
          break;
        case 'left':
          if (noRoomOnLeft(xPosLeft)) {
            setPopoverPosition(
              !noRoomLeftForHorizontalReposition ? 'right' : 'top'
            );
          } else {
            yPos = yPosLeftRight;
            xPos = xPosLeft;
            xPosArrow = width;
            yPosArrow = yPosArrowLeftRight;
          }
          break;
        case 'leftTop':
          if (noRoomOnTop(yPosLeftRightTop)) {
            setPopoverPosition(
              !noRoomLeftForVerticalReposition ? 'leftBottom' : 'right'
            );
          } else if (noRoomOnLeft(xPosLeft)) {
            setPopoverPosition(
              !noRoomLeftForHorizontalReposition ? 'rightTop' : 'top'
            );
          } else {
            yPos = yPosLeftRightTop;
            xPos = xPosLeft;
            xPosArrow = width;
            yPosArrow = yPosArrowLeftRightTop;
          }
          break;
        case 'leftBottom':
          if (noRoomOnBottom(yPosRightLeftBottom + height)) {
            setPopoverPosition(
              !noRoomLeftForVerticalReposition ? 'leftTop' : 'right'
            );
          } else if (noRoomOnLeft(xPosLeft)) {
            setPopoverPosition(
              !noRoomLeftForHorizontalReposition ? 'rightBottom' : 'bottom'
            );
          } else {
            yPos = yPosRightLeftBottom;
            xPos = xPosLeft;
            xPosArrow = width;
            yPosArrow = ARROW_SIZE;
          }
          break;
        case 'right':
          if (noRoomOnRight(xPosRight + width)) {
            setPopoverPosition(
              !noRoomLeftForHorizontalReposition ? 'left' : 'top'
            );
          } else {
            yPos = yPosLeftRight;
            xPos = xPosRight;
            xPosArrow = -ARROW_SIZE;
            yPosArrow = yPosArrowLeftRight;
          }
          break;
        case 'rightTop':
          if (noRoomOnTop(yPosLeftRightTop)) {
            setPopoverPosition(
              !noRoomLeftForVerticalReposition ? 'rightBottom' : 'left'
            );
          } else if (noRoomOnRight(xPosRight + width)) {
            setPopoverPosition(
              !noRoomLeftForHorizontalReposition ? 'leftTop' : 'top'
            );
          } else {
            yPos = yPosLeftRightTop;
            xPos = xPosRight;
            xPosArrow = -ARROW_SIZE;
            yPosArrow = yPosArrowLeftRightTop;
          }
          break;
        case 'rightBottom':
          if (noRoomOnBottom(yPosRightLeftBottom + height)) {
            setPopoverPosition(
              !noRoomLeftForVerticalReposition ? 'rightTop' : 'left'
            );
          } else if (noRoomOnRight(xPosRight + width)) {
            setPopoverPosition(
              !noRoomLeftForHorizontalReposition ? 'leftBottom' : 'bottom'
            );
          } else {
            yPos = yPosRightLeftBottom;
            xPos = xPosRight;
            xPosArrow = -ARROW_SIZE;
            yPosArrow = ARROW_SIZE;
          }
          break;
        default:
          break;
      }

      return { xPos, yPos, xPosArrow, yPosArrow };
    },
    [popoverPosition, width, height, offset]
  );

  const calcPositions = useCallback(() => {
    if (isOpened) {
      try {
        if (absolutePosition) {
          setRenderPosition([absolutePosition[0], absolutePosition[1]]);
        } else if (triggerRef && triggerRef.current) {
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
    }
  }, [isOpened, triggerRef, getPosition, absolutePosition]);

  useEffect(() => {
    window.addEventListener('resize', calcPositions);
    window.addEventListener('scroll', calcPositions);
    return () => {
      window.removeEventListener('resize', calcPositions);
      window.removeEventListener('scroll', calcPositions);
    };
  }, [calcPositions]);

  useEffect(() => {
    calcPositions();
  }, [calcPositions]);

  useEffect(() => {
    setPopoverPosition(position);
  }, [position]);

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
    popoverPosition,
  };
};

export default usePopover;
