import type { Meta, StoryObj } from '@storybook/react';
import { useState, useMemo } from 'react';
import styled from 'styled-components';
import { Icon } from './Icon';
import { iconGroups, allIconNames } from './icons';
import type { IconName, IconGroupKey } from './icons';
import { Input } from '../Input';
import { Tabs, TabList, Tab, TabPanel } from '../Tabs';
import { Text } from '../Title';

const meta: Meta<typeof Icon> = {
  title: 'Components/Foundations/Icon',
  component: Icon,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
統一的 Icon 元件，對應 Figma 的 Icons & Illustrates 頁面。

**使用方式**：

\`\`\`tsx
import { Icon } from 'ionexos-storybook';

<Icon name="system/search" />
<Icon name="bullet/success" size="lg" color="#22c55e" />
<Icon name="nav/dashboard" size={32} />
\`\`\`

**圖示分組**：
- \`system/*\` — UI 操作（search, close, edit, sort, ...）
- \`bullet/*\` — 狀態指示（success, error, online, ...）
- \`nav/*\` — 導覽（dashboard, home, settings, ...）
- \`24pt/*\` — 業務圖示（battery, vehicle, cabinet, ...）
- \`16pt/*\` — 小尺寸（info, ok, email, ...）

當前已實作圖示數量：${allIconNames.length} 個。完整 Figma 圖示庫約 170 個，
其餘 ~120 個業務特化圖示可在實際需求出現時逐步補上。
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Icon>;

// === Basic usage ===
export const Basic: Story = {
  args: { name: 'system/search', size: 'xl' },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
      {(['xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const).map((s) => (
        <div key={s} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
          <Icon name="system/search" size={s} />
          <span style={{ fontSize: 12, color: '#8a8fa7' }}>{s}</span>
        </div>
      ))}
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
      <Icon name="bullet/success" size="xl" color="#22c55e" />
      <Icon name="bullet/error" size="xl" color="#fd5463" />
      <Icon name="bullet/info" size="xl" color="#668bfa" />
      <Icon name="bullet/alert-warning" size="xl" color="#fb923c" />
    </div>
  ),
};

export const Rotation: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
      {[0, 45, 90, 180, 270].map((r) => (
        <div key={r} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
          <Icon name="system/arrow-up" size="xl" rotate={r} />
          <span style={{ fontSize: 12, color: '#8a8fa7' }}>{r}°</span>
        </div>
      ))}
    </div>
  ),
};

// === Gallery ===
const GalleryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 8px;
`;

const IconCard = styled.button.attrs({ type: 'button' })`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 16px 8px;
  background: ${({ theme }) => theme.semantic.background.transparent5};
  border: 1px solid transparent;
  border-radius: ${({ theme }) => theme.radius.md};
  cursor: pointer;
  font-family: inherit;
  color: ${({ theme }) => theme.semantic.text.high};
  transition: border-color 150ms ease, background-color 150ms ease;

  &:hover {
    border-color: ${({ theme }) => theme.semantic.primary.main};
    background: ${({ theme }) => theme.semantic.background.transparent10};
  }

  & code {
    font-size: 11px;
    color: ${({ theme }) => theme.semantic.text.middle};
    word-break: break-all;
    text-align: center;
    line-height: 1.3;
  }
`;

function GalleryView({
  group,
  search,
}: {
  group: IconGroupKey | 'all';
  search: string;
}) {
  const names = useMemo(() => {
    const base =
      group === 'all'
        ? (allIconNames as IconName[])
        : (iconGroups[group].names as IconName[]);
    if (!search) return base;
    const q = search.toLowerCase();
    return base.filter((n) => n.toLowerCase().includes(q));
  }, [group, search]);

  if (names.length === 0) {
    return (
      <div style={{ padding: 48, textAlign: 'center', color: '#8a8fa7' }}>
        找不到符合 “{search}” 的圖示
      </div>
    );
  }

  return (
    <>
      <Text variant="caption" color="middle" style={{ marginBottom: 16 }}>
        共 {names.length} 個圖示
      </Text>
      <GalleryGrid>
        {names.map((name) => (
          <IconCard
            key={name}
            onClick={() => {
              navigator.clipboard?.writeText(name);
            }}
            title="點擊複製名稱"
          >
            <Icon name={name} size="xl" />
            <code>{name}</code>
          </IconCard>
        ))}
      </GalleryGrid>
    </>
  );
}

export const Gallery: Story = {
  name: '所有圖示（含搜尋）',
  render: function Render() {
    const [search, setSearch] = useState('');
    const [tab, setTab] = useState<IconGroupKey | 'all'>('all');

    return (
      <div>
        <Input
          placeholder="搜尋圖示名稱"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ marginBottom: 16, width: 320 }}
        />
        <Tabs value={tab} onChange={(v) => setTab(v as any)} type="lineCount">
          <TabList>
            <Tab value="all">全部 ({allIconNames.length})</Tab>
            {(Object.keys(iconGroups) as IconGroupKey[]).map((key) => (
              <Tab key={key} value={key} count={iconGroups[key].names.length}>
                {iconGroups[key].label}
              </Tab>
            ))}
          </TabList>
          <TabPanel value="all">
            <GalleryView group="all" search={search} />
          </TabPanel>
          {(Object.keys(iconGroups) as IconGroupKey[]).map((key) => (
            <TabPanel key={key} value={key}>
              <GalleryView group={key} search={search} />
            </TabPanel>
          ))}
        </Tabs>
      </div>
    );
  },
};
