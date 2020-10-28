import React from 'react';
import { RadialProgress } from '../components/RadialProgress';

export default {
  title: 'core/RadialProgress',
  component: RadialProgress,
  argTypes: {
    color: { control: 'color' },
  },
};

const Template = (args) => <RadialProgress {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  percentage: 60,
};
