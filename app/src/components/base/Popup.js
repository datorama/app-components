import React, { Component } from 'react';
import ReactDOM from 'react-dom';
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

export default class Popup extends Component {
  static propTypes = {
    children: PropTypes.node,
    open: PropTypes.bool,
    className: PropTypes.string,
    contentRenderer: PropTypes.func,
    position: PropTypes.string,
    withClose: PropTypes.bool,
    toggleOpen: PropTypes.func,
    fixed: PropTypes.bool,
    menuRef: PropTypes.shape({})
  };

  static defaultProps = { position: BOTTOM };

  state = {
    x: 0,
    y: 0
  };

  componentDidUpdate(prevProps) {
    if (this.props.fixed) {
      if (this.props.open && !prevProps.open) {
        window.addEventListener('mousemove', this.handleMouseMove);
      }

      if (!this.props.open && prevProps.open) {
        window.removeEventListener('mousemove', this.handleMouseMove);
      }
    }
  }

  componentWillUnmount() {
    window.removeEventListener('mousemove', this.handleMouseMove);
  }

  handleMouseMove = e => this.setState({ x: e.clientX, y: e.clientY });

  menu() {
    const {
      open,
      position,
      contentRenderer,
      withClose,
      toggleOpen,
      fixed,
      menuRef
    } = this.props;
    const { x, y } = this.state;

    return (
      <StyledMenu
        visible={open}
        className="pop-menu"
        position={position}
        fixed={fixed}
        x={x}
        y={y}
        ref={menuRef}
      >
        {contentRenderer()}
        {withClose && <CloseIcon onClick={toggleOpen} />}
      </StyledMenu>
    );
  }

  render() {
    const { children, className, fixed } = this.props;

    return (
      <Container className={className}>
        {children}

        {fixed
          ? ReactDOM.createPortal(this.menu(), document.body)
          : this.menu()}
      </Container>
    );
  }
}

const StyledMenu = styled.div.attrs({
  style: ({ fixed, x, y }) => {
    if (fixed) {
      return { top: y, left: x };
    }
    return {};
  }
})`
  position: absolute;
  z-index: 999;
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

  ${({ fixed }) =>
    fixed &&
    css`
      transition: none;
      position: fixed;
      bottom: auto;
      right: auto;
      transform: translate(10px, -50%);
    `};
`;

const Container = styled.div`
  position: relative;
`;

const CloseIcon = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;

  width: 12px;
  height: 12px;
  overflow: hidden;

  &:hover {
    &::before,
    &::after {
      background: ${({ theme }) => theme.p500};
    }
  }

  &::before,
  &::after {
    content: '';
    position: absolute;
    height: 2px;
    width: 100%;
    top: 50%;
    left: 0;
    margin-top: -1px;
    background: ${({ theme }) => theme.p300};
  }

  &::before {
    transform: rotate(45deg);
  }

  &::after {
    transform: rotate(-45deg);
  }

  &::before,
  &::after {
    height: 1px;
  }
`;
