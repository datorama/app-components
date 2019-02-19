import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { hexToRgba } from '../utils';

const LinearProgress = props => (
  <Outer className={props.className}>
    <Inner color={props.color} />
  </Outer>
);

LinearProgress.proptypes = {
  className: PropTypes.string,
  color: PropTypes.string
};

export default LinearProgress;

const Outer = styled.div`
  position: relative;
  width: 100%;
  height: 2px;
  background: ${({ theme }) => hexToRgba(theme.a300, 40)};
  overflow: hidden;
`;

const Inner = styled.div`
  width: 20%;
  position: absolute;
  top: 0;
  left: 0;
  height: 2px;
  background: ${({ theme }) =>
    `linear-gradient(to right, ${theme.a400} , ${theme.a700})`};
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
