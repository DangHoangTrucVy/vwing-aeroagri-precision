import React from 'react';
import { Home, Radio, Sprout, Send, Sparkles } from 'lucide-react';

interface MobileBottomBarProps {
  onScrollToSection: (sectionId: string) => void;
  onOpenTelemetry: () => void;
  activeSection?: string;
}

export const MobileBottomBar: React.FC<MobileBottomBarProps> = ({
  onScrollToSection,
  onOpenTelemetry,
}) => {
  return (
    <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 dark:bg-[#07131e]/95 backdrop-blur-lg border-t border-slate-200/90 dark:border-slate-800/90 shadow-[0_-8px_20px_rgba(0,0,0,0.08)] pb-safe">
      <div className="grid grid-cols-4 items-center h-16 px-2 max-w-md mx-auto">
        {/* Tab 1: Trang chủ */}
        <button
          onClick={() => onScrollToSection('hero-section')}
          className="flex flex-col items-center justify-center h-full min-h-[44px] text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 active:scale-95 transition-all cursor-pointer group"
        >
          <Home className="w-5 h-5 group-hover:scale-110 transition-transform" />
          <span className="text-[10px] font-semibold tracking-tight mt-1">Trang chủ</span>
        </button>

        {/* Tab 2: Trạm Viễn Thám (Live Drone Telemetry) */}
        <button
          onClick={onOpenTelemetry}
          className="flex flex-col items-center justify-center h-full min-h-[44px] text-emerald-600 dark:text-emerald-400 active:scale-95 transition-all cursor-pointer group relative"
        >
          <div className="relative">
            <Radio className="w-5 h-5 group-hover:scale-110 transition-transform animate-pulse" />
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          </div>
          <span className="text-[10px] font-bold tracking-tight mt-1">Viễn thám</span>
        </button>

        {/* Tab 3: Cây trồng */}
        <button
          onClick={() => onScrollToSection('crops-section')}
          className="flex flex-col items-center justify-center h-full min-h-[44px] text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 active:scale-95 transition-all cursor-pointer group"
        >
          <Sprout className="w-5 h-5 group-hover:scale-110 transition-transform" />
          <span className="text-[10px] font-semibold tracking-tight mt-1">Cây trồng</span>
        </button>

        {/* Tab 4: Đăng ký khảo sát */}
        <button
          onClick={() => onScrollToSection('booking-section')}
          className="flex flex-col items-center justify-center h-full min-h-[44px] text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 active:scale-95 transition-all cursor-pointer group"
        >
          <Send className="w-5 h-5 group-hover:scale-110 transition-transform" />
          <span className="text-[10px] font-semibold tracking-tight mt-1">Đăng ký</span>
        </button>
      </div>
    </div>
  );
};
