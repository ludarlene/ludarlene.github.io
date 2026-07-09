import styled, { css } from 'styled-components';
import { useState, useRef } from 'react';
import type { ReactNode, HTMLAttributes, Key } from 'react';
import { useClickOutside } from '../_shared/useClickOutside';
import { Portal } from '../_shared/Portal';
import {
  ChevronDownIcon,
  SearchIcon,
  CheckIcon,
  BuildingIcon,
  SwitchOrgIcon,
} from '../_shared/icons';

export interface Organization {
  /** 唯一識別 */
  id: Key;
  /** 組織名稱 */
  name: string;
  /** 副資訊（角色、地區、成員數） */
  subtitle?: string;
  /** 自訂左側 icon / avatar */
  avatar?: ReactNode;
  /** 停用 */
  disabled?: boolean;
}

export type OrgPickerStatus = 'off' | 'on' | 'on-error';
export type OrgPickerMode = 'single' | 'multiple';

export interface OrganizationPickerProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** 組織清單 */
  organizations: Organization[];
  /** 模式 */
  mode?: OrgPickerMode;
  /** 受控值（single：單一 id，multiple：id 陣列） */
  value?: Key | Key[];
  /** 變更回呼 */
  onChange?: (value: Key | Key[]) => void;
  /** 錯誤狀態（例如沒有權限的組織被選中） */
  hasError?: boolean;
  /** 錯誤訊息 */
  errorText?: ReactNode;
  /** Placeholder */
  placeholder?: string;
  /** 是否顯示搜尋框 */
  searchable?: boolean;
}

const Root = styled.div`
  position: relative;
  font-family: ${({ theme }) => theme.fontFamily.primary};
  width: 282px;
`;

const Trigger = styled.button.attrs({ type: 'button' })<{
  $status: OrgPickerStatus;
  $open: boolean;
}>`
  width: 100%;
  height: 36px;
  padding: 0 8px 0 12px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: ${({ theme }) => theme.semantic.background.bright};
  border: 1px solid
    ${({ $status, $open, theme }) =>
      $status === 'on-error'
        ? theme.semantic.error.main
        : $open
          ? theme.semantic.primary.main
          : $status === 'on'
            ? theme.semantic.primary.surface
            : theme.semantic.background.transparent10};
  border-radius: ${({ theme }) => theme.radius.md};
  color: ${({ theme }) => theme.semantic.text.high};
  font-family: inherit;
  font-size: 13px;
  cursor: pointer;
  text-align: left;
  transition: border-color 150ms ease, background-color 150ms ease;

  ${({ $status, theme }) =>
    $status === 'on' &&
    css`
      background: ${theme.semantic.primary.surface};
    `}

  &:hover {
    border-color: ${({ $status, theme }) =>
      $status === 'on-error'
        ? theme.semantic.error.light
        : theme.semantic.primary.main};
  }

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 2px ${({ theme }) => theme.semantic.primary.surface};
  }
`;

const Icon = styled.span<{ $tone: 'normal' | 'error' }>`
  display: inline-flex;
  align-items: center;
  color: ${({ theme, $tone }) =>
    $tone === 'error' ? theme.semantic.error.main : theme.semantic.primary.light};
  flex-shrink: 0;
`;

const Label = styled.span<{ $isPlaceholder?: boolean }>`
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: ${({ $isPlaceholder, theme }) =>
    $isPlaceholder ? theme.semantic.text.lower : 'inherit'};
`;

const Count = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 18px;
  height: 18px;
  padding: 0 5px;
  border-radius: 9px;
  background: ${({ theme }) => theme.semantic.primary.main};
  color: ${({ theme }) => theme.semantic.text.white};
  font-size: 11px;
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  flex-shrink: 0;
`;

const ChevronWrap = styled.span<{ $open: boolean }>`
  display: inline-flex;
  align-items: center;
  color: ${({ theme }) => theme.semantic.text.middle};
  transform: rotate(${({ $open }) => ($open ? '180deg' : '0')});
  transition: transform 200ms ease;
`;

const ErrorText = styled.div`
  margin-top: 4px;
  font-size: 12px;
  color: ${({ theme }) => theme.semantic.error.main};
  letter-spacing: 0.4px;
`;

// 浮動 menu（用 portal 渲染）
const Menu = styled.div`
  position: absolute;
  z-index: 100;
  min-width: 282px;
  background: ${({ theme }) => theme.semantic.background.bright};
  border: 1px solid ${({ theme }) => theme.semantic.background.transparent10};
  border-radius: ${({ theme }) => theme.radius.md};
  box-shadow: ${({ theme }) => theme.shadows.hero};
  display: flex;
  flex-direction: column;
  max-height: 360px;
  overflow: hidden;
  font-family: ${({ theme }) => theme.fontFamily.primary};
`;

const SearchRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border-bottom: 1px solid ${({ theme }) => theme.semantic.background.transparent10};
  color: ${({ theme }) => theme.semantic.text.middle};
`;

