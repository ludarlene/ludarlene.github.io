import styled, { css } from 'styled-components';
import {
  useState,
  useRef,
  useId,
  useMemo,
  forwardRef,
  useImperativeHandle,
} from 'react';
import type { ReactNode, KeyboardEvent } from 'react';
import { FormField } from '../_shared/FormField';
import { useClickOutside } from '../_shared/useClickOutside';
import {
  ChevronDownIcon,
  SearchIcon,
  CheckIcon,
  CloseIcon,
} from '../_shared/icons';

export interface SelectOption<T = string> {
  value: T;
  label: ReactNode;
  description?: ReactNode;
  disabled?: boolean;
}

export type SelectStatus = 'default' | 'error' | 'disabled' | 'readOnly';

export interface SelectProps<T = string> {
  label?: ReactNode;
  required?: boolean;
  helperText?: ReactNode;
  errorText?: ReactNode;
  /** 顯式狀態 */
  status?: SelectStatus;
  /** Placeholder */
  placeholder?: string;
  /** 選項清單 */
  options: SelectOption<T>[];
  /** 受控值（單選）*/
  value?: T;
  /** 受控值（多選）*/
  values?: T[];
  /** 是否多選 */
  multiple?: boolean;
  /** 是否顯示搜尋框 */
  searchable?: boolean;
  /** 變更回呼 */
  onChange?: (value: T | T[] | null) => void;
  /** Disabled */
  disabled?: boolean;
  /** ReadOnly */
  readOnly?: boolean;
  /** 容器寬度 */
  fullWidth?: boolean;
  /** 預設展開（除錯用） */
  defaultOpen?: boolean;
  className?: string;
}

const Wrapper = styled.div<{ $fullWidth?: boolean }>`
  position: relative;
  width: ${({ $fullWidth }) => ($fullWidth ? '100%' : '256px')};
`;

const Trigger = styled.button<{ $status: SelectStatus; $open: boolean }>`
  width: 100%;
  height: 56px;
  padding: 0 16px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme }) => theme.semantic.background.bright};
  border: 1px solid ${({ theme }) => theme.semantic.background.transparent10};
  color: ${({ theme }) => theme.semantic.text.high};
  font-family: ${({ theme }) => theme.fontFamily.primary};
  font-size: 16px;
  text-align: left;
  cursor: pointer;
  transition:
    border-color 150ms ease,
    box-shadow 150ms ease;

  &:hover:not(:disabled) {
    border-color: ${({ theme }) => theme.semantic.background.transparent30};
  }

  &:focus-visible {
    outline: none;
    border-color: ${({ theme }) => theme.semantic.primary.main};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.semantic.primary.surface};
  }

  ${({ $open, theme }) =>
    $open &&
    css`
      border-color: ${theme.semantic.primary.main};
      box-shadow: 0 0 0 3px ${theme.semantic.primary.surface};
    `}

  ${({ $status, theme }) => {
    switch ($status) {
      case 'error':
        return css`
          border-color: ${theme.semantic.error.main};
        `;
      case 'disabled':
        return css`
          background: ${theme.semantic.button.disable};
          color: ${theme.semantic.text.lower};
          border-color: transparent;
          cursor: not-allowed;
        `;
      case 'readOnly':
        return css`
          background: ${theme.semantic.background.transparent5};
          cursor: default;
        `;
      default:
        return '';
    }
  }}
`;

const ValueText = styled.span<{ $isPlaceholder?: boolean }>`
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: ${({ theme, $isPlaceholder }) =>
    $isPlaceholder ? theme.semantic.text.lower : 'inherit'};
`;

const ChipsRow = styled.span`
  display: inline-flex;
  flex-wrap: wrap;
  gap: 4px;
  flex: 1;
  min-width: 0;
`;

const Chip = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  height: 24px;
  padding: 0 8px;
  border-radius: 4px;
  background: ${({ theme }) => theme.semantic.primary.surface};
  color: ${({ theme }) => theme.semantic.primary.light};
  font-size: 13px;
