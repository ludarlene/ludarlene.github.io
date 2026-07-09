import type { IconEntry } from '../system';

/**
 * Icon/16pt - 小尺寸圖示（對應 Figma Icon/16pt 群組）
 * 16×16，視覺輕量，常用於 inline hint、小型 indicator
 */
export const sixteenIcons = {
  '16pt/info': {
    viewBox: '0 0 16 16',
    paths: (
      <>
        <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5" />
        <path
          d="M8 5V5.01M8 7V11"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </>
    ),
  },
  '16pt/ok': {
    viewBox: '0 0 16 16',
    paths: (
      <>
        <circle cx="8" cy="8" r="6" fill="currentColor" />
        <path
          d="M5 8L7 10L11 6"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </>
    ),
  },
  '16pt/cancel': {
    viewBox: '0 0 16 16',
    paths: (
      <>
        <circle cx="8" cy="8" r="6" fill="currentColor" />
        <path d="M5.5 5.5L10.5 10.5M10.5 5.5L5.5 10.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      </>
    ),
  },
  '16pt/enlarge': {
    viewBox: '0 0 16 16',
    paths: (
      <path
        d="M6 2H2V6M14 6V2H10M2 10V14H6M10 14H14V10"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  '16pt/copy': {
    viewBox: '0 0 16 16',
    paths: (
      <>
        <rect x="5" y="5" width="8" height="8" rx="1" stroke="currentColor" strokeWidth="1.5" />
        <path
          d="M3 11V4C3 3.45 3.45 3 4 3H11"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </>
    ),
  },
  '16pt/email': {
    viewBox: '0 0 16 16',
    paths: (
      <>
        <rect x="2" y="3" width="12" height="10" rx="1" stroke="currentColor" strokeWidth="1.5" />
        <path
          d="M2 5L8 9L14 5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </>
    ),
  },
  '16pt/email-group': {
    viewBox: '0 0 16 16',
    paths: (
      <>
        <rect x="3" y="4" width="10" height="8" rx="1" stroke="currentColor" strokeWidth="1.5" />
        <path
          d="M5 2H13C13.55 2 14 2.45 14 3V10"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path
          d="M3 6L8 9L13 6"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </>
    ),
  },
  '16pt/email-user': {
    viewBox: '0 0 16 16',
    paths: (
      <>
        <rect x="2" y="3" width="12" height="8" rx="1" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="8" cy="6" r="1.5" stroke="currentColor" strokeWidth="1.2" />
        <path
          d="M5 10C5 8.5 6.5 7.5 8 7.5C9.5 7.5 11 8.5 11 10"
          stroke="currentColor"
          strokeWidth="1.2"
        />
      </>
    ),
  },
  '16pt/battery': {
    viewBox: '0 0 16 16',
    paths: (
      <>
        <rect x="2" y="5" width="11" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" />
        <path d="M13 7V9H14V7H13Z" fill="currentColor" />
        <path d="M4 7H8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </>
    ),
  },
  '16pt/cabinet': {
    viewBox: '0 0 16 16',
    paths: (
      <>
        <rect x="4" y="2" width="8" height="12" rx="1" stroke="currentColor" strokeWidth="1.5" />
        <path
          d="M4 6H12M4 10H12"
          stroke="currentColor"
          strokeWidth="1.5"
        />
      </>
    ),
  },
  '16pt/slot': {
    viewBox: '0 0 16 16',
    paths: (
      <>
        <rect x="2" y="4" width="12" height="8" rx="1" stroke="currentColor" strokeWidth="1.5" />
        <rect x="4" y="6" width="3" height="4" stroke="currentColor" strokeWidth="1.5" />
        <rect x="9" y="6" width="3" height="4" stroke="currentColor" strokeWidth="1.5" />
      </>
    ),
  },
  '16pt/ellipse': {
    viewBox: '0 0 16 16',
    paths: <circle cx="8" cy="8" r="3" fill="currentColor" />,
  },
} as const satisfies Record<string, IconEntry>;

export type SixteenIconName = keyof typeof sixteenIcons;
