import styled, { css } from 'styled-components';
import type { HTMLAttributes, ReactNode } from 'react';
import {
  AlertIcon,
  CheckCircleIcon,
  ErrorIcon,
  InfoIcon,
  WarningIcon,
  CloseIcon,
} from '../_shared/icons';

export type NotificationStatus = 'info' | 'success' | 'warning' | 'error';

export interface NotificationProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  status: NotificationStatus;
  /** 主標題或短訊息 */
  title?: ReactNode;
  /** 描述文字（會切換為 Long 樣式） */
  description?: ReactNode;
  /** 自訂左側圖示。傳入 false 完全隱藏 icon */
  icon?: ReactNode | false;
  /** 可關閉。傳入 function 會渲染關閉按鈕 */
  onClose?: () => void;
  /** 自訂右側 action 區（例如連結或按鈕） */
  action?: ReactNode;
}

const colorMap = {
  info: 'info',
  success: 'success',
  warning: 'warning',
  error: 'error',
} as const;

const Container = styled.div<{ $status: NotificationStatus; $hasDesc: boolean }>`
  display: flex;
  align-items: ${({ $hasDesc }) => ($hasDesc ? 'flex-start' : 'center')};
  gap: 12px;
  width: 400px;
  max-width: 100%;
  padding: ${({ $hasDesc }) => ($hasDesc ? '12px 16px' : '12px 16px')};
  border-radius: ${({ theme }) => theme.radius.md};
  font-family: ${({ theme }) => theme.fontFamily.primary};

  ${({ $status, theme }) => {
    const key = colorMap[$status];
    const palette = theme.semantic[key];
    return css`
      background: ${palette.surface};
      border: 1px solid ${palette.dark};
      color: ${palette.light};
    `;
  }}
`;

const IconWrap = styled.span<{ $hasDesc: boolean }>`
  display: inline-flex;
  flex-shrink: 0;
  margin-top: ${({ $hasDesc }) => ($hasDesc ? '2px' : '0')};
`;

const Body = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Title = styled.div<{ $hasDesc: boolean }>`
  font-size: 14px;
  font-weight: ${({ theme, $hasDesc }) =>
    $hasDesc ? theme.fontWeight.medium : theme.fontWeight.regular};
  color: ${({ theme }) => theme.semantic.text.high};
  line-height: 1.4;
`;

const Description = styled.div`
  font-size: 12px;
  line-height: 1.5;
  letter-spacing: 0.4px;
  color: ${({ theme }) => theme.semantic.text.middle};
`;

const Action = styled.div`
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
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

const defaultIcons: Record<NotificationStatus, ReactNode> = {
  info: <InfoIcon size={20} />,
  success: <CheckCircleIcon size={20} />,
  warning: <WarningIcon size={20} />,
  error: <ErrorIcon size={20} />,
};

export const Notification = ({
  status,
  title,
  description,
  icon,
  onClose,
  action,
  role = 'status',
  ...rest
}: NotificationProps) => {
  const hasDesc = !!description;
  const resolvedIcon = icon === false ? null : (icon ?? defaultIcons[status]);

  return (
    <Container
      $status={status}
      $hasDesc={hasDesc}
      role={status === 'error' ? 'alert' : role}
      {...rest}
    >
      {resolvedIcon && (
        <IconWrap $hasDesc={hasDesc} aria-hidden="true">
          {resolvedIcon}
        </IconWrap>
      )}
      <Body>
        {title && <Title $hasDesc={hasDesc}>{title}</Title>}
        {description && <Description>{description}</Description>}
      </Body>
      {action && <Action>{action}</Action>}
      {onClose && (
        <CloseButton onClick={onClose} aria-label="關閉通知">
          <CloseIcon size={16} />
        </CloseButton>
      )}
    </Container>
  );
};

Notification.displayName = 'Notification';
