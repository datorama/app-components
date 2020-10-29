import React from 'react';
import { MultiProgress } from '../components/MultiProgress';
import { lightTheme } from '../constants/themes.constants';

export default {
  title: 'core/MultiProgress',
  component: MultiProgress,
  argTypes: {
    meterColor: { control: 'color' },
  },
};

const Template = (args) => <MultiProgress {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  radius: 200,
  values: [
    { color: lightTheme.a600, percentage: 40 },
    { color: lightTheme.a500, percentage: 60 },
    { color: lightTheme.a400, percentage: 80 },
    { color: lightTheme.a300, percentage: 100 },
  ],
};
