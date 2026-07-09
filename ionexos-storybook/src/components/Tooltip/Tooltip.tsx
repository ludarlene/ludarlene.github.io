import styled, { css, keyframes } from 'styled-components';
import {
  cloneElement,
  isValidElement,
  useId,
  useRef,
  useState,
  useEffect,
  useCallback,
} from 'react';
import type { ReactElement, ReactNode, CSSProperties } from 'react';
import { Portal } from '../_shared/Portal';

export type TooltipPlacement = 'top' | 'right' | 'bottom' | 'left';

export interface TooltipProps {
  /** Tooltip 內容主文 */
  content: ReactNode;
  /** 標題（type4 樣式） */
  title?: ReactNode;
  /** 底部資訊（type5 樣式，例如快捷鍵） */
  footer?: ReactNode;
  /** 觸發元素，必須是單一 React element */
  children: ReactElement;
  /** 顯示位置 */
  placement?: TooltipPlacement;
  /** 開啟延遲（ms） */
  delay?: number;
  /** 顯式控制（受控） */
  open?: boolean;
  /** 預設顯示（除錯用） */
  defaultOpen?: boolean;
  /** 觸發方式 */
  trigger?: 'hover' | 'focus' | 'click' | Array<'hover' | 'focus' | 'click'>;
  /** Tooltip 最大寬度 */
  maxWidth?: number;
  /** 停用 */
  disabled?: boolean;
  /** 不要 portal（給除錯用） */
  inline?: boolean;
}

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(2px); }
  to { opacity: 1; transform: translateY(0); }
`;

const TooltipRoot = styled.div<{ $maxWidth: number }>`
  position: absolute;
  z-index: 1000;
  pointer-events: none;
  animation: ${fadeIn} 120ms ease-out;
  font-family: ${({ theme }) => theme.fontFamily.primary};
  max-width: ${({ $maxWidth }) => $maxWidth}px;
`;

const Bubble = styled.div<{ $hasTitle?: boolean; $hasFooter?: boolean }>`
  background: ${({ theme }) => theme.semantic.background.bar};
  color: ${({ theme }) => theme.semantic.text.high};
  border: 1px solid ${({ theme }) => theme.semantic.background.transparent10};
  border-radius: ${({ theme }) => theme.radius.md};
  padding: ${({ $hasTitle, $hasFooter }) =>
    $hasTitle || $hasFooter ? '10px 12px' : '6px 10px'};
  box-shadow: ${({ theme }) => theme.shadows.head};
  font-size: 12px;
  line-height: 1.5;
  letter-spacing: 0.4px;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Title = styled.div`
  font-size: 13px;
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  color: ${({ theme }) => theme.semantic.text.high};
`;

const Content = styled.div`
  color: ${({ theme }) => theme.semantic.text.middle};
`;

const Footer = styled.div`
  margin-top: 4px;
  padding-top: 6px;
  border-top: 1px solid ${({ theme }) => theme.semantic.background.transparent10};
  font-size: 11px;
  color: ${({ theme }) => theme.semantic.text.lower};
`;

const Arrow = styled.div<{ $placement: TooltipPlacement }>`
  position: absolute;
  width: 8px;
  height: 8px;
  background: ${({ theme }) => theme.semantic.background.bar};
  border: 1px solid ${({ theme }) => theme.semantic.background.transparent10};
  ${({ $placement }) => {
    switch ($placement) {
      case 'top':
        return css`
          bottom: -5px;
          left: 50%;
          transform: translateX(-50%) rotate(45deg);
          border-top: 0;
          border-left: 0;
        `;
      case 'bottom':
        return css`
          top: -5px;
          left: 50%;
          transform: translateX(-50%) rotate(45deg);
          border-bottom: 0;
          border-right: 0;
        `;
      case 'left':
        return css`
          right: -5px;
          top: 50%;
          transform: translateY(-50%) rotate(45deg);
          border-bottom: 0;
          border-left: 0;
        `;
      case 'right':
        return css`
          left: -5px;
          top: 50%;
          transform: translateY(-50%) rotate(45deg);
          border-top: 0;
          border-right: 0;
        `;
    }
  }}
`;

/**
 * 計算 tooltip 相對於觸發元素的位置（document 座標系）
 * 間距固定 8px
 */
