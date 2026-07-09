import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Drawer } from './Drawer';
import { Button } from '../Button';
import { Input } from '../Input';
import { Select } from '../Select';
import { Text } from '../Title';

const meta: Meta<typeof Drawer> = {
  title: 'Components/Layout/Drawer',
  component: Drawer,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
對應 Figma：Overlay（行動側出 panel）。
從四個方位滑入的容器，常用於設定面板、詳情側欄、過濾器、表單編輯。
        `,
      },
    },
  },
  argTypes: {
    placement: {
      control: 'radio',
      options: ['left', 'right', 'top', 'bottom'],
    },
    size: { control: 'radio', options: ['small', 'medium', 'large'] },
  },
};

export default meta;
type Story = StoryObj<typeof Drawer>;

export const Right: Story = {
  render: function Render(args) {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>從右側開啟</Button>
        <Drawer
          {...args}
          open={open}
          onClose={() => setOpen(false)}
          title="篩選條件"
          description="設定後將套用至列表"
          footer={
            <>
              <Button variant="miner" onClick={() => setOpen(false)}>
                重設
              </Button>
              <Button onClick={() => setOpen(false)}>套用</Button>
            </>
          }
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <Input label="關鍵字" placeholder="搜尋車輛、駕駛" fullWidth />
            <Select
              label="狀態"
              options={[
                { value: 'all', label: '全部' },
                { value: 'active', label: '運行中' },
                { value: 'idle', label: '閒置' },
                { value: 'error', label: '異常' },
              ]}
              fullWidth
            />
            <Select
              label="車型"
              options={[
                { value: 's1', label: 'Ionex S1' },
                { value: 's2', label: 'Ionex S2' },
                { value: 'plus', label: 'Ionex Plus' },
              ]}
              fullWidth
            />
          </div>
        </Drawer>
      </>
    );
  },
};

export const Left: Story = {
  args: { placement: 'left' },
  render: function Render(args) {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>從左側開啟</Button>
        <Drawer
          {...args}
          open={open}
          onClose={() => setOpen(false)}
          title="系統設定"
        >
          <Text>從左側滑入的設定選單，可放置設定群組或頁籤。</Text>
        </Drawer>
      </>
    );
  },
};

export const Bottom: Story = {
  args: { placement: 'bottom' },
  render: function Render(args) {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>從底部開啟</Button>
        <Drawer
          {...args}
          open={open}
          onClose={() => setOpen(false)}
          height={400}
          title="操作選項"
          footer={
            <Button onClick={() => setOpen(false)} fullWidth>
              完成
            </Button>
          }
        >
          <Text>常用於行動裝置的 action sheet 樣式。</Text>
        </Drawer>
      </>
    );
  },
};

export const Top: Story = {
  args: { placement: 'top' },
  render: function Render(args) {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>從頂部開啟</Button>
        <Drawer
          {...args}
          open={open}
          onClose={() => setOpen(false)}
          height={200}
          title="系統通知"
        >
          <Text>常用於暫時性的全寬通知或快速操作條。</Text>
        </Drawer>
      </>
    );
  },
};

export const NoBackdrop: Story = {
  render: function Render() {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>非遮罩 Drawer</Button>
        <Drawer
          open={open}
          onClose={() => setOpen(false)}
          title="詳情資訊"
          backdrop={false}
        >
          <Text>沒有背景遮罩，主畫面仍可互動，常用於詳情側欄。</Text>
        </Drawer>
      </>
    );
  },
};
