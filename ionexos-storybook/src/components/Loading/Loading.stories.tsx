import type { Meta, StoryObj } from '@storybook/react';
import { useEffect, useState } from 'react';
import { Spinner } from './Spinner';
import { ProgressBar } from './ProgressBar';

const meta: Meta = {
  title: 'Components/Feedback/Loading',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
對應 Figma：Loading。本批次提供基礎元件，
品牌字母動畫（ionex jump/wiggle）留待後續批次處理。
        `,
      },
    },
  },
};
export default meta;
type Story = StoryObj;

export const Spinners: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
      <Spinner size="small" />
      <Spinner size="medium" />
      <Spinner size="large" />
      <Spinner pixelSize={64} />
    </div>
  ),
};

export const SpinnerInherit: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        gap: 24,
        alignItems: 'center',
        color: '#fd5463',
      }}
    >
      <Spinner variant="inherit" size="small" />
      <Spinner variant="inherit" size="medium" />
      <Spinner variant="inherit" size="large" />
      <span style={{ color: '#eaedf0' }}>← 跟著父層 color 走</span>
    </div>
  ),
};

export const ProgressBarDeterminate: Story = {
  render: function Render() {
    const [val, setVal] = useState(0);
    useEffect(() => {
      const id = setInterval(() => {
        setVal((v) => (v >= 100 ? 0 : v + 5));
      }, 400);
      return () => clearInterval(id);
    }, []);
    return (
      <div style={{ width: 400, display: 'flex', flexDirection: 'column', gap: 24 }}>
        <ProgressBar variant="determinate" value={val} />
        <ProgressBar variant="determinate" value={val} showLabel />
        <ProgressBar variant="determinate" value={val} thickness={4} />
        <ProgressBar variant="determinate" value={val} thickness={16} showLabel />
      </div>
    );
  },
};

export const ProgressBarIndeterminate: Story = {
  render: () => (
    <div style={{ width: 400, display: 'flex', flexDirection: 'column', gap: 24 }}>
      <ProgressBar variant="indeterminate" />
      <ProgressBar variant="indeterminate" thickness={4} />
      <ProgressBar variant="indeterminate" thickness={16} />
    </div>
  ),
};
