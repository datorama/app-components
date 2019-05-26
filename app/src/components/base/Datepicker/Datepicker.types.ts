import { Moment } from 'moment';

export type MomentRange = {
  startDate: Moment;
  endDate: Moment;
};

export type DateRange = {
  startDate?: Date;
  endDate?: Date;
};

export type Preset = Array<{
  value: string;
  label: string;
  selection: MomentRange;
}>;
