import React from 'react';
import styled from 'styled-components';
import { DataArray } from './Grid.types';

interface Props {
  data: DataArray;
}

const Footer = (props: Props) => {
  const { data } = props;

  return (
    <Container>
      <Total>{data.length} Items</Total>
    </Container>
  );
};

export default Footer;

const Container = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const Total = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.p300};
`;
