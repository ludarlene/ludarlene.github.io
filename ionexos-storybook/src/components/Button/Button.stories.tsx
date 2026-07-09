import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
IonexOS Button 元件，對應 Figma Button 元件庫。

**Sizes**：large (48px) / basic (40px) / small (24px)
**Variants**：primary / outline / outlineDanger / miner
**States**：enable / hover / active / disabled（透過 CSS pseudo-class 處理）
        `,
      },
    },
  },
  argTypes: {
    size: {
      control: 'radio',
      options: ['large', 'basic', 'small'],
      description: '按鈕尺寸',
    },
    variant: {
      control: 'radio',
      options: ['primary', 'outline', 'outlineDanger', 'miner'],
      description: '按鈕樣式類型',
    },
    fullWidth: {
      control: 'boolean',
      description: '是否填滿父容器寬度',
    },
    disabled: {
      control: 'boolean',
    },
    children: {
      control: 'text',
    },
  },
  args: {
    children: 'Button',
    size: 'basic',
    variant: 'primary',
    disabled: false,
    fullWidth: false,
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Playground: Story = {};

export const Primary: Story = {
  args: { variant: 'primary', children: 'Primary' },
};

export const Outline: Story = {
  args: { variant: 'outline', children: 'Outline' },
};

export const OutlineDanger: Story = {
  args: { variant: 'outlineDanger', children: 'Danger' },
};

export const Miner: Story = {
  args: { variant: 'miner', children: 'Miner' },
};

export const Disabled: Story = {
  args: { disabled: true, children: 'Disabled' },
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
      <Button size="large">Large</Button>
      <Button size="basic">Basic</Button>
      <Button size="small">Small</Button>
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {(['large', 'basic', 'small'] as const).map((size) => (
        <div key={size} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Button size={size} variant="primary">Primary</Button>
          <Button size={size} variant="outline">Outline</Button>
          <Button size={size} variant="outlineDanger">Danger</Button>
          <Button size={size} variant="miner">Miner</Button>
          <Button size={size} variant="primary" disabled>Disabled</Button>
        </div>
      ))}
    </div>
  ),
};
