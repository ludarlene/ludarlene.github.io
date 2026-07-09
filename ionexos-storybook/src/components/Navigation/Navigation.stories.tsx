import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { SideNav } from './SideNav';
import type { SideNavItem } from './SideNav';
import { TopBar } from './TopBar';
import { Breadcrumbs } from './Breadcrumbs';
import { Badge } from '../Badge';
import { Button } from '../Button';
import { Input } from '../Input';
import {
  HomeIcon,
  GridIcon,
  UserIcon,
  SettingsIcon,
  BellIcon,
  SearchIcon,
  MenuIcon,
} from '../_shared/icons';

const meta: Meta = {
  title: 'Components/Navigation/Navigation',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
本元件組包含三個導覽元件：

- **\`<SideNav>\`** 側邊導覽列。支援多層、collapsed 模式、header / footer 區
- **\`<TopBar>\`** 頂部工具列。提供 start / center / end 三區
- **\`<Breadcrumbs>\`** 麵包屑導覽

組合使用可建出標準後台佈局（範例見最下方）。
        `,
      },
    },
  },
};
export default meta;
type Story = StoryObj;

const navItems: SideNavItem[] = [
  { id: 'dashboard', label: '儀表板', icon: <HomeIcon size={20} /> },
  {
    id: 'fleet',
    label: '車隊管理',
    icon: <GridIcon size={20} />,
    badge: <Badge variant="primary" size="small">12</Badge>,
    children: [
      { id: 'vehicles', label: '車輛清單' },
      { id: 'drivers', label: '駕駛管理' },
      { id: 'routes', label: '路線規劃' },
    ],
  },
  {
    id: 'users',
    label: '使用者',
    icon: <UserIcon size={20} />,
    children: [
      { id: 'all-users', label: '所有使用者' },
      { id: 'permissions', label: '權限管理' },
    ],
  },
  { id: 'settings', label: '系統設定', icon: <SettingsIcon size={20} /> },
];

export const SideNavBasic: Story = {
  render: function Render() {
    const [active, setActive] = useState('dashboard');
    return (
      <div style={{ display: 'flex', height: 600 }}>
        <SideNav
          items={navItems}
          value={active}
          onChange={(id) => setActive(id)}
          header={
            <div style={{ fontWeight: 700, fontSize: 16, color: '#eaedf0' }}>
              IonexOS
            </div>
          }
          footer={
            <div style={{ fontSize: 12, color: '#8a8fa7' }}>v1.8.0</div>
          }
        />
        <div style={{ flex: 1, padding: 32, color: '#eaedf0' }}>
          目前選中：<strong>{active}</strong>
        </div>
      </div>
    );
  },
};

export const SideNavCollapsed: Story = {
  render: function Render() {
    const [collapsed, setCollapsed] = useState(true);
    const [active, setActive] = useState('dashboard');
    return (
      <div style={{ display: 'flex', height: 600 }}>
        <SideNav
          items={navItems}
          value={active}
          onChange={(id) => setActive(id)}
          collapsed={collapsed}
          header={
            <div style={{ fontWeight: 700, fontSize: 16, color: '#eaedf0' }}>
              {collapsed ? 'iO' : 'IonexOS'}
            </div>
          }
        />
        <div style={{ flex: 1, padding: 32 }}>
          <Button variant="miner" onClick={() => setCollapsed((v) => !v)}>
            {collapsed ? '展開' : '收合'}
          </Button>
        </div>
      </div>
    );
  },
};

export const TopBarBasic: Story = {
  render: () => (
    <TopBar
      startContent={<MenuIcon size={20} />}
      title="儀表板"
      centerContent={
        <Input
          placeholder="搜尋訂單、車輛、使用者..."
          startAdornment={<SearchIcon size={16} />}
          style={{ width: 400 }}
        />
      }
      endContent={
        <>
          <Button variant="miner" size="basic" aria-label="通知">
            <BellIcon size={18} />
          </Button>
          <Button variant="miner" size="basic" aria-label="使用者">
            <UserIcon size={18} />
          </Button>
        </>
      }
    />
  ),
};

export const BreadcrumbsBasic: Story = {
  render: () => (
    <Breadcrumbs
      items={[
        { label: '首頁', href: '#', icon: <HomeIcon size={14} /> },
        { label: '車隊管理', href: '#' },
        { label: '車輛清單', href: '#' },
        { label: 'A-203' },
      ]}
    />
  ),
};

