import type { IconEntry } from '../system';

/**
 * Icon/24pt - 業務類圖示（對應 Figma Icon/24pt 群組）
 * 24×24，ionexOS 特定業務概念：電池、車輛、站點、組織等
 *
 * 注意：此檔目前包含「常用 20 個」，剩餘 30 個業務圖示
 * 可在實際開發需求出現時逐步補上。
 */
export const twentyFourIcons = {
  '24pt/battery': {
    paths: (
      <>
        <rect x="3" y="8" width="16" height="10" rx="1" stroke="currentColor" strokeWidth="2" />
        <path d="M19 11V15H21V11H19Z" fill="currentColor" />
        <path d="M6 11H10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </>
    ),
  },
  '24pt/no-battery': {
    paths: (
      <>
        <rect x="3" y="8" width="16" height="10" rx="1" stroke="currentColor" strokeWidth="2" />
        <path d="M19 11V15H21V11H19Z" fill="currentColor" />
        <path
          d="M5 5L21 21"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </>
    ),
  },
  '24pt/swap-battery': {
    paths: (
      <>
        <rect x="3" y="6" width="8" height="12" rx="1" stroke="currentColor" strokeWidth="2" />
        <rect x="13" y="6" width="8" height="12" rx="1" stroke="currentColor" strokeWidth="2" />
        <path
          d="M11 12L13 12M9 10L11 12L9 14M15 10L13 12L15 14"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </>
    ),
  },
  '24pt/swap': {
    paths: (
      <path
        d="M4 7H16L13 4M20 17H8L11 20"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  '24pt/vehicle': {
    paths: (
      <>
        <circle cx="6" cy="17" r="3" stroke="currentColor" strokeWidth="2" />
        <circle cx="18" cy="17" r="3" stroke="currentColor" strokeWidth="2" />
        <path
          d="M9 17H14M14 17L17 8H20M14 17V11H10L8 14"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </>
    ),
  },
  '24pt/vehicle-lock': {
    paths: (
      <>
        <circle cx="6" cy="17" r="3" stroke="currentColor" strokeWidth="2" />
        <circle cx="18" cy="17" r="3" stroke="currentColor" strokeWidth="2" />
        <path
          d="M9 17H14M14 17L17 8H20M14 17V11H10L8 14"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <rect x="9" y="3" width="6" height="4" rx="1" fill="currentColor" />
      </>
    ),
  },
  '24pt/vehicle-safety': {
    paths: (
      <>
        <circle cx="6" cy="17" r="3" stroke="currentColor" strokeWidth="2" />
        <circle cx="18" cy="17" r="3" stroke="currentColor" strokeWidth="2" />
        <path
          d="M9 17H14M14 17L17 8H20M14 17V11H10L8 14"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12 2L9 4V6C9 7.5 10 8.5 12 9C14 8.5 15 7.5 15 6V4L12 2Z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
      </>
    ),
  },
  '24pt/cabinet': {
    paths: (
      <>
        <rect x="5" y="3" width="14" height="18" rx="1" stroke="currentColor" strokeWidth="2" />
        <path
          d="M5 9H19M5 15H19"
          stroke="currentColor"
          strokeWidth="2"
        />
        <path
          d="M9 6H10M14 6H15M9 12H10M14 12H15M9 18H10M14 18H15"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </>
    ),
  },
  '24pt/station': {
    paths: (
      <>
        <path
          d="M5 21V8L12 3L19 8V21H5Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d="M13 8L10 13H12L10 17L13 12H11L13 8Z"
          fill="currentColor"
        />
      </>
    ),
  },
  '24pt/sp': {
    paths: (
      <>
        <rect x="5" y="3" width="14" height="18" rx="1" stroke="currentColor" strokeWidth="2" />
        <path
          d="M13 8L10 13H12L10 17L13 12H11L13 8Z"
          fill="currentColor"
        />
      </>
    ),
  },
  '24pt/mega': {
    paths: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="1" stroke="currentColor" strokeWidth="2" />
        <path
          d="M14 8L9 14H12L10 18L15 12H12L14 8Z"
          fill="currentColor"
        />
        <path d="M3 9H21M3 15H21" stroke="currentColor" strokeWidth="2" />
      </>
    ),
  },
  '24pt/slot': {
    paths: (
      <>
        <rect x="4" y="6" width="16" height="12" rx="1" stroke="currentColor" strokeWidth="2" />
        <rect x="7" y="9" width="4" height="6" stroke="currentColor" strokeWidth="2" />
        <rect x="13" y="9" width="4" height="6" stroke="currentColor" strokeWidth="2" />
      </>
    ),
  },
  '24pt/flash': {
    paths: (
      <path
        d="M13 2L4 14H11L10 22L19 10H12L13 2Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
        fill="currentColor"
      />
    ),
  },
  '24pt/location': {
    paths: (
      <>
        <path
          d="M12 22S5 14 5 9C5 5.13 8.13 2 12 2C15.87 2 19 5.13 19 9C19 14 12 22 12 22Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <circle cx="12" cy="9" r="3" stroke="currentColor" strokeWidth="2" />
      </>
    ),
  },
  '24pt/organization': {
    paths: (
      <>
        <rect x="4" y="3" width="16" height="18" rx="1" stroke="currentColor" strokeWidth="2" />
        <path
          d="M9 7H10M14 7H15M9 11H10M14 11H15M9 15H10M14 15H15"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </>
    ),
  },
  '24pt/user': {
    paths: (
      <>
        <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="2" />
        <path
          d="M4 20C4 16.6863 7.58172 14 12 14C16.4183 14 20 16.6863 20 20"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </>
    ),
  },
  '24pt/user-group': {
    paths: (
      <>
        <circle cx="9" cy="9" r="3" stroke="currentColor" strokeWidth="2" />
        <circle cx="17" cy="9" r="2.5" stroke="currentColor" strokeWidth="2" />
        <path
          d="M2 19C2 16.24 5.13 14 9 14C12.87 14 16 16.24 16 19M22 19C22 16.79 19.76 15 17 15"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </>
    ),
  },
  '24pt/admin': {
    paths: (
      <>
        <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="2" />
        <path
          d="M4 20C4 16.6863 7.58172 14 12 14C16.4183 14 20 16.6863 20 20"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M12 4L11 5L9 5L10 7L9 9L11 9L12 11L13 9L15 9L14 7L15 5L13 5L12 4Z"
          fill="currentColor"
        />
      </>
    ),
  },
  '24pt/alert': {
    paths: (
      <>
        <path
          d="M12 3L2 20H22L12 3Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d="M12 10V14M12 17V17.01"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </>
    ),
  },
  '24pt/notification': {
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
  '24pt/drag': {
    paths: (
      <>
        <circle cx="9" cy="6" r="1.5" fill="currentColor" />
        <circle cx="9" cy="12" r="1.5" fill="currentColor" />
        <circle cx="9" cy="18" r="1.5" fill="currentColor" />
        <circle cx="15" cy="6" r="1.5" fill="currentColor" />
        <circle cx="15" cy="12" r="1.5" fill="currentColor" />
        <circle cx="15" cy="18" r="1.5" fill="currentColor" />
      </>
    ),
  },
  '24pt/lock': {
    paths: (
      <>
        <rect x="5" y="11" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="2" />
        <path
          d="M8 11V7C8 4.79 9.79 3 12 3C14.21 3 16 4.79 16 7V11"
          stroke="currentColor"
          strokeWidth="2"
        />
      </>
    ),
  },
  '24pt/power-off': {
    paths: (
      <>
        <path
          d="M12 3V12M5.64 7.64C4.04 9.24 3 11.5 3 14C3 18.97 7.03 23 12 23C16.97 23 21 18.97 21 14C21 11.5 19.96 9.24 18.36 7.64"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M3 21L21 3"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.5"
        />
      </>
    ),
  },
} as const satisfies Record<string, IconEntry>;

export type TwentyFourIconName = keyof typeof twentyFourIcons;
