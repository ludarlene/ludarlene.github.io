/**
 * IonexOS Design System - Shadow Tokens
 * Source: Figma Variables (v1.8)
 */

export const shadows = {
  0: 'none',
  100: [
    '0 1px 0 0 #1A1A1A12',
    'inset 0 1px 0 0 #CCCCCC80',
    'inset 0 -1px 0 0 #0000002B',
    'inset -1px 0 0 0 #00000021',
    'inset 1px 0 0 0 #00000021',
  ].join(', '),
  200: [
    '0 3px 1px -1px #1A1A1A12',
    'inset 0 1px 0 0 #CCCCCC80',
    'inset 0 -1px 0 0 #0000002B',
    'inset -1px 0 0 0 #00000021',
    'inset 1px 0 0 0 #00000021',
  ].join(', '),
  300: [
    '0 4px 6px -2px #1A1A1A33',
    'inset 0 1px 0 0 #CCCCCC80',
    'inset 0 -1px 0 0 #0000002B',
    'inset -1px 0 0 0 #00000021',
    'inset 1px 0 0 0 #00000021',
  ].join(', '),
  400: [
    '0 8px 16px -4px #1A1A1A38',
    'inset 0 1px 0 0 #CCCCCC80',
    'inset 0 -1px 0 0 #0000002B',
    'inset -1px 0 0 0 #00000021',
    'inset 1px 0 0 0 #00000021',
  ].join(', '),
  500: [
    '0 12px 20px -8px #1A1A1A3D',
    'inset 0 1px 0 0 #CCCCCC80',
    'inset 0 -1px 0 0 #0000002B',
    'inset -1px 0 0 0 #00000021',
    'inset 1px 0 0 0 #00000021',
  ].join(', '),
  600: [
    '0 20px 20px -8px #1A1A1A47',
    'inset 0 1px 0 0 #CCCCCC80',
    'inset 0 -1px 0 0 #0000002B',
    'inset -1px 0 0 0 #0000002B',
    'inset 1px 0 0 0 #00000021',
  ].join(', '),
  hero: [
    '0 1px 3px 0 #0000001A',
    '0 3px 8px 0 #0000001A',
    '0 0 0.5px 0 #0000002E',
  ].join(', '),
  head: [
    '0 1px 3px 0 #00000026',
    '0 0 0.5px 0 #00000033',
  ].join(', '),
} as const;

export type ShadowToken = keyof typeof shadows;
export type Shadows = typeof shadows;
