import React from 'react';
import { Datepicker } from '../components/Datepicker/Datepicker';
import styled from 'styled-components';
import { noop } from 'lodash/fp';

export default {
  title: 'core/Datepicker',
  component: Datepicker,
  argTypes: {
    customColor: { control: 'color' },
  },
};

const Template = (args) => (
  <Container>
    <Datepicker {...args} />
  </Container>
);

const getDate = (offset: number) => {
  const today = new Date();

  return new Date(today.setDate(today.getDate() + offset));
};

export const Primary = Template.bind({});
Primary.args = {
  onChange: noop,
  onMenuEnter: noop,
  onMenuLeave: noop,
  dateRange: {
    startDate: getDate(-2),
    endDate: getDate(2),
  },
  activeRange: [getDate(-12), getDate(4)],
};

const Container = styled.div`
  width: 100%;
  height: 400px;
  display: flex;
  justify-content: center;
`;
