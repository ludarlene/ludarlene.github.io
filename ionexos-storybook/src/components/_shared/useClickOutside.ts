import { useEffect } from 'react';
import type { RefObject } from 'react';

/**
 * 偵測點擊在指定元素外部時觸發 handler
 * 多個 refs 都會被排除（用於 trigger + popup 分離的情境）
 */
export function useClickOutside(
  refs: RefObject<HTMLElement | null>[],
  handler: () => void,
  enabled = true,
) {
  useEffect(() => {
    if (!enabled) return;
    const onPointer = (e: MouseEvent | TouchEvent) => {
      const target = e.target as Node;
      const isInside = refs.some((ref) => ref.current?.contains(target));
      if (!isInside) handler();
    };
    document.addEventListener('mousedown', onPointer);
    document.addEventListener('touchstart', onPointer);
    return () => {
      document.removeEventListener('mousedown', onPointer);
      document.removeEventListener('touchstart', onPointer);
    };
  }, [refs, handler, enabled]);
}
