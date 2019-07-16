import React from 'react';
import PropTypes from 'prop-types';
import { Column, Row } from '../Table.common';
import { columnDefShape } from '../table.types';

const TableHeaderRowRenderer = ({ headerRowRenderer, columnDefs }) => {
  if (headerRowRenderer) {
    return headerRowRenderer(columnDefs);
  }

  return (
    <Row className="table-row table-head-row">
      {columnDefs.map((columnDef, index) => {
        const {
          headerCellRenderer,
          headerValueGetter,
          title,
          justifyContent,
          width
        } = columnDef;

        if (headerCellRenderer) {
          return headerCellRenderer(columnDef, index);
        }

        const content = headerValueGetter
          ? headerValueGetter(columnDef)
          : title;

        return (
          <Column
            key={index}
            justifyContent={justifyContent}
            width={width}
            className="table-column table-head-column"
          >
            {content}
          </Column>
        );
      })}
    </Row>
  );
};

TableHeaderRowRenderer.propTypes = {
  headerRowRenderer: PropTypes.func,
  columnDefs: PropTypes.arrayOf(columnDefShape).isRequired
};

export default TableHeaderRowRenderer;
