import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';
import { SearchIcon, CalendarIcon } from '../_shared/icons';

const meta: Meta<typeof Input> = {
  title: 'Components/Forms/Input',
  component: Input,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
對應 Figma：Input / Textfield / Menu。狀態自動推斷，
也可透過 \`status\` 強制設定。

**狀態優先序**：\`status\` prop > \`errorText\` > \`disabled\` > \`readOnly\` > default
        `,
      },
    },
  },
  argTypes: {
    status: {
      control: 'select',
      options: [undefined, 'default', 'error', 'disabled', 'readOnly', 'viewOnly'],
    },
    label: { control: 'text' },
    placeholder: { control: 'text' },
    helperText: { control: 'text' },
    errorText: { control: 'text' },
    required: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
  },
  args: {
    label: '使用者名稱',
    placeholder: '請輸入',
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Playground: Story = {};

export const Default: Story = {
  args: { label: '預設狀態', placeholder: '請輸入內容' },
};

export const Filled: Story = {
  args: { label: '已填寫', defaultValue: 'Alex Wang' },
};

export const WithHelperText: Story = {
  args: {
    label: 'Email',
    placeholder: 'name@example.com',
    helperText: '我們不會公開您的 Email',
  },
};

export const Required: Story = {
  args: {
    label: '密碼',
    placeholder: '至少 8 個字元',
    required: true,
    type: 'password',
  },
};

export const Error: Story = {
  args: {
    label: 'Email',
    defaultValue: 'invalid-email',
    errorText: '請輸入有效的 Email 格式',
  },
};

export const Disabled: Story = {
  args: { label: '已停用', defaultValue: '無法編輯', disabled: true },
};

export const ReadOnly: Story = {
  args: { label: '唯讀', defaultValue: '此欄位無法編輯', readOnly: true },
};

export const ViewOnly: Story = {
  args: {
    label: '檢視模式',
    defaultValue: '純文字顯示',
    status: 'viewOnly',
  },
};

export const WithBadge: Story = {
  args: {
    label: 'Email',
    defaultValue: 'verified@ionex.com',
    status: 'readOnly',
    badge: '已驗證',
  },
};

export const WithStartAdornment: Story = {
  args: {
    label: '搜尋',
    placeholder: '搜尋訂單編號',
    startAdornment: <SearchIcon size={18} />,
  },
};

export const WithEndAdornment: Story = {
  args: {
    label: '日期',
    placeholder: 'YYYY / MM / DD',
    endAdornment: <CalendarIcon size={18} />,
  },
};

export const AllStates: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: 24,
        maxWidth: 600,
      }}
    >
      <Input label="Default" placeholder="placeholder" />
      <Input label="Filled" defaultValue="Some text" />
      <Input
        label="Error"
        defaultValue="not-an-email"
        errorText="格式錯誤"
      />
      <Input label="Disabled" defaultValue="無法編輯" disabled />
      <Input label="ReadOnly" defaultValue="唯讀內容" readOnly />
      <Input label="ViewOnly" defaultValue="顯示用" status="viewOnly" />
    </div>
  ),
};
