import styled, { css, keyframes } from 'styled-components';
import type { HTMLAttributes } from 'react';

export type ProgressVariant = 'determinate' | 'indeterminate';

export interface ProgressBarProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  variant?: ProgressVariant;
  /** 0-100。僅 determinate 模式生效 */
  value?: number;
  /** 顯示百分比文字 */
  showLabel?: boolean;
  /** 自訂高度 */
  thickness?: number;
}

const indeterminateSlide = keyframes`
  0% {
    transform: translateX(-100%);
    width: 35%;
  }
  60% {
    transform: translateX(180%);
    width: 65%;
  }
  100% {
    transform: translateX(280%);
    width: 35%;
  }
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  font-family: ${({ theme }) => theme.fontFamily.primary};
`;

const Track = styled.div<{ $thickness: number }>`
  position: relative;
  flex: 1;
  height: ${({ $thickness }) => $thickness}px;
  border-radius: 999px;
  background: ${({ theme }) => theme.semantic.background.transparent10};
  overflow: hidden;
`;

const Bar = styled.div<{
  $variant: ProgressVariant;
  $value: number;
}>`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  border-radius: 999px;
  background: ${({ theme }) => theme.semantic.primary.main};

  ${({ $variant, $value }) =>
    $variant === 'determinate'
      ? css`
          width: ${$value}%;
          transition: width 200ms ease;
        `
      : css`
          animation: ${indeterminateSlide} 1.4s ease-in-out infinite;
          background: linear-gradient(
            90deg,
            transparent,
            ${({ theme }) => theme.semantic.primary.main} 30%,
            ${({ theme }) => theme.semantic.primary.light} 50%,
            ${({ theme }) => theme.semantic.primary.main} 70%,
            transparent
          );
        `}
`;

const Label = styled.span`
  font-family: ${({ theme }) => theme.fontFamily.mono};
  font-size: 12px;
  color: ${({ theme }) => theme.semantic.text.middle};
  min-width: 36px;
  text-align: right;
`;

export const ProgressBar = ({
  variant = 'determinate',
  value = 0,
  showLabel,
  thickness = 8,
  ...rest
}: ProgressBarProps) => {
  const safeValue = Math.max(0, Math.min(100, value));

  return (
    <Wrapper
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={variant === 'determinate' ? safeValue : undefined}
      {...rest}
    >
      <Track $thickness={thickness}>
        <Bar $variant={variant} $value={safeValue} />
      </Track>
      {showLabel && variant === 'determinate' && (
        <Label>{Math.round(safeValue)}%</Label>
      )}
    </Wrapper>
  );
};

ProgressBar.displayName = 'ProgressBar';
