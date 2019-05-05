import React, { Component, Fragment } from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import Popup from './Popup';

// icons
import TipIcon from '../icons/TipLine.icon';

class Tooltip extends Component {
  static propTypes = {
    children: PropTypes.node,
    title: PropTypes.string,
    long: PropTypes.bool,
    onClickInfo: PropTypes.func,
    position: PropTypes.string,
    fixed: PropTypes.bool,
    className: PropTypes.string,
    delay: PropTypes.number
  };

  state = {
    open: false
  };

  toggleOpenTimeoutId = null;

  toggleOpen = origin => event => {
    const { open } = this.state;
    const { long, delay = 0 } = this.props;

    if (long && open && origin === 'icon') {
      return;
    }

    if (!open && event.type === 'mouseleave' && this.toggleOpenTimeoutId) {
      return clearTimeout(this.toggleOpenTimeoutId);
    }

    this.toggleOpenTimeoutId = setTimeout(
      () => this.setState(prevState => ({ open: !prevState.open })),
      open ? 0 : delay
    );
  };

  title = () => {
    const { long, onClickInfo, title } = this.props;

    return (
      <Fragment>
        <span>{title}</span>
        {long && onClickInfo && (
          <LongAction onClick={onClickInfo}>More Info</LongAction>
        )}
      </Fragment>
    );
  };

  smallTooltip() {
    const {
      title,
      children,
      position = 'TOP',
      fixed,
      className,
      disabled
    } = this.props;
    const { open } = this.state;

    if (disabled) {
      return children;
    }

    return (
      <StyledPopup
        open={title && open}
        contentRenderer={this.title}
        position={position}
        fixed={fixed}
        className={className}
      >
        <Container
          onMouseEnter={this.toggleOpen('content')}
          onMouseLeave={this.toggleOpen('content')}
        >
          {children}
        </Container>
      </StyledPopup>
    );
  }

  longTooltip() {
    const { position = 'TOP', className } = this.props;
    const { open } = this.state;

    return (
      <StyledLong
        open={open}
        contentRenderer={this.title}
        position={position}
        withClose
        toggleOpen={this.toggleOpen('close-icon')}
        className={className}
      >
        <Container
          onMouseEnter={this.toggleOpen('icon')}
          onMouseLeave={this.toggleOpen('icon')}
        >
          <StyledTip />
        </Container>
      </StyledLong>
    );
  }

  render() {
    const { long } = this.props;

    if (long) {
      return this.longTooltip();
    }

    return this.smallTooltip();
  }
}

export default Tooltip;

const Container = styled.span``;

const StyledPopup = styled(Popup)`
  white-space: nowrap;
`;

const StyledTip = styled(TipIcon)`
  width: 24px;
  height: 24px;
`;

const StyledLong = styled(Popup)`
  .pop-menu {
    background: ${({ theme }) => theme.p0};
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
    width: 400px;
    min-height: 40px;
    color: ${({ theme }) => theme.p600};
    box-sizing: border-box;
    padding: 15px 36px 15px 15px;
    line-height: 16px;
    border-radius: 2px;
    ${({ theme }) => theme.text.sm};

    &:after {
      border: solid transparent;
      content: ' ';
      height: 0;
      width: 0;
      position: absolute;
      pointer-events: none;
      border-top-color: ${({ theme }) => theme.p0};
      border-width: 6px;
    }

    ${({ position }) =>
      position === 'TOP' &&
      css`
        &:after {
          top: 100%;
          left: 50%;
          margin-left: -6px;
        }
      `};

    ${({ position }) =>
      position === 'BOTTOM' &&
      css`
        &:after {
          bottom: 100%;
          left: 50%;
          margin-left: -6px;
          transform: rotate(180deg);
        }
      `};

    ${({ position }) =>
      position === 'LEFT' &&
      css`
        &:after {
          top: 50%;
          left: 100%;
          margin-top: -6px;
          transform: rotate(-90deg);
        }
      `};

    ${({ position }) =>
      position === 'RIGHT' &&
      css`
        &:after {
          top: 50%;
          right: 100%;
          margin-top: -6px;
          transform: rotate(90deg);
        }
      `};

    ${({ position }) =>
      position === 'TOP_RIGHT' &&
      css`
        bottom: calc(100% + 10px);
        left: -12px;

        &:after {
          top: 100%;
          left: 12px;
          transform: translateX(50%);
        }
      `};

    ${({ position }) =>
      position === 'TOP_LEFT' &&
      css`
        bottom: calc(100% + 10px);
        right: -12px;

        &:after {
          top: 100%;
          right: 12px;
          transform: translateX(-50%);
        }
      `};

    ${({ position }) =>
      position === 'BOTTOM_RIGHT' &&
      css`
      top: calc(100% + 10px);
      left: -12px;
        
        &:after {
          bottom: 100%;
          left: 12px;
          transform: translateX(100%) rotate(180deg);
          margin-left: -6px;
      `};

    ${({ position }) =>
      position === 'BOTTOM_LEFT' &&
      css`
        top: calc(100% + 10px);
        right: -12px;

        &:after {
          bottom: 100%;
          left: calc(100% - 12px);
          transform: translateX(-100%) rotate(180deg);
          margin-left: -6px;
        }
      `};
  }
`;

const LongAction = styled.span`
  cursor: pointer;
  color: ${({ theme }) => theme.a400};
  margin-left: 6px;
`;
