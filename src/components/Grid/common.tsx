import styled from 'styled-components';

export const Col = styled.div.attrs((props: { width: number }) => ({
  style: {
    maxWidth: `${props.width}px`,
    minWidth: `${props.width}px`,
  },
}))<{ width: number; height: number }>`
  display: flex;
  flex: 1;
  height: ${({ height }) => `${height}px`};
  align-items: center;
  border-right: 1px solid ${({ theme }) => theme.p100};
  font-size: 12px;
  color: ${({ theme }) => theme.p600};
  box-sizing: border-box;
  padding: 0 10px;
  position: relative;

  &:last-child {
    border: none;
  }
`;

export const Label = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: flex;
  flex-direction: row;
  align-items: center;
`;
