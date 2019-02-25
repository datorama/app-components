import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

// assets
import { ReactComponent as Calendar } from '../../assets/calendar.svg';

const DatepickerHeader = ({ selection, onClick }) => (
  <Container onClick={onClick}>
    <StyledCalendar />
    {`${selection[0] || 'start date'} - ${selection[1] || 'end date'}`}
  </Container>
);

DatepickerHeader.propTypes = {
  onClick: PropTypes.func,
  selection: PropTypes.arrayOf(PropTypes.string)
};

export default DatepickerHeader;

const Container = styled.div`
  width: 210px;
  padding: 4px 8px;
  background: ${({ theme }) => theme.p50};
  box-sizing: border-box;
  border-radius: 4px;
  cursor: pointer;
  transition: all 300ms;
  display: flex;
  align-items: center;
  justify-content: center;
  ${({ theme }) => theme.text.p};

  &:hover {
    background: ${({ theme }) => theme.p100};
  }
`;

const StyledCalendar = styled(Calendar)`
  width: 14px;
  height: 14px;
  cursor: pointer;
  margin-right: 10px;
  path {
    fill: ${({ theme }) => theme.p600};
  }
`;
