import React from 'react';

// components
import Base from './Base';
import { Row, Col } from '../components/index';
import Snippet from './Snippet';
import styled from 'styled-components';

const snippet = `
() => (
  <div style={{ width: '100%' }}>
    <EmptyState type={EMPTY_STATE_TYPE.NO_DATA} size={EMPTY_STATE_SIZE.M} mode={EMPTY_STATE_MODE.LIGHT} />
  </div>
);
`;

const EmptyStateDoc = () => {
  const title = 'Empty state';

  return (
    <Base title={title} name={title} description="">
      <Row>
        <Col>
          <SectionTitle>Basic</SectionTitle>
        </Col>
      </Row>

      <Row align="stretch">
        <Col>
          <Snippet snippet={snippet} />
        </Col>
      </Row>
    </Base>
  );
};

const SectionTitle = styled.div`
  ${({ theme }) => theme.text.subHeadline};
`;

export default EmptyStateDoc;
