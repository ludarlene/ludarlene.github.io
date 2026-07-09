import styled, { css } from 'styled-components';
import { forwardRef, useId } from 'react';
import type { TextareaHTMLAttributes, ReactNode } from 'react';
import { FormField } from '../_shared/FormField';

export type TextAreaStatus =
  | 'default'
  | 'error'
  | 'disabled'
  | 'readOnly';

export interface TextAreaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: ReactNode;
  required?: boolean;
  helperText?: ReactNode;
  errorText?: ReactNode;
  status?: TextAreaStatus;
  fullWidth?: boolean;
  /** 顯示字數計數 */
  showCount?: boolean;
}

const Container = styled.div<{ $fullWidth?: boolean }>`
  width: ${({ $fullWidth }) => ($fullWidth ? '100%' : '413px')};
  display: flex;
  flex-direction: column;
`;

const StyledTextArea = styled.textarea<{ $status: TextAreaStatus }>`
  width: 100%;
  min-height: 120px;
  padding: 12px 16px;
  resize: vertical;
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme }) => theme.semantic.background.bright};
  border: 1px solid ${({ theme }) => theme.semantic.background.transparent10};
  color: ${({ theme }) => theme.semantic.text.high};
  font-family: ${({ theme }) => theme.fontFamily.primary};
  font-size: 14px;
  line-height: 1.5;
  letter-spacing: 0.25px;
  outline: none;
  transition:
    border-color 150ms ease,
    box-shadow 150ms ease,
    background-color 150ms ease;

  &::placeholder {
    color: ${({ theme }) => theme.semantic.text.lower};
  }

  &:hover {
    border-color: ${({ theme }) => theme.semantic.background.transparent30};
  }

  &:focus {
    border-color: ${({ theme }) => theme.semantic.primary.main};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.semantic.primary.surface};
  }

  ${({ $status, theme }) => {
    switch ($status) {
      case 'error':
        return css`
          border-color: ${theme.semantic.error.main};
          &:focus {
            border-color: ${theme.semantic.error.main};
            box-shadow: 0 0 0 3px ${theme.semantic.error.surface};
          }
        `;
      case 'disabled':
        return css`
          background: ${theme.semantic.button.disable};
          color: ${theme.semantic.text.lower};
          border-color: transparent;
          cursor: not-allowed;
          resize: none;
          &:hover {
            border-color: transparent;
          }
        `;
      case 'readOnly':
        return css`
          background: ${theme.semantic.background.transparent5};
          cursor: default;
          resize: none;
        `;
      default:
        return '';
    }
  }}
`;

const CountRow = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 4px;
  font-size: 12px;
  color: ${({ theme }) => theme.semantic.text.middle};
  font-family: ${({ theme }) => theme.fontFamily.mono};
`;

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  function TextArea(
    {
      label,
      required,
      helperText,
      errorText,
      status,
      fullWidth,
      showCount,
      maxLength,
      disabled,
      readOnly,
      id: idProp,
      value,
      defaultValue,
      ...rest
    },
    ref,
  ) {
    const generatedId = useId();
    const id = idProp ?? generatedId;

    const resolvedStatus: TextAreaStatus =
      status ??
      (errorText
        ? 'error'
        : disabled
          ? 'disabled'
          : readOnly
            ? 'readOnly'
            : 'default');

    const currentLength =
      typeof value === 'string'
        ? value.length
        : typeof defaultValue === 'string'
          ? defaultValue.length
          : 0;

    return (
      <FormField
        label={label}
        required={required}
        helperText={helperText}
        errorText={errorText}
        hasError={resolvedStatus === 'error'}
        htmlFor={id}
      >
        <Container $fullWidth={fullWidth}>
          <StyledTextArea
            ref={ref}
            id={id}
            disabled={resolvedStatus === 'disabled'}
            readOnly={resolvedStatus === 'readOnly'}
            aria-invalid={resolvedStatus === 'error'}
            $status={resolvedStatus}
            maxLength={maxLength}
            value={value}
            defaultValue={defaultValue}
            {...rest}
          />
          {showCount && (
            <CountRow>
              {currentLength}
              {maxLength ? ` / ${maxLength}` : ''}
            </CountRow>
          )}
        </Container>
      </FormField>
    );
  },
);

TextArea.displayName = 'TextArea';
