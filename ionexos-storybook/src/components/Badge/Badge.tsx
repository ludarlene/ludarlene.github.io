import styled, { css } from 'styled-components';
import type { HTMLAttributes, ReactNode } from 'react';

export type BadgeVariant =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'error'
  | 'info';
export type BadgeSize = 'small' | 'medium';
export type BadgeShape = 'rounded' | 'pill';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: BadgeSize;
  shape?: BadgeShape;
  outlined?: boolean;
  children?: ReactNode;
}

const variantColors = {
  primary: 'primary',
  secondary: 'secondary',
  success: 'success',
  warning: 'warning',
  error: 'error',
  info: 'info',
} as const;

const sizeStyles = {
  small: css`
    height: 20px;
    padding: 0 ${({ theme }) => theme.spacing[2]};
    font-size: 12px;
    font-weight: ${({ theme }) => theme.fontWeight.medium};
    letter-spacing: 0.4px;
  `,
  medium: css`
    height: 24px;
    padding: 0 ${({ theme }) => theme.spacing[3]};
    font-size: 14px;
    font-weight: ${({ theme }) => theme.fontWeight.medium};
    letter-spacing: 0;
  `,
};

export const Badge = styled.span<BadgeProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing[1]};
  font-family: ${({ theme }) => theme.fontFamily.primary};
  white-space: nowrap;
  border-radius: ${({ shape = 'rounded', theme }) =>
    shape === 'pill' ? theme.radius.full : theme.radius.sm};

  ${({ size = 'medium' }) => sizeStyles[size]}

  ${({ variant = 'primary', outlined, theme }) => {
    const key = variantColors[variant];
    const palette = theme.semantic[key];
    return outlined
      ? css`
          background: transparent;
          color: ${palette.main};
          border: 1px solid ${palette.main};
        `
      : css`
          background: ${palette.surface};
          color: ${palette.light};
          border: 1px solid transparent;
        `;
  }}
`;

Badge.displayName = 'Badge';
