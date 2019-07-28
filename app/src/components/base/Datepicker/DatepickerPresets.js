import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { get, isEmpty } from 'lodash/fp';
import moment from 'moment';
import styled from 'styled-components';

// icons
import ArrowDown from '../../icons/ArrowDown.icon';

// components
import Select from '../Select/Select';
import { convertToMomentRange } from './date.utils';

const CustomHeader = ({ open, toggleOpen, placeholder, values }) => (
  <Header onClick={toggleOpen}>
    {get('[0].label', values) || placeholder}
    <Arrow rotation={open ? '180deg' : '0deg'} />
  </Header>
);

class DatepickerPresets extends Component {
  static propTypes = {
    firstDayOfWeek: PropTypes.oneOf([0, 1]),
    onChange: PropTypes.func,
    selectedPreset: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string,
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        dateRange: PropTypes.object
      })
    ),
    customPresets: PropTypes.arrayOf(
      PropTypes.shape({
        value: PropTypes.string,
        label: PropTypes.string,
        dateRange: PropTypes.shape({
          startDate: PropTypes.instanceOf(Date),
          endDate: PropTypes.instanceOf(Date)
        })
      })
    )
  };

  presetsMap = null;
  presetsOptions = [];
  today = null;

  componentDidMount() {
    const { firstDayOfWeek } = this.props;

    moment.updateLocale('en', {
      week: {
        dow: firstDayOfWeek,
        doy: firstDayOfWeek === 0 ? 6 : 4
      }
    });

    this.setPresets();
  }

  setPresets() {
    const { customPresets } = this.props;

    this.today = moment().startOf('day');
    this.presetsMap = {
      thisWeek: {
        startDate: this.today.clone().startOf('week'),
        endDate: this.today.clone().endOf('week')
      },
      thisMonth: {
        startDate: this.today.clone().startOf('month'),
        endDate: this.today.clone().endOf('month')
      },
      thisQuarter: {
        startDate: this.today.clone().startOf('quarter'),
        endDate: this.today.clone().endOf('quarter')
      },
      thisYear: {
        startDate: this.today.clone().startOf('year'),
        endDate: this.today.clone().endOf('year')
      },
      last7days: {
        startDate: this.today.clone().subtract(7, 'days'),
        endDate: this.today.clone().subtract(1, 'days')
      },
      last14days: {
        startDate: this.today.clone().subtract(14, 'days'),
        endDate: this.today.clone().subtract(1, 'days')
      },
      last30days: {
        startDate: this.today.clone().subtract(30, 'days'),
        endDate: this.today.clone().subtract(1, 'days')
      },
      last90days: {
        startDate: this.today.clone().subtract(90, 'days'),
        endDate: this.today.clone().subtract(1, 'days')
      },
      yesterday: {
        startDate: this.today.clone().subtract(1, 'days'),
        endDate: this.today.clone().subtract(1, 'days')
      },
      weekToDate: {
        startDate: this.today.clone().startOf('week'),
        endDate: this.today.clone()
      },
      monthToDate: {
        startDate: this.today.clone().startOf('month'),
        endDate: this.today.clone()
      },
      quarterToDate: {
        startDate: this.today.clone().startOf('quarter'),
        endDate: this.today.clone()
      },
      yearToDate: {
        startDate: this.today.clone().startOf('year'),
        endDate: this.today.clone()
      },
      prevWeek: {
        startDate: this.today
          .clone()
          .subtract(1, 'week')
          .startOf('week'),
        endDate: this.today
          .clone()
          .subtract(1, 'week')
          .endOf('week')
      },
      prevMonth: {
        startDate: this.today
          .clone()
          .subtract(1, 'month')
          .startOf('month'),
        endDate: this.today
          .clone()
          .subtract(1, 'month')
          .endOf('month')
      },
      prevYear: {
        startDate: this.today
          .clone()
          .subtract(1, 'year')
          .startOf('year'),
        endDate: this.today
          .clone()
          .subtract(1, 'year')
          .endOf('year')
      },
      prevQuarter: {
        startDate: this.today
          .clone()
          .subtract(1, 'quarter')
          .startOf('quarter'),
        endDate: this.today
          .clone()
          .subtract(1, 'quarter')
          .endOf('quarter')
      }
    };

    this.presetsOptions = [
      {
        label: 'This',
        options: [
          {
            value: 'this-week',
            label: 'This week',
            dateRange: this.presetsMap.thisWeek
          },
          {
            value: 'this-month',
            label: 'This month',
            dateRange: this.presetsMap.thisMonth
          },
          {
            value: 'this-quarter',
            label: 'This quarter',
            dateRange: this.presetsMap.thisQuarter
          },
          {
            value: 'this-year',
            label: 'This year',
            dateRange: this.presetsMap.thisYear
          }
        ]
      },
      {
        label: 'Last',
        options: [
          {
            value: 'last-7',
            label: 'Last 7 days',
            dateRange: this.presetsMap.last7days
          },
          {
            value: 'last-14',
            label: 'Last 14 days',
            dateRange: this.presetsMap.last14days
          },
          {
            value: 'last-30',
            label: 'Last 30 days',
            dateRange: this.presetsMap.last30days
          },
          {
            value: 'last-90',
            label: 'Last 90 days',
            dateRange: this.presetsMap.last90days
          }
        ]
      },
      {
        label: 'To Date',
        options: [
          {
            value: 'yesterday',
            label: 'Yesterday',
            dateRange: this.presetsMap.yesterday
          },
          {
            value: 'week-to-date',
            label: 'Week to date',
            dateRange: this.presetsMap.weekToDate
          },
          {
            value: 'month-to-date',
            label: 'Month to date',
            dateRange: this.presetsMap.monthToDate
          },
          {
            value: 'quarter-to-date',
            label: 'Quarter to date',
            dateRange: this.presetsMap.quarterToDate
          },
          {
            value: 'year-to-date',
            label: 'Year to date',
            dateRange: this.presetsMap.yearToDate
          }
        ]
      },
      {
        label: 'Previous',
        options: [
          {
            value: 'prev-week',
            label: 'Previous week',
            dateRange: this.presetsMap.prevWeek
          },
          {
            value: 'prev-month',
            label: 'Previous month',
            dateRange: this.presetsMap.prevMonth
          },
          {
            value: 'prev-quarter',
            label: 'Previous quarter',
            dateRange: this.presetsMap.prevQuarter
          },
          {
            value: 'prev-year',
            label: 'Previous year',
            dateRange: this.presetsMap.prevYear
          }
        ]
      }
    ];

    if (!isEmpty(customPresets)) {
      const options = customPresets.map(customPreset => ({
        ...customPreset,
        dateRange: convertToMomentRange(customPreset.dateRange)
      }));

      this.presetsOptions.push({
        label: 'Custom',
        options
      });
    }
  }

  render() {
    const { onChange, selectedPreset } = this.props;

    return (
      <Container>
        <Select
          sortable={false}
          placeholder="Presets"
          options={this.presetsOptions}
          values={selectedPreset}
          headerRenderer={CustomHeader}
          onChange={onChange}
        />
      </Container>
    );
  }
}

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
  width: 100%;
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
