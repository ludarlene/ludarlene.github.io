import styled from 'styled-components';
import { useState, useRef, useMemo, useId } from 'react';
import type { ReactNode } from 'react';
import { FormField } from '../_shared/FormField';
import { useClickOutside } from '../_shared/useClickOutside';
import { ChevronLeftIcon, ChevronRightIcon, CalendarIcon } from '../_shared/icons';

export interface DatePickerProps {
  label?: ReactNode;
  required?: boolean;
  helperText?: ReactNode;
  errorText?: ReactNode;
  placeholder?: string;
  /** 受控值（YYYY-MM-DD） */
  value?: string;
  /** 預設值 */
  defaultValue?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  readOnly?: boolean;
  fullWidth?: boolean;
  /** 最小日期（YYYY-MM-DD） */
  min?: string;
  /** 最大日期（YYYY-MM-DD） */
  max?: string;
  /** 日期格式顯示函式 */
  formatDisplay?: (value: string) => string;
  className?: string;
}

const Wrapper = styled.div<{ $fullWidth?: boolean }>`
  position: relative;
  width: ${({ $fullWidth }) => ($fullWidth ? '100%' : '256px')};
`;

const Trigger = styled.button<{ $open: boolean; $hasError?: boolean }>`
  width: 100%;
  height: 56px;
  padding: 0 16px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme }) => theme.semantic.background.bright};
  border: 1px solid
    ${({ theme, $hasError, $open }) =>
      $hasError
        ? theme.semantic.error.main
        : $open
          ? theme.semantic.primary.main
          : theme.semantic.background.transparent10};
  color: ${({ theme }) => theme.semantic.text.high};
  font-family: ${({ theme }) => theme.fontFamily.primary};
  font-size: 16px;
  text-align: left;
  cursor: pointer;
  transition: border-color 150ms ease, box-shadow 150ms ease;

  ${({ $open, theme, $hasError }) =>
    $open &&
    `box-shadow: 0 0 0 3px ${$hasError ? theme.semantic.error.surface : theme.semantic.primary.surface};`}

  &:disabled {
    background: ${({ theme }) => theme.semantic.button.disable};
    color: ${({ theme }) => theme.semantic.text.lower};
    cursor: not-allowed;
  }
`;

const ValueText = styled.span<{ $isPlaceholder?: boolean }>`
  flex: 1;
  color: ${({ theme, $isPlaceholder }) =>
    $isPlaceholder ? theme.semantic.text.lower : 'inherit'};
`;

const Popup = styled.div`
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  z-index: 100;
  width: 320px;
  padding: 16px;
  background: ${({ theme }) => theme.semantic.background.bright};
  border: 1px solid ${({ theme }) => theme.semantic.background.transparent10};
  border-radius: ${({ theme }) => theme.radius.md};
  box-shadow: ${({ theme }) => theme.shadows.hero};
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
`;

const NavButton = styled.button.attrs({ type: 'button' })`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background: transparent;
  color: ${({ theme }) => theme.semantic.text.middle};
  border: 0;
  border-radius: ${({ theme }) => theme.radius.sm};
  cursor: pointer;
  &:hover {
    background: ${({ theme }) => theme.semantic.background.transparent10};
    color: ${({ theme }) => theme.semantic.text.high};
  }
`;

const MonthLabel = styled.div`
  font-size: 14px;
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  color: ${({ theme }) => theme.semantic.text.high};
`;

const WeekRow = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 2px;
  margin-bottom: 4px;
`;

const WeekDay = styled.div`
  text-align: center;
  font-size: 12px;
  color: ${({ theme }) => theme.semantic.text.middle};
  padding: 4px 0;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 2px;
`;

const DayCell = styled.button<{
  $selected?: boolean;
  $today?: boolean;
  $muted?: boolean;
  $disabled?: boolean;
}>`
  height: 36px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: ${({ theme }) => theme.radius.sm};
  background: ${({ $selected, theme }) =>
    $selected ? theme.semantic.primary.main : 'transparent'};
  color: ${({ $selected, $muted, $disabled, theme }) =>
    $disabled
      ? theme.semantic.text.lower
      : $selected
        ? theme.semantic.text.white
        : $muted
          ? theme.semantic.text.lower
          : theme.semantic.text.high};
  border: ${({ $today, $selected, theme }) =>
    $today && !$selected ? `1px solid ${theme.semantic.primary.main}` : '0'};
  font-family: ${({ theme }) => theme.fontFamily.primary};
  font-size: 13px;
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};

  &:hover:not(:disabled) {
    background: ${({ $selected, theme }) =>
      $selected ? theme.semantic.primary.light : theme.semantic.background.transparent10};
  }
