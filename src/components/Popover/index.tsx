import React, { ReactNode, RefObject } from 'react';
import styled, { css } from 'styled-components';
import { createPortal } from 'react-dom';
import { isNil, noop } from 'lodash/fp';

import CloseIcon from '../../assets/Close.icon';

import { hexToRgba } from '../../utils/theme.utils';

import usePopover, { ARROW_SIZE, PopoverPosition } from './popover.hooks';

import { ClickOut } from '../ClickOut';

export const DEFAULT_HEIGHT = 100;
export const DEFAULT_WIDTH = 200;
export const DEFAULT_OFFSET = 20;
interface PopoverProps {
  triggerRef: RefObject<HTMLElement | SVGSVGElement>;
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
  hideClose?: boolean;
  ignoreClickOutside?: boolean;
  hideArrow?: boolean;
  absolutePosition?: [number, number];
}

export const Popover = ({
  children,
  triggerRef,
  height = DEFAULT_HEIGHT,
  width = DEFAULT_WIDTH,
  position = 'right',
  isOpened = false,
  onClose = noop,
  onOpen = noop,
  className = 'popover',
  offset = DEFAULT_OFFSET,
  bgColor,
  hideClose = false,
  ignoreClickOutside = false,
  hideArrow = false,
  absolutePosition,
}: PopoverProps) => {
  const {
    open,
    renderPosition,
    renderArrowPosition,
    handleClose,
    popoverPosition,
  } = usePopover(
    isOpened,
    onOpen,
    onClose,
    position,
    offset,
    width,
    height,
    triggerRef,
    absolutePosition
  );

  const handleClickOut = () => {
    if (open) {
      handleClose();
    }
  };

  return (
    <>
      {createPortal(
        open ? (
          <ClickOut onClick={ignoreClickOutside ? noop : handleClickOut}>
            <Container
              bgColor={bgColor}
              className={className}
              height={height}
              width={width}
              position={renderPosition}
              arrowPosition={renderArrowPosition}
              popoverPosition={popoverPosition}
              hideArrow={hideArrow}
              isAbsolutePositionUsed={!isNil(absolutePosition)}
            >
              <div className="arrow" />
              {!hideClose && (
                <CloseIcon className="close-icon" onClick={handleClose} />
              )}
              {children}
            </Container>
          </ClickOut>
        ) : null,
        document.body
      )}
    </>
  );
};

type ContainerProps = {
  height: number;
  width: number;
  position: [number, number];
  arrowPosition: [number, number];
  bgColor?: string;
  popoverPosition: PopoverPosition;
  hideArrow: boolean;
  isAbsolutePositionUsed: boolean;
};

const Container = styled.div.attrs(
  ({ height, width, position }: ContainerProps) => ({
    style: {
      top: `${position[1]}px`,
      left: `${position[0]}px`,
      height: `${height}px`,
      width: `${width}px`,
    },
  })
)<ContainerProps>`
  position: fixed;
  z-index: 3;
  background: ${({ theme }) => theme.p0};
  border-radius: 5px;
  box-shadow: ${({ theme }) => `0px 2px 14px 0px ${hexToRgba(theme.p700, 20)}`};
  padding: 16px;
  box-sizing: border-box;
  background-color: ${({ bgColor, theme }) => bgColor || theme.p0};

  .arrow {
    position: absolute;

    top: ${({ arrowPosition }) => `${arrowPosition[1]}px`};
    left: ${({ arrowPosition }) => `${arrowPosition[0]}px`};

    ${({ hideArrow, isAbsolutePositionUsed }) =>
      (hideArrow || isAbsolutePositionUsed) &&
      css`
        display: none;
      `}
    ${({ popoverPosition, bgColor, theme }) =>
      ['top', 'topLeft', 'topRight'].includes(popoverPosition) &&
      css`
        border-left: ${ARROW_SIZE}px solid transparent;
        border-right: ${ARROW_SIZE}px solid transparent;
        border-top: ${ARROW_SIZE}px solid ${bgColor || theme.p0};
        filter: drop-shadow(0px 6px 5px ${hexToRgba(theme.p700, 20)});
      `};

    ${({ popoverPosition, bgColor, theme }) =>
      ['bottom', 'bottomLeft', 'bottomRight'].includes(popoverPosition) &&
      css`
        border-left: ${ARROW_SIZE}px solid transparent;
        border-right: ${ARROW_SIZE}px solid transparent;
        border-bottom: ${ARROW_SIZE}px solid ${bgColor || theme.p0};
        filter: drop-shadow(0 -6px 5px ${hexToRgba(theme.p700, 20)});
      `};

    ${({ popoverPosition, bgColor, theme }) =>
      ['left', 'leftBottom', 'leftTop'].includes(popoverPosition) &&
      css`
        border-top: ${ARROW_SIZE}px solid transparent;
        border-bottom: ${ARROW_SIZE}px solid transparent;
        border-left: ${ARROW_SIZE}px solid ${bgColor || theme.p0};
        filter: drop-shadow(6px 0px 5px rgba(46, 47, 48, 0.2));
      `};

    ${({ popoverPosition, bgColor, theme }) =>
      ['right', 'rightBottom', 'rightTop'].includes(popoverPosition) &&
      css`
        border-top: ${ARROW_SIZE}px solid transparent;
        border-bottom: ${ARROW_SIZE}px solid transparent;
        border-right: ${ARROW_SIZE}px solid ${bgColor || theme.p0};
        filter: drop-shadow(-6px 0px 5px rgba(46, 47, 48, 0.2));
      `};

    width: 0;
    height: 0;
  }

  .close-icon {
    cursor: pointer;
    position: absolute;
    right: 4px;
    top: 8px;
  }
`;

export default Popover;
