import React from 'react';
import { LinearProgress } from '../components/LinearProgress';

export default {
  title: 'core/LinearProgress',
  component: LinearProgress,
  argTypes: {
    color: { control: 'color' },
  },
};

const Template = (args) => <LinearProgress {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
