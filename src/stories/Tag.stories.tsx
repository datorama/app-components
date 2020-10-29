import React from 'react';
import { Tag } from '../components/Tag';

export default {
  title: 'core/Tag',
  component: Tag,
  argTypes: {
    color: { control: 'color' },
  },
};

const Template = (args) => <Tag {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  label: 'Tag Component',
};
