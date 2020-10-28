import React from 'react';
import { WidgetOverlay } from '../components/WidgetOverlay/WidgetOverlay';
import styled from 'styled-components';

export default {
  title: 'core/WidgetOverlay',
  component: WidgetOverlay,
  argTypes: {
    children: { control: 'none' },
  },
};

const Template = (args) => (
  <Container>
    <WidgetOverlay {...args}>
      <Label>Widget Content</Label>
    </WidgetOverlay>
  </Container>
);

export const Primary = Template.bind({});
Primary.args = {};

const Container = styled.div`
  width: 500px;
  height: 400px;
  border: 1px solid ${({ theme }) => theme.p200};
  border-radius: 4px;
`;

const Label = styled.div`
  ${({ theme }) => theme.text.sm};
`;
