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
        size={Modal.Size.Medium}
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
};
