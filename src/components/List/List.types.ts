import { ReactNode } from 'react';
import { RowRendererProps } from './Body';

export type DataArray = Record<string, string | number>[];

interface Header {
  label: string;
  dataKey: string;
  isSortable?: boolean;
}

export type HeadersType = Header[];

export interface SortDataType {
  [key: string]: boolean;
}

export type FooterRenderer = ({ total }: { total: number }) => ReactNode;
export type ActionsRenderer = ({
  onSearchChange,
}: {
  onSearchChange: (str: string) => void;
}) => ReactNode;
export type RowRenderer = (params: RowRendererProps) => ReactNode;
export type CellRenderer = ({ value }: { value: string | number }) => ReactNode;
export type HeaderCellRenderer = ({ label }: { label: string }) => ReactNode;
