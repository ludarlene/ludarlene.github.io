import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import type { Key } from 'react';
import { OrganizationPicker } from './OrganizationPicker';
import type { Organization } from './OrganizationPicker';

const meta: Meta<typeof OrganizationPicker> = {
  title: 'Components/Navigation/OrganizationPicker',
  component: OrganizationPicker,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
對應 Figma：Organization Picker。
切換 / 篩選使用者所屬組織的元件，常放在 SideNav header 或 TopBar。

**mode**：single（單選，立即切換）/ multiple（多選，可累積）
**status**：自動依選取狀態與 hasError 推導（off / on / on-error）
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof OrganizationPicker>;

const sampleOrgs: Organization[] = [
  { id: 'tw-hq', name: '台灣總部', subtitle: '管理員' },
  { id: 'tw-north', name: '北區辦公室', subtitle: '經理 · 24 人' },
  { id: 'tw-central', name: '中區辦公室', subtitle: '主管 · 18 人' },
  { id: 'tw-south', name: '南區辦公室', subtitle: '主管 · 22 人' },
  { id: 'jp-tokyo', name: '東京分公司', subtitle: '訪問者 · 12 人' },
  { id: 'closed', name: '已停業（測試）', subtitle: '無權限', disabled: true },
];

export const Single: Story = {
  render: function Render() {
    const [val, setVal] = useState<string | number | undefined>('tw-hq');
    return (
      <OrganizationPicker
        organizations={sampleOrgs}
        mode="single"
        value={val}
        onChange={(v) => setVal(v as string)}
      />
    );
  },
};

export const Multiple: Story = {
  render: function Render() {
    const [val, setVal] = useState<Key[]>(['tw-hq']);
    return (
      <OrganizationPicker
        organizations={sampleOrgs}
        mode="multiple"
        value={val}
        onChange={(v) => setVal(v as string[])}
      />
    );
  },
};

export const Empty: Story = {
  render: () => (
    <OrganizationPicker
      organizations={sampleOrgs}
      mode="single"
      placeholder="選擇所屬組織"
    />
  ),
};

export const Error: Story = {
  render: function Render() {
    const [val, setVal] = useState<string | number | undefined>('tw-hq');
    return (
      <OrganizationPicker
        organizations={sampleOrgs}
        mode="single"
        value={val}
        onChange={(v) => setVal(v as string)}
        hasError
        errorText="您無權存取此組織"
      />
    );
  },
};

export const AllStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <div style={{ marginBottom: 8, fontSize: 12, color: '#8a8fa7' }}>
          Status: Off / Mode: Single
        </div>
        <OrganizationPicker organizations={sampleOrgs} mode="single" />
      </div>
      <div>
        <div style={{ marginBottom: 8, fontSize: 12, color: '#8a8fa7' }}>
          Status: On / Mode: Single
        </div>
        <OrganizationPicker
          organizations={sampleOrgs}
          mode="single"
          value="tw-hq"
        />
      </div>
      <div>
        <div style={{ marginBottom: 8, fontSize: 12, color: '#8a8fa7' }}>
          Status: Off / Mode: Multiple
        </div>
        <OrganizationPicker organizations={sampleOrgs} mode="multiple" />
      </div>
      <div>
        <div style={{ marginBottom: 8, fontSize: 12, color: '#8a8fa7' }}>
          Status: On / Mode: Multiple
        </div>
        <OrganizationPicker
          organizations={sampleOrgs}
          mode="multiple"
          value={['tw-hq', 'tw-north', 'jp-tokyo']}
        />
      </div>
      <div>
        <div style={{ marginBottom: 8, fontSize: 12, color: '#8a8fa7' }}>
          Status: On-error / Mode: Multiple
        </div>
        <OrganizationPicker
          organizations={sampleOrgs}
          mode="multiple"
          value={['tw-hq']}
          hasError
          errorText="所選組織包含您無權存取的項目"
        />
      </div>
    </div>
  ),
};
