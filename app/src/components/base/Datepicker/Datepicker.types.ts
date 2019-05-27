import { Moment } from 'moment';

export type MomentRange = {
  startDate: Moment;
  endDate: Moment;
};

export type DateRange = {
  startDate?: Date;
  endDate?: Date;
};

export type Preset = {
  value: string | number;
  label: string;
  selection: MomentRange;
};

export type PresetsMap = {
  thisWeek: MomentRange;
  thisMonth: MomentRange;
  thisQuarter: MomentRange;
  thisYear: MomentRange;
  last7days: MomentRange;
  last14days: MomentRange;
  last30days: MomentRange;
  last90days: MomentRange;
  yesterday: MomentRange;
  weekToDate: MomentRange;
  monthToDate: MomentRange;
  quarterToDate: MomentRange;
  yearToDate: MomentRange;
  prevWeek: MomentRange;
  prevMonth: MomentRange;
  prevYear: MomentRange;
  prevQuarter: MomentRange;
};