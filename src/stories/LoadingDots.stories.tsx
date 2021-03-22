import React from 'react';
import { LoadingDots } from '../components/LoadingDots/LoadingDots';

export default {
  title: 'core/Loading Dots',
  component: LoadingDots,
  argTypes: {},
};

const Template = () => (
  <div>
    <LoadingDots />
  </div>
);

export const Primary = Template.bind({});
Primary.args = {};
