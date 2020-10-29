import React from 'react';
import { Checkbox } from '../components/Checkbox';

export default {
  title: 'core/Checkbox',
  component: Checkbox,
  argTypes: {},
};

const Template = (args) => <Checkbox {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  label: 'Checkbox Label',
  checked: true,
};
