import React from 'react';
import styled from 'styled-components';

// components
import Base from './Base';
import {Row, Col, Card} from '../components/index';
import Snippet from './Snippet';

const snippet = `
// inside a component
import { Card } from '../components/index';

const MyComp = () => (<Card>...</Card>);
`;

const clickable = `
// inside a component
import { Card } from '../components/index';

const MyComp = () => (<Card clickable>...</Card>);
`;

const CardDoc = () => {
  const title = 'card';
  const description =
    'Cards are surfaces that display content and actions on a single topic. They should be easy to scan for relevant and actionable information. Elements, like text and images, should be placed on them in a way that clearly indicates hierarchy.';

  return (
    <Base title={title} description={description} name="Card">
      <Row>
        <Col>
          <Snippet snippet={snippet} />
        </Col>
        <Col>
          <Card>
            <Inner>sample card content</Inner>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col>
          <Snippet snippet={clickable} />
        </Col>
        <Col>
          <Card clickable>
            <Inner>clickable card</Inner>
          </Card>
        </Col>
      </Row>
    </Base>
  );
};

export default CardDoc;

const Inner = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 53px;
  background: ${({ theme }) => theme.p100};
  ${({ theme }) => theme.text.p};
`;
