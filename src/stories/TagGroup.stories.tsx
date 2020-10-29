import React from 'react';
import { TagGroup } from '../components/TagGroup';
import { noop } from 'lodash/fp';

export default {
  title: 'core/TagGroup',
  component: TagGroup,
  argTypes: {
    color: { control: 'color' },
    selected: { control: 'array' },
  },
};

const Template = (args) => <TagGroup {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  tags: [
    { id: 'red', label: 'Red' },
    { id: 'blue', label: 'Blue' },
    { id: 'green', label: 'Green' },
    { id: 'purple', label: 'Purple' },
  ],
  selected: ['red', 'blue'],
  onChange: noop,
};