export const FullLayout: Story = {
  name: '範例：完整後台佈局',
  parameters: { layout: 'fullscreen' },
  render: function Render() {
    const [active, setActive] = useState('vehicles');
    return (
      <div style={{ display: 'flex', minHeight: '100vh' }}>
        <SideNav
          items={navItems}
          value={active}
          onChange={(id) => setActive(id)}
          header={
            <div style={{ fontWeight: 700, fontSize: 18, color: '#eaedf0' }}>
              IonexOS
            </div>
          }
          footer={
            <div style={{ fontSize: 12, color: '#8a8fa7' }}>
              已登入：admin@ionex.com
            </div>
          }
        />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <TopBar
            title="車輛清單"
            centerContent={
              <Input
                placeholder="搜尋車輛"
                startAdornment={<SearchIcon size={16} />}
                style={{ width: 360 }}
              />
            }
            endContent={
              <>
                <Button variant="miner" aria-label="通知">
                  <BellIcon size={18} />
                </Button>
                <Button variant="miner" aria-label="使用者">
                  <UserIcon size={18} />
                </Button>
              </>
            }
          />
          <div style={{ padding: 24, flex: 1 }}>
            <Breadcrumbs
              items={[
                { label: '首頁', href: '#', icon: <HomeIcon size={14} /> },
                { label: '車隊管理', href: '#' },
                { label: '車輛清單' },
              ]}
              style={{ marginBottom: 24 }}
            />
            <div style={{ color: '#8a8fa7' }}>
              主內容區。目前選中側邊導覽：<strong style={{ color: '#eaedf0' }}>{active}</strong>
            </div>
          </div>
        </div>
      </div>
    );
  },
};

export const NavItemStates: Story = {
  name: 'NavItem 所有狀態（對應 Figma 規格）',
  parameters: {
    docs: {
      description: {
        story: `
對應 Figma：NavItem 屬性 \`NavItem × Status × State\` 的完整組合。

**Main / Sub** × **Default / Hover / Active** 共 6 種狀態。
Sub item 在 Figma 規格中沒有 icon、沒有 chevron，但保持與 Main 相同的左側縮排（52px）。

Hover / Active 共同特徵：右側 4px highlight 邊條、文字色從 \`text/middle\` 轉為 \`text/high\`。
        `,
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', gap: 24, padding: 24 }}>
      <div>
        <div style={{ marginBottom: 8, fontSize: 12, color: '#8a8fa7' }}>
          Main item
        </div>
        <SideNav
          items={[
            { id: 'a', label: 'Default 狀態', icon: <HomeIcon size={20} /> },
            // 用 value 強制 active 第二個
            { id: 'b', label: 'Active 狀態', icon: <GridIcon size={20} /> },
            { id: 'c', label: '帶 Badge', icon: <UserIcon size={20} />, badge: (
              <span style={{
                background: 'rgba(255,255,255,0.08)',
                fontSize: 10,
                padding: '1px 5px',
                borderRadius: 9,
                color: '#8a8fa7',
              }}>Trial</span>
            ) },
            {
              id: 'd',
              label: '有子層（chevron）',
              icon: <SettingsIcon size={20} />,
              children: [{ id: 'd1', label: 'Sub 預設' }],
            },
            { id: 'e', label: 'Disabled', icon: <BellIcon size={20} />, disabled: true },
          ]}
          value="b"
        />
      </div>
      <div>
        <div style={{ marginBottom: 8, fontSize: 12, color: '#8a8fa7' }}>
          Sub item（展開時呈現，無 icon、無 chevron）
        </div>
        <SideNav
          items={[
            {
              id: 'parent',
              label: '父層項目',
              icon: <GridIcon size={20} />,
              children: [
                { id: 's1', label: 'Sub Default' },
                { id: 's2', label: 'Sub Active' },
                { id: 's3', label: 'Sub 其他' },
              ],
            },
          ]}
          value="s2"
        />
      </div>
      <div>
        <div style={{ marginBottom: 8, fontSize: 12, color: '#8a8fa7' }}>
          Collapsed（56px 寬，僅顯示 icon）
        </div>
        <SideNav
          items={[
            { id: 'a', label: 'Default', icon: <HomeIcon size={20} /> },
            { id: 'b', label: 'Active', icon: <GridIcon size={20} /> },
            { id: 'c', label: '使用者', icon: <UserIcon size={20} /> },
            { id: 'd', label: '設定', icon: <SettingsIcon size={20} /> },
          ]}
          value="b"
          collapsed
        />
      </div>
    </div>
  ),
};
