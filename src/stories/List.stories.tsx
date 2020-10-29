import React from 'react';
import { List } from '../components/List/List';

export default {
  title: 'core/List',
  component: List,
  argTypes: {},
};

const Template = (args) => <List {...args} />;

const data = [
  {
    name: 'Shay Keinan',
    color: 'Purple',
    age: 34,
    country: 'Finland',
  },
  { name: 'Vladimir Porton', color: 'Orange', age: 30, country: 'Israel' },
  { name: 'Aran Shinaar', color: 'Black', age: 32, country: 'Poland' },
  { name: 'Guy Kaufman', color: 'White', age: 34, country: 'Russia' },
  { name: 'Hagit Zamir', color: 'Green', age: 30, country: 'Italy' },
  { name: 'Itay Dafna', color: 'Red', age: 30, country: 'Denmark' },
  { name: 'Shay Keinan', color: 'Purple', age: 34, country: 'Finland' },
  { name: 'Vladimir Porton', color: 'Orange', age: 30, country: 'Israel' },
  { name: 'Aran Shinaar', color: 'Black', age: 28, country: 'Poland' },
  { name: 'Guy Kaufman', color: 'White', age: 34, country: 'Russia' },
  { name: 'Hagit Zamir', color: 'Green', age: 30, country: 'Italy' },
  { name: 'Itay Dafna', color: 'Red', age: 30, country: 'Denmark' },
  { name: 'Shay Keinan', color: 'Purple', age: 34, country: 'Finland' },
  { name: 'Vladimir Porton', color: 'Orange', age: 30, country: 'Israel' },
  { name: 'Aran Shinaar', color: 'Black', age: 34, country: 'Poland' },
  { name: 'Guy Kaufman', color: 'White', age: 34, country: 'Russia' },
  { name: 'Hagit Zamir', color: 'Green', age: 30, country: 'Italy' },
  { name: 'Itay Dafna', color: 'Red', age: 30, country: 'Denmark' },
];

const headers = [
  { label: 'Name', dataKey: 'name', isSortable: true },
  { label: 'Age', dataKey: 'age', isSortable: true },
  { label: 'Color', dataKey: 'color', isSortable: true },
  { label: 'Country', dataKey: 'country' },
];

export const Primary = Template.bind({});
Primary.args = {
  data,
  headers,
};
