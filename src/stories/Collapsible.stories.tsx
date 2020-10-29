import React, { useState, useCallback } from 'react';
import { Collapsible } from '../components/Collapsible';
import { Button } from '../components/Button';

export default {
  title: 'core/Collapsible',
  component: Collapsible,
  argTypes: {
    children: { control: 'none' },
    open: { control: 'none' },
  },
};

const Template = (args) => {
  const [open, setOpen] = useState(false);
  const toggleOpen = useCallback(() => setOpen(!open), [open]);
  const styles = {
    width: '100%',
    height: 200,
    background: '#e0e0e0',
  };

  return (
    <div>
      <Button onClick={toggleOpen}>Toggle Content</Button>
      <Collapsible toggleOpen={toggleOpen} {...args} open={open}>
        <div style={styles} />
      </Collapsible>
    </div>
  );
};

export const Primary = Template.bind({});
Primary.args = {};
