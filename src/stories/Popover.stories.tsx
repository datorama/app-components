import React, { useState, useCallback, useRef } from 'react';

import Popover, {
  DEFAULT_HEIGHT,
  DEFAULT_OFFSET,
  DEFAULT_WIDTH,
} from '../components/Popover';
import { Button } from '../components/Button';

export default {
  title: 'core/Popover',
  component: Popover,
  argTypes: {
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
    offset: { control: 'number' },
    bgColor: { control: 'color' },
    height: { control: 'number' },
    width: { control: 'number' },
    hideClose: { control: 'boolean' },
    enableDebounce: {
      control: 'boolean',
      description:
        'enable debounce in order to improve performance on resize/scroll',
    },
    children: { control: 'text' },
    isOpened: { control: 'none' },
    triggerRef: { control: 'none' },
    absolutePosition: {
      control: 'array',
      description:
        'absolute position can be given. that way, the triggerRef positioning will be ignored',
    },
  },
};

const Template = (args) => {
  const [isOpen, setIsOpen] = useState(false);
  const closePopover = useCallback(() => setIsOpen(false), []);
  const openPopover = useCallback(() => setIsOpen(true), []);

  const btnRef = useRef(null);

  return (
    <div>
      <Popover
        {...args}
        triggerRef={btnRef}
        isOpened={isOpen}
        onClose={closePopover}
      />
      <div
        ref={btnRef}
        style={{
          display: 'inline-block',
          position: 'absolute',
          top: '50%',
          left: '45%',
        }}
      >
        <Button onClick={openPopover}>Toggle Popover</Button>
      </div>
    </div>
  );
};

export const Primary = Template.bind({});
Primary.args = {
  position: 'bottom',
  children: 'Popover Content',
  width: DEFAULT_WIDTH,
  height: DEFAULT_HEIGHT,
  offset: DEFAULT_OFFSET,
};
