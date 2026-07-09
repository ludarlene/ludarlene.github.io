import type { Meta, StoryObj } from '@storybook/react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  CellText,
  TableEmpty,
} from './Table';
import { StatusIndicator } from '../StatusIndicator';
import { Button } from '../Button';
import { Badge } from '../Badge';

const meta: Meta<typeof Table> = {
  title: 'Components/Data Display/Table',
  component: Table,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
對應 Figma：Table（純展示元件）。提供基本的 HTML table 組合元件，
適合靜態資料或自行控制資料邏輯的場景。需要排序、選取、分頁等
互動功能請改用 \`<DataTable>\`。

**size**：medium（預設）/ large 對應 Figma FontSize 雙尺寸
**density**：comfortable（預設 16px padding）/ compact（8px）
        `,
      },
    },
  },
  argTypes: {
    size: { control: 'radio', options: ['medium', 'large'] },
    density: { control: 'radio', options: ['comfortable', 'compact'] },
    striped: { control: 'boolean' },
    hoverable: { control: 'boolean' },
    bordered: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Table>;

const sampleRows = [
  { id: 'V-001', vehicle: 'Ionex S1', driver: '王小明', mileage: '12,840 km', status: 'success' as const },
  { id: 'V-002', vehicle: 'Ionex S2', driver: '李美麗', mileage: '8,234 km', status: 'warning' as const },
  { id: 'V-003', vehicle: 'Ionex Plus', driver: '張大華', mileage: '24,156 km', status: 'success' as const },
  { id: 'V-004', vehicle: 'Ionex S1', driver: '陳小芳', mileage: '3,120 km', status: 'error' as const },
];

export const Basic: Story = {
  render: (args) => (
    <Table {...args}>
      <Thead>
        <Tr>
          <Th>編號</Th>
          <Th>車輛型號</Th>
          <Th>駕駛人</Th>
          <Th align="right">里程</Th>
          <Th>狀態</Th>
        </Tr>
      </Thead>
      <Tbody>
        {sampleRows.map((row) => (
          <Tr key={row.id}>
            <Td>{row.id}</Td>
            <Td>{row.vehicle}</Td>
            <Td>{row.driver}</Td>
            <Td align="right">{row.mileage}</Td>
            <Td>
              <StatusIndicator type={row.status} />
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  ),
};

export const Striped: Story = {
  args: { striped: true },
  render: Basic.render,
};

export const Compact: Story = {
  args: { density: 'compact' },
  render: Basic.render,
};

export const LargeSize: Story = {
  args: { size: 'large' },
  render: Basic.render,
};

export const WithCellSubtext: Story = {
  name: 'Cell with Subtext（對應 Figma Text+Subtext）',
  render: () => (
    <Table>
      <Thead>
        <Tr>
          <Th>訂單</Th>
          <Th>客戶</Th>
          <Th align="right">金額</Th>
          <Th>狀態</Th>
          <Th align="right">操作</Th>
        </Tr>
      </Thead>
      <Tbody>
        <Tr>
          <Td>
            <CellText primary="#OD-2026-001" secondary="2026/05/22 14:30" />
          </Td>
          <Td>
            <CellText primary="王小明" secondary="alex@example.com" />
          </Td>
          <Td align="right">NT$ 1,280</Td>
          <Td>
            <Badge variant="success">已完成</Badge>
          </Td>
          <Td align="right">
            <Button size="small" variant="miner">
              詳情
            </Button>
          </Td>
        </Tr>
        <Tr selected>
          <Td>
            <CellText primary="#OD-2026-002" secondary="2026/05/22 15:12" />
          </Td>
          <Td>
            <CellText primary="李美麗" secondary="mei@example.com" />
          </Td>
          <Td align="right">NT$ 2,490</Td>
          <Td>
            <Badge variant="warning">處理中</Badge>
          </Td>
          <Td align="right">
            <Button size="small" variant="miner">
              詳情
            </Button>
          </Td>
        </Tr>
        <Tr>
          <Td>
            <CellText primary="#OD-2026-003" secondary="2026/05/22 16:45" />
          </Td>
          <Td>
            <CellText primary="張大華" secondary="hua@example.com" />
          </Td>
          <Td align="right">NT$ 580</Td>
          <Td>
            <Badge variant="error">已退款</Badge>
          </Td>
          <Td align="right">
            <Button size="small" variant="miner">
              詳情
            </Button>
          </Td>
        </Tr>
      </Tbody>
    </Table>
  ),
};

export const Empty: Story = {
  name: 'Empty State (No_Data)',
  render: () => (
    <Table>
      <Thead>
        <Tr>
          <Th>編號</Th>
          <Th>車輛型號</Th>
          <Th>駕駛人</Th>
          <Th>狀態</Th>
        </Tr>
      </Thead>
      <Tbody>
        <TableEmpty
          colSpan={4}
          title="尚無車輛資料"
          description="開始新增第一台車輛來建立你的車隊"
          action={<Button size="small">新增車輛</Button>}
        />
      </Tbody>
    </Table>
  ),
};
