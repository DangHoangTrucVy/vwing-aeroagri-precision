import React from "react";
import { Phone, ArrowUpRight, ShieldCheck } from "lucide-react";
import logo from "../assets/images/icon.png";

interface FooterProps {
  onNavClick: (sectionId: string) => void;
  onOpenTelemetry: () => void;
  onOpenAuth: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavClick,
  onOpenTelemetry,
  onOpenAuth,
}) => {
  return (
    <footer className="mt-12 sm:mt-16 border-t border-slate-200/80 dark:border-slate-800 bg-white dark:bg-[#07131e] text-slate-600 dark:text-slate-300 transition-colors duration-200 pb-16 lg:pb-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Brand & Hotline */}
          <div className="lg:col-span-5 space-y-4 sm:space-y-6">
            <div className="flex items-center -mt-10">
               <div className="flex h-25 w-20 shrink-0 items-center justify-center  overflow-hidden ">
              <img
                src={
                  logo
                } /* Sửa lại đường dẫn này trỏ đúng đến file ảnh logo/icon của bạn */
                alt="VWing Logo"
                className="object-cover w-full h-full"
              />
            </div>
              <div className="flex flex-col">
              <span className="font-extrabold text-base sm:text-5xl tracking-tight text-emerald-900 dark:text-white leading-none flex items-center ">
                VWing       
              </span>
              
            </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-sm">
              Tiên phong số hóa và tối ưu năng suất vườn cây lâu năm (sầu riêng,
              bơ, cà phê, cao su) bằng mạng lưới thiết bị bay viễn thám đa quang
              phổ NDVI và trí tuệ nhân tạo chuyên sâu.
            </p>

            {/* Hotline Callout (1-tap dial on mobile) */}
            <a
              href="tel:18006868"
              className="flex items-center gap-3 p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 w-full sm:w-fit hover:border-emerald-500/60 transition-colors"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 uppercase block font-semibold">
                  HOTLINE TƯ VẤN 24/7 (BẤM GỌI)
                </span>
                <span className="text-lg font-extrabold font-mono text-slate-900 dark:text-white tracking-wide">
                  0965 782 358
                </span>
              </div>
            </a>
          </div>

          {/* Directory Columns */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-8">
            {/* Column 1 */}
            <div className="space-y-3">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                Giải Pháp Bay
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm">
                <li>
                  <button
                    onClick={() => onNavClick("features-section")}
                    className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors text-left py-1"
                  >
                    Khảo sát NDVI &amp; 3D Tán
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavClick("features-section")}
                    className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors text-left py-1"
                  >
                    Phun thuốc chính xác
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavClick("features-section")}
                    className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors text-left py-1"
                  >
                    Chuẩn đoán sâu bệnh
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavClick("features-section")}
                    className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors text-left py-1"
                  >
                    Dự báo sản lượng
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 2 */}
            <div className="space-y-3">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                Cây Lâu Năm
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm">
                <li>
                  <button
                    onClick={() => onNavClick("crops-section")}
                    className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors text-left py-1"
                  >
                    Vườn Sầu Riêng
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavClick("crops-section")}
                    className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors text-left py-1"
                  >
                    Cà Phê &amp; Hồ Tiêu
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavClick("crops-section")}
                    className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors text-left py-1"
                  >
                    Bơ &amp; Cây ăn trái
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavClick("crops-section")}
                    className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors text-left py-1"
                  >
                    Macca &amp; Cao Su
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 3 */}
            <div className="col-span-2 sm:col-span-1 space-y-3">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                Hệ Sinh Thái
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm">
                <li>
                  <button
                    onClick={() => onNavClick("intro-section")}
                    className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors text-left py-1"
                  >
                    Trung tâm Dữ liệu Nông học
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavClick("news-section")}
                    className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors text-left py-1"
                  >
                    Báo cáo Nghiên cứu
                  </button>
                </li>
                <li>
                  <button
                    onClick={onOpenTelemetry}
                    className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors text-left text-emerald-600 dark:text-emerald-400 font-medium py-1"
                  >
                    Trạm bay trực tuyến ↗
                  </button>
                </li>
                <li>
                  <button
                    onClick={onOpenAuth}
                    className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors text-left py-1"
                  >
                    Cổng đối tác HTX
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-3 text-center sm:text-left">
          <p>© 2026 VWING AeroAgri Precision JSC. Bản quyền đã bảo hộ.</p>
          <div className="flex items-center gap-3 text-xs font-mono">
            <span>Tiêu chuẩn ICAO</span>
            <span>·</span>
            <span>ISO 9001:2015</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
