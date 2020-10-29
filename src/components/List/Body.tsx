import React from 'react';
import styled from 'styled-components';
import {
  CellRenderer,
  DataArray,
  HeadersType,
  RowRenderer,
} from './List.types';
import { get } from 'lodash/fp';
import Highlighter from 'react-highlight-words';

// Components
import { Col, Label } from './common';
import { AutoSizer, List, ScrollParams } from 'react-virtualized';
import NoResults from './NoResults';
import ErrorMessage from './ErrorMessage';
import Mock from './Mock';

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
    <Row key={key} style={style}>
      {headers.map((header, i) => (
        <Col
          key={`${header.dataKey}-${i}`}
          width={parentWidth * ratio[i]}
          height={rowHeight}
        >
          {cellRenderer ? (
            cellRenderer({ value: get(header.dataKey, data[index]) })
          ) : (
            <Label>
              <Highlighter
                highlightClassName="list-highlight"
                searchWords={[searchTerm]}
                autoEscape={true}
                textToHighlight={`${get(header.dataKey, data[index])}`}
              />
            </Label>
          )}
        </Col>
      ))}
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
  } = props;
  const rendererExtensions = {
    ratio,
    data,
    headers,
    rowHeight,
    searchTerm,
    cellRenderer,
  };

  if (isError) {
    return <ErrorMessage />;
  }

  if (isLoading) {
    return <Mock rowHeight={rowHeight} />;
  }

  if (searchTerm && !data.length) {
    return <NoResults title="No results found" />;
  }

  if (!searchTerm && !data.length) {
    return <NoResults title="No data" />;
  }

  return (
    <AutoSizer>
      {({ height, width }) => (
        <List
          onScroll={setScroll}
          height={height}
          style={{ outline: 'none' }}
          rowCount={data.length}
          rowHeight={rowHeight}
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
`;
