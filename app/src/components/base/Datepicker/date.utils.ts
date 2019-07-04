import { DateRange, MomentRange } from './Datepicker.types';
import moment from 'moment';

export const convertToMomentRange = (dateRange: DateRange): MomentRange => ({
  startDate: moment(dateRange.startDate),
  endDate: moment(dateRange.endDate)
});

export const convertToDateRange = (momentRange: MomentRange): DateRange => ({
  startDate: momentRange.startDate.toDate(),
  endDate: momentRange.endDate.toDate()
});
