import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { DragDropList } from './DragDropList';
import type { DragDropItemData } from './DragDropList';
import { Button } from '../Button';
import { Badge } from '../Badge';
import { EditIcon, TrashIcon } from '../_shared/icons';

const meta: Meta<typeof DragDropList> = {
  title: 'Components/Data Display/DragDrop',
  component: DragDropList,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
對應 Figma：Drag & Drop / DragDropItem。可拖拉排序的清單元件。

**支援的 item state**（對應 Figma）：
- \`default\` 預設
- \`hover\` 滑鼠移入時
- \`grabbing\` 拖拉中
- \`edit\` 編輯標示
- \`delete\` 刪除標示
- \`disabled\` 停用

採用原生 HTML5 drag API，不需第三方相依。觸控裝置的支援受限於瀏覽器，
若需完整觸控支援建議搭配 \`pointer-events\` polyfill 或改用 dnd-kit。
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof DragDropList>;

export const Basic: Story = {
  render: function Render() {
    const [items, setItems] = useState<DragDropItemData[]>([
      { id: 'a', label: '駕駛資訊', description: '姓名、電話、駕照' },
      { id: 'b', label: '車輛資訊', description: '車型、車牌、年份' },
      { id: 'c', label: '保險資訊', description: '保單編號、到期日' },
      { id: 'd', label: '違規紀錄', description: '近 3 年違規清單' },
    ]);
    return (
      <div style={{ width: 480 }}>
        <DragDropList items={items} onChange={setItems} />
      </div>
    );
  },
};

export const WithEndContent: Story = {
  render: function Render() {
    const [items, setItems] = useState<DragDropItemData[]>([
      {
        id: '1',
        label: '車輛管理',
        description: '使用中',
        endContent: (
          <>
            <Button size="small" variant="miner" aria-label="編輯">
              <EditIcon size={14} />
            </Button>
            <Button size="small" variant="miner" aria-label="刪除">
              <TrashIcon size={14} />
            </Button>
          </>
        ),
      },
      {
        id: '2',
        label: '駕駛管理',
        description: '使用中',
        endContent: (
          <>
            <Button size="small" variant="miner" aria-label="編輯">
              <EditIcon size={14} />
            </Button>
            <Button size="small" variant="miner" aria-label="刪除">
              <TrashIcon size={14} />
            </Button>
          </>
        ),
      },
      {
        id: '3',
        label: '路線規劃',
        endContent: <Badge variant="primary" size="small">Beta</Badge>,
      },
      {
        id: '4',
        label: '報表分析',
        description: '需付費方案',
        state: 'disabled',
      },
    ]);
    return (
      <div style={{ width: 480 }}>
        <DragDropList items={items} onChange={setItems} />
      </div>
    );
  },
};

export const AllStates: Story = {
  name: '所有狀態（純展示）',
  render: () => (
    <div style={{ width: 480 }}>
      <DragDropList
        items={[
          { id: '1', label: 'Default 狀態', description: '一般情況' },
          { id: '2', label: 'Hover 狀態', state: 'hover' },
          { id: '3', label: 'Grabbing 狀態', state: 'grabbing' },
          { id: '4', label: 'Edit 狀態', description: '正在編輯中', state: 'edit' },
          { id: '5', label: 'Delete 狀態', description: '標示為刪除', state: 'delete' },
          { id: '6', label: 'Disabled 狀態', state: 'disabled' },
        ]}
        disabled
      />
    </div>
  ),
};

export const EditOrder: Story = {
  name: '範例：編輯顯示順序',
  render: function Render() {
    const [items, setItems] = useState<DragDropItemData[]>([
      { id: 'overview', label: '營運概覽', description: '本月 KPI 指標' },
      { id: 'orders', label: '訂單統計', description: '訂單量、金額趨勢' },
      { id: 'vehicles', label: '車輛狀態', description: '在線、待機、故障' },
      { id: 'revenue', label: '營收分析', description: '營收結構、毛利率' },
      { id: 'customers', label: '客戶分群', description: '依使用頻次、地區' },
    ]);
    return (
      <div style={{ width: 480 }}>
        <h3 style={{ color: '#eaedf0', marginBottom: 16 }}>儀表板區塊順序</h3>
        <DragDropList items={items} onChange={setItems} />
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            gap: 8,
            marginTop: 16,
          }}
        >
          <Button variant="miner">取消</Button>
          <Button>儲存順序</Button>
        </div>
      </div>
    );
  },
};
