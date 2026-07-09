import type { ReactNode } from 'react';

export interface IconEntry {
  paths: ReactNode;
  viewBox?: string;
}

/**
 * Icon/System - UI 操作類圖示（對應 Figma Icon/System 群組）
 * 全部 24×24，stroke 為主
 */
export const systemIcons = {
  'system/search': {
    paths: (
      <>
        <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
        <path d="M20 20L16.5 16.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </>
    ),
  },
  'system/close': {
    paths: (
      <path
        d="M6 6L18 18M18 6L6 18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    ),
  },
  'system/check': {
    paths: (
      <path
        d="M5 12L10 17L19 7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  'system/add': {
    paths: (
      <path
        d="M12 5V19M5 12H19"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    ),
  },
  'system/minus': {
    paths: (
      <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    ),
  },
  'system/remove': {
    paths: (
      <>
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
        <path d="M8 12H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </>
    ),
  },
  'system/edit': {
    paths: (
      <>
        <path
          d="M16.5 3.5L20.5 7.5L8 20H4V16L16.5 3.5Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path d="M13.5 6.5L17.5 10.5" stroke="currentColor" strokeWidth="2" />
      </>
    ),
  },
  'system/details': {
    paths: (
      <>
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
        <path
          d="M12 8V12M12 16H12.01"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </>
    ),
  },
  'system/deleted': {
    paths: (
      <>
        <path
          d="M4 7H20M9 7V4C9 3.44772 9.44772 3 10 3H14C14.5523 3 15 3.44772 15 4V7M6 7L7 20C7 20.5523 7.44772 21 8 21H16C16.5523 21 17 20.5523 17 20L18 7"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M10 11V17M14 11V17"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </>
    ),
  },
  'system/copy': {
    paths: (
      <>
        <rect x="8" y="8" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="2" />
        <path
          d="M4 16V6C4 4.89543 4.89543 4 6 4H16"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </>
    ),
  },
  'system/filter': {
    paths: (
      <path
        d="M3 5H21L14 13V19L10 21V13L3 5Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    ),
  },
  'system/sort-up': {
    paths: (
      <path
        d="M12 19V5M12 5L6 11M12 5L18 11"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  'system/sort-down': {
    paths: (
      <path
        d="M12 5V19M12 19L6 13M12 19L18 13"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  'system/sort': {
    paths: (
      <>
        <path
          d="M8 4L8 14M8 4L5 7M8 4L11 7"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.5"
        />
        <path
          d="M16 20L16 10M16 20L13 17M16 20L19 17"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.5"
        />
      </>
    ),
  },
  'system/upload': {
    paths: (
      <path
        d="M12 16V4M12 4L7 9M12 4L17 9M5 20H19"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  'system/download': {
    paths: (
      <path
        d="M12 4V16M12 16L7 11M12 16L17 11M5 20H19"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  'system/export': {
    paths: (
      <path
        d="M16 5H19V8M9 15L19 5M19 13V19H5V5H11"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  'system/refresh': {
    paths: (
      <path
        d="M4 12C4 7.58 7.58 4 12 4C14.21 4 16.21 4.9 17.66 6.34L20 4V10H14L16.24 7.76C15.15 6.68 13.66 6 12 6C8.69 6 6 8.69 6 12C6 15.31 8.69 18 12 18C14.5 18 16.65 16.46 17.54 14.27"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  'system/calendar': {
    paths: (
      <>
        <rect x="3" y="5" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="2" />
        <path
          d="M3 9H21M8 3V7M16 3V7"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </>
    ),
  },
  'system/time': {
    paths: (
      <>
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
        <path d="M12 7V12L15 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </>
    ),
  },
  'system/eye': {
    paths: (
      <>
        <path
          d="M2 12C2 12 5 5 12 5C19 5 22 12 22 12C22 12 19 19 12 19C5 19 2 12 2 12Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
      </>
    ),
  },
  'system/eye-closed': {
    paths: (
      <path
        d="M3 3L21 21M10.5 6.2C11 6.07 11.5 6 12 6C19 6 22 13 22 13C21.5 13.92 20.9 14.79 20.2 15.6M6.7 7.7C3.7 9.6 2 13 2 13C2 13 5 19 12 19C13.59 19 15.05 18.66 16.31 18.13M9.88 9.88C9.34 10.43 9 11.18 9 12C9 13.66 10.34 15 12 15C12.82 15 13.57 14.66 14.12 14.12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  'system/more': {
    paths: (
      <>
        <circle cx="6" cy="12" r="1.5" fill="currentColor" />
        <circle cx="12" cy="12" r="1.5" fill="currentColor" />
        <circle cx="18" cy="12" r="1.5" fill="currentColor" />
      </>
    ),
  },
  'system/menu': {
    paths: (
      <path
        d="M4 6H20M4 12H20M4 18H20"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    ),
  },
  'system/arrow-up': {
    paths: (
      <path
        d="M12 19V5M12 5L5 12M12 5L19 12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  'system/arrow-down': {
    paths: (
      <path
        d="M12 5V19M12 19L5 12M12 19L19 12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  'system/arrow-left': {
    paths: (
      <path
        d="M19 12H5M5 12L12 5M5 12L12 19"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  'system/arrow-right': {
    paths: (
      <path
        d="M5 12H19M19 12L12 5M19 12L12 19"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  'system/chevron-up': {
    paths: (
      <path
        d="M6 15L12 9L18 15"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  'system/chevron-down': {
    paths: (
      <path
        d="M6 9L12 15L18 9"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  'system/chevron-left': {
    paths: (
      <path
        d="M15 6L9 12L15 18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  'system/chevron-right': {
    paths: (
      <path
        d="M9 6L15 12L9 18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  'system/double-chevron-left': {
    paths: (
      <path
        d="M13 7L8 12L13 17M19 7L14 12L19 17"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  'system/double-chevron-right': {
    paths: (
      <path
        d="M11 7L16 12L11 17M5 7L10 12L5 17"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  'system/drop-down': {
    paths: (
      <path d="M7 10L12 15L17 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    ),
  },
  'system/pull-up': {
    paths: (
      <path d="M7 14L12 9L17 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    ),
  },
  'system/enter': {
    paths: (
      <path
        d="M9 10L4 15L9 20M4 15H15C18.31 15 21 12.31 21 9V4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  'system/enlarge': {
    paths: (
      <path
        d="M9 4H4V9M15 4H20V9M9 20H4V15M15 20H20V15"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  'system/expand': {
    paths: (
      <path
        d="M4 14V20H10M20 10V4H14M20 4L14 10M4 20L10 14"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  'system/expand-less': {
    paths: (
      <path
        d="M9 4V9H4M15 4V9H20M9 20V15H4M15 20V15H20"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  'system/column': {
    paths: (
      <>
        <rect x="3" y="4" width="6" height="16" rx="1" stroke="currentColor" strokeWidth="2" />
        <rect x="11" y="4" width="6" height="16" rx="1" stroke="currentColor" strokeWidth="2" />
        <path d="M21 4V20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </>
    ),
  },
  'system/notify': {
    paths: (
      <>
        <path
          d="M6 8C6 4.68629 8.68629 2 12 2C15.3137 2 18 4.68629 18 8V13L20 16H4L6 13V8Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d="M10 19C10 20.1046 10.8954 21 12 21C13.1046 21 14 20.1046 14 19"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </>
    ),
  },
  'system/suspend': {
    paths: (
      <>
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
        <path d="M10 9V15M14 9V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </>
    ),
  },
  'system/logout': {
    paths: (
      <path
        d="M16 17L21 12L16 7M21 12H9M9 21H5C3.89543 21 3 20.1046 3 19V5C3 3.89543 3.89543 3 5 3H9"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  'system/add-user': {
    paths: (
      <>
        <circle cx="9" cy="8" r="4" stroke="currentColor" strokeWidth="2" />
        <path
          d="M2 21C2 17.6863 4.58172 15 9 15C11.5 15 13.62 15.86 15 17.27M19 14V20M16 17H22"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </>
    ),
  },
  'system/memo': {
    paths: (
      <>
        <path
          d="M14 3H6C4.89543 3 4 3.89543 4 5V19C4 20.1046 4.89543 21 6 21H18C19.1046 21 20 20.1046 20 19V9L14 3Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d="M14 3V9H20M8 14H16M8 18H13"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </>
    ),
  },
} as const satisfies Record<string, IconEntry>;

export type SystemIconName = keyof typeof systemIcons;
