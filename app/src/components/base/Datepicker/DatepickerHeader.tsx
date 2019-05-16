import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

// icons
import Calendar from '../../icons/Calendar.icon';
import ArrowDown from '../../icons/ArrowDown.icon';
import moment from 'moment';
import { Selection } from './Datepicker.types';

type Props = {
  open: boolean;
  selection: Selection;
  onClick: () => void;
  dateFormat: string;
};

const DatepickerHeader: FunctionComponent<Props> = ({
  open,
  selection,
  onClick,
  dateFormat
}) => {
  let [startDate, endDate] = selection;

  startDate = startDate
    ? moment(selection[0]).format(dateFormat)
    : 'start date';
  endDate = endDate ? moment(selection[1]).format(dateFormat) : 'end date';

  return (
    <Container onClick={onClick}>
      <StyledCalendar />
      {`${startDate} - ${endDate}`}
      <Arrow rotation={open ? '180deg' : '0deg'} />
    </Container>
  );
};

DatepickerHeader.propTypes = {
  onClick: PropTypes.func.isRequired,
  selection: PropTypes.any.isRequired,
  open: PropTypes.bool.isRequired,
  dateFormat: PropTypes.string.isRequired
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

export const Arrow = styled(ArrowDown)<{ rotation: string }>`
  width: 8px;
  height: 8px;
  transform: rotate(${({ rotation }) => rotation});
  transition: all 300ms;
  margin-left: 10px;

  * {
    fill: ${({ theme }) => theme.p600};
  }
`;
