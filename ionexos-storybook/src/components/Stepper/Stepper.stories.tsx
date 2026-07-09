import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Stepper } from './Stepper';
import { Button } from '../Button';

const meta: Meta<typeof Stepper> = {
  title: 'Components/Navigation/Stepper',
  component: Stepper,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
多步驟流程指示器。狀態由 \`currentStep\` 索引自動推導（小於為 completed、等於為 active、大於為 pending），
也可在單一 step 上用 \`status\` 強制設定（例如 error）。

**orientation**：horizontal（流程橫向，適合 wizard）/ vertical（縱向，適合表單分段）
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Stepper>;

const fleetSteps = [
  { label: '選擇車輛', description: '挑選要加入車隊的車輛' },
  { label: '指派駕駛', description: '為車輛設定駕駛人員' },
  { label: '設定路線', description: '規劃預設行駛路線' },
  { label: '確認資訊', description: '檢查並送出設定' },
];

export const Horizontal: Story = {
  render: function Render() {
    const [step, setStep] = useState(1);
    return (
      <div style={{ width: 720, display: 'flex', flexDirection: 'column', gap: 24 }}>
        <Stepper steps={fleetSteps} currentStep={step} />
        <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
          <Button
            variant="miner"
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            disabled={step === 0}
          >
            上一步
          </Button>
          <Button
            onClick={() => setStep((s) => Math.min(fleetSteps.length - 1, s + 1))}
            disabled={step === fleetSteps.length - 1}
          >
            下一步
          </Button>
        </div>
      </div>
    );
  },
};

export const Vertical: Story = {
  render: () => (
    <div style={{ width: 360 }}>
      <Stepper steps={fleetSteps} currentStep={2} orientation="vertical" />
    </div>
  ),
};

export const WithErrorStep: Story = {
  render: () => (
    <div style={{ width: 720 }}>
      <Stepper
        steps={[
          { label: '上傳檔案', description: '已完成' },
          { label: '驗證資料', description: 'CSV 第 12 列格式錯誤', status: 'error' },
          { label: '匯入資料' },
          { label: '完成' },
        ]}
        currentStep={1}
      />
    </div>
  ),
};

export const Interactive: Story = {
  render: function Render() {
    const [step, setStep] = useState(2);
    return (
      <div style={{ width: 720 }}>
        <Stepper
          steps={fleetSteps}
          currentStep={step}
          interactive
          onStepClick={(idx) => setStep(idx)}
        />
        <p style={{ marginTop: 16, color: '#8a8fa7', fontSize: 13 }}>
          已完成步驟可點擊跳回（active / pending 不會觸發）
        </p>
      </div>
    );
  },
};

export const WithDisabledStep: Story = {
  render: () => (
    <div style={{ width: 720 }}>
      <Stepper
        steps={[
          { label: '基本資訊' },
          { label: '進階設定', description: '需訂閱付費方案', disabled: true },
          { label: '完成' },
        ]}
        currentStep={0}
      />
    </div>
  ),
};
