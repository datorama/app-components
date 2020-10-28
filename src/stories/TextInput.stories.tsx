import React from 'react';
import { TextInput } from '../components/TextInput';

export default {
  title: 'core/TextInput',
  component: TextInput,
  argTypes: {},
};

const Template = (args) => <TextInput {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  label: 'User Name',
  placeholder: 'John Do',
};
