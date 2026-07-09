import type { Meta, StoryObj } from '@storybook/react';
import { Card, CardHeader, CardBody, CardFooter } from './Card';
import { Button } from '../Button';
import { Badge } from '../Badge';
import { Text } from '../Title/Text';
import { StatusIndicator } from '../StatusIndicator';

const meta: Meta<typeof Card> = {
  title: 'Components/Layout/Card',
  component: Card,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
卡片容器，提供三種視覺強度（elevated / outlined / flat），
搭配子元件 \`CardHeader\` / \`CardBody\` / \`CardFooter\` 組合使用。
        `,
      },
    },
  },
  argTypes: {
    variant: {
      control: 'radio',
      options: ['elevated', 'outlined', 'flat'],
    },
    interactive: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Basic: Story = {
  render: (args) => (
    <Card {...args} style={{ width: 360 }}>
      <CardHeader title="月度報告" subtitle="2026 年 5 月" />
      <CardBody>
        <Text variant="body2" color="middle">
          本月總交易量達 1,284 件，較上月成長 12.3%。詳細數據可由右上角下載連結取得。
        </Text>
      </CardBody>
      <CardFooter>
        <Button variant="miner" size="small">
          下載
        </Button>
        <Button size="small">查看詳情</Button>
      </CardFooter>
    </Card>
  ),
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16 }}>
      <Card variant="elevated" padded style={{ width: 220 }}>
        <strong>Elevated</strong>
        <Text variant="body2" color="middle">
          帶 shadow，最強視覺層級
        </Text>
      </Card>
      <Card variant="outlined" padded style={{ width: 220 }}>
        <strong>Outlined</strong>
        <Text variant="body2" color="middle">
          僅有 border，預設選擇
        </Text>
      </Card>
      <Card variant="flat" padded style={{ width: 220 }}>
        <strong>Flat</strong>
        <Text variant="body2" color="middle">
          無 border 也無 shadow
        </Text>
      </Card>
    </div>
  ),
};

export const WithActions: Story = {
  render: () => (
    <Card variant="outlined" style={{ width: 400 }}>
      <CardHeader
        title="充電站 #A-203"
        subtitle="台北市信義區"
        startContent={<StatusIndicator type="success" label="運作中" />}
        actions={<Badge variant="primary">即時</Badge>}
      />
      <CardBody>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
          <Text variant="caption" color="middle">可用電池</Text>
          <Text variant="subtitle1">8 / 12</Text>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Text variant="caption" color="middle">本日交換次數</Text>
          <Text variant="subtitle1">142</Text>
        </div>
      </CardBody>
      <CardFooter align="between">
        <Text variant="caption" color="lower">
          1 分鐘前更新
        </Text>
        <Button variant="miner" size="small">
          詳細資訊
        </Button>
      </CardFooter>
    </Card>
  ),
};

export const Interactive: Story = {
  render: () => (
    <Card
      variant="outlined"
      interactive
      padded
      onClick={() => alert('點擊卡片')}
      style={{ width: 280 }}
    >
      <Text variant="subtitle1" style={{ marginBottom: 4 }}>
        新增站點
      </Text>
      <Text variant="body2" color="middle">
        點擊新增一個充電站
      </Text>
    </Card>
  ),
};

export const NoDivider: Story = {
  render: () => (
    <Card variant="outlined" style={{ width: 320 }}>
      <CardHeader title="無分隔線" subtitle="貼合的標題與內容" divider={false} />
      <CardBody>
        <Text variant="body2" color="middle">
          適合內容較短、視覺層次不需要明顯區隔的場景。
        </Text>
      </CardBody>
    </Card>
  ),
};

export const StatsGrid: Story = {
  name: '範例：統計儀表板',
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: 16,
        width: 800,
      }}
    >
      {[
        { label: '今日交換', value: '1,284', delta: '+12%', tone: 'success' as const },
        { label: '在線站點', value: '142', delta: '正常', tone: 'success' as const },
        { label: '待處理工單', value: '23', delta: '需注意', tone: 'warning' as const },
        { label: '錯誤事件', value: '3', delta: '本週新增', tone: 'error' as const },
      ].map((s) => (
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
    </div>
  ),
};
