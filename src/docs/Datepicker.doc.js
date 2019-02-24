import React from 'react';
import styled from 'styled-components';
import Datepicker from '../components/base/Datepicker/Datepicker';
import Highlight from 'react-highlight-js';

// components
import Base from './Base';
import { Row, Col } from '../components/layout';
import { hexToRgba } from '../components/utils';

const snippet = `
import { Datepickewr } from 'app-components';

const MyComponent = ({ onChange }) => (
  <Datepicker onChange={onChange} />
);
`;

const DatePickerDoc = () => {
  const title = 'datepicker';
  const description = 'Default date picker';

  return (
    <Base title={title} description={description} name="Datepicker">
      <Row align="stretch">
        <Col>
          <Highlight language="javascript">{snippet}</Highlight>
        </Col>
        <Col>
          <Box>
            <StyledDatepicker />
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
