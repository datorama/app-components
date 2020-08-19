import React, { Component, Fragment } from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { debounce, isFunction } from 'lodash/fp';
import Popup from './Popup';

// icons
import TipIcon from '../icons/TipLine.icon';

class Tooltip extends Component {
  static propTypes = {
    children: PropTypes.node,
    title: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.func,
      PropTypes.bool
    ]),
    long: PropTypes.bool,
    onClickInfo: PropTypes.func,
    position: PropTypes.string,
    fixed: PropTypes.bool,
    className: PropTypes.string,
    delay: PropTypes.number,
    withClose: PropTypes.bool,
    withIcon: PropTypes.bool
  };

  static defaultProps = {
    withClose: true,
    withIcon: true
  };

  state = {
    open: false,
    offset: 0,
    initOffset: null
  };

  tooltipRef = React.createRef();
  toggleOpenTimeoutId = null;

  componentDidMount() {
    this.setTooltipOffset();
    window.addEventListener('resize', this.setTooltipOffset);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.setTooltipOffset);
  }

  // TODO: support left side offsets
  setTooltipOffset = debounce(1000, () => {
    if (!this.tooltipRef.current) {
      return;
    }

    const { x, width } = this.tooltipRef.current.getBoundingClientRect();
    const windowWidth = window.innerWidth;

    const offset = x + width - windowWidth;

    if (!this.state.initOffset) {
      this.setState({ initOffset: x + width });
    }

    if (windowWidth < this.state.initOffset) {
      this.setState(prevState => ({
        offset: Math.max(0, prevState.offset + offset + 20)
      }));
    }

    if (windowWidth >= this.state.initOffset && this.state.offset) {
      this.setState({ offset: 0 });
    }
  });

  toggleOpen = origin => event => {
    const { open } = this.state;
    const { long, withClose, delay = 0 } = this.props;

    if (long && open && origin === 'icon' && withClose) {
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
        <span>{isFunction(title) ? title() : title}</span>
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
    const { open, offset } = this.state;

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
        menuRef={this.tooltipRef}
        offset={offset}
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
    const {
      position = 'TOP',
      className,
      withClose,
      withIcon,
      children
    } = this.props;
    const { open, offset } = this.state;

    return (
      <StyledLong
        open={open}
        contentRenderer={this.title}
        position={position}
        withClose={withClose}
        toggleOpen={this.toggleOpen(withIcon ? 'close-icon' : 'content')}
        className={className}
        menuRef={this.tooltipRef}
        offset={offset}
      >
        <Container
          onMouseEnter={this.toggleOpen('icon')}
          onMouseLeave={this.toggleOpen('icon')}
        >
          {withIcon ? <StyledTip /> : children}
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

  .pop-menu {
    background: ${({ theme }) => theme.p400};
  }
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
      transition: all 300ms;
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

    ${({ position, offset }) =>
      position === 'RIGHT' &&
      css`
        &:after {
          top: 50%;
          right: calc(100% - ${offset}px);
          margin-top: -6px;
          transform: rotate(90deg);
        }
      `};

    ${({ position, offset }) =>
      position === 'TOP_RIGHT' &&
      css`
        bottom: calc(100% + 10px);
        left: calc(-12px - ${offset}px);

        &:after {
          top: 100%;
          left: calc(12px + ${offset}px);
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

    ${({ position, offset }) =>
      position === 'BOTTOM_RIGHT' &&
      css`
      top: calc(100% + 10px);
      left: calc(-12px - ${offset}px);
        
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
