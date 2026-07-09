import type { IconEntry } from '../system';

/**
 * Icon/Bullet - 狀態類圖示（對應 Figma Icon/Bullet 群組）
 * 24×24，多為 filled 圓形或填色圖示，常用於 StatusIndicator、列表狀態
 */
export const bulletIcons = {
  'bullet/success': {
    paths: (
      <>
        <circle cx="12" cy="12" r="9" fill="currentColor" />
        <path
          d="M8 12L11 15L16 9"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </>
    ),
  },
  'bullet/error': {
    paths: (
      <>
        <circle cx="12" cy="12" r="9" fill="currentColor" />
        <path
          d="M9 9L15 15M15 9L9 15"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </>
    ),
  },
  'bullet/info': {
    paths: (
      <>
        <circle cx="12" cy="12" r="9" fill="currentColor" />
        <path
          d="M12 8V8.01M12 11V16"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </>
    ),
  },
  'bullet/alert-warning': {
    paths: (
      <>
        <circle cx="12" cy="12" r="9" fill="currentColor" />
        <path
          d="M12 7V13M12 16V16.01"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </>
    ),
  },
  'bullet/alert-success': {
    paths: (
      <>
        <circle cx="12" cy="12" r="9" fill="currentColor" />
        <path
          d="M8 12L11 15L16 9"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </>
    ),
  },
  'bullet/minus': {
    paths: (
      <>
        <circle cx="12" cy="12" r="9" fill="currentColor" />
        <path d="M8 12H16" stroke="white" strokeWidth="2" strokeLinecap="round" />
      </>
    ),
  },
  'bullet/cancel': {
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
  'bullet/online': {
    paths: <circle cx="12" cy="12" r="6" fill="currentColor" />,
  },
  'bullet/offline': {
    paths: <circle cx="12" cy="12" r="6" stroke="currentColor" strokeWidth="2" fill="none" />,
  },
  'bullet/pending': {
    paths: (
      <>
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
        <path
          d="M12 7V12L15 14"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </>
    ),
  },
  'bullet/waiting': {
    paths: (
      <>
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" strokeDasharray="2 2" />
        <path
          d="M8 12H16"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </>
    ),
  },
  'bullet/stop': {
    paths: (
      <>
        <circle cx="12" cy="12" r="9" fill="currentColor" />
        <rect x="9" y="9" width="6" height="6" rx="1" fill="white" />
      </>
    ),
  },
  'bullet/charging': {
    paths: (
      <>
        <circle cx="12" cy="12" r="9" fill="currentColor" />
        <path
          d="M13 6L8 13H11L10 18L15 11H12L13 6Z"
          fill="white"
        />
      </>
    ),
  },
  'bullet/discharging': {
    paths: (
      <>
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
        <path
          d="M13 6L8 13H11L10 18L15 11H12L13 6Z"
          fill="currentColor"
        />
      </>
    ),
  },
  'bullet/lock': {
    paths: (
      <>
        <rect x="6" y="11" width="12" height="9" rx="1" fill="currentColor" />
        <path
          d="M9 11V8C9 6.34 10.34 5 12 5C13.66 5 15 6.34 15 8V11"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
        />
      </>
    ),
  },
  'bullet/no-service': {
    paths: (
      <>
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
        <path
          d="M6 6L18 18"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </>
    ),
  },
  'bullet/reserve': {
    paths: (
      <>
        <circle cx="12" cy="12" r="9" fill="currentColor" />
        <path
          d="M9 12L12 15L15 9"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.7"
        />
      </>
    ),
  },
  'bullet/delete': {
    paths: (
      <>
        <circle cx="12" cy="12" r="9" fill="currentColor" />
        <path
          d="M9 9L15 15M15 9L9 15"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </>
    ),
  },
  'bullet/step-complete': {
    paths: (
      <>
        <circle cx="12" cy="12" r="9" fill="currentColor" />
        <path
          d="M8 12L11 15L16 9"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </>
    ),
  },
  'bullet/step-active': {
    paths: (
      <>
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
        <circle cx="12" cy="12" r="4" fill="currentColor" />
      </>
    ),
  },
  'bullet/backup': {
    paths: (
      <>
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
        <path
          d="M12 7V12M12 12L9 9.5M12 12L15 9.5M8 15H16"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </>
    ),
  },
  'bullet/unmount': {
    paths: (
      <>
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
        <path
          d="M8 14L12 10L16 14"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </>
    ),
  },
  'bullet/collapse-expand': {
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
  'bullet/collapse-close': {
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
} as const satisfies Record<string, IconEntry>;

export type BulletIconName = keyof typeof bulletIcons;
