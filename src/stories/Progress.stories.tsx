import React from 'react';
import { Progress } from '../components/Progress';

export default {
  title: 'core/Progress',
  component: Progress,
  argTypes: {
    color: { control: 'color' },
  },
};

const Template = (args) => <Progress {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  percentage: 60,
  label: 'Label',
};
