import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

import { hexToRgba } from '../../utils';

// positions
const BOTTOM = 'BOTTOM';
const TOP = 'TOP';
const LEFT = 'LEFT';
const RIGHT = 'RIGHT';

export default class Popup extends Component {
  static propTypes = {
    children: PropTypes.node,
    open: PropTypes.bool,
    className: PropTypes.string,
    contentRenderer: PropTypes.func,
    position: PropTypes.string,
    withClose: PropTypes.bool,
    toggleOpen: PropTypes.func,
    fixed: PropTypes.bool
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

  render() {
    let {
      children,
      open,
      className,
      position,
      contentRenderer,
      fixed
    } = this.props;
    const { x, y } = this.state;

    return (
      <Container className={className}>
        {children}
        <Menu
          visible={open}
          className="pop-menu"
          position={position}
          fixed={fixed}
          x={x}
          y={y}
        >
          {contentRenderer()}
        </Menu>
      </Container>
    );
  }
}

const Menu = styled.div`
  position: absolute;
  z-index: 999;
  padding: 2px 6px;
  border-radius: 3px;
  pointer-events: none;
  visibility: hidden;
  opacity: 0;
  transition: all 300ms;

  background: ${({ theme }) => hexToRgba(theme.p700, 60)};

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

  ${({ fixed, x, y }) =>
    fixed &&
    css`
       {
        top: ${y}px;
        left: ${x}px;
      }
    `}
`;

const Container = styled.div`
  position: relative;
`;
