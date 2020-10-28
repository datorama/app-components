import React from 'react';
import { Card } from '../components/Card';
import styled from 'styled-components';

export default {
  title: 'core/Card',
  component: Card,
  argTypes: {
    children: { control: 'none' },
  },
};

const Template = (args) => (
  <Card {...args}>
    <Label>Card Content</Label>
  </Card>
);

export const Primary = Template.bind({});
Primary.args = {};

const Label = styled.div`
  ${({ theme }) => theme.text.sm};
`;
