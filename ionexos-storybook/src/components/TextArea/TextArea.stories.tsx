import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { TextArea } from './TextArea';

const meta: Meta<typeof TextArea> = {
  title: 'Components/Forms/TextArea',
  component: TextArea,
  tags: ['autodocs'],
  argTypes: {
    status: {
      control: 'select',
      options: [undefined, 'default', 'error', 'disabled', 'readOnly'],
    },
  },
  args: {
    label: '描述',
    placeholder: '請輸入描述內容',
  },
};

export default meta;
type Story = StoryObj<typeof TextArea>;

export const Playground: Story = {};

export const Filled: Story = {
  args: {
    label: '備註',
    defaultValue: '這是一段預先填好的內容，可以多行顯示。',
  },
};

export const Error: Story = {
  args: {
    label: '描述',
    defaultValue: '太短',
    errorText: '內容長度需大於 10 個字元',
  },
};

export const Disabled: Story = {
  args: { label: '已停用', defaultValue: '無法編輯', disabled: true },
};

export const ReadOnly: Story = {
  args: { label: '唯讀', defaultValue: '這是唯讀的內容', readOnly: true },
};

export const WithCharCount: Story = {
  render: function Render(args) {
    const [value, setValue] = useState('');
    return (
      <TextArea
        {...args}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        showCount
        maxLength={200}
        label="意見回饋"
        placeholder="最多 200 字"
      />
    );
  },
};
