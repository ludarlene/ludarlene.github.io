import type { Meta, StoryObj } from '@storybook/react';
import styled from 'styled-components';
import { colors } from '../../tokens/colors';
import { semanticColorsDark } from '../../tokens/semantic-colors';

const Section = styled.div`
  margin-bottom: 32px;
`;

const SectionTitle = styled.h3`
  font-size: 18px;
  font-weight: 500;
  color: ${({ theme }) => theme.semantic.text.high};
  margin-bottom: 16px;
  text-transform: capitalize;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 12px;
`;

const Swatch = styled.div<{ $bg: string }>`
  background: ${({ theme }) => theme.semantic.background.bright};
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.semantic.background.transparent10};
`;

const SwatchColor = styled.div<{ $bg: string }>`
  background: ${({ $bg }) => $bg};
  height: 60px;
`;

const SwatchInfo = styled.div`
  padding: 8px 10px;
  font-family: ${({ theme }) => theme.fontFamily.primary};
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const SwatchName = styled.div`
  font-size: 12px;
  font-weight: 500;
  color: ${({ theme }) => theme.semantic.text.high};
`;

const SwatchValue = styled.div`
  font-size: 11px;
  color: ${({ theme }) => theme.semantic.text.middle};
  font-family: ${({ theme }) => theme.fontFamily.mono};
`;

const meta: Meta = {
  title: 'Foundations/Colors',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'IonexOS Color tokens（從 Figma Variables v1.8 同步）',
      },
    },
  },
};
export default meta;

type Story = StoryObj;

export const Semantic: Story = {
  render: () => (
    <div>
      {Object.entries(semanticColorsDark).map(([groupName, group]) => (
        <Section key={groupName}>
          <SectionTitle>{groupName}</SectionTitle>
          <Grid>
            {Object.entries(group).map(([name, value]) => (
              <Swatch key={name} $bg={value}>
                <SwatchColor $bg={value} />
                <SwatchInfo>
                  <SwatchName>{name}</SwatchName>
                  <SwatchValue>{value}</SwatchValue>
                </SwatchInfo>
              </Swatch>
            ))}
          </Grid>
        </Section>
      ))}
    </div>
  ),
};

export const Primitives: Story = {
  render: () => (
    <div>
      {Object.entries(colors).map(([groupName, group]) => (
        <Section key={groupName}>
          <SectionTitle>{groupName}</SectionTitle>
          <Grid>
            {Object.entries(group).map(([name, value]) => (
              <Swatch key={name} $bg={value}>
                <SwatchColor $bg={value} />
                <SwatchInfo>
                  <SwatchName>{name}</SwatchName>
                  <SwatchValue>{value}</SwatchValue>
                </SwatchInfo>
              </Swatch>
            ))}
          </Grid>
        </Section>
      ))}
    </div>
  ),
};
