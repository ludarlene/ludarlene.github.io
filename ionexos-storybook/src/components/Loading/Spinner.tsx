import styled, { keyframes } from 'styled-components';
import type { HTMLAttributes } from 'react';

export type SpinnerSize = 'small' | 'medium' | 'large';
export type SpinnerVariant = 'primary' | 'inherit';

export interface SpinnerProps extends HTMLAttributes<HTMLSpanElement> {
  size?: SpinnerSize;
  variant?: SpinnerVariant;
  /** 自訂尺寸（會覆寫 size prop） */
  pixelSize?: number;
}

const sizeMap: Record<SpinnerSize, number> = {
  small: 16,
  medium: 24,
  large: 40,
};

const spin = keyframes`
  to { transform: rotate(360deg); }
`;

const Container = styled.span<{
  $px: number;
  $variant: SpinnerVariant;
}>`
  display: inline-flex;
  width: ${({ $px }) => $px}px;
  height: ${({ $px }) => $px}px;
  flex-shrink: 0;
  color: ${({ theme, $variant }) =>
    $variant === 'inherit' ? 'currentColor' : theme.semantic.primary.main};
`;

const Circle = styled.svg<{ $px: number }>`
  width: 100%;
  height: 100%;
  animation: ${spin} 0.9s linear infinite;
`;

const Track = styled.circle`
  stroke: currentColor;
  opacity: 0.2;
`;

const Arc = styled.circle`
  stroke: currentColor;
  stroke-linecap: round;
`;

export const Spinner = ({
  size = 'medium',
  variant = 'primary',
  pixelSize,
  'aria-label': ariaLabel = '載入中',
  ...rest
}: SpinnerProps) => {
  const px = pixelSize ?? sizeMap[size];
  const stroke = Math.max(2, Math.round(px / 10));
  const radius = (px - stroke) / 2;
  const circumference = 2 * Math.PI * radius;

  return (
    <Container
      $px={px}
      $variant={variant}
      role="status"
      aria-label={ariaLabel}
      {...rest}
    >
      <Circle $px={px} viewBox={`0 0 ${px} ${px}`}>
        <Track
          cx={px / 2}
          cy={px / 2}
          r={radius}
          fill="none"
          strokeWidth={stroke}
        />
        <Arc
          cx={px / 2}
          cy={px / 2}
          r={radius}
          fill="none"
          strokeWidth={stroke}
          strokeDasharray={`${circumference * 0.25} ${circumference}`}
        />
      </Circle>
    </Container>
  );
};

Spinner.displayName = 'Spinner';
