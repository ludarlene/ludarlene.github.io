import styled from 'styled-components';
import type { HTMLAttributes, ReactNode } from 'react';
import { ZoomInIcon, ZoomOutIcon } from '../_shared/icons';

export interface MapContainerProps extends HTMLAttributes<HTMLDivElement> {
  /** 寬度 */
  width?: number | string;
  /** 高度 */
  height?: number | string;
  /** 是否顯示縮放工具列 */
  showZoomTool?: boolean;
  /** Zoom in 回呼 */
  onZoomIn?: () => void;
  /** Zoom out 回呼 */
  onZoomOut?: () => void;
  /** 浮在地圖上的 overlay（例如圖例、搜尋框） */
  overlay?: ReactNode;
  /** 地圖內容（pin / tip 或實際地圖 iframe / canvas） */
  children?: ReactNode;
}

const Container = styled.div<{ $w?: string; $h?: string }>`
  position: relative;
  width: ${({ $w }) => $w ?? '100%'};
  height: ${({ $h }) => $h ?? '588px'};
  background: ${({ theme }) => theme.semantic.background.bar};
  border: 1px solid ${({ theme }) => theme.semantic.background.transparent10};
  border-radius: ${({ theme }) => theme.radius.lg};
  overflow: hidden;
  font-family: ${({ theme }) => theme.fontFamily.primary};

  /* 預設背景紋路：模擬地圖網格 */
  background-image:
    linear-gradient(
      to right,
      ${({ theme }) => theme.semantic.background.transparent5} 1px,
      transparent 1px
    ),
    linear-gradient(
      to bottom,
      ${({ theme }) => theme.semantic.background.transparent5} 1px,
      transparent 1px
    );
  background-size: 40px 40px;
`;

const ZoomTool = styled.div`
  position: absolute;
  bottom: 16px;
  right: 16px;
  display: inline-flex;
  flex-direction: column;
  width: 40px;
  background: ${({ theme }) => theme.semantic.background.bright};
  border: 1px solid ${({ theme }) => theme.semantic.background.transparent10};
  border-radius: ${({ theme }) => theme.radius.md};
  box-shadow: ${({ theme }) => theme.shadows.head};
  overflow: hidden;
  z-index: 2;
`;

const ZoomButton = styled.button.attrs({ type: 'button' })`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: transparent;
  border: 0;
  color: ${({ theme }) => theme.semantic.text.high};
  cursor: pointer;
  transition: background-color 150ms ease;

  & + & {
    border-top: 1px solid ${({ theme }) => theme.semantic.background.transparent10};
  }

  &:hover {
    background: ${({ theme }) => theme.semantic.background.transparent10};
  }
`;

const OverlaySlot = styled.div`
  position: absolute;
  top: 16px;
  left: 16px;
  right: 70px;
  z-index: 2;
  pointer-events: none;
  & > * {
    pointer-events: auto;
  }
`;

const Content = styled.div`
  position: absolute;
  inset: 0;
`;

export const MapContainer = ({
  width,
  height,
  showZoomTool = true,
  onZoomIn,
  onZoomOut,
  overlay,
  children,
  ...rest
}: MapContainerProps) => {
  const w = typeof width === 'number' ? `${width}px` : width;
  const h = typeof height === 'number' ? `${height}px` : height;
  return (
    <Container $w={w} $h={h} {...rest}>
      <Content>{children}</Content>
      {overlay && <OverlaySlot>{overlay}</OverlaySlot>}
      {showZoomTool && (
        <ZoomTool>
          <ZoomButton onClick={onZoomIn} aria-label="放大">
            <ZoomInIcon size={18} />
          </ZoomButton>
          <ZoomButton onClick={onZoomOut} aria-label="縮小">
            <ZoomOutIcon size={18} />
          </ZoomButton>
        </ZoomTool>
      )}
    </Container>
  );
};

MapContainer.displayName = 'MapContainer';
