import React, { useCallback } from 'react';
import styled from 'styled-components';
import {
  CellRenderer,
  DataArray,
  EmptyStateRenderer,
  ErrorStateRenderer,
  HeadersType,
  RowRenderer,
} from './Grid.types';
import { get, has } from 'lodash/fp';
import Highlighter from 'react-highlight-words';

// Components
import { Col, Label } from './common';
import { AutoSizer, List, ScrollParams } from 'react-virtualized';
import NoResults from './NoResults';
import ErrorMessage from './ErrorMessage';
import Mock from './Mock';
import { Spinner } from '../Spinner';

export interface RowRendererProps {
  key: string;
  index: number;
  style: React.CSSProperties;
  parentWidth: number;
  ratio: number[];
  data: DataArray;
  headers: HeadersType;
  rowHeight: number;
  searchTerm: string;
  cellRenderer?: CellRenderer;
}

const rowRenderer = (props: RowRendererProps) => {
  const {
    key,
    index,
    style,
    parentWidth,
    ratio,
    data,
    headers,
    rowHeight,
    searchTerm,
    cellRenderer,
  } = props;

  return (
    <Row key={key} style={style} className="grid-row">
      {headers.map((header, i) => {
        const width = has('width', header)
          ? header.width
          : parentWidth * ratio[i];

        return (
          <Col
            key={`${header.dataKey}-${i}`}
            width={width}
            height={rowHeight}
            className="grid-col"
          >
            {cellRenderer ? (
              cellRenderer({
                rowIndex: index,
                key: header.dataKey,
                value: get(header.dataKey, data[index]),
              })
            ) : (
              <Label className="label">
                <Highlighter
                  highlightClassName="grid-highlight"
                  searchWords={[searchTerm]}
                  autoEscape={true}
                  textToHighlight={`${get(header.dataKey, data[index])}`}
                />
              </Label>
            )}
          </Col>
        );
      })}
    </Row>
  );
};

interface TableBodyProps {
  data: DataArray;
  ratio: number[];
  setScroll: (scrollData: ScrollParams) => void;
  headers: HeadersType;
  rowHeight: number;
  searchTerm: string;
  isError?: boolean;
  isLoading?: boolean;
  rowRenderer?: RowRenderer;
  cellRenderer?: CellRenderer;
  emptyStateRenderer?: EmptyStateRenderer;
  errorStateRenderer?: ErrorStateRenderer;
  onReachedEnd?: () => void;
  isBottomLoaderActive?: boolean;
}

const Body = (props: TableBodyProps) => {
  const {
    data,
    setScroll,
    ratio,
    headers,
    rowHeight,
    searchTerm,
    isError,
    isLoading,
    cellRenderer,
    emptyStateRenderer,
    errorStateRenderer,
    onReachedEnd,
    isBottomLoaderActive,
  } = props;
  const rendererExtensions = {
    ratio,
    data,
    headers,
    rowHeight,
    searchTerm,
    cellRenderer,
  };

  const handleOnRowsRendered = useCallback(
    (e) => {
      if (e.stopIndex === data.length - 1 && onReachedEnd) {
        onReachedEnd();
      }
    },
    [data, onReachedEnd]
  );

  if (isError) {
    if (errorStateRenderer) {
      return errorStateRenderer();
    }
    return <ErrorMessage />;
  }

  if (isLoading) {
    return <Mock rowHeight={rowHeight} />;
  }

  if (searchTerm && !data.length) {
    if (emptyStateRenderer) {
      return emptyStateRenderer({ type: 'NO_RESULTS' });
    }
    return <NoResults title="No results found" />;
  }

  if (!searchTerm && !data.length) {
    if (emptyStateRenderer) {
      return emptyStateRenderer({ type: 'NO_DATA' });
    }
    return <NoResults title="No data" />;
  }

  return (
    <AutoSizer>
      {({ height, width }) => (
        <>
          <List
            onScroll={setScroll}
            height={isBottomLoaderActive ? height - rowHeight : height}
            style={{ outline: 'none' }}
            rowCount={data.length}
            rowHeight={rowHeight}
            onRowsRendered={handleOnRowsRendered}
            rowRenderer={(headerProps) => {
              const params = {
                ...headerProps,
                parentWidth: width,
                ...rendererExtensions,
              };

              if (props.rowRenderer) {
                return props.rowRenderer(params);
              }

              return rowRenderer(params);
            }}
            width={width}
          />
          {isBottomLoaderActive ? (
            <BottomSpinner height={rowHeight} width={width}>
              <Spinner />
            </BottomSpinner>
          ) : null}
        </>
      )}
    </AutoSizer>
  );
};

export default Body;

const Row = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
  border-bottom: 1px solid ${({ theme }) => theme.p100};

  &:hover {
    background: ${({ theme }) => theme.p50};
  }
`;

const BottomSpinner = styled.div<{ width: number; height: number }>`
  width: ${({ width }) => `${width}px`};
  height: ${({ height }) => `${height}px`};
  display: flex;
  align-items: center;
  justify-content: center;
`;
