import styled, { css } from 'styled-components';
import type { HTMLAttributes, ReactNode } from 'react';

export interface MapPinTipProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /** 站點名稱 */
  title: ReactNode;
  /** 副資訊（地址、距離） */
  subtitle?: ReactNode;
  /** 統計資料區（電池數量、狀態等） */
  stats?: ReactNode;
  /** 選中狀態（會展開更寬、含 stats） */
  selected?: boolean;
  /** 自訂 icon（左上） */
  icon?: ReactNode;
}

const Card = styled.div<{ $selected: boolean }>`
  background: ${({ theme }) => theme.semantic.background.bright};
  border: 1px solid ${({ theme }) => theme.semantic.background.transparent20};
  border-radius: ${({ theme }) => theme.radius.md};
  box-shadow: ${({ theme }) => theme.shadows.hero};
  padding: 12px;
  font-family: ${({ theme }) => theme.fontFamily.primary};
  min-width: 115px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  position: relative;

  ${({ $selected, theme }) =>
    $selected &&
    css`
      min-width: 198px;
      border-color: ${theme.semantic.primary.main};
      box-shadow: 0 0 0 2px ${theme.semantic.primary.surface},
        ${theme.shadows.hero};
    `}

  /* tip 三角形（指向下方 pin） */
  &::after {
    content: '';
    position: absolute;
    bottom: -7px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-left: 7px solid transparent;
    border-right: 7px solid transparent;
    border-top: 7px solid ${({ theme }) => theme.semantic.background.bright};
  }
  &::before {
    content: '';
    position: absolute;
    bottom: -8.5px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-top: 8px solid
      ${({ theme, $selected }) =>
        $selected ? theme.semantic.primary.main : theme.semantic.background.transparent20};
  }
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const IconWrap = styled.span`
  display: inline-flex;
  color: ${({ theme }) => theme.semantic.primary.main};
  flex-shrink: 0;
`;

const Title = styled.div`
  font-size: 13px;
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  color: ${({ theme }) => theme.semantic.text.high};
  line-height: 1.4;
`;

const Subtitle = styled.div`
  font-size: 11px;
  color: ${({ theme }) => theme.semantic.text.middle};
  line-height: 1.4;
  letter-spacing: 0.4px;
`;

const Stats = styled.div`
  display: flex;
  gap: 12px;
  padding-top: 8px;
  margin-top: 4px;
  border-top: 1px solid ${({ theme }) => theme.semantic.background.transparent10};
  font-size: 12px;
  color: ${({ theme }) => theme.semantic.text.middle};
`;

export const MapPinTip = ({
  title,
  subtitle,
  stats,
  selected = false,
  icon,
  ...rest
}: MapPinTipProps) => {
  return (
    <Card $selected={selected} {...rest}>
      <Header>
        {icon && <IconWrap aria-hidden="true">{icon}</IconWrap>}
        <div style={{ minWidth: 0 }}>
          <Title>{title}</Title>
          {subtitle && <Subtitle>{subtitle}</Subtitle>}
        </div>
      </Header>
      {selected && stats && <Stats>{stats}</Stats>}
    </Card>
  );
};

MapPinTip.displayName = 'MapPinTip';
