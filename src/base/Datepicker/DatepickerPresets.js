import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import moment from 'moment';

// icons
import ArrowDown from '../../icons/ArrowDown.icon';

// components
import Select from '../Select/Select';

const TODAY = moment().startOf('day');
const FORMAT = 'YYYY-MM-DD';

const THIS_WEEK = [
  TODAY.clone()
    .startOf('week')
    .format(FORMAT),
  TODAY.clone()
    .endOf('week')
    .format(FORMAT)
];
const THIS_MONTH = [
  TODAY.clone()
    .startOf('month')
    .format(FORMAT),
  TODAY.clone()
    .endOf('month')
    .format(FORMAT)
];
const THIS_QUARTER = [
  TODAY.clone()
    .startOf('quarter')
    .format(FORMAT),
  TODAY.clone()
    .endOf('quarter')
    .format(FORMAT)
];
const THIS_YEAR = [
  TODAY.clone()
    .startOf('year')
    .format(FORMAT),
  TODAY.clone()
    .endOf('year')
    .format(FORMAT)
];

const LAST_7_DAYS = [
  TODAY.clone()
    .subtract(6, 'days')
    .format(FORMAT),
  TODAY.format(FORMAT)
];
const LAST_14_DAYS = [
  TODAY.clone()
    .subtract(13, 'days')
    .format(FORMAT),
  TODAY.format(FORMAT)
];
const LAST_30_days = [
  TODAY.clone()
    .subtract(29, 'days')
    .format(FORMAT),
  TODAY.format(FORMAT)
];
const LAST_90_DAYS = [
  TODAY.clone()
    .subtract(89, 'days')
    .format(FORMAT),
  TODAY.format(FORMAT)
];

const YESTERDAY_TO_DATE = [
  TODAY.clone()
    .subtract(1, 'days')
    .format(FORMAT),
  TODAY.format(FORMAT)
];
const WEEK_TO_DATE = [
  TODAY.clone()
    .startOf('week')
    .format(FORMAT),
  TODAY.format(FORMAT)
];
const MONTH_TO_DATE = [
  TODAY.clone()
    .startOf('month')
    .format(FORMAT),
  TODAY.format(FORMAT)
];
const QUARTER_TO_DATE = [
  TODAY.clone()
    .startOf('quarter')
    .format(FORMAT),
  TODAY.format(FORMAT)
];
const YEAR_TO_DATE = [
  TODAY.clone()
    .startOf('year')
    .format(FORMAT),
  TODAY.format(FORMAT)
];

const PREV_WEEK = [
  TODAY.clone()
    .subtract(1, 'week')
    .startOf('week')
    .format(FORMAT),
  TODAY.clone()
    .subtract(1, 'week')
    .endOf('week')
    .format(FORMAT)
];
const PREV_MONTH = [
  TODAY.clone()
    .subtract(1, 'month')
    .startOf('month')
    .format(FORMAT),
  TODAY.clone()
    .subtract(1, 'month')
    .endOf('month')
    .format(FORMAT)
];
const PREV_QUARTER = [
  TODAY.clone()
    .subtract(1, 'quarter')
    .startOf('quarter')
    .format(FORMAT),
  TODAY.clone()
    .subtract(1, 'quarter')
    .endOf('quarter')
    .format(FORMAT)
];
const PREV_YEAR = [
  TODAY.clone()
    .subtract(1, 'year')
    .startOf('year')
    .format(FORMAT),
  TODAY.clone()
    .subtract(1, 'year')
    .endOf('year')
    .format(FORMAT)
];

const CustomHeader = ({ open, toggleOpen, placeholder }) => (
  <Header onClick={toggleOpen}>
    {placeholder}
    <Arrow rotation={open ? '180deg' : '0deg'} />
  </Header>
);

const DatepickerPresets = ({ onChange }) => (
  <Container>
    <Select
      placeholder="Presets"
      options={[
        { value: 'this-week', label: 'This week', selection: THIS_WEEK },
        { value: 'this-month', label: 'This month', selection: THIS_MONTH },
        {
          value: 'this-quarter',
          label: 'This quarter',
          selection: THIS_QUARTER
        },
        { value: 'this-year', label: 'This year', selection: THIS_YEAR },

        { value: 'last-7', label: 'Last 7 days', selection: LAST_7_DAYS },
        { value: 'last-14', label: 'Last 14 days', selection: LAST_14_DAYS },
        { value: 'last-30', label: 'Last 30 days', selection: LAST_30_days },
        { value: 'last-90', label: 'Last 90 days', selection: LAST_90_DAYS },

        {
          value: 'yesterday-to-date',
          label: 'Yesterday',
          selection: YESTERDAY_TO_DATE
        },
        {
          value: 'week-to-date',
          label: 'Week to date',
          selection: WEEK_TO_DATE
        },
        {
          value: 'month-to-date',
          label: 'Month to date',
          selection: MONTH_TO_DATE
        },
        {
          value: 'quarter-to-date',
          label: 'Quarter to date',
          selection: QUARTER_TO_DATE
        },
        {
          value: 'year-to-date',
          label: 'Year to date',
          selection: YEAR_TO_DATE
        },

        { value: 'prev-week', label: 'Previous week', selection: PREV_WEEK },
        { value: 'prev-month', label: 'Previous month', selection: PREV_MONTH },
        {
          value: 'prev-quarter',
          label: 'Previous quarter',
          selection: PREV_QUARTER
        },
        { value: 'prev-year', label: 'Previous year', selection: PREV_YEAR }
      ]}
      values={[]}
      headerRenderer={CustomHeader}
      onChange={onChange}
    />
  </Container>
);

DatepickerPresets.propTypes = {
  onChange: PropTypes.func
};

export default DatepickerPresets;

const Header = styled.div`
  width: 200px;
  cursor: pointer;
  border-radius: 2px;
  height: 30px;
  background: ${({ theme }) => theme.p50};
  display: flex;
  align-items: center;
  justify-content: center;
  ${({ theme }) => theme.text.smLink};
  transition: all 300ms;
  line-height: 12px;
  font-weight: 600;

  &:hover {
    background: ${({ theme }) => theme.p100};
  }
`;

const Container = styled.div`
  width: 100px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
`;

export const Arrow = styled(ArrowDown)`
  width: 8px;
  height: 8px;
  transform: rotate(${({ rotation }) => rotation});
  transition: all 300ms;
  margin-left: 10px;

  * {
    fill: ${({ theme }) => theme.p600};
  }
`;
