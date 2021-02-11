import React, { useState, useCallback, useEffect, useRef } from 'react';
import styled from 'styled-components';
import 'react-virtualized/styles.css';
import * as JsSearch from 'js-search';
import { get, orderBy, isBoolean, unset } from 'lodash/fp';

import {
  DataArray,
  HeadersType,
  SortDataType,
  FooterRenderer,
  ActionsRenderer,
  RowRenderer,
  CellRenderer,
  HeaderCellRenderer,
  EmptyStateRenderer,
  ErrorStateRenderer,
  SortParams,
} from './Grid.types';

import { useElementDimensions } from '../../hooks/next.common.hooks';

// Components
import Actions from './Actions';
import Footer from './Footer';
import Body from './Body';
import TableHeader from './Header/Header';

export interface Props {
  className?: string;
  data: DataArray;
  headers: HeadersType;
  rowHeight?: number;
  isError?: boolean;
  isLoading?: boolean;
  footerRenderer?: FooterRenderer;
  actionsRenderer?: ActionsRenderer;
  rowRenderer?: RowRenderer;
  cellRenderer?: CellRenderer;
  headerCellRenderer?: HeaderCellRenderer;
  isActionsActive?: boolean;
  isFooterActive?: boolean;
  emptyStateRenderer?: EmptyStateRenderer;
  errorStateRenderer?: ErrorStateRenderer;
  onReachedEnd?: () => void;
  isBottomLoaderActive?: boolean;
  onSort?: (params: SortParams) => void;
  isResizable?: boolean;
  extendedSearchHeaders?: string[];
  onRowClick?: ({ index: number }) => void;
  onColumnsResize?: (HeadersType) => void;
}

const createNewSearch = () => {
  const searchInstance = new JsSearch.Search('rowIndex');

  searchInstance.tokenizer = {
    tokenize: (text) => text.split(' ').filter((term) => term),
  };
  searchInstance.indexStrategy = new JsSearch.AllSubstringsIndexStrategy();

  return searchInstance;
};

let search = createNewSearch();

const getInitialColWidthRatio = (
  headers: HeadersType,
  containerWidth: number
) => {
  const { numCellsWithPresetWidth, sumOfPresetWidths } = headers.reduce(
    (
      acc: { numCellsWithPresetWidth: number; sumOfPresetWidths: number },
      header
    ) => {
      if (header.width) {
        acc.numCellsWithPresetWidth++;
        acc.sumOfPresetWidths += header.width;
      }
      return acc;
    },
    { numCellsWithPresetWidth: 0, sumOfPresetWidths: 0 }
  );

  const numCellsWithoutPresetWidth = headers.length - numCellsWithPresetWidth;

  return headers.map(({ width }) => {
    if (width) {
      return width / containerWidth;
    } else {
      return (
        (containerWidth - sumOfPresetWidths) /
        numCellsWithoutPresetWidth /
        containerWidth
      );
    }
  });
};

