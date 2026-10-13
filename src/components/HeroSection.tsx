import React, { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import daklakImage from "../assets/images/daklak.png";
import heroDroneImage from "../assets/images/hero_drone_orchard_1791883988500.jpg";
interface HeroSectionProps {
  onConsultClick: () => void;
  onExploreFeatures: () => void;
  onOpenLiveTelemetry: () => void;
}

const AnimatedNumber = ({
  end,
  duration = 1800,
  decimals = 0,
  separator = ".",
  suffix = "",
}: {
  end: number;
  duration?: number;
  decimals?: number;
  separator?: string;
  suffix?: string;
}) => {
  const [value, setValue] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setStarted(true);
        observer.disconnect();
      }
    });

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;

    let frame = 0;
    let startTime = 0;

    const animate = (time: number) => {
      if (!startTime) startTime = time;

      const progress = Math.min((time - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);

      setValue(end * eased);

      if (progress < 1) {
        frame = requestAnimationFrame(animate);
      }
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [started, end, duration]);

  const formatted = value.toLocaleString("vi-VN", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return (
    <span ref={ref}>
      {formatted}
      {suffix}
    </span>
  );
};

export const HeroSection: React.FC<HeroSectionProps> = ({
  onConsultClick,
  onExploreFeatures,
  onOpenLiveTelemetry,
}) => {
  const statsRef = useRef<HTMLDivElement | null>(null);
  const [statsVisible, setStatsVisible] = useState(false);

  // Reveal the statistics card when it enters the viewport.
  // This animation is self-contained; no separate CSS file is required.
  useEffect(() => {
    const element = statsRef.current;
    if (!element) return;

    if (typeof IntersectionObserver === "undefined") {
      setStatsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -35px 0px" },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const statAnimation = (delay: number): React.CSSProperties => ({
    opacity: statsVisible ? 1 : 0,
    transform: statsVisible ? "translateY(0)" : "translateY(28px)",
    transition: `opacity 700ms ease ${delay}ms, transform 700ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms`,
  });

  return (
    <section
      id="hero-section"
      className="relative mx-auto max-w-[1600px] px-3 pt-2 pb-16 sm:px-6 sm:pt-6 sm:pb-20 lg:px-8"
    >
      {/* Main hero: taller image area and spacious content */}
      <div className="relative min-h-150 overflow-hidden rounded-[1.75rem] border border-slate-800/80 bg-[#0a1622] text-white shadow-2xl sm:min-h-142.5 sm:rounded-[2.5rem] lg:min-h-170 lg:rounded-[3rem]">
        {/* Background drone aerial photography */}
        <div className="absolute inset-0 z-0">
          <img
            src={heroDroneImage}
            alt="VWING Drone bay quét vườn sầu riêng và cà phê Tây Nguyên"
            referrerPolicy="no-referrer"
            className="h-150 w-full scale-105 transform object-cover object-center opacity-45 transition-transform duration-1000 ease-out hover:scale-100"
          />
          <div className="pointer-events-none absolute inset-0 bg-linear-to-r from-[#07131e]/95 via-[#0a1826]/75 to-[#07131e]/45" />
          <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-[#07131e]/95 via-[#07131e]/20 to-[#07131e]/15" />
          <div className="pointer-events-none absolute left-1/3 top-1/4 h-96 w-96 rounded-full bg-emerald-500/10 blur-3xl" />
        </div>

        {/* Hero content */}
        <div className="relative z-10 px-4 pb-48 pt-8 sm:px-10 sm:pb-52 sm:pt-14 lg:px-16 lg:pt-16">
          <div className="grid grid-cols-1 items-start gap-8 sm:gap-10 lg:grid-cols-12 lg:gap-12">
            {/* Headlines and calls to action */}
            <div className="space-y-5 sm:space-y-6 lg:col-span-7 lg:space-y-8">
              <div className="inline-flex max-w-full items-center gap-2 rounded-full border border-slate-700/80 bg-slate-900/80 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-slate-200 backdrop-blur-md sm:text-xs">
                <span className="h-2 w-2 shrink-0 rounded-full bg-emerald-400" />
                <span className="truncate">
                  #1 NỀN TẢNG DRONE CÂY LÂU NĂM TẠI VN
                </span>
              </div>

              <h1 className="max-w-3xl text-3xl font-extrabold leading-[1.14] tracking-tight text-white text-balance sm:text-4xl md:text-5xl lg:text-5xl xl:text-[56px]">
                Số Hóa Dữ Liệu,
                <br />
                <span className="bg-linear-to-r from-white via-slate-100 to-emerald-400 bg-clip-text text-transparent">
                  Kiến Tạo Nông Nghiệp
                </span>
                <br />
                Bền Vững
              </h1>

              <p className="max-w-xl text-sm font-normal leading-relaxed text-slate-300 sm:text-base lg:text-lg">
                Nâng tầm hiệu suất vườn sầu riêng, cà phê và hồ tiêu bằng công
                nghệ bản đồ viễn thám đa quang phổ NDVI, quét 3D tán dốc và chẩn
                đoán nấm bệnh chính xác theo từng gốc cây.
              </p>

              <div className="flex flex-col items-stretch gap-3 pt-1 sm:flex-row sm:items-center">
                <button
                  type="button"
                  onClick={onConsultClick}
                  className="group flex min-h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-full border border-slate-600/70 bg-slate-900/90 px-6 py-3.5 text-sm font-semibold text-white shadow-lg transition-all duration-200 hover:border-emerald-500/80 hover:bg-slate-800 active:scale-95 sm:w-auto"
                >
                  <span>Tư vấn giải pháp</span>
                  <ArrowUpRight className="h-4 w-4 text-emerald-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>

                <button
                  type="button"
                  onClick={onExploreFeatures}
                  className="group flex min-h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-full border border-slate-500/60 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-white/10 active:scale-95 sm:w-auto"
                >
                  <span>Xem tính năng</span>
                  <ArrowUpRight className="h-4 w-4 opacity-80 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>
              </div>
            </div>

            {/* Floating live NDVI telemetry card */}
            <div className="flex w-full justify-center lg:col-span-5 lg:justify-end lg:pt-8">
              <button
                type="button"
                onClick={onOpenLiveTelemetry}
                aria-label="Mở trạm viễn thám trực thăng Đắk Lắk"
                className="group relative w-full max-w-md cursor-pointer overflow-hidden rounded-2xl border border-slate-700/60 bg-[#0c1f2e]/85 p-4 text-left shadow-2xl backdrop-blur-xl transition-transform duration-200 hover:-translate-y-1 active:scale-[0.99] sm:rounded-3xl sm:p-5"
              >
                <div className="mb-3 flex items-center justify-between gap-3 text-xs">
                  <div className="flex min-w-0 items-center gap-2 font-mono">
                    <span className="relative flex h-2 w-2 shrink-0">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                    </span>
                    <span className="truncate text-[10px] font-semibold uppercase tracking-wider text-emerald-400 sm:text-[11px]">
                      LIVE NDVI TELEMETRY
                    </span>
                  </div>
                  <span className="shrink-0 font-mono text-[9px] text-slate-400 sm:text-xs">
                    RTK LOCK ±0.8cm
                  </span>
                </div>

                <div className="relative aspect-16/10 overflow-hidden rounded-xl border border-slate-800 bg-slate-950 sm:rounded-2xl">
                  <img
                    src={daklakImage}
                    alt="Đắk Lắk Mission | Live Feed"
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-transparent via-emerald-500/5 to-transparent" />
                  <div className="absolute left-2.5 top-2.5 flex items-center gap-1.5 rounded-full border border-slate-700/70 bg-slate-900/85 px-2.5 py-1 text-[10px] font-medium text-slate-200 backdrop-blur-md sm:left-3 sm:top-3 sm:text-[11px]">
                    <span>Vườn Krông Pắc</span>
                    <span className="rounded bg-emerald-500/20 px-1.5 py-0.5 font-mono font-bold text-emerald-300">
                      98.4%
                    </span>
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between gap-3 sm:mt-4">
                  <div className="min-w-0">
                    <p className="font-mono text-[9px] font-medium uppercase tracking-wider text-slate-400 sm:text-xs">
                      TRỰC THĂNG QUÉT TÁN
                    </p>
                    <h2 className="mt-1 text-base font-bold tracking-tight text-white sm:text-xl">
                      Đắk Lắk Mission #48
                    </h2>
                  </div>
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white shadow-md transition-all duration-200 group-hover:border-emerald-400 group-hover:bg-emerald-500">
                    <ArrowUpRight className="h-5 w-5" />
                  </span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* White statistical deck: overlaps the lower-right corner of the hero */}
      <div
        ref={statsRef}
        className={[
          "relative z-20 mx-1 -mt-8",
          "rounded-t-4xl border border-slate-100 bg-white",
          "px-5 py-6 text-slate-900",
          "shadow-[0_22px_65px_rgba(15,23,42,0.16)]",
          "sm:absolute sm:bottom-8 sm:left-1/2 sm:right-auto",
          "sm:mx-0 sm:mt-0 sm:w-[78%] sm:-translate-x-1/2",
          "sm:px-8 sm:py-7",
          "lg:bottom-10 lg:w-[78%] lg:px-10 lg:py-8",
        ].join(" ")}
        style={{
          opacity: statsVisible ? 1 : 0,
          transform: statsVisible ? "translateY(0)" : "translateY(34px)",
          transition:
            "opacity 750ms ease, transform 750ms cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      >
        <div className="grid grid-cols-1 items-center gap-6 text-center sm:grid-cols-3 sm:gap-6 lg:gap-8">
          <div
            style={statAnimation(80)}
            className="flex flex-col items-center space-y-2 text-center"
          >
            <div className="flex items-baseline gap-2">
              <span className="font-mono text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
                <AnimatedNumber end={5000} suffix="+" />
              </span>
              <span className="font-mono text-xl font-bold text-emerald-600 sm:text-2xl">
                ha
              </span>
            </div>
            <p className="text-2xl  leading-snug text-slate-500 sm:text-sm">
              Tổng diện tích vườn cây
            </p>
          </div>

          <div
            style={statAnimation(180)}
            className="flex flex-col items-center space-y-2 text-center"
          >
            <div className="flex items-baseline gap-2">
              <span className="font-mono text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
                <AnimatedNumber end={420} suffix="+" />
              </span>
            </div>
            <p className="text-2xl leading-snug text-slate-500 sm:text-sm">
              Trang trại quy mô lớn 
            </p>
          </div>

          <div
            style={statAnimation(280)}
            className="flex flex-col items-center space-y-2 text-center"
          >
            <div className="flex items-baseline gap-2">
              <span className="font-mono text-2xl font-bold tracking-tight text-emerald-700 sm:text-3xl lg:text-4xl">
                <AnimatedNumber end={98.5} decimals={1} suffix="%" />
              </span>
            </div>
            <p className="text-2xl  leading-snug text-slate-500 sm:text-sm">
              Độ chính xác 
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
