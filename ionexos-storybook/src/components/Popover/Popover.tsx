import styled, { keyframes } from 'styled-components';
import {
  cloneElement,
  isValidElement,
  useEffect,
  useId,
  useRef,
  useState,
  useCallback,
} from 'react';
import type { ReactElement, ReactNode, CSSProperties } from 'react';
import { Portal } from '../_shared/Portal';
import { useClickOutside } from '../_shared/useClickOutside';

export type PopoverPlacement =
  | 'top'
  | 'bottom'
  | 'left'
  | 'right'
  | 'top-start'
  | 'top-end'
  | 'bottom-start'
  | 'bottom-end';

export interface PopoverProps {
  /** 觸發元素 */
  children: ReactElement;
  /** Popover 內容 */
  content: ReactNode;
  /** 顯式控制（受控） */
  open?: boolean;
  /** 預設展開 */
  defaultOpen?: boolean;
  /** 變更回呼 */
  onOpenChange?: (open: boolean) => void;
  /** 顯示位置 */
  placement?: PopoverPlacement;
  /** 觸發方式 */
  trigger?: 'click' | 'hover';
  /** 與觸發元素的間距 */
  offset?: number;
  /** 是否顯示箭頭 */
  showArrow?: boolean;
  /** 最大寬度 */
  maxWidth?: number;
  /** 點外部關閉（預設 true） */
  closeOnClickOutside?: boolean;
}

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(2px); }
  to { opacity: 1; transform: translateY(0); }
`;

const PopoverRoot = styled.div<{ $maxWidth: number }>`
  position: absolute;
  z-index: 1000;
  animation: ${fadeIn} 140ms ease-out;
  font-family: ${({ theme }) => theme.fontFamily.primary};
  max-width: ${({ $maxWidth }) => $maxWidth}px;
`;

const Bubble = styled.div`
  background: ${({ theme }) => theme.semantic.background.bright};
  color: ${({ theme }) => theme.semantic.text.high};
  border: 1px solid ${({ theme }) => theme.semantic.background.transparent10};
  border-radius: ${({ theme }) => theme.radius.md};
  box-shadow: ${({ theme }) => theme.shadows.hero};
  font-size: 14px;
  line-height: 1.5;
`;

function computePosition(
  triggerRect: DOMRect,
  placement: PopoverPlacement,
  offset: number,
) {
  const scrollX = window.scrollX;
  const scrollY = window.scrollY;
  const cx = triggerRect.left + scrollX + triggerRect.width / 2;
  const cy = triggerRect.top + scrollY + triggerRect.height / 2;
  const top = triggerRect.top + scrollY;
  const bottom = triggerRect.bottom + scrollY;
  const left = triggerRect.left + scrollX;
  const right = triggerRect.right + scrollX;

  const map: Record<PopoverPlacement, { top: number; left: number; transform: string }> = {
    top: { top: top - offset, left: cx, transform: 'translate(-50%, -100%)' },
    bottom: { top: bottom + offset, left: cx, transform: 'translate(-50%, 0)' },
    left: { top: cy, left: left - offset, transform: 'translate(-100%, -50%)' },
    right: { top: cy, left: right + offset, transform: 'translate(0, -50%)' },
    'top-start': { top: top - offset, left, transform: 'translate(0, -100%)' },
    'top-end': { top: top - offset, left: right, transform: 'translate(-100%, -100%)' },
    'bottom-start': { top: bottom + offset, left, transform: 'translate(0, 0)' },
    'bottom-end': { top: bottom + offset, left: right, transform: 'translate(-100%, 0)' },
  };
  return map[placement];
}

export const Popover = ({
  children,
  content,
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  placement = 'bottom',
  trigger = 'click',
  offset = 8,
  showArrow = false,
  maxWidth = 320,
  closeOnClickOutside = true,
}: PopoverProps) => {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const open = openProp ?? internalOpen;
  const setOpen = useCallback(
    (v: boolean) => {
      if (openProp === undefined) setInternalOpen(v);
      onOpenChange?.(v);
    },
    [openProp, onOpenChange],
  );

  const triggerRef = useRef<HTMLElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ top: 0, left: 0, transform: '' });
  const popoverId = useId();

  const updatePosition = useCallback(() => {
    if (!triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    setPos(computePosition(rect, placement, offset));
  }, [placement, offset]);

  useEffect(() => {
    if (!open) return;
    updatePosition();
    const handler = () => updatePosition();
    window.addEventListener('scroll', handler, true);
    window.addEventListener('resize', handler);
    return () => {
      window.removeEventListener('scroll', handler, true);
      window.removeEventListener('resize', handler);
    };
  }, [open, updatePosition]);

  useClickOutside(
    [triggerRef as any, popoverRef],
    () => setOpen(false),
    open && trigger === 'click' && closeOnClickOutside,
  );

  if (!isValidElement(children)) {
    return children as any;
  }

  const handlers: Record<string, any> = {};
  if (trigger === 'click') {
    handlers.onClick = (e: any) => {
      setOpen(!open);
      (children.props as any).onClick?.(e);
    };
  } else {
    handlers.onMouseEnter = (e: any) => {
      setOpen(true);
      (children.props as any).onMouseEnter?.(e);
    };
    handlers.onMouseLeave = (e: any) => {
      setOpen(false);
      (children.props as any).onMouseLeave?.(e);
    };
  }

  const triggerEl = cloneElement(children, {
    ref: triggerRef,
    'aria-haspopup': 'dialog',
    'aria-expanded': open,
    'aria-controls': open ? popoverId : undefined,
    ...handlers,
  } as any);

  const style: CSSProperties = {
    top: pos.top,
    left: pos.left,
    transform: pos.transform,
  };

  return (
    <>
      {triggerEl}
      {open && (
        <Portal>
          <PopoverRoot
            ref={popoverRef}
            id={popoverId}
            role="dialog"
            $maxWidth={maxWidth}
            style={style}
            onMouseEnter={trigger === 'hover' ? () => setOpen(true) : undefined}
            onMouseLeave={trigger === 'hover' ? () => setOpen(false) : undefined}
          >
            <Bubble>{content}</Bubble>
          </PopoverRoot>
        </Portal>
      )}
    </>
  );
};

Popover.displayName = 'Popover';
