import styled, { css } from 'styled-components';
import { forwardRef, useEffect, useId, useRef } from 'react';
import type { InputHTMLAttributes, ReactNode } from 'react';
import { CheckIcon, MinusIcon } from '../_shared/icons';

export interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  /** Indeterminate（部分選中），typically 用於父層 checkbox */
  indeterminate?: boolean;
  /** 標籤 */
  label?: ReactNode;
  /** 副文字（顯示在標籤下方） */
  description?: ReactNode;
}

const Container = styled.label<{ $disabled?: boolean; $hasText?: boolean }>`
  display: inline-flex;
  align-items: ${({ $hasText }) => ($hasText ? 'flex-start' : 'center')};
  gap: 12px;
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};
  font-family: ${({ theme }) => theme.fontFamily.primary};
  user-select: none;
  ${({ $disabled }) =>
    $disabled &&
    css`
      opacity: 0.5;
    `}
`;

const HiddenInput = styled.input.attrs({ type: 'checkbox' })`
  position: absolute;
  width: 0;
  height: 0;
  opacity: 0;
  pointer-events: none;
`;

const Box = styled.span<{ $checked: boolean; $indeterminate: boolean }>`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  flex-shrink: 0;
  border-radius: 4px;
  border: 2px solid ${({ theme }) => theme.semantic.text.middle};
  background: transparent;
  transition:
    background-color 150ms ease,
    border-color 150ms ease,
    box-shadow 150ms ease;
  color: ${({ theme }) => theme.semantic.text.white};

  ${({ $checked, $indeterminate, theme }) =>
    ($checked || $indeterminate) &&
    css`
      background: ${theme.semantic.primary.main};
      border-color: ${theme.semantic.primary.main};
    `}

  ${HiddenInput}:focus-visible + & {
    box-shadow: 0 0 0 3px ${({ theme }) => theme.semantic.primary.surface};
  }

  ${Container}:hover & {
    border-color: ${({ theme, $checked, $indeterminate }) =>
      $checked || $indeterminate
        ? theme.semantic.primary.light
        : theme.semantic.primary.main};
    ${({ $checked, $indeterminate, theme }) =>
      ($checked || $indeterminate) &&
      css`
        background: ${theme.semantic.primary.light};
      `}
  }
`;

const Text = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const Label = styled.span`
  font-size: 14px;
  color: ${({ theme }) => theme.semantic.text.high};
  line-height: 1.4;
`;

const Description = styled.span`
  font-size: 12px;
  color: ${({ theme }) => theme.semantic.text.middle};
  letter-spacing: 0.4px;
`;

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  function Checkbox(
    {
      indeterminate = false,
      checked,
      defaultChecked,
      disabled,
      label,
      description,
      id: idProp,
      className,
      style,
      ...rest
    },
    ref,
  ) {
    const internalRef = useRef<HTMLInputElement | null>(null);
    const generatedId = useId();
    const id = idProp ?? generatedId;

    // 同步 indeterminate 屬性到 DOM
    useEffect(() => {
      const node = internalRef.current;
      if (node) node.indeterminate = indeterminate;
    }, [indeterminate]);

    // 整合外部 ref
    const setRefs = (node: HTMLInputElement | null) => {
      internalRef.current = node;
      if (typeof ref === 'function') ref(node);
      else if (ref) (ref as React.MutableRefObject<HTMLInputElement | null>).current = node;
    };

    const isChecked = checked ?? defaultChecked ?? false;
    const hasText = !!(label || description);

    return (
      <Container
        htmlFor={id}
        $disabled={disabled}
        $hasText={hasText}
        className={className}
        style={style}
      >
        <HiddenInput
          ref={setRefs}
          id={id}
          checked={checked}
          defaultChecked={defaultChecked}
          disabled={disabled}
          aria-checked={indeterminate ? 'mixed' : isChecked}
          {...rest}
        />
        <Box
          $checked={!!isChecked}
          $indeterminate={indeterminate}
          aria-hidden="true"
        >
          {indeterminate ? (
            <MinusIcon size={14} />
          ) : isChecked ? (
            <CheckIcon size={14} />
          ) : null}
        </Box>
        {hasText && (
          <Text>
            {label && <Label>{label}</Label>}
            {description && <Description>{description}</Description>}
          </Text>
        )}
      </Container>
    );
  },
);

Checkbox.displayName = 'Checkbox';
