import React, {
  Fragment,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import styled, { css } from "styled-components";
import { throttle, noop } from "lodash/fp";

import Card from "packages/core/Card";
import ModalFooter, {
  ButtonObject,
  ButtonRenderer,
  ButtonType,
} from "packages/core/Modal/ModalFooter";

import { hexToRgba } from "common/utils";

type Size = "small" | "medium" | "large" | "full";

export interface ModalProps {
  children: ReactNode | ReactNode[];
  toggleIsOpen: () => void;
  isOpen: boolean;
  title: string;
  className?: string;
  buttons?: (ButtonObject | ButtonRenderer)[];
  size?: "small" | "medium" | "large" | "full";
  overlayColor?: string;
  closeOnOverlayClick?: boolean;
}

const Modal = ({
  isOpen,
  className,
  title,
  buttons,
  children,
  size,
  overlayColor,
  closeOnOverlayClick = true,
  toggleIsOpen,
}: ModalProps) => {
  const [localIsOpen, setLocalIsOpen] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLocalIsOpen(isOpen);
    }, 500);
  }, [isOpen]);

  const throttledToggle = useCallback(throttle(500, toggleIsOpen), [
    toggleIsOpen,
  ]);

  const handleClick = useCallback(
    (onClick) => () => {
      if (onClick) {
        onClick();
      }

      throttledToggle();
    },
    [throttledToggle]
  );

  if (!localIsOpen) {
    return null;
  }

  return (
    <Fragment>
      <Overlay
        onClick={closeOnOverlayClick ? throttledToggle : noop}
        isVisible={isOpen}
        color={overlayColor}
      />

      <Container className={className}>
        <StyledCard isVisible={isOpen} size={size} className="modal-card">
          <CloseIcon onClick={throttledToggle} className="close-icon" />

          {title && (
            <Header className="header">
              <Title className="title">{title}</Title>
            </Header>
          )}

          <Content className="content">{children}</Content>

          <Footer className="footer">
            <ModalFooter buttons={buttons} handleClick={handleClick} />
          </Footer>
        </StyledCard>
      </Container>
    </Fragment>
  );
};

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

const Overlay = styled(Container)<{ isVisible: boolean }>`
  background: ${({ theme, color }) => color || hexToRgba(theme.p0, 60)};
  pointer-events: all;

  ${({ theme, isVisible }) =>
    isVisible ? theme.animation.fade : theme.animation.fadeOut};
`;

const StyledCard = styled(Card)<{ isVisible: boolean; size?: Size }>`
  width: 400px;
  min-height: 100px;
  padding: 0;
  pointer-events: all;
  display: flex;
  flex-direction: column;
  position: relative;

  ${({ theme, isVisible }) =>
    isVisible ? theme.animation.fadeDown : theme.animation.fadeUpExit};

  ${({ size }) =>
    size === "medium" &&
    css`
      width: 560px;
      min-height: 240px;
    `};

  ${({ size }) =>
    size === "large" &&
    css`
      width: 800px;
      min-height: 400px;
    `};

  ${({ size }) =>
    size === "full" &&
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
    content: "";
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

Modal.ButtonType = ButtonType;

export default Modal;
