import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { get } from 'lodash/fp';
import moment from 'moment';

// icons
import ArrowDown from '../../icons/ArrowDown.icon';

// components
import Select from '../Select/Select';

const CustomHeader = ({ open, toggleOpen, placeholder, values }) => (
  <Header onClick={toggleOpen}>
    {get('[0].label', values) || placeholder}
    <Arrow rotation={open ? '180deg' : '0deg'} />
  </Header>
);

class DatepickerPresets extends Component {
  componentDidMount() {
    const { firstDayOfWeek } = this.props;

    moment.updateLocale('en', {
      week: {
        dow: firstDayOfWeek
      }
    });

    this.setPresets();
  }

  setPresets() {
    this.TODAY = moment().startOf('day');
    this.FORMAT = 'YYYY-MM-DD';

    this.THIS_WEEK = [
      this.TODAY.clone()
        .startOf('week')
        .format(this.FORMAT),
      this.TODAY.clone()
        .endOf('week')
        .format(this.FORMAT)
    ];
    this.THIS_MONTH = [
      this.TODAY.clone()
        .startOf('month')
        .format(this.FORMAT),
      this.TODAY.clone()
        .endOf('month')
        .format(this.FORMAT)
    ];
    this.THIS_QUARTER = [
      this.TODAY.clone()
        .startOf('quarter')
        .format(this.FORMAT),
      this.TODAY.clone()
        .endOf('quarter')
        .format(this.FORMAT)
    ];
    this.THIS_YEAR = [
      this.TODAY.clone()
        .startOf('year')
        .format(this.FORMAT),
      this.TODAY.clone()
        .endOf('year')
        .format(this.FORMAT)
    ];

    this.LAST_7_DAYS = [
      this.TODAY.clone()
        .subtract(7, 'days')
        .format(this.FORMAT),
      this.TODAY.clone()
        .subtract(1, 'days')
        .format(this.FORMAT)
    ];
    this.LAST_14_DAYS = [
      this.TODAY.clone()
        .subtract(14, 'days')
        .format(this.FORMAT),
      this.TODAY.clone()
        .subtract(1, 'days')
        .format(this.FORMAT)
    ];
    this.LAST_30_days = [
      this.TODAY.clone()
        .subtract(30, 'days')
        .format(this.FORMAT),
      this.TODAY.clone()
        .subtract(1, 'days')
        .format(this.FORMAT)
    ];
    this.LAST_90_DAYS = [
      this.TODAY.clone()
        .subtract(90, 'days')
        .format(this.FORMAT),
      this.TODAY.clone()
        .subtract(1, 'days')
        .format(this.FORMAT)
    ];

    this.YESTERDAY = [
      this.TODAY.clone()
        .subtract(1, 'days')
        .format(this.FORMAT),
      this.TODAY.clone()
        .subtract(1, 'days')
        .format(this.FORMAT)
    ];
    this.WEEK_TO_DATE = [
      this.TODAY.clone()
        .startOf('week')
        .format(this.FORMAT),
      this.TODAY.format(this.FORMAT)
    ];
    this.MONTH_TO_DATE = [
      this.TODAY.clone()
        .startOf('month')
        .format(this.FORMAT),
      this.TODAY.format(this.FORMAT)
    ];
    this.QUARTER_TO_DATE = [
      this.TODAY.clone()
        .startOf('quarter')
        .format(this.FORMAT),
      this.TODAY.format(this.FORMAT)
    ];
    this.YEAR_TO_DATE = [
      this.TODAY.clone()
        .startOf('year')
        .format(this.FORMAT),
      this.TODAY.format(this.FORMAT)
    ];

    this.PREV_WEEK = [
      this.TODAY.clone()
        .subtract(1, 'week')
        .startOf('week')
        .format(this.FORMAT),
      this.TODAY.clone()
        .subtract(1, 'week')
        .endOf('week')
        .format(this.FORMAT)
    ];
    this.PREV_MONTH = [
      this.TODAY.clone()
        .subtract(1, 'month')
        .startOf('month')
        .format(this.FORMAT),
      this.TODAY.clone()
        .subtract(1, 'month')
        .endOf('month')
        .format(this.FORMAT)
    ];
    this.PREV_QUARTER = [
      this.TODAY.clone()
        .subtract(1, 'quarter')
        .startOf('quarter')
        .format(this.FORMAT),
      this.TODAY.clone()
        .subtract(1, 'quarter')
        .endOf('quarter')
        .format(this.FORMAT)
    ];
    this.PREV_YEAR = [
      this.TODAY.clone()
        .subtract(1, 'year')
        .startOf('year')
        .format(this.FORMAT),
      this.TODAY.clone()
        .subtract(1, 'year')
        .endOf('year')
        .format(this.FORMAT)
    ];
  }

  render() {
    const { onChange, selectedPreset } = this.props;

    return (
      <Container>
        <Select
          placeholder="Presets"
          options={[
            {
              value: 'this-week',
              label: 'This week',
              selection: this.THIS_WEEK
            },
            {
              value: 'this-month',
              label: 'This month',
              selection: this.THIS_MONTH
            },
            {
              value: 'this-quarter',
              label: 'This quarter',
              selection: this.THIS_QUARTER
            },
            {
              value: 'this-year',
              label: 'This year',
              selection: this.THIS_YEAR
            },

            {
              value: 'last-7',
              label: 'Last 7 days',
              selection: this.LAST_7_DAYS
            },
            {
              value: 'last-14',
              label: 'Last 14 days',
              selection: this.LAST_14_DAYS
            },
            {
              value: 'last-30',
              label: 'Last 30 days',
              selection: this.LAST_30_days
            },
            {
              value: 'last-90',
              label: 'Last 90 days',
              selection: this.LAST_90_DAYS
            },

            {
              value: 'yesterday',
              label: 'Yesterday',
              selection: this.YESTERDAY
            },
            {
              value: 'week-to-date',
              label: 'Week to date',
              selection: this.WEEK_TO_DATE
            },
            {
              value: 'month-to-date',
              label: 'Month to date',
              selection: this.MONTH_TO_DATE
            },
            {
              value: 'quarter-to-date',
              label: 'Quarter to date',
              selection: this.QUARTER_TO_DATE
            },
            {
              value: 'year-to-date',
              label: 'Year to date',
              selection: this.YEAR_TO_DATE
            },

            {
              value: 'prev-week',
              label: 'Previous week',
              selection: this.PREV_WEEK
            },
            {
              value: 'prev-month',
              label: 'Previous month',
              selection: this.PREV_MONTH
            },
            {
              value: 'prev-quarter',
              label: 'Previous quarter',
              selection: this.PREV_QUARTER
            },
            {
              value: 'prev-year',
              label: 'Previous year',
              selection: this.PREV_YEAR
            }
          ]}
          values={selectedPreset}
          headerRenderer={CustomHeader}
          onChange={onChange}
        />
      </Container>
    );
  }
}

DatepickerPresets.propTypes = {
  onChange: PropTypes.func,
  selectedPreset: PropTypes.array
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
