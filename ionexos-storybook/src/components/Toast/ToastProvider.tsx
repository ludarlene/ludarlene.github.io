import styled from 'styled-components';
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from 'react';
import type { ReactNode } from 'react';
import { Portal } from '../_shared/Portal';
import { ToastItem } from './ToastItem';
import type { ToastStatus, ToastVariant } from './ToastItem';

export type ToastPosition =
  | 'top-right'
  | 'top-left'
  | 'top-center'
  | 'bottom-right'
  | 'bottom-left'
  | 'bottom-center';

export interface ToastOptions {
  status?: ToastStatus;
  variant?: ToastVariant;
  title?: ReactNode;
  description?: ReactNode;
  /** ms。0 表示不自動關閉 */
  duration?: number;
  action?: ReactNode;
  /** 自訂 ID。若提供，則重複呼叫同 ID 會更新而不疊加 */
  id?: string;
}

interface ToastInstance extends ToastOptions {
  id: string;
}

interface ToastContextValue {
  show: (opts: ToastOptions) => string;
  success: (opts: Omit<ToastOptions, 'status'>) => string;
  info: (opts: Omit<ToastOptions, 'status'>) => string;
  warning: (opts: Omit<ToastOptions, 'status'>) => string;
  failure: (opts: Omit<ToastOptions, 'status'>) => string;
  dismiss: (id: string) => void;
  dismissAll: () => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export const useToast = (): ToastContextValue => {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error('useToast 必須在 <ToastProvider> 內使用');
  }
  return ctx;
};

const positionStyles: Record<ToastPosition, React.CSSProperties> = {
  'top-right': { top: 16, right: 16, alignItems: 'flex-end' },
  'top-left': { top: 16, left: 16, alignItems: 'flex-start' },
  'top-center': { top: 16, left: '50%', transform: 'translateX(-50%)', alignItems: 'center' },
  'bottom-right': { bottom: 16, right: 16, alignItems: 'flex-end' },
  'bottom-left': { bottom: 16, left: 16, alignItems: 'flex-start' },
  'bottom-center': {
    bottom: 16,
    left: '50%',
    transform: 'translateX(-50%)',
    alignItems: 'center',
  },
};

const Stack = styled.div`
  position: fixed;
  z-index: 1100;
  display: flex;
  flex-direction: column;
  gap: 8px;
  pointer-events: none;
  & > * {
    pointer-events: auto;
  }
`;

export interface ToastProviderProps {
  children: ReactNode;
  /** Toast 顯示位置 */
  position?: ToastPosition;
  /** 預設停留時間（ms） */
  defaultDuration?: number;
  /** 同時最多顯示數量 */
  maxVisible?: number;
}

export const ToastProvider = ({
  children,
  position = 'top-right',
  defaultDuration = 4000,
  maxVisible = 5,
}: ToastProviderProps) => {
  const [toasts, setToasts] = useState<ToastInstance[]>([]);
  const timers = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map());

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
    const timer = timers.current.get(id);
    if (timer) {
      clearTimeout(timer);
      timers.current.delete(id);
    }
  }, []);

  const scheduleAutoClose = useCallback(
    (id: string, duration: number) => {
      if (duration <= 0) return;
      const existing = timers.current.get(id);
      if (existing) clearTimeout(existing);
      const t = setTimeout(() => dismiss(id), duration);
      timers.current.set(id, t);
    },
    [dismiss],
  );

  const show = useCallback(
    (opts: ToastOptions) => {
      const id =
        opts.id ??
        `toast-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
      const status = opts.status ?? 'info';
      const duration = opts.duration ?? defaultDuration;
      const instance: ToastInstance = { ...opts, id, status };

      setToasts((prev) => {
        const filtered = prev.filter((t) => t.id !== id);
        const next = [...filtered, instance];
        // 限制最大顯示數量（從舊的開始砍）
        return next.length > maxVisible
          ? next.slice(next.length - maxVisible)
          : next;
      });
      scheduleAutoClose(id, duration);
      return id;
    },
    [defaultDuration, maxVisible, scheduleAutoClose],
  );

  const dismissAll = useCallback(() => {
    timers.current.forEach((t) => clearTimeout(t));
    timers.current.clear();
    setToasts([]);
  }, []);

  const value = useMemo<ToastContextValue>(
    () => ({
      show,
      success: (opts) => show({ ...opts, status: 'success' }),
      info: (opts) => show({ ...opts, status: 'info' }),
      warning: (opts) => show({ ...opts, status: 'warning' }),
      failure: (opts) => show({ ...opts, status: 'failure' }),
      dismiss,
      dismissAll,
    }),
    [show, dismiss, dismissAll],
  );

  const stackStyle = positionStyles[position];
  const isBottom = position.startsWith('bottom');

  return (
    <ToastContext.Provider value={value}>
      {children}
      <Portal>
        <Stack style={stackStyle}>
          {(isBottom ? [...toasts].reverse() : toasts).map((t) => (
            <ToastItem
              key={t.id}
              status={t.status ?? 'info'}
              variant={t.variant}
              title={t.title}
              description={t.description}
              action={t.action}
              onClose={() => dismiss(t.id)}
            />
          ))}
        </Stack>
      </Portal>
    </ToastContext.Provider>
  );
};

ToastProvider.displayName = 'ToastProvider';
