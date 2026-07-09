import styled, { css } from 'styled-components';
import type { HTMLAttributes, ReactNode } from 'react';
import { LightningIcon, ScooterIcon, BuildingIcon } from '../_shared/icons';

export type MapPinType = 'num' | 'sp' | 'mega' | 'scooter';
export type MapPinTone = 'primary' | 'success' | 'warning' | 'error' | 'info';

export interface MapPinProps extends HTMLAttributes<HTMLDivElement> {
  /** Pin 類型，對應 Figma：Num（數字）、SP（普通電池站）、Mega（大型站）、Scooter（車輛） */
  type?: MapPinType;
  /** 顯示內容（num 類型用） */
  number?: number | string;
  /** 顏色語意 */
  tone?: MapPinTone;
  /** 選中狀態（會放大 + 加陰影） */
  selected?: boolean;
  /** 自訂 icon */
  icon?: ReactNode;
}

const toneMap: Record<MapPinTone, 'primary' | 'success' | 'warning' | 'error' | 'info'> = {
  primary: 'primary',
  success: 'success',
  warning: 'warning',
  error: 'error',
  info: 'info',
};

const PinWrap = styled.div<{
  $tone: MapPinTone;
  $selected: boolean;
}>`
  position: relative;
  width: 34px;
  height: 38px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: ${({ theme }) => theme.fontFamily.primary};
  transition: transform 200ms ease;
  cursor: pointer;

  ${({ $selected }) =>
    $selected &&
    css`
      transform: scale(1.15);
      z-index: 2;
    `}

  &:hover {
    transform: ${({ $selected }) => ($selected ? 'scale(1.18)' : 'scale(1.08)')};
  }
`;

// SVG 雨滴型 pin 底
const PinDrop = styled.svg<{ $tone: MapPinTone; $selected: boolean }>`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  filter: ${({ $selected }) =>
    $selected ? 'drop-shadow(0 4px 8px rgba(0,0,0,0.4))' : 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'};

  & .pin-body {
    fill: ${({ $tone, theme }) => theme.semantic[toneMap[$tone]].main};
    stroke: ${({ theme }) => theme.semantic.background.bright};
    stroke-width: 1.5;
  }
`;

const Content = styled.span<{ $type: MapPinType }>`
  position: relative;
  z-index: 1;
  color: ${({ theme }) => theme.semantic.text.white};
  font-size: ${({ $type }) => ($type === 'num' ? '13px' : '14px')};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 6px; /* 對齊雨滴中心 */
`;

const defaultIcon: Record<MapPinType, ReactNode> = {
  num: null,
  sp: <LightningIcon size={14} />,
  mega: <BuildingIcon size={14} />,
  scooter: <ScooterIcon size={14} />,
};

export const MapPin = ({
  type = 'num',
  number,
  tone = 'primary',
  selected = false,
  icon,
  ...rest
}: MapPinProps) => {
  return (
    <PinWrap $tone={tone} $selected={selected} {...rest}>
      <PinDrop $tone={tone} $selected={selected} viewBox="0 0 34 38" xmlns="http://www.w3.org/2000/svg">
        <path
          className="pin-body"
          d="M17 1C8.16 1 1 8.16 1 17C1 26 8 32 14.5 36C16 37 18 37 19.5 36C26 32 33 26 33 17C33 8.16 25.84 1 17 1Z"
        />
      </PinDrop>
      <Content $type={type}>
        {type === 'num' ? number ?? '' : icon ?? defaultIcon[type]}
      </Content>
    </PinWrap>
  );
};

MapPin.displayName = 'MapPin';
