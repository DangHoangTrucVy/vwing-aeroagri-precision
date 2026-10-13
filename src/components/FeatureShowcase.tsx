import React, { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  ShieldAlert,
  Compass,
  FileCheck2,
  Scan,
  Activity,
  QrCode,
  CheckCircle2,
  Layers,
  Sprout,
  Radar,
  Mountain,
  TreePine,
} from "lucide-react";

interface FeatureShowcaseProps {
  onOpenLidarModal: () => void;
  onOpenPathogenModal: () => void;
  onOpenTerrainModal: () => void;
  onOpenPassportModal: () => void;
}

/* Reveal content when scrolling into view */
const Reveal: React.FC<{
  children: React.ReactNode;
  className?: string;
  delay?: number;
}> = ({ children, className = "", delay = 0 }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translate3d(0,0,0)" : "translate3d(0,32px,0)",
        transition: `opacity 750ms ease ${delay}ms, transform 750ms cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
};

/* Shared section label */
const Eyebrow: React.FC<{
  number: string;
  children: React.ReactNode;
  color?: string;
}> = ({ number, children, color = "emerald" }) => (
  <div
    className={`inline-flex items-center gap-2 rounded-full border border-${color}-400/20 bg-${color}-400/10 px-3.5 py-2 font-mono text-[10px] font-bold tracking-wider text-${color}-400 sm:text-xs`}
  >
    <span className={`h-2 w-2 rounded-full bg-${color}-400 animate-pulse`} />
    <span>{number}</span>
    <span>{children}</span>
  </div>
);

/* Shared specification tile */
const Spec: React.FC<{
  label: string;
  value: string;
  note: string;
  accent?: string;
}> = ({ label, value, note, accent = "text-white" }) => (
  <div className="min-w-0 rounded-xl border border-white/[0.08] bg-white/[0.035] p-3 transition-colors duration-300 hover:border-emerald-400/30 hover:bg-white/[0.06] sm:rounded-2xl sm:p-4">
    <span className="block truncate font-mono text-[9px] uppercase tracking-wider text-slate-400 sm:text-[10px]">
      {label}
    </span>
    <span
      className={`mt-1 block break-words font-mono text-xs font-bold sm:text-sm ${accent}`}
    >
      {value}
    </span>
    <span className="mt-1 block text-[10px] leading-relaxed text-slate-500 sm:text-xs">
      {note}
    </span>
  </div>
);

/* Telemetry panel for LiDAR */
const LidarPanel = () => {
  const bars = [
    45, 62, 78, 55, 90, 82, 60, 75, 95, 88, 70, 85, 68, 92, 74, 80, 88, 94, 65,
    78, 89, 96, 70, 82,
  ];

  return (
    <div className="relative overflow-hidden rounded-2xl border border-emerald-400/15 bg-[#0b1c2b] p-4 shadow-2xl shadow-emerald-950/20 sm:rounded-3xl sm:p-6">
      <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-emerald-400/10 blur-3xl" />

      <div className="relative flex items-center justify-between gap-3 border-b border-white/[0.08] pb-4">
        <div className="flex items-center gap-2">
          <Activity className="h-4 w-4 text-emerald-400" />
          <span className="text-xs text-slate-300">Tần số xung LiDAR</span>
        </div>
        <span className="rounded-md border border-emerald-500/30 bg-emerald-950/60 px-2 py-1 font-mono text-[10px] font-bold text-emerald-400 sm:text-xs">
          1.4M pts/s
        </span>
      </div>

      <div className="relative my-6 flex h-24 items-end gap-1 sm:h-36">
        {bars.map((height, i) => (
          <div
            key={i}
            className={`w-full rounded-t-sm transition-all duration-700 ${
              height > 85
                ? "bg-emerald-400"
                : height > 70
                  ? "bg-teal-500"
                  : "bg-slate-700"
            }`}
            style={{
              height: `${height}%`,
              transitionDelay: `${i * 25}ms`,
            }}
          />
        ))}
      </div>

      <div className="grid grid-cols-3 gap-2 border-t border-white/[0.08] pt-4 text-center">
        <div>
          <p className="font-mono text-[9px] text-slate-400">NDVI</p>
          <p className="mt-1 font-mono text-base font-bold text-emerald-400 sm:text-xl">
            0.86
          </p>
          <p className="text-[10px] text-slate-500">Tối ưu</p>
        </div>
        <div>
          <p className="font-mono text-[9px] text-slate-400">SINH KHỐI</p>
          <p className="mt-1 font-mono text-base font-bold text-white sm:text-xl">
            94.2%
          </p>
          <p className="text-[10px] text-emerald-400">Tán khỏe</p>
        </div>
        <div>
          <p className="font-mono text-[9px] text-slate-400">ĐỘ PHỦ</p>
          <p className="mt-1 font-mono text-base font-bold text-cyan-400 sm:text-xl">
            18.4 m²
          </p>
          <p className="text-[10px] text-slate-500">/Gốc</p>
        </div>
      </div>
    </div>
  );
};

/* AI pathogen visualization */
const PathogenPanel = () => (
  <div className="relative overflow-hidden rounded-2xl border border-rose-400/20 bg-[#091522] p-4 text-white shadow-2xl sm:rounded-3xl sm:p-6">
    <div className="flex items-center justify-between gap-2 border-b border-white/10 pb-4">
      <div className="flex items-center gap-2">
        <Radar className="h-4 w-4 text-rose-400" />
        <span className="font-mono text-[10px] font-bold tracking-wider text-rose-400 sm:text-xs">
          AI PATHOGEN SCAN
        </span>
      </div>
      <span className="rounded-full border border-rose-500/30 bg-rose-500/10 px-2 py-1 text-[9px] text-rose-300">
        CẤP ĐỘ 2
      </span>
    </div>

    <div className="relative flex h-56 items-center justify-center overflow-hidden sm:h-72">
      {[210, 160, 110, 60].map((size, i) => (
        <div
          key={size}
          className={`absolute rounded-full border ${
            i === 3
              ? "border-rose-400/30 bg-rose-500/5"
              : "border-dashed border-slate-600/50"
          }`}
          style={{ width: size, height: size }}
        />
      ))}

      <div className="absolute h-px w-full rotate-45 bg-gradient-to-r from-transparent via-emerald-400/50 to-transparent" />
      <div className="absolute h-px w-full -rotate-45 bg-gradient-to-r from-transparent via-emerald-400/50 to-transparent" />

      {[
        "left-[20%] top-[25%]",
        "right-[20%] top-[30%]",
        "left-[25%] bottom-[20%]",
        "right-[25%] bottom-[18%]",
      ].map((position) => (
        <span
          key={position}
          className={`absolute ${position} h-3 w-3 rounded-full bg-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.65)]`}
        />
      ))}

      <div className="relative z-10 flex flex-col items-center">
        <div className="relative mb-3 flex h-5 w-5 items-center justify-center">
          <span className="absolute h-10 w-10 animate-ping rounded-full bg-rose-400/30" />
          <span className="relative h-4 w-4 rounded-full border-2 border-white bg-rose-500 shadow-[0_0_20px_rgba(244,63,94,0.8)]" />
        </div>
        <div className="rounded-xl border border-rose-400/30 bg-[#091522]/95 px-4 py-3 text-center backdrop-blur">
          <p className="text-xs font-bold text-rose-300">Phytophthora</p>
          <p className="mt-1 text-[10px] text-slate-300">Nấm xì mủ thân</p>
          <p className="mt-2 font-mono text-xs font-bold text-emerald-400">
            AI 98.5%
          </p>
        </div>
      </div>
    </div>

    <div className="flex items-center justify-between gap-3 rounded-xl border border-rose-400/15 bg-rose-500/5 p-3">
      <div className="flex items-center gap-2">
        <ShieldAlert className="h-5 w-5 shrink-0 text-rose-400" />
        <div>
          <p className="font-mono text-[9px] text-slate-400">PHÁC ĐỒ XỬ LÝ</p>
          <p className="mt-1 text-xs font-semibold text-slate-200">
            Phun cục bộ 3 gốc liền kề
          </p>
        </div>
      </div>
      <span className="shrink-0 font-mono text-xs font-bold text-rose-400">
        &lt; 24h
      </span>
    </div>
  </div>
);

/* Terrain-follow visualization */
const TerrainPanel = () => (
  <div className="overflow-hidden rounded-2xl border border-cyan-400/15 bg-[#091522] p-4 text-white shadow-2xl sm:rounded-3xl sm:p-6">
    <div className="flex items-center justify-between gap-3 border-b border-white/10 pb-4">
      <div className="flex items-center gap-2">
        <Mountain className="h-4 w-4 text-cyan-400" />
        <span className="font-mono text-[10px] font-bold tracking-wider text-cyan-400 sm:text-xs">
          TERRAIN-FOLLOW RADAR
        </span>
      </div>
      <span className="rounded-md bg-amber-500/10 px-2 py-1 font-mono text-[10px] text-amber-400">
        ▲ 38.4°
      </span>
    </div>

    <div className="my-4 sm:my-6">
      <svg viewBox="0 0 400 220" className="h-auto w-full" fill="none">
        {[50, 100, 150, 200].map((y) => (
          <line
            key={y}
            x1="0"
            y1={y}
            x2="400"
            y2={y}
            stroke="#1e293b"
            strokeDasharray="4 5"
          />
        ))}

        <defs>
          <linearGradient id="terrainGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#10b981" stopOpacity=".45" />
            <stop offset="100%" stopColor="#022c22" stopOpacity=".9" />
          </linearGradient>
        </defs>

        <path
          d="M10 185 Q100 180 175 140 T310 65 L390 30 L390 215 L10 215 Z"
          fill="url(#terrainGradient)"
          stroke="#10b981"
          strokeWidth="2"
        />
        <path
          d="M10 130 Q100 125 175 90 T310 15 L390 -20"
          stroke="#38bdf8"
          strokeWidth="2"
          strokeDasharray="6 5"
        />

        {[80, 160, 240, 320].map((x, i) => (
          <g key={x}>
            <circle
              cx={x}
              cy={[173, 148, 105, 61][i]}
              r="9"
              fill="#10b981"
              opacity=".8"
            />
            <path
              d={`M${x} ${[173, 148, 105, 61][i]} v-15`}
              stroke="#6ee7b7"
              strokeWidth="2"
            />
          </g>
        ))}

        <g transform="translate(240 50)">
          <circle r="11" fill="#0284c7" stroke="white" strokeWidth="2" />
          <path
            d="M0 11 V45"
            stroke="#38bdf8"
            strokeWidth="2"
            strokeDasharray="3 3"
          />
          <circle cy="45" r="4" fill="#38bdf8" />
        </g>
      </svg>
    </div>

    <div className="grid grid-cols-3 gap-2 border-t border-white/10 pt-4 text-center">
      <div>
        <p className="text-[9px] text-slate-400">KHOẢNG CÁCH</p>
        <p className="mt-1 font-mono text-xs font-bold text-cyan-400 sm:text-sm">
          1.50 m
        </p>
      </div>
      <div>
        <p className="text-[9px] text-slate-400">GÓC NGHIÊNG</p>
        <p className="mt-1 font-mono text-xs font-bold text-white sm:text-sm">
          38.4°/45°
        </p>
      </div>
      <div>
        <p className="text-[9px] text-slate-400">KHÁNG GIÓ</p>
        <p className="mt-1 font-mono text-xs font-bold text-emerald-400 sm:text-sm">
          Cấp 6
        </p>
      </div>
    </div>
  </div>
);

/* Digital farm passport */
const PassportPanel = () => (
  <div className="relative overflow-hidden rounded-2xl border border-emerald-400/15 bg-[#091522] p-4 text-white shadow-2xl sm:rounded-3xl sm:p-6">
    <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-emerald-400/10 blur-3xl" />

    <div className="relative flex items-center justify-between gap-3 border-b border-white/10 pb-4">
      <div className="flex items-center gap-2">
        <FileCheck2 className="h-4 w-4 text-emerald-400" />
        <span className="font-mono text-[10px] font-bold text-emerald-400 sm:text-xs">
          FARM PASSPORT & GAP
        </span>
      </div>
      <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-2 py-1 text-[9px] font-bold text-emerald-300">
        GLOBALGAP
      </span>
    </div>

    <div className="relative my-5 rounded-2xl border border-slate-700 bg-slate-900/80 p-4 sm:p-6">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-mono text-[9px] tracking-wider text-slate-400 sm:text-[10px]">
            MÃ VÙNG TRỒNG
          </p>
          <h4 className="mt-2 break-all font-mono text-lg font-bold tracking-wide sm:text-xl">
            VN-DL48-120HA
          </h4>
          <p className="mt-2 text-xs text-slate-300">
            Đắk Lắk • Monthong sầu riêng
          </p>
        </div>
        <div className="flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-xl border border-slate-600 bg-slate-800">
          <QrCode className="h-7 w-7 text-emerald-400" />
          <span className="mt-1 font-mono text-[7px] text-slate-300">
            BLOCKCHAIN
          </span>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-4 border-t border-slate-700 pt-4">
        <div>
          <p className="text-[9px] text-slate-400 sm:text-[10px]">
            DƯ LƯỢNG BVTV
          </p>
          <p className="mt-1 font-mono text-sm font-bold text-emerald-400">
            0.00 ppm
          </p>
        </div>
        <div>
          <p className="text-[9px] text-slate-400 sm:text-[10px]">
            MÃ XUẤT EU/CN
          </p>
          <p className="mt-1 font-mono text-sm font-bold text-white">
            VALID #69142
          </p>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-slate-700 pt-3">
        <span className="text-[10px] text-slate-400">Nhật ký canh tác số</span>
        <span className="flex items-center gap-1.5 text-[10px] font-semibold text-emerald-400">
          <CheckCircle2 className="h-3.5 w-3.5" />
          Đã xác thực
        </span>
      </div>
    </div>
  </div>
);

export const FeatureShowcase: React.FC<FeatureShowcaseProps> = ({
  onOpenLidarModal,
  onOpenPathogenModal,
  onOpenTerrainModal,
  onOpenPassportModal,
}) => {
  return (
    <section
      id="features-section"
      className="relative w-full overflow-hidden space-y-0
    bg-[#f7f9fc] text-slate-900 transition-colors duration-500
    dark:bg-[#07131e] dark:text-white py-0"
    >
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          #features-section *,
          #features-section *::before,
          #features-section *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            scroll-behavior: auto !important;
          }
        }
      `}</style>

      {/* SECTION 01 — LiDAR / NDVI */}
      <div className="relative w-full px-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#f7f9fc] via-emerald-50/50 to-[#f7f9fc] transition-colors duration-500 dark:from-[#07131e] dark:via-[#09221f] dark:to-[#07131e]" />

        <div className="relative mx-auto w-full max-w-none px-0">
          <Reveal>
            <div className="relative overflow-hidden rounded-none border border-slate-800 bg-[#07131e] p-5 text-white shadow-2xl shadow-slate-900/10 sm:p-8 lg:p-12 xl:p-16">
              <div className="pointer-events-none absolute -right-20 -top-24 h-80 w-80 rounded-full bg-emerald-500/10 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-32 left-1/4 h-72 w-72 rounded-full bg-cyan-500/[0.06] blur-3xl" />

              <div className="relative flex flex-col gap-3 border-b border-white/10 pb-5 sm:flex-row sm:items-center sm:justify-between sm:pb-7">
                <div className="flex items-center gap-2 font-mono text-[10px] font-bold tracking-wider text-emerald-400 sm:text-xs">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
                  LIDAR 3D CANOPY FEED • LIVE
                </div>
                <div className="flex flex-wrap gap-4 font-mono text-[10px] text-slate-400 sm:text-xs">
                  <span>● RTK Lock (±0.8cm)</span>
                  <span className="text-emerald-400">● NDVI 5 Bands</span>
                </div>
              </div>

              <div className="relative mt-7 grid grid-cols-1 items-center gap-8 lg:mt-10 lg:grid-cols-12 lg:gap-12">
                <div className="space-y-6 lg:col-span-7">
                  <Reveal delay={80}>
                    <Eyebrow number="01.">
                      <Scan className="inline h-3.5 w-3.5" /> VIỄN THÁM ĐA PHỔ
                      NDVI
                    </Eyebrow>
                  </Reveal>

                  <Reveal delay={150}>
                    <h2 className="max-w-3xl text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl xl:text-6xl">
                      Bản Đồ NDVI
                      <br />
                      <span className="text-emerald-400">& Tán Cây 3D</span>
                    </h2>
                  </Reveal>

                  <Reveal delay={220}>
                    <p className="max-w-2xl text-sm leading-7 text-slate-300 sm:text-base sm:leading-8 lg:text-lg">
                      Tái hiện bản đồ sinh khối lá, phân tích mức độ diệp lục
                      quang hợp và mật độ cành bằng cảm biến LiDAR quét 1.4
                      triệu xung/giây kết hợp camera đa phổ 5 băng tần chuyên
                      dụng.
                    </p>
                  </Reveal>

                  <Reveal delay={280}>
                    <div className="grid grid-cols-3 gap-2 sm:gap-3">
                      <Spec
                        label="Độ phân giải"
                        value="1.2 cm/px"
                        note="Từng bẹ lá"
                      />
                      <Spec
                        label="LiDAR 3D"
                        value="1.4M pts/s"
                        note="Mật độ điểm"
                        accent="text-emerald-400"
                      />
                      <Spec
                        label="Băng phổ"
                        value="5 kênh NIR"
                        note="Camera đa phổ"
                        accent="text-cyan-400"
                      />
                    </div>
                  </Reveal>

                  <Reveal delay={340}>
                    <button
                      onClick={onOpenLidarModal}
                      className="group flex min-h-12 w-full items-center justify-center gap-3 rounded-full bg-emerald-500 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-emerald-500/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-emerald-400 sm:w-fit"
                    >
                      Khám phá công nghệ quét 3D
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </button>
                  </Reveal>
                </div>

                <Reveal className="lg:col-span-5" delay={180}>
                  <LidarPanel />
                </Reveal>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      {/* SECTION 02 — AI Pathogen */}
      <div className="relative mt-8 w-full py-6 sm:mt-12 sm:py-10 lg:mt-16">
        <div className="relative mx-auto w-full px-3 sm:px-6 lg:px-10">
          <Reveal>
            <div className="grid grid-cols-1 items-center gap-8 rounded-2xl border border-rose-100 bg-white/90 p-5 shadow-xl shadow-rose-900/[0.04] sm:rounded-3xl sm:p-8 lg:grid-cols-2 lg:gap-14 lg:rounded-[2rem] lg:p-12 xl:p-16">
              <div className="space-y-6">
                <Reveal delay={80}>
                  <Eyebrow number="02." color="rose">
                    <ShieldAlert className="inline h-3.5 w-3.5" /> CHẨN ĐOÁN AI
                    TẦM SOÁT
                  </Eyebrow>
                </Reveal>

                <Reveal delay={150}>
                  <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
                    Cảnh Báo Nấm
                    <br />
                    <span className="text-rose-500">Khẩn Cấp</span>
                  </h2>
                </Reveal>

                <Reveal delay={220}>
                  <p className="text-sm leading-7 text-slate-600 sm:text-base sm:leading-8 lg:text-lg">
                    Mô hình trí tuệ nhân tạo phân tích quang phổ hồng ngoại và
                    nhiệt độ tán để hỗ trợ phát hiện Phytophthora gây xì mủ sầu
                    riêng, rệp sáp đục cành và bệnh thán thư từ giai đoạn sớm.
                  </p>
                </Reveal>

                <Reveal delay={280}>
                  <div className="grid grid-cols-3 gap-3 border-y border-slate-200 py-5">
                    <div>
                      <p className="text-xl font-extrabold text-slate-900 sm:text-3xl">
                        &lt; 24h
                      </p>
                      <p className="mt-2 text-[10px] leading-5 text-slate-500 sm:text-xs">
                        Thời gian cảnh báo mục tiêu
                      </p>
                    </div>
                    <div>
                      <p className="text-xl font-extrabold text-emerald-600 sm:text-3xl">
                        98.5%
                      </p>
                      <p className="mt-2 text-[10px] leading-5 text-slate-500 sm:text-xs">
                        Độ chính xác mục tiêu
                      </p>
                    </div>
                    <div>
                      <p className="text-xl font-extrabold text-rose-500 sm:text-3xl">
                        AI
                      </p>
                      <p className="mt-2 text-[10px] leading-5 text-slate-500 sm:text-xs">
                        Phân tích dấu hiệu bệnh
                      </p>
                    </div>
                  </div>
                </Reveal>

                <Reveal delay={340}>
                  <button
                    onClick={onOpenPathogenModal}
                    className="group flex min-h-12 w-full items-center justify-center gap-3 rounded-full bg-rose-600 px-6 py-3.5 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-rose-500 sm:w-fit"
                  >
                    Tìm hiểu mô hình cảnh báo AI
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </Reveal>
              </div>

              <Reveal delay={180}>
                <PathogenPanel />
              </Reveal>
            </div>
          </Reveal>
        </div>
      </div>

      {/* SECTION 03 — Terrain Following */}
      <div className="relative mt-8 w-full py-6 sm:mt-12 sm:py-10 lg:mt-16">
        <div className="relative mx-auto w-full px-3 sm:px-6 lg:px-10">
          <Reveal>
            <div className="grid grid-cols-1 items-center gap-8 rounded-2xl border border-cyan-100 bg-white p-5 shadow-xl shadow-cyan-900/[0.04] sm:rounded-3xl sm:p-8 lg:grid-cols-2 lg:gap-14 lg:rounded-[2rem] lg:p-12 xl:p-16">
              <div className="space-y-6">
                <Reveal delay={80}>
                  <Eyebrow number="03." color="cyan">
                    <Compass className="inline h-3.5 w-3.5" /> CÔNG NGHỆ ĐỊA
                    HÌNH
                  </Eyebrow>
                </Reveal>

                <Reveal delay={150}>
                  <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
                    Bay Bám
                    <br />
                    <span className="text-cyan-600">Địa Hình Dốc 3D</span>
                  </h2>
                </Reveal>

                <Reveal delay={220}>
                  <p className="text-sm leading-7 text-slate-600 sm:text-base sm:leading-8 lg:text-lg">
                    Cảm biến Terrain-Follow Radar sóng milimet kết hợp LiDAR
                    giúp theo dõi địa hình theo thời gian thực, hỗ trợ duy trì
                    khoảng cách vòi phun trên các triền đồi dốc Tây Nguyên.
                  </p>
                </Reveal>

                <Reveal delay={280}>
                  <div className="grid grid-cols-3 gap-2 sm:gap-3">
                    <Spec
                      label="Độ dốc"
                      value="Tới 45°"
                      note="Địa hình đồi"
                      accent="text-cyan-600"
                    />
                    <Spec
                      label="Khoảng cách"
                      value="1.5 m"
                      note="Mục tiêu mô phỏng"
                      accent="text-cyan-600"
                    />
                    <Spec
                      label="Tốc độ phủ"
                      value="4.5 ha/h"
                      note="Thông số mục tiêu"
                      accent="text-emerald-600"
                    />
                  </div>
                </Reveal>

                <Reveal delay={340}>
                  <button
                    onClick={onOpenTerrainModal}
                    className="group flex min-h-12 w-full items-center justify-center gap-3 rounded-full bg-cyan-700 px-6 py-3.5 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-cyan-600 sm:w-fit"
                  >
                    Xem cơ chế bay bám địa hình
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </Reveal>
              </div>

              <Reveal delay={180}>
                <TerrainPanel />
              </Reveal>
            </div>
          </Reveal>
        </div>
      </div>

      {/* SECTION 04 — Farm Passport */}
      <div className="relative mt-8 w-full py-6 sm:mt-12 sm:py-10 lg:mt-16">
        <div className="relative mx-auto w-full px-3 sm:px-6 lg:px-10">
          <Reveal>
            <div className="grid grid-cols-1 items-center gap-8 rounded-2xl border border-indigo-100 bg-white/95 p-5 shadow-xl shadow-indigo-900/[0.04] sm:rounded-3xl sm:p-8 lg:grid-cols-2 lg:gap-14 lg:rounded-[2rem] lg:p-12 xl:p-16">
              <div className="space-y-6">
                <Reveal delay={80}>
                  <Eyebrow number="04." color="indigo">
                    <FileCheck2 className="inline h-3.5 w-3.5" /> TRUY XUẤT
                    NGUỒN GỐC
                  </Eyebrow>
                </Reveal>

                <Reveal delay={150}>
                  <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
                    Mã Vùng Trồng
                    <br />
                    <span className="text-indigo-600">& Nhật Ký AI</span>
                  </h2>
                </Reveal>

                <Reveal delay={220}>
                  <p className="text-sm leading-7 text-slate-600 sm:text-base sm:leading-8 lg:text-lg">
                    Số hóa nhật ký canh tác, lưu trữ dữ liệu chăm sóc và hỗ trợ
                    truy xuất nguồn gốc theo từng vùng trồng. Dữ liệu minh bạch
                    giúp chuẩn bị hồ sơ phục vụ các tiêu chuẩn thị trường.
                  </p>
                </Reveal>

                <Reveal delay={280}>
                  <div className="grid grid-cols-3 gap-2 sm:gap-3">
                    <Spec
                      label="Tiêu chuẩn"
                      value="GlobalGAP"
                      note="Hỗ trợ hồ sơ"
                      accent="text-indigo-600"
                    />
                    <Spec
                      label="Định danh"
                      value="GPS"
                      note="Vị trí vườn cây"
                      accent="text-indigo-600"
                    />
                    <Spec
                      label="Nhật ký"
                      value="Digital"
                      note="Lưu trữ số"
                      accent="text-emerald-600"
                    />
                  </div>
                </Reveal>

                <Reveal delay={340}>
                  <button
                    onClick={onOpenPassportModal}
                    className="group flex min-h-12 w-full items-center justify-center gap-3 rounded-full bg-indigo-600 px-6 py-3.5 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-indigo-500 sm:w-fit"
                  >
                    Tìm hiểu mã vùng trồng
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </Reveal>
              </div>

              <Reveal delay={180}>
                <PassportPanel />
              </Reveal>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Closing strip */}
      <Reveal className="mx-auto mt-12 max-w-5xl px-4 text-center sm:mt-20">
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-xs font-semibold text-emerald-800 transition-colors duration-300 dark:border-emerald-400/30 dark:bg-emerald-400/10 dark:text-emerald-300">
          <Sprout className="h-4 w-4" />
          <span>VWING • SMART AGRICULTURE</span>
        </div>

        <h3 className="mt-5 text-2xl font-extrabold tracking-tight text-slate-900 transition-colors duration-300 dark:text-white sm:text-4xl">
          Từ dữ liệu đến quyết định
          <span className="text-emerald-600 dark:text-emerald-400">
            {" "}
            chính xác hơn.
          </span>
        </h3>

        <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-500 transition-colors duration-300 dark:text-slate-300 sm:text-base">
          Kết nối viễn thám, trí tuệ nhân tạo và dữ liệu canh tác để hỗ trợ quản
          lý vườn cây lâu năm một cách khoa học.
        </p>

        <div className="mt-6 flex items-center justify-center gap-3 font-mono text-xs text-slate-400 transition-colors duration-300 dark:text-slate-400">
          <Layers className="h-4 w-4 text-emerald-500 dark:text-emerald-400" />
          <TreePine className="h-4 w-4 text-emerald-500 dark:text-emerald-400" />
          DATA • AI • AGRICULTURE
        </div>
      </Reveal>
    </section>
  );
};

export default FeatureShowcase;
