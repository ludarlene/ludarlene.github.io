import styled from 'styled-components';
import { useMemo, useState, useCallback } from 'react';
import type { ReactNode, HTMLAttributes, Key } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td, TableEmpty } from '../Table';
import type { TableSize, TableDensity } from '../Table';
import { Checkbox } from '../Checkbox';
import { Spinner } from '../Loading';
import { SortIcon, SortAscIcon, SortDescIcon } from '../_shared/icons';
import {
  DataTableToolbar,
} from './DataTableToolbar';
import type { ToolbarMode, DataTableToolbarProps } from './DataTableToolbar';
import { Pagination } from '../Pagination';
import type { PaginationProps } from '../Pagination/Pagination';
import type { DataTableColumn, SortState, PaginationState } from './types';

export interface DataTableProps<T> extends Omit<HTMLAttributes<HTMLDivElement>, 'onSelect'> {
  /** 欄位定義 */
  columns: DataTableColumn<T>[];
  /** 資料列 */
  data: T[];
  /** 每列的 key 取值 */
  rowKey: keyof T | ((row: T) => Key);
  /** Table 字級 */
  size?: TableSize;
  /** Table 列高密度 */
  density?: TableDensity;
  /** 列選取（多選） */
  selectable?: boolean;
  /** 已選取的 row keys（受控） */
  selectedKeys?: Key[];
  /** 預設選取（非受控） */
  defaultSelectedKeys?: Key[];
  /** 選取變更回呼 */
  onSelectionChange?: (keys: Key[]) => void;
  /** 列點擊回呼 */
  onRowClick?: (row: T, rowIndex: number) => void;
  /** 是否在 hover row 時改變外觀 */
  hoverable?: boolean;
  /** 排序狀態（受控） */
  sort?: SortState | null;
  /** 排序變更回呼。若提供，會切換為受控模式（外部處理排序）。
   *  若未提供且欄位 sortable=true，會在內部用 sortFn 或預設比較器排序 */
  onSortChange?: (sort: SortState | null) => void;
  /** 啟用分頁 */
  pagination?: boolean | Omit<PaginationProps, 'page' | 'pageSize' | 'total' | 'onPageChange' | 'onPageSizeChange'>;
  /** 受控分頁狀態 */
  paginationState?: PaginationState;
  /** 預設分頁（非受控） */
  defaultPagination?: PaginationState;
  /** 分頁變更回呼 */
  onPaginationChange?: (state: PaginationState) => void;
  /** 資料總筆數。若未提供，會用 data.length（適合前端分頁）。
   *  伺服器分頁時請傳入後端回傳的 total */
  total?: number;
  /** Loading 狀態 */
  loading?: boolean;
  /** Toolbar */
  toolbar?: DataTableToolbarProps | ReactNode;
  /** 自訂空狀態 */
  emptyState?: ReactNode;
}

const Root = styled.div`
  width: 100%;
  background: ${({ theme }) => theme.semantic.background.bright};
  border: 1px solid ${({ theme }) => theme.semantic.background.transparent10};
  border-radius: ${({ theme }) => theme.radius.md};
  font-family: ${({ theme }) => theme.fontFamily.primary};
  overflow: hidden;
`;

const LoadingOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(8, 15, 36, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 5;
`;

const TableArea = styled.div`
  position: relative;
`;

const SortButton = styled.button.attrs({ type: 'button' })<{ $active: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  background: transparent;
  border: 0;
  padding: 0;
  cursor: pointer;
  font-family: inherit;
  font-size: inherit;
  font-weight: inherit;
  color: ${({ $active, theme }) =>
    $active ? theme.semantic.primary.light : 'inherit'};
  &:hover {
    color: ${({ theme }) => theme.semantic.text.high};
  }
`;

function getRowKey<T>(row: T, rowKey: DataTableProps<T>['rowKey']): Key {
  if (typeof rowKey === 'function') return rowKey(row);
  return row[rowKey] as unknown as Key;
}

function getCellValue<T>(row: T, col: DataTableColumn<T>): unknown {
  if (col.accessorFn) return col.accessorFn(row);
  if (col.accessor) return row[col.accessor];
  return undefined;
}

function defaultCompare(a: unknown, b: unknown): number {
  if (a === b) return 0;
  if (a == null) return -1;
  if (b == null) return 1;
  if (typeof a === 'number' && typeof b === 'number') return a - b;
  return String(a).localeCompare(String(b));
}

export function DataTable<T>({
  columns,
  data,
  rowKey,
  size = 'medium',
  density = 'comfortable',
  selectable = false,
  selectedKeys: selectedKeysProp,
  defaultSelectedKeys = [],
  onSelectionChange,
  onRowClick,
  hoverable = true,
  sort: sortProp,
  onSortChange,
  pagination = false,
  paginationState: paginationStateProp,
  defaultPagination = { page: 1, pageSize: 10 },
  onPaginationChange,
  total,
  loading,
  toolbar,
  emptyState,
  ...rest
}: DataTableProps<T>) {
  // === Selection state ===
  const [internalSelectedKeys, setInternalSelectedKeys] = useState<Key[]>(
    defaultSelectedKeys,
  );
  const isSelectionControlled = selectedKeysProp !== undefined;
  const selectedKeys = isSelectionControlled
    ? selectedKeysProp!
    : internalSelectedKeys;

  const setSelectedKeys = useCallback(
    (keys: Key[]) => {
      if (!isSelectionControlled) setInternalSelectedKeys(keys);
      onSelectionChange?.(keys);
    },
    [isSelectionControlled, onSelectionChange],
  );

  // === Sort state ===
  const [internalSort, setInternalSort] = useState<SortState | null>(null);
  const isSortControlled = sortProp !== undefined;
  const sort = isSortControlled ? sortProp : internalSort;
  const setSort = useCallback(
    (s: SortState | null) => {
      if (!isSortControlled) setInternalSort(s);
      onSortChange?.(s);
    },
    [isSortControlled, onSortChange],
  );

  const handleSortClick = (col: DataTableColumn<T>) => {
    if (!col.sortable) return;
    if (!sort || sort.columnId !== col.id) {
      setSort({ columnId: col.id, direction: 'asc' });
    } else if (sort.direction === 'asc') {
      setSort({ columnId: col.id, direction: 'desc' });
    } else {
      setSort(null);
    }
  };

  // === Pagination state ===
  const [internalPagination, setInternalPagination] = useState<PaginationState>(
    defaultPagination,
  );
  const isPaginationControlled = paginationStateProp !== undefined;
  const paginationState = isPaginationControlled
    ? paginationStateProp!
    : internalPagination;
  const setPaginationState = useCallback(
    (s: PaginationState) => {
      if (!isPaginationControlled) setInternalPagination(s);
      onPaginationChange?.(s);
    },
    [isPaginationControlled, onPaginationChange],
  );

  // === Compute displayed rows ===
  // 受控排序時不在前端排，只有非受控時自己排
  const sortedData = useMemo(() => {
    if (!sort || isSortControlled) return data;
    const col = columns.find((c) => c.id === sort.columnId);
    if (!col) return data;
    const sorted = [...data].sort((a, b) => {
      const cmp = col.sortFn
        ? col.sortFn(a, b)
        : defaultCompare(getCellValue(a, col), getCellValue(b, col));
      return sort.direction === 'asc' ? cmp : -cmp;
    });
    return sorted;
  }, [data, sort, columns, isSortControlled]);

  // 受控分頁（伺服器分頁）時不在前端切，只有非受控時自己切
  const displayedRows = useMemo(() => {
    if (!pagination || isPaginationControlled) return sortedData;
    const { page, pageSize } = paginationState;
    return sortedData.slice((page - 1) * pageSize, page * pageSize);
  }, [sortedData, pagination, paginationState, isPaginationControlled]);

  const totalCount = total ?? data.length;

  // === Selection helpers ===
  const allKeys = useMemo(
    () => displayedRows.map((row) => getRowKey(row, rowKey)),
    [displayedRows, rowKey],
  );
  const allSelected =
    allKeys.length > 0 && allKeys.every((k) => selectedKeys.includes(k));
  const someSelected =
    !allSelected && allKeys.some((k) => selectedKeys.includes(k));

  const toggleAll = () => {
    if (allSelected) {
      setSelectedKeys(selectedKeys.filter((k) => !allKeys.includes(k)));
    } else {
      const merged = [
        ...selectedKeys,
        ...allKeys.filter((k) => !selectedKeys.includes(k)),
      ];
      setSelectedKeys(merged);
    }
  };

  const toggleRow = (k: Key) => {
    if (selectedKeys.includes(k)) {
      setSelectedKeys(selectedKeys.filter((x) => x !== k));
    } else {
      setSelectedKeys([...selectedKeys, k]);
    }
  };

  // === Toolbar rendering ===
  const toolbarEl = useMemo(() => {
    if (!toolbar) return null;
    if (selectable && selectedKeys.length > 0 && typeof toolbar === 'object' && toolbar !== null && 'mode' in (toolbar as object) === false) {
      // 如果 toolbar 是 props 形式，自動切到 selected 模式
      return null;
    }
    // 若是 React 元素直接用
    if (typeof toolbar === 'object' && toolbar !== null && '$$typeof' in (toolbar as object)) {
      return toolbar as ReactNode;
    }
    // 否則視為 props
    const props = toolbar as DataTableToolbarProps;
    const mode: ToolbarMode =
      selectable && selectedKeys.length > 0 ? 'selected' : props.mode ?? 'label';
    return (
      <DataTableToolbar
        {...props}
        mode={mode}
        selectedCount={selectedKeys.length}
        onClearSelection={() => setSelectedKeys([])}
      />
    );
  }, [toolbar, selectable, selectedKeys, setSelectedKeys]);

  // === Pagination rendering ===
  const paginationEl = pagination ? (
    <Pagination
      page={paginationState.page}
      pageSize={paginationState.pageSize}
      total={totalCount}
      onPageChange={(p) =>
        setPaginationState({ ...paginationState, page: p })
      }
      onPageSizeChange={(s) =>
        setPaginationState({ page: 1, pageSize: s })
      }
      {...(typeof pagination === 'object' ? pagination : {})}
    />
  ) : null;

  // === Row click handler ===
  const handleRowClick = (row: T, idx: number) => {
    if (onRowClick) onRowClick(row, idx);
  };

  // === Render ===
  return (
    <Root {...rest}>
      {toolbarEl}
      <TableArea>
        {loading && (
          <LoadingOverlay>
            <Spinner size="large" />
          </LoadingOverlay>
        )}
        <Table
          size={size}
          density={density}
          bordered={false}
          hoverable={hoverable}
        >
          <Thead>
            <Tr>
              {selectable && (
                <Th width={48} align="center">
                  <Checkbox
                    checked={allSelected}
                    indeterminate={someSelected}
                    onChange={toggleAll}
                    aria-label="全選"
                  />
                </Th>
              )}
              {columns.map((col) => {
                const isSorted = sort?.columnId === col.id;
                const dir = isSorted ? sort!.direction : null;
                return (
                  <Th
                    key={col.id}
                    align={col.align ?? 'left'}
                    width={col.width}
                  >
                    {col.sortable ? (
                      <SortButton
                        $active={isSorted}
                        onClick={() => handleSortClick(col)}
                      >
                        {col.header}
                        {!isSorted ? (
                          <SortIcon size={14} />
                        ) : dir === 'asc' ? (
                          <SortAscIcon size={14} />
                        ) : (
                          <SortDescIcon size={14} />
                        )}
                      </SortButton>
                    ) : (
                      col.header
                    )}
                  </Th>
                );
              })}
            </Tr>
          </Thead>
          <Tbody>
            {displayedRows.length === 0 ? (
              emptyState ? (
                <tr>
                  <td
                    colSpan={columns.length + (selectable ? 1 : 0)}
                    style={{ padding: 0 }}
                  >
                    {emptyState}
                  </td>
                </tr>
              ) : (
                <TableEmpty
                  colSpan={columns.length + (selectable ? 1 : 0)}
                />
              )
            ) : (
              displayedRows.map((row, idx) => {
                const k = getRowKey(row, rowKey);
                const selected = selectedKeys.includes(k);
                return (
                  <Tr
                    key={k}
                    selected={selected}
                    onClick={() => handleRowClick(row, idx)}
                    style={{ cursor: onRowClick ? 'pointer' : undefined }}
                  >
                    {selectable && (
                      <Td align="center" onClick={(e) => e.stopPropagation()}>
                        <Checkbox
                          checked={selected}
                          onChange={() => toggleRow(k)}
                          aria-label="選取此列"
                        />
                      </Td>
                    )}
                    {columns.map((col) => (
                      <Td key={col.id} align={col.align ?? 'left'}>
                        {col.cell
                          ? col.cell(row, idx)
                          : (getCellValue(row, col) as ReactNode)}
                      </Td>
                    ))}
                  </Tr>
                );
              })
            )}
          </Tbody>
        </Table>
      </TableArea>
      {paginationEl}
    </Root>
  );
}

DataTable.displayName = 'DataTable';
