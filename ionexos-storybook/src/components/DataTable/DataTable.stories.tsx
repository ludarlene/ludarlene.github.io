import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import type { Key } from 'react';
import { DataTable } from './DataTable';
import type { DataTableColumn } from './types';
import { CellText } from '../Table';
import { StatusIndicator } from '../StatusIndicator';
import { Badge } from '../Badge';
import { Button } from '../Button';
import { Input } from '../Input';
import { Select } from '../Select';
import {
  SearchIcon,
  DownloadIcon,
  TrashIcon,
  EditIcon,
  PlusIcon,
} from '../_shared/icons';

type Vehicle = {
  id: string;
  vehicle: string;
  driver: string;
  driverEmail: string;
  mileage: number;
  battery: number;
  status: 'success' | 'warning' | 'error' | 'pending';
  statusLabel: string;
  lastUpdate: string;
};

const data: Vehicle[] = Array.from({ length: 38 }, (_, i) => {
  const models = ['Ionex S1', 'Ionex S2', 'Ionex Plus'];
  const drivers = ['王小明', '李美麗', '張大華', '陳小芳', '林志強'];
  const statuses = [
    { s: 'success' as const, l: '運行中' },
    { s: 'warning' as const, l: '待充電' },
    { s: 'pending' as const, l: '保養中' },
    { s: 'error' as const, l: '異常' },
  ];
  const status = statuses[i % statuses.length];
  return {
    id: `V-${String(i + 1).padStart(3, '0')}`,
    vehicle: models[i % models.length],
    driver: drivers[i % drivers.length],
    driverEmail: `user${i + 1}@ionex.com`,
    mileage: 1000 + i * 234,
    battery: 30 + ((i * 7) % 70),
    status: status.s,
    statusLabel: status.l,
    lastUpdate: `2026/05/${(i % 22) + 1} ${10 + (i % 12)}:${(i * 7) % 60}`,
  };
});

const columns: DataTableColumn<Vehicle>[] = [
  {
    id: 'id',
    header: '編號',
    accessor: 'id',
    sortable: true,
    width: 100,
  },
  {
    id: 'vehicle',
    header: '車輛資訊',
    sortable: true,
    accessor: 'vehicle',
    cell: (row) => <CellText primary={row.vehicle} secondary={row.id} />,
  },
  {
    id: 'driver',
    header: '駕駛',
    sortable: true,
    accessor: 'driver',
    cell: (row) => <CellText primary={row.driver} secondary={row.driverEmail} />,
  },
  {
    id: 'mileage',
    header: '里程',
    sortable: true,
    accessor: 'mileage',
    align: 'right',
    cell: (row) => `${row.mileage.toLocaleString()} km`,
  },
  {
    id: 'battery',
    header: '電量',
    sortable: true,
    accessor: 'battery',
    align: 'right',
    cell: (row) => `${row.battery}%`,
  },
  {
    id: 'status',
    header: '狀態',
    accessor: 'status',
    sortable: true,
    cell: (row) => <StatusIndicator type={row.status} label={row.statusLabel} />,
  },
  {
    id: 'updated',
    header: '最後更新',
    accessor: 'lastUpdate',
  },
];

