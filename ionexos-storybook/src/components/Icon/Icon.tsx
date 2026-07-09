import styled from 'styled-components';
import { forwardRef } from 'react';
import type { SVGAttributes, ReactElement } from 'react';
import { iconRegistry } from './icons';
import type { IconName } from './icons';

export type IconSize =
  | 'xs'    // 12
  | 'sm'    // 14
  | 'md'    // 16（預設）
  | 'lg'    // 20
  | 'xl'    // 24
  | '2xl'   // 32
  | number; // 自訂

export interface IconProps extends Omit<SVGAttributes<SVGSVGElement>, 'name'> {
  /** 圖示名稱（強型別） */
  name: IconName;
  /** 尺寸。預設 md（16px） */
  size?: IconSize;
  /** 顏色，預設 currentColor（繼承父層） */
  color?: string;
  /** 旋轉角度（度） */
  rotate?: number;
  /** 翻轉 */
  flip?: 'horizontal' | 'vertical' | 'both';
}

const sizeMap: Record<Exclude<IconSize, number>, number> = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 20,
  xl: 24,
  '2xl': 32,
};

function resolveSize(size: IconSize): number {
  return typeof size === 'number' ? size : sizeMap[size];
}

function resolveTransform(rotate?: number, flip?: IconProps['flip']): string | undefined {
  const parts: string[] = [];
  if (rotate) parts.push(`rotate(${rotate}deg)`);
  if (flip === 'horizontal') parts.push('scaleX(-1)');
  if (flip === 'vertical') parts.push('scaleY(-1)');
  if (flip === 'both') parts.push('scale(-1, -1)');
  return parts.length > 0 ? parts.join(' ') : undefined;
}

const Wrapper = styled.svg<{ $size: number; $color?: string }>`
  display: inline-block;
  flex-shrink: 0;
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  color: ${({ $color }) => $color ?? 'currentColor'};
  vertical-align: middle;
  transition: transform 200ms ease;
`;

/**
 * 統一的 Icon 元件，透過 `name` prop 載入對應圖示。
 *
 * @example
 * <Icon name="search" />
 * <Icon name="bullet/success" size="lg" color="#22c55e" />
 * <Icon name="nav/dashboard" size={32} rotate={90} />
 */
export const Icon = forwardRef<SVGSVGElement, IconProps>(
  ({ name, size = 'md', color, rotate, flip, style, ...rest }, ref) => {
    const entry = iconRegistry[name];

    if (!entry) {
      // 開發時提示，正式環境靜默
      if (typeof console !== 'undefined') {
        console.warn(`[Icon] 找不到圖示：${name}`);
      }
      return null;
    }

    const resolvedSize = resolveSize(size);
    const transform = resolveTransform(rotate, flip);

    return (
      <Wrapper
        ref={ref}
        $size={resolvedSize}
        $color={color}
        viewBox={entry.viewBox ?? '0 0 24 24'}
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        focusable="false"
        style={transform ? { ...style, transform } : style}
        {...rest}
      >
        {entry.paths}
      </Wrapper>
    );
  },
);

Icon.displayName = 'Icon';

export type { IconName } from './icons';

/**
 * 從圖示 registry 取得 ReactElement，供需要原生 SVG 元素的情境（如 Button 內嵌）使用
 */
export function getIcon(name: IconName, props?: Omit<IconProps, 'name'>): ReactElement | null {
  return <Icon name={name} {...props} />;
}
