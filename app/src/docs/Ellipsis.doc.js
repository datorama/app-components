import React from 'react';

// components
import Base from './Base';
import { Row, Col } from '../components/index';
import Snippet from './Snippet';

const snippet = `
() => {
  const [value, setValue] = useState(120);
  const demoStyles = {
    width: '60%',
    height: 160,
    display: 'flex',
    justifyContent: 'space-around',
    flexDirection: 'column'
  };
  
  return (
    <div style={demoStyles}>
      <Range min={120} max={400} onChange={setValue}/>
      <div style={{ width: value }}>
          <Ellipsis>
            Lorem ipsum dolor sit amet, consectetur
            adipisicing elit.
          </Ellipsis>
      </div>
    </div>
  );
};
`;

const CardDoc = () => {
  const title = 'ellipsis';
  const description = '';

  return (
    <Base title={title} description={description} name="Ellipsis">
      <Row>
        <Col>
          <Snippet snippet={snippet} stretch />
        </Col>
      </Row>
    </Base>
  );
};

export default CardDoc;
