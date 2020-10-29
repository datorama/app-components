import React from 'react';
import styled from 'styled-components';

// Assets
import image from '../../assets/no-data/no-data-light.svg';

interface Props {
  title: string;
}

const NoResults = (props: Props) => (
  <Container>
    {/* @ts-ignore */}
    <StyledNoData src={image} />
    <Title>{props.title}</Title>
    <Subtitle>
      Try adjusting your search or filter to find what you're looking for.
    </Subtitle>
  </Container>
);

export default NoResults;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledNoData = styled.img`
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
