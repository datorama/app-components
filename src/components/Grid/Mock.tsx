import React from 'react';
import styled from 'styled-components';
import { AutoSizer, List } from 'react-virtualized';
import { range } from 'lodash/fp';

const data = range(0, 100);

interface Props {
  rowHeight: number;
}

const Mock = (props: Props) => {
  const rowRenderer = (rowProps) => (
    <Row style={rowProps.style} key={rowProps.key}>
      <RowInner index={rowProps.index} />
    </Row>
  );

  return (
    <AutoSizer>
      {({ height, width }) => (
        <List
          height={height}
          style={{ outline: 'none' }}
          rowCount={data.length}
          rowHeight={props.rowHeight}
          rowRenderer={rowRenderer}
          width={width}
        />
      )}
    </AutoSizer>
  );
};

export default Mock;

const Row = styled.div`
  width: 100%;
  box-sizing: border-box;
  border-bottom: 1px solid ${({ theme }) => theme.p100};
  display: flex;
  align-items: center;
`;

const RowInner = styled.div<{ index: number }>`
  width: 100%;
  height: 70%;
  border-radius: 5px;

  background: ${({ theme }) => theme.p50};
  background-image: ${({ theme }) =>
    `linear-gradient(to right, ${theme.p50} 0%, ${theme.p0} 20%, ${theme.p50} 40%, ${theme.p50} 100%)`};
  background-repeat: no-repeat;
  background-size: 400px 100%;
  display: inline-block;
  position: relative;
  animation: 1.6s linear placeholderShimmer infinite forwards;
  animation-delay: ${({ index }) => 20 * index}ms;

  @keyframes placeholderShimmer {
    0% {
      background-position: -100% 0;
    }

    100% {
      background-position: 200% 0;
    }
  }
`;
