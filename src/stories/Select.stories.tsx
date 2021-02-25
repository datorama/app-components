import React from 'react';
import { Select } from '../components/Select/Select';
import { noop } from 'lodash/fp';
import styled from 'styled-components';

export default {
  title: 'core/Select',
  component: Select,
  argTypes: {
    spinnerColor: { control: 'color' },
    inlineSearch: {
      description: 'enables inline search and displays selection as tags',
    },
  },
};

const Template = (args) => (
  <Container>
    <Select {...args} />
  </Container>
);

export const Primary = Template.bind({});
Primary.args = {
  values: [],
  options: [
    { value: '1', label: 'orange' },
    { value: '2', label: 'purple' },
    { value: '3', label: 'black' },
    { value: '4', label: 'green' },
    { value: '5', label: 'yellow' },
    { value: '6', label: 'white' },
  ],
  placeholder: 'Select Color',
  onChange: noop,
};

const Container = styled.div`
  width: 100%;
  height: 200px;
  display: flex;
  justify-content: center;
`;
