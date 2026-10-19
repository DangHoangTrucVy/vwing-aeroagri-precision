import React from 'react';
import { X, QrCode, CheckCircle2, ShieldCheck, Download, ExternalLink } from 'lucide-react';

interface DigitalPassportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DigitalPassportModal: React.FC<DigitalPassportModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div role="dialog" aria-modal="true" aria-label="DigitalPassport" className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl max-h-[92vh] overflow-y-auto rounded-3xl bg-[#091522] text-white border border-indigo-800/60 shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 z-20 flex items-center justify-between p-5 sm:p-6 bg-[#091522]/95 backdrop-blur-md border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-indigo-400" />
            <div>
              <span className="text-[10px] font-mono tracking-wider text-indigo-400 uppercase font-semibold">
                DIGITAL FARM PASSPORT &amp; GLOBALGAP
              </span>
              <h3 className="text-lg sm:text-xl font-bold font-mono tracking-tight text-white flex items-center gap-2">
                Hộ Chiếu Số Vùng Trồng Xuất Khẩu
              </h3>
            </div>
          </div>

          <button
            aria-label="Đóng" onClick={onClose}
            className="p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 sm:p-8 space-y-6">
          {/* Certificate Card */}
          <div className="p-6 sm:p-8 rounded-2xl bg-slate-900 border border-slate-700 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-6 border-b border-slate-800">
              <div>
                <span className="text-xs font-mono text-indigo-400 uppercase font-semibold block">
                  MÃ VÙNG TRỒNG QUỐC GIA (MSVT)
                </span>
                <h4 className="text-2xl sm:text-3xl font-extrabold font-mono text-white mt-1">
                  VN-DL48-120HA
                </h4>
                <p className="text-sm text-slate-300 mt-1">
                  Vùng trồng sầu riêng Monthong &amp; Ri6 xuất khẩu - Krông Pắc, Đắk Lắk
                </p>
              </div>

              {/* QR Code and seal */}
              <div className="p-3 rounded-2xl bg-white text-slate-950 flex flex-col items-center justify-center shadow-lg shrink-0">
                <QrCode className="w-20 h-20 text-slate-900" />
                <span className="text-[10px] font-mono font-bold mt-1 tracking-tighter">BLOCKCHAIN VERIFIED</span>
              </div>
            </div>

            {/* Verification Metadata Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
                <span className="text-[10px] uppercase text-slate-400 block">DƯ LƯỢNG THUỐC BVTV (MRLS)</span>
                <span className="text-base font-bold text-emerald-400 block mt-0.5">0.00 ppm</span>
                <span className="text-[10px] text-slate-400">Đạt ngưỡng kiểm dịch khắt khe EU</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
                <span className="text-[10px] uppercase text-slate-400 block">MÃ HẢI QUAN XUẤT KHẨU</span>
                <span className="text-base font-bold text-white block mt-0.5">VALID #69142</span>
                <span className="text-[10px] text-indigo-400">Được phê duyệt bởi GACC (Trung Quốc)</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
                <span className="text-[10px] uppercase text-slate-400 block">TIÊU CHUẨN NÔNG HỌC</span>
                <span className="text-base font-bold text-white block mt-0.5">GlobalGAP IFA v6.0</span>
                <span className="text-[10px] text-emerald-400">Kỳ đánh giá: 2026-2027</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
                <span className="text-[10px] uppercase text-slate-400 block">SỐ LƯỢNG THÂN CÂY GẮN CHIP GPS</span>
                <span className="text-base font-bold text-cyan-400 block mt-0.5">3,400 Gốc</span>
                <span className="text-[10px] text-slate-400">100% Căn cước số định danh</span>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-slate-800 flex flex-wrap gap-3">
              <button
                onClick={() => alert('Đã trích xuất chứng chỉ Hộ Chiếu Số PDF và mã hóa số hóa GlobalGAP!')}
                className="px-5 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs tracking-wider uppercase transition-colors flex items-center gap-2 cursor-pointer shadow-md"
              >
                <Download className="w-4 h-4" />
                <span>Tải Hồ Sơ Chứng Nhận (PDF)</span>
              </button>

              <button
                onClick={() => alert('Đã sao chép liên kết tra cứu truy xuất nguồn gốc Blockchain.')}
                className="px-5 py-2.5 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs tracking-wider uppercase transition-colors flex items-center gap-2 cursor-pointer"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Tra Cứu Sổ Cái Blockchain</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
