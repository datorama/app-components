import React from 'react';
import { ThemePreview } from '../components/ThemePreview';

export default {
  title: 'core/ThemePreview',
  component: ThemePreview,
  argTypes: {},
};

const Template = (args) => <ThemePreview {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