const SearchInput = styled.input`
  flex: 1;
  background: transparent;
  border: 0;
  outline: 0;
  font-family: inherit;
  font-size: 13px;
  color: ${({ theme }) => theme.semantic.text.high};
  &::placeholder {
    color: ${({ theme }) => theme.semantic.text.lower};
  }
`;

const List = styled.ul`
  flex: 1;
  overflow-y: auto;
  list-style: none;
  margin: 0;
  padding: 4px 0;
`;

const Item = styled.li<{ $selected: boolean; $disabled?: boolean }>`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 12px;
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};
  color: ${({ theme, $disabled }) =>
    $disabled ? theme.semantic.text.lower : theme.semantic.text.high};
  background: ${({ $selected, theme }) =>
    $selected ? theme.semantic.primary.surface : 'transparent'};
  font-size: 13px;
  &:hover {
    ${({ $disabled, $selected, theme }) =>
      !$disabled &&
      !$selected &&
      css`
        background: ${theme.semantic.background.transparent10};
      `}
  }
`;

const OrgName = styled.div`
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  color: ${({ theme }) => theme.semantic.text.high};
  line-height: 1.4;
`;

const OrgSub = styled.div`
  font-size: 11px;
  color: ${({ theme }) => theme.semantic.text.middle};
  letter-spacing: 0.4px;
  line-height: 1.4;
`;

export const OrganizationPicker = ({
  organizations,
  mode = 'single',
  value,
  onChange,
  hasError,
  errorText,
  placeholder = '選擇組織',
  searchable = true,
  ...rest
}: OrganizationPickerProps) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const wrapperRef = useRef<HTMLDivElement>(null);

  useClickOutside([wrapperRef], () => setOpen(false), open);

  const selectedIds = Array.isArray(value)
    ? value
    : value !== undefined
      ? [value]
      : [];

  const selectedOrgs = organizations.filter((o) => selectedIds.includes(o.id));
  const status: OrgPickerStatus = hasError
    ? 'on-error'
    : selectedOrgs.length > 0
      ? 'on'
      : 'off';

  const filteredList = search
    ? organizations.filter((o) =>
        o.name.toLowerCase().includes(search.toLowerCase()),
      )
    : organizations;

  const isSelected = (id: Key) => selectedIds.includes(id);

  const handleSelect = (org: Organization) => {
    if (org.disabled) return;
    if (mode === 'single') {
      onChange?.(org.id);
      setOpen(false);
    } else {
      const next = isSelected(org.id)
        ? selectedIds.filter((x) => x !== org.id)
        : [...selectedIds, org.id];
      onChange?.(next);
    }
  };

  const triggerLabel = () => {
    if (selectedOrgs.length === 0) return placeholder;
    if (mode === 'single') return selectedOrgs[0].name;
    if (selectedOrgs.length === 1) return selectedOrgs[0].name;
    return `${selectedOrgs.length} 個組織`;
  };

  return (
    <Root ref={wrapperRef} {...rest}>
      <Trigger
        $status={status}
        $open={open}
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <Icon $tone={status === 'on-error' ? 'error' : 'normal'}>
          {selectedOrgs.length > 0 ? (
            <BuildingIcon size={16} />
          ) : (
            <SwitchOrgIcon size={16} />
          )}
        </Icon>
        <Label $isPlaceholder={selectedOrgs.length === 0}>
          {triggerLabel()}
        </Label>
        {mode === 'multiple' && selectedOrgs.length > 1 && (
          <Count>{selectedOrgs.length}</Count>
        )}
        <ChevronWrap $open={open}>
          <ChevronDownIcon size={16} />
        </ChevronWrap>
      </Trigger>
      {errorText && hasError && <ErrorText role="alert">{errorText}</ErrorText>}
      {open && (
        <Menu
          role="listbox"
          aria-multiselectable={mode === 'multiple'}
          style={{ top: 'calc(100% + 4px)', left: 0 }}
        >
          {searchable && (
            <SearchRow>
              <SearchIcon size={14} />
              <SearchInput
                autoFocus
                placeholder="搜尋組織"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </SearchRow>
          )}
          <List>
            {filteredList.length === 0 ? (
              <li
                style={{
                  padding: '24px 12px',
                  textAlign: 'center',
                  color: '#8a8fa7',
                  fontSize: 13,
                }}
              >
                沒有符合的組織
              </li>
            ) : (
              filteredList.map((org) => (
                <Item
                  key={org.id}
                  role="option"
                  aria-selected={isSelected(org.id)}
                  $selected={isSelected(org.id)}
                  $disabled={org.disabled}
                  onClick={() => handleSelect(org)}
                >
                  {org.avatar ?? <BuildingIcon size={16} />}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <OrgName>{org.name}</OrgName>
                    {org.subtitle && <OrgSub>{org.subtitle}</OrgSub>}
                  </div>
                  {isSelected(org.id) && <CheckIcon size={14} />}
                </Item>
              ))
            )}
          </List>
        </Menu>
      )}
    </Root>
  );
};

OrganizationPicker.displayName = 'OrganizationPicker';
