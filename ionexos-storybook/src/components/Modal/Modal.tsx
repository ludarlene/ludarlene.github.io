import styled, { css, keyframes } from 'styled-components';
import { useEffect, useRef, useCallback } from 'react';
import type { ReactNode, HTMLAttributes } from 'react';
import { Portal } from '../_shared/Portal';
import { CloseIcon } from '../_shared/icons';

export type ModalSize = 'small' | 'medium' | 'large';
export type ModalType = 'modal' | 'dialog' | 'overlay';

export interface ModalProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /** 是否開啟 */
  open: boolean;
  /** 關閉回呼。若未提供則無法關閉 */
  onClose?: () => void;
  /** Modal 型態 */
  type?: ModalType;
  /** 預設尺寸；type=dialog 預設 580px、type=modal 預設 670px、type=overlay 預設 744px */
  size?: ModalSize;
  /** 自訂寬度（覆寫 size） */
  width?: number | string;
  /** 標題 */
  title?: ReactNode;
  /** 描述 */
  description?: ReactNode;
  /** 顯示關閉按鈕（預設 true） */
  showCloseButton?: boolean;
  /** Footer 內容 */
  footer?: ReactNode;
  /** 點擊背景是否關閉（預設 true） */
  closeOnBackdropClick?: boolean;
  /** ESC 鍵是否關閉（預設 true） */
  closeOnEsc?: boolean;
  /** 主體內容 */
  children?: ReactNode;
}

const sizeWidth = {
  small: 480,
  medium: 580,
  large: 744,
};

const typeDefaults: Record<ModalType, ModalSize> = {
  dialog: 'small',
  modal: 'medium',
  overlay: 'large',
};

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const slideIn = keyframes`
  from { opacity: 0; transform: translateY(8px) scale(0.98); }
  to { opacity: 1; transform: translateY(0) scale(1); }
`;

const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  z-index: 1000;
  background: rgba(8, 15, 36, 0.65);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  animation: ${fadeIn} 150ms ease-out;
`;

const Panel = styled.div<{ $width: number | string }>`
  width: ${({ $width }) =>
    typeof $width === 'number' ? `${$width}px` : $width};
  max-width: 100%;
  max-height: calc(100vh - 48px);
  background: ${({ theme }) => theme.semantic.background.bright};
  border: 1px solid ${({ theme }) => theme.semantic.background.transparent10};
  border-radius: ${({ theme }) => theme.radius.lg};
  box-shadow: ${({ theme }) => theme.shadows.hero};
  display: flex;
  flex-direction: column;
  animation: ${slideIn} 180ms cubic-bezier(0.16, 1, 0.3, 1);
  font-family: ${({ theme }) => theme.fontFamily.primary};
  overflow: hidden;
`;

const Header = styled.div<{ $hasDescription: boolean }>`
  display: flex;
  align-items: ${({ $hasDescription }) =>
    $hasDescription ? 'flex-start' : 'center'};
  justify-content: space-between;
  gap: 16px;
  padding: 20px 24px ${({ $hasDescription }) => ($hasDescription ? '12px' : '16px')};
`;

const Titles = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const TitleEl = styled.h2`
  font-size: 20px;
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  color: ${({ theme }) => theme.semantic.text.high};
  margin: 0;
  line-height: 1.4;
`;

const DescriptionEl = styled.div`
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
  transition: background-color 150ms ease, color 150ms ease;
  &:hover {
    background: ${({ theme }) => theme.semantic.background.transparent10};
    color: ${({ theme }) => theme.semantic.text.high};
  }
`;

const Body = styled.div<{ $padded: boolean }>`
  flex: 1;
  overflow-y: auto;
  ${({ $padded }) =>
    $padded &&
    css`
      padding: 0 24px 8px;
    `}
  color: ${({ theme }) => theme.semantic.text.high};
  font-size: 14px;
  line-height: 1.6;
`;

const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  padding: 16px 24px 20px;
`;

export const Modal = ({
  open,
  onClose,
  type = 'modal',
  size,
  width,
  title,
  description,
  showCloseButton = true,
  footer,
  closeOnBackdropClick = true,
  closeOnEsc = true,
  children,
  ...rest
}: ModalProps) => {
  const panelRef = useRef<HTMLDivElement>(null);

  // ESC 關閉
  useEffect(() => {
    if (!open || !closeOnEsc) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose?.();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [open, closeOnEsc, onClose]);

  // body scroll lock
  useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = original;
    };
  }, [open]);

  const handleBackdropClick = useCallback(
    (e: React.MouseEvent) => {
      if (!closeOnBackdropClick) return;
      if (e.target === e.currentTarget) onClose?.();
    },
    [closeOnBackdropClick, onClose],
  );

  if (!open) return null;

  const resolvedSize = size ?? typeDefaults[type];
  const resolvedWidth = width ?? sizeWidth[resolvedSize];

  return (
    <Portal>
      <Backdrop onClick={handleBackdropClick} role="presentation">
        <Panel
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby={title ? 'modal-title' : undefined}
          aria-describedby={description ? 'modal-description' : undefined}
          $width={resolvedWidth}
          {...rest}
        >
          {(title || showCloseButton) && (
            <Header $hasDescription={!!description}>
              <Titles>
                {title && <TitleEl id="modal-title">{title}</TitleEl>}
                {description && (
                  <DescriptionEl id="modal-description">
                    {description}
                  </DescriptionEl>
                )}
              </Titles>
              {showCloseButton && onClose && (
                <CloseButton onClick={onClose} aria-label="關閉">
                  <CloseIcon size={20} />
                </CloseButton>
              )}
            </Header>
          )}
          {children && <Body $padded>{children}</Body>}
          {footer && <Footer>{footer}</Footer>}
        </Panel>
      </Backdrop>
    </Portal>
  );
};

Modal.displayName = 'Modal';
