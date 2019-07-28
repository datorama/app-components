import moment from 'moment';

export const convertToMomentRange = dateRange => ({
  startDate: moment(dateRange.startDate),
  endDate: moment(dateRange.endDate)
});

export const convertToDateRange = momentRange => ({
  startDate: momentRange.startDate.toDate(),
  endDate: momentRange.endDate.toDate()
});
