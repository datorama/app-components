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
}: {
  key: string | number;
  value: string | number;
}) => ReactElement | null;

export type HeaderCellRenderer = ({
  label,
}: {
  label: string;
}) => ReactElement | null;

export type EmptyStateRenderer = ({
  type,
}: {
  type: string;
}) => ReactElement | null;

export type ErrorStateRenderer = () => ReactElement | null;

type SortParam = Record<string, 'asc' | 'desc'>;

export type SortParams = SortParam[];
