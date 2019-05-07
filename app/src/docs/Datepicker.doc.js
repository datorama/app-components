import React from 'react';
import styled from 'styled-components';
import moment from 'moment';

// components
import Base from './Base';
import { Row, Col, Datepicker, hexToRgba } from '../components/index';
import Snippet from './Snippet';

const snippet = `
import { Datepicker } from 'app-components';

const MyComponent = ({ onChange }) => (
  <Datepicker onChange={onChange} />
);
`;

const double = `
import { Datepicker } from 'app-components';

const MyComponent = ({ onChange }) => (
  <Datepicker onChange={onChange} months={2} />
);
`;

const multi = `
import { Datepicker } from 'app-components';

const MyComponent = ({ onChange }) => (
  <Datepicker onChange={onChange} months={3} />
);
`;

const withHeaderRenderer = `
import { Datepicker } from 'app-components';

const MyComponent = ({ onChange }) => (
  <Datepicker onChange={onChange} months={1} headerRenderer={selection => {
  	let [startDate, endDate] = selection;
  	startDate = startDate ? moment(startDate).format('DD/MM/YYYY') : 'Start Date';
  	endDate = endDate ? moment(endDate).format('DD/MM/YYYY') : 'End Date';
  	
  	return <div>{startDate} - {endDate}</div>;
  }} />
);
`;

const DatePickerDoc = () => {
  const title = 'datepicker';
  const description = 'Default date picker';

  return (
    <Base title={title} description={description} name="Datepicker">
      <Row align="stretch">
        <Col>
          <Snippet snippet={snippet} />
        </Col>
        <Col>
          <Box>
            <StyledDatepicker months={1} />
          </Box>
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

      <Row align="stretch">
        <Col>
          <Snippet snippet={multi} />
        </Col>
        <Col>
          <Box>
            <StyledDatepicker months={3} />
          </Box>
        </Col>
      </Row>

      <Row align="stretch">
        <Col>
          <Snippet snippet={withHeaderRenderer} />
        </Col>
        <Col>
          <Box>
            <StyledDatepicker
              months={1}
              headerRenderer={selection => {
                let [startDate, endDate] = selection;
                startDate = startDate
                  ? moment(startDate).format('DD/MM/YYYY')
                  : 'Start Date';
                endDate = endDate
                  ? moment(endDate).format('DD/MM/YYYY')
                  : 'End Date';

                return (
                  <div>
                    {startDate} - {endDate}
                  </div>
                );
              }}
            />
          </Box>
        </Col>
      </Row>
    </Base>
  );
};

export default DatePickerDoc;

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
