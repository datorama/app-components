import React from 'react';
import styled from 'styled-components';

// components
import PropTable from './PropTable';
import { Row, Col, Container } from '../components/index';

const Base = ({ children, title, description, name }) => {
  return (
    <Container>
      <Row>
        <Col>
          <PageTitle>{title}</PageTitle>
          <Description>{description}</Description>
        </Col>
      </Row>

      {children}

      <Row>
        <Col size={6}>{name && <PropTable compKey={name} />}</Col>
      </Row>
    </Container>
  );
};

export default Base;

const PageTitle = styled.div`
  ${({ theme }) => theme.text.headline};
  text-transform: capitalize;
  margin-bottom: 20px;
`;

const Description = styled.div`
  font-size: 14px;
  font-weight: 300;
  color: ${({ theme }) => theme.p600};
  line-height: 24px;
  margin-bottom: 60px;
  max-width: 50%;
`;
