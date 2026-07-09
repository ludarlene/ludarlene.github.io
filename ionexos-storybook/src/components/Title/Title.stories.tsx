import type { Meta, StoryObj } from '@storybook/react';
import { Title } from './Title';
import { Text } from './Text';
import { Button } from '../Button';
import { Badge } from '../Badge';
import { StatusIndicator } from '../StatusIndicator';

const meta: Meta<typeof Title> = {
  title: 'Components/Layout/Title',
  component: Title,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
對應 Figma：Title / CardHeader / Content。

**variant**：
- \`page\`：頁面標題（h3 字級，最大）
- \`section\`：區塊標題（h5 字級，預設）
- \`card\`：卡片標題（h6 字級，最小）
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Title>;

export const PageTitle: Story = {
  args: { variant: 'page', children: '車隊管理儀表板' },
};

export const SectionTitle: Story = {
  args: {
    variant: 'section',
    children: '本月營運概況',
    subtitle: '所有指標皆已更新至今日 23:59',
  },
};

export const CardTitle: Story = {
  args: { variant: 'card', children: '快速操作' },
};

export const WithActions: Story = {
  render: () => (
    <Title
      variant="section"
      subtitle="共 12 筆資料"
      actions={
        <>
          <Button variant="miner" size="small">
            匯出
          </Button>
          <Button size="small">新增</Button>
        </>
      }
    >
      車輛清單
    </Title>
  ),
};

export const WithStartContent: Story = {
  render: () => (
    <Title
      variant="section"
      startContent={<StatusIndicator type="success" label="正常" />}
      actions={<Badge variant="primary">v1.9</Badge>}
    >
      系統狀態
    </Title>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <Title variant="page" subtitle="page 變體：用於整個頁面的主標">
        Page Title
      </Title>
      <Title variant="section" subtitle="section 變體：用於分區">
        Section Title
      </Title>
      <Title variant="card" subtitle="card 變體：用於卡片內部">
        Card Title
      </Title>
    </div>
  ),
};

export const TextSamples: StoryObj = {
  name: 'Text - 各種樣式',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <Text variant="body1">Body 1 — 主要內文使用，行高與字距為閱讀優化。</Text>
      <Text variant="body2" color="middle">
        Body 2 — 次要內文，常用於描述或補充說明。
      </Text>
      <Text variant="caption" color="lower">
        Caption — 圖說、時間戳記、輔助資訊
      </Text>
      <Text variant="subtitle1">Subtitle 1 — 強調的次標題</Text>
      <Text variant="subtitle2" color="middle">
        Subtitle 2 — 較小的次標題
      </Text>
      <Text variant="body1" color="highlight">
        Highlight — 重點資訊或連結
      </Text>
      <Text variant="body1" truncate style={{ width: 200 }}>
        truncate prop 範例 — 這段文字會在單行內截斷顯示省略號
      </Text>
      <Text variant="body2" lineClamp={2} style={{ width: 280 }}>
        lineClamp 範例 — 這是一段較長的文字，當行數超過設定的兩行時，會自動截斷並顯示省略號，常用於卡片描述。
      </Text>
    </div>
  ),
};
