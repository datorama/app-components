import React from 'react';
import { Pagination } from '../components/Pagination';

export default {
  title: 'core/Pagination',
  component: Pagination,
  argTypes: {},
};

const Template = (args) => <Pagination {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  max: 6,
  total: 60,
};
