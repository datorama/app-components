import React, { Component, Fragment } from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import Popup from './Popup';

// assets
import { ReactComponent as TipIcon } from '../assets/tip-line.svg';

class Tooltip extends Component {
  static propTypes = {
    children: PropTypes.node,
    title: PropTypes.string,
    long: PropTypes.bool,
    onClickInfo: PropTypes.func,
    position: PropTypes.string
  };

  state = {
    open: false
  };

  toggleOpen = origin => () => {
    const { open } = this.state;
    const { long } = this.props;

    if (long && open && origin === 'icon') {
      return;
    }

    this.setState({ open: !open });
  };

  title = () => {
    const { long, onClickInfo } = this.props;

    return (
      <Fragment>
        <span>{this.props.title}</span>
        {long && onClickInfo && (
          <LongAction onClick={onClickInfo}>More Info</LongAction>
        )}
      </Fragment>
    );
  };

  smallTooltip() {
    const { children, position = 'TOP' } = this.props;
    const { open } = this.state;

    return (
      <StyledPopup open={open} contentRenderer={this.title} position={position}>
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
    const { position = 'TOP' } = this.props;
    const { open } = this.state;

    return (
      <StyledLong
        open={open}
        contentRenderer={this.title}
        position={position}
        withClose
        toggleOpen={this.toggleOpen('close-icon')}
      >
        <Container onMouseEnter={this.toggleOpen('icon')}>
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
  }
`;

const LongAction = styled.span`
  cursor: pointer;
  color: ${({ theme }) => theme.a400};
  margin-left: 6px;
`;
