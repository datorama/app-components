import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

// positions
const BOTTOM = 'BOTTOM';
const TOP = 'TOP';
const LEFT = 'LEFT';
const RIGHT = 'RIGHT';
const BOTTOM_LEFT = 'BOTTOM_LEFT';
const BOTTOM_RIGHT = 'BOTTOM_RIGHT';
const TOP_LEFT = 'TOP_LEFT';
const TOP_RIGHT = 'TOP_RIGHT';

const Popup = ({ children, open, className, position = BOTTOM }) => (
  <Container className={className}>
    {children}
    <Menu visible={open} className="pop-menu" position={position} />
  </Container>
);

Popup.propTypes = {
  children: PropTypes.node,
  open: PropTypes.bool,
  className: PropTypes.string
};

export default Popup;

const Container = styled.div`
  position: relative;
`;

const Menu = styled.div`
  position: absolute;
  width: 160px;
  height: 100px;
  background: #fff;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.24);
  pointer-events: none;
  visibility: hidden;
  opacity: 0;
  transition: all 300ms;

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
      top: 100%;
      left: 50%;
      transform: translateX(-50%);
    `};

  ${({ position }) =>
    position === TOP &&
    css`
      bottom: 100%;
      left: 50%;
      transform: translateX(-50%);
    `};
`;