`;

const ChipRemove = styled.button.attrs({ type: 'button' })`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  color: inherit;
  border: 0;
  padding: 0;
  cursor: pointer;
  &:hover {
    color: ${({ theme }) => theme.semantic.text.white};
  }
`;

const ChevronIconWrap = styled.span<{ $open: boolean }>`
  display: inline-flex;
  color: ${({ theme }) => theme.semantic.text.middle};
  transform: rotate(${({ $open }) => ($open ? '180deg' : '0')});
  transition: transform 200ms ease;
`;

const Popup = styled.div`
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  right: 0;
  z-index: 100;
  background: ${({ theme }) => theme.semantic.background.bright};
  border: 1px solid ${({ theme }) => theme.semantic.background.transparent10};
  border-radius: ${({ theme }) => theme.radius.md};
  box-shadow: ${({ theme }) => theme.shadows.hero};
  overflow: hidden;
  display: flex;
  flex-direction: column;
  max-height: 320px;
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
  font-family: ${({ theme }) => theme.fontFamily.primary};
  font-size: 14px;
  color: ${({ theme }) => theme.semantic.text.high};
  &::placeholder {
    color: ${({ theme }) => theme.semantic.text.lower};
  }
`;

const OptionList = styled.ul`
  flex: 1;
  overflow-y: auto;
  list-style: none;
  margin: 0;
  padding: 4px 0;
`;

const OptionItem = styled.li<{
  $active: boolean;
  $selected: boolean;
  $disabled?: boolean;
}>`
  display: flex;
  align-items: center;
  gap: 8px;
  min-height: 40px;
  padding: 8px 12px;
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};
  font-family: ${({ theme }) => theme.fontFamily.primary};
  font-size: 14px;
  color: ${({ theme, $disabled }) =>
    $disabled ? theme.semantic.text.lower : theme.semantic.text.high};
  background: ${({ $active, theme }) =>
    $active ? theme.semantic.background.transparent10 : 'transparent'};

  ${({ $selected, theme }) =>
    $selected &&
    css`
      background: ${theme.semantic.primary.surface};
      color: ${theme.semantic.primary.light};
    `}

  &:hover {
    ${({ $disabled, theme, $selected }) =>
      !$disabled &&
      !$selected &&
      css`
        background: ${theme.semantic.background.transparent10};
      `}
  }
`;

const OptionLabel = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 0;
`;

const OptionDescription = styled.span`
  font-size: 12px;
  color: ${({ theme }) => theme.semantic.text.middle};
  letter-spacing: 0.4px;
`;

const EmptyState = styled.div`
  padding: 24px 12px;
  text-align: center;
  color: ${({ theme }) => theme.semantic.text.middle};
  font-size: 13px;
`;

export interface SelectRef {
  open: () => void;
  close: () => void;
  focus: () => void;
}

