import React from 'react';
import { Tabs } from '../components/Tabs';

export default {
  title: 'core/Tabs',
  component: Tabs,
  argTypes: {},
};

const Template = (args) => <Tabs {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  selectedIndex: 0,
  tabs: [
    { id: 0, label: 'Explore' },
    { id: 1, label: 'Filters' },
    { id: 2, label: 'Summary' },
  ],
};
