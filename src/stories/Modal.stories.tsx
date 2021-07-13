import React, { useState, useCallback } from 'react';
import { Modal } from '../components/Modal';
import { Button } from '../components/Button';

export default {
  title: 'core/Modal',
  component: Modal,
  argTypes: {
    children: { control: 'text' },
    toggleOpen: { control: 'none' },
    open: { control: 'none' },
    buttons: { control: 'object' },
  },
};

const Template = (args) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = useCallback(() => setIsOpen(!isOpen), [isOpen]);

  return (
    <div>
      <Modal {...args} toggleOpen={toggleOpen} open={isOpen} />
      <Button onClick={toggleOpen}>Toggle Modal</Button>
    </div>
  );
};

export const Primary = Template.bind({});
Primary.args = {
  children: 'Modal Content',
  title: 'Demo Modal',
  buttons: [
    { type: 'primary', label: 'Close', onClick: () => null, id: 'Close' },
  ],
};
