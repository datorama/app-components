import React from 'react';
import { Toggle } from '../components/Toggle';

export default {
  title: 'core/Toggle',
  component: Toggle,
  argTypes: {},
};

const Template = (args) => <Toggle {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  label: 'Toggle Label',
  checked: true,
};
