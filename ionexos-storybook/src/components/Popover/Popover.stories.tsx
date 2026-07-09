import type { Meta, StoryObj } from '@storybook/react';
import { Popover } from './Popover';
import { Button } from '../Button';
import { Text } from '../Title';

const meta: Meta<typeof Popover> = {
  title: 'Components/Layout/Popover',
  component: Popover,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
浮動定位的內容容器。比 Tooltip 更豐富（可放任何內容），比 Modal 更輕（不需 backdrop）。
常用於：欄位說明、快速設定、欄位選擇器、user menu。

**placement**：top / bottom / left / right + start / end 變體（共 8 種）
**trigger**：click（預設，點外部關閉）/ hover
        `,
      },
    },
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof Popover>;

export const Basic: Story = {
  render: () => (
    <Popover
      content={
        <div style={{ padding: 16 }}>
          <Text>這是 Popover 內容。點外部會自動關閉。</Text>
        </div>
      }
    >
      <Button>點擊開啟</Button>
    </Popover>
  ),
};

export const Placements: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, auto)',
        gap: 24,
        padding: 80,
      }}
    >
      {(
        ['top', 'bottom', 'left', 'right'] as const
      ).map((p) => (
        <Popover key={p} placement={p} content={<div style={{ padding: 12 }}>方位 {p}</div>}>
          <Button variant="miner">{p}</Button>
        </Popover>
      ))}
    </div>
  ),
};

export const UserMenu: Story = {
  render: () => (
    <Popover
      placement="bottom-end"
      content={
        <div style={{ minWidth: 200, padding: 4 }}>
          <button
            style={{
              display: 'block',
              width: '100%',
              padding: '8px 12px',
              background: 'transparent',
              border: 0,
              textAlign: 'left',
              cursor: 'pointer',
              color: '#eaedf0',
              borderRadius: 4,
              fontSize: 14,
            }}
          >
            個人資料
          </button>
          <button
            style={{
              display: 'block',
              width: '100%',
              padding: '8px 12px',
              background: 'transparent',
              border: 0,
              textAlign: 'left',
              cursor: 'pointer',
              color: '#eaedf0',
              borderRadius: 4,
              fontSize: 14,
            }}
          >
            帳戶設定
          </button>
          <hr style={{ border: 0, borderTop: '1px solid #ffffff14', margin: '4px 0' }} />
          <button
            style={{
              display: 'block',
              width: '100%',
              padding: '8px 12px',
              background: 'transparent',
              border: 0,
              textAlign: 'left',
              cursor: 'pointer',
              color: '#fd5463',
              borderRadius: 4,
              fontSize: 14,
            }}
          >
            登出
          </button>
        </div>
      }
    >
      <Button variant="miner">使用者選單</Button>
    </Popover>
  ),
};

export const HoverTrigger: Story = {
  render: () => (
    <Popover
      trigger="hover"
      content={
        <div style={{ padding: 12, maxWidth: 220 }}>
          <Text variant="body2">
            滑過時顯示，移開時自動關閉。Popover 內部可繼續互動而不消失。
          </Text>
        </div>
      }
    >
      <Button variant="miner">Hover 觸發</Button>
    </Popover>
  ),
};
