import React, { useState } from 'react';
import { X, Compass, Wind, Sliders, Play, RotateCcw } from 'lucide-react';

interface TerrainFollowModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TerrainFollowModal: React.FC<TerrainFollowModalProps> = ({ isOpen, onClose }) => {
  const [slopeAngle, setSlopeAngle] = useState(38.4);
  const [windLevel, setWindLevel] = useState(6);
  const [isSimulating, setIsSimulating] = useState(true);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-3xl bg-[#091522] text-white border border-cyan-800/60 shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 z-20 flex items-center justify-between p-5 sm:p-6 bg-[#091522]/95 backdrop-blur-md border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-cyan-400 animate-ping" />
            <div>
              <span className="text-[10px] font-mono tracking-wider text-cyan-400 uppercase font-semibold">
                TERRAIN-FOLLOW RADAR 3D SIMULATOR
              </span>
              <h3 className="text-lg sm:text-xl font-bold font-mono tracking-tight text-white flex items-center gap-2">
                Mô Phỏng Bay Bám Địa Hình Đồi Dốc Tây Nguyên
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

        {/* Body */}
        <div className="p-5 sm:p-8 space-y-6">
          {/* Controls Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-slate-900 border border-slate-800">
            {/* Slope Slider */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5 text-cyan-400" /> Độ dốc triền đồi:
                </span>
                <span className="text-cyan-400 font-bold">{slopeAngle.toFixed(1)}° (Max 45°)</span>
              </div>
              <input
                type="range"
                min="10"
                max="45"
                step="0.5"
                value={slopeAngle}
                onChange={(e) => setSlopeAngle(Number(e.target.value))}
                className="w-full accent-cyan-400 cursor-pointer"
              />
            </div>

            {/* Wind Level Toggle */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <Wind className="w-3.5 h-3.5 text-amber-400" /> Cấp độ gió kháng:
                </span>
                <span className="text-amber-400 font-bold">Cấp {windLevel} ({(windLevel * 2).toFixed(1)} m/s)</span>
              </div>
              <input
                type="range"
                min="1"
                max="7"
                step="1"
                value={windLevel}
                onChange={(e) => setWindLevel(Number(e.target.value))}
                className="w-full accent-amber-400 cursor-pointer"
              />
            </div>
          </div>

          {/* Interactive Trajectory SVG Canvas */}
          <div className="relative rounded-2xl bg-slate-950 border border-slate-800 p-6 overflow-hidden">
            <div className="flex justify-between items-center mb-2 text-xs font-mono text-slate-400">
              <span>ĐỘ CAO RADAR THỰC TẾ: 1.50m (KHÓA TUYỆT ĐỐI)</span>
              <span className="text-emerald-400 font-bold">GIMBAL PITCH BÙ TRỪ: -{(slopeAngle * 0.9).toFixed(1)}°</span>
            </div>

            <div className="h-64 w-full relative flex items-center justify-center">
              <svg className="w-full h-full" viewBox="0 0 500 240" fill="none">
                {/* Reference grid */}
                {[40, 80, 120, 160, 200].map((y) => (
                  <line key={y} x1="0" y1={y} x2="500" y2={y} stroke="#1e293b" strokeDasharray="3 3" opacity="0.6" />
                ))}

                {/* Hill Slope calculated from slopeAngle */}
                {/* At 45 deg, steeper drop; at 15 deg, flatter */}
                {(() => {
                  const dropY = 60 + (slopeAngle / 45) * 110;
                  return (
                    <>
                      {/* Slope Ground */}
                      <path
                        d={`M 20 220 C 180 210, 300 ${240 - dropY}, 480 ${180 - dropY} L 480 235 L 20 235 Z`}
                        fill="#064e3b"
                        stroke="#059669"
                        strokeWidth="2.5"
                      />

                      {/* Flight Trajectory Path 1.5m offset */}
                      <path
                        d={`M 20 160 C 180 150, 300 ${180 - dropY}, 480 ${120 - dropY}`}
                        stroke="#38bdf8"
                        strokeWidth="2"
                        strokeDasharray="4 4"
                      />

                      {/* Orchard trees on slope */}
                      <circle cx="100" cy="210" r="14" fill="#10b981" opacity="0.9" />
                      <circle cx="200" cy={205 - dropY * 0.4} r="15" fill="#10b981" opacity="0.9" />
                      <circle cx="320" cy={230 - dropY * 0.8} r="16" fill="#10b981" opacity="0.9" />
                      <circle cx="430" cy={190 - dropY} r="14" fill="#10b981" opacity="0.9" />

                      {/* Drone Model with radar beam */}
                      <g transform={`translate(320, ${180 - dropY * 0.8})`}>
                        {/* Radar beam to canopy */}
                        <line x1="0" y1="12" x2="0" y2="40" stroke="#38bdf8" strokeWidth="2.5" strokeDasharray="2 2" />
                        <circle cx="0" cy="40" r="3.5" fill="#38bdf8" />

                        {/* Hexacopter drone body */}
                        <ellipse cx="0" cy="0" rx="22" ry="7" fill="#0284c7" stroke="#ffffff" strokeWidth="1.5" />
                        <line x1="-28" y1="-3" x2="28" y2="-3" stroke="#e2e8f0" strokeWidth="2" />
                        <circle cx="-28" cy="-3" r="4" fill="#38bdf8" />
                        <circle cx="28" cy="-3" r="4" fill="#38bdf8" />
                        {/* Spraying mist cone */}
                        <polygon
                          points="-12,5 12,5 24,32 -24,32"
                          fill="rgba(56, 189, 248, 0.15)"
                          stroke="rgba(56, 189, 248, 0.3)"
                        />
                      </g>
                    </>
                  );
                })()}
              </svg>
            </div>

            {/* Live Readouts */}
            <div className="grid grid-cols-3 gap-3 pt-3 border-t border-slate-800 text-center font-mono">
              <div className="p-2.5 rounded-xl bg-slate-900">
                <span className="text-[10px] text-slate-400 block uppercase">KHOẢNG CÁCH TÁN THỰC TẾ</span>
                <span className="text-base font-bold text-cyan-400">1.50 m</span>
                <span className="text-[10px] text-slate-400">Sai số &lt; 2 cm</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-900">
                <span className="text-[10px] text-slate-400 block uppercase">ÁP SUẤT PHUN BÙ TRỪ</span>
                <span className="text-base font-bold text-emerald-400">0.42 MPa</span>
                <span className="text-[10px] text-slate-400">Hạt sương 130µm</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-900">
                <span className="text-[10px] text-slate-400 block uppercase">GIẢM THIỂU TẠT GIÓ</span>
                <span className="text-base font-bold text-white">95.4%</span>
                <span className="text-[10px] text-emerald-400">Tối ưu vật tư</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
