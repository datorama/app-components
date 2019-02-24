import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

// components
import Select from '../Select/Select';

const CustomHeader = ({ toggleOpen, placeholder }) => (
  <Header onClick={toggleOpen}>{placeholder}</Header>
);

const DatepickerPresets = () => (
  <Container>
    <Select
      placeholder="Presets"
      options={[
        { value: 'last-month', label: 'Last month' },
        { value: 'last-90-days', label: 'Last 90 days' },
        { value: 'last-quarter', label: 'Last quarter' },
        { value: 'last-year', label: 'Last year' }
      ]}
      values={[]}
      headerRenderer={CustomHeader}
      onChange={() => null}
    />
  </Container>
);

DatepickerPresets.propTypes = {};

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
`;
