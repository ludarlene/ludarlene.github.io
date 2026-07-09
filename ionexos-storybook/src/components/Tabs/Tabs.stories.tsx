import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Tabs, TabList, Tab, TabPanel } from './Tabs';
import { HomeIcon, GridIcon, SettingsIcon, UserIcon, CloseIcon } from '../_shared/icons';
import { Text } from '../Title/Text';

const meta: Meta<typeof Tabs> = {
  title: 'Components/Navigation/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
複合元件，由 \`<Tabs>\` + \`<TabList>\` + \`<Tab>\` + \`<TabPanel>\` 組成。
鍵盤導航：← →（移動）、Home / End（跳到首末）。

**對應 Figma 規格** (v1.8 IonexOS WebKit \`5143:4298\`)

五種 \`type\`：
- \`line\`（預設）— 91×40，底線型
- \`lineCount\` — 121×40，底線型 + count badge
- \`icon\` — 40×40，純 icon 正方形
- \`contained\` — 113×40，容器型（active 整塊填色 + 4px 底色 border + 上圓角）
- \`normal\` — 150×40，同 contained 但用 subtitle-1（16px medium）

每種 type 都支援五種狀態：default / hover / focus / active / disable
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Tabs>;

// ============================================================================
// 主要 Type 範例
// ============================================================================

export const Line: Story = {
  name: 'Line（預設）',
  render: function Render() {
    const [tab, setTab] = useState('overview');
    return (
      <Tabs value={tab} onChange={setTab} type="line">
        <TabList>
          <Tab value="overview">概覽</Tab>
          <Tab value="activity">活動</Tab>
          <Tab value="settings">設定</Tab>
          <Tab value="disabled" disabled>停用項目</Tab>
        </TabList>
        <TabPanel value="overview">
          <Text>底線型 Tab，最常用於內容分頁。Active 用 text/highlight 底線，Default 用 text/middle 底線。</Text>
        </TabPanel>
        <TabPanel value="activity"><Text>活動內容</Text></TabPanel>
        <TabPanel value="settings"><Text>設定內容</Text></TabPanel>
      </Tabs>
    );
  },
};

export const LineWithIcons: Story = {
  name: 'Line + Leading Icon',
  render: function Render() {
    const [tab, setTab] = useState('home');
    return (
      <Tabs value={tab} onChange={setTab} type="line">
        <TabList>
          <Tab value="home" leadingIcon={<HomeIcon size={16} />}>首頁</Tab>
          <Tab value="grid" leadingIcon={<GridIcon size={16} />}>清單</Tab>
          <Tab value="user" leadingIcon={<UserIcon size={16} />}>使用者</Tab>
        </TabList>
        <TabPanel value="home"><Text>首頁內容</Text></TabPanel>
        <TabPanel value="grid"><Text>清單內容</Text></TabPanel>
        <TabPanel value="user"><Text>使用者內容</Text></TabPanel>
      </Tabs>
    );
  },
};

export const LineCount: Story = {
  name: 'Line+Count（含計數徽章）',
  render: function Render() {
    const [tab, setTab] = useState('all');
    return (
      <Tabs value={tab} onChange={setTab} type="lineCount">
        <TabList>
          <Tab value="all" count={128}>全部</Tab>
          <Tab value="pending" count={12}>待處理</Tab>
          <Tab value="done" count={8}>已完成</Tab>
        </TabList>
        <TabPanel value="all"><Text>全部項目（128 筆）</Text></TabPanel>
        <TabPanel value="pending"><Text>待處理項目（12 筆）</Text></TabPanel>
        <TabPanel value="done"><Text>已完成項目（8 筆）</Text></TabPanel>
      </Tabs>
    );
  },
};

export const Icon: Story = {
  name: 'Icon（純圖示，40×40）',
  render: function Render() {
    const [tab, setTab] = useState('home');
    return (
      <Tabs value={tab} onChange={setTab} type="icon">
        <TabList aria-label="View toggle">
          <Tab value="home" leadingIcon={<HomeIcon size={20} />} />
          <Tab value="grid" leadingIcon={<GridIcon size={20} />} />
          <Tab value="user" leadingIcon={<UserIcon size={20} />} />
          <Tab value="settings" leadingIcon={<SettingsIcon size={20} />} />
        </TabList>
        <TabPanel value="home"><Text>首頁視圖</Text></TabPanel>
        <TabPanel value="grid"><Text>網格視圖</Text></TabPanel>
        <TabPanel value="user"><Text>使用者視圖</Text></TabPanel>
        <TabPanel value="settings"><Text>設定視圖</Text></TabPanel>
      </Tabs>
    );
  },
};

export const Contained: Story = {
  name: 'Contained（113×40 容器型）',
  render: function Render() {
    const [tab, setTab] = useState('overview');
    return (
      <Tabs value={tab} onChange={setTab} type="contained">
        <TabList>
          <Tab value="overview">概覽</Tab>
          <Tab value="activity">活動</Tab>
          <Tab value="settings">設定</Tab>
        </TabList>
        <TabPanel value="overview">
          <Text>容器型 Tab，active 用 button/focus 填色 + 4px primary/main 底色 border + 上圓角 8px。</Text>
        </TabPanel>
        <TabPanel value="activity"><Text>活動內容</Text></TabPanel>
        <TabPanel value="settings"><Text>設定內容</Text></TabPanel>
      </Tabs>
    );
  },
};

export const Normal: Story = {
  name: 'Normal（150×40 較大）',
  render: function Render() {
    const [tab, setTab] = useState('overview');
    return (
      <Tabs value={tab} onChange={setTab} type="normal">
        <TabList>
          <Tab value="overview">概覽</Tab>
          <Tab value="activity">活動</Tab>
          <Tab value="settings">設定</Tab>
        </TabList>
        <TabPanel value="overview">
          <Text>Normal 同 Contained 樣式但寬度 150，用 subtitle-1（16px medium）。</Text>
        </TabPanel>
        <TabPanel value="activity"><Text>活動內容</Text></TabPanel>
        <TabPanel value="settings"><Text>設定內容</Text></TabPanel>
      </Tabs>
    );
  },
};

// ============================================================================
// 完整狀態總覽（對齊 Figma 5×5 變體矩陣）
// ============================================================================

export const AllTypesAndStates: Story = {
  name: '所有 Type × State 對照',
  parameters: {
    docs: {
      description: {
        story: '完整對齊 Figma Tabs 頁面（5143:4298）的 5 種 Type × 5 種 State 屬性組合展示。',
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32, padding: 24 }}>
      {(['line', 'lineCount', 'icon', 'contained', 'normal'] as const).map((type) => (
        <div key={type}>
          <div style={{ fontSize: 12, color: '#8a8fa7', marginBottom: 12, textTransform: 'uppercase', letterSpacing: 1 }}>
            {type}
          </div>
          <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start', flexWrap: 'wrap' }}>
            {/* Default */}
            <div>
              <div style={{ fontSize: 11, color: '#545665', marginBottom: 4 }}>Default</div>
              <Tabs defaultValue="x" type={type}>
                <TabList>
                  <Tab value="a" leadingIcon={type === 'icon' ? <HomeIcon size={20} /> : undefined} count={type === 'lineCount' ? 12 : undefined}>
                    {type === 'icon' ? undefined : 'Tab label'}
                  </Tab>
                </TabList>
              </Tabs>
            </div>
            {/* Active */}
            <div>
              <div style={{ fontSize: 11, color: '#545665', marginBottom: 4 }}>Active</div>
              <Tabs defaultValue="a" type={type}>
                <TabList>
                  <Tab value="a" leadingIcon={type === 'icon' ? <HomeIcon size={20} /> : undefined} count={type === 'lineCount' ? 12 : undefined}>
                    {type === 'icon' ? undefined : 'Tab label'}
                  </Tab>
                </TabList>
              </Tabs>
            </div>
            {/* Disable */}
            <div>
              <div style={{ fontSize: 11, color: '#545665', marginBottom: 4 }}>Disable</div>
              <Tabs defaultValue="x" type={type}>
                <TabList>
                  <Tab value="a" disabled leadingIcon={type === 'icon' ? <HomeIcon size={20} /> : undefined} count={type === 'lineCount' ? 12 : undefined}>
                    {type === 'icon' ? undefined : 'Tab label'}
                  </Tab>
                </TabList>
              </Tabs>
            </div>
          </div>
        </div>
      ))}
    </div>
  ),
};
