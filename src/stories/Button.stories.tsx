import React from 'react';
import { Button } from '../components/Button';

export default {
  title: 'core/Button',
  component: Button,
  argTypes: {
    children: { control: 'text' },
  },
};

const Template = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  children: 'Default Button',
};