function SelectInner<T extends string | number>(
  {
    label,
    required,
    helperText,
    errorText,
    status,
    placeholder = '請選擇',
    options,
    value,
    values,
    multiple = false,
    searchable = false,
    onChange,
    disabled,
    readOnly,
    fullWidth,
    defaultOpen = false,
    className,
  }: SelectProps<T>,
  ref: React.Ref<SelectRef>,
) {
  const [open, setOpen] = useState(defaultOpen);
  const [activeIndex, setActiveIndex] = useState(0);
  const [search, setSearch] = useState('');

  const wrapperRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const id = useId();

  const resolvedStatus: SelectStatus =
    status ??
    (errorText
      ? 'error'
      : disabled
        ? 'disabled'
        : readOnly
          ? 'readOnly'
          : 'default');

  const interactive =
    resolvedStatus !== 'disabled' && resolvedStatus !== 'readOnly';

  useImperativeHandle(ref, () => ({
    open: () => interactive && setOpen(true),
    close: () => setOpen(false),
    focus: () => triggerRef.current?.focus(),
  }));

  useClickOutside([wrapperRef], () => setOpen(false), open);

  const filteredOptions = useMemo(() => {
    if (!searchable || !search) return options;
    const s = search.toLowerCase();
    return options.filter((o) =>
      String(o.label ?? '')
        .toLowerCase()
        .includes(s),
    );
  }, [options, searchable, search]);

  const isSelected = (val: T) => {
    if (multiple) return (values ?? []).includes(val);
    return value === val;
  };

  const handleSelect = (opt: SelectOption<T>) => {
    if (opt.disabled) return;
    if (multiple) {
      const current = values ?? [];
      const next = current.includes(opt.value)
        ? current.filter((v) => v !== opt.value)
        : [...current, opt.value];
      onChange?.(next);
    } else {
      onChange?.(opt.value);
      setOpen(false);
    }
  };

  const handleRemoveChip = (e: React.MouseEvent, val: T) => {
    e.stopPropagation();
    if (!multiple) return;
    onChange?.((values ?? []).filter((v) => v !== val));
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (!interactive) return;
    if (!open) {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
        e.preventDefault();
        setOpen(true);
      }
      return;
    }
    if (e.key === 'Escape') {
      setOpen(false);
      return;
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, filteredOptions.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const opt = filteredOptions[activeIndex];
      if (opt) handleSelect(opt);
    }
  };

  const displayContent = () => {
    if (multiple) {
      if (!values || values.length === 0)
        return <ValueText $isPlaceholder>{placeholder}</ValueText>;
      return (
        <ChipsRow>
          {values.map((v) => {
            const opt = options.find((o) => o.value === v);
            if (!opt) return null;
            return (
              <Chip key={String(v)}>
                {opt.label}
                {interactive && (
                  <ChipRemove
                    onClick={(e) => handleRemoveChip(e, v)}
                    aria-label={`移除 ${opt.label}`}
                  >
                    <CloseIcon size={12} />
                  </ChipRemove>
                )}
              </Chip>
            );
          })}
        </ChipsRow>
      );
    }
    const selectedOpt = options.find((o) => o.value === value);
    if (!selectedOpt)
      return <ValueText $isPlaceholder>{placeholder}</ValueText>;
    return <ValueText>{selectedOpt.label}</ValueText>;
  };

  return (
    <FormField
      label={label}
      required={required}
      helperText={helperText}
      errorText={errorText}
      hasError={resolvedStatus === 'error'}
      htmlFor={id}
    >
      <Wrapper ref={wrapperRef} $fullWidth={fullWidth} className={className}>
        <Trigger
          ref={triggerRef}
          id={id}
          type="button"
          $status={resolvedStatus}
          $open={open}
          disabled={resolvedStatus === 'disabled'}
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-invalid={resolvedStatus === 'error'}
          onClick={() => interactive && setOpen((v) => !v)}
          onKeyDown={handleKeyDown}
        >
          {displayContent()}
          <ChevronIconWrap $open={open}>
            <ChevronDownIcon size={20} />
          </ChevronIconWrap>
        </Trigger>
        {open && (
          <Popup role="listbox">
            {searchable && (
              <SearchRow>
                <SearchIcon size={16} />
                <SearchInput
                  autoFocus
                  placeholder="搜尋"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </SearchRow>
            )}
            <OptionList>
              {filteredOptions.length === 0 ? (
                <EmptyState>沒有符合的選項</EmptyState>
              ) : (
                filteredOptions.map((opt, idx) => {
                  const selected = isSelected(opt.value);
                  return (
                    <OptionItem
                      key={String(opt.value)}
                      role="option"
                      aria-selected={selected}
                      $active={idx === activeIndex}
                      $selected={selected}
                      $disabled={opt.disabled}
                      onMouseEnter={() => setActiveIndex(idx)}
                      onClick={() => handleSelect(opt)}
                    >
                      <OptionLabel>
                        {opt.label}
                        {opt.description && (
                          <OptionDescription>
                            {opt.description}
                          </OptionDescription>
                        )}
                      </OptionLabel>
                      {selected && <CheckIcon size={16} />}
                    </OptionItem>
                  );
                })
              )}
            </OptionList>
          </Popup>
        )}
      </Wrapper>
    </FormField>
  );
}

export const Select = forwardRef(SelectInner) as <T extends string | number>(
  props: SelectProps<T> & { ref?: React.Ref<SelectRef> },
) => ReturnType<typeof SelectInner>;
