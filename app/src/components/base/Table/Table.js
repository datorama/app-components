import React, { useState, useEffect, useRef } from 'react';
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
import { Row, Column } from './Table.common';
import TableSearch from './TableSearch';
import Pagination from '../Pagination';
import TableHeaderRowRenderer from './renderers/TableHeaderRow.renderer';
import TableBodyRowRenderer from './renderers/TableBodyRow.renderer';
import TableEmptyRenderer from './renderers/TableEmpty.renderer';

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
  const tableContainerRef = useRef(null);

  const mergedConfig = defaultsDeep(defaultConfig, config);
  const { columnDefs, options } = mergedConfig;
  const {
    stickyHeader,
    tableHeight,
    rowClick,
    rowRenderer,
    headerRowRenderer,
    emptyRenderer,
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

  useEffect(() => {
    if (tableContainerRef.current) {
      tableContainerRef.current.scrollTop = 0;
    }
  }, [currentPage, displayedRowsData]);

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

      <TableContainer
        ref={tableContainerRef}
        height={tableHeight}
        className="table-container"
      >
        <TableHead sticky={stickyHeader} className="table-head">
          <TableHeaderRowRenderer
            headerRowRenderer={headerRowRenderer}
            columnDefs={columnDefs}
          />
        </TableHead>

        <TableBody className="table-body">
          {isEmpty(displayedRowsData) ? (
            <TableEmptyRenderer emptyRenderer={emptyRenderer} />
          ) : (
            mapWithKeys(
              (row, rowIndex) => (
                <TableBodyRowRenderer
                  key={rowIndex}
                  rowRenderer={rowRenderer}
                  row={row}
                  rowIndex={rowIndex}
                  rowClick={rowClick}
                  columnDefs={columnDefs}
                />
              ),
              displayedRowsData
            )
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

const StyledPagination = styled(Pagination)`
  margin-top: 15px;
`;

export default Table;
