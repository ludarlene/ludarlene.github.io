import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Modal } from './Modal';
import { Button } from '../Button';
import { Input } from '../Input';

const meta: Meta<typeof Modal> = {
  title: 'Components/Feedback/Modal',
  component: Modal,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
對應 Figma：Modal / Modal Dialog / Modal Overlay。
- **type=modal**：標準對話框（670px）
- **type=dialog**：精簡對話框（580px）
- **type=overlay**：寬鬆容器，常用於圖文展示（744px）

包含 ESC 關閉、背景點擊關閉、body scroll lock、focus 管理。
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Modal>;

export const Basic: Story = {
  render: function Render() {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>開啟 Modal</Button>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          title="標題"
          description="這是 Modal 的描述文字"
          footer={
            <>
              <Button variant="miner" onClick={() => setOpen(false)}>
                取消
              </Button>
              <Button onClick={() => setOpen(false)}>確認</Button>
            </>
          }
        >
          這裡是 Modal 的內容區，可以放任何 React node。
        </Modal>
      </>
    );
  },
};

export const Dialog: Story = {
  render: function Render() {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>開啟 Dialog</Button>
        <Modal
          open={open}
          type="dialog"
          onClose={() => setOpen(false)}
          title="確認刪除"
          description="此操作無法復原。您確定要刪除這個項目嗎？"
          footer={
            <>
              <Button variant="miner" onClick={() => setOpen(false)}>
                取消
              </Button>
              <Button variant="outlineDanger" onClick={() => setOpen(false)}>
                確認刪除
              </Button>
            </>
          }
        />
      </>
    );
  },
};

export const Overlay: Story = {
  render: function Render() {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>開啟 Overlay</Button>
        <Modal
          open={open}
          type="overlay"
          onClose={() => setOpen(false)}
          title="服務條款更新"
          footer={
            <>
              <Button variant="miner" onClick={() => setOpen(false)}>
                稍後再說
              </Button>
              <Button onClick={() => setOpen(false)}>我已閱讀並同意</Button>
            </>
          }
        >
          <p style={{ marginBottom: 12 }}>
            為提供更完善的服務，我們已更新使用條款與隱私權政策。
            主要變更包括：
          </p>
          <ul style={{ paddingLeft: 20, lineHeight: 2 }}>
            <li>新增帳戶資料保護條款</li>
            <li>更新第三方服務整合說明</li>
            <li>強化 Cookie 使用透明度</li>
          </ul>
        </Modal>
      </>
    );
  },
};

export const FormModal: Story = {
  render: function Render() {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>編輯個人資料</Button>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          title="編輯個人資料"
          footer={
            <>
              <Button variant="miner" onClick={() => setOpen(false)}>
                取消
              </Button>
              <Button onClick={() => setOpen(false)}>儲存變更</Button>
            </>
          }
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <Input label="姓名" defaultValue="Alex Wang" fullWidth />
            <Input
              label="Email"
              defaultValue="alex@ionex.com"
              type="email"
              fullWidth
            />
            <Input label="手機號碼" placeholder="0912-345-678" fullWidth />
          </div>
        </Modal>
      </>
    );
  },
};

export const NoCloseButton: Story = {
  render: function Render() {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>需明確操作才能關閉</Button>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          title="重要通知"
          showCloseButton={false}
          closeOnBackdropClick={false}
          closeOnEsc={false}
          footer={<Button onClick={() => setOpen(false)}>我知道了</Button>}
        >
          這個 Modal 只能透過底下的按鈕關閉，背景點擊與 ESC 都已停用。
        </Modal>
      </>
    );
  },
};
