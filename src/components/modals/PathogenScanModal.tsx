import React, { useState } from 'react';
import { X, ShieldAlert, AlertTriangle, CheckCircle, Crosshair, Thermometer, Droplets } from 'lucide-react';

interface PathogenScanModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PathogenScanModal: React.FC<PathogenScanModalProps> = ({ isOpen, onClose }) => {
  const [selectedTree, setSelectedTree] = useState<number>(142);
  const [isPrescriptionApplied, setIsPrescriptionApplied] = useState(false);

  if (!isOpen) return null;

  return (
   <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 sm:pt-24 p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
  <div className="relative w-full max-w-4xl max-h-[82vh] overflow-y-auto rounded-3xl bg-[#091522] text-white border border-rose-900/50 shadow-2xl">
        <div className="sticky top-0 z-20 flex items-center justify-between p-5 sm:p-6 bg-[#091522]/95 backdrop-blur-md border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-rose-500 animate-ping" />
            <div>
              <span className="text-[10px] font-mono tracking-wider text-rose-400 uppercase font-semibold">
                AI PATHOGEN DIAGNOSTIC CENTER
              </span>
              <h3 className="text-lg sm:text-xl font-bold font-mono tracking-tight text-white flex items-center gap-2">
                Tầm Soát &amp; Phác Đồ Nấm Bệnh Phytophthora
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
          {/* Diagnostic overview banner */}
          <div className="p-4 rounded-2xl bg-rose-950/40 border border-rose-900/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <ShieldAlert className="w-6 h-6 text-rose-400 shrink-0 mt-1" />
              <div>
                <h4 className="text-sm sm:text-base font-bold text-rose-200">
                  Cảnh Báo: Phát Hiện 1 Ổ Bệnh Cấp Tính (Cây #142)
                </h4>
                <p className="text-xs text-rose-300/80 mt-0.5">
                  Tầng diệp lục giảm 34% cục bộ tại vị trí chảng 3 và gốc rễ. Khuyến nghị dập dịch trong vòng 24 giờ.
                </p>
              </div>
            </div>

            <span className="px-3 py-1.5 rounded-full bg-rose-600 text-white font-mono text-xs font-bold shrink-0 self-start sm:self-center">
              Độ tin cậy: 98.5%
            </span>
          </div>

          {/* Grid Layout: Tree Map vs Analysis Panel */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Tree Grid Cluster View */}
            <div className="lg:col-span-7 rounded-2xl bg-slate-900/90 border border-slate-800 p-5 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-slate-300 uppercase">
                  BẢN ĐỒ LƯỚI GỐC CÂY (LÔ 4B - SẦU RIÊNG RI6)
                </span>
                <span className="text-[11px] font-mono text-slate-400">Chọn cây để xem chi tiết</span>
              </div>

              {/* Grid of 25 trees representation */}
              <div className="grid grid-cols-5 gap-1.5 sm:gap-2.5 p-2 sm:p-4 rounded-xl bg-slate-950 border border-slate-800">
                {[
                  138, 139, 140, 141, 142,
                  143, 144, 145, 146, 147,
                  148, 149, 150, 151, 152,
                  153, 154, 155, 156, 157,
                  158, 159, 160, 161, 162
                ].map((treeId) => {
                  const isInfected = treeId === 142;
                  const isNeighbor = [141, 143, 147].includes(treeId);
                  const isSelected = selectedTree === treeId;

                  return (
                    <button
                      key={treeId}
                      onClick={() => setSelectedTree(treeId)}
                      className={`relative p-1.5 sm:p-3 rounded-lg sm:rounded-xl border flex flex-col items-center justify-center transition-all cursor-pointer min-h-11 ${
                        isSelected
                          ? 'ring-2 ring-white scale-105 z-10'
                          : ''
                      } ${
                        isInfected
                          ? 'bg-rose-950/80 border-rose-500 text-rose-300 animate-pulse'
                          : isNeighbor
                          ? 'bg-amber-950/40 border-amber-600/70 text-amber-200'
                          : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <span className="text-[11px] sm:text-xs font-mono font-bold">#{treeId}</span>
                      <span className="text-[8px] sm:text-[9px] font-mono mt-0.5 truncate max-w-full">
                        {isInfected ? 'XÌ MỦ' : isNeighbor ? 'CÁCH LY' : 'KHỎE'}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 px-2">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded bg-rose-500"></span> Gốc ổ bệnh
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded bg-amber-500"></span> 3 Gốc liền kề (vùng đệm)
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded bg-slate-700"></span> 21 Gốc an toàn
                </span>
              </div>
            </div>

            {/* Tree Detail Panel */}
            <div className="lg:col-span-5 rounded-2xl bg-slate-900/90 border border-slate-800 p-5 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div>
                  <span className="text-[10px] font-mono text-slate-400 uppercase">CĂN CƯỚC SỐ CÂY</span>
                  <h5 className="text-lg font-bold font-mono text-white">Gốc Cây #{selectedTree}</h5>
                </div>
                <span
                  className={`px-2.5 py-1 rounded text-xs font-mono font-bold ${
                    selectedTree === 142
                      ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                      : [141, 143, 147].includes(selectedTree)
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                      : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                  }`}
                >
                  {selectedTree === 142 ? 'Nhiễm Nấm Phytophthora' : [141, 143, 147].includes(selectedTree) ? 'Vùng Đệm Bảo Vệ' : 'Tán Khỏe Mạnh'}
                </span>
              </div>

              {/* Sensor stats for selected tree */}
              <div className="space-y-2 text-xs font-mono">
                <div className="flex justify-between p-2 rounded-lg bg-slate-950">
                  <span className="text-slate-400 flex items-center gap-1.5">
                    <Thermometer className="w-3.5 h-3.5 text-amber-400" /> Nhiệt độ vỏ cây:
                  </span>
                  <span className="text-white font-bold">{selectedTree === 142 ? '33.8°C (Tăng nhiệt)' : '29.2°C (Bình thường)'}</span>
                </div>

                <div className="flex justify-between p-2 rounded-lg bg-slate-950">
                  <span className="text-slate-400 flex items-center gap-1.5">
                    <Droplets className="w-3.5 h-3.5 text-cyan-400" /> Chỉ số diệp lục NDVI:
                  </span>
                  <span className={selectedTree === 142 ? 'text-rose-400 font-bold' : 'text-emerald-400 font-bold'}>
                    {selectedTree === 142 ? '0.54 (Suy giảm nhanh)' : '0.88 (Tối ưu)'}
                  </span>
                </div>

                <div className="flex justify-between p-2 rounded-lg bg-slate-950">
                  <span className="text-slate-400 flex items-center gap-1.5">
                    <Crosshair className="w-3.5 h-3.5 text-indigo-400" /> Tọa độ GPS RTK:
                  </span>
                  <span className="text-slate-300">12.6681°N, 108.0512°E</span>
                </div>
              </div>

              {/* Prescription Action */}
              <div className="pt-2 border-t border-slate-800 space-y-3">
                <span className="text-xs font-mono uppercase text-slate-300 block font-semibold">
                  PHÁC ĐỒ PHUN ĐÍCH TỰ ĐỘNG
                </span>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Lập trình đường bay drone phun phủ tập trung: 450ml hoạt chất Metalaxyl-M + Fosetyl-Al lên tán và gốc cây #{selectedTree}.
                </p>

                <button
                  onClick={() => setIsPrescriptionApplied(true)}
                  disabled={isPrescriptionApplied}
                  className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs tracking-wider uppercase transition-colors cursor-pointer flex items-center justify-center gap-2 disabled:bg-slate-700 disabled:text-slate-400"
                >
                  {isPrescriptionApplied ? (
                    <>
                      <CheckCircle className="w-4 h-4 text-emerald-300" />
                      <span>Đã nạp nhiệm vụ bay dập dịch</span>
                    </>
                  ) : (
                    <span>Nạp lộ trình phun vào Drone ngay</span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
