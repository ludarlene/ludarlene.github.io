import type { Meta, StoryObj } from '@storybook/react';
import { Notification } from './Notification';
import { Button } from '../Button';

const meta: Meta<typeof Notification> = {
  title: 'Components/Feedback/Notification',
  component: Notification,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
對應 Figma：Notification - Inline。
有 description 時自動切換為 Long 樣式（圖示頂部對齊、標題粗體）。
        `,
      },
    },
  },
  argTypes: {
    status: {
      control: 'select',
      options: ['info', 'success', 'warning', 'error'],
    },
  },
  args: {
    status: 'info',
    title: '系統已自動儲存您的變更',
  },
};

export default meta;
type Story = StoryObj<typeof Notification>;

export const Short: Story = {};

export const Long: Story = {
  args: {
    status: 'info',
    title: '新功能已上線',
    description: '車隊管理介面新增批次操作功能，詳情請參考更新日誌。',
  },
};

export const AllStatuses: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <Notification status="info" title="這是一則資訊通知" />
      <Notification status="success" title="操作已成功完成" />
      <Notification status="warning" title="即將達到使用上限" />
      <Notification status="error" title="無法載入資料，請稍後再試" />
    </div>
  ),
};

export const WithLongDescription: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <Notification
        status="info"
        title="新版本可用"
        description="v1.9 已釋出，請點擊右上角的更新提示重新整理頁面。"
      />
      <Notification
        status="success"
        title="訂單已建立"
        description="訂單編號 #2026052200001 已成功提交，預計 24 小時內處理。"
      />
      <Notification
        status="warning"
        title="授權即將到期"
        description="您的授權將於 2026 年 6 月 30 日到期，請聯絡管理員續約。"
      />
      <Notification
        status="error"
        title="連線中斷"
        description="無法連線到伺服器，請檢查網路狀態後重試。"
      />
    </div>
  ),
};

export const Closable: Story = {
  args: {
    status: 'warning',
    title: '此通知可關閉',
    onClose: () => alert('關閉'),
  },
};

export const WithAction: Story = {
  args: {
    status: 'info',
    title: '有新訊息',
    description: '您有 3 則未讀訊息',
    action: (
      <Button size="small" variant="miner">
        查看
      </Button>
    ),
  },
};
