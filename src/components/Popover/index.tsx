import React, { ReactNode, RefObject } from 'react';
import styled, { css } from 'styled-components';
import { createPortal } from 'react-dom';
import { noop } from 'lodash/fp';

import CloseIcon from '../../assets/Close.icon';

import { hexToRgba } from '../../utils/theme.utils';

import usePopover from './popover.hooks';

import { ClickOut } from '../..';

export const DEFAULT_HEIGHT = 100;
export const DEFAULT_WIDTH = 200;
export const DEFAULT_OFFSET = 20;
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
  hideClose?: boolean;
  ignoreClickOutside?: boolean;
  enableDebounce?: boolean;
  hideArrow?: boolean;
  absolutePosition?: [number, number];
}

const Popover = ({
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
  enableDebounce = false,
  hideArrow = false,
  absolutePosition,
}: PopoverProps) => {
  const {
    open,
    renderPosition,
    renderArrowPosition,
    handleClose,
    handleClickOut,
  } = usePopover(
    isOpened,
    onOpen,
    onClose,
    position,
    offset,
    width,
    height,
    enableDebounce,
    triggerRef,
    absolutePosition
  );
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
              popoverPosition={position}
              hideArrow={hideArrow}
            >
              <div className="arrow" />
              {!hideClose && <StyledCloseIcon onClick={handleClose} />}
              {children}
            </Container>
          </ClickOut>
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
  popoverPosition: PopoverPosition;
  hideArrow: boolean;
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

    ${({ hideArrow }) =>
      hideArrow &&
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
`;

const StyledCloseIcon = styled(CloseIcon)`
  cursor: pointer;
  position: absolute;
  right: 4px;
  top: 8px;
`;

export default Popover;
