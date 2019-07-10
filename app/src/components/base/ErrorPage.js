import React from 'react';
import styled, { css } from 'styled-components';
import Button from './Button';
import GeneralError from '../icons/GeneralError.icon';
import PropTypes from 'prop-types';

const ErrorPage = props => (
  <Container fixed={props.fixed} className={props.className}>
    <StyledGeneralError />
    <Title>{props.title}</Title>
    <Subtitle>{props.subtitle}</Subtitle>
    {props.onClick && (
      <Button onClick={props.onClick}>{props.buttonLabel}</Button>
    )}
  </Container>
);

ErrorPage.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  buttonLabel: PropTypes.string,
  onClick: PropTypes.func,
  className: PropTypes.string,
  fixed: PropTypes.bool
};

ErrorPage.defaultProps = {
  fixed: true
};

export default ErrorPage;

const Container = styled.div`
  background: ${({ theme }) => theme.p0};
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  padding: 40px;

  ${({ fixed }) =>
    fixed &&
    css`
      width: 100vw;
      height: 100vh;
      position: fixed;
      top: 0;
      left: 0;
      z-index: 999;
    `};
`;

const StyledGeneralError = styled(GeneralError)`
  max-width: 211px;
  max-height: 128px;
`;

const Title = styled.div`
  ${({ theme }) => theme.text.headline};
  margin: 30px;
  color: ${({ theme }) => theme.p400};
`;

const Subtitle = styled.div`
  color: ${({ theme }) => theme.p300};
  ${({ theme }) => theme.text.simple};
  margin-bottom: 30px;
`;
