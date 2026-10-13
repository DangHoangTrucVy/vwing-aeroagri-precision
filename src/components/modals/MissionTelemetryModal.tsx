import React, { useState } from 'react';
import { X, Radio, Battery, Wind, Gauge, Compass, Layers, Sliders, CheckCircle2 } from 'lucide-react';
import { TelemetryMission } from '../../types';

interface MissionTelemetryModalProps {
  isOpen: boolean;
  onClose: () => void;
  mission: TelemetryMission;
}

export const MissionTelemetryModal: React.FC<MissionTelemetryModalProps> = ({
  isOpen,
  onClose,
  mission,
}) => {
  const [ndviSlider, setNdviSlider] = useState(50); // 0% RGB -> 100% NDVI
  const [pointCloudDensity, setPointCloudDensity] = useState<'standard' | 'high' | 'ultra'>('high');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl max-h-[92vh] overflow-y-auto rounded-3xl bg-[#07131e] text-white border border-slate-700 shadow-2xl">
        {/* Modal Header */}
        <div className="sticky top-0 z-20 flex items-center justify-between p-5 sm:p-6 bg-[#07131e]/95 backdrop-blur-md border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
            <div>
              <span className="text-[10px] font-mono tracking-wider text-emerald-400 uppercase font-semibold">
                TRẠM ĐIỀU KHIỂN VIỄN THÁM TRỰC THĂNG
              </span>
              <h3 className="text-lg sm:text-xl font-bold font-mono tracking-tight text-white flex items-center gap-2">
                {mission.code} <span className="text-xs font-normal text-slate-400">({mission.location})</span>
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-8 space-y-4 sm:space-y-6">
          {/* Real-time Cockpit Telemetry HUD Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-3 font-mono">
            <div className="p-3 rounded-2xl bg-slate-900/90 border border-slate-800">
              <span className="text-[10px] uppercase text-slate-400 flex items-center gap-1">
                <Battery className="w-3.5 h-3.5 text-emerald-400" /> PIN DRONE
              </span>
              <span className="text-lg font-bold text-white mt-1 block">{mission.batteryPercent}%</span>
              <span className="text-[10px] text-emerald-400">Thời lượng 34 min</span>
            </div>

            <div className="p-3 rounded-2xl bg-slate-900/90 border border-slate-800">
              <span className="text-[10px] uppercase text-slate-400 flex items-center gap-1">
                <Gauge className="w-3.5 h-3.5 text-cyan-400" /> ĐỘ CAO BAY
              </span>
              <span className="text-lg font-bold text-cyan-400 mt-1 block">{mission.altitudeMeters} m</span>
              <span className="text-[10px] text-slate-400">Khóa bám tán 1.5m</span>
            </div>

            <div className="p-3 rounded-2xl bg-slate-900/90 border border-slate-800">
              <span className="text-[10px] uppercase text-slate-400 flex items-center gap-1">
                <Compass className="w-3.5 h-3.5 text-indigo-400" /> TỐC ĐỘ BAY
              </span>
              <span className="text-lg font-bold text-white mt-1 block">{mission.speedMs} m/s</span>
              <span className="text-[10px] text-slate-400">29.5 km/h</span>
            </div>

            <div className="p-3 rounded-2xl bg-slate-900/90 border border-slate-800">
              <span className="text-[10px] uppercase text-slate-400 flex items-center gap-1">
                <Wind className="w-3.5 h-3.5 text-amber-400" /> GIÓ THỰC ĐỊA
              </span>
              <span className="text-lg font-bold text-amber-400 mt-1 block">{mission.windSpeedMs} m/s</span>
              <span className="text-[10px] text-slate-400">Gió nhẹ ổn định</span>
            </div>

            <div className="p-3 rounded-2xl bg-slate-900/90 border border-slate-800">
              <span className="text-[10px] uppercase text-slate-400 flex items-center gap-1">
                <Radio className="w-3.5 h-3.5 text-emerald-400" /> TÍN HIỆU RTK
              </span>
              <span className="text-lg font-bold text-emerald-400 mt-1 block">±0.8 cm</span>
              <span className="text-[10px] text-slate-400">32 Vệ tinh định vị</span>
            </div>

            <div className="p-3 rounded-2xl bg-slate-900/90 border border-slate-800">
              <span className="text-[10px] uppercase text-slate-400 flex items-center gap-1">
                <Layers className="w-3.5 h-3.5 text-rose-400" /> NDVI TRUNG BÌNH
              </span>
              <span className="text-lg font-bold text-emerald-400 mt-1 block">{mission.ndviAverage}</span>
              <span className="text-[10px] text-emerald-400">98.4% Tán khỏe</span>
            </div>
          </div>

          {/* Interactive NDVI Cross-Fade Viewer */}
          <div className="rounded-2xl sm:rounded-3xl bg-slate-900 border border-slate-800 p-5 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h4 className="text-base font-bold text-white flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-emerald-400" />
                  So Sánh Quang Phổ: Ảnh Thực Tế (RGB) vs Bản Đồ Nhiệt NDVI
                </h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  Kéo thanh trượt để chuyển dần từ ảnh màu thực sang dải sóng đa phổ cận hồng ngoại (NIR)
                </p>
              </div>

              {/* Slider Control */}
              <div className="flex items-center gap-3 font-mono text-xs">
                <span className={ndviSlider === 0 ? 'text-white font-bold' : 'text-slate-400'}>RGB (0%)</span>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={ndviSlider}
                  onChange={(e) => setNdviSlider(Number(e.target.value))}
                  className="w-36 sm:w-48 accent-emerald-500 cursor-pointer"
                />
                <span className={ndviSlider === 100 ? 'text-emerald-400 font-bold' : 'text-slate-400'}>
                  NDVI ({ndviSlider}%)
                </span>
              </div>
            </div>

            {/* Split Screen Image Container */}
            <div className="relative rounded-2xl overflow-hidden aspect-[16/9] sm:aspect-[21/9] bg-slate-950 border border-slate-800">
              {/* Base RGB Image */}
              <img
                src="/src/assets/images/orchard_canopy_lidar_1791883989473.jpg"
                alt="Orthomosaic RGB True Color"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />

              {/* NDVI False-Color Overlay Layer with dynamic opacity */}
              <div
                style={{ opacity: ndviSlider / 100 }}
                className="absolute inset-0 bg-gradient-to-r from-emerald-600/60 via-green-500/70 to-amber-500/60 mix-blend-color backdrop-saturate-200 transition-opacity duration-150 pointer-events-none"
              />

              {/* Heatmap color gradient guide bar */}
              <div className="absolute bottom-4 left-4 p-2.5 rounded-xl bg-slate-900/90 backdrop-blur-md border border-slate-700/80 font-mono text-[11px] text-slate-200 space-y-1.5">
                <span className="block font-semibold text-[10px] text-slate-400 uppercase">THANG CHỈ SỐ QUANG PHỔ</span>
                <div className="w-48 h-3 rounded-full bg-gradient-to-r from-rose-500 via-amber-400 via-lime-400 to-emerald-500 border border-slate-600" />
                <div className="flex justify-between text-[9px] text-slate-400 font-bold">
                  <span>0.0 (Stress/Nấm)</span>
                  <span>0.5 (TB)</span>
                  <span className="text-emerald-400">1.0 (Rất khỏe)</span>
                </div>
              </div>

              {/* Overlaid Point Cloud GPS coordinate indicators */}
              <div className="absolute top-4 right-4 p-2.5 rounded-xl bg-slate-900/85 backdrop-blur-md border border-slate-700/80 font-mono text-[11px] text-slate-300">
                <span className="text-emerald-400 font-bold">TỌA ĐỘ VÙNG BAY:</span> 12.6667° N, 108.0500° E
              </div>
            </div>
          </div>

          {/* Point Cloud & LiDAR Control Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <h5 className="text-xs font-mono font-bold uppercase text-slate-300">
                MẬT ĐỘ ĐIỂM QUÉT TÁN (LIDAR POINT CLOUD)
              </h5>
              <div className="flex gap-2">
                {(['standard', 'high', 'ultra'] as const).map((density) => (
                  <button
                    key={density}
                    onClick={() => setPointCloudDensity(density)}
                    className={`flex-1 py-2 px-3 rounded-xl text-xs font-mono font-semibold transition-all ${
                      pointCloudDensity === density
                        ? 'bg-emerald-500 text-white shadow-md'
                        : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                    }`}
                  >
                    {density === 'standard' ? '0.8M pts' : density === 'high' ? '1.4M pts' : '2.2M pts'}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
              <div>
                <h5 className="text-xs font-mono font-bold uppercase text-slate-300">XUẤT DỮ LIỆU ĐÁM MÂY ĐIỂM</h5>
                <p className="text-xs text-slate-400 mt-0.5">Tương thích định dạng LAS, GeoTIFF, KMZ</p>
              </div>
              <button
                onClick={() => alert('Đã chuẩn bị tệp GeoTIFF (384 MB). Bắt đầu tải dữ liệu trực tiếp từ trạm vệ tinh.')}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-emerald-600 text-white font-mono text-xs font-semibold transition-colors cursor-pointer"
              >
                Tải GeoTIFF ↗
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
