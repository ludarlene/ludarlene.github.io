import { systemIcons } from './system';
import type { SystemIconName, IconEntry } from './system';
import { bulletIcons } from './bullet';
import type { BulletIconName } from './bullet';
import { navIcons } from './nav';
import type { NavIconName } from './nav';
import { twentyFourIcons } from './twentyFour';
import type { TwentyFourIconName } from './twentyFour';
import { sixteenIcons } from './sixteen';
import type { SixteenIconName } from './sixteen';

/**
 * Icon registry - 合併所有圖示分組
 * Icon 元件透過此 registry 用 name 查找對應 SVG paths
 */
export const iconRegistry: Record<string, IconEntry> = {
  ...systemIcons,
  ...bulletIcons,
  ...navIcons,
  ...twentyFourIcons,
  ...sixteenIcons,
};

/**
 * 強型別圖示名稱聯集
 * 使用時 IDE 會自動補全所有可用的 icon name
 */
export type IconName =
  | SystemIconName
  | BulletIconName
  | NavIconName
  | TwentyFourIconName
  | SixteenIconName;

/**
 * 所有圖示名稱陣列，供 Gallery 等場景使用
 */
export const allIconNames = Object.keys(iconRegistry) as IconName[];

/**
 * 圖示分組元資料（給 Gallery / docs 用）
 */
export const iconGroups = {
  system: { label: 'System', names: Object.keys(systemIcons) as SystemIconName[] },
  bullet: { label: 'Bullet', names: Object.keys(bulletIcons) as BulletIconName[] },
  nav: { label: 'Nav', names: Object.keys(navIcons) as NavIconName[] },
  '24pt': { label: '24pt', names: Object.keys(twentyFourIcons) as TwentyFourIconName[] },
  '16pt': { label: '16pt', names: Object.keys(sixteenIcons) as SixteenIconName[] },
} as const;

export type IconGroupKey = keyof typeof iconGroups;
