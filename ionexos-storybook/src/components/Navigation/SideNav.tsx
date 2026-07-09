import styled, { css } from 'styled-components';
import { useState } from 'react';
import type { HTMLAttributes, ReactNode } from 'react';
import { ChevronDownIcon } from '../_shared/icons';

export interface SideNavItem {
  /** 唯一識別 */
  id: string;
  /** 顯示標籤 */
  label: ReactNode;
  /** 左側 icon（Main item 用，Sub item 會忽略以符合 Figma 規格） */
  icon?: ReactNode;
  /** 右側徽章（計數、Badge、Trial 標籤） */
  badge?: ReactNode;
  /** 子層項目（會自動顯示展開箭頭） */
  children?: SideNavItem[];
  /** 停用 */
  disabled?: boolean;
}

export interface SideNavProps extends Omit<HTMLAttributes<HTMLElement>, 'onChange'> {
  /** 導覽項目清單 */
  items: SideNavItem[];
  /** 目前選中的 id */
  value?: string;
  /** 選中變更回呼 */
  onChange?: (id: string, item: SideNavItem) => void;
  /** 收合模式（只顯示 icon，寬度 56px） */
  collapsed?: boolean;
  /** Logo 或品牌區內容（位於頂部） */
  header?: ReactNode;
  /** Footer 區內容（位於底部） */
  footer?: ReactNode;
  /** 寬度。collapsed 時固定 56px（對應 Figma） */
  width?: number;
}

// === Figma 規格 ===
// NavItem 尺寸：240×48 (open) / 56×48 (closed)
// 顏色：
//   - Default: text/middle (#8a8fa7), 透明背景
//   - Hover:   text/high (#eaedf0), 背景 table/hover (#2a3966), 右側 4px highlight
//   - Active:  text/high (#eaedf0), 背景 button/focus (#384c8a), 右側 4px highlight
// Icon 位置：left 16px, 24×24
// Text 位置：left 52px (icon + gap)
// Sub item：無 icon、無 chevron，但保持 left 52px 縮排

const Aside = styled.aside<{ $width: number; $collapsed: boolean }>`
  display: flex;
  flex-direction: column;
  width: ${({ $collapsed, $width }) => ($collapsed ? 56 : $width)}px;
  height: 100%;
  min-height: 100vh;
  background: ${({ theme }) => theme.semantic.background.bar};
  border-right: 1px solid ${({ theme }) => theme.semantic.background.transparent10};
  font-family: ${({ theme }) => theme.fontFamily.primary};
  transition: width 200ms ease;
  overflow: hidden;
`;

const Header = styled.div<{ $collapsed: boolean }>`
  display: flex;
  align-items: center;
  padding: ${({ $collapsed }) => ($collapsed ? '16px 0' : '16px 20px')};
  justify-content: ${({ $collapsed }) => ($collapsed ? 'center' : 'flex-start')};
  min-height: 56px;
  border-bottom: 1px solid ${({ theme }) => theme.semantic.background.transparent10};
`;

const ItemList = styled.nav`
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
`;

const FooterArea = styled.div<{ $collapsed: boolean }>`
  padding: ${({ $collapsed }) => ($collapsed ? '8px 0' : '12px 16px')};
  border-top: 1px solid ${({ theme }) => theme.semantic.background.transparent10};
`;

type ItemState = 'default' | 'hover' | 'active';
type ItemKind = 'main' | 'sub';

/**
 * 對應 Figma：Navigation 元件
 * 屬性組合：NavItem (Main/Sub) × Status (Opened/Closed) × State (Default/Hover/Active)
 */
const NavItem = styled.button.attrs({ type: 'button' })<{
  $kind: ItemKind;
  $active: boolean;
  $collapsed: boolean;
  $disabled?: boolean;
}>`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  height: 48px;
  background: ${({ $active, theme }) =>
    $active ? theme.semantic.button.focus : 'transparent'};
  border: 0;
  padding: 0;
  font-family: inherit;
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};
  text-align: left;
  transition:
    background-color 150ms ease,
    color 150ms ease;

  /* 右側 4px highlight 邊條（active 時顯示） */
  ${({ $active, theme }) =>
    $active &&
    css`
      &::after {
        content: '';
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        width: 4px;
        background: ${theme.semantic.text.highlight};
      }
    `}

  &:hover:not(:disabled) {
    background: ${({ $active, theme }) =>
      $active ? theme.semantic.button.focus : theme.semantic.table.hover};

    /* hover 時也顯示 4px 高亮邊條（對應 Figma Hover 規格） */
    &::after {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      width: 4px;
      background: ${({ theme }) => theme.semantic.text.highlight};
    }
  }

  &:focus-visible {
    outline: none;
    box-shadow: inset 0 0 0 2px ${({ theme }) => theme.semantic.primary.main};
  }

  ${({ $disabled }) =>
    $disabled &&
    css`
      opacity: 0.4;
    `}
`;

