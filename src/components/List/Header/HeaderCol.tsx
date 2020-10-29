import React, { useCallback } from 'react';
import styled from 'styled-components';
import { isBoolean } from 'lodash/fp';
import { HeaderCellRenderer } from '../List.types';

// Components
import { Col, Label } from '../common';
import Draggable, { DragParams } from './Draggable';

// Assets
import TableArrow from '../../../assets/TableArrow.icon';

interface Props {
  parentWidth: number;
  ratio: number[];
  index: number;
  label: string;
  isSortable?: boolean;
  isResizeable: boolean;
  rowHeight: number;
  dataKey: string;
  onSortClick: (key: string) => void;
  sortAscending: boolean | undefined;
  headerCellRenderer?: HeaderCellRenderer;
  onDrag: (
    e: DragParams,
    index: number,
    ratio: number[],
    parentWidth: number
  ) => void;
  onDragEnd: (e: DragParams, index: number, parentWidth: number) => void;
  width: number;
}

const HeaderCol = (props: Props) => {
  const {
    parentWidth,
    ratio,
    index,
    label,
    isResizeable,
    rowHeight,
    isSortable,
    onSortClick,
    dataKey,
    sortAscending,
    headerCellRenderer,
    onDrag,
    onDragEnd,
    width,
  } = props;

  const handleSortClick = useCallback(() => {
    onSortClick(dataKey);
  }, [dataKey]);

  const handleDrag = useCallback(
    (e) => {
      onDrag(e, index, ratio, parentWidth);
    },
    [index, ratio, parentWidth]
  );

  const handleDragEnd = useCallback(
    (e) => {
      onDragEnd(e, index, parentWidth);
    },
    [index, parentWidth]
  );

  return (
    <Col height={rowHeight} width={width}>
      <ClickArea
        onClick={isSortable ? handleSortClick : null}
        height={rowHeight}
        width={width - 10}
      >
        {headerCellRenderer ? (
          headerCellRenderer({ label })
        ) : (
          <Label>{label}</Label>
        )}

        {isSortable && isBoolean(sortAscending) ? (
          <SortIcon rotation={sortAscending ? '0deg' : '180deg'} />
        ) : null}
      </ClickArea>

      {isResizeable ? (
        <Handle onDrag={handleDrag} onDragEnd={handleDragEnd} />
      ) : null}
    </Col>
  );
};

export default HeaderCol;

const SortIcon = styled(TableArrow)<{ rotation: string }>`
  width: 10px;
  min-width: 10px;
  height: 15px;
  margin: 0 10px;
  transition: all 300ms;
  transform: rotate(${({ rotation }) => rotation});

  path {
    fill: ${({ theme }) => theme.p200};
  }
`;

const ClickArea = styled.div.attrs(
  (props: { width: number; height: number }) => ({
    style: {
      width: props.width,
      height: props.height,
    },
  })
)<{ width: number; height: number }>`
  display: flex;
  align-items: center;
`;

const Handle = styled(Draggable)`
  width: 20px;
  height: 50px;
  opacity: 0.5;
  position: absolute;
  right: -10px;
  z-index: 999;
  top: 0;
  cursor: col-resize;
`;
