import React from 'react';

// components
import Base from './Base';
import { Row, Col } from '../components/index';
import Snippet from './Snippet';

const snippet = `
() => {
  const [selected, setSelected] = useState(0);
  
  return (
    <Stepper
      steps={[
        { id: 0, label: 'My brand', enabled: true, touched: true },
        { id: 1, label: 'Competitors', enabled: true },
        { id: 2, label: 'Summary', enabled: false }
      ]}
      currentStep={selected}
      selectStep={setSelected}
    />
  );
};
`;

const StepperDoc = () => {
  const title = 'stepper';
  const description = 'stepper.';

  return (
    <Base title={title} description={description} name="Stepper">
      <Row align="stretch">
        <Col>
          <Snippet snippet={snippet} />
        </Col>
      </Row>
    </Base>
  );
};

export default StepperDoc;
