import type { Meta, StoryObj } from '@storybook/react';
import { Switch } from './Switch';

const meta: Meta<typeof Switch> = {
  title: 'Components/Forms/Switch',
  component: Switch,
  tags: ['autodocs'],
  argTypes: {
    labelPlacement: {
      control: 'radio',
      options: ['start', 'end'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Switch>;

export const Default: Story = {};

export const Checked: Story = { args: { defaultChecked: true } };

export const WithLabel: Story = {
  args: { label: '推播通知', defaultChecked: true },
};

export const LabelStart: Story = {
  args: { label: '推播通知', labelPlacement: 'start' },
};

export const Disabled: Story = {
  args: { label: '已停用', disabled: true },
};

export const CheckedDisabled: Story = {
  args: { label: '已停用且已開', disabled: true, defaultChecked: true },
};

export const AllStates: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, auto)', gap: 16 }}>
      <Switch />
      <Switch defaultChecked />
      <Switch disabled />
      <Switch defaultChecked disabled />
      <Switch label="Off" />
      <Switch label="On" defaultChecked />
    </div>
  ),
};
