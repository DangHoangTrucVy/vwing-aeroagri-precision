import React from 'react';
import { X, CheckCircle2, Calendar, Phone, MapPin, Sprout } from 'lucide-react';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookingData: {
    fullName: string;
    phone: string;
    cropType: string;
    area: string;
    location: string;
  } | null;
}

export const SuccessModal: React.FC<SuccessModalProps> = ({ isOpen, onClose, bookingData }) => {
  if (!isOpen || !bookingData) return null;

  return (
    <div role="dialog" aria-modal="true" aria-label="Success" className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-3xl bg-white dark:bg-[#5d6b78] text-slate-900 dark:text-white p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-6">
        <button
          aria-label="Đóng" onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center space-y-2 pt-2">
          <div className="w-14 h-14 rounded-2xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-inner">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h3 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Đăng Ký Thành Công!
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Chuyên gia phi công và kỹ sư viễn thám VWING sẽ liên hệ qua Zalo / điện thoại trong vòng 2 giờ làm việc để xếp lịch bay thử nghiệm.
          </p>
        </div>

        {/* Booking Summary Card */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3 font-mono text-xs">
          <div className="flex justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
            <span className="text-slate-500">Chủ vườn:</span>
            <span className="font-bold text-slate-900 dark:text-white">{bookingData.fullName}</span>
          </div>
          <div className="flex justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
            <span className="text-slate-500">Số điện thoại / Zalo:</span>
            <span className="font-bold text-emerald-600 dark:text-emerald-400">{bookingData.phone}</span>
          </div>
          <div className="flex justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
            <span className="text-slate-500">Cây trồng khảo sát:</span>
            <span className="font-bold text-slate-900 dark:text-white">{bookingData.cropType}</span>
          </div>
          <div className="flex justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
            <span className="text-slate-500">Diện tích ước tính:</span>
            <span className="font-bold text-slate-900 dark:text-white">{bookingData.area}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Khu vực vườn:</span>
            <span className="font-bold text-slate-900 dark:text-white">{bookingData.location}</span>
          </div>
        </div>

        <button
          aria-label="Đóng" onClick={onClose}
          className="w-full py-3 rounded-full bg-[#10b981] hover:bg-[#059669] text-white font-bold text-sm tracking-wide transition-colors cursor-pointer"
        >
          Xác Nhận &amp; Đóng
        </button>
      </div>
    </div>
  );
};
