import React from 'react';
import styled from 'styled-components';

// components
import Base from './Base';
import { Row, Col, Datepicker, hexToRgba } from '../components/index';
import Snippet from './Snippet';
import moment from 'moment';

const snippet = `
import { Datepicker } from '@datorama/app-components';

const MyComponent = ({ onChange }) => (
  <Datepicker onChange={onChange} />
);
`;

const double = `
import { Datepicker } from '@datorama/app-components';

const MyComponent = ({ onChange }) => (
  <Datepicker onChange={onChange} months={2} />
);
`;

const multi = `
import { Datepicker } from '@datorama/app-components';

const MyComponent = ({ onChange }) => (
  <Datepicker onChange={onChange} months={3} />
);
`;

const withCustomDateFormat = `
import { Datepicker } from '@datorama/app-components';

const MyComponent = ({ onChange }) => (
  <Datepicker
    onChange={onChange}
    months={1}
    dateFormat="DD/MM/YYYY"
  />
);
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
        <Col>
          <Box>
            <StyledDatepicker
              months={1}
              dateFormat={'DD/MM/YYYY'}
              initialSelection={{
                startDate: moment().toDate(),
                endDate: moment()
                  .add(1, 'week')
                  .toDate()
              }}
            />
          </Box>
        </Col>
      </Row>

      {/*<Row>*/}
      {/*  <Col>*/}
      {/*    <SectionTitle>2 months</SectionTitle>*/}
      {/*  </Col>*/}
      {/*</Row>*/}
      {/*<Row align="stretch">*/}
      {/*  <Col>*/}
      {/*    <Snippet snippet={double} />*/}
      {/*  </Col>*/}
      {/*  <Col>*/}
      {/*    <Box>*/}
      {/*      <StyledDatepicker months={2} />*/}
      {/*    </Box>*/}
      {/*  </Col>*/}
      {/*</Row>*/}

      {/*<Row>*/}
      {/*  <Col>*/}
      {/*    <SectionTitle>3 months</SectionTitle>*/}
      {/*  </Col>*/}
      {/*</Row>*/}
      {/*<Row align="stretch">*/}
      {/*  <Col>*/}
      {/*    <Snippet snippet={multi} />*/}
      {/*  </Col>*/}
      {/*  <Col>*/}
      {/*    <Box>*/}
      {/*      <StyledDatepicker months={3} />*/}
      {/*    </Box>*/}
      {/*  </Col>*/}
      {/*</Row>*/}

      {/*<Row>*/}
      {/*  <Col>*/}
      {/*    <SectionTitle>Custom date format</SectionTitle>*/}
      {/*  </Col>*/}
      {/*</Row>*/}
      {/*<Row align="stretch">*/}
      {/*  <Col>*/}
      {/*    <Snippet snippet={withCustomDateFormat} />*/}
      {/*  </Col>*/}
      {/*  <Col>*/}
      {/*    <Box>*/}
      {/*      <StyledDatepicker months={1} dateFormat="DD/MM/YYYY" />*/}
      {/*    </Box>*/}
      {/*  </Col>*/}
      {/*</Row>*/}
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
