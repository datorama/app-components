import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

// assets
import { ReactComponent as Calendar } from '../../assets/calendar.svg';
import { ReactComponent as ArrowDown } from '../../assets/arrow-down.svg';

const DatepickerHeader = ({ open, selection, onClick }) => (
  <Container onClick={onClick}>
    <StyledCalendar />
    {`${selection[0] || 'start date'} - ${selection[1] || 'end date'}`}
    <Arrow rotation={open ? '180deg' : '0deg'} />
  </Container>
);

DatepickerHeader.propTypes = {
  onClick: PropTypes.func,
  selection: PropTypes.arrayOf(PropTypes.string),
  open: PropTypes.bool
};

export default DatepickerHeader;

const Container = styled.div`
  min-width: 210px;
  padding: 4px 8px;
  box-sizing: border-box;
  border-radius: 4px;
  cursor: pointer;
  transition: all 300ms;
  display: flex;
  align-items: center;
  justify-content: center;
  ${({ theme }) => theme.text.p};
  line-height: 14px;
  font-weight: 600;

  &:hover {
    background: ${({ theme }) => theme.p50};
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
