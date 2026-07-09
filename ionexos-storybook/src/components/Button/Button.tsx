import styled, { css } from 'styled-components';
import type { ButtonHTMLAttributes, ReactNode } from 'react';

export type ButtonSize = 'large' | 'basic' | 'small';
export type ButtonVariant =
  | 'primary'
  | 'outline'
  | 'outlineDanger'
  | 'miner';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: ButtonSize;
  variant?: ButtonVariant;
  fullWidth?: boolean;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  children?: ReactNode;
}

/**
 * IonexOS Button
 *
 * Variants 對應 Figma：
 * - primary → Type=Primary
 * - outline → Type=Outline
 * - outlineDanger → Type=Outline Danger
 * - miner → Type=Miner（次要弱化型）
 *
 * Sizes 對應 Figma：
 * - large (h=48px) / basic (h=40px) / small (h=22-24px)
 */
const sizeStyles = {
  large: css`
    height: 48px;
    padding: 0 ${({ theme }) => theme.spacing[6]};
    font-size: ${({ theme }) => theme.typography.button1.fontSize};
    font-weight: ${({ theme }) => theme.typography.button1.fontWeight};
    letter-spacing: ${({ theme }) => theme.typography.button1.letterSpacing};
    border-radius: ${({ theme }) => theme.radius.md};
    gap: ${({ theme }) => theme.spacing[2]};
  `,
  basic: css`
    height: 40px;
    padding: 0 ${({ theme }) => theme.spacing[4]};
    font-size: ${({ theme }) => theme.typography.button2.fontSize};
    font-weight: ${({ theme }) => theme.typography.button2.fontWeight};
    letter-spacing: ${({ theme }) => theme.typography.button2.letterSpacing};
    border-radius: ${({ theme }) => theme.radius.md};
    gap: ${({ theme }) => theme.spacing[2]};
  `,
  small: css`
    height: 24px;
    padding: 0 ${({ theme }) => theme.spacing[3]};
    font-size: ${({ theme }) => theme.typography.button3.fontSize};
    font-weight: ${({ theme }) => theme.typography.button3.fontWeight};
    letter-spacing: ${({ theme }) => theme.typography.button3.letterSpacing};
    border-radius: ${({ theme }) => theme.radius.sm};
    gap: ${({ theme }) => theme.spacing[1]};
  `,
};

const variantStyles = {
  primary: css`
    background: ${({ theme }) => theme.semantic.button.primary};
    color: ${({ theme }) => theme.semantic.text.white};
    border: 1px solid transparent;

    &:hover:not(:disabled) {
      background: ${({ theme }) => theme.semantic.button.hover};
    }

    &:active:not(:disabled),
    &:focus-visible:not(:disabled) {
      background: ${({ theme }) => theme.semantic.button.focus};
      outline: none;
    }

    &:disabled {
      background: ${({ theme }) => theme.semantic.button.disable};
      color: ${({ theme }) => theme.semantic.text.lower};
      cursor: not-allowed;
    }
  `,
  outline: css`
    background: transparent;
    color: ${({ theme }) => theme.semantic.primary.main};
    border: 1px solid ${({ theme }) => theme.semantic.primary.main};

    &:hover:not(:disabled) {
      background: ${({ theme }) => theme.semantic.primary.surface};
      border-color: ${({ theme }) => theme.semantic.primary.light};
      color: ${({ theme }) => theme.semantic.primary.light};
    }

    &:active:not(:disabled),
    &:focus-visible:not(:disabled) {
      background: ${({ theme }) => theme.semantic.button.focus};
      outline: none;
    }

    &:disabled {
      border-color: ${({ theme }) => theme.semantic.button.disable};
      color: ${({ theme }) => theme.semantic.text.lower};
      cursor: not-allowed;
    }
  `,
  outlineDanger: css`
    background: transparent;
    color: ${({ theme }) => theme.semantic.error.main};
    border: 1px solid ${({ theme }) => theme.semantic.error.main};

    &:hover:not(:disabled) {
      background: ${({ theme }) => theme.semantic.error.surface};
      border-color: ${({ theme }) => theme.semantic.error.light};
      color: ${({ theme }) => theme.semantic.error.light};
    }

    &:active:not(:disabled),
    &:focus-visible:not(:disabled) {
      background: ${({ theme }) => theme.semantic.error.dark};
      color: ${({ theme }) => theme.semantic.text.white};
      outline: none;
    }

    &:disabled {
      border-color: ${({ theme }) => theme.semantic.button.disable};
      color: ${({ theme }) => theme.semantic.text.lower};
      cursor: not-allowed;
    }
  `,
  miner: css`
    background: transparent;
    color: ${({ theme }) => theme.semantic.text.high};
    border: 1px solid transparent;

    &:hover:not(:disabled) {
      background: ${({ theme }) => theme.semantic.background.transparent10};
    }

    &:active:not(:disabled),
    &:focus-visible:not(:disabled) {
      background: ${({ theme }) => theme.semantic.background.transparent20};
      outline: none;
    }

    &:disabled {
      color: ${({ theme }) => theme.semantic.text.lower};
      cursor: not-allowed;
    }
  `,
};

export const Button = styled.button.attrs<ButtonProps>(({ type = 'button' }) => ({
  type,
}))<ButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: ${({ theme }) => theme.fontFamily.primary};
  white-space: nowrap;
  user-select: none;
  transition:
    background-color 150ms ease,
    color 150ms ease,
    border-color 150ms ease;

  ${({ size = 'basic' }) => sizeStyles[size]}
  ${({ variant = 'primary' }) => variantStyles[variant]}
  ${({ fullWidth }) =>
    fullWidth &&
    css`
      width: 100%;
    `}
`;

Button.displayName = 'Button';
