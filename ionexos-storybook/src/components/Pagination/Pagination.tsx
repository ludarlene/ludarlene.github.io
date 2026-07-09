import styled, { css } from 'styled-components';
import { useMemo } from 'react';
import type { HTMLAttributes } from 'react';
import { Select } from '../Select';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleChevronLeftIcon,
  DoubleChevronRightIcon,
} from '../_shared/icons';

export interface PaginationProps extends HTMLAttributes<HTMLDivElement> {
  /** 目前頁數（1-based） */
  page: number;
  /** 每頁筆數 */
  pageSize: number;
  /** 總筆數 */
  total: number;
  /** 每頁筆數選項 */
  pageSizeOptions?: number[];
  /** 換頁回呼 */
  onPageChange?: (page: number) => void;
  /** 改變每頁筆數的回呼 */
  onPageSizeChange?: (pageSize: number) => void;
  /** 顯示模式：default（簡單版）/ page（含跳頁數字） */
  mode?: 'default' | 'page';
  /** 顯示首末頁按鈕 */
  showFirstLastButtons?: boolean;
  /** 自訂「Rows per page」label */
  rowsPerPageLabel?: string;
}

const Root = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  padding: 8px 16px;
  font-family: ${({ theme }) => theme.fontFamily.primary};
  font-size: 13px;
  color: ${({ theme }) => theme.semantic.text.middle};
  min-height: 48px;
`;

const Group = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 12px;
`;

const PageInfo = styled.span`
  font-variant-numeric: tabular-nums;
  color: ${({ theme }) => theme.semantic.text.high};
`;

const NavButton = styled.button.attrs({ type: 'button' })<{ $active?: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 32px;
  height: 32px;
  padding: 0 6px;
  border: 0;
  border-radius: ${({ theme }) => theme.radius.sm};
  background: ${({ $active, theme }) =>
    $active ? theme.semantic.primary.main : 'transparent'};
  color: ${({ $active, theme }) =>
    $active ? theme.semantic.text.white : theme.semantic.text.middle};
  font-family: inherit;
  font-size: 13px;
  font-weight: ${({ $active, theme }) =>
    $active ? theme.fontWeight.medium : theme.fontWeight.regular};
  cursor: pointer;
  transition: background-color 150ms ease, color 150ms ease;

  &:hover:not(:disabled) {
    background: ${({ $active, theme }) =>
      $active
        ? theme.semantic.primary.main
        : theme.semantic.background.transparent10};
    color: ${({ $active, theme }) =>
      $active ? theme.semantic.text.white : theme.semantic.text.high};
  }

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 2px ${({ theme }) => theme.semantic.primary.surface};
  }

  &:disabled {
    color: ${({ theme }) => theme.semantic.text.lower};
    cursor: not-allowed;
  }
`;

const Ellipsis = styled.span`
  color: ${({ theme }) => theme.semantic.text.lower};
  padding: 0 4px;
`;

const SelectWrap = styled.div`
  width: 88px;
  /* 縮小 Select 高度以對齊分頁列高 */
  & > div > button,
  & > div {
    height: 32px !important;
    min-height: 0;
  }
`;

/**
 * 產生頁碼陣列，含 ellipsis（用 -1 代表）
 * 規則：起頭與結尾各保留 1 頁，當前頁前後各保留 1 頁
 */
function buildPageList(current: number, total: number): number[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const items: number[] = [1];
  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);
  if (start > 2) items.push(-1);
  for (let i = start; i <= end; i++) items.push(i);
  if (end < total - 1) items.push(-1);
  items.push(total);
  return items;
}

export const Pagination = ({
  page,
  pageSize,
  total,
  pageSizeOptions = [5, 10, 25, 50, 100],
  onPageChange,
  onPageSizeChange,
  mode = 'default',
  showFirstLastButtons = false,
  rowsPerPageLabel = 'Rows per page',
  ...rest
}: PaginationProps) => {
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const start = total === 0 ? 0 : (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, total);

  const go = (target: number) => {
    if (target < 1 || target > totalPages || target === page) return;
    onPageChange?.(target);
  };

  const pages = useMemo(
    () => (mode === 'page' ? buildPageList(page, totalPages) : []),
    [mode, page, totalPages],
  );

  return (
    <Root {...rest}>
      <Group>
        <span>{rowsPerPageLabel}:</span>
        <SelectWrap>
          <Select<number>
            options={pageSizeOptions.map((n) => ({ value: n, label: String(n) }))}
            value={pageSize}
            onChange={(v) => onPageSizeChange?.(v as number)}
          />
        </SelectWrap>
      </Group>

      <Group>
        <PageInfo>
          {start}–{end} of {total}
        </PageInfo>
        {showFirstLastButtons && (
          <NavButton
            onClick={() => go(1)}
            disabled={page === 1}
            aria-label="第一頁"
          >
            <DoubleChevronLeftIcon size={16} />
          </NavButton>
        )}
        <NavButton
          onClick={() => go(page - 1)}
          disabled={page === 1}
          aria-label="上一頁"
        >
          <ChevronLeftIcon size={16} />
        </NavButton>

        {mode === 'page' &&
          pages.map((p, idx) =>
            p === -1 ? (
              <Ellipsis key={`gap-${idx}`} aria-hidden="true">
                …
              </Ellipsis>
            ) : (
              <NavButton
                key={p}
                $active={p === page}
                aria-current={p === page ? 'page' : undefined}
                onClick={() => go(p)}
              >
                {p}
              </NavButton>
            ),
          )}

        <NavButton
          onClick={() => go(page + 1)}
          disabled={page >= totalPages}
          aria-label="下一頁"
        >
          <ChevronRightIcon size={16} />
        </NavButton>
        {showFirstLastButtons && (
          <NavButton
            onClick={() => go(totalPages)}
            disabled={page >= totalPages}
            aria-label="最後一頁"
          >
            <DoubleChevronRightIcon size={16} />
          </NavButton>
        )}
      </Group>
    </Root>
  );
};

Pagination.displayName = 'Pagination';
