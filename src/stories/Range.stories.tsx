import React from 'react';
import { Range } from '../components/Range';

export default {
  title: 'core/Range',
  component: Range,
  argTypes: {},
};

const Template = (args) => <Range {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  min: 0,
  max: 200,
  initialValue: 20,
  innerMax: 0,
};
