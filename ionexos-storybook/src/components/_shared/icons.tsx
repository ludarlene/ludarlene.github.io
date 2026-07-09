/**
 * 內建迷你 icon 集（純 SVG，不依賴 icon library）
 * 後續批次會建立完整的 Icon 系統，目前先用 inline 解決表單需求
 */
import type { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

const baseProps = (size = 16): SVGProps<SVGSVGElement> => ({
  width: size,
  height: size,
  viewBox: '0 0 24 24',
  fill: 'none',
  xmlns: 'http://www.w3.org/2000/svg',
});

export const CheckIcon = ({ size = 16, ...rest }: IconProps) => (
  <svg {...baseProps(size)} {...rest}>
    <path
      d="M5 12.5L10 17.5L19 7.5"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const MinusIcon = ({ size = 16, ...rest }: IconProps) => (
  <svg {...baseProps(size)} {...rest}>
    <path
      d="M6 12H18"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
  </svg>
);

export const ChevronDownIcon = ({ size = 16, ...rest }: IconProps) => (
  <svg {...baseProps(size)} {...rest}>
    <path
      d="M6 9L12 15L18 9"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const ChevronLeftIcon = ({ size = 16, ...rest }: IconProps) => (
  <svg {...baseProps(size)} {...rest}>
    <path
      d="M15 6L9 12L15 18"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const ChevronRightIcon = ({ size = 16, ...rest }: IconProps) => (
  <svg {...baseProps(size)} {...rest}>
    <path
      d="M9 6L15 12L9 18"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const CloseIcon = ({ size = 16, ...rest }: IconProps) => (
  <svg {...baseProps(size)} {...rest}>
    <path
      d="M6 6L18 18M18 6L6 18"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

export const SearchIcon = ({ size = 16, ...rest }: IconProps) => (
  <svg {...baseProps(size)} {...rest}>
    <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
    <path
      d="M20 20L16.5 16.5"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

export const CalendarIcon = ({ size = 16, ...rest }: IconProps) => (
  <svg {...baseProps(size)} {...rest}>
    <rect
      x="3"
      y="5"
      width="18"
      height="16"
      rx="2"
      stroke="currentColor"
      strokeWidth="2"
    />
    <path
      d="M3 9H21M8 3V7M16 3V7"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

export const AlertIcon = ({ size = 16, ...rest }: IconProps) => (
  <svg {...baseProps(size)} {...rest}>
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
    <path
      d="M12 8V12.5M12 16V16.5"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

export const CheckCircleIcon = ({ size = 16, ...rest }: IconProps) => (
  <svg {...baseProps(size)} {...rest}>
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
    <path
      d="M8 12L11 15L16 9"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const InfoIcon = ({ size = 16, ...rest }: IconProps) => (
  <svg {...baseProps(size)} {...rest}>
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
    <path
      d="M12 8V8.5M12 11.5V16"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

export const WarningIcon = ({ size = 16, ...rest }: IconProps) => (
  <svg {...baseProps(size)} {...rest}>
    <path
      d="M12 3L22 20H2L12 3Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinejoin="round"
    />
    <path
      d="M12 10V14M12 16.5V17"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

export const ErrorIcon = ({ size = 16, ...rest }: IconProps) => (
  <svg {...baseProps(size)} {...rest}>
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
    <path
      d="M9 9L15 15M15 9L9 15"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

export const PauseIcon = ({ size = 16, ...rest }: IconProps) => (
  <svg {...baseProps(size)} {...rest}>
    <path
      d="M9 5V19M15 5V19"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

export const ClockIcon = ({ size = 16, ...rest }: IconProps) => (
  <svg {...baseProps(size)} {...rest}>
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
    <path
      d="M12 7V12L15 14"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const LockIcon = ({ size = 16, ...rest }: IconProps) => (
  <svg {...baseProps(size)} {...rest}>
    <rect
      x="5"
      y="11"
      width="14"
      height="10"
      rx="2"
      stroke="currentColor"
      strokeWidth="2"
    />
    <path
      d="M8 11V7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7V11"
      stroke="currentColor"
      strokeWidth="2"
    />
  </svg>
);

export const PlusIcon = ({ size = 16, ...rest }: IconProps) => (
  <svg {...baseProps(size)} {...rest}>
    <path
      d="M12 5V19M5 12H19"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

export const MenuIcon = ({ size = 16, ...rest }: IconProps) => (
  <svg {...baseProps(size)} {...rest}>
    <path
      d="M4 6H20M4 12H20M4 18H20"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

export const DotIcon = ({ size = 16, ...rest }: IconProps) => (
  <svg {...baseProps(size)} {...rest}>
    <circle cx="12" cy="12" r="4" fill="currentColor" />
  </svg>
);

export const MoreIcon = ({ size = 16, ...rest }: IconProps) => (
  <svg {...baseProps(size)} {...rest}>
    <circle cx="6" cy="12" r="1.5" fill="currentColor" />
    <circle cx="12" cy="12" r="1.5" fill="currentColor" />
    <circle cx="18" cy="12" r="1.5" fill="currentColor" />
  </svg>
);

export const HomeIcon = ({ size = 16, ...rest }: IconProps) => (
  <svg {...baseProps(size)} {...rest}>
    <path
      d="M3 12L12 4L21 12V20H15V14H9V20H3V12Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinejoin="round"
    />
  </svg>
);

export const GridIcon = ({ size = 16, ...rest }: IconProps) => (
  <svg {...baseProps(size)} {...rest}>
    <rect x="4" y="4" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" />
    <rect x="13" y="4" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" />
    <rect x="4" y="13" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" />
    <rect x="13" y="13" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" />
  </svg>
);

export const SettingsIcon = ({ size = 16, ...rest }: IconProps) => (
  <svg {...baseProps(size)} {...rest}>
    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
    <path
      d="M12 2V5M12 19V22M4.93 4.93L7.05 7.05M16.95 16.95L19.07 19.07M2 12H5M19 12H22M4.93 19.07L7.05 16.95M16.95 7.05L19.07 4.93"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

export const UserIcon = ({ size = 16, ...rest }: IconProps) => (
  <svg {...baseProps(size)} {...rest}>
    <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="2" />
    <path
      d="M4 20C4 16.6863 7.58172 14 12 14C16.4183 14 20 16.6863 20 20"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

export const BellIcon = ({ size = 16, ...rest }: IconProps) => (
  <svg {...baseProps(size)} {...rest}>
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
  </svg>
);

export const DragHandleIcon = ({ size = 16, ...rest }: IconProps) => (
  <svg {...baseProps(size)} {...rest}>
    <circle cx="9" cy="6" r="1.5" fill="currentColor" />
    <circle cx="9" cy="12" r="1.5" fill="currentColor" />
    <circle cx="9" cy="18" r="1.5" fill="currentColor" />
    <circle cx="15" cy="6" r="1.5" fill="currentColor" />
    <circle cx="15" cy="12" r="1.5" fill="currentColor" />
    <circle cx="15" cy="18" r="1.5" fill="currentColor" />
  </svg>
);

export const TrashIcon = ({ size = 16, ...rest }: IconProps) => (
  <svg {...baseProps(size)} {...rest}>
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
  </svg>
);

export const EditIcon = ({ size = 16, ...rest }: IconProps) => (
  <svg {...baseProps(size)} {...rest}>
    <path
      d="M16.5 3.5L20.5 7.5L8 20H4V16L16.5 3.5Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinejoin="round"
    />
    <path d="M13.5 6.5L17.5 10.5" stroke="currentColor" strokeWidth="2" />
  </svg>
);

export const FilterIcon = ({ size = 16, ...rest }: IconProps) => (
  <svg {...baseProps(size)} {...rest}>
    <path
      d="M3 5H21L14 13V19L10 21V13L3 5Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinejoin="round"
    />
  </svg>
);

export const DownloadIcon = ({ size = 16, ...rest }: IconProps) => (
  <svg {...baseProps(size)} {...rest}>
    <path
      d="M12 4V16M12 16L7 11M12 16L17 11M5 20H19"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const EmptyBoxIcon = ({ size = 48, ...rest }: IconProps) => (
  <svg {...baseProps(size)} viewBox="0 0 48 48" {...rest}>
    <path
      d="M8 18L24 10L40 18V36L24 44L8 36V18Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinejoin="round"
      opacity="0.4"
    />
    <path
      d="M8 18L24 26L40 18M24 26V44"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinejoin="round"
      opacity="0.4"
    />
  </svg>
);

export const SortIcon = ({ size = 16, ...rest }: IconProps) => (
  <svg {...baseProps(size)} {...rest}>
    <path
      d="M8 4L12 8M8 4L4 8M8 4V14"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      opacity="0.5"
    />
    <path
      d="M16 20L12 16M16 20L20 16M16 20V10"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      opacity="0.5"
    />
  </svg>
);

export const SortAscIcon = ({ size = 16, ...rest }: IconProps) => (
  <svg {...baseProps(size)} {...rest}>
    <path
      d="M12 5V19M12 5L7 10M12 5L17 10"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const SortDescIcon = ({ size = 16, ...rest }: IconProps) => (
  <svg {...baseProps(size)} {...rest}>
    <path
      d="M12 19V5M12 19L17 14M12 19L7 14"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const DoubleChevronLeftIcon = ({ size = 16, ...rest }: IconProps) => (
  <svg {...baseProps(size)} {...rest}>
    <path
      d="M13 7L8 12L13 17M19 7L14 12L19 17"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const DoubleChevronRightIcon = ({ size = 16, ...rest }: IconProps) => (
  <svg {...baseProps(size)} {...rest}>
    <path
      d="M11 7L16 12L11 17M5 7L10 12L5 17"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);


export const ZoomInIcon = ({ size = 16, ...rest }: IconProps) => (
  <svg {...baseProps(size)} {...rest}>
    <path
      d="M5 12H19M12 5V19"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

export const ZoomOutIcon = ({ size = 16, ...rest }: IconProps) => (
  <svg {...baseProps(size)} {...rest}>
    <path
      d="M5 12H19"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

export const LightningIcon = ({ size = 16, ...rest }: IconProps) => (
  <svg {...baseProps(size)} {...rest}>
    <path
      d="M13 2L4 14H11L10 22L19 10H12L13 2Z"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
      fill="currentColor"
    />
  </svg>
);

export const ScooterIcon = ({ size = 16, ...rest }: IconProps) => (
  <svg {...baseProps(size)} {...rest}>
    <circle cx="6" cy="17" r="3" stroke="currentColor" strokeWidth="2" />
    <circle cx="18" cy="17" r="3" stroke="currentColor" strokeWidth="2" />
    <path
      d="M9 17H14M14 17L17 8H20M14 17V11H10L8 14"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const BuildingIcon = ({ size = 16, ...rest }: IconProps) => (
  <svg {...baseProps(size)} {...rest}>
    <rect x="4" y="3" width="16" height="18" rx="1" stroke="currentColor" strokeWidth="2" />
    <path
      d="M9 7H10M14 7H15M9 11H10M14 11H15M9 15H10M14 15H15"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

export const SwitchOrgIcon = ({ size = 16, ...rest }: IconProps) => (
  <svg {...baseProps(size)} {...rest}>
    <path
      d="M4 7H16L13 4M20 17H8L11 20"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
