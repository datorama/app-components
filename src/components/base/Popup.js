import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { hexToRgba } from '../utils';

// positions
const BOTTOM = 'BOTTOM';
const TOP = 'TOP';
const LEFT = 'LEFT';
const RIGHT = 'RIGHT';
const BOTTOM_LEFT = 'BOTTOM_LEFT';
const BOTTOM_RIGHT = 'BOTTOM_RIGHT';
const TOP_LEFT = 'TOP_LEFT';
const TOP_RIGHT = 'TOP_RIGHT';

const Popup = ({
  children,
  open,
  className,
  position = BOTTOM,
  contentRenderer
}) => (
  <Container className={className}>
    {children}
    <Menu visible={open} className="pop-menu" position={position}>
      {contentRenderer()}
    </Menu>
  </Container>
);

Popup.propTypes = {
  children: PropTypes.node,
  open: PropTypes.bool,
  className: PropTypes.string,
  contentRenderer: PropTypes.func,
  position: PropTypes.string
};

export default Popup;

const Menu = styled.div`
  position: absolute;
  padding: 6px 12px;
  border-radius: 3px;
  pointer-events: none;
  visibility: hidden;
  opacity: 0;
  transition: all 300ms;

  background: ${({ theme }) => hexToRgba(theme.p200, 0.8)};
  ${({ theme }) => theme.text.tooltip};

  ${({ visible }) =>
    visible &&
    css`
      pointer-events: all;
      opacity: 1;
      visibility: visible;
    `};

  ${({ position }) =>
    position === BOTTOM &&
    css`
      top: calc(100% + 10px);
      left: 50%;
      transform: translateX(-50%);
    `};

  ${({ position }) =>
    position === TOP &&
    css`
      bottom: calc(100% + 10px);
      left: 50%;
      transform: translateX(-50%);
    `};

  ${({ position }) =>
    position === RIGHT &&
    css`
      top: 50%;
      left: calc(100% + 10px);
      transform: translateY(-50%);
    `};

  ${({ position }) =>
    position === LEFT &&
    css`
      top: 50%;
      right: calc(100% + 10px);
      transform: translateY(-50%);
    `};
`;

const Container = styled.div`
  position: relative;
`;
