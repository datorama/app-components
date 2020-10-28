import React from 'react';
import { Collapse } from '../components/Collapse';

export default {
  title: 'core/Collapse',
  component: Collapse,
  argTypes: {
    children: { control: 'text' },
  },
};

const Template = (args) => {
  return <Collapse {...args} />;
};

export const Primary = Template.bind({});
Primary.args = {
  label: 'Collapse label',
  children: 'Collapse component content (children)',
};
