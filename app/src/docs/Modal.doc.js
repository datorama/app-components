import React from 'react';

// components
import Base from './Base';
import { Row, Col } from '../components/index';
import Snippet from './Snippet';

const snippet = `
() => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = useCallback(() => setIsOpen(open => !open), [isOpen]);
  
  return (
    <div>
      <Modal
        open={isOpen}
        toggleOpen={toggleOpen}
        size="medium"
        title="Modal Example"
        buttons={[
          ({ key }) => (<div key={key}>...</div>),
          {
            type: 'secondary',
            label: 'cancel',
            onClick: null,
            disabled: true
          },
          { label: 'submit', onClick: null }
        ]}
      >
        <div style={{ color: theme.p600 }}>modal content</div>
      </Modal>
      <Button onClick={toggleOpen}>Toggle Modal</Button>
    </div>
  );
};
`;

const ModalDoc = () => {
  const title = 'modal';
  const description =
    'Dialogs inform users about a task and can contain critical information, require decisions, or involve multiple tasks.';

  return (
    <Base title={title} description={description} name="Modal">
      <Row align="stretch">
        <Col>
          <Snippet snippet={snippet} />
        </Col>
      </Row>
    </Base>
  );
};

export default ModalDoc;
