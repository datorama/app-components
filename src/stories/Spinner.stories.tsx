import React from 'react';
import { Spinner } from '../components/Spinner';

export default {
  title: 'core/Spinner',
  component: Spinner,
  argTypes: {
    color: { control: 'color' },
  },
};

const Template = (args) => <Spinner {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
