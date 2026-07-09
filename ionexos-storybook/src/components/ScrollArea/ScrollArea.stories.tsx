import type { Meta, StoryObj } from '@storybook/react';
import { ScrollArea } from './ScrollArea';
import { Text } from '../Title';

const meta: Meta<typeof ScrollArea> = {
  title: 'Components/Layout/ScrollArea',
  component: ScrollArea,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
對應 Figma：Scroll Bar（4px 細軌道）。提供與 ionexOS 視覺一致的自訂 scrollbar，
覆蓋 WebKit 與 Firefox。\`hideOnIdle\` 模式可讓滾動條只在 hover 時顯示。
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ScrollArea>;

const longContent = Array.from({ length: 30 }, (_, i) => (
  <p key={i} style={{ margin: '0 0 12px' }}>
    第 {i + 1} 段：這是一段用於展示 scroll 效果的長文字，每段都有不同的內容。
  </p>
));

export const Vertical: Story = {
  render: () => (
    <ScrollArea
      height={240}
      width={360}
      style={{
        padding: 16,
        border: '1px solid #ffffff14',
        borderRadius: 8,
        background: '#141e38',
      }}
    >
      {longContent}
    </ScrollArea>
  ),
};

export const Horizontal: Story = {
  render: () => (
    <ScrollArea
      width={360}
      height={120}
      style={{
        padding: 16,
        border: '1px solid #ffffff14',
        borderRadius: 8,
        background: '#141e38',
      }}
    >
      <div style={{ display: 'flex', gap: 12, width: 'max-content' }}>
        {Array.from({ length: 12 }, (_, i) => (
          <div
            key={i}
            style={{
              width: 120,
              height: 80,
              background: '#243d8b',
              borderRadius: 8,
              flexShrink: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#eaedf0',
            }}
          >
            卡片 {i + 1}
          </div>
        ))}
      </div>
    </ScrollArea>
  ),
};

export const HideOnIdle: Story = {
  render: () => (
    <ScrollArea
      hideOnIdle
      height={240}
      width={360}
      style={{
        padding: 16,
        border: '1px solid #ffffff14',
        borderRadius: 8,
        background: '#141e38',
      }}
    >
      <Text variant="body2" color="middle" style={{ marginBottom: 12 }}>
        滾動條只在 hover 時顯示
      </Text>
      {longContent}
    </ScrollArea>
  ),
};
