import moment from 'moment';
import { flow, groupBy, toPairs, map, reduce, sortBy } from 'lodash/fp';

export const convertToMomentRange = dateRange => ({
  startDate: moment(dateRange.startDate),
  endDate: moment(dateRange.endDate)
});

export const convertToDateRange = momentRange => ({
  startDate: momentRange.startDate.toDate(),
  endDate: momentRange.endDate.toDate()
});

const mapPresetOptions = options =>
  flow([
    sortBy('order'),
    map(({ range, label, startDate, endDate }) => ({
      value: range,
      label,
      dateRange: convertToMomentRange({ startDate, endDate })
    }))
  ])(options);

export const transformCustomPresets = customPresets => {
  const res = flow([
    groupBy('group'),
    toPairs,
    reduce((acc, [group, options]) => {
      if (group === 'undefined') {
        return [...acc, ...mapPresetOptions(options)];
      }
      return [...acc, { label: group, options: mapPresetOptions(options) }];
    }, [])
  ])(customPresets);
  return res;
};
