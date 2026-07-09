import type { Meta, StoryObj } from '@storybook/react';
import styled from 'styled-components';
import { typography } from '../../tokens/typography';
import type { TypographyVariant } from '../../tokens/typography';

const Row = styled.div`
  display: grid;
  grid-template-columns: 140px 80px 1fr;
  gap: 24px;
  padding: 16px 0;
  align-items: baseline;
  border-bottom: 1px solid ${({ theme }) => theme.semantic.background.transparent10};
`;

const Label = styled.div`
  font-family: ${({ theme }) => theme.fontFamily.mono};
  font-size: 12px;
  color: ${({ theme }) => theme.semantic.text.middle};
`;

const Size = styled.div`
  font-family: ${({ theme }) => theme.fontFamily.mono};
  font-size: 12px;
  color: ${({ theme }) => theme.semantic.text.middle};
`;

const Sample = styled.div<{ $variant: TypographyVariant }>`
  color: ${({ theme }) => theme.semantic.text.high};
  ${({ $variant }) => {
    const t = typography[$variant];
    return `
      font-family: ${t.fontFamily};
      font-size: ${t.fontSize};
      font-weight: ${t.fontWeight};
      line-height: ${t.lineHeight};
      letter-spacing: ${t.letterSpacing};
    `;
  }}
`;

const meta: Meta = {
  title: 'Foundations/Typography',
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj;

export const Scale: Story = {
  render: () => (
    <div>
      {(Object.keys(typography) as TypographyVariant[]).map((variant) => (
        <Row key={variant}>
          <Label>{variant}</Label>
          <Size>{typography[variant].fontSize}</Size>
          <Sample $variant={variant}>The quick brown fox 敏捷的棕狐</Sample>
        </Row>
      ))}
    </div>
  ),
};
