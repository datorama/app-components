import React from 'react';
import { SegmentedButton } from '../components/SegmentedButton';
import styled from 'styled-components';

export default {
  title: 'core/SegmentedButton',
  component: SegmentedButton,
  argTypes: {
    selected: { control: 'number' },
  },
};

const Template = (args) => (
  <Container>
    <SegmentedButton {...args} />
  </Container>
);

export const Primary = Template.bind({});
Primary.args = {
  sections: [
    { id: 0, label: 'Yes' },
    { id: 1, label: 'No' },
    { id: 2, label: 'Maybe', tooltip: "choose this option if you're not sure" },
  ],
  selected: 0,
};

const Container = styled.div`
  height: 300px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
