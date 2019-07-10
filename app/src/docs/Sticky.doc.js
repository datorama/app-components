import React from 'react';
import styled from 'styled-components';

// components
import Base from './Base';
import { Row, Col } from '../components/index';
import Snippet from './Snippet';

const snippet = `
() => {
  const [fixed, setFixed] = useState(false);
  const styles = {
    width: 400,
    height: 40,
    borderRadius: 4,
    background: fixed ? theme.a400 : theme.p200
  };
  
  return (
    <Sticky onChange={res => setFixed(res.fixed)}>
      <div style={styles} />
    </Sticky>
  );
};
`;

const StickyDoc = () => {
  const title = 'Sticky';
  const description =
    'A sticky component. Behaves just like position - sticky.';

  return (
    <Base title={title} description={description} name="Sticky">
      <Row align="stretch">
        <Col>
          <Snippet snippet={snippet} direction="column" />
        </Col>
      </Row>
      <Spacer />
    </Base>
  );
};

export default StickyDoc;

const Spacer = styled.div`
  width: 100%;
  height: 200vh;
`;
