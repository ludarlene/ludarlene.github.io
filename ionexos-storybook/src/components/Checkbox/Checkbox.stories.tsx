import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Checkbox } from './Checkbox';

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Forms/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
對應 Figma：Checkbox。支援三種 Label 模式：
- **Single**：純方框
- **WithText**：標籤
- **MultipleText**：標籤 + 描述
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Single: Story = {};

export const WithText: Story = {
  args: { label: '同意服務條款' },
};

export const WithMultipleText: Story = {
  args: {
    label: '訂閱電子報',
    description: '我們每週會寄送一次產品更新與小技巧',
  },
};

export const Checked: Story = {
  args: { label: '已勾選', defaultChecked: true },
};

export const Indeterminate: Story = {
  args: { label: '部分選取', indeterminate: true },
};

export const Disabled: Story = {
  args: { label: '已停用', disabled: true },
};

export const CheckedDisabled: Story = {
  args: { label: '已停用且已勾選', disabled: true, defaultChecked: true },
};

export const ParentChildExample: Story = {
  render: function Render() {
    const [items, setItems] = useState([
      { id: 1, label: '訂單管理', checked: false },
      { id: 2, label: '客戶管理', checked: true },
      { id: 3, label: '報表分析', checked: false },
    ]);

    const allChecked = items.every((i) => i.checked);
    const someChecked = items.some((i) => i.checked) && !allChecked;

    const toggleAll = () => {
      const next = !allChecked;
      setItems((prev) => prev.map((i) => ({ ...i, checked: next })));
    };

    const toggleOne = (id: number) =>
      setItems((prev) =>
        prev.map((i) => (i.id === id ? { ...i, checked: !i.checked } : i)),
      );

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <Checkbox
          label="全選"
          checked={allChecked}
          indeterminate={someChecked}
          onChange={toggleAll}
        />
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 8,
            marginLeft: 32,
          }}
        >
          {items.map((item) => (
            <Checkbox
              key={item.id}
              label={item.label}
              checked={item.checked}
              onChange={() => toggleOne(item.id)}
            />
          ))}
        </div>
      </div>
    );
  },
};

export const AllStates: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, auto)', gap: 16 }}>
      <Checkbox />
      <Checkbox defaultChecked />
      <Checkbox indeterminate />
      <Checkbox disabled />
      <Checkbox defaultChecked disabled />
      <Checkbox indeterminate disabled />
      <Checkbox label="文字" />
      <Checkbox label="文字" defaultChecked />
      <Checkbox label="文字" indeterminate />
    </div>
  ),
};
