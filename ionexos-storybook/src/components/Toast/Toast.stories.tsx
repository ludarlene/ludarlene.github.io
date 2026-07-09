import type { Meta, StoryObj } from '@storybook/react';
import { ToastItem } from './ToastItem';
import { ToastProvider, useToast } from './ToastProvider';
import { Button } from '../Button';

const meta: Meta<typeof ToastItem> = {
  title: 'Components/Feedback/Toast',
  component: ToastItem,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
對應 Figma：Toast。提供兩種使用方式：

1. **\`<ToastItem>\`**：純展示元件，直接放置使用
2. **\`<ToastProvider>\` + \`useToast()\` hook**：完整的全域 Toast 系統，含自動消失、堆疊、portal

**Status**：\`success\` / \`info\` / \`warning\` / \`failure\`
**Variant**：\`default\`（語意色背景）/ \`feedback\`（深色背景，僅邊框語意色）
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ToastItem>;

// 純展示變體
export const AllStatusDefault: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <ToastItem status="success" title="操作已成功完成" />
      <ToastItem status="info" title="系統已更新到 v1.9" />
      <ToastItem status="warning" title="授權即將到期" />
      <ToastItem status="failure" title="無法連線到伺服器" />
    </div>
  ),
};

export const AllStatusFeedback: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <ToastItem variant="feedback" status="success" title="操作已成功完成" />
      <ToastItem variant="feedback" status="info" title="系統已更新到 v1.9" />
      <ToastItem variant="feedback" status="warning" title="授權即將到期" />
      <ToastItem variant="feedback" status="failure" title="無法連線到伺服器" />
    </div>
  ),
};

export const WithDescription: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <ToastItem
        status="success"
        title="訂單已建立"
        description="編號 #2026052200001"
      />
      <ToastItem
        status="warning"
        title="未儲存的變更"
        description="您有未儲存的內容，離開將遺失"
      />
    </div>
  ),
};

// === Provider 模式：使用 hook ===
const ToastDemoButtons = () => {
  const toast = useToast();
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
      <Button
        variant="primary"
        onClick={() => toast.success({ title: '已儲存' })}
      >
        Success
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast.info({ title: '小提醒', description: '記得備份資料' })
        }
      >
        Info（含描述）
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast.warning({
            title: '即將到期',
            description: '剩餘 3 天',
            duration: 0,
          })
        }
      >
        Warning（不自動關閉）
      </Button>
      <Button
        variant="outlineDanger"
        onClick={() => toast.failure({ title: '操作失敗，請重試' })}
      >
        Failure
      </Button>
      <Button variant="miner" onClick={() => toast.dismissAll()}>
        全部關閉
      </Button>
    </div>
  );
};

export const ProviderUsage: StoryObj = {
  render: () => (
    <ToastProvider position="top-right">
      <ToastDemoButtons />
    </ToastProvider>
  ),
  parameters: {
    docs: {
      description: {
        story:
          '使用 `<ToastProvider>` 包裹 App，子元件即可透過 `useToast()` hook 觸發 toast。',
      },
    },
  },
};

const ToastPositionDemo = ({ position }: { position: any }) => {
  const toast = useToast();
  return (
    <Button
      onClick={() =>
        toast.success({ title: `位置：${position}` })
      }
    >
      測試 {position}
    </Button>
  );
};

export const PositionTopLeft: StoryObj = {
  render: () => (
    <ToastProvider position="top-left">
      <ToastPositionDemo position="top-left" />
    </ToastProvider>
  ),
};
export const PositionBottomCenter: StoryObj = {
  render: () => (
    <ToastProvider position="bottom-center">
      <ToastPositionDemo position="bottom-center" />
    </ToastProvider>
  ),
};
