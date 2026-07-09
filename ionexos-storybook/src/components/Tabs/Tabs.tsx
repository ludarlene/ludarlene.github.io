import styled, { css } from 'styled-components';
import {
  createContext,
  useContext,
  useState,
  useId,
  useRef,
  useEffect,
  useCallback,
  useMemo,
} from 'react';
import type { ReactNode, KeyboardEvent } from 'react';

/**
 * 對應 Figma 規格：v1.8 IonexOS WebKit / Tabs (node 5143:4298)
 *
 * 五種 Type：
 * - `line`         91×40   底線型，px-16 py-11，下緣 2px border
 * - `lineCount`    121×40  Line 變體 + count badge
 * - `icon`         40×40   純 icon 正方形
 * - `contained`    113×40  容器型，bg + 4px 底色 border + 8px 上圓角
 * - `normal`       150×40  Contained 較寬版，subtitle-1 16px medium
 *
 * 五種 State：default / hover / focus / active / disable
 */
export type TabsType = 'line' | 'lineCount' | 'icon' | 'contained' | 'normal';
export type TabsSize = 'medium';

interface TabsContextValue {
  value: string;
  setValue: (v: string) => void;
  type: TabsType;
  size: TabsSize;
  registerTab: (v: string) => void;
  unregisterTab: (v: string) => void;
  tabValues: string[];
  baseId: string;
}

const TabsContext = createContext<TabsContextValue | null>(null);
const useTabsContext = () => {
  const ctx = useContext(TabsContext);
  if (!ctx) throw new Error('Tabs subcomponents 必須在 <Tabs> 內使用');
  return ctx;
};

export interface TabsProps {
  /** 受控 value */
  value?: string;
  /** 預設 value（非受控） */
  defaultValue?: string;
  /** 變更回呼 */
  onChange?: (value: string) => void;
  /**
   * 對應 Figma 的五種 Tab Type，預設 `line`（最常用底線型）
   */
  type?: TabsType;
  /** 尺寸（v1.8 目前只有 medium） */
  size?: TabsSize;
  /** 是否撐滿容器 */
  fullWidth?: boolean;
  children: ReactNode;
}

export const Tabs = ({
  value: valueProp,
  defaultValue,
  onChange,
  type = 'line',
  size = 'medium',
  children,
}: TabsProps) => {
  const baseId = useId();
  const [internal, setInternal] = useState<string>(defaultValue ?? '');
  const isControlled = valueProp !== undefined;
  const value = isControlled ? valueProp! : internal;

  // 用 ref 鎖住外部 callback 與 valueProp，避免每次 render 重建 context value
  const onChangeRef = useRef(onChange);
  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  const setValue = useCallback(
    (v: string) => {
      if (!isControlled) setInternal(v);
      onChangeRef.current?.(v);
    },
    [isControlled]
  );

  const [tabValues, setTabValues] = useState<string[]>([]);
  const registerTab = useCallback((v: string) => {
    setTabValues((prev) => (prev.includes(v) ? prev : [...prev, v]));
  }, []);
  const unregisterTab = useCallback((v: string) => {
    setTabValues((prev) => prev.filter((x) => x !== v));
  }, []);

  const ctxValue = useMemo<TabsContextValue>(
    () => ({
      value,
      setValue,
      type,
      size,
      registerTab,
      unregisterTab,
      tabValues,
      baseId,
    }),
    [value, setValue, type, size, registerTab, unregisterTab, tabValues, baseId]
  );

  return <TabsContext.Provider value={ctxValue}>{children}</TabsContext.Provider>;
};

// ============================================================================
// TabList
// ============================================================================

const ListRoot = styled.div<{ $type: TabsType; $fullWidth?: boolean }>`
  display: inline-flex;
  position: relative;
  ${({ $fullWidth }) =>
    $fullWidth &&
    css`
      width: 100%;
      display: flex;
    `}

  /* line / lineCount / icon：底部分隔線，每個 tab 各自有底色 border 處理 active 狀態 */
  ${({ $type, theme }) =>
    ($type === 'line' || $type === 'lineCount' || $type === 'icon') &&
    css`
      gap: 0;
    `}

  /* contained / normal：每個 tab 是獨立按鈕，間距 8px */
  ${({ $type }) =>
    ($type === 'contained' || $type === 'normal') &&
    css`
      gap: 8px;
    `}
`;

export interface TabListProps {
  children: ReactNode;
  fullWidth?: boolean;
  'aria-label'?: string;
}

