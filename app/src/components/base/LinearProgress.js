import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { hexToRgba } from '../utils';
import { useTheme } from '../hooks/theme.hooks';

const LinearProgress = props => {
  const theme = useTheme();

  return (
    <Outer className={props.className} color={props.color || theme.a300}>
      <Inner color={props.color || theme.a400} />
    </Outer>
  );
};

LinearProgress.propTypes = {
  className: PropTypes.string,
  color: PropTypes.string
};

export default LinearProgress;

const Outer = styled.div`
  position: relative;
  width: 100%;
  height: 2px;
  background: ${({ color }) => hexToRgba(color, 40)};
  overflow: hidden;
`;

const Inner = styled.div`
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
