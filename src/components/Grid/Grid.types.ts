import { ReactElement } from 'react';
import { RowRendererProps } from './Body';

export type DataArray = Record<string, string | number>[];

interface Header {
  label: string;
  dataKey: string;
  isSortable?: boolean;
  width?: number;
}

export type HeadersType = Header[];

export interface SortDataType {
  [key: string]: boolean;
}

export type FooterRenderer = ({
  total,
}: {
  total: number;
}) => ReactElement | null;

export type ActionsRenderer = ({
  onSearchChange,
}: {
  onSearchChange: (str: string) => void;
}) => ReactElement | null;

export type RowRenderer = (params: RowRendererProps) => ReactElement | null;

export type CellRenderer = ({
  key,
  value,
  rowIndex,
  data,
}: {
  key: string | number;
  value: string | number;
  rowIndex: number;
  data: DataArray;
}) => ReactElement | null;

export type HeaderCellRenderer = ({
  label,
  index,
  dataKey,
}: {
  label: string;
  index: number;
  dataKey: string;
}) => ReactElement | null;

export type EmptyStateRenderer = ({
  type,
}: {
  type: string;
}) => ReactElement | null;

export type ErrorStateRenderer = () => ReactElement | null;

type SortParam = Record<string, 'asc' | 'desc'>;

export type SortParams = SortParam[];
