import React from "react";
import { useCallback, useState } from "@storybook/addons";

// Components
import Modal, { ModalProps } from "packages/core/Modal/Modal";
import Button from "packages/core/Button";

export const Default = (props: ModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = useCallback(() => setIsOpen((open) => !open), []);

  return (
    <>
      <Button onClick={toggleOpen}>Toggle Modal</Button>

      <Modal
        isOpen={isOpen}
        toggleIsOpen={toggleOpen}
        size="medium"
        title="Modal Example"
        buttons={[
          ({ key }: { key: string | number }) => <div key={key}>...</div>,
          {
            type: Modal.ButtonType.Secondary,
            label: "cancel",
            onClick: () => {},
            isDisabled: true,
          },
          { label: "submit", onClick: () => {} },
        ]}
        {...props}
      >
        <div>Modal content</div>
      </Modal>
    </>
  );
};

export default {
  title: "Core/Modal",
  component: Modal,
  argTypes: {
    buttons: {
      description: "Array of Button objects or ButtonRenderer functions"
    },
    toggleIsOpen: {
      description: "Callback called on Modal's open state toggle"
    },
    size: {
      description: "Modal's size"
    },
    overlayColor: {
      control: { type: 'color' }
    },
    closeOnOverlayClick: {
      descriptions: 'Should Modal close when clicking outside of its content'
    },
    isOpen: {
      type: 'boolean'
    },
    title: {
      type: 'text'
    },
    children: {
      type: null
    },
    className: {
      control: null
    },
  },
};
