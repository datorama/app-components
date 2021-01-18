import React, {
  ReactNode,
  RefObject,
  useCallback,
  useEffect,
  useState,
} from 'react';
import styled from 'styled-components';
import { createPortal } from 'react-dom';
import { noop } from 'lodash/fp';

// import CloseIcon from 'assets/close.svg';

import { hexToRgba } from '../utils/theme.utils';

export const DEFAULT_HEIGHT = 150;
export const DEFAULT_WIDTH = 250;
export const DEFAULT_OFFSET = 20;
export const ARROW_SIZE = 8;

const DEFAULT_POSITION: [number, number] = [0, 0];

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

interface PopoverProps {
  triggerRef: RefObject<HTMLElement | SVGAElement>;
  children: ReactNode;
  height?: number;
  width?: number;
  isOpened?: boolean;
  position?: PopoverPosition;
  onClose?: () => void;
  onOpen?: () => void;
  offset?: number;
  className?: string;
  bgColor?: string;
}

const Popover = ({
  children,
  triggerRef,
  height = DEFAULT_HEIGHT,
  width = DEFAULT_WIDTH,
  position = 'bottomLeft',
  isOpened = false,
  onClose = noop,
  onOpen = noop,
  className = 'popover',
  offset = DEFAULT_OFFSET,
  bgColor,
}: PopoverProps) => {
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
  }, [isOpened]);

  useEffect(() => {
    if (triggerRef.current) {
      const {
        bottom,
        height,
        left,
        right,
        top,
        width,
        x,
        y,
      } = triggerRef.current.getBoundingClientRect();
      const middleX = left + width / 2;
      const middleY = top + height / 2;
      const { xPos, yPos, xPosArrow, yPosArrow } = calcPosition(
        width,
        height,
        x,
        y
      );
      setRenderPosition([xPos, yPos]);
      setRenderArrowPosition([xPosArrow, yPosArrow]);
    }
  }, [triggerRef, position]);

  const calcPosition = useCallback(
    (elWidth: number, elHeight: number, x: number, y: number) => {
      const middleX = x + elWidth / 2;
      const middleY = y + elHeight / 2;
      let xPos = 0,
        yPos = 0,
        xPosArrow = 0,
        yPosArrow = 0;

      switch (position) {
        case 'bottom':
          yPos = y + elHeight + offset;
          xPos = middleX - width / 2;
          xPosArrow = width / 2 - ARROW_SIZE;
          yPosArrow = -ARROW_SIZE;
          break;
        case 'bottomLeft':
          yPos = y + elHeight + offset;
          xPos = middleX - width;
          xPosArrow = width - ARROW_SIZE * 2;
          yPosArrow = -ARROW_SIZE;
          break;
        case 'bottomRight':
          yPos = y + elHeight + offset;
          xPos = middleX;
          xPosArrow = ARROW_SIZE;
          yPosArrow = -ARROW_SIZE;
          break;
        case 'top':
          yPos = y - height - offset;
          xPos = middleX - width / 2;
          break;
        case 'topLeft':
          yPos = y - height - offset;
          xPos = middleX - width;
          break;
        case 'topRight':
          yPos = y - height - offset;
          xPos = middleX;
          break;
        case 'left':
          yPos = middleY - height / 2;
          xPos = x - offset - width;
          break;
        case 'leftTop':
          yPos = middleY - height;
          xPos = x - offset - width;
          break;
        case 'leftBottom':
          yPos = middleY;
          xPos = x - offset - width;
          break;
        case 'right':
          yPos = middleY - height / 2;
          xPos = x + offset + elWidth;
          break;
        case 'rightTop':
          yPos = middleY - height;
          xPos = x + offset + elWidth;
          break;
        case 'rightBottom':
          yPos = middleY;
          xPos = x + offset + elWidth;
          break;
        default:
          break;
      }

      return { xPos, yPos, xPosArrow, yPosArrow };
    },
    [position, width]
  );

  const handleClose = useCallback(() => {
    setOpen(false);
    onClose();
  }, [setOpen, onClose]);

  if (triggerRef.current) {
    console.log({ rect: triggerRef.current.getBoundingClientRect() });
  }
  return (
    <>
      {createPortal(
        open ? (
          <Container
            bgColor={bgColor}
            className={className}
            height={height}
            width={width}
            position={renderPosition}
            arrowPosition={renderArrowPosition}
          >
            <div className="arrow" />
            {/* <StyledImage src={CloseIcon} onClick={handleClose} /> */}
            {children}
          </Container>
        ) : null,
        document.body
      )}
    </>
  );
};

const Container = styled.div<{
  height: number;
  width: number;
  position: [number, number];
  arrowPosition: [number, number];
  bgColor?: string;
}>`
  position: fixed;
  z-index: 3;
  top: ${({ position }) => `${position[1]}px`};
  left: ${({ position }) => `${position[0]}px`};
  background: ${({ theme }) => theme.p0};
  border-radius: 5px;
  box-shadow: ${({ theme }) => `0px 2px 14px 0px ${hexToRgba(theme.p700, 20)}`};
  height: ${({ height }) => `${height}px`};
  width: ${({ width }) => `${width}px`};
  padding: 16px;
  box-sizing: border-box;
  background-color: ${({ bgColor, theme }) => bgColor || theme.p0};

  .arrow {
    position: absolute;
    top: ${({ arrowPosition }) => `${arrowPosition[1]}px`};
    left: ${({ arrowPosition }) => `${arrowPosition[0]}px`};
    border-left: ${ARROW_SIZE}px solid transparent;
    border-right: ${ARROW_SIZE}px solid transparent;
    border-bottom: ${({ bgColor, theme }) =>
      `${ARROW_SIZE}px solid ${bgColor || theme.p0}`};
    width: 0;
    height: 0;
    filter: ${({ theme }) =>
      `drop-shadow(0 -2px 2px ${hexToRgba(theme.p700, 20)})`};
  }
`;

const StyledImage = styled.img`
  cursor: pointer;
  position: absolute;
  right: 16px;
  top: 16px;
`;

export default Popover;
