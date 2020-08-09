import React from "react";
import { useCallback, useState } from '@storybook/addons';

// Components
import Modal from 'packages/core/Modal/Modal';
import Button from 'packages/core/Button';

export const DefaultModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = useCallback(() => setIsOpen(open => !open), []);

  return (
    <div>
      <Modal
        isOpen={isOpen}
        toggleIsOpen={toggleOpen}
        size={Modal.Size.Medium}
        title="Modal Example"
        buttons={[
          ({ key }) => (<div key={key}>...</div>),
          {
            type: Modal.ButtonType.Secondary,
            label: 'cancel',
            onClick: () => {},
            isDisabled: true
          },
          { label: 'submit', onClick: () => {} }
        ]}
      >
        <div>Modal content</div>
      </Modal>

      <Button onClick={toggleOpen}>Toggle Modal</Button>
    </div>
  );
};

export default {
  title: "Core/Modal",
  component: Modal,
};
