import React, { Fragment } from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

// utils
import { hexToRgba } from '../utils';
import { throttle } from 'lodash/fp';

// components
import Card from './Card';
import Button from './Button';

export default class Modal extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    toggleOpen: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    title: PropTypes.string,
    className: PropTypes.string,
    buttons: PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.object, PropTypes.func])
    ).isRequired,
    size: PropTypes.oneOf(['small', 'medium', 'large', 'full']),
    overlayColor: PropTypes.string
  };

  state = {
    localOpen: false
  };

  componentDidUpdate(prevProps) {
    if (!this.props.open && prevProps.open) {
      setTimeout(() => {
        this.setState({ localOpen: false });
      }, 500);
    }

    if (this.props.open && !prevProps.open) {
      this.setState({ localOpen: true });
    }
  }

  throttledToggle = throttle(500, this.props.toggleOpen);

  handleClick = onClick => () => {
    if (onClick) {
      onClick();
    }

    this.throttledToggle();
  };

  render() {
    const {
      open,
      className,
      title,
      buttons,
      children,
      size,
      overlayColor
    } = this.props;
    const { localOpen } = this.state;

    if (!localOpen) {
      return null;
    }

    return (
      <Fragment>
        <Overlay
          open={localOpen}
          onClick={this.throttledToggle}
          visible={open}
          color={overlayColor}
        />
        <Container open={localOpen} className={className} visible>
          <StyledCard
            open={localOpen}
            className="modal-card"
            visible={open}
            size={size}
          >
            <CloseIcon onClick={this.throttledToggle} className="close-icon" />
            {title && (
              <Header className="header">
                <Title className="title">{title}</Title>
              </Header>
            )}
            <Content className="content">{children}</Content>
            <Footer className="footer">
              {buttons.map((button, i) => {
                if (typeof button === 'function') {
                  return button({ key: `btn-${i}` });
                }

                return (
                  <StyledButton
                    key={`btn-${i}`}
                    secondary={button.type === 'secondary'}
                    disabled={button.disabled}
                    onClick={this.handleClick(button.onClick)}
                  >
                    {button.label}
                  </StyledButton>
                );
              })}
            </Footer>
          </StyledCard>
        </Container>
      </Fragment>
    );
  }
}

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  z-index: 2;
`;

const Overlay = styled(Container)`
  background: ${({ theme, color }) => color || hexToRgba(theme.p0, 60)};
  pointer-events: all;
  ${({ theme, visible }) =>
    visible ? theme.animation.fade : theme.animation.fadeOut};
`;

const StyledCard = styled(Card)`
  width: 400px;
  min-height: 100px;
  padding: 0;
  pointer-events: all;
  display: flex;
  flex-direction: column;
  position: relative;
  ${({ theme, visible }) =>
    visible ? theme.animation.fadeDown : theme.animation.fadeUpExit};

  ${({ size }) =>
    size === 'medium' &&
    css`
      width: 560px;
      min-height: 240px;
    `};

  ${({ size }) =>
    size === 'large' &&
    css`
      width: 800px;
      min-height: 400px;
    `};

  ${({ size }) =>
    size === 'full' &&
    css`
      width: 80vw;
      height: 80vh;
    `};
`;

const Header = styled.div`
  width: 100%;
  min-height: 50px;
  box-sizing: border-box;
  padding: 30px 30px 0 30px;
  margin-bottom: 16px;
`;

const Footer = styled.div`
  width: 100%;
  border-top: 1px solid ${({ theme }) => theme.p100};
  display: flex;
  align-items: center;
  justify-content: flex-end;
  box-sizing: border-box;
  padding: 16px 30px;
`;

const Content = styled.div`
  flex: 1;
  width: 100%;
  box-sizing: border-box;
  padding: 0 30px 30px 30px;
`;

const StyledButton = styled(Button)`
  margin-left: 10px;
`;

const Title = styled.div`
  ${({ theme }) => theme.text.subHeadline};
`;

const CloseIcon = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
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
