import React from 'react';
import { Tooltip } from '../components/Tooltip';
import styled from 'styled-components';

export default {
  title: 'core/Tooltip',
  component: Tooltip,
  argTypes: {
    title: { control: 'text' },
    children: { control: 'none' },
  },
};

const Template = (args) => (
  <Container>
    <Tooltip {...args}>
      <Text>Hover Me!</Text>
    </Tooltip>
  </Container>
);

export const Primary = Template.bind({});
Primary.args = {
  title: 'Tooltip content',
};

const Text = styled.div`
  display: inline-flex;
  width: 120px;
  justify-content: center;
  align-items: center;
  height: 40px;
  background: ${({ theme }) => theme.p100};
  font-size: 14px;
  color: ${({ theme }) => theme.p600};
  position: relative;
`;

const Container = styled.div`
  height: 300px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
