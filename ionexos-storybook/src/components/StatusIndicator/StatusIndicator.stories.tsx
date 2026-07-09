import type { Meta, StoryObj } from '@storybook/react';
import { StatusIndicator } from './StatusIndicator';
import type { StatusType } from './StatusIndicator';

const meta: Meta<typeof StatusIndicator> = {
  title: 'Components/Feedback/StatusIndicator',
  component: StatusIndicator,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
對應 Figma：Status Indicator。
8 種狀態類型，pending 與 loading 的 dot 會帶 pulse 動畫。
        `,
      },
    },
  },
  argTypes: {
    type: {
      control: 'select',
      options: [
        'error',
        'warning',
        'success',
        'info',
        'pending',
        'canceled',
        'paused',
        'loading',
      ] as StatusType[],
    },
    showDot: { control: 'boolean' },
    label: { control: 'text' },
  },
  args: {
    type: 'success',
  },
};

export default meta;
type Story = StoryObj<typeof StatusIndicator>;

export const Playground: Story = {};

export const AllTypes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-start' }}>
      <StatusIndicator type="error" />
      <StatusIndicator type="warning" />
      <StatusIndicator type="success" />
      <StatusIndicator type="info" />
      <StatusIndicator type="pending" />
      <StatusIndicator type="canceled" />
      <StatusIndicator type="paused" />
      <StatusIndicator type="loading" />
    </div>
  ),
};

export const ChineseLabels: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-start' }}>
      <StatusIndicator type="success" label="已完成" />
      <StatusIndicator type="warning" label="需注意" />
      <StatusIndicator type="error" label="失敗" />
      <StatusIndicator type="pending" label="處理中" />
      <StatusIndicator type="canceled" label="已取消" />
      <StatusIndicator type="paused" label="已暫停" />
      <StatusIndicator type="loading" label="載入中" />
    </div>
  ),
};

export const WithoutDot: Story = {
  args: { type: 'success', label: '已完成', showDot: false },
};