const IconSlot = styled.span<{ $active: boolean; $collapsed: boolean }>`
  position: absolute;
  left: ${({ $collapsed }) => ($collapsed ? '50%' : '16px')};
  top: 50%;
  transform: ${({ $collapsed }) =>
    $collapsed ? 'translate(-50%, -50%)' : 'translateY(-50%)'};
  width: 24px;
  height: 24px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  /* 對應 Figma 規格：icon 顏色與文字一致 — Default 用 text/middle，Active/Hover 用 text/high */
  color: ${({ $active, theme }) =>
    $active ? theme.semantic.text.high : theme.semantic.text.middle};
  transition: color 150ms ease;

  ${NavItem}:hover:not(:disabled) & {
    color: ${({ theme }) => theme.semantic.text.high};
  }
`;

const LabelSlot = styled.span<{
  $active: boolean;
  $collapsed: boolean;
  $hasIcon: boolean;
  $hasChevron: boolean;
}>`
  position: absolute;
  /* Figma 規格：有 icon 時 left 52px（16 + 24 + 12），無 icon 時也保持 52px 縮排（sub item） */
  left: 52px;
  top: 50%;
  transform: translateY(-50%);
  /* 有 chevron 時預留右側空間（chevron 20px + right padding） */
  right: ${({ $hasChevron }) => ($hasChevron ? '44px' : '16px')};
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 14px;
  font-weight: ${({ theme }) => theme.fontWeight.regular};
  letter-spacing: 0.25px;
  color: ${({ $active, theme }) =>
    $active ? theme.semantic.text.high : theme.semantic.text.middle};
  overflow: hidden;
  white-space: nowrap;
  opacity: ${({ $collapsed }) => ($collapsed ? 0 : 1)};
  transition: opacity 150ms ease, color 150ms ease;

  ${NavItem}:hover:not(:disabled) & {
    color: ${({ theme }) => theme.semantic.text.high};
  }
`;

const LabelText = styled.span`
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const BadgeSlot = styled.span<{ $collapsed: boolean }>`
  display: inline-flex;
  align-items: center;
  flex-shrink: 0;
  opacity: ${({ $collapsed }) => ($collapsed ? 0 : 1)};
`;

const Chevron = styled.span<{ $open: boolean; $collapsed: boolean }>`
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%)
    rotate(${({ $open }) => ($open ? '180deg' : '0')});
  display: inline-flex;
  align-items: center;
  color: ${({ theme }) => theme.semantic.text.middle};
  transition: transform 200ms ease;
  opacity: ${({ $collapsed }) => ($collapsed ? 0 : 1)};

  ${NavItem}:hover:not(:disabled) & {
    color: ${({ theme }) => theme.semantic.text.high};
  }
`;

interface ItemNodeProps {
  item: SideNavItem;
  kind: ItemKind;
  value?: string;
  onChange?: (id: string, item: SideNavItem) => void;
  collapsed: boolean;
}

const ItemNode = ({ item, kind, value, onChange, collapsed }: ItemNodeProps) => {
  const hasChildren = !!item.children && item.children.length > 0;
  const isActive = value === item.id;
  const childActive =
    hasChildren && item.children!.some((c) => c.id === value);
  const [open, setOpen] = useState(childActive || isActive);

  const handleClick = () => {
    if (item.disabled) return;
    if (hasChildren) {
      setOpen((v) => !v);
    } else {
      onChange?.(item.id, item);
    }
  };

  // Sub item 在 Figma 規格中無 icon，但保持 left 52px 縮排
  const showIcon = kind === 'main' && !!item.icon;
  const showChevron = hasChildren && kind === 'main';

  return (
    <>
      <NavItem
        $kind={kind}
        $active={isActive}
        $collapsed={collapsed}
        $disabled={item.disabled}
        disabled={item.disabled}
        onClick={handleClick}
        aria-expanded={hasChildren ? open : undefined}
        title={collapsed ? String(item.label) : undefined}
      >
        {showIcon && (
          <IconSlot $active={isActive} $collapsed={collapsed}>
            {item.icon}
          </IconSlot>
        )}
        <LabelSlot
          $active={isActive}
          $collapsed={collapsed}
          $hasIcon={showIcon}
          $hasChevron={showChevron}
        >
          <LabelText>{item.label}</LabelText>
          {item.badge && <BadgeSlot $collapsed={collapsed}>{item.badge}</BadgeSlot>}
        </LabelSlot>
        {showChevron && (
          <Chevron $open={open} $collapsed={collapsed}>
            <ChevronDownIcon size={20} />
          </Chevron>
        )}
      </NavItem>
      {hasChildren && open && !collapsed && (
        <>
          {item.children!.map((c) => (
            <ItemNode
              key={c.id}
              item={c}
              kind="sub"
              value={value}
              onChange={onChange}
              collapsed={collapsed}
            />
          ))}
        </>
      )}
    </>
  );
};

export const SideNav = ({
  items,
  value,
  onChange,
  collapsed = false,
  header,
  footer,
  width = 240,
  ...rest
}: SideNavProps) => {
  return (
    <Aside $width={width} $collapsed={collapsed} {...rest}>
      {header && <Header $collapsed={collapsed}>{header}</Header>}
      <ItemList>
        {items.map((item) => (
          <ItemNode
            key={item.id}
            item={item}
            kind="main"
            value={value}
            onChange={onChange}
            collapsed={collapsed}
          />
        ))}
      </ItemList>
      {footer && <FooterArea $collapsed={collapsed}>{footer}</FooterArea>}
    </Aside>
  );
};

SideNav.displayName = 'SideNav';
