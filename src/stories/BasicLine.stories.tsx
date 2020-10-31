import React from 'react';
import { BasicLine } from '../components/BasicLine/BasicLine';
import styled from 'styled-components';

export default {
  title: 'core/BasicLine',
  component: BasicLine,
  argTypes: {
    strokeColor: { control: 'color' },
    fillColor: { control: 'color' },
    tooltipRenderer: { control: 'none' },
  },
};

const data = [
  { y: 50, date: 'Nov 01, 2020' },
  { y: 150, date: 'Nov 02, 2020' },
  { y: 100, date: 'Nov 03, 2020' },
  { y: 200, date: 'Nov 04, 2020' },
  { y: 60, date: 'Nov 05, 2020' },
  { y: 80, date: 'Nov 06, 2020' },
  { y: 10, date: 'Nov 07, 2020' },
  { y: 90, date: 'Nov 08, 2020' },
  { y: 80, date: 'Nov 09, 2020' },
  { y: 160, date: 'Nov 10, 2020' },
];

const tooltipRenderer = (point: any) => (
  <Column>
    <DateLabel>{point.date}</DateLabel>
    <Value>{point.y}</Value>
  </Column>
);

const Template = (args) => (
  <Card>
    <BasicLine {...args} tooltipRenderer={tooltipRenderer} />
  </Card>
);

export const Primary = Template.bind({});
Primary.args = {
  data,
};

const Card = styled.div`
  width: 400px;
  height: 120px;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
`;

const DateLabel = styled.div`
  font-size: 10px;
  color: ${({ theme }) => theme.p600};
`;

const Value = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.p600};
  font-weight: 600;
`;
