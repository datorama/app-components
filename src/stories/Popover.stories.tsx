import React, { useState, useCallback, useRef } from 'react';
import Popover, { DEFAULT_HEIGHT, DEFAULT_WIDTH } from '../components/Popover';
import { Button } from '../components/Button';

export default {
  title: 'core/Popover',
  component: Popover,
  argTypes: {
    bgColor: { control: 'color' },
    children: { control: 'text' },
    height: { control: 'number' },
    width: { control: 'number' },
    position: {
      control: {
        type: 'select',
        options: [
          'bottom',
          'bottomLeft',
          'bottomRight',
          'top',
          'topLeft',
          'topRight',
          'left',
          'leftTop',
          'leftBottom',
          'right',
          'rightTop',
          'rightBottom',
        ],
      },
    },
  },
};

const Template = (args) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = useCallback(() => setIsOpen(!isOpen), [isOpen]);
  const btnRef = useRef(null);
  return (
    <div>
      <Popover {...args} triggerRef={btnRef} isOpened={isOpen} />
      <div
        ref={btnRef}
        style={{
          display: 'inline-block',
          position: 'absolute',
          top: '50%',
          left: '45%',
        }}
      >
        <Button onClick={toggleOpen}>Toggle Popover</Button>
      </div>
    </div>
  );
};

export const Primary = Template.bind({});
Primary.args = {
  children: 'Popover Content',
  width: DEFAULT_WIDTH,
  height: DEFAULT_HEIGHT,
};
