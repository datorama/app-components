import React from 'react';
import { Gauge } from '../components/Gauge';

export default {
  title: 'core/Gauge',
  component: Gauge,
  argTypes: {
    children: { control: 'text' },
  },
};

const Template = (args) => <Gauge {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  // range start - [0 - 360]
  start: 90,
  // range end - [0 - 360]
  end: 150,
  min: 50,
  max: 150,
  value: 125,
  labelRenderer: (value) => '$' + Math.round(value),
};
