import styled, { css } from 'styled-components';
import { forwardRef, useId } from 'react';
import type { InputHTMLAttributes, ReactNode } from 'react';
import { FormField } from '../_shared/FormField';
import { LockIcon } from '../_shared/icons';

export type InputStatus =
  | 'default'
  | 'error'
  | 'disabled'
  | 'readOnly'
  | 'viewOnly';

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'prefix'> {
  label?: ReactNode;
  required?: boolean;
  helperText?: ReactNode;
  errorText?: ReactNode;
  /** 顯式設定狀態。若未設定，會依 disabled / readOnly / errorText 推斷 */
  status?: InputStatus;
  /** 左側 icon 或內容 */
  startAdornment?: ReactNode;
  /** 右側 icon 或內容 */
  endAdornment?: ReactNode;
  /** ViewOnly 狀態下顯示的補充標籤（例如「已驗證」） */
  badge?: ReactNode;
  /** 容器寬度 */
  fullWidth?: boolean;
}

const InputContainer = styled.div<{
  $status: InputStatus;
  $focused?: boolean;
  $fullWidth?: boolean;
}>`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  width: ${({ $fullWidth }) => ($fullWidth ? '100%' : '256px')};
  height: 56px;
  padding: 0 16px;
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme }) => theme.semantic.background.bright};
  border: 1px solid ${({ theme }) => theme.semantic.background.transparent10};
  transition:
    border-color 150ms ease,
    background-color 150ms ease;
  font-family: ${({ theme }) => theme.fontFamily.primary};
  cursor: text;

  &:hover {
    border-color: ${({ theme }) => theme.semantic.background.transparent30};
  }

  ${({ $status, theme }) => {
    switch ($status) {
      case 'error':
        return css`
          border-color: ${theme.semantic.error.main};
          &:hover {
            border-color: ${theme.semantic.error.light};
          }
        `;
      case 'disabled':
        return css`
          background: ${theme.semantic.button.disable};
          border-color: transparent;
          cursor: not-allowed;
          &:hover {
            border-color: transparent;
          }
        `;
      case 'readOnly':
        return css`
          background: ${theme.semantic.background.transparent5};
          border-color: ${theme.semantic.background.transparent10};
          cursor: default;
        `;
      case 'viewOnly':
        return css`
          background: transparent;
          border-color: transparent;
          padding: 0;
          cursor: default;
          &:hover {
            border-color: transparent;
          }
        `;
      default:
        return '';
    }
  }}

  ${({ $focused, $status, theme }) =>
    $focused &&
    $status !== 'disabled' &&
    $status !== 'readOnly' &&
    $status !== 'viewOnly' &&
    css`
      border-color: ${$status === 'error'
        ? theme.semantic.error.main
        : theme.semantic.primary.main};
      box-shadow: 0 0 0 3px
        ${$status === 'error'
          ? theme.semantic.error.surface
          : theme.semantic.primary.surface};
    `}
`;

const StyledInput = styled.input<{ $status: InputStatus }>`
  flex: 1;
  min-width: 0;
  height: 100%;
  border: none;
  background: transparent;
  outline: none;
  color: ${({ theme }) => theme.semantic.text.high};
  font-size: 16px;
  font-family: inherit;

  &::placeholder {
    color: ${({ theme }) => theme.semantic.text.lower};
  }

  &:disabled {
    color: ${({ theme }) => theme.semantic.text.lower};
    cursor: not-allowed;
  }

  ${({ $status, theme }) =>
    $status === 'viewOnly' &&
    css`
      color: ${theme.semantic.text.high};
      font-weight: ${theme.fontWeight.medium};
    `}
`;

const Adornment = styled.span<{ $status: InputStatus }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme, $status }) =>
    $status === 'error'
      ? theme.semantic.error.main
      : theme.semantic.text.middle};
  flex-shrink: 0;
`;

const Badge = styled.span`
  display: inline-flex;
  align-items: center;
  height: 22px;
  padding: 0 8px;
  border-radius: 4px;
  background: ${({ theme }) => theme.semantic.success.surface};
  color: ${({ theme }) => theme.semantic.success.light};
  font-size: 12px;
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  flex-shrink: 0;
`;

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    label,
    required,
    helperText,
    errorText,
    status,
    startAdornment,
    endAdornment,
    badge,
    fullWidth,
    disabled,
    readOnly,
    id: idProp,
    onFocus,
    onBlur,
    ...rest
  },
  ref,
) {
  const generatedId = useId();
  const id = idProp ?? generatedId;

  // 推斷實際狀態優先序：顯式設定 > error > disabled > readOnly > default
  const resolvedStatus: InputStatus =
    status ?? (errorText ? 'error' : disabled ? 'disabled' : readOnly ? 'readOnly' : 'default');

  return (
    <FormField
      label={label}
      required={required}
      helperText={helperText}
      errorText={errorText}
      hasError={resolvedStatus === 'error'}
      htmlFor={id}
    >
      <InputContainer
        $status={resolvedStatus}
        $fullWidth={fullWidth}
        onClick={() => {
          // 點擊容器聚焦 input
          const el = document.getElementById(id);
          el?.focus();
        }}
      >
        {(resolvedStatus === 'readOnly' || resolvedStatus === 'viewOnly') && (
          <Adornment $status={resolvedStatus} aria-hidden="true">
            <LockIcon size={16} />
          </Adornment>
        )}
        {startAdornment && (
          <Adornment $status={resolvedStatus}>{startAdornment}</Adornment>
        )}
        <StyledInput
          ref={ref}
          id={id}
          disabled={resolvedStatus === 'disabled'}
          readOnly={
            resolvedStatus === 'readOnly' || resolvedStatus === 'viewOnly'
          }
          aria-invalid={resolvedStatus === 'error'}
          $status={resolvedStatus}
          onFocus={onFocus}
          onBlur={onBlur}
          {...rest}
        />
        {badge && <Badge>{badge}</Badge>}
        {endAdornment && (
          <Adornment $status={resolvedStatus}>{endAdornment}</Adornment>
        )}
      </InputContainer>
    </FormField>
  );
});

Input.displayName = 'Input';