export const TabList = ({
  children,
  fullWidth,
  'aria-label': ariaLabel = '頁籤',
}: TabListProps) => {
  const { type, value, tabValues, setValue } = useTabsContext();

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const idx = tabValues.indexOf(value);
    if (idx === -1) return;
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      setValue(tabValues[(idx + 1) % tabValues.length]);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      setValue(tabValues[(idx - 1 + tabValues.length) % tabValues.length]);
    } else if (e.key === 'Home') {
      e.preventDefault();
      setValue(tabValues[0]);
    } else if (e.key === 'End') {
      e.preventDefault();
      setValue(tabValues[tabValues.length - 1]);
    }
  };

  return (
    <ListRoot
      role="tablist"
      aria-label={ariaLabel}
      $type={type}
      $fullWidth={fullWidth}
      onKeyDown={handleKeyDown}
    >
      {children}
    </ListRoot>
  );
};

// ============================================================================
// Tab Button — 根據 type 切換完全不同的樣式
// ============================================================================

const TabButton = styled.button<{
  $type: TabsType;
  $active: boolean;
  $disabled?: boolean;
}>`
  position: relative;
  display: inline-flex;
  align-items: center;
  border: 0;
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};
  font-family: ${({ theme }) => theme.fontFamily.primary};
  transition:
    color 150ms ease,
    background-color 150ms ease,
    border-color 150ms ease;
  outline: none;
  white-space: nowrap;
  user-select: none;

  ${({ $disabled }) =>
    $disabled &&
    css`
      opacity: 0.4;
      pointer-events: none;
    `}

  /* === Type: Line（91×40 底線型）=== */
  /* Figma: padding 11px 16px, gap 8px, 下緣 2px solid border */
  /* Default: border text/middle (#8a8fa7), text text/middle, 透明背景 */
  /* Hover:   border button/primary (#668bfa), text button/primary, bg transparent-10 */
  /* Active:  border text/highlight (#668bfa), text text/high, 透明背景 */
  /* Focus:   外層 2px focus ring，內容同 hover */
  ${({ $type, $active, theme }) =>
    $type === 'line' &&
    css`
      height: 40px;
      padding: 11px 16px;
      gap: 8px;
      background: transparent;
      border-bottom: 2px solid
        ${$active ? theme.semantic.text.highlight : theme.semantic.text.middle};
      color: ${$active ? theme.semantic.text.high : theme.semantic.text.middle};
      font-size: 14px;
      font-weight: ${theme.fontWeight.regular};
      letter-spacing: 0.25px;

      &:hover:not(:disabled) {
        background: ${theme.semantic.background.transparent10};
        border-bottom-color: ${theme.semantic.primary.main};
        color: ${theme.semantic.primary.main};
      }

      &:focus-visible {
        outline: 2px solid ${theme.semantic.primary.main};
        outline-offset: -2px;
      }
    `}

  /* === Type: Line+Count（121×40）=== */
  /* 同 Line 規格，但右側有 count badge */
  ${({ $type, $active, theme }) =>
    $type === 'lineCount' &&
    css`
      height: 40px;
      padding: 11px 16px;
      gap: 8px;
      background: transparent;
      border-bottom: 2px solid
        ${$active ? theme.semantic.text.highlight : theme.semantic.text.middle};
      color: ${$active ? theme.semantic.text.high : theme.semantic.text.middle};
      font-size: 14px;
      font-weight: ${theme.fontWeight.regular};
      letter-spacing: 0.25px;

      &:hover:not(:disabled) {
        background: ${theme.semantic.background.transparent10};
        border-bottom-color: ${theme.semantic.primary.main};
        color: ${theme.semantic.primary.main};
      }

      &:focus-visible {
        outline: 2px solid ${theme.semantic.primary.main};
        outline-offset: -2px;
      }
    `}

  /* === Type: Icon（40×40 正方形，純 icon）=== */
  ${({ $type, $active, theme }) =>
    $type === 'icon' &&
    css`
      width: 40px;
      height: 40px;
      padding: 0;
      justify-content: center;
      background: transparent;
      border-bottom: 2px solid
        ${$active ? theme.semantic.text.highlight : theme.semantic.text.middle};
      color: ${$active ? theme.semantic.text.high : theme.semantic.text.middle};

      &:hover:not(:disabled) {
        background: ${theme.semantic.background.transparent10};
        border-bottom-color: ${theme.semantic.primary.main};
        color: ${theme.semantic.primary.main};
      }

      &:focus-visible {
        outline: 2px solid ${theme.semantic.primary.main};
        outline-offset: -2px;
      }
    `}

  /* === Type: Contained（113×40，容器型）=== */
  /* Active: bg button/focus (#384c8a) + 4px 底色 border (primary/main) + 8px 上圓角 */
  /* Default: 透明背景、灰色文字、無 border */
  ${({ $type, $active, theme }) =>
    $type === 'contained' &&
    css`
      height: 40px;
      min-width: 113px;
      padding: 0 16px;
      justify-content: center;
      border-radius: 8px 8px 0 0;
      background: ${$active ? theme.semantic.button.focus : 'transparent'};
      border-bottom: 4px solid
        ${$active ? theme.semantic.primary.main : 'transparent'};
      color: ${$active ? theme.semantic.text.high : theme.semantic.text.middle};
      font-size: 14px;
      font-weight: ${$active ? theme.fontWeight.medium : theme.fontWeight.regular};
      letter-spacing: 0.25px;

      &:hover:not(:disabled) {
        background: ${$active
          ? theme.semantic.button.focus
          : theme.semantic.background.transparent10};
        color: ${theme.semantic.text.high};
      }

      &:focus-visible {
        outline: 2px solid ${theme.semantic.primary.main};
        outline-offset: -2px;
      }
    `}

  /* === Type: Normal（150×40，同 Contained 但用 subtitle-1）=== */
  ${({ $type, $active, theme }) =>
    $type === 'normal' &&
    css`
      height: 40px;
      min-width: 150px;
      padding: 0 40px;
      justify-content: center;
      border-radius: 8px 8px 0 0;
      background: ${$active ? theme.semantic.button.focus : 'transparent'};
      border-bottom: 4px solid
        ${$active ? theme.semantic.primary.main : 'transparent'};
      color: ${$active ? theme.semantic.text.high : theme.semantic.text.middle};
      font-size: 16px;
      font-weight: ${$active ? theme.fontWeight.medium : theme.fontWeight.regular};
      letter-spacing: 0.15px;

      &:hover:not(:disabled) {
        background: ${$active
          ? theme.semantic.button.focus
          : theme.semantic.background.transparent10};
        color: ${theme.semantic.text.high};
      }

      &:focus-visible {
        outline: 2px solid ${theme.semantic.primary.main};
        outline-offset: -2px;
      }
    `}
`;