`;

// === 日期工具函式 ===
function pad(n: number) {
  return n.toString().padStart(2, '0');
}
function formatYMD(d: Date) {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}
function parseYMD(s: string): Date | null {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(s)) return null;
  const [y, m, d] = s.split('-').map(Number);
  const date = new Date(y, m - 1, d);
  return Number.isNaN(date.getTime()) ? null : date;
}
function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

const WEEK_DAYS = ['日', '一', '二', '三', '四', '五', '六'];

function buildMonthGrid(year: number, month: number) {
  // 找出該月 1 號是星期幾
  const firstDay = new Date(year, month, 1);
  const startOffset = firstDay.getDay();
  // 從上個月的尾巴開始填，共填 42 格（6 週）
  const startDate = new Date(year, month, 1 - startOffset);
  const cells: { date: Date; muted: boolean }[] = [];
  for (let i = 0; i < 42; i++) {
    const d = new Date(startDate);
    d.setDate(startDate.getDate() + i);
    cells.push({ date: d, muted: d.getMonth() !== month });
  }
  return cells;
}

export const DatePicker = ({
  label,
  required,
  helperText,
  errorText,
  placeholder = 'YYYY / MM / DD',
  value,
  defaultValue,
  onChange,
  disabled,
  readOnly,
  fullWidth,
  min,
  max,
  formatDisplay,
  className,
}: DatePickerProps) => {
  const [open, setOpen] = useState(false);
  const [internalValue, setInternalValue] = useState(defaultValue ?? '');
  const wrapperRef = useRef<HTMLDivElement>(null);
  const id = useId();

  const currentValue = value ?? internalValue;
  const currentDate = parseYMD(currentValue);
  const today = new Date();
  const minDate = min ? parseYMD(min) : null;
  const maxDate = max ? parseYMD(max) : null;

  // 月曆顯示的年月
  const [viewMonth, setViewMonth] = useState(() => {
    const ref = currentDate ?? today;
    return { year: ref.getFullYear(), month: ref.getMonth() };
  });

  const interactive = !disabled && !readOnly;
  useClickOutside([wrapperRef], () => setOpen(false), open);

  const cells = useMemo(
    () => buildMonthGrid(viewMonth.year, viewMonth.month),
    [viewMonth],
  );

  const selectDate = (date: Date) => {
    const v = formatYMD(date);
    if (value === undefined) setInternalValue(v);
    onChange?.(v);
    setOpen(false);
  };

  const isDisabled = (d: Date) => {
    if (minDate && d < minDate) return true;
    if (maxDate && d > maxDate) return true;
    return false;
  };

  const displayValue = currentValue
    ? formatDisplay
      ? formatDisplay(currentValue)
      : currentValue.replace(/-/g, ' / ')
    : '';

  const monthLabel = `${viewMonth.year} 年 ${viewMonth.month + 1} 月`;

  const goPrev = () =>
    setViewMonth((v) =>
      v.month === 0
        ? { year: v.year - 1, month: 11 }
        : { year: v.year, month: v.month - 1 },
    );
  const goNext = () =>
    setViewMonth((v) =>
      v.month === 11
        ? { year: v.year + 1, month: 0 }
        : { year: v.year, month: v.month + 1 },
    );

  return (
    <FormField
      label={label}
      required={required}
      helperText={helperText}
      errorText={errorText}
      hasError={!!errorText}
      htmlFor={id}
    >
      <Wrapper ref={wrapperRef} $fullWidth={fullWidth} className={className}>
        <Trigger
          id={id}
          type="button"
          $open={open}
          $hasError={!!errorText}
          disabled={disabled}
          onClick={() => interactive && setOpen((v) => !v)}
        >
          <ValueText $isPlaceholder={!displayValue}>
            {displayValue || placeholder}
          </ValueText>
          <CalendarIcon size={20} />
        </Trigger>
        {open && (
          <Popup role="dialog">
            <Header>
              <NavButton onClick={goPrev} aria-label="上個月">
                <ChevronLeftIcon size={18} />
              </NavButton>
              <MonthLabel>{monthLabel}</MonthLabel>
              <NavButton onClick={goNext} aria-label="下個月">
                <ChevronRightIcon size={18} />
              </NavButton>
            </Header>
            <WeekRow>
              {WEEK_DAYS.map((d) => (
                <WeekDay key={d}>{d}</WeekDay>
              ))}
            </WeekRow>
            <Grid>
              {cells.map(({ date, muted }) => {
                const dis = isDisabled(date);
                const selected = currentDate
                  ? isSameDay(date, currentDate)
                  : false;
                const isToday = isSameDay(date, today);
                return (
                  <DayCell
                    key={date.toISOString()}
                    type="button"
                    $selected={selected}
                    $today={isToday}
                    $muted={muted}
                    $disabled={dis}
                    disabled={dis}
                    onClick={() => selectDate(date)}
                  >
                    {date.getDate()}
                  </DayCell>
                );
              })}
            </Grid>
          </Popup>
        )}
      </Wrapper>
    </FormField>
  );
};

DatePicker.displayName = 'DatePicker';
