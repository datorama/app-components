import React from 'react';
import styled from 'styled-components';

// Components
import { AutoSizer, List } from 'react-virtualized';
import HeaderCol from './HeaderCol';
import { HeaderCellRenderer, HeadersType, SortDataType } from '../List.types';

interface HeaderRendererProps {
  headers: HeadersType;
  key: string;
  index: number;
  style: React.CSSProperties;
  parentWidth: number;
  rowHeight: number;
  onSortClick: (key: string) => void;
  sortData: SortDataType;
  headerCellRenderer?: HeaderCellRenderer;
  ratio: number[];
  deltas: number[];
  handleDrag: (e, i: number, ratio: number[], parentWidth: number) => void;
  handleDragEnd: (e, i: number, parentWidth: number) => void;
}

function headerRenderer(props: HeaderRendererProps) {
  const {
    key,
    style,
    parentWidth,
    headers,
    rowHeight,
    onSortClick,
    sortData,
    headerCellRenderer,
    ratio,
    handleDrag,
    handleDragEnd,
    deltas,
  } = props;

  return (
    <HeaderContainer
      key={key}
      style={style}
      height={rowHeight}
      className="list-header-row"
    >
      {headers.map((header, i) => (
        <HeaderCol
          key={header.dataKey}
          index={i}
          parentWidth={parentWidth}
          ratio={ratio}
          label={header.label}
          isSortable={header.isSortable}
          isResizeable={i !== headers.length - 1}
          rowHeight={rowHeight}
          dataKey={header.dataKey}
          onSortClick={onSortClick}
          sortAscending={sortData[header.dataKey]}
          headerCellRenderer={headerCellRenderer}
          onDrag={handleDrag}
          onDragEnd={handleDragEnd}
          width={parentWidth * (ratio[i] + deltas[i])}
        />
      ))}
    </HeaderContainer>
  );
}

interface TableHeaderProps {
  scrollTop: number;
  headers: HeadersType;
  rowHeight: number;
  onSortClick: (key: string) => void;
  sortData: SortDataType;
  headerCellRenderer?: HeaderCellRenderer;
  ratio: number[];
  deltas: number[];
  handleDrag: (e, i: number, ratio: number[], parentWidth: number) => void;
  handleDragEnd: (e, i: number, parentWidth: number) => void;
}

const Header = (props: TableHeaderProps) => {
  const {
    scrollTop,
    headers,
    rowHeight,
    onSortClick,
    sortData,
    headerCellRenderer,
    ratio,
    handleDrag,
    handleDragEnd,
    deltas,
  } = props;

  const rendererExtensions = {
    headers,
    rowHeight,
    onSortClick,
    headerCellRenderer,
    sortData,
    ratio,
    handleDrag,
    handleDragEnd,
    deltas,
  };

  return (
    <Container isActive={scrollTop > 0} height={rowHeight}>
      <AutoSizer>
        {({ width }) => (
          <List
            style={{ outline: 'none' }}
            height={rowHeight}
            rowCount={1}
            rowHeight={rowHeight}
            rowRenderer={(headerProps) =>
              headerRenderer({
                ...headerProps,
                parentWidth: width,
                ...rendererExtensions,
              })
            }
            width={width}
          />
        )}
      </AutoSizer>
    </Container>
  );
};

export default Header;

const Container = styled.div<{ isActive: boolean; height: number }>`
  width: 100%;
  height: ${({ height }) => `${height}px`};
  border-bottom: 1px solid ${({ theme }) => theme.p200};
  transition: all 300ms;

  ${({ isActive }) =>
    isActive &&
    `
    box-shadow:
      0 1.3px 1.2px -5px rgba(0, 0, 0, 0.024),
      0 3.6px 3.3px -5px rgba(0, 0, 0, 0.035),
      0 8.7px 7.8px -5px rgba(0, 0, 0, 0.046),
      0 29px 26px -5px rgba(0, 0, 0, 0.07);
  `};
`;

const HeaderContainer = styled.div<{ height: number }>`
  height: ${({ height }) => `${height}px`};
  display: flex;
  user-select: none;
`;
