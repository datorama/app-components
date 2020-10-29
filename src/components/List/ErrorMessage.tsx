import React from 'react';
import styled from 'styled-components';

// Assets
import image from '../../assets/error/error-light.svg';

const ErrorMessage = () => {
  return (
    <Container>
      <StyledError src={image} />
      <Title>Oops! Something went wrong</Title>
      <Subtitle>Please try again later</Subtitle>
    </Container>
  );
};

export default ErrorMessage;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledError = styled.img`
  width: 300px;
  height: 200px;
`;

const Title = styled.div`
  font-size: 16px;
  color: ${({ theme }) => theme.p300};
  font-weight: 600;
  margin-top: 20px;
`;

const Subtitle = styled.div`
  font-size: 13px;
  color: ${({ theme }) => theme.p300};
  font-weight: 400;
  margin-top: 10px;
`;
