import styled, { css } from 'styled-components';
import type { HTMLAttributes, ReactNode } from 'react';

export interface ScrollAreaProps extends HTMLAttributes<HTMLDivElement> {
  /** 高度。可傳入 px 或 css string */
  height?: number | string;
  /** 寬度 */
  width?: number | string;
  /** 滾動條只在 hover 時顯示 */
  hideOnIdle?: boolean;
  /** 軌道厚度（預設 4px，對應 Figma） */
  thickness?: number;
  children?: ReactNode;
}

const Root = styled.div<{
  $height?: string;
  $width?: string;
  $thickness: number;
  $hideOnIdle: boolean;
}>`
  ${({ $height }) =>
    $height &&
    css`
      height: ${$height};
    `}
  ${({ $width }) =>
    $width &&
    css`
      width: ${$width};
    `}
  overflow: auto;
  font-family: inherit;

  /* WebKit */
  &::-webkit-scrollbar {
    width: ${({ $thickness }) => $thickness}px;
    height: ${({ $thickness }) => $thickness}px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.semantic.background.transparent20};
    border-radius: 999px;
    transition: background 150ms ease;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.semantic.background.transparent40};
  }
  &::-webkit-scrollbar-corner {
    background: transparent;
  }

  /* Firefox */
  scrollbar-width: thin;
  scrollbar-color: ${({ theme }) => theme.semantic.background.transparent20}
    transparent;

  ${({ $hideOnIdle, theme }) =>
    $hideOnIdle &&
    css`
      &::-webkit-scrollbar-thumb {
        background: transparent;
      }
      &:hover::-webkit-scrollbar-thumb {
        background: ${theme.semantic.background.transparent20};
      }
    `}
`;

export const ScrollArea = ({
  height,
  width,
  hideOnIdle = false,
  thickness = 4,
  children,
  ...rest
}: ScrollAreaProps) => {
  const h = typeof height === 'number' ? `${height}px` : height;
  const w = typeof width === 'number' ? `${width}px` : width;
  return (
    <Root
      $height={h}
      $width={w}
      $thickness={thickness}
      $hideOnIdle={hideOnIdle}
      {...rest}
    >
      {children}
    </Root>
  );
};

ScrollArea.displayName = 'ScrollArea';
