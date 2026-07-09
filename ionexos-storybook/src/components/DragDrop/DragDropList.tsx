import styled, { css } from 'styled-components';
import { useState, useRef } from 'react';
import type { ReactNode, HTMLAttributes, Key } from 'react';
import { DragHandleIcon } from '../_shared/icons';

export type DragDropItemState =
  | 'default'
  | 'hover'
  | 'grabbing'
  | 'edit'
  | 'delete'
  | 'disabled';

export interface DragDropItemData<T = unknown> {
  /** 唯一識別 */
  id: Key;
  /** 顯示主文 */
  label?: ReactNode;
  /** 副文字 */
  description?: ReactNode;
  /** 右側內容（編輯/刪除按鈕、徽章） */
  endContent?: ReactNode;
  /** State 控制視覺 */
  state?: DragDropItemState;
  /** 任意附帶資料 */
  data?: T;
}

export interface DragDropListProps<T = unknown>
  extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** 項目清單 */
  items: DragDropItemData<T>[];
  /** 順序變更回呼。會傳入排序後的完整 items */
  onChange?: (items: DragDropItemData<T>[]) => void;
  /** 自訂渲染單一項目（覆寫預設樣式） */
  renderItem?: (item: DragDropItemData<T>, index: number) => ReactNode;
  /** 拖拉是否啟用（停用後仍可顯示但無法排序） */
  disabled?: boolean;
}

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-family: ${({ theme }) => theme.fontFamily.primary};
`;

const Item = styled.div<{
  $state: DragDropItemState;
  $dragging: boolean;
  $dragOver: boolean;
}>`
  display: flex;
  align-items: center;
  gap: 12px;
  min-height: 56px;
  padding: 12px 16px;
  background: ${({ theme }) => theme.semantic.background.bright};
  border: 1px solid ${({ theme }) => theme.semantic.background.transparent10};
  border-radius: ${({ theme }) => theme.radius.md};
  transition:
    background-color 150ms ease,
    border-color 150ms ease,
    transform 150ms ease,
    box-shadow 150ms ease;
  cursor: grab;
  user-select: none;

  ${({ $state, theme }) => {
    switch ($state) {
      case 'hover':
        return css`
          border-color: ${theme.semantic.primary.main};
          background: ${theme.semantic.background.bright};
        `;
      case 'grabbing':
        return css`
          cursor: grabbing;
          border-color: ${theme.semantic.primary.main};
          box-shadow: ${theme.shadows.hero};
        `;
      case 'edit':
        return css`
          border-color: ${theme.semantic.primary.main};
          background: ${theme.semantic.primary.surface};
        `;
      case 'delete':
        return css`
          border-color: ${theme.semantic.error.main};
          background: ${theme.semantic.error.surface};
        `;
      case 'disabled':
        return css`
          opacity: 0.5;
          cursor: not-allowed;
          background: ${theme.semantic.background.transparent5};
        `;
      default:
        return '';
    }
  }}

  &:hover:not([data-disabled='true']) {
    border-color: ${({ theme }) => theme.semantic.primary.main};
  }

  ${({ $dragging }) =>
    $dragging &&
    css`
      opacity: 0.4;
      cursor: grabbing;
    `}

  ${({ $dragOver, theme }) =>
    $dragOver &&
    css`
      border-top: 2px solid ${theme.semantic.primary.main};
      padding-top: 11px;
    `}
`;

const Handle = styled.span<{ $disabled?: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: ${({ theme }) => theme.semantic.text.middle};
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'grab')};
  &:active {
    cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'grabbing')};
  }
`;

const Body = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const Label = styled.div`
  color: ${({ theme }) => theme.semantic.text.high};
  font-size: 14px;
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  line-height: 1.4;
`;

const Description = styled.div`
  color: ${({ theme }) => theme.semantic.text.middle};
  font-size: 12px;
  letter-spacing: 0.4px;
  line-height: 1.5;
`;

const EndArea = styled.div`
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  gap: 4px;
`;

export function DragDropList<T = unknown>({
  items,
  onChange,
  renderItem,
  disabled,
  ...rest
}: DragDropListProps<T>) {
  const [dragging, setDragging] = useState<Key | null>(null);
  const [dragOverIdx, setDragOverIdx] = useState<number | null>(null);
  const dragStartIndex = useRef<number | null>(null);

  const handleDragStart =
    (idx: number, item: DragDropItemData<T>) =>
    (e: React.DragEvent<HTMLDivElement>) => {
      if (disabled || item.state === 'disabled') {
        e.preventDefault();
        return;
      }
      dragStartIndex.current = idx;
      setDragging(item.id);
      e.dataTransfer.effectAllowed = 'move';
      // 必要設定，沒設 dataTransfer Firefox 不會觸發 drag
      try {
        e.dataTransfer.setData('text/plain', String(item.id));
      } catch {
        /* noop */
      }
    };

  const handleDragOver = (idx: number) => (e: React.DragEvent) => {
    if (disabled) return;
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOverIdx(idx);
  };

  const handleDragLeave = () => {
    setDragOverIdx(null);
  };

  const handleDrop = (idx: number) => (e: React.DragEvent) => {
    e.preventDefault();
    const from = dragStartIndex.current;
    setDragOverIdx(null);
    setDragging(null);
    dragStartIndex.current = null;
    if (from == null || from === idx) return;
    const next = [...items];
    const [moved] = next.splice(from, 1);
    // 插入時若往後拖，要扣除已移除位置造成的位移
    const insertAt = from < idx ? idx - 1 : idx;
    next.splice(insertAt, 0, moved);
    onChange?.(next);
  };

  const handleDragEnd = () => {
    setDragging(null);
    setDragOverIdx(null);
    dragStartIndex.current = null;
  };

  return (
    <List {...rest}>
      {items.map((item, idx) => {
        const itemDisabled = disabled || item.state === 'disabled';
        const state: DragDropItemState =
          dragging === item.id ? 'grabbing' : item.state ?? 'default';

        if (renderItem) {
          return (
            <div
              key={item.id}
              draggable={!itemDisabled}
              onDragStart={handleDragStart(idx, item)}
              onDragOver={handleDragOver(idx)}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop(idx)}
              onDragEnd={handleDragEnd}
              data-disabled={itemDisabled}
            >
              {renderItem(item, idx)}
            </div>
          );
        }

        return (
          <Item
            key={item.id}
            $state={state}
            $dragging={dragging === item.id}
            $dragOver={dragOverIdx === idx && dragging !== item.id}
            draggable={!itemDisabled}
            data-disabled={itemDisabled}
            onDragStart={handleDragStart(idx, item)}
            onDragOver={handleDragOver(idx)}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop(idx)}
            onDragEnd={handleDragEnd}
          >
            <Handle $disabled={itemDisabled} aria-hidden="true">
              <DragHandleIcon size={20} />
            </Handle>
            <Body>
              {item.label && <Label>{item.label}</Label>}
              {item.description && <Description>{item.description}</Description>}
            </Body>
            {item.endContent && <EndArea>{item.endContent}</EndArea>}
          </Item>
        );
      })}
    </List>
  );
}

DragDropList.displayName = 'DragDropList';
