import styled, { css, keyframes } from 'styled-components';
import type { ReactNode } from 'react';
import {
  CheckCircleIcon,
  InfoIcon,
  ErrorIcon,
  WarningIcon,
  CloseIcon,
} from '../_shared/icons';

export type ToastStatus = 'success' | 'info' | 'warning' | 'failure';
export type ToastVariant = 'default' | 'feedback';

export interface ToastItemProps {
  status: ToastStatus;
  variant?: ToastVariant;
  title?: ReactNode;
  description?: ReactNode;
  /** 顯示關閉按鈕並接收回呼 */
  onClose?: () => void;
  /** 自訂 action 區（如「復原」連結） */
  action?: ReactNode;
}

const colorMap = {
  success: 'success',
  info: 'info',
  warning: 'warning',
  failure: 'error',
} as const;

const slideIn = keyframes`
  from { opacity: 0; transform: translateX(20px); }
  to { opacity: 1; transform: translateX(0); }
`;

const Container = styled.div<{ $status: ToastStatus; $variant: ToastVariant }>`
  display: flex;
  align-items: center;
  gap: 12px;
  width: 380px;
  min-height: 56px;
  padding: 12px 16px;
  border-radius: ${({ theme }) => theme.radius.md};
  font-family: ${({ theme }) => theme.fontFamily.primary};
  animation: ${slideIn} 220ms cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: ${({ theme }) => theme.shadows.hero};

  ${({ $variant, $status, theme }) => {
    const key = colorMap[$status];
    const palette = theme.semantic[key];
    if ($variant === 'feedback') {
      return css`
        background: ${theme.semantic.background.bar};
        border: 1px solid ${palette.dark};
        color: ${theme.semantic.text.high};
      `;
    }
    return css`
      background: ${palette.surface};
      border: 1px solid ${palette.dark};
      color: ${theme.semantic.text.high};
    `;
  }}
`;

const IconWrap = styled.span<{ $status: ToastStatus }>`
  display: inline-flex;
  flex-shrink: 0;
  color: ${({ theme, $status }) => theme.semantic[colorMap[$status]].light};
`;

const Body = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const Title = styled.div`
  font-size: 14px;
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  color: ${({ theme }) => theme.semantic.text.high};
  line-height: 1.4;
`;

const Description = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.semantic.text.middle};
  letter-spacing: 0.4px;
`;

const CloseButton = styled.button.attrs({ type: 'button' })`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  flex-shrink: 0;
  background: transparent;
  border: 0;
  border-radius: ${({ theme }) => theme.radius.sm};
  color: ${({ theme }) => theme.semantic.text.middle};
  cursor: pointer;
  &:hover {
    background: ${({ theme }) => theme.semantic.background.transparent10};
    color: ${({ theme }) => theme.semantic.text.high};
  }
`;

const ActionWrap = styled.div`
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
`;

const icons: Record<ToastStatus, ReactNode> = {
  success: <CheckCircleIcon size={20} />,
  info: <InfoIcon size={20} />,
  warning: <WarningIcon size={20} />,
  failure: <ErrorIcon size={20} />,
};

export const ToastItem = ({
  status,
  variant = 'default',
  title,
  description,
  onClose,
  action,
}: ToastItemProps) => {
  return (
    <Container $status={status} $variant={variant} role="status">
      <IconWrap $status={status} aria-hidden="true">
        {icons[status]}
      </IconWrap>
      <Body>
        {title && <Title>{title}</Title>}
        {description && <Description>{description}</Description>}
      </Body>
      {action && <ActionWrap>{action}</ActionWrap>}
      {onClose && (
        <CloseButton onClick={onClose} aria-label="關閉">
          <CloseIcon size={16} />
        </CloseButton>
      )}
    </Container>
  );
};

ToastItem.displayName = 'ToastItem';
