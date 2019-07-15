import { shape, bool, func, string, arrayOf } from 'prop-types';

export const tableOptionsShape = shape({
  rowRenderer: func,
  headerRowRenderer: func,
  stickyHeader: bool,
  rowClick: func,
  searchable: bool,
  searchByFields: arrayOf(string)
});

export const columnDefShape = shape({
  title: string.isRequired,
  field: string.isRequired,
  width: string,
  justifyContent: string,
  cellRenderer: func,
  headerCellRenderer: func,
  valueGetter: func,
  headerValueGetter: func
});

export const tableConfigShape = shape({
  options: tableOptionsShape,
  columnDefs: arrayOf(columnDefShape)
});
