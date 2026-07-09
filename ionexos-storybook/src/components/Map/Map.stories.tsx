import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { MapContainer } from './MapContainer';
import { MapPin } from './MapPin';
import { MapPinTip } from './MapPinTip';
import { Input } from '../Input';
import { SearchIcon, BuildingIcon, LightningIcon } from '../_shared/icons';

const meta: Meta = {
  title: 'Components/Map/Map',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
對應 Figma：Map 系列。本元件組僅提供「視覺外殼」，不整合任何實際地圖 API（如 Google Maps、Leaflet）。
這樣設計的原因是 ionexOS 不同產品可能用不同地圖供應商，元件層保留彈性。

接入實際地圖時，把地圖 SDK 的容器放在 \`<MapContainer>\` 的 children 即可。Pin 和 Tip 可絕對定位
疊在地圖圖層上。
        `,
      },
    },
  },
};
export default meta;
type Story = StoryObj;

export const Pins: Story = {
  name: 'MapPin - 4 種類型',
  render: () => (
    <div style={{ display: 'flex', gap: 24, alignItems: 'flex-end' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
        <MapPin type="num" number={3} />
        <span style={{ fontSize: 12, color: '#8a8fa7' }}>Num</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
        <MapPin type="sp" />
        <span style={{ fontSize: 12, color: '#8a8fa7' }}>SP（電池站）</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
        <MapPin type="mega" />
        <span style={{ fontSize: 12, color: '#8a8fa7' }}>Mega（大型站）</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
        <MapPin type="scooter" />
        <span style={{ fontSize: 12, color: '#8a8fa7' }}>Scooter</span>
      </div>
    </div>
  ),
};

export const PinTones: Story = {
  name: 'MapPin - 顏色語意',
  render: () => (
    <div style={{ display: 'flex', gap: 24, alignItems: 'flex-end' }}>
      <MapPin type="sp" tone="primary" />
      <MapPin type="sp" tone="success" />
      <MapPin type="sp" tone="warning" />
      <MapPin type="sp" tone="error" />
      <MapPin type="sp" tone="info" />
    </div>
  ),
};

export const PinSelected: Story = {
  name: 'MapPin - selected 狀態',
  render: () => (
    <div style={{ display: 'flex', gap: 24, alignItems: 'flex-end' }}>
      <MapPin type="sp" />
      <MapPin type="sp" selected />
      <MapPin type="num" number={5} selected tone="success" />
    </div>
  ),
};

export const PinTips: Story = {
  name: 'MapPinTip - 兩種狀態',
  render: () => (
    <div style={{ display: 'flex', gap: 32, alignItems: 'flex-end', paddingBottom: 40 }}>
      <MapPinTip
        icon={<LightningIcon size={16} />}
        title="信義店"
        subtitle="台北市信義區"
      />
      <MapPinTip
        icon={<BuildingIcon size={16} />}
        title="信義店"
        subtitle="台北市信義區忠孝東路 5 段"
        selected
        stats={
          <>
            <span>可用 8/12</span>
            <span>距離 1.2 km</span>
          </>
        }
      />
    </div>
  ),
};

export const Container: Story = {
  name: 'MapContainer - 基本',
  render: function Render() {
    const [zoom, setZoom] = useState(12);
    return (
      <MapContainer
        height={500}
        onZoomIn={() => setZoom((z) => Math.min(z + 1, 20))}
        onZoomOut={() => setZoom((z) => Math.max(z - 1, 1))}
        overlay={
          <Input
            placeholder="搜尋地點、站點"
            startAdornment={<SearchIcon size={16} />}
            style={{ width: 320, background: 'rgba(20, 30, 56, 0.95)' }}
          />
        }
      >
        <div
          style={{
            position: 'absolute',
            top: 16,
            right: 80,
            padding: '6px 12px',
            background: 'rgba(20, 30, 56, 0.9)',
            borderRadius: 8,
            fontSize: 12,
            color: '#8a8fa7',
            fontFamily: 'monospace',
          }}
        >
          Zoom: {zoom}
        </div>
      </MapContainer>
    );
  },
};

export const FullExample: Story = {
  name: '範例：站點地圖 + Pins + Tip',
  render: function Render() {
    const [selectedId, setSelectedId] = useState<string | null>('s1');

    const stations = [
      { id: 's1', name: '信義店', x: 30, y: 40, type: 'sp' as const, tone: 'success' as const },
      { id: 's2', name: '大安店', x: 55, y: 55, type: 'mega' as const, tone: 'primary' as const },
      { id: 's3', name: '中山店', x: 70, y: 30, type: 'sp' as const, tone: 'warning' as const },
      { id: 's4', name: '松山店', x: 25, y: 65, type: 'sp' as const, tone: 'success' as const },
    ];

    return (
      <MapContainer
        height={500}
        overlay={
          <Input
            placeholder="搜尋地點、站點"
            startAdornment={<SearchIcon size={16} />}
            style={{ width: 320, background: 'rgba(20, 30, 56, 0.95)' }}
          />
        }
      >
        {stations.map((s) => (
          <div
            key={s.id}
            style={{
              position: 'absolute',
              left: `${s.x}%`,
              top: `${s.y}%`,
              transform: 'translate(-50%, -100%)',
            }}
          >
            {selectedId === s.id && (
              <div
                style={{
                  position: 'absolute',
                  bottom: 'calc(100% + 8px)',
                  left: '50%',
                  transform: 'translateX(-50%)',
                }}
              >
                <MapPinTip
                  icon={<LightningIcon size={16} />}
                  title={s.name}
                  subtitle="台北市"
                  selected
                  stats={
                    <>
                      <span>可用 8/12</span>
                      <span>1.2 km</span>
                    </>
                  }
                />
              </div>
            )}
            <MapPin
              type={s.type}
              tone={s.tone}
              selected={selectedId === s.id}
              onClick={() =>
                setSelectedId(selectedId === s.id ? null : s.id)
              }
            />
          </div>
        ))}
      </MapContainer>
    );
  },
};
