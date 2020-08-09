import React from 'react';
import styled from 'styled-components';
import { hexToRgba } from './index';
import { useTheme } from '../../common/hooks';

interface LinearProgress {
  className?: string;
  color?: string;
}

const LinearProgress = (props: LinearProgress) => {
  const theme = useTheme();

  return (
    <Outer className={props.className} color={props.color || theme.a300}>
      <Inner color={props.color || theme.a400} />
    </Outer>
  );
};

export default LinearProgress;

const Outer = styled.div<{color: string}>`
  position: relative;
  width: 100%;
  height: 2px;
  background: ${({ color }) => hexToRgba(color, 40)};
  overflow: hidden;
`;

const Inner = styled.div<{color: string}>`
  width: 20%;
  position: absolute;
  top: 0;
  left: 0;
  height: 2px;
  background: ${({ color }) => color};
  animation: linearProgress 2s infinite ease-in-out;

  @keyframes linearProgress {
    0% {
      width: 0;
      left: 0;
    }
    70% {
      width: 100%;
      left: 0;
    }
    100% {
      left: 100%;
    }
  }
`;