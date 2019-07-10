import React from 'react';

// components
import Base from './Base';
import { Col, Row } from '../components/index';
import Snippet from './Snippet';

const snippet = `
() => {
  const [counter, setCounter] = useState(0);
  const advance = useCallback(() => setCounter(counter + 1), [counter]);
  
  const styles = {
    fontSize: 12,
    color: theme.p600,
    fontWeight: 500
  };
  
  return (
    <ClickOut onClick={advance}>
      <Card>
        <div style={styles}>Clicked {counter} times</div>
        <div style={styles}>(click outside the element)</div>
      </Card>
    </ClickOut>
  );
};
`;

const ClickOutDoc = () => {
  const title = 'click out';
  const description =
    'click outside utility. Triggers the onClick callback only when clicking outside the wrapped element.';

  return (
    <Base title={title} description={description} name="ClickOut">
      <Row>
        <Col>
          <Snippet snippet={snippet} />
        </Col>
      </Row>
    </Base>
  );
};

export default ClickOutDoc;
