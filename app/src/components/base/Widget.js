import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

// components
import LinearProgress from './LinearProgress';

const Widget = props => (
  <Container disabled={props.disabled} className={props.className}>
    {props.children}
    {props.loading && <StyledProgress />}
  </Container>
);

Widget.propTypes = {
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  empty: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string
};

export default Widget;

const Container = styled.div`
  width: 100%;
  min-height: 120px;
  background: ${({ theme }) => theme.p0};
  border-radius: 4px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  padding: 20px;
  position: relative;

  ${({ disabled }) =>
    disabled &&
    css`
      pointer-events: none;
      opacity: 0.4;
    `};
`;

const StyledProgress = styled(LinearProgress)`
  position: absolute;
  top: 0;
  left: 0;
`;
