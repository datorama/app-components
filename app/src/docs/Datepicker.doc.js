import React from 'react';
import styled from 'styled-components';

// components
import Base from './Base';
import { Row, Col } from '../components/index';
import Snippet from './Snippet';

const snippet = `
() => {
  const dateRange = {
    startDate: moment().toDate(),
    endDate: moment()
      .add(3, 'days')
      .toDate()
  };
  
  return (
    <Datepicker dateRange={dateRange} />
  );
};
`;

const double = `
() => {
  return (
    <Datepicker months={2} />
  );
};
`;

const firstDayOfWeek = `
() => {
  return (
    <Datepicker firstDayOfWeek={1} />
  );
};
`;

const withCustomDateFormat = `
() => {
  return (
    <Datepicker dateFormat="MMM DD, YYYY" />
  );
};
`;

const withCustomPresets = `
() => {
const customPresets = [
  {
    range: 'last2Days',
    label: 'Last 2 days',
    order: 0,
    startDate: moment()
        .subtract(2, 'days')
        .toDate(),
    endDate: moment()
       .subtract(1, 'days')
       .toDate()
  },
  {
    range: 'previous2Months',
    label: 'Previous 2 months',
    order: 1,
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
];

  return (
    <Datepicker customPresets={customPresets} />
  );
}
`;

const DatePickerDoc = () => {
  const title = 'datepicker';
  const description = 'Default date picker';

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
      </Row>

      <Row>
        <Col>
          <SectionTitle>Week starts on Monday</SectionTitle>
        </Col>
      </Row>
      <Row align="stretch">
        <Col>
          <Snippet stretch snippet={firstDayOfWeek} />
        </Col>
      </Row>

      <Row>
        <Col>
          <SectionTitle>Custom date format</SectionTitle>
        </Col>
      </Row>
      <Row align="stretch">
        <Col>
          <Snippet stretch snippet={withCustomDateFormat} />
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
      </Row>
    </Base>
  );
};

export default DatePickerDoc;

const SectionTitle = styled.div`
  ${({ theme }) => theme.text.subHeadline};
`;
