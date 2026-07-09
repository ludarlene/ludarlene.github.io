import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { PageLayout, PageHeader, PageSection, PageGrid } from './PageLayout';
import { SideNav, TopBar, Breadcrumbs } from '../Navigation';
import type { SideNavItem } from '../Navigation';
import { Card, CardBody, CardHeader } from '../Card';
import { Button } from '../Button';
import { Input } from '../Input';
import { Badge } from '../Badge';
import { StatusIndicator } from '../StatusIndicator';
import { DataTable } from '../DataTable';
import type { DataTableColumn } from '../DataTable';
import { Tabs, TabList, Tab, TabPanel } from '../Tabs';
import { Text } from '../Title';
import {
  HomeIcon,
  GridIcon,
  UserIcon,
  SettingsIcon,
  BellIcon,
  SearchIcon,
  DownloadIcon,
  PlusIcon,
} from '../_shared/icons';

const meta: Meta = {
  title: 'Components/Layout/PageLayout',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
對應 Figma：Page Template 系列。提供版型基底元件：

- **\`<PageLayout>\`**：整體頁面骨架（SideNav + TopBar + Content）
- **\`<PageHeader>\`**：頁面頂部標題區（breadcrumbs + 標題 + 描述 + actions）
- **\`<PageSection>\`**：區塊容器（含標題與右側 actions）
- **\`<PageGrid>\`**：響應式網格

下方範例展示 Figma 對應的幾種 Page Template（Dashboard、Details、List）的組合方式。
        `,
      },
    },
  },
};
export default meta;
type Story = StoryObj;

const navItems: SideNavItem[] = [
  { id: 'dashboard', label: '儀表板', icon: <HomeIcon size={20} /> },
  {
    id: 'fleet',
    label: '車隊管理',
    icon: <GridIcon size={20} />,
    badge: <Badge variant="primary" size="small">12</Badge>,
    children: [
      { id: 'vehicles', label: '車輛清單' },
      { id: 'drivers', label: '駕駛管理' },
    ],
  },
  { id: 'users', label: '使用者', icon: <UserIcon size={20} /> },
  { id: 'settings', label: '設定', icon: <SettingsIcon size={20} /> },
];

const sharedNav = (active: string) => (
  <SideNav
    items={navItems}
    value={active}
    header={<div style={{ fontWeight: 700, fontSize: 18 }}>IonexOS</div>}
    footer={<div style={{ fontSize: 12, opacity: 0.6 }}>v1.8.0</div>}
  />
);

const sharedTopBar = (title: string) => (
  <TopBar
    title={title}
    centerContent={
      <Input
        placeholder="搜尋"
        startAdornment={<SearchIcon size={16} />}
        style={{ width: 320 }}
      />
    }
    endContent={
      <>
        <Button variant="miner" aria-label="通知">
          <BellIcon size={18} />
        </Button>
        <Button variant="miner" aria-label="使用者">
          <UserIcon size={18} />
        </Button>
      </>
    }
  />
);

// === Template 1: Dashboard ===
export const DashboardTemplate: Story = {
  render: function Render() {
    const stats = [
      { label: '今日交換', value: '1,284', tone: 'success' as const, delta: '+12%' },
      { label: '在線站點', value: '142', tone: 'success' as const, delta: '正常' },
      { label: '待處理工單', value: '23', tone: 'warning' as const, delta: '需注意' },
      { label: '異常事件', value: '3', tone: 'error' as const, delta: '本週' },
    ];

    return (
      <PageLayout
        sideNav={sharedNav('dashboard')}
        topBar={sharedTopBar('儀表板')}
      >
        <PageHeader
          breadcrumbs={
            <Breadcrumbs
              items={[
                { label: '首頁', href: '#', icon: <HomeIcon size={14} /> },
                { label: '儀表板' },
              ]}
            />
          }
          title="營運儀表板"
          description="即時掌握今日營運概況"
          actions={
            <>
              <Button variant="miner">
                <DownloadIcon size={16} />
                匯出
              </Button>
              <Button>
                <PlusIcon size={16} />
                新增站點
              </Button>
            </>
          }
        />

        <PageSection title="關鍵指標">
          <PageGrid columns={4}>
            {stats.map((s) => (
              <Card key={s.label} variant="outlined" padded>
                <Text variant="caption" color="middle" style={{ marginBottom: 6 }}>
                  {s.label}
                </Text>
                <Text variant="h3" as="div">
                  {s.value}
                </Text>
                <div style={{ marginTop: 8 }}>
                  <StatusIndicator type={s.tone} label={s.delta} />
                </div>
              </Card>
            ))}
          </PageGrid>
        </PageSection>

        <PageSection
          title="近期活動"
          actions={
            <Button size="small" variant="miner">
              查看全部
            </Button>
          }
        >
          <Card variant="outlined">
            <CardBody>
              <Text color="middle">活動資料區（可放表格、圖表）</Text>
            </CardBody>
          </Card>
        </PageSection>
      </PageLayout>
    );
  },
};