const meta: Meta = {
  title: 'Components/Data Display/DataTable',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
資料驅動表格，對應 Figma Data Table 全套功能：

- **column-based 設定**（accessor / cell / sortable / align / width）
- **排序**（前端內建，也支援受控伺服器排序）
- **列選取**（多選、全選、indeterminate）
- **分頁**（前端切片或伺服器分頁兩種模式）
- **Toolbar**（對應 Figma TableBar_Label / TableBar_Filter / Selected）
- **Loading overlay**
- **Empty state**
        `,
      },
    },
  },
};
export default meta;
type Story = StoryObj;

export const Basic: Story = {
  render: () => (
    <DataTable
      columns={columns}
      data={data.slice(0, 8)}
      rowKey="id"
    />
  ),
};

export const Sortable: Story = {
  render: () => (
    <DataTable
      columns={columns}
      data={data.slice(0, 8)}
      rowKey="id"
    />
  ),
  parameters: {
    docs: {
      description: {
        story: '點擊有 sortable 的表頭可以依該欄排序。三段切換：none → asc → desc → none',
      },
    },
  },
};

export const Selectable: Story = {
  render: function Render() {
    const [keys, setKeys] = useState<Key[]>([]);
    return (
      <DataTable
        columns={columns}
        data={data.slice(0, 8)}
        rowKey="id"
        selectable
        selectedKeys={keys}
        onSelectionChange={setKeys}
        toolbar={{
          startContent: (
            <span style={{ fontSize: 14, color: '#eaedf0', fontWeight: 500 }}>
              車輛清單（{data.slice(0, 8).length}）
            </span>
          ),
          endContent: (
            <>
              <Button size="small" variant="miner">
                <DownloadIcon size={16} />
                匯出
              </Button>
              <Button size="small">
                <PlusIcon size={16} />
                新增
              </Button>
            </>
          ),
          selectedActions: (
            <>
              <Button size="small" variant="miner">
                <EditIcon size={16} />
                批次編輯
              </Button>
              <Button size="small" variant="outlineDanger">
                <TrashIcon size={16} />
                刪除
              </Button>
            </>
          ),
        }}
      />
    );
  },
};

export const WithPagination: Story = {
  render: () => (
    <DataTable
      columns={columns}
      data={data}
      rowKey="id"
      selectable
      pagination={{ mode: 'page' }}
      toolbar={{
        startContent: (
          <Input
            placeholder="搜尋車輛、駕駛"
            startAdornment={<SearchIcon size={16} />}
            style={{ width: 280 }}
          />
        ),
        endContent: (
          <>
            <Button size="small" variant="miner">
              <DownloadIcon size={16} />
              匯出
            </Button>
            <Button size="small">
              <PlusIcon size={16} />
              新增車輛
            </Button>
          </>
        ),
        selectedActions: (
          <>
            <Button size="small" variant="miner">
              批次指派
            </Button>
            <Button size="small" variant="outlineDanger">
              <TrashIcon size={16} />
              刪除
            </Button>
          </>
        ),
      }}
    />
  ),
};

export const ServerSideExample: Story = {
  name: '伺服器分頁與排序',
  render: function Render() {
    // 模擬：受控分頁 + 受控排序，外部處理篩選邏輯
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [sort, setSort] = useState<{ columnId: string; direction: 'asc' | 'desc' } | null>(
      null,
    );

    // 在真實應用中，這邊會 fetch API。這裡用前端 mock
    const sortedAll = [...data].sort((a, b) => {
      if (!sort) return 0;
      const av = a[sort.columnId as keyof Vehicle];
      const bv = b[sort.columnId as keyof Vehicle];
      const cmp = String(av).localeCompare(String(bv), 'zh');
      return sort.direction === 'asc' ? cmp : -cmp;
    });
    const slice = sortedAll.slice((page - 1) * pageSize, page * pageSize);

    return (
      <DataTable
        columns={columns}
        data={slice}
        rowKey="id"
        sort={sort}
        onSortChange={setSort}
        paginationState={{ page, pageSize }}
        onPaginationChange={(s) => {
          setPage(s.page);
          setPageSize(s.pageSize);
        }}
        total={data.length}
        pagination={{ mode: 'page' }}
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          '同時受控 `sort` 與 `paginationState`，並傳入 `total`。實際應用時把 sortedAll/slice 換成 API call 結果即可。',
      },
    },
  },
};

export const Loading: Story = {
  render: () => (
    <DataTable
      columns={columns}
      data={data.slice(0, 5)}
      rowKey="id"
      loading
    />
  ),
};

export const Empty: Story = {
  render: () => (
    <DataTable
      columns={columns}
      data={[]}
      rowKey="id"
      toolbar={{
        startContent: <span style={{ color: '#eaedf0' }}>車輛清單</span>,
      }}
    />
  ),
};

export const RowClickable: Story = {
  render: function Render() {
    const [last, setLast] = useState<string>('');
    return (
      <div>
        {last && (
          <div
            style={{
              padding: 12,
              marginBottom: 12,
              background: 'rgba(102, 139, 250, 0.1)',
              borderRadius: 8,
              color: '#eaedf0',
            }}
          >
            上次點擊：{last}
          </div>
        )}
        <DataTable
          columns={columns}
          data={data.slice(0, 5)}
          rowKey="id"
          onRowClick={(row) => setLast(`${row.id} - ${row.driver}`)}
        />
      </div>
    );
  },
};
