import React from 'react';
import styled from 'styled-components';

// components
import Base from './Base';
import { Row, Col, Datepicker, hexToRgba } from '../components/index';
import Snippet from './Snippet';
import moment from 'moment';

const snippet = `
import { Datepicker } from '@datorama/app-components';

const dateRange = {
  startDate: moment().toDate(),
  endDate: moment().add(3, 'days').toDate()
};

const MyComponent = ({ onChange }) => (
  <Datepicker dateRange={dateRange} />
);
`;

const double = `
import { Datepicker } from '@datorama/app-components';

const MyComponent = ({ onChange }) => (
  <Datepicker onChange={onChange} months={2} />
);
`;

const firstDayOfWeek = `
import { Datepicker } from '@datorama/app-components';

const MyComponent = ({ onChange }) => (
  <Datepicker firstDayOfWeek={1} />
);
`;

const withCustomDateFormat = `
import { Datepicker } from '@datorama/app-components';

const MyComponent = ({ onChange }) => (
  <Datepicker dateFormat="MMM DD, YYYY" />
);
`;

const withCustomPresets = `
import { Datepicker } from '@datorama/app-components';

const customPresets = [
  {
    value: 'last2Days',
    label: 'Last 2 days',
    dateRange: {
      startDate: moment()
        .subtract(2, 'days')
        .toDate(),
      endDate: moment()
        .subtract(1, 'days')
        .toDate()
    }
  },
  {
    value: 'previous2Months',
    label: 'Previous 2 months',
    dateRange: {
      startDate: moment()
        .startOf('month')
        .subtract(2, 'months')
        .toDate(),
      endDate: moment()
        .startOf('month')
        .subtract(1, 'month')
        .endOf('month')
        .toDate()
    }
  }
];

const MyComponent = ({ onChange }) => (
  <Datepicker customPresets={customPresets} />
);
`;

const DatePickerDoc = () => {
  const title = 'datepicker';
  const description = 'Default date picker';

  const dateRange = {
    startDate: moment().toDate(),
    endDate: moment()
      .add(3, 'days')
      .toDate()
  };

  const customPresets = [
    {
      value: 'last2Days',
      label: 'Last 2 days',
      dateRange: {
        startDate: moment()
          .subtract(2, 'days')
          .toDate(),
        endDate: moment()
          .subtract(1, 'days')
          .toDate()
      }
    },
    {
      value: 'previous2Months',
      label: 'Previous 2 months',
      dateRange: {
        startDate: moment()
          .startOf('month')
          .subtract(2, 'months')
          .toDate(),
        endDate: moment()
          .startOf('month')
          .subtract(1, 'month')
          .endOf('month')
          .toDate()
      }
    }
  ];

  return (
    <Base title={title} description={description} name="Datepicker">
      <Row>
        <Col>
          <SectionTitle>Default</SectionTitle>
        </Col>
      </Row>
      <Row align="stretch">
        <Col>
          <Snippet snippet={snippet} />
        </Col>
        <Col>
          <Box>
            <StyledDatepicker dateRange={dateRange} />
          </Box>
        </Col>
      </Row>

      <Row>
        <Col>
          <SectionTitle>2 months</SectionTitle>
        </Col>
      </Row>
      <Row align="stretch">
        <Col>
          <Snippet snippet={double} />
        </Col>
        <Col>
          <Box>
            <StyledDatepicker months={2} />
          </Box>
        </Col>
      </Row>

      <Row>
        <Col>
          <SectionTitle>Week starts on Monday</SectionTitle>
        </Col>
      </Row>
      <Row align="stretch">
        <Col>
          <Snippet snippet={firstDayOfWeek} />
        </Col>
        <Col>
          <Box>
            <StyledDatepicker firstDayOfWeek={1} />
          </Box>
        </Col>
      </Row>

      <Row>
        <Col>
          <SectionTitle>Custom date format</SectionTitle>
        </Col>
      </Row>
      <Row align="stretch">
        <Col>
          <Snippet snippet={withCustomDateFormat} />
        </Col>
        <Col>
          <Box>
            <StyledDatepicker dateFormat="MMM DD, YYYY" />
          </Box>
        </Col>
      </Row>

      <Row>
        <Col>
          <SectionTitle>Custom presets</SectionTitle>
        </Col>
      </Row>
      <Row align="stretch">
        <Col>
          <Snippet snippet={withCustomPresets} />
        </Col>
        <Col>
          <Box>
            <StyledDatepicker customPresets={customPresets} />
          </Box>
        </Col>
      </Row>
    </Base>
  );
};

export default DatePickerDoc;

const SectionTitle = styled.div`
  ${({ theme }) => theme.text.subHeadline};
`;

const Box = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  border-radius: 4px;
  justify-content: center;
  background: ${({ theme }) => hexToRgba(theme.p50, 40)};
`;

const StyledDatepicker = styled(Datepicker)`
  left: auto;
  right: 0;
`;
