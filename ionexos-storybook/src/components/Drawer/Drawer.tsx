import styled, { css, keyframes } from 'styled-components';
import { useEffect, useCallback } from 'react';
import type { ReactNode, HTMLAttributes } from 'react';
import { Portal } from '../_shared/Portal';
import { CloseIcon } from '../_shared/icons';

export type DrawerPlacement = 'left' | 'right' | 'top' | 'bottom';
export type DrawerSize = 'small' | 'medium' | 'large' | 'auto';

export interface DrawerProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  open: boolean;
  onClose?: () => void;
  /** 出現方位 */
  placement?: DrawerPlacement;
  /** 預設尺寸（覆寫見 width / height） */
  size?: DrawerSize;
  /** 自訂寬度（用於 left / right） */
  width?: number | string;
  /** 自訂高度（用於 top / bottom） */
  height?: number | string;
  /** 是否顯示背景遮罩 */
  backdrop?: boolean;
  /** 點擊背景是否關閉（預設 true） */
  closeOnBackdropClick?: boolean;
  /** ESC 鍵是否關閉（預設 true） */
  closeOnEsc?: boolean;
  /** 標題 */
  title?: ReactNode;
  /** 描述 */
  description?: ReactNode;
  /** 顯示關閉按鈕 */
  showCloseButton?: boolean;
  /** Footer 內容 */
  footer?: ReactNode;
  children?: ReactNode;
}

const sizeMap: Record<Exclude<DrawerSize, 'auto'>, number> = {
  small: 320,
  medium: 420,
  large: 560,
};

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const slideFrom = (placement: DrawerPlacement) => keyframes`
  from {
    transform: ${
      placement === 'left'
        ? 'translateX(-100%)'
        : placement === 'right'
          ? 'translateX(100%)'
          : placement === 'top'
            ? 'translateY(-100%)'
            : 'translateY(100%)'
    };
  }
  to {
    transform: translate(0, 0);
  }
`;

const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  z-index: 1000;
  background: rgba(8, 15, 36, 0.55);
  backdrop-filter: blur(2px);
  animation: ${fadeIn} 200ms ease-out;
`;

const Panel = styled.aside<{
  $placement: DrawerPlacement;
  $width?: string;
  $height?: string;
}>`
  position: fixed;
  z-index: 1001;
  background: ${({ theme }) => theme.semantic.background.bright};
  border: 1px solid ${({ theme }) => theme.semantic.background.transparent10};
  box-shadow: ${({ theme }) => theme.shadows.hero};
  display: flex;
  flex-direction: column;
  font-family: ${({ theme }) => theme.fontFamily.primary};
  animation: ${({ $placement }) => slideFrom($placement)} 240ms
    cubic-bezier(0.16, 1, 0.3, 1);

  ${({ $placement, $width, $height, theme }) => {
    switch ($placement) {
      case 'left':
        return css`
          top: 0;
          left: 0;
          bottom: 0;
          width: ${$width};
          max-width: 100vw;
          border-right: 1px solid ${theme.semantic.background.transparent10};
          border-radius: 0 ${theme.radius.lg} ${theme.radius.lg} 0;
        `;
      case 'right':
        return css`
          top: 0;
          right: 0;
          bottom: 0;
          width: ${$width};
          max-width: 100vw;
          border-left: 1px solid ${theme.semantic.background.transparent10};
          border-radius: ${theme.radius.lg} 0 0 ${theme.radius.lg};
        `;
      case 'top':
        return css`
          top: 0;
          left: 0;
          right: 0;
          height: ${$height};
          max-height: 100vh;
          border-bottom: 1px solid ${theme.semantic.background.transparent10};
          border-radius: 0 0 ${theme.radius.lg} ${theme.radius.lg};
        `;
      case 'bottom':
        return css`
          bottom: 0;
          left: 0;
          right: 0;
          height: ${$height};
          max-height: 100vh;
          border-top: 1px solid ${theme.semantic.background.transparent10};
          border-radius: ${theme.radius.lg} ${theme.radius.lg} 0 0;
        `;
    }
  }}
`;

const Header = styled.div<{ $hasDescription: boolean }>`
  display: flex;
  align-items: ${({ $hasDescription }) =>
    $hasDescription ? 'flex-start' : 'center'};
  justify-content: space-between;
  gap: 16px;
  padding: 20px 24px ${({ $hasDescription }) => ($hasDescription ? '12px' : '16px')};
  border-bottom: 1px solid ${({ theme }) => theme.semantic.background.transparent10};
`;

const Titles = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const TitleEl = styled.h2`
  margin: 0;
  font-size: 18px;
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  color: ${({ theme }) => theme.semantic.text.high};
  line-height: 1.4;
`;

const DescEl = styled.div`
  font-size: 13px;
  color: ${({ theme }) => theme.semantic.text.middle};
  line-height: 1.5;
`;

const CloseButton = styled.button.attrs({ type: 'button' })`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
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

const Body = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 20px 24px;
  color: ${({ theme }) => theme.semantic.text.high};
  font-size: 14px;
  line-height: 1.6;
`;

const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  padding: 16px 24px;
  border-top: 1px solid ${({ theme }) => theme.semantic.background.transparent10};
`;

function resolveSize(size: DrawerSize, custom?: number | string): string {
  if (custom !== undefined)
    return typeof custom === 'number' ? `${custom}px` : custom;
  if (size === 'auto') return 'auto';
  return `${sizeMap[size]}px`;
}

export const Drawer = ({
  open,
  onClose,
  placement = 'right',
  size = 'medium',
  width,
  height,
  backdrop = true,
  closeOnBackdropClick = true,
  closeOnEsc = true,
  title,
  description,
  showCloseButton = true,
  footer,
  children,
  ...rest
}: DrawerProps) => {
  useEffect(() => {
    if (!open || !closeOnEsc) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose?.();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [open, closeOnEsc, onClose]);

  useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = original;
    };
  }, [open]);

  const handleBackdropClick = useCallback(() => {
    if (closeOnBackdropClick) onClose?.();
  }, [closeOnBackdropClick, onClose]);

  if (!open) return null;

  const isHorizontal = placement === 'left' || placement === 'right';
  const resolvedWidth = isHorizontal ? resolveSize(size, width) : undefined;
  const resolvedHeight = !isHorizontal ? resolveSize(size, height) : undefined;

  return (
    <Portal>
      {backdrop && <Backdrop onClick={handleBackdropClick} />}
      <Panel
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'drawer-title' : undefined}
        $placement={placement}
        $width={resolvedWidth}
        $height={resolvedHeight}
        {...rest}
      >
        {(title || showCloseButton) && (
          <Header $hasDescription={!!description}>
            <Titles>
              {title && <TitleEl id="drawer-title">{title}</TitleEl>}
              {description && <DescEl>{description}</DescEl>}
            </Titles>
            {showCloseButton && onClose && (
              <CloseButton onClick={onClose} aria-label="關閉">
                <CloseIcon size={20} />
              </CloseButton>
            )}
          </Header>
        )}
        {children && <Body>{children}</Body>}
        {footer && <Footer>{footer}</Footer>}
      </Panel>
    </Portal>
  );
};

Drawer.displayName = 'Drawer';
