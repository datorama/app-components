import React from 'react';
import styled from 'styled-components';
import { ReactComponent as InfoIcon } from '../assets/info.svg';

const Alert = ({ children }) => {
  return (
    <Container>
      <StyledIcon />
      {children}
    </Container>
  );
};

export default Alert;

const Container = styled.div`
  min-height: 60px;
  background: ${({ theme }) => theme.a200};
  border: 1px solid ${({ theme }) => theme.a400};
  border-radius: 3px;
  box-sizing: border-box;
  padding: 10px 20px;
  display: flex;
  align-items: center;
  ${({ theme }) => theme.text.smNote};
  color: ${({ theme }) => theme.p600};
  line-height: 20px;
`;

const StyledIcon = styled(InfoIcon)`
  width: 32px;
  height: 32px;
  margin-right: 10px;

  path {
    fill: ${({ theme }) => theme.p600};
  }
`;
