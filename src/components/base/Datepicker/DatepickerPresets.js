import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import moment from 'moment';

// components
import Select from '../Select/Select';

const today = moment();
const CustomHeader = ({ toggleOpen, placeholder }) => (
  <Header onClick={toggleOpen}>{placeholder}</Header>
);

const DatepickerPresets = ({ onChange }) => (
  <Container>
    <Select
      placeholder="Presets"
      options={[
        {
          value: 'last-week',
          label: 'Last week',
          selection: [
            today
              .clone()
              .subtract(7, 'days')
              .format('YYYY-MM-DD'),
            today.format('YYYY-MM-DD')
          ]
        },
        { value: 'last-month', label: 'Last month', selection: [] },
        { value: 'last-quarter', label: 'Last quarter', selection: [] },
        { value: 'last-year', label: 'Last year', selection: [] },
        { value: 'last-3-years', label: 'Last 3 years', selection: [] }
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
