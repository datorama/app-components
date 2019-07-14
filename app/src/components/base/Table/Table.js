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
                width={columnDef.width}
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
                    key={`${rowIndex}_${columnIndex}`}
                    width={column.width}
                    justifyContent={column.justifyContent}
                    className="table-column table-body-column"
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
  padding: 1em 0;
`;

const Column = styled.div`
  display: flex;
  padding: 0 1em;
  ${({ justifyContent }) =>
    justifyContent &&
    css`
      justify-content: ${justifyContent};
    `}

  ${({ width }) => {
    if (width) {
      return css`
        width: ${width};
      `;
    }
    return css`
      flex: 1;
    `;
  }}
`;

const TableHead = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${({ theme }) => theme.text.pNote};
  font-weight: 600;
  border-bottom: 1px solid ${({ theme }) => theme.p100};
  
  ${Column} + ${Column} {
    border-left: 1px solid;
  }
`;

const TableBody = styled.div`
  display: flex;
  flex-direction: column;
  ${({ theme }) => theme.text.p};

  ${Row} {
    &:nth-child(odd) {
      background-color: ${({ theme }) => theme.p50};
    }
    &:hover {
      background-color: ${({ theme }) => theme.a300};
    }
  }
`;

export default Table;
