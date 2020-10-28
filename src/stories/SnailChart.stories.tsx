import React from 'react';
import { SnailChart } from '../components/SnailChart';
import { lightTheme } from '../constants/themes.constants';

export default {
  title: 'core/SnailChart',
  component: SnailChart,
  argTypes: {
    // children: { control: 'text' },
  },
};

const Template = (args) => <SnailChart {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  linecap: 'round',
  dividers: 12,
  data: [
    {
      label: 'first label',
      percentage: 75,
      color: lightTheme.g300,
      hoverColor: lightTheme.g600,
    },
    {
      label: 'second label',
      percentage: 63,
      color: lightTheme.g400,
      hoverColor: lightTheme.g600,
    },
    {
      label: 'third label',
      percentage: 50,
      color: lightTheme.g500,
      hoverColor: lightTheme.g600,
    },
  ],
};