// === Template 2: Details ===
export const DetailsTemplate: Story = {
  render: function Render() {
    const [tab, setTab] = useState('overview');
    return (
      <PageLayout
        sideNav={sharedNav('fleet')}
        topBar={sharedTopBar('車輛詳情')}
      >
        <PageHeader
          breadcrumbs={
            <Breadcrumbs
              items={[
                { label: '首頁', href: '#', icon: <HomeIcon size={14} /> },
                { label: '車隊管理', href: '#' },
                { label: '車輛清單', href: '#' },
                { label: 'A-203' },
              ]}
            />
          }
          title="A-203 · Ionex S2"
          description="VIN: TWXYZ12345678901"
          startContent={
            <StatusIndicator type="success" label="運行中" />
          }
          actions={
            <>
              <Button variant="miner">編輯</Button>
              <Button variant="outlineDanger">停用</Button>
            </>
          }
        />

        <Tabs value={tab} onChange={setTab}>
          <TabList>
            <Tab value="overview">總覽</Tab>
            <Tab value="history">使用記錄</Tab>
            <Tab value="maintenance">保養紀錄</Tab>
            <Tab value="settings">設定</Tab>
          </TabList>
          <TabPanel value="overview">
            <PageGrid columns={3} gap={16}>
              <Card variant="outlined">
                <CardHeader title="基本資訊" />
                <CardBody>
                  <Text variant="body2" color="middle">
                    車型、年份、註冊日期等
                  </Text>
                </CardBody>
              </Card>
              <Card variant="outlined">
                <CardHeader title="駕駛人員" />
                <CardBody>
                  <Text variant="body2" color="middle">
                    王小明 · alex@ionex.com
                  </Text>
                </CardBody>
              </Card>
              <Card variant="outlined">
                <CardHeader title="當前狀態" />
                <CardBody>
                  <Text variant="body2" color="middle">
                    電量 72% · 里程 12,840 km
                  </Text>
                </CardBody>
              </Card>
            </PageGrid>
          </TabPanel>
          <TabPanel value="history">
            <Card variant="outlined" padded>
              <Text>使用記錄列表</Text>
            </Card>
          </TabPanel>
          <TabPanel value="maintenance">
            <Card variant="outlined" padded>
              <Text>保養紀錄</Text>
            </Card>
          </TabPanel>
          <TabPanel value="settings">
            <Card variant="outlined" padded>
              <Text>車輛設定</Text>
            </Card>
          </TabPanel>
        </Tabs>
      </PageLayout>
    );
  },
};

// === Template 3: List Page ===
export const ListTemplate: Story = {
  render: function Render() {
    type Row = {
      id: string;
      vehicle: string;
      driver: string;
      mileage: number;
      status: 'success' | 'warning' | 'error';
      statusLabel: string;
    };
    const rows: Row[] = Array.from({ length: 8 }, (_, i) => ({
      id: `V-${String(i + 1).padStart(3, '0')}`,
      vehicle: ['Ionex S1', 'Ionex S2', 'Ionex Plus'][i % 3],
      driver: ['王小明', '李美麗', '張大華'][i % 3],
      mileage: 1000 + i * 580,
      status: (['success', 'warning', 'error'] as const)[i % 3],
      statusLabel: ['運行中', '待充電', '異常'][i % 3],
    }));
    const columns: DataTableColumn<Row>[] = [
      { id: 'id', header: '編號', accessor: 'id', sortable: true, width: 100 },
      { id: 'v', header: '車輛', accessor: 'vehicle', sortable: true },
      { id: 'd', header: '駕駛', accessor: 'driver', sortable: true },
      {
        id: 'm',
        header: '里程',
        accessor: 'mileage',
        sortable: true,
        align: 'right',
        cell: (r) => `${r.mileage.toLocaleString()} km`,
      },
      {
        id: 's',
        header: '狀態',
        accessor: 'status',
        cell: (r) => <StatusIndicator type={r.status} label={r.statusLabel} />,
      },
    ];

    return (
      <PageLayout
        sideNav={sharedNav('vehicles')}
        topBar={sharedTopBar('車輛清單')}
      >
        <PageHeader
          breadcrumbs={
            <Breadcrumbs
              items={[
                { label: '首頁', href: '#', icon: <HomeIcon size={14} /> },
                { label: '車隊管理', href: '#' },
                { label: '車輛清單' },
              ]}
            />
          }
          title="車輛清單"
          description={`共 ${rows.length} 台車輛`}
          actions={
            <>
              <Button variant="miner">
                <DownloadIcon size={16} />
                匯出
              </Button>
              <Button>
                <PlusIcon size={16} />
                新增車輛
              </Button>
            </>
          }
        />

        <DataTable
          columns={columns}
          data={rows}
          rowKey="id"
          selectable
          toolbar={{
            startContent: (
              <Input
                placeholder="搜尋車輛"
                startAdornment={<SearchIcon size={16} />}
                style={{ width: 280 }}
              />
            ),
            selectedActions: (
              <>
                <Button size="small" variant="miner">
                  批次編輯
                </Button>
                <Button size="small" variant="outlineDanger">
                  刪除
                </Button>
              </>
            ),
          }}
          pagination={{ mode: 'page' }}
        />
      </PageLayout>
    );
  },
};
