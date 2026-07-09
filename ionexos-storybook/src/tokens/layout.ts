/**
 * IonexOS Design System - Layout Tokens
 * Breakpoints、spacing、radius
 * 註：spacing 與 radius 為設計系統常見預設值，
 * 待從 Figma 個別元件抓取後再行校準
 */

export const breakpoints = {
  mobile: '480px',
  tablet: '768px',
  laptop: '1024px',
  desktop: '1440px',
  wide: '1920px',
} as const;

export const mediaQuery = {
  mobile: `@media (min-width: ${breakpoints.mobile})`,
  tablet: `@media (min-width: ${breakpoints.tablet})`,
  laptop: `@media (min-width: ${breakpoints.laptop})`,
  desktop: `@media (min-width: ${breakpoints.desktop})`,
  wide: `@media (min-width: ${breakpoints.wide})`,
} as const;

// 8-point grid system（待從元件 padding/gap 反推校準）
export const spacing = {
  0: '0',
  1: '4px',
  2: '8px',
  3: '12px',
  4: '16px',
  5: '20px',
  6: '24px',
  7: '28px',
  8: '32px',
  10: '40px',
  12: '48px',
  16: '64px',
  20: '80px',
  24: '96px',
} as const;

export const radius = {
  none: '0',
  sm: '4px',
  md: '8px',
  lg: '12px',
  xl: '16px',
  '2xl': '24px',
  full: '9999px',
} as const;

export type Breakpoint = keyof typeof breakpoints;
export type Spacing = keyof typeof spacing;
export type Radius = keyof typeof radius;
