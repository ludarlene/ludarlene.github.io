import type { IconEntry } from '../system';

/**
 * Icon/Nav - 導覽類圖示（對應 Figma Icon/Nav 群組）
 * 24×24，用於 SideNav / TopBar / Menu 等導覽位置
 */
export const navIcons = {
  'nav/dashboard': {
    paths: (
      <>
        <rect x="3" y="3" width="7" height="9" rx="1" stroke="currentColor" strokeWidth="2" />
        <rect x="14" y="3" width="7" height="5" rx="1" stroke="currentColor" strokeWidth="2" />
        <rect x="14" y="12" width="7" height="9" rx="1" stroke="currentColor" strokeWidth="2" />
        <rect x="3" y="16" width="7" height="5" rx="1" stroke="currentColor" strokeWidth="2" />
      </>
    ),
  },
  'nav/home': {
    paths: (
      <path
        d="M3 12L12 4L21 12V20H15V14H9V20H3V12Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    ),
  },
  'nav/setting': {
    paths: (
      <>
        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
        <path
          d="M12 2V5M12 19V22M4.93 4.93L7.05 7.05M16.95 16.95L19.07 19.07M2 12H5M19 12H22M4.93 19.07L7.05 16.95M16.95 7.05L19.07 4.93"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </>
    ),
  },
  'nav/user': {
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
  'nav/vehicle': {
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
  'nav/fleet': {
    paths: (
      <>
        <rect x="3" y="10" width="7" height="6" rx="1" stroke="currentColor" strokeWidth="2" />
        <rect x="14" y="10" width="7" height="6" rx="1" stroke="currentColor" strokeWidth="2" />
        <circle cx="6.5" cy="16" r="1" fill="currentColor" />
        <circle cx="17.5" cy="16" r="1" fill="currentColor" />
        <path d="M10 13H14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </>
    ),
  },
  'nav/cabinet': {
    paths: (
      <>
        <rect x="5" y="3" width="14" height="18" rx="1" stroke="currentColor" strokeWidth="2" />
        <path
          d="M5 9H19M5 15H19M10 6H10.01M10 12H10.01M10 18H10.01"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </>
    ),
  },
  'nav/analytics': {
    paths: (
      <path
        d="M4 20V14M10 20V10M16 20V4M22 20H2"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    ),
  },
  'nav/alert': {
    paths: (
      <>
        <path
          d="M12 3L2 20H22L12 3Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path d="M12 10V14M12 17V17.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </>
    ),
  },
  'nav/notify': {
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
  'nav/history': {
    paths: (
      <>
        <path
          d="M3 12C3 16.97 7.03 21 12 21C16.97 21 21 16.97 21 12C21 7.03 16.97 3 12 3C9 3 6.42 4.46 4.84 6.6M3 3V7H7"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M12 7V12L15 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </>
    ),
  },
  'nav/map': {
    paths: (
      <path
        d="M9 4L3 6V20L9 18M9 4L15 6M9 4V18M15 6L21 4V18L15 20M15 6V20M15 20L9 18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  'nav/zone': {
    paths: (
      <>
        <path
          d="M12 21S5 14 5 9C5 5.13 8.13 2 12 2C15.87 2 19 5.13 19 9C19 14 12 21 12 21Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <circle cx="12" cy="9" r="2.5" stroke="currentColor" strokeWidth="2" />
      </>
    ),
  },
  'nav/permission': {
    paths: (
      <path
        d="M12 2L3 6V12C3 16.97 6.84 21.31 12 22C17.16 21.31 21 16.97 21 12V6L12 2Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    ),
  },
  'nav/tool': {
    paths: (
      <path
        d="M14.7 6.3C14.3 6.7 14 7.3 14 8C14 9.4 15.1 10.5 16.5 10.5C17.2 10.5 17.8 10.2 18.2 9.8L20.5 12.1C19.5 14.3 17.3 16 14.5 16C10.9 16 8 13.1 8 9.5C8 6.7 9.7 4.5 11.9 3.5L14.7 6.3ZM14.7 6.3L11.9 3.5M14.7 6.3L18.2 9.8M11.9 3.5L8 9.5M3 21L10 14"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  'nav/group': {
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
  'nav/upgrade': {
    paths: (
      <path
        d="M12 4L3 14H8V20H16V14H21L12 4Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    ),
  },
  'nav/power': {
    paths: (
      <path
        d="M12 3V12M5.64 7.64C4.04 9.24 3 11.5 3 14C3 18.97 7.03 23 12 23C16.97 23 21 18.97 21 14C21 11.5 19.96 9.24 18.36 7.64"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  'nav/close': {
    paths: (
      <>
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
        <path
          d="M9 9L15 15M15 9L9 15"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </>
    ),
  },
  'nav/open': {
    paths: (
      <path
        d="M14 3H21V10M21 3L13 11M10 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V14"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  'nav/language': {
    paths: (
      <>
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
        <path
          d="M3 12H21M12 3C14.5 5.73 16 9.21 16 12C16 14.79 14.5 18.27 12 21C9.5 18.27 8 14.79 8 12C8 9.21 9.5 5.73 12 3Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
      </>
    ),
  },
  'nav/assets': {
    paths: (
      <>
        <rect x="3" y="7" width="18" height="13" rx="1" stroke="currentColor" strokeWidth="2" />
        <path
          d="M9 7V5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
      </>
    ),
  },
  'nav/task': {
    paths: (
      <>
        <rect x="4" y="3" width="16" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
        <path
          d="M8 9L11 12L16 7M8 17H16"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </>
    ),
  },
  'nav/plan': {
    paths: (
      <>
        <rect x="3" y="5" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="2" />
        <path
          d="M3 9H21M8 3V7M16 3V7M8 13H10M8 17H10M14 13H16M14 17H16"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </>
    ),
  },
  'nav/audio': {
    paths: (
      <>
        <rect x="9" y="3" width="6" height="13" rx="3" stroke="currentColor" strokeWidth="2" />
        <path
          d="M5 11V12C5 15.87 8.13 19 12 19C15.87 19 19 15.87 19 12V11M12 19V22M8 22H16"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </>
    ),
  },
  'nav/money': {
    paths: (
      <>
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
        <path
          d="M9 9H14C15.1 9 16 9.9 16 11C16 12.1 15.1 13 14 13H10C8.9 13 8 13.9 8 15C8 16.1 8.9 17 10 17H15M12 7V17"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </>
    ),
  },
  'nav/mode': {
    paths: (
      <path
        d="M12 3C7.03 3 3 7.03 3 12C3 16.97 7.03 21 12 21C16.97 21 21 16.97 21 12C21 11.45 20.55 11 20 11C19.45 11 18.99 11.44 18.91 11.99C18.51 14.55 16.5 18 12 18C8.69 18 6 15.31 6 12C6 8.69 8.69 6 12 6C13.66 6 14.99 5.55 14.99 5C14.99 4.45 14.55 4 14 4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
} as const satisfies Record<string, IconEntry>;

export type NavIconName = keyof typeof navIcons;
