/* eslint react/prop-types: 0 */
import React, { Component, Fragment } from 'react';
import * as PropTypes from 'prop-types';
import styled, { keyframes, css } from 'styled-components';
import { throttle } from 'lodash/fp';

// icons
import InfoIcon from '../assets/InfoLine.icon';
import WarningIcon from '../assets/WarningLine.icon';
import SuccessIcon from '../assets/SuccessLine.icon';

// shared context
const Context = React.createContext();
const Consumer = Context.Consumer;
// eslint-disable-next-line react/display-name
export const withToast = (Comp) => (props) => (
  <Consumer>
    {({ addToast }) => <Comp {...props} addToast={addToast} />}
  </Consumer>
);

// eslint-disable-next-line react/display-name
export const withSnackbar = (Comp) => (props) => (
  <Consumer>
    {({ addSnackbar }) => <Comp {...props} addSnackbar={addSnackbar} />}
  </Consumer>
);

export class ToastsProvider extends Component {
  static propTypes = {
    timeout: PropTypes.number,
    title: PropTypes.string,
    subtitle: PropTypes.string,
    top: PropTypes.number,
    type: PropTypes.oneOf(['info', 'alert', 'warning', 'success']),
  };

  state = {
    leaving: [],
    list: [],
  };

  addSnackbar = (notif) => this.addToast({ ...notif, isSnackbar: true });

  addToast = throttle(200, (notif) => {
    const id = Math.random();
    const props = { ...notif, isSnackbar: notif.isSnackbar };

    this.setState(
      {
        list: [...this.state.list, { id, ...props }],
      },
      () => {
        setTimeout(() => {
          this.clearToast(id)();
        }, notif.timeout || 5000);
      }
    );
  });

  clearToast = (id) => () => {
    this.setState(
      {
        leaving: [id],
      },
      () => {
        setTimeout(() => {
          this.setState({
            list: this.state.list.filter((notif) => notif.id !== id),
          });
        }, 500);
      }
    );
  };

  icon = (type) => {
    switch (type) {
      case 'info':
        return <StyledInfoIcon />;

      case 'alert':
        return <StyledAlertIcon />;

      case 'success':
        return <StyledSuccessIcon />;

      case 'warning':
        return <StyledWarningIcon />;

      default:
        return null;
    }
  };

  renderToast = ({ id, title, subtitle, type }, index) => {
    const { leaving } = this.state;
    const { className } = this.props;

    return (
      <Toast
        key={`notif-${id}`}
        top={index * 80}
        leaving={leaving.includes(id)}
        className={className}
      >
        <CloseIcon onClick={this.clearToast(id)} />
        {this.icon(type)}
        <Meta>
          <Title>{title}</Title>
          <Subtitle>{subtitle}</Subtitle>
        </Meta>
      </Toast>
    );
  };

  renderSnackbar = ({ id, title, type, top = 0, speed = 150 }, index) => {
    const { leaving } = this.state;
    const { className } = this.props;

    return (
      <Snackbar
        key={`notif-${id}`}
        top={top + index * 40}
        speed={speed}
        leaving={leaving.includes(id)}
        className={className}
      >
        <CloseIcon onClick={this.clearToast(id)} />
        {this.icon(type)}
        <Meta>
          <SnackbarTitle>{title}</SnackbarTitle>
        </Meta>
      </Snackbar>
    );
  };

  render() {
    const { list } = this.state;
    const { children } = this.props;
    const contextActions = {
      addToast: this.addToast,
      addSnackbar: this.addSnackbar,
    };

    return (
      <Context.Provider value={contextActions}>
        <Fragment>
          {list.map((params, index) =>
            params.isSnackbar
              ? this.renderSnackbar(params, index)
              : this.renderToast(params, index)
          )}
          {children}
        </Fragment>
      </Context.Provider>
    );
  }
}

const fadeSlideInFromTop = keyframes`
    from {
      opacity: 0;
      transform: translate3d(-50%, -50%, 0);
    }
    to {
      opacity: 1;
      transform: translate3d(-50%, 0, 0);
    }
`;

const fadeSlideOutToTop = keyframes`
    from {
      opacity: 1;
      transform: translate3d(-50%, 0, 0);
    }
    to {
      opacity: 0;
      transform: translate3d(-50%, -50%, 0);
    }
`;

const Toast = styled.div`
  position: fixed;
  width: 360px;
  height: 70px;
  background: ${({ theme }) => theme.p0};
  border-radius: 4px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
  padding: 12px;
  transition: all 1000ms;
  right: 20px;
  top: ${({ top }) => `${20 + top}px`};
  z-index: 999;
  ${({ theme, leaving }) =>
    leaving ? theme.animation.fadeRightExit : theme.animation.fadeLeft};
  display: flex;
`;

const Meta = styled.div`
  flex-direction: column;
  display: flex;
`;

const Title = styled.div`
  ${({ theme }) => theme.text.pBold};
  height: 22px;
  display: flex;
  align-items: center;
`;

const Subtitle = styled.div`
  ${({ theme }) => theme.text.smNote};
  margin: 0 30px 0 0;
`;

const StyledInfoIcon = styled(InfoIcon)`
  width: 22px;
  height: 22px;
  margin-right: 4px;
  margin-bottom: 1px;
`;

const StyledAlertIcon = styled(InfoIcon)`
  width: 22px;
  height: 22px;
  margin-right: 4px;
`;

const StyledWarningIcon = styled(WarningIcon)`
  width: 22px;
  height: 22px;
  margin-right: 4px;
`;

const StyledSuccessIcon = styled(SuccessIcon)`
  width: 22px;
  height: 22px;
  margin-right: 4px;
`;

export const CloseIcon = styled.div`
  position: absolute;
  top: 15px;
  right: 15px;
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

const Snackbar = styled.div`
  position: fixed;
  left: 50%;
  ${({ leaving, speed }) =>
    css`
      animation: ${leaving ? fadeSlideOutToTop : fadeSlideInFromTop} ${speed}ms
        ease-out both;
    `};
  box-sizing: border-box;
  padding: 5px;
  transition: all 1000ms;
  top: ${({ top }) => `${20 + top}px`};
  z-index: 999;
  display: flex;
  align-items: center;
  height: 30px;
  border-radius: 2px;
  box-shadow: 0 2px 14px 0 rgba(0, 0, 0, 0.2);
  background-color: ${({ theme }) => theme.p400};

  ${CloseIcon} {
    top: 10px;
    right: 10px;
    color: #fff;

    &::before,
    &::after {
      color: #fff;
    }

    &:hover {
      &::before,
      &::after {
        color: #fff;
      }
    }
  }
`;

const SnackbarTitle = styled.div`
  font-size: 12px;
  font-weight: 400;
  color: ${({ theme }) => theme.p0};
  margin: 0 30px 0 0;
`;
