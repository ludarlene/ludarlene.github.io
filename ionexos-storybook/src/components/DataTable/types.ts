import type { ReactNode } from 'react';
import type { CellAlign } from '../Table/Table';

export type SortDirection = 'asc' | 'desc' | null;

export interface DataTableColumn<T> {
  /** 唯一識別 */
  id: string;
  /** 表頭顯示 */
  header: ReactNode;
  /** 對應的資料欄位（用於預設取值 + 排序） */
  accessor?: keyof T;
  /** 自訂取值（覆寫 accessor） */
  accessorFn?: (row: T) => unknown;
  /** 自訂渲染（覆寫預設文字渲染） */
  cell?: (row: T, rowIndex: number) => ReactNode;
  /** 對齊方式 */
  align?: CellAlign;
  /** 固定寬度（單位 px 或 css 字串） */
  width?: number | string;
  /** 啟用排序 */
  sortable?: boolean;
  /** 自訂排序比較函式（覆寫預設排序） */
  sortFn?: (a: T, b: T) => number;
}

export interface SortState {
  columnId: string;
  direction: 'asc' | 'desc';
}

export interface PaginationState {
  page: number;
  pageSize: number;
}
