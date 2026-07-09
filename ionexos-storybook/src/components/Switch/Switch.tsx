import styled, { css } from 'styled-components';
import { forwardRef, useId } from 'react';
import type { InputHTMLAttributes, ReactNode } from 'react';

export interface SwitchProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  label?: ReactNode;
  /** Label 位置 */
  labelPlacement?: 'start' | 'end';
}

const Container = styled.label<{ $disabled?: boolean }>`
  display: inline-flex;
  align-items: center;
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

const HiddenInput = styled.input.attrs({ type: 'checkbox', role: 'switch' })`
  position: absolute;
  width: 0;
  height: 0;
  opacity: 0;
  pointer-events: none;
`;

const Track = styled.span<{ $checked: boolean }>`
  position: relative;
  display: inline-block;
  width: 40px;
  height: 24px;
  flex-shrink: 0;
  border-radius: 999px;
  background: ${({ $checked, theme }) =>
    $checked
      ? theme.semantic.primary.main
      : theme.semantic.background.transparent20};
  transition:
    background-color 200ms ease,
    box-shadow 200ms ease;

  ${HiddenInput}:focus-visible + & {
    box-shadow: 0 0 0 3px ${({ theme }) => theme.semantic.primary.surface};
  }

  ${Container}:hover & {
    background: ${({ $checked, theme }) =>
      $checked
        ? theme.semantic.primary.light
        : theme.semantic.background.transparent30};
  }

  ${Container}:active & {
    /* Pressed state */
    ${({ $checked, theme }) =>
      $checked
        ? css`
            background: ${theme.semantic.primary.dark};
          `
        : css`
            background: ${theme.semantic.background.transparent40};
          `}
  }
`;

const Thumb = styled.span<{ $checked: boolean }>`
  position: absolute;
  top: 3px;
  left: 3px;
  width: 18px;
  height: 18px;
  background: ${({ theme }) => theme.semantic.text.white};
  border-radius: 50%;
  transition: transform 200ms cubic-bezier(0.4, 0, 0.2, 1);
  transform: translateX(${({ $checked }) => ($checked ? '16px' : '0')});
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
`;

const Label = styled.span`
  font-size: 14px;
  color: ${({ theme }) => theme.semantic.text.high};
`;

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(function Switch(
  {
    checked,
    defaultChecked,
    disabled,
    label,
    labelPlacement = 'end',
    id: idProp,
    className,
    style,
    ...rest
  },
  ref,
) {
  const generatedId = useId();
  const id = idProp ?? generatedId;
  const isChecked = checked ?? defaultChecked ?? false;

  const switchPart = (
    <Track $checked={!!isChecked} aria-hidden="true">
      <Thumb $checked={!!isChecked} />
    </Track>
  );

  return (
    <Container
      htmlFor={id}
      $disabled={disabled}
      className={className}
      style={style}
    >
      <HiddenInput
        ref={ref}
        id={id}
        checked={checked}
        defaultChecked={defaultChecked}
        disabled={disabled}
        {...rest}
      />
      {labelPlacement === 'start' && label && <Label>{label}</Label>}
      {switchPart}
      {labelPlacement === 'end' && label && <Label>{label}</Label>}
    </Container>
  );
});

Switch.displayName = 'Switch';
