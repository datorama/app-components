import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

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
  background: ${({ theme }) => theme.p100};
  overflow: hidden;
`;

const Inner = styled.div`
  width: 20%;
  position: absolute;
  top: 0;
  left: 0;
  height: 2px;
  background: ${({ theme, color }) => color || theme.a400};
  animation: linearProgress 2s infinite ease-in-out;

  @keyframes linearProgress {
    0% {
      width: 0;
      left: 0;
    }
    70% {
      width: 120%;
    }
    100% {
      left: 100%;
    }
  }
`;
