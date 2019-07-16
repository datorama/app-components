import { shape, bool, func, string, arrayOf, number } from 'prop-types';

export const tableOptionsShape = shape({
  rowRenderer: func,
  headerRowRenderer: func,
  emptyRenderer: func,
  stickyHeader: bool,
  tableHeight: string,
  rowClick: func,
  searchable: bool,
  searchByFields: arrayOf(string),
  pagination: bool,
  paginationPageSize: number,
  paginationMax: number
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
