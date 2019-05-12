import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

// icons
import Calendar from '../../icons/Calendar.icon';
import ArrowDown from '../../icons/ArrowDown.icon';

const DatepickerHeader = ({ open, selection, onClick, headerRenderer }) => (
  <Container onClick={onClick}>
    <StyledCalendar />
    {headerRenderer
      ? headerRenderer(selection)
      : `${selection[0] || 'start date'} - ${selection[1] || 'end date'}`}
    <Arrow rotation={open ? '180deg' : '0deg'} />
  </Container>
);

DatepickerHeader.propTypes = {
  onClick: PropTypes.func,
  selection: PropTypes.arrayOf(PropTypes.string),
  open: PropTypes.bool,
  headerRenderer: PropTypes.func
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
