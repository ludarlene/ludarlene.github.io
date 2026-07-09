import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import type { ReactNode } from 'react';

interface PortalProps {
  children: ReactNode;
  /** 自訂掛載目標。預設掛在 document.body */
  container?: HTMLElement | null;
  /** 是否啟用 portal（false 時直接 inline render） */
  enabled?: boolean;
}

export const Portal = ({ children, container, enabled = true }: PortalProps) => {
  const [mountNode, setMountNode] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (!enabled) return;
    setMountNode(container ?? document.body);
  }, [container, enabled]);

  if (!enabled) return <>{children}</>;
  if (!mountNode) return null;
  return createPortal(children, mountNode);
};
