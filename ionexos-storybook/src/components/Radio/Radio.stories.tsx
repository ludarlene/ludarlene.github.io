import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Radio } from './Radio';
import { RadioGroup } from './RadioGroup';

const meta: Meta<typeof Radio> = {
  title: 'Components/Forms/Radio',
  component: Radio,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Radio>;

export const Single: Story = {
  args: { name: 'demo', value: 'a' },
};

export const WithText: Story = {
  args: { name: 'demo', value: 'a', label: '選項 A' },
};

export const WithMultipleText: Story = {
  args: {
    name: 'demo',
    value: 'a',
    label: '標準方案',
    description: 'NT$ 299 / 月，包含 5 個專案',
  },
};

export const Group: Story = {
  render: function Render() {
    const [value, setValue] = useState('basic');
    return (
      <RadioGroup name="plan" value={value} onChange={setValue}>
        <Radio
          value="free"
          label="免費方案"
          description="適合個人使用，1 個專案"
        />
        <Radio
          value="basic"
          label="標準方案"
          description="NT$ 299 / 月，5 個專案"
        />
        <Radio
          value="pro"
          label="進階方案"
          description="NT$ 999 / 月，無限專案 + 進階分析"
        />
      </RadioGroup>
    );
  },
};

export const HorizontalGroup: Story = {
  render: function Render() {
    const [value, setValue] = useState('m');
    return (
      <RadioGroup
        name="size"
        value={value}
        onChange={setValue}
        direction="horizontal"
      >
        <Radio value="s" label="小" />
        <Radio value="m" label="中" />
        <Radio value="l" label="大" />
        <Radio value="xl" label="特大" />
      </RadioGroup>
    );
  },
};

export const DisabledGroup: Story = {
  render: () => (
    <RadioGroup name="disabled-demo" defaultValue="b" disabled>
      <Radio value="a" label="選項 A" />
      <Radio value="b" label="選項 B（已選）" />
      <Radio value="c" label="選項 C" />
    </RadioGroup>
  ),
};

export const AllStates: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, auto)', gap: 16 }}>
      <Radio name="s1" value="a" />
      <Radio name="s1" value="b" defaultChecked />
      <Radio name="s1" value="c" disabled />
      <Radio name="s2" value="a" label="文字" />
      <Radio name="s2" value="b" label="文字" defaultChecked />
      <Radio name="s2" value="c" label="文字" disabled />
    </div>
  ),
};