export const Grid = (props: Props) => {
  const {
    data,
    headers,
    rowHeight,
    isError,
    isLoading,
    footerRenderer,
    actionsRenderer,
    rowRenderer,
    cellRenderer,
    headerCellRenderer,
    isActionsActive,
    isFooterActive,
    emptyStateRenderer,
    errorStateRenderer,
    onReachedEnd,
    isBottomLoaderActive,
    onSort,
    isResizable,
    extendedSearchHeaders,
    onRowClick,
    onColumnsResize,
  } = props;
  const [scroll, setScroll] = useState({ scrollTop: 0 });
  const [sortData, setSortData] = useState<SortDataType>({});
  const [localData, setLocalData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [ratio, setRatio] = useState([]);
  const [deltas, setDeltas] = useState([]); // change while dragging. in percent

  const gridContainerRef = useRef<HTMLDivElement>(null);

  const { width: gridContainerWidth } = useElementDimensions(gridContainerRef);

  useEffect(() => {
    search = createNewSearch();
  }, [headers, data]);

  useEffect(() => {
    // set search indexes
    if (isActionsActive) {
      const searchHeaders = [
        ...headers,
        ...(extendedSearchHeaders?.map((searchHeader) => ({
          dataKey: searchHeader,
        })) || []),
      ];

      for (let i = 0; i < searchHeaders.length; i++) {
        search.addIndex(get('dataKey', searchHeaders[i]));
      }
    }

    setDeltas(headers.map(() => 0));
    setRatio(getInitialColWidthRatio(headers, gridContainerWidth));
  }, [headers, search, isActionsActive, gridContainerWidth]);

  useEffect(() => {
    const extended = data.map((obj, rowIndex) => ({ ...obj, rowIndex }));

    // set search documents
    if (isActionsActive) {
      search.addDocuments(extended);
    }
    setLocalData(extended);
  }, [data]);

  useEffect(() => {
    let result = localData;

    // filter search results
    if (searchTerm && isActionsActive) {
      result = search.search(searchTerm);
    }

    // apply sort
    const sortKeys = [];
    const sortOrder = [];

    for (let i = 0; i < headers.length; i++) {
      const sortValue = sortData[headers[i].dataKey];

      if (isBoolean(sortValue)) {
        sortKeys.push(headers[i].dataKey);
        sortOrder.push(sortValue ? 'asc' : 'desc');
      }
    }

    if (onSort) {
      onSort(sortKeys.map((key, j) => ({ [key]: sortOrder[j] })));
    }

    if (!onSort) {
      result = orderBy(sortKeys, sortOrder, result);
    }

    setFilteredData(result);
  }, [localData, searchTerm, sortData, search, isActionsActive, onSort]);

  const handleSortClick = useCallback((dataKey) => {
    setSortData((prevSortData) => {
      const newSortData = { ...prevSortData };

      if (isBoolean(prevSortData[dataKey]) && !prevSortData[dataKey]) {
        return unset([dataKey], newSortData);
      }

      return {
        ...newSortData,
        [dataKey]: !prevSortData[dataKey],
      };
    });
  }, []);

  const handleDrag = useCallback((e, i, oldRatio, parentWidth) => {
    const leftLimit = -parentWidth * oldRatio[i] + 40;
    const rightLimit = parentWidth * oldRatio[i + 1] - 40;
    const x =
      Math.min(rightLimit, Math.max(leftLimit, e.translation.x)) / parentWidth;

    setDeltas((prev) => {
      const arr = [...prev];

      arr[i] = x;
      arr[i + 1] = -x;

      return arr;
    });
  }, []);

  const headersRef = useRef(headers);

  useEffect(() => {
    headersRef.current = headers;
  }, [headers]);

  const handleDragEnd = useCallback(
    (e, i, parentWidth) => {
      setRatio((prev) => {
        const leftLimit = -parentWidth * prev[i] + 40;
        const rightLimit = parentWidth * prev[i + 1] - 40;
        const x =
          Math.min(rightLimit, Math.max(leftLimit, e.translation.x)) /
          parentWidth;

        const arr = [...prev];

        arr[i] += x;
        arr[i + 1] -= x;

        if (onColumnsResize) {
          onColumnsResize(
            headersRef.current.map((header, index) => ({
              ...header,
              width: arr[index] * parentWidth,
            }))
          );
        }

        return arr;
      });

      setDeltas(headers.map(() => 0));
    },
    [headers]
  );

  return (
    <Container className={props.className} ref={gridContainerRef}>
      {isActionsActive ? (
        <>
          {actionsRenderer ? (
            actionsRenderer({ onSearchChange: setSearchTerm })
          ) : (
            <Actions onSearchChange={setSearchTerm} />
          )}
        </>
      ) : null}
      <TableHeader
        scrollTop={scroll.scrollTop}
        headers={headers}
        rowHeight={rowHeight}
        onSortClick={handleSortClick}
        sortData={sortData}
        headerCellRenderer={headerCellRenderer}
        ratio={ratio}
        deltas={deltas}
        handleDrag={handleDrag}
        handleDragEnd={handleDragEnd}
        isResizable={isResizable}
      />
      <TableContainer className="grid-container">
        <Body
          data={filteredData}
          headers={headers}
          setScroll={setScroll}
          ratio={ratio.map((rat, i) => rat + deltas[i])}
          rowHeight={rowHeight}
          searchTerm={searchTerm}
          isError={isError}
          isLoading={isLoading}
          emptyStateRenderer={emptyStateRenderer}
          errorStateRenderer={errorStateRenderer}
          rowRenderer={rowRenderer}
          cellRenderer={cellRenderer}
          onReachedEnd={onReachedEnd}
          isBottomLoaderActive={isBottomLoaderActive}
          onRowClick={onRowClick}
        />
      </TableContainer>
      {isFooterActive ? (
        <>
          {footerRenderer ? (
            footerRenderer({ total: data.length })
          ) : (
            <Footer data={filteredData} />
          )}
        </>
      ) : null}
    </Container>
  );
};

Grid.defaultProps = {
  rowHeight: 50,
  isSortable: true,
  data: [],
  headers: [],
  isActionsActive: true,
  isFooterActive: true,
  isResizable: true,
};

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const TableContainer = styled.div`
  width: 100%;
  height: 400px;

  .grid-highlight {
    background: ${({ theme }) => theme.a200};
  }
`;