const IconWrap = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 16px;
  height: 16px;
`;

const CountBadge = styled.span<{ $active: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 20px;
  height: 18px;
  padding: 0 6px;
  border-radius: 9px;
  background: ${({ $active, theme }) =>
    $active ? theme.semantic.primary.main : theme.semantic.background.transparent10};
  color: ${({ $active, theme }) =>
    $active ? theme.semantic.text.white : theme.semantic.text.middle};
  font-size: 12px;
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  line-height: 1;
`;

export interface TabProps {
  /** Tab 識別值 */
  value: string;
  /** 顯示文字（icon type 可省略） */
  children?: ReactNode;
  /** 前置圖示（leading icon） */
  leadingIcon?: ReactNode;
  /** 後置圖示（trailing icon） */
  trailingIcon?: ReactNode;
  /** 計數值（Line+Count type 使用） */
  count?: number | string;
  /** 停用 */
  disabled?: boolean;
}

export const Tab = ({
  value,
  children,
  leadingIcon,
  trailingIcon,
  count,
  disabled,
}: TabProps) => {
  const { value: active, setValue, type, registerTab, unregisterTab, baseId } =
    useTabsContext();
  const isActive = active === value;

  useEffect(() => {
    registerTab(value);
    return () => unregisterTab(value);
  }, [value, registerTab, unregisterTab]);

  const handleClick = () => {
    if (disabled) return;
    setValue(value);
  };

  return (
    <TabButton
      role="tab"
      type="button"
      aria-selected={isActive}
      aria-controls={`${baseId}-panel-${value}`}
      id={`${baseId}-tab-${value}`}
      tabIndex={isActive ? 0 : -1}
      $type={type}
      $active={isActive}
      $disabled={disabled}
      disabled={disabled}
      onClick={handleClick}
    >
      {type === 'icon' ? (
        // Icon type：整個 40×40 button 內只放 icon，不用 IconWrap 額外包
        leadingIcon ?? children
      ) : (
        <>
          {leadingIcon && <IconWrap>{leadingIcon}</IconWrap>}
          {children}
          {type === 'lineCount' && count !== undefined && (
            <CountBadge $active={isActive}>{count}</CountBadge>
          )}
          {trailingIcon && <IconWrap>{trailingIcon}</IconWrap>}
        </>
      )}
    </TabButton>
  );
};

// ============================================================================
// TabPanel
// ============================================================================

export interface TabPanelProps {
  value: string;
  children: ReactNode;
}

const PanelRoot = styled.div`
  padding: 16px 0;
`;

export const TabPanel = ({ value, children }: TabPanelProps) => {
  const { value: active, baseId } = useTabsContext();
  if (active !== value) return null;
  return (
    <PanelRoot
      role="tabpanel"
      id={`${baseId}-panel-${value}`}
      aria-labelledby={`${baseId}-tab-${value}`}
    >
      {children}
    </PanelRoot>
  );
};
