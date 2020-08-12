import React from "react";
import { useCallback, useState } from "@storybook/addons";

// Components
import Modal, { ModalProps } from "packages/core/Modal/Modal";
import Button from "packages/core/Button";

import { withTypesTable } from "common/utils";

export const Default = (props: ModalProps) => {
  const [isOpen, setIsOpen] = useState(props.isOpen);
  const toggleOpen = useCallback(() => setIsOpen((open) => !open), []);

  return (
    <>
      <Button onClick={toggleOpen}>Toggle Modal</Button>

      <Modal {...props} isOpen={isOpen} toggleIsOpen={toggleOpen}>
        <div>Modal content</div>
      </Modal>
    </>
  );
};

Default.args = {
  buttons: [
    ({ key }: { key: string | number }) => <div key={key}>...</div>,
    {
      type: Modal.ButtonType.Secondary,
      label: "cancel",
      onClick: () => {},
      isDisabled: true,
    },
    { label: "submit", onClick: () => {} },
  ],
  size: "medium",
  title: "Modal Example",
};

export default {
  title: "Core/Modal",
  component: Modal,
  parameters: {
    docs: {
      container: withTypesTable([
        {
          label: "Button",
          type: `{
  type?: ButtonType;
  isDisabled?: boolean;
  onClick: () => void;
  label: string;
}`,
        },
        {
          label: "ButtonType",
          type: `primary | secondary`,
        },
        {
          label: "ButtonRenderer",
          type: `({ key }: { key: string; }) => ReactNode`,
        },
        {
          label: "Size",
          type: `small | medium | large | full`,
        },
      ]),
    },
  },
  argTypes: {
    buttons: {
      description: "Array of Button objects or ButtonRenderer functions",
    },
    toggleIsOpen: {
      description: "Callback called on Modal's open state toggle",
    },
    size: {
      description: "Modal's size",
    },
    overlayColor: {
      control: { type: "color" },
    },
    closeOnOverlayClick: {
      descriptions: "Should Modal close when clicking outside of its content",
    },
    isOpen: {
      type: "boolean",
    },
    title: {
      type: "text",
    },
    children: {
      type: null,
    },
    className: {
      control: null,
    },
  },
};
