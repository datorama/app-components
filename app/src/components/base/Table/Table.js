import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import { tableConfigShape } from './table.types';
import { mapWithKeys } from '../../utils';

const Table = ({ config, rowsData, className }) => {
  const { columnDefs } = config;
  return (
    <Container className={`table-container ${className}`}>
      <TableHead className="table-head">
        <Row className="table-row table-head-row">
          {columnDefs.map((columnDef, index) => {
            let content = null;

            if (columnDef.headerCellRenderer) {
              content = columnDef.headerCellRenderer(columnDef);
            } else if (columnDef.headerValueGetter) {
              content = columnDef.headerValueGetter(columnDef);
            } else {
              content = columnDef.title;
            }

            return (
              <Column
                key={index}
                justifyContent={columnDef.justifyContent}
                className="table-column table-head-column"
              >
                {content}
              </Column>
            );
          })}
        </Row>
      </TableHead>

      <TableBody className="table-body">
        {mapWithKeys((row, rowIndex) => {
          return (
            <Row className="table-row table-body-row" key={rowIndex}>
              {columnDefs.map((column, columnIndex) => {
                let content = null;

                if (column.cellRenderer) {
                  content = column.cellRenderer(row);
                } else if (column.valueGetter) {
                  content = column.valueGetter(row, column);
                } else {
                  content = row[column.field];
                }

                return (
                  <Column
                    className="table-column table-body-column"
                    key={`${rowIndex}_${columnIndex}`}
                  >
                    {content}
                  </Column>
                );
              })}
            </Row>
          );
        }, rowsData)}
      </TableBody>
    </Container>
  );
};

Table.propTypes = {
  config: tableConfigShape.isRequired,
  rowsData: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex: 1;
  padding: 1em;
`;

const Column = styled.div`
  display: flex;
  flex: 1;
  ${({ justifyContent }) =>
    justifyContent &&
    css`
      justify-content: ${justifyContent};
    `}
`;

const TableHead = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${({ theme }) => theme.text.pBold};
  border-bottom: 1px solid ${({ theme }) => theme.p100};
`;

const TableBody = styled.div`
  display: flex;
  flex-direction: column;
  ${({ theme }) => theme.text.p};

  ${Row}:nth-child(odd) {
    background: ${({ theme }) => theme.a100};
  }
`;

export default Table;