function computePosition(
  triggerRect: DOMRect,
  placement: TooltipPlacement,
): { top: number; left: number; transform: string } {
  const gap = 8;
  const scrollX = window.scrollX;
  const scrollY = window.scrollY;
  const cx = triggerRect.left + scrollX + triggerRect.width / 2;
  const cy = triggerRect.top + scrollY + triggerRect.height / 2;

  switch (placement) {
    case 'top':
      return {
        top: triggerRect.top + scrollY - gap,
        left: cx,
        transform: 'translate(-50%, -100%)',
      };
    case 'bottom':
      return {
        top: triggerRect.bottom + scrollY + gap,
        left: cx,
        transform: 'translate(-50%, 0)',
      };
    case 'left':
      return {
        top: cy,
        left: triggerRect.left + scrollX - gap,
        transform: 'translate(-100%, -50%)',
      };
    case 'right':
      return {
        top: cy,
        left: triggerRect.right + scrollX + gap,
        transform: 'translate(0, -50%)',
      };
  }
}

export const Tooltip = ({
  content,
  title,
  footer,
  children,
  placement = 'top',
  delay = 100,
  open: openProp,
  defaultOpen = false,
  trigger = ['hover', 'focus'],
  maxWidth = 280,
  disabled,
  inline,
}: TooltipProps) => {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const open = openProp ?? internalOpen;
  const setOpen = (v: boolean) => {
    if (openProp === undefined) setInternalOpen(v);
  };

  const triggerRef = useRef<HTMLElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [pos, setPos] = useState<{ top: number; left: number; transform: string }>(
    { top: 0, left: 0, transform: '' },
  );
  const tooltipId = useId();

  const triggers = Array.isArray(trigger) ? trigger : [trigger];

  const updatePosition = useCallback(() => {
    if (!triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    setPos(computePosition(rect, placement));
  }, [placement]);

  useEffect(() => {
    if (!open) return;
    updatePosition();
    const onScrollOrResize = () => updatePosition();
    window.addEventListener('scroll', onScrollOrResize, true);
    window.addEventListener('resize', onScrollOrResize);
    return () => {
      window.removeEventListener('scroll', onScrollOrResize, true);
      window.removeEventListener('resize', onScrollOrResize);
    };
  }, [open, updatePosition]);

  const show = () => {
    if (disabled) return;
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setOpen(true), delay);
  };

  const hide = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setOpen(false);
  };

  // 把事件 attach 到 children 元素上
  if (!isValidElement(children)) {
    if (typeof console !== 'undefined') {
      console.warn('[Tooltip] children 必須是單一可接收 ref 的 React 元素');
    }
    return children as any;
  }

  const handlers: Record<string, any> = {};
  if (triggers.includes('hover')) {
    handlers.onMouseEnter = (e: any) => {
      show();
      (children.props as any).onMouseEnter?.(e);
    };
    handlers.onMouseLeave = (e: any) => {
      hide();
      (children.props as any).onMouseLeave?.(e);
    };
  }
  if (triggers.includes('focus')) {
    handlers.onFocus = (e: any) => {
      show();
      (children.props as any).onFocus?.(e);
    };
    handlers.onBlur = (e: any) => {
      hide();
      (children.props as any).onBlur?.(e);
    };
  }
  if (triggers.includes('click')) {
    handlers.onClick = (e: any) => {
      open ? hide() : show();
      (children.props as any).onClick?.(e);
    };
  }

  const triggerEl = cloneElement(children, {
    ref: triggerRef,
    'aria-describedby': open ? tooltipId : undefined,
    ...handlers,
  } as any);

  const style: CSSProperties = {
    top: pos.top,
    left: pos.left,
    transform: pos.transform,
  };

  const popup =
    open && !disabled ? (
      <TooltipRoot $maxWidth={maxWidth} role="tooltip" id={tooltipId} style={style}>
        <Bubble $hasTitle={!!title} $hasFooter={!!footer}>
          {title && <Title>{title}</Title>}
          <Content>{content}</Content>
          {footer && <Footer>{footer}</Footer>}
        </Bubble>
        <Arrow $placement={placement} />
      </TooltipRoot>
    ) : null;

  return (
    <>
      {triggerEl}
      {popup && (inline ? popup : <Portal>{popup}</Portal>)}
    </>
  );
};

Tooltip.displayName = 'Tooltip';
