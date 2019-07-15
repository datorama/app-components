import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { merge, debounce, filter, get, includes, isEmpty } from 'lodash/fp';

import { tableConfigShape } from './table.types';
import { mapWithKeys } from '../../utils';
import TableSearch from './TableSearch';

const defaultConfig = {
  options: {
    stickyHeader: false,
    searchable: false,
    searchByFields: [],
    rowClick: () => {}
  }
};

// TODO: loading, cache conditions
const Table = ({ config, rowsData = [], className }) => {
  const [filteredRowsData, setFilteredRowsData] = useState(rowsData);

  const mergedConfig = merge(defaultConfig, config);
  const { columnDefs, options } = mergedConfig;
  const {
    stickyHeader,
    rowClick,
    headerRowRenderer,
    rowRenderer,
    searchable,
    searchByFields
  } = options;

  const onSearch = searchTerm => {
    const lowerSearchTerm = searchTerm.toLowerCase();

    const result = filter(row => {
      return searchByFields.some(field => {
        const fieldValue = get(field, row);

        return includes(lowerSearchTerm, String(fieldValue).toLowerCase());
      });
    }, rowsData);

    setFilteredRowsData(result);
  };

  const debouncedOnChange = debounce(500, onSearch);

  return (
    <Container className={`table-container ${className}`}>
      {searchable && <TableSearch onChange={debouncedOnChange} />}

      <TableHead sticky={stickyHeader} className="table-head">
        {headerRowRenderer ? (
          headerRowRenderer(columnDefs)
        ) : (
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
        )}
      </TableHead>

      <TableBody className="table-body">
        {isEmpty(filteredRowsData) ? (
          <Empty>Oops.. No data to display</Empty>
        ) : (
          mapWithKeys((row, rowIndex) => {
            if (rowRenderer) {
              return rowRenderer(row, rowIndex);
            }

            return (
              <Row
                key={rowIndex}
                onClick={() => rowClick(row)}
                className="table-row table-body-row"
              >
                {columnDefs.map((column, columnIndex) => {
                  const {
                    cellRenderer,
                    valueGetter,
                    field,
                    width,
                    justifyContent
                  } = column;

                  if (cellRenderer) {
                    return cellRenderer({ row, rowIndex, column, columnIndex });
                  }

                  const content = valueGetter
                    ? valueGetter(row, column)
                    : row[field];

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
                })}
              </Row>
            );
          }, filteredRowsData)
        )}
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

export const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex: 1;
  padding: 1em 0;
`;

export const Column = styled.div`
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
  
  ${({ sticky }) =>
    sticky &&
    css`
      position: sticky;
      top: 0;
    `};
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

const Empty = styled.div`
  padding: 2em 0;
  text-align: center;
  ${({ theme }) => theme.text.subHeadline}
`;

export default Table;
