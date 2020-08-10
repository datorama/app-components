import styled, { css, keyframes } from "styled-components";

import InfoLineIcon from "packages/core/Icons/InfoLine";
import WarningLineIcon from "packages/core/Icons/WarningLine";
import SuccessLineIcon from "packages/core/Icons/SuccessLine";

export const fadeSlideInFromTop = keyframes`
    from {
      opacity: 0;
      transform: translate3d(-50%, -50%, 0);
    }
    to {
      opacity: 1;
      transform: translate3d(-50%, 0, 0);
    }
`;

export const fadeSlideOutToTop = keyframes`
    from {
      opacity: 1;
      transform: translate3d(-50%, 0, 0);
    }
    to {
      opacity: 0;
      transform: translate3d(-50%, -50%, 0);
    }
`;

export const Toast = styled.div<{ top: number; leaving?: boolean }>`
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
  display: flex;

  ${({ theme, leaving }) =>
    leaving ? theme.animation.fadeRightExit : theme.animation.fadeLeft};
`;

export const Meta = styled.div`
  flex-direction: column;
  display: flex;
`;

export const Title = styled.div`
  ${({ theme }) => theme.text.pBold};
  height: 22px;
  display: flex;
  align-items: center;
`;

export const Subtitle = styled.div`
  ${({ theme }) => theme.text.smNote};
  margin: 0 30px 0 0;
`;

export const StyledInfoIcon = styled(InfoLineIcon)`
  width: 22px;
  height: 22px;
  margin-right: 4px;
  margin-bottom: 1px;
`;

export const StyledAlertIcon = styled(InfoLineIcon)`
  width: 22px;
  height: 22px;
  margin-right: 4px;
`;

export const StyledWarningIcon = styled(WarningLineIcon)`
  width: 22px;
  height: 22px;
  margin-right: 4px;
`;

export const StyledSuccessIcon = styled(SuccessLineIcon)`
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

export const Snackbar = styled.div<{ leaving?: boolean; speed: number; top: number; }>`
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

export const SnackbarTitle = styled.div`
  font-size: 12px;
  font-weight: 400;
  color: ${({ theme }) => theme.p0};
  margin: 0 30px 0 0;
`;
