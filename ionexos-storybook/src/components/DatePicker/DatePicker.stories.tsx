import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { DatePicker } from './DatePicker';

const meta: Meta<typeof DatePicker> = {
  title: 'Components/Forms/DatePicker',
  component: DatePicker,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
對應 Figma：Datetime_picker（簡化版）。本批次實作日期選擇核心功能（月曆網格、月份切換、min/max 範圍），
時間選擇與區間選擇將留待後續批次補上。

**日期格式**：value 統一使用 ISO 短格式 \`YYYY-MM-DD\`，顯示格式可透過 \`formatDisplay\` 自訂。
        `,
      },
    },
  },
  args: {
    label: '日期',
  },
};

export default meta;
type Story = StoryObj<typeof DatePicker>;

export const Default: Story = {
  render: function Render(args) {
    const [v, setV] = useState('');
    return <DatePicker {...args} value={v} onChange={setV} />;
  },
};

export const PreSelected: Story = {
  render: function Render() {
    const [v, setV] = useState('2026-06-15');
    return <DatePicker label="出貨日期" value={v} onChange={setV} />;
  },
};

export const CustomFormat: Story = {
  render: function Render() {
    const [v, setV] = useState('2026-01-20');
    return (
      <DatePicker
        label="自訂顯示格式"
        value={v}
        onChange={setV}
        formatDisplay={(s) => {
          const [y, m, d] = s.split('-');
          return `${y} 年 ${parseInt(m)} 月 ${parseInt(d)} 日`;
        }}
      />
    );
  },
};

export const WithMinMax: Story = {
  render: function Render() {
    const [v, setV] = useState('');
    return (
      <DatePicker
        label="只能選 2026 年"
        value={v}
        onChange={setV}
        min="2026-01-01"
        max="2026-12-31"
        helperText="超出範圍的日期將被禁用"
      />
    );
  },
};

export const Error: Story = {
  args: {
    label: '預約日期',
    errorText: '請選擇有效的日期',
  },
};

export const Disabled: Story = {
  args: { label: '已停用', disabled: true, defaultValue: '2026-05-22' },
};
