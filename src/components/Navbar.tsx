import React, { useState } from "react";
import {
  Sun,
  Moon,
  Menu,
  X,
  User,
  ChevronRight,
  Phone,
  Radio,
  ShieldCheck,
} from "lucide-react";

interface NavbarProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
  onOpenAuth: () => void;
  onOpenDemoMission: () => void;
  onScrollToSection: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  darkMode,
  toggleDarkMode,
  onOpenAuth,
  onOpenDemoMission,
  onScrollToSection,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("home");

  const navItems = [
    { id: "home", label: "Trang chủ", target: "hero-section" },
    { id: "about", label: "Về VWING", target: "intro-section" },
    { id: "features", label: "Tính năng", target: "features-section" },
    { id: "crops", label: "Giải pháp cây lâu năm", target: "crops-section" },
    { id: "news", label: "Báo chí & Nghiên cứu", target: "news-section" },
    { id: "contact", label: "Liên hệ", target: "booking-section" },
  ];

  const handleNavClick = (id: string, target: string) => {
    setActiveTab(id);
    onScrollToSection(target);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-[100] w-full pointer-events-auto backdrop-blur-md bg-[#f8f9ff]/90 dark:bg-[#07131e]/90 border-b border-slate-200/70 dark:border-slate-800/80 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 lg:h-20 flex items-center justify-between gap-3 sm:gap-6">
          {/* Brand Logo Zone */}
          <div
            onClick={() => handleNavClick("home", "hero-section")}
            className="flex items-center gap-2.5 sm:gap-3 cursor-pointer group shrink-0 select-none min-h-[44px] min-w-[44px]"
          >
            {/* High-tech precision drone logo mark */}

            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-emerald-600/30 bg-emerald-500/10 text-emerald-600 shadow-[0_4px_14px_rgba(16,185,129,0.10)]">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="h-7 w-7"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 21V10" />
                <path d="M12 15C5 15 4 10 4 7c5 0 8 2 8 8Z" />
                <path d="M12 12c0-5 3-8 8-8 0 5-2 8-8 8Z" />
              </svg>
            </div>

            <div className="flex flex-col">
              <span className="font-extrabold text-base sm:text-lg tracking-tight text-slate-900 dark:text-white leading-none flex items-center gap-1">
                VWING
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              </span>
              <span className="text-[9px] sm:text-[10px] font-semibold tracking-wider text-emerald-700 dark:text-emerald-400 uppercase mt-0.5">
                CÔNG NGHỆ NÔNG NGHIỆP HÀNG KHÔNG
              </span>
            </div>
          </div>

          {/* Navigation Links (Desktop) */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id, item.target)}
                  className={`px-3.5 py-2 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap cursor-pointer ${
                    isActive
                      ? "bg-slate-200/70 dark:bg-slate-800 text-slate-900 dark:text-white font-semibold"
                      : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/50"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Action Controls & Dark Mode */}
          <div className="flex items-center gap-2 sm:gap-3.5 shrink-0">
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              aria-label="Chuyển chế độ sáng tối"
              className="w-11 h-11 flex items-center justify-center rounded-full text-slate-600 dark:text-slate-300 hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-colors cursor-pointer border border-slate-200/60 dark:border-slate-700/60 active:scale-95"
              title={
                darkMode ? "Chuyển sang chế độ sáng" : "Chuyển sang chế độ tối"
              }
            >
              {darkMode ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-slate-700" />
              )}
            </button>

            {/* Đăng nhập button (Desktop) */}
            <button
              onClick={onOpenAuth}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors cursor-pointer min-h-[44px]"
            >
              <User className="w-4 h-4 opacity-70" />
              <span>Đăng nhập</span>
            </button>

            {/* Primary Action Button (Desktop & Tablet) */}
            <button
              onClick={onOpenDemoMission}
              className="hidden xs:inline-flex items-center gap-1.5 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full bg-[#10b981] hover:bg-[#059669] text-white font-semibold text-xs sm:text-sm tracking-wide shadow-md shadow-emerald-500/25 transition-all duration-200 cursor-pointer active:scale-95 min-h-[40px] sm:min-h-[44px]"
            >
              <span>Trải nghiệm ngay</span>
              <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>

            {/* Mobile Menu Button (Touch hitbox >= 44px) */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden w-11 h-11 flex items-center justify-center rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-200/60 dark:hover:bg-slate-800 active:scale-95 transition-all"
              aria-label="Mở menu danh mục"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Backdrop & Container */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="absolute top-0 inset-x-0 bg-white dark:bg-[#07131e] border-b border-slate-200 dark:border-slate-800 shadow-2xl p-4 sm:p-6 space-y-4 max-h-[88vh] overflow-y-auto">
            {/* Drawer Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center text-white">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-extrabold text-sm text-slate-900 dark:text-white block">
                    VWING Precision
                  </span>
                  <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold block uppercase">
                    Menu điều hướng
                  </span>
                </div>
              </div>

              <button
                onClick={() => setMobileMenuOpen(false)}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                aria-label="Đóng menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Navigation links */}
            <div className="space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id, item.target)}
                  className="w-full text-left px-4 py-3.5 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-emerald-50 dark:hover:bg-slate-800/80 hover:text-emerald-600 dark:hover:text-emerald-400 flex items-center justify-between min-h-[48px] active:bg-emerald-100 dark:active:bg-slate-800"
                >
                  <span>{item.label}</span>
                  <ChevronRight className="w-4 h-4 opacity-40" />
                </button>
              ))}
            </div>

            {/* Quick Mobile Action shortcuts */}
            <div className="pt-3 border-t border-slate-200 dark:border-slate-800 space-y-2.5">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenDemoMission();
                }}
                className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md shadow-emerald-600/20 min-h-[48px] active:scale-[0.98]"
              >
                <Radio className="w-4 h-4 animate-pulse" />
                <span>Trạm Viễn Thám Đắk Lắk #48</span>
              </button>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAuth();
                  }}
                  className="py-2.5 px-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-semibold flex items-center justify-center gap-1.5 min-h-[44px]"
                >
                  <User className="w-3.5 h-3.5" />
                  <span>Đăng nhập</span>
                </button>

                <a
                  href="tel:18006868"
                  className="py-2.5 px-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 text-xs font-semibold flex items-center justify-center gap-1.5 min-h-[44px]"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Gọi 1800 6868</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
