/**
 * IonexOS Design System - Semantic Color Tokens
 * Source: Figma Variables (v1.8)
 * 語意化色彩，請優先使用此層，元件中不要直接引用 primitives
 */

export const semanticColorsDark = {
  background: {
    bar: '#0e162c',
    bright: '#141e38',
    default: '#080f24',
    paper: '#080f24',
    transparent0: '#ffffff00',
    transparent5: '#ffffff0a',
    transparent10: '#ffffff14',
    transparent20: '#ffffff33',
    transparent30: '#ffffff4d',
    transparent40: '#ffffff66',
    transparent50: '#ffffff80',
    transparent60: '#ffffff99',
  },
  button: {
    primary: '#668bfa',
    hover: '#243d8b',
    focus: '#384c8a',
    disable: '#282735',
  },
  text: {
    high: '#eaedf0',
    middle: '#8a8fa7',
    low: '#243d8b',
    lower: '#545665',
    white: '#ffffff',
    highlight: '#5d7ee4',
  },
  primary: {
    main: '#668bfa',
    light: '#85a2fb',
    dark: '#5d7ee4',
    surface: '#243d8b',
  },
  secondary: {
    main: '#00a0e9',
    light: '#33b3ed',
    dark: '#0092d4',
    surface: '#053247',
  },
  tertiary: {
    main: '#8133f1',
    light: '#9a5cf4',
    dark: '#752edb',
    surface: '#1e0048',
  },
  success: {
    main: '#11c291',
    light: '#41cea7',
    dark: '#0fb184',
    surface: '#0e3d30',
  },
  warning: {
    main: '#faa054',
    light: '#fbb376',
    dark: '#e4924c',
    surface: '#401d00',
  },
  error: {
    main: '#fd5463',
    light: '#fd7682',
    dark: '#e64c5a',
    surface: '#40192e',
  },
  info: {
    main: '#8a8fa7',
    light: '#989db8',
    dark: '#545665',
    surface: '#282735',
  },
  table: {
    header: '#141e38',
    divider: '#2a3966',
    hover: '#2a3966',
    even: '#0e162c',
    odd: '#121b33',
  },
};

/**
 * 語意色 token 的型別，由 dark theme 推導
 * 注意：故意不用 `as const`，讓 light theme 能塞入不同色票
 */
export type SemanticColors = typeof semanticColorsDark;

/**
 * Light theme semantic colors
 *
 * 設計原則：
 * - 結構與 dark 完全相同（每個 key 都對應），切換 theme 時元件 zero-change
 * - 背景反轉：深 → 淺，提供層次感
 * - 文字反轉：淺 → 深，high 用近黑色而非純黑以降低眼睛疲勞
 * - 品牌色 primary 維持相同色相但稍微加深以在淺底維持對比
 * - 語意色（success/warning/error）保持識別性，surface 改為淡色
 * - transparent 系列改用黑色 alpha
 *
 * 注意：本檔為依設計慣例推導，後續若 Figma Light mode 更新，
 * 可從 Overlay Mode=Light 等節點取 variable 校準。
 */
export const semanticColorsLight: SemanticColors = {
  background: {
    bar: '#f4f6fa',
    bright: '#ffffff',
    default: '#f8f9fc',
    paper: '#ffffff',
    transparent0: '#00000000',
    transparent5: '#0000000a',
    transparent10: '#00000014',
    transparent20: '#00000033',
    transparent30: '#0000004d',
    transparent40: '#00000066',
    transparent50: '#00000080',
    transparent60: '#00000099',
  },
  button: {
    primary: '#4a6fdc',
    hover: '#d8e0fa',
    focus: '#b8c6f1',
    disable: '#e5e7eb',
  },
  text: {
    high: '#1a1f36',
    middle: '#5a6479',
    low: '#a8aebd',
    lower: '#c7cbd6',
    white: '#ffffff',
    highlight: '#4a6fdc',
  },
  primary: {
    main: '#4a6fdc',
    light: '#668bfa',
    dark: '#3856b8',
    surface: '#e0e8fb',
  },
  secondary: {
    main: '#0086c4',
    light: '#00a0e9',
    dark: '#006ea0',
    surface: '#d6effa',
  },
  tertiary: {
    main: '#6e29d4',
    light: '#8133f1',
    dark: '#5921b0',
    surface: '#ece0fb',
  },
  success: {
    main: '#0ea676',
    light: '#11c291',
    dark: '#0a8761',
    surface: '#d9f5ea',
  },
  warning: {
    main: '#e08442',
    light: '#faa054',
    dark: '#b96a30',
    surface: '#fdebd9',
  },
  error: {
    main: '#dc3545',
    light: '#fd5463',
    dark: '#b32a37',
    surface: '#fadde0',
  },
  info: {
    main: '#5a6479',
    light: '#8a8fa7',
    dark: '#3d4456',
    surface: '#eceef3',
  },
  table: {
    header: '#f4f6fa',
    divider: '#e5e8ee',
    hover: '#f0f3f9',
    even: '#fafbfd',
    odd: '#ffffff',
  },
};
