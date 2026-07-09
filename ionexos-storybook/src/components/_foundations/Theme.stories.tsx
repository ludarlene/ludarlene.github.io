import type { Meta, StoryObj } from '@storybook/react';
import { ThemeProvider } from 'styled-components';
import styled from 'styled-components';
import { darkTheme, lightTheme } from '../../tokens/theme';
import { GlobalStyle } from '../../styles/GlobalStyle';
import { Button } from '../Button';
import { Card, CardBody, CardHeader } from '../Card';
import { Badge } from '../Badge';
import { Input } from '../Input';
import { StatusIndicator } from '../StatusIndicator';
import { Text, Title } from '../Title';
import { Icon } from '../Icon';

const meta: Meta = {
  title: 'Foundations/Theme',
  parameters: {
    docs: {
      description: {
        component: `
ionexOS 提供 **darkTheme**（預設）和 **lightTheme** 兩個 theme。

**使用方式**：
- Storybook：點工具列 paintbrush 圖示切換
- 應用程式：
  \`\`\`tsx
  import { ThemeProvider } from 'styled-components';
  import { lightTheme, darkTheme } from 'ionexos-storybook';

  <ThemeProvider theme={darkTheme}>
    <App />
  </ThemeProvider>
  \`\`\`

**設計原則**：
- 兩個 theme 結構完全相同（key 對 key），切換時元件無需任何修改
- 元件只用 \`theme.semantic.*\` 取色，不直接引用 primitive
- 切換 theme 後背景、文字、表格分隔線等所有色彩自動跟著反轉

**注意**：light theme 為依設計慣例推導，視覺細節（特別是品牌色明度、warning/error 對比）
待 Figma Light mode 完整定義後可進一步校準。
        `,
      },
    },
  },
};

export default meta;

const ComparisonGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
`;

const Pane = styled.div`
  padding: 24px;
  border-radius: 12px;
  min-height: 600px;
`;

function ThemedDemo() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <Title variant="page" subtitle="主題對照展示">
        IonexOS Theme
      </Title>

      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <Button>Primary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="miner">Miner</Button>
        <Button variant="outlineDanger">Danger</Button>
      </div>

      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <Badge variant="primary">Primary</Badge>
        <Badge variant="success">Success</Badge>
        <Badge variant="warning">Warning</Badge>
        <Badge variant="error">Error</Badge>
        <Badge variant="info">Info</Badge>
      </div>

      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
        <StatusIndicator type="success" label="運行中" />
        <StatusIndicator type="warning" label="待充電" />
        <StatusIndicator type="error" label="異常" />
        <StatusIndicator type="pending" label="保養中" />
      </div>

      <Input label="使用者名稱" placeholder="輸入帳號" />

      <Card variant="outlined">
        <CardHeader title="月度報告" subtitle="2026 年 5 月" />
        <CardBody>
          <Text variant="body2" color="middle">
            本月總交易量達 1,284 件，較上月成長 12.3%。
          </Text>
        </CardBody>
      </Card>

      <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
        <Icon name="system/search" size="lg" />
        <Icon name="bullet/success" size="lg" color="#11c291" />
        <Icon name="nav/dashboard" size="lg" />
        <Icon name="24pt/battery" size="lg" />
      </div>

      <Text variant="body1">主要文字（high contrast）— 一般閱讀內文使用。</Text>
      <Text variant="body2" color="middle">
        次要文字（middle contrast）— 描述或補充說明使用。
      </Text>
      <Text variant="caption" color="lower">
        提示文字（lower contrast）— 輔助提示資訊。
      </Text>
    </div>
  );
}

type Story = StoryObj;

/**
 * 並排對照：左 dark / 右 light，方便比對結構與色彩切換的效果
 */
export const SideBySide: Story = {
  name: 'Dark / Light 並排對照',
  parameters: { layout: 'fullscreen' },
  render: () => (
    <ComparisonGrid>
      <ThemeProvider theme={darkTheme}>
        <Pane style={{ background: darkTheme.semantic.background.default }}>
          <GlobalStyle />
          <Text variant="caption" color="middle" style={{ marginBottom: 16 }}>
            Dark Theme
          </Text>
          <ThemedDemo />
        </Pane>
      </ThemeProvider>
      <ThemeProvider theme={lightTheme}>
        <Pane style={{ background: lightTheme.semantic.background.default }}>
          <GlobalStyle />
          <Text variant="caption" color="middle" style={{ marginBottom: 16 }}>
            Light Theme
          </Text>
          <ThemedDemo />
        </Pane>
      </ThemeProvider>
    </ComparisonGrid>
  ),
};

/**
 * 依工具列切換目前 theme 展示完整元件
 */
export const Current: Story = {
  name: '當前主題（依工具列切換）',
  render: () => (
    <div style={{ padding: 24 }}>
      <ThemedDemo />
    </div>
  ),
};

/**
 * 色票對照表
 */
const SwatchGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 8px;
`;

const Swatch = styled.div<{ $bg: string; $isLight?: boolean }>`
  background: ${({ $bg }) => $bg};
  color: ${({ $isLight }) => ($isLight ? '#1a1f36' : '#ffffff')};
  padding: 16px 12px;
  border-radius: 8px;
  border: 1px solid rgba(128, 128, 128, 0.2);
  font-size: 11px;
  font-family: monospace;
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-height: 80px;
`;

function renderSwatches(theme: typeof darkTheme, isLight: boolean) {
  const groups = [
    'background',
    'text',
    'primary',
    'success',
    'warning',
    'error',
    'info',
  ] as const;

  return groups.map((group) => (
    <div key={group} style={{ marginBottom: 24 }}>
      <Text variant="caption" color="middle" style={{ marginBottom: 8, textTransform: 'uppercase' }}>
        {group}
      </Text>
      <SwatchGrid>
        {Object.entries(theme.semantic[group]).map(([key, value]) => (
          <Swatch key={key} $bg={value} $isLight={isLight}>
            <strong>{key}</strong>
            <span>{value}</span>
          </Swatch>
        ))}
      </SwatchGrid>
    </div>
  ));
}

export const Tokens: Story = {
  name: '色彩 Tokens 對照',
  parameters: { layout: 'fullscreen' },
  render: () => (
    <ComparisonGrid>
      <ThemeProvider theme={darkTheme}>
        <Pane style={{ background: darkTheme.semantic.background.default }}>
          <GlobalStyle />
          <Title variant="section" style={{ marginBottom: 16 }}>
            Dark Theme
          </Title>
          {renderSwatches(darkTheme, false)}
        </Pane>
      </ThemeProvider>
      <ThemeProvider theme={lightTheme}>
        <Pane style={{ background: lightTheme.semantic.background.default }}>
          <GlobalStyle />
          <Title variant="section" style={{ marginBottom: 16 }}>
            Light Theme
          </Title>
          {renderSwatches(lightTheme as typeof darkTheme, true)}
        </Pane>
      </ThemeProvider>
    </ComparisonGrid>
  ),
};
