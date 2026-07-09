/**
 * IonexOS Design System - Theme
 * 將所有 tokens 整合為 styled-components Theme 物件
 * 提供 darkTheme（預設）和 lightTheme 兩個變體
 */

import { colors } from './colors';
import { semanticColorsDark, semanticColorsLight } from './semantic-colors';
import { typography, fontFamily, fontWeight } from './typography';
import { shadows } from './shadows';
import { breakpoints, mediaQuery, spacing, radius } from './layout';

export type ThemeMode = 'dark' | 'light';

export const darkTheme = {
  mode: 'dark' as ThemeMode,
  colors,
  semantic: semanticColorsDark,
  typography,
  fontFamily,
  fontWeight,
  shadows,
  breakpoints,
  mediaQuery,
  spacing,
  radius,
} as const;

export const lightTheme = {
  ...darkTheme,
  mode: 'light' as ThemeMode,
  semantic: semanticColorsLight,
} as const;

export type Theme = typeof darkTheme;

/**
 * 依 mode 取得對應 theme
 */
export function getTheme(mode: ThemeMode): Theme {
  return mode === 'light' ? (lightTheme as Theme) : darkTheme;
}

export const tokens = darkTheme;
