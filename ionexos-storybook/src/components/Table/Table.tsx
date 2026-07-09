import styled, { css } from 'styled-components';
import { createContext, useContext } from 'react';
import type { HTMLAttributes, TableHTMLAttributes, ReactNode, ThHTMLAttributes, TdHTMLAttributes } from 'react';

export type TableSize = 'medium' | 'large';
export type TableDensity = 'comfortable' | 'compact';

interface TableContextValue {
  size: TableSize;
  density: TableDensity;
  striped: boolean;
  hoverable: boolean;
}

const TableContext = createContext<TableContextValue>({
  size: 'medium',
  density: 'comfortable',
  striped: false,
  hoverable: true,
});

const useTableContext = () => useContext(TableContext);

// === Root container ===
export interface TableProps extends TableHTMLAttributes<HTMLTableElement> {
  /** 字級大小，對應 Figma Data Cells 的 FontSize=Medium / Large */
  size?: TableSize;
  /** 列高密度。compact 列高較小 */
  density?: TableDensity;
  /** 斑馬紋 */
  striped?: boolean;
  /** Hover 高亮列 */
  hoverable?: boolean;
  /** 是否提供外圍容器（含 border、border-radius） */
  bordered?: boolean;
}

const TableContainer = styled.div<{ $bordered: boolean }>`
  width: 100%;
  border-radius: ${({ theme }) => theme.radius.md};
  font-family: ${({ theme }) => theme.fontFamily.primary};
  ${({ $bordered, theme }) =>
    $bordered &&
    css`
      border: 1px solid ${theme.semantic.background.transparent10};
      overflow: hidden;
      background: ${theme.semantic.background.bright};
    `}
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-family: inherit;
`;

export const Table = ({
  size = 'medium',
  density = 'comfortable',
  striped = false,
  hoverable = true,
  bordered = true,
  children,
  ...rest
}: TableProps) => {
  return (
    <TableContext.Provider value={{ size, density, striped, hoverable }}>
      <TableContainer $bordered={bordered}>
        <StyledTable {...rest}>{children}</StyledTable>
      </TableContainer>
    </TableContext.Provider>
  );
};

Table.displayName = 'Table';

// === Thead ===
const StyledThead = styled.thead`
  background: ${({ theme }) => theme.semantic.table.header};
  border-bottom: 1px solid ${({ theme }) => theme.semantic.table.divider};
`;

export const Thead = (props: HTMLAttributes<HTMLTableSectionElement>) => (
  <StyledThead {...props} />
);
Thead.displayName = 'Thead';

// === Tbody ===
const StyledTbody = styled.tbody``;

export const Tbody = (props: HTMLAttributes<HTMLTableSectionElement>) => (
  <StyledTbody {...props} />
);
Tbody.displayName = 'Tbody';

// === Tfoot ===
const StyledTfoot = styled.tfoot`
  background: ${({ theme }) => theme.semantic.table.header};
  border-top: 1px solid ${({ theme }) => theme.semantic.table.divider};
`;

export const Tfoot = (props: HTMLAttributes<HTMLTableSectionElement>) => (
  <StyledTfoot {...props} />
);
Tfoot.displayName = 'Tfoot';

// === Tr ===
export interface TrProps extends HTMLAttributes<HTMLTableRowElement> {
  /** 列選中（會帶 highlight 背景） */
  selected?: boolean;
  /** 列停用 */
  disabled?: boolean;
}

const StyledTr = styled.tr<{
  $selected?: boolean;
  $disabled?: boolean;
  $striped: boolean;
  $hoverable: boolean;
}>`
  transition: background-color 150ms ease;
  border-bottom: 1px solid ${({ theme }) => theme.semantic.table.divider};

  ${({ $striped, theme }) =>
    $striped &&
    css`
      &:nth-child(even) {
        background: ${theme.semantic.table.even};
      }
    `}

  ${({ $hoverable, theme }) =>
    $hoverable &&
    css`
      &:hover {
        background: ${theme.semantic.table.hover};
      }
    `}

  ${({ $selected, theme }) =>
    $selected &&
    css`
      background: ${theme.semantic.primary.surface} !important;
    `}

  ${({ $disabled }) =>
    $disabled &&
    css`
      opacity: 0.5;
      pointer-events: none;
    `}

  &:last-child {
    border-bottom: 0;
  }
`;

export const Tr = ({ selected, disabled, ...rest }: TrProps) => {
  const { striped, hoverable } = useTableContext();
  return (
    <StyledTr
      $selected={selected}
      $disabled={disabled}
      $striped={striped}
      $hoverable={hoverable}
      aria-selected={selected}
      aria-disabled={disabled}
      {...rest}
    />
  );
};
Tr.displayName = 'Tr';

