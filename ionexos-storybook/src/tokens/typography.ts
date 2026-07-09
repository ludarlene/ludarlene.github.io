/**
 * IonexOS Design System - Typography Tokens
 * Source: Figma Variables (v1.8)
 * Font family: Noto Sans TC（中文）
 */

export const fontFamily = {
  primary: '"Noto Sans TC", -apple-system, BlinkMacSystemFont, sans-serif',
  mono: '"JetBrains Mono", "Courier New", monospace',
} as const;

export const fontWeight = {
  regular: 400,
  medium: 500,
  bold: 700,
} as const;

export const typography = {
  h1: {
    fontFamily: fontFamily.primary,
    fontSize: '32px',
    fontWeight: fontWeight.bold,
    lineHeight: '100%',
    letterSpacing: '0.27px',
  },
  h2: {
    fontFamily: fontFamily.primary,
    fontSize: '28px',
    fontWeight: fontWeight.bold,
    lineHeight: '44px',
    letterSpacing: '0.5px',
  },
  h3: {
    fontFamily: fontFamily.primary,
    fontSize: '24px',
    fontWeight: fontWeight.bold,
    lineHeight: '100%',
    letterSpacing: '0.2px',
  },
  h4: {
    fontFamily: fontFamily.primary,
    fontSize: '22px',
    fontWeight: fontWeight.medium,
    lineHeight: '100%',
    letterSpacing: '0.22px',
  },
  h5: {
    fontFamily: fontFamily.primary,
    fontSize: '20px',
    fontWeight: fontWeight.medium,
    lineHeight: '100%',
    letterSpacing: '0',
  },
  h6: {
    fontFamily: fontFamily.primary,
    fontSize: '18px',
    fontWeight: fontWeight.medium,
    lineHeight: '100%',
    letterSpacing: '0.17px',
  },
  subtitle1: {
    fontFamily: fontFamily.primary,
    fontSize: '16px',
    fontWeight: fontWeight.medium,
    lineHeight: '100%',
    letterSpacing: '0.15px',
  },
  subtitle2: {
    fontFamily: fontFamily.primary,
    fontSize: '14px',
    fontWeight: fontWeight.medium,
    lineHeight: '100%',
    letterSpacing: '0',
  },
  body1: {
    fontFamily: fontFamily.primary,
    fontSize: '16px',
    fontWeight: fontWeight.regular,
    lineHeight: '100%',
    letterSpacing: '0.2px',
  },
  body2: {
    fontFamily: fontFamily.primary,
    fontSize: '14px',
    fontWeight: fontWeight.regular,
    lineHeight: '100%',
    letterSpacing: '0.25px',
  },
  button1: {
    fontFamily: fontFamily.primary,
    fontSize: '16px',
    fontWeight: fontWeight.bold,
    lineHeight: '100%',
    letterSpacing: '0',
  },
  button2: {
    fontFamily: fontFamily.primary,
    fontSize: '14px',
    fontWeight: fontWeight.bold,
    lineHeight: '20px',
    letterSpacing: '0',
  },
  button3: {
    fontFamily: fontFamily.primary,
    fontSize: '12px',
    fontWeight: fontWeight.medium,
    lineHeight: '100%',
    letterSpacing: '0',
  },
  caption: {
    fontFamily: fontFamily.primary,
    fontSize: '12px',
    fontWeight: fontWeight.regular,
    lineHeight: '100%',
    letterSpacing: '0.4px',
  },
} as const;

export type TypographyVariant = keyof typeof typography;
export type Typography = typeof typography;
