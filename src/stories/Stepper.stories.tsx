import React from 'react';
import { Stepper } from '../components/Stepper';
import { noop } from 'lodash/fp';

export default {
  title: 'core/Stepper',
  component: Stepper,
  argTypes: {},
};

const Template = (args) => <Stepper {...args} selectStep={noop} />;

export const Primary = Template.bind({});
Primary.args = {
  steps: [
    { id: 0, label: 'My brand', enabled: true, touched: true },
    { id: 1, label: 'Competitors', enabled: true },
    { id: 2, label: 'Summary', enabled: false },
  ],
  currentStep: 0,
};
