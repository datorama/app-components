import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Column, Row } from '../Table.common';
import { columnDefShape } from '../table.types';

const TableBodyRowRenderer = ({
  rowRenderer,
  row,
  rowIndex,
  rowClick,
  columnDefs
}) => {
  const memoizedColumns = useMemo(() => {
    return columnDefs.map((column, columnIndex) => {
      const {
        cellRenderer,
        valueGetter,
        field,
        width,
        justifyContent
      } = column;

      if (cellRenderer) {
        return cellRenderer({
          row,
          rowIndex,
          column,
          columnIndex
        });
      }

      const content = valueGetter ? valueGetter(row, column) : row[field];

      return (
        <Column
          key={`${rowIndex}_${columnIndex}`}
          width={width}
          justifyContent={justifyContent}
          className="table-column table-body-column"
        >
          {content}
        </Column>
      );
    });
  }, [columnDefs, row, rowIndex]);

  if (rowRenderer) {
    return rowRenderer(row, rowIndex, columnDefs);
  }

  return (
    <Row
      key={rowIndex}
      onClick={() => rowClick(row)}
      className="table-row table-body-row"
    >
      {memoizedColumns}
    </Row>
  );
};

TableBodyRowRenderer.propTypes = {
  row: PropTypes.object.isRequired,
  rowIndex: PropTypes.number.isRequired,
  columnDefs: PropTypes.arrayOf(columnDefShape),
  rowClick: PropTypes.func.isRequired,
  rowRenderer: PropTypes.func
};

export default TableBodyRowRenderer;
