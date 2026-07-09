import type { Meta, StoryObj } from '@storybook/react';
import styled from 'styled-components';
import { shadows } from '../../tokens/shadows';
import type { ShadowToken } from '../../tokens/shadows';

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 32px;
  padding: 24px;
`;

const ShadowCard = styled.div<{ $shadow: string }>`
  background: ${({ theme }) => theme.semantic.background.bright};
  border-radius: 12px;
  height: 120px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
  box-shadow: ${({ $shadow }) => $shadow};
`;

const Label = styled.div`
  font-family: ${({ theme }) => theme.fontFamily.mono};
  font-size: 13px;
  color: ${({ theme }) => theme.semantic.text.high};
`;

const meta: Meta = {
  title: 'Foundations/Shadows',
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj;

export const All: Story = {
  render: () => (
    <Grid>
      {(Object.keys(shadows) as ShadowToken[]).map((key) => (
        <ShadowCard key={key} $shadow={shadows[key]}>
          <Label>shadow-{key}</Label>
        </ShadowCard>
      ))}
    </Grid>
  ),
};
