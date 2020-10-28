import React from 'react';
import { SegmentedButton } from '../components/SegmentedButton';

export default {
  title: 'core/SegmentedButton',
  component: SegmentedButton,
  argTypes: {
    selected: { control: 'number' },
  },
};

const Template = (args) => <SegmentedButton {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  sections: [
    { id: 0, label: 'Yes' },
    { id: 1, label: 'No' },
    { id: 2, label: 'Maybe' },
  ],
  selected: 0,
};
