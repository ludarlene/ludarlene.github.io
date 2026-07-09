import styled, { css } from 'styled-components';
import { forwardRef, useId } from 'react';
import type { InputHTMLAttributes, ReactNode } from 'react';
import { useRadioGroup } from './RadioGroup';

export interface RadioProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  label?: ReactNode;
  description?: ReactNode;
  /** Radio 的值（必填，用於 RadioGroup 比對） */
  value?: string;
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

const HiddenInput = styled.input.attrs({ type: 'radio' })`
  position: absolute;
  width: 0;
  height: 0;
  opacity: 0;
  pointer-events: none;
`;

const Circle = styled.span<{ $checked: boolean }>`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  flex-shrink: 0;
  border-radius: 50%;
  border: 2px solid ${({ theme }) => theme.semantic.text.middle};
  background: transparent;
  transition:
    border-color 150ms ease,
    box-shadow 150ms ease;

  ${({ $checked, theme }) =>
    $checked &&
    css`
      border-color: ${theme.semantic.primary.main};
    `}

  &::after {
    content: '';
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: ${({ theme }) => theme.semantic.primary.main};
    transform: scale(${({ $checked }) => ($checked ? 1 : 0)});
    transition: transform 150ms ease;
  }

  ${HiddenInput}:focus-visible + & {
    box-shadow: 0 0 0 3px ${({ theme }) => theme.semantic.primary.surface};
  }

  ${Container}:hover & {
    border-color: ${({ theme }) => theme.semantic.primary.main};
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

export const Radio = forwardRef<HTMLInputElement, RadioProps>(function Radio(
  {
    checked,
    defaultChecked,
    disabled,
    label,
    description,
    id: idProp,
    name: nameProp,
    value,
    className,
    style,
    onChange,
    ...rest
  },
  ref,
) {
  const group = useRadioGroup();
  const generatedId = useId();
  const id = idProp ?? generatedId;

  // RadioGroup 接管時：name、checked、disabled 從 context 取
  const inGroup = !!group;
  const resolvedName = inGroup ? group!.name : nameProp;
  const resolvedChecked = inGroup
    ? group!.value === value
    : (checked ?? defaultChecked ?? false);
  const resolvedDisabled = inGroup ? group!.disabled || disabled : disabled;

  const isChecked = resolvedChecked;
  const hasText = !!(label || description);

  return (
    <Container
      htmlFor={id}
      $disabled={resolvedDisabled}
      $hasText={hasText}
      className={className}
      style={style}
    >
      <HiddenInput
        ref={ref}
        id={id}
        name={resolvedName}
        value={value}
        checked={inGroup ? resolvedChecked : checked}
        defaultChecked={inGroup ? undefined : defaultChecked}
        disabled={resolvedDisabled}
        onChange={onChange}
        {...rest}
      />
      <Circle $checked={!!isChecked} aria-hidden="true" />
      {hasText && (
        <Text>
          {label && <Label>{label}</Label>}
          {description && <Description>{description}</Description>}
        </Text>
      )}
    </Container>
  );
});

Radio.displayName = 'Radio';
