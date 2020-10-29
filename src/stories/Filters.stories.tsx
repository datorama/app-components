import React from 'react';
import { Filters } from '../components/Filters/Filters';
import { noop } from 'lodash/fp';
import styled from 'styled-components';

export default {
  title: 'core/Filters',
  component: Filters,
  argTypes: {},
};

const Template = (args) => (
  <Container>
    <Filters {...args} onChange={noop} />
  </Container>
);

export const Primary = Template.bind({});
Primary.args = {
  dimensions: [
    { value: 'COUNTRY', label: 'Country' },
    { value: 'CITY', label: 'City' },
    { value: 'COLOR', label: 'Color' },
  ],
  min: 1,
  max: 3,
  defaultOperator: 'CONTAINS',
  initialState: [
    { val: 'Purple', dimension: 'COLOR', operator: 'NOT_CONTAINS' },
    { val: 'Tel Aviv', dimension: 'CITY', operator: 'CONTAINS' },
    { val: 'ISRAEL', dimension: 'COUNTRY', operator: 'CONTAINS' },
  ],
  dropDownOptions: [
    {
      dimension: 'COUNTRY',
      options: [
        { value: 'ISRAEL', label: 'Israel' },
        { value: 'UK', label: 'United Kingdom' },
        { value: 'FRANCE', label: 'France' },
      ],
    },
  ],
};

const Container = styled.div`
  width: 100%;
  min-height: 200px;
`;
