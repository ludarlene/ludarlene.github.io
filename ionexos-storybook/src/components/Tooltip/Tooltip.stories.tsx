import type { Meta, StoryObj } from '@storybook/react';
import { Tooltip } from './Tooltip';
import { Button } from '../Button';

const meta: Meta<typeof Tooltip> = {
  title: 'Components/Feedback/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
對應 Figma：Tooltips。支援 4 個方位（top/right/bottom/left），
以及 type4（含 title）、type5（含 footer）變體組合。
        `,
      },
    },
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Basic: Story = {
  args: {
    content: '提示文字',
    children: <Button>Hover 我</Button>,
  },
};

export const Placements: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, auto)',
        gap: 32,
        padding: 80,
      }}
    >
      <Tooltip content="上方" placement="top">
        <Button>Top</Button>
      </Tooltip>
      <Tooltip content="下方" placement="bottom">
        <Button>Bottom</Button>
      </Tooltip>
      <Tooltip content="左側" placement="left">
        <Button>Left</Button>
      </Tooltip>
      <Tooltip content="右側" placement="right">
        <Button>Right</Button>
      </Tooltip>
    </div>
  ),
};

export const WithTitle: Story = {
  args: {
    title: '提示標題',
    content: '這是描述文字，用於補充說明標題的內容。',
    children: <Button>含標題</Button>,
  },
};

export const WithFooter: Story = {
  args: {
    title: '快速儲存',
    content: '儲存目前進度，可隨時繼續編輯。',
    footer: '⌘ + S',
    children: <Button>含快捷鍵</Button>,
  },
};

export const LongContent: Story = {
  args: {
    content:
      '這是一段較長的提示文字，會自動換行。建議將內容控制在 2 到 3 行內，以維持良好可讀性。',
    maxWidth: 240,
    children: <Button>長文字</Button>,
  },
};

export const Disabled: Story = {
  args: {
    content: '不會顯示',
    disabled: true,
    children: <Button>無 Tooltip</Button>,
  },
};

export const ClickTrigger: Story = {
  args: {
    content: '點擊才會顯示，再點一次關閉',
    trigger: 'click',
    children: <Button>點擊觸發</Button>,
  },
};