// === Th ===
export type CellAlign = 'left' | 'center' | 'right';

export interface ThProps extends ThHTMLAttributes<HTMLTableCellElement> {
  align?: CellAlign;
  /** 設定固定欄寬 */
  width?: number | string;
}

const StyledTh = styled.th<{
  $align: CellAlign;
  $size: TableSize;
  $density: TableDensity;
}>`
  text-align: ${({ $align }) => $align};
  vertical-align: middle;
  font-family: inherit;
  color: ${({ theme }) => theme.semantic.text.middle};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  ${({ $size }) =>
    $size === 'large'
      ? css`
          font-size: 14px;
          letter-spacing: 0;
        `
      : css`
          font-size: 13px;
          letter-spacing: 0.1px;
        `}
  ${({ $density }) =>
    $density === 'comfortable'
      ? css`
          padding: 16px;
        `
      : css`
          padding: 8px 12px;
        `}
  white-space: nowrap;
`;

export const Th = ({ align = 'left', width, style, ...rest }: ThProps) => {
  const { size, density } = useTableContext();
  return (
    <StyledTh
      $align={align}
      $size={size}
      $density={density}
      style={{ ...style, ...(width ? { width } : {}) }}
      scope="col"
      {...rest}
    />
  );
};
Th.displayName = 'Th';

// === Td ===
export interface TdProps extends TdHTMLAttributes<HTMLTableCellElement> {
  align?: CellAlign;
}

const StyledTd = styled.td<{
  $align: CellAlign;
  $size: TableSize;
  $density: TableDensity;
}>`
  text-align: ${({ $align }) => $align};
  vertical-align: middle;
  color: ${({ theme }) => theme.semantic.text.high};
  font-family: inherit;
  ${({ $size }) =>
    $size === 'large'
      ? css`
          font-size: 15px;
        `
      : css`
          font-size: 14px;
        `}
  ${({ $density }) =>
    $density === 'comfortable'
      ? css`
          padding: 16px;
        `
      : css`
          padding: 8px 12px;
        `}
`;

export const Td = ({ align = 'left', ...rest }: TdProps) => {
  const { size, density } = useTableContext();
  return <StyledTd $align={align} $size={size} $density={density} {...rest} />;
};
Td.displayName = 'Td';

// === Cell with subtitle（對應 Figma 的 Text+Subtext type） ===
const PrimaryText = styled.div`
  color: ${({ theme }) => theme.semantic.text.high};
  line-height: 1.4;
`;

const SubText = styled.div`
  color: ${({ theme }) => theme.semantic.text.middle};
  font-size: 12px;
  margin-top: 2px;
  line-height: 1.4;
  letter-spacing: 0.4px;
`;

export interface CellTextProps {
  primary: ReactNode;
  secondary?: ReactNode;
}

export const CellText = ({ primary, secondary }: CellTextProps) => (
  <div>
    <PrimaryText>{primary}</PrimaryText>
    {secondary && <SubText>{secondary}</SubText>}
  </div>
);
CellText.displayName = 'CellText';

// === Empty state (No_Data) ===
import { EmptyBoxIcon } from '../_shared/icons';

const EmptyWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 48px 24px;
  gap: 12px;
  color: ${({ theme }) => theme.semantic.text.middle};
  font-family: ${({ theme }) => theme.fontFamily.primary};
`;

const EmptyTitle = styled.div`
  color: ${({ theme }) => theme.semantic.text.high};
  font-size: 15px;
  font-weight: ${({ theme }) => theme.fontWeight.medium};
`;

const EmptyDescription = styled.div`
  color: ${({ theme }) => theme.semantic.text.middle};
  font-size: 13px;
  text-align: center;
  max-width: 320px;
`;

export interface TableEmptyProps {
  title?: ReactNode;
  description?: ReactNode;
  icon?: ReactNode;
  action?: ReactNode;
  /** 占滿幾欄（會自動加上 colSpan 包在 td 內） */
  colSpan?: number;
}

export const TableEmpty = ({
  title = '尚無資料',
  description,
  icon,
  action,
  colSpan,
}: TableEmptyProps) => {
  const content = (
    <EmptyWrap>
      {icon ?? <EmptyBoxIcon size={56} />}
      <EmptyTitle>{title}</EmptyTitle>
      {description && <EmptyDescription>{description}</EmptyDescription>}
      {action}
    </EmptyWrap>
  );
  if (colSpan) {
    return (
      <tr>
        <td colSpan={colSpan} style={{ padding: 0 }}>
          {content}
        </td>
      </tr>
    );
  }
  return content;
};
TableEmpty.displayName = 'TableEmpty';
