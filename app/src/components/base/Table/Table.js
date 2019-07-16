import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import {
  defaultsDeep,
  debounce,
  filter,
  get,
  includes,
  isEmpty,
  slice
} from 'lodash/fp';

import { tableConfigShape } from './table.types';
import { mapWithKeys } from '../../utils';
import TableSearch from './TableSearch';
import Pagination from '../Pagination';

const INITIAL_PAGE_NUMBER = 1;
const defaultConfig = {
  options: {
    pagination: false,
    paginationPageSize: 3,
    paginationMax: 3,
    stickyHeader: false,
    searchable: false,
    searchByFields: [],
    rowClick: () => {}
  }
};

const Table = ({ config, rowsData = [], className }) => {
  const [filteredRowsData, setFilteredRowsData] = useState(rowsData);
  const [displayedRowsData, setDisplayedRowsData] = useState(rowsData);
  const [currentPage, setCurrentPage] = useState(INITIAL_PAGE_NUMBER);

  const mergedConfig = defaultsDeep(defaultConfig, config);
  const { columnDefs, options } = mergedConfig;
  const {
    stickyHeader,
    tableHeight,
    rowClick,
    headerRowRenderer,
    rowRenderer,
    searchable,
    searchByFields,
    pagination,
    paginationPageSize,
    paginationMax
  } = options;

  useEffect(() => {
    if (!pagination) {
      return;
    }

    const start = (currentPage - 1) * paginationPageSize;
    const end = currentPage * paginationPageSize;

    setDisplayedRowsData(slice(start, end, filteredRowsData));
  }, [currentPage, filteredRowsData, pagination, paginationPageSize]);

  const onSearch = searchTerm => {
    const lowerSearchTerm = searchTerm.toLowerCase();

    const result = filter(row => {
      return searchByFields.some(field => {
        const fieldValue = get(field, row);

        return includes(lowerSearchTerm, String(fieldValue).toLowerCase());
      });
    }, rowsData);

    setCurrentPage(INITIAL_PAGE_NUMBER);
    setFilteredRowsData(result);
  };

  const debouncedOnChange = debounce(500, onSearch);

  return (
    <Container className={`table-component-container ${className}`}>
      {searchable && (
        <TableSearch className="table-search" onChange={debouncedOnChange} />
      )}

      <TableContainer height={tableHeight} className="table-container">
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
          {isEmpty(displayedRowsData) ? (
            <Empty className="table-empty">Oops.. No data to display</Empty>
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
                      return cellRenderer({
                        row,
                        rowIndex,
                        column,
                        columnIndex
                      });
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
            }, displayedRowsData)
          )}
        </TableBody>
      </TableContainer>

      {pagination && (
        <StyledPagination
          total={Math.ceil(filteredRowsData.length / paginationPageSize)}
          max={paginationMax}
          onChange={setCurrentPage}
        />
      )}
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

const TableContainer = styled.div`
  display: flex;
  flex-direction: column;
  ${({ height }) =>
    height &&
    css`
      height: ${height};
      overflow-y: auto;
    `}
`;

export const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex: 1;
  padding: 1em 0;
  box-sizing: border-box;
`;

export const Column = styled.div`
  display: flex;
  padding: 0 1em;
  box-sizing: border-box;

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
  background-color: ${({ theme }) => theme.p0};
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

const StyledPagination = styled(Pagination)`
  margin-top: 15px;
`;

export default Table;
