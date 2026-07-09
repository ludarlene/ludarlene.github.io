import styled, { css, keyframes } from 'styled-components';
import type { HTMLAttributes, ReactNode } from 'react';

export type StatusType =
  | 'error'
  | 'warning'
  | 'success'
  | 'info'
  | 'pending'
  | 'canceled'
  | 'paused'
  | 'loading';

export interface StatusIndicatorProps extends HTMLAttributes<HTMLSpanElement> {
  type: StatusType;
  /** 自訂 label。若未提供會用預設中文文字 */
  label?: ReactNode;
  /** 是否顯示 dot（預設 true） */
  showDot?: boolean;
}

const defaultLabels: Record<StatusType, string> = {
  error: 'Error',
  warning: 'Warning',
  success: 'Success',
  info: 'Info',
  pending: 'Pending',
  canceled: 'Canceled',
  paused: 'Paused',
  loading: 'Loading',
};

// 對應 semantic 色系（loading / pending / canceled / paused 用次要語意色）
const colorMap = {
  error: 'error',
  warning: 'warning',
  success: 'success',
  info: 'info',
  pending: 'secondary',
  canceled: 'info',
  paused: 'info',
  loading: 'primary',
} as const;

const pulse = keyframes`
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.4; transform: scale(0.8); }
`;

const Container = styled.span<{ $type: StatusType }>`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 24px;
  padding: 0 8px;
  border-radius: ${({ theme }) => theme.radius.sm};
  font-family: ${({ theme }) => theme.fontFamily.primary};
  font-size: 12px;
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  letter-spacing: 0.4px;
  white-space: nowrap;

  ${({ $type, theme }) => {
    const key = colorMap[$type];
    const palette = theme.semantic[key];
    return css`
      background: ${palette.surface};
      color: ${palette.light};
    `;
  }}
`;

const Dot = styled.span<{ $type: StatusType }>`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  flex-shrink: 0;
  ${({ $type, theme }) => {
    const key = colorMap[$type];
    return css`
      background: ${theme.semantic[key].main};
    `;
  }}

  ${({ $type }) =>
    ($type === 'pending' || $type === 'loading') &&
    css`
      animation: ${pulse} 1.4s ease-in-out infinite;
    `}
`;

export const StatusIndicator = ({
  type,
  label,
  showDot = true,
  ...rest
}: StatusIndicatorProps) => {
  return (
    <Container $type={type} {...rest}>
      {showDot && <Dot $type={type} aria-hidden="true" />}
      {label ?? defaultLabels[type]}
    </Container>
  );
};

StatusIndicator.displayName = 'StatusIndicator';
