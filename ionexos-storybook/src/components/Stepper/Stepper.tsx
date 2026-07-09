import styled, { css } from 'styled-components';
import type { HTMLAttributes, ReactNode } from 'react';
import { CheckIcon } from '../_shared/icons';

export type StepStatus = 'pending' | 'active' | 'completed' | 'error';
export type StepperOrientation = 'horizontal' | 'vertical';

export interface StepItem {
  /** 唯一識別 */
  id?: string;
  /** 主要標題 */
  label: ReactNode;
  /** 副說明 */
  description?: ReactNode;
  /** 自訂狀態（會覆寫由 currentStep 計算的狀態） */
  status?: StepStatus;
  /** 是否停用 */
  disabled?: boolean;
}

export interface StepperProps extends HTMLAttributes<HTMLDivElement> {
  /** 步驟清單 */
  steps: StepItem[];
  /** 目前所在步驟（0-based 索引）。會影響 active / completed 狀態計算 */
  currentStep: number;
  /** 方向 */
  orientation?: StepperOrientation;
  /** 是否可點擊已完成的步驟（互動式） */
  interactive?: boolean;
  /** 步驟點擊回呼 */
  onStepClick?: (index: number, step: StepItem) => void;
}

const Root = styled.div<{ $orientation: StepperOrientation }>`
  display: flex;
  flex-direction: ${({ $orientation }) =>
    $orientation === 'vertical' ? 'column' : 'row'};
  ${({ $orientation }) =>
    $orientation === 'horizontal'
      ? css`
          align-items: flex-start;
        `
      : css`
          align-items: stretch;
        `}
  font-family: ${({ theme }) => theme.fontFamily.primary};
  gap: 0;
`;

const StepRow = styled.div<{
  $orientation: StepperOrientation;
  $clickable: boolean;
  $disabled?: boolean;
}>`
  display: flex;
  ${({ $orientation }) =>
    $orientation === 'horizontal'
      ? css`
          flex: 1;
          flex-direction: column;
          align-items: center;
          min-width: 0;
        `
      : css`
          flex-direction: row;
          align-items: flex-start;
          gap: 12px;
        `}
  cursor: ${({ $clickable, $disabled }) =>
    $disabled ? 'not-allowed' : $clickable ? 'pointer' : 'default'};
  opacity: ${({ $disabled }) => ($disabled ? 0.5 : 1)};
`;

const BulletWrap = styled.div<{ $orientation: StepperOrientation }>`
  display: flex;
  ${({ $orientation }) =>
    $orientation === 'horizontal'
      ? css`
          flex-direction: row;
          align-items: center;
          width: 100%;
          justify-content: center;
          position: relative;
        `
      : css`
          flex-direction: column;
          align-items: center;
          flex-shrink: 0;
        `}
`;

const Bullet = styled.div<{ $status: StepStatus }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  flex-shrink: 0;
  border-radius: 50%;
  font-size: 12px;
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  border: 2px solid;
  transition:
    background-color 200ms ease,
    border-color 200ms ease,
    color 200ms ease;
  ${({ $status, theme }) => {
    switch ($status) {
      case 'completed':
        return css`
          background: ${theme.semantic.primary.main};
          border-color: ${theme.semantic.primary.main};
          color: ${theme.semantic.text.white};
        `;
      case 'active':
        return css`
          background: ${theme.semantic.background.bright};
          border-color: ${theme.semantic.primary.main};
          color: ${theme.semantic.primary.main};
          box-shadow: 0 0 0 4px ${theme.semantic.primary.surface};
        `;
      case 'error':
        return css`
          background: ${theme.semantic.error.main};
          border-color: ${theme.semantic.error.main};
          color: ${theme.semantic.text.white};
        `;
      case 'pending':
      default:
        return css`
          background: transparent;
          border-color: ${theme.semantic.background.transparent20};
          color: ${theme.semantic.text.middle};
        `;
    }
  }}
`;

const Connector = styled.div<{
  $orientation: StepperOrientation;
  $active: boolean;
}>`
  ${({ $orientation, $active, theme }) =>
    $orientation === 'horizontal'
      ? css`
          flex: 1;
          height: 2px;
          background: ${$active
            ? theme.semantic.primary.main
            : theme.semantic.background.transparent20};
          margin: 0 8px;
          transition: background-color 300ms ease;
        `
      : css`
          width: 2px;
          min-height: 32px;
          background: ${$active
            ? theme.semantic.primary.main
            : theme.semantic.background.transparent20};
          margin: 4px 0;
          flex: 1;
          transition: background-color 300ms ease;
        `}
`;

const Content = styled.div<{ $orientation: StepperOrientation }>`
  ${({ $orientation }) =>
    $orientation === 'horizontal'
      ? css`
          margin-top: 8px;
          text-align: center;
          max-width: 160px;
        `
      : css`
          flex: 1;
          padding-bottom: 24px;
        `}
`;

const Label = styled.div<{ $status: StepStatus }>`
  font-size: 13px;
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  color: ${({ theme, $status }) =>
    $status === 'active' || $status === 'completed'
      ? theme.semantic.text.high
      : theme.semantic.text.middle};
  line-height: 1.4;
`;

const Description = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.semantic.text.middle};
  margin-top: 2px;
  letter-spacing: 0.4px;
`;

const ErrorText = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.semantic.error.main};
  margin-top: 2px;
`;

function computeStatus(
  index: number,
  currentStep: number,
  explicit?: StepStatus,
): StepStatus {
  if (explicit) return explicit;
  if (index < currentStep) return 'completed';
  if (index === currentStep) return 'active';
  return 'pending';
}

export const Stepper = ({
  steps,
  currentStep,
  orientation = 'horizontal',
  interactive,
  onStepClick,
  ...rest
}: StepperProps) => {
  return (
    <Root $orientation={orientation} {...rest}>
      {steps.map((step, index) => {
        const status = computeStatus(index, currentStep, step.status);
        const isLast = index === steps.length - 1;
        const connectorActive = index < currentStep;

        return (
          <StepRow
            key={step.id ?? index}
            $orientation={orientation}
            $clickable={!!interactive && !step.disabled}
            $disabled={step.disabled}
            onClick={() => {
              if (interactive && !step.disabled) onStepClick?.(index, step);
            }}
          >
            <BulletWrap $orientation={orientation}>
              <Bullet $status={status}>
                {status === 'completed' ? (
                  <CheckIcon size={14} />
                ) : status === 'error' ? (
                  '!'
                ) : (
                  index + 1
                )}
              </Bullet>
              {!isLast && orientation === 'horizontal' && (
                <Connector $orientation={orientation} $active={connectorActive} />
              )}
              {!isLast && orientation === 'vertical' && (
                <Connector $orientation={orientation} $active={connectorActive} />
              )}
            </BulletWrap>
            <Content $orientation={orientation}>
              <Label $status={status}>{step.label}</Label>
              {step.description && status !== 'error' && (
                <Description>{step.description}</Description>
              )}
              {status === 'error' && step.description && (
                <ErrorText>{step.description}</ErrorText>
              )}
            </Content>
          </StepRow>
        );
      })}
    </Root>
  );
};

Stepper.displayName = 'Stepper';
