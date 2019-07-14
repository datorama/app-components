import { shape, bool, func, string, arrayOf } from 'prop-types';

export const tableOptionsShape = shape({
  stickyHeader: bool,
  rowClick: func
  // rowKeyField: string
});

export const columnDefShape = shape({
  title: string,
  field: string,
  width: string,
  cellRenderer: func,
  headerCellRenderer: func,
  valueGetter: func,
  headerValueGetter: func
});

export const tableConfigShape = shape({
  options: tableOptionsShape,
  columnDefs: arrayOf(columnDefShape)
});
