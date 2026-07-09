import styled, { css } from 'styled-components';
import type { HTMLAttributes, ReactNode } from 'react';

export type ToolbarMode = 'label' | 'filter' | 'selected';

export interface DataTableToolbarProps extends HTMLAttributes<HTMLDivElement> {
  /** 模式（對應 Figma：TableBar_Label / TableBar_Filter / Selected） */
  mode?: ToolbarMode;
  /** Toolbar 左側內容（標題、計數、篩選器） */
  startContent?: ReactNode;
  /** Toolbar 右側內容（新增、匯出按鈕） */
  endContent?: ReactNode;
  /** Selected 模式才顯示，被選取的列數 */
  selectedCount?: number;
  /** Selected 模式才顯示，批次操作按鈕 */
  selectedActions?: ReactNode;
  /** 自訂清除選取的 callback */
  onClearSelection?: () => void;
}

const Root = styled.div<{ $mode: ToolbarMode }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 12px 16px;
  min-height: 56px;
  font-family: ${({ theme }) => theme.fontFamily.primary};
  border-bottom: 1px solid ${({ theme }) => theme.semantic.table.divider};

  ${({ $mode, theme }) =>
    $mode === 'selected' &&
    css`
      background: ${theme.semantic.primary.surface};
      border-bottom: 1px solid ${theme.semantic.primary.dark};
    `}
`;

const StartSection = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 16px;
  flex: 1;
  min-width: 0;
`;

const EndSection = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
`;

const SelectedLabel = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: ${({ theme }) => theme.semantic.primary.light};
  font-size: 14px;
  font-weight: ${({ theme }) => theme.fontWeight.medium};
`;

const ClearButton = styled.button.attrs({ type: 'button' })`
  background: transparent;
  border: 0;
  color: ${({ theme }) => theme.semantic.text.middle};
  cursor: pointer;
  font-family: inherit;
  font-size: 12px;
  text-decoration: underline;
  &:hover {
    color: ${({ theme }) => theme.semantic.text.high};
  }
`;

export const DataTableToolbar = ({
  mode = 'label',
  startContent,
  endContent,
  selectedCount,
  selectedActions,
  onClearSelection,
  ...rest
}: DataTableToolbarProps) => {
  if (mode === 'selected') {
    return (
      <Root $mode="selected" {...rest}>
        <StartSection>
          <SelectedLabel>
            已選取 {selectedCount} 項
            {onClearSelection && (
              <ClearButton onClick={onClearSelection}>清除</ClearButton>
            )}
          </SelectedLabel>
        </StartSection>
        <EndSection>{selectedActions}</EndSection>
      </Root>
    );
  }

  return (
    <Root $mode={mode} {...rest}>
      <StartSection>{startContent}</StartSection>
      {endContent && <EndSection>{endContent}</EndSection>}
    </Root>
  );
};

DataTableToolbar.displayName = 'DataTableToolbar';
