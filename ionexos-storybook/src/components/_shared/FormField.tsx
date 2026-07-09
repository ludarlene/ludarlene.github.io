import styled from 'styled-components';
import type { HTMLAttributes, ReactNode } from 'react';
import { AlertIcon } from './icons';

export interface FormFieldProps extends HTMLAttributes<HTMLDivElement> {
  label?: ReactNode;
  required?: boolean;
  helperText?: ReactNode;
  errorText?: ReactNode;
  /** 即使有 errorText，仍可關閉錯誤外觀（受元件內部決定） */
  hasError?: boolean;
  /** 將 label 與 input 連結 */
  htmlFor?: string;
  children: ReactNode;
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-family: ${({ theme }) => theme.fontFamily.primary};
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  color: ${({ theme }) => theme.semantic.text.high};
  display: inline-flex;
  align-items: center;
  gap: 4px;
`;

const RequiredMark = styled.span`
  color: ${({ theme }) => theme.semantic.error.main};
`;

const HelperText = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.semantic.text.middle};
  letter-spacing: 0.4px;
`;

const ErrorText = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  color: ${({ theme }) => theme.semantic.error.main};
  letter-spacing: 0.4px;
`;

export const FormField = ({
  label,
  required,
  helperText,
  errorText,
  hasError,
  htmlFor,
  children,
  ...rest
}: FormFieldProps) => {
  const showError = hasError && errorText;
  return (
    <Wrapper {...rest}>
      {label && (
        <Label htmlFor={htmlFor}>
          {label}
          {required && <RequiredMark aria-hidden="true">*</RequiredMark>}
        </Label>
      )}
      {children}
      {showError ? (
        <ErrorText role="alert">
          <AlertIcon size={14} />
          {errorText}
        </ErrorText>
      ) : (
        helperText && <HelperText>{helperText}</HelperText>
      )}
    </Wrapper>
  );
};

FormField.displayName = 'FormField';
