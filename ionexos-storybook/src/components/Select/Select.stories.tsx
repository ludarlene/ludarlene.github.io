import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Select } from './Select';
import type { SelectOption } from './Select';

const fruitOptions: SelectOption<string>[] = [
  { value: 'apple', label: '蘋果' },
  { value: 'banana', label: '香蕉' },
  { value: 'cherry', label: '櫻桃' },
  { value: 'durian', label: '榴槤', disabled: true },
  { value: 'elderberry', label: '接骨木莓' },
];

const planOptions: SelectOption<string>[] = [
  { value: 'free', label: '免費方案', description: '1 個專案' },
  { value: 'basic', label: '標準方案', description: 'NT$ 299 / 月' },
  { value: 'pro', label: '進階方案', description: 'NT$ 999 / 月' },
];

const meta: Meta = {
  title: 'Components/Forms/Select',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
對應 Figma：Dropdown / Pulldown_menu / Menu / MenuElement。
支援單選、多選（chip 顯示）、搜尋過濾、option description、鍵盤導航（↑ ↓ Enter Esc）。
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const Single: Story = {
  render: function Render() {
    const [value, setValue] = useState<string | undefined>();
    return (
      <Select
        label="水果"
        placeholder="選擇你的水果"
        options={fruitOptions}
        value={value}
        onChange={(v) => setValue(v as string)}
      />
    );
  },
};

export const WithDescription: Story = {
  render: function Render() {
    const [value, setValue] = useState<string>('basic');
    return (
      <Select
        label="訂閱方案"
        options={planOptions}
        value={value}
        onChange={(v) => setValue(v as string)}
      />
    );
  },
};

export const Searchable: Story = {
  render: function Render() {
    const [value, setValue] = useState<string | undefined>();
    return (
      <Select
        label="水果（可搜尋）"
        placeholder="輸入關鍵字"
        options={fruitOptions}
        searchable
        value={value}
        onChange={(v) => setValue(v as string)}
      />
    );
  },
};

export const Multiple: Story = {
  render: function Render() {
    const [values, setValues] = useState<string[]>([]);
    return (
      <Select
        label="多選水果"
        placeholder="選擇水果"
        options={fruitOptions}
        multiple
        values={values}
        onChange={(v) => setValues(v as string[])}
      />
    );
  },
};

export const MultipleSearchable: Story = {
  render: function Render() {
    const [values, setValues] = useState<string[]>(['apple']);
    return (
      <Select
        label="多選 + 搜尋"
        options={fruitOptions}
        multiple
        searchable
        values={values}
        onChange={(v) => setValues(v as string[])}
      />
    );
  },
};

export const Error: Story = {
  render: () => (
    <Select
      label="必填欄位"
      placeholder="請選擇"
      options={fruitOptions}
      errorText="此欄位為必填"
    />
  ),
};

export const Disabled: Story = {
  render: () => (
    <Select
      label="已停用"
      placeholder="無法選擇"
      options={fruitOptions}
      disabled
    />
  ),
};

export const ReadOnly: Story = {
  render: () => (
    <Select
      label="唯讀"
      options={fruitOptions}
      value="apple"
      readOnly
    />
  ),
};
