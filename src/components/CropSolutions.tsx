
import React, { useEffect, useRef, useState } from "react";
import { cropSolutions } from "../data/mockData";
import { CropType } from "../types";
import {
  Sprout,
  Radio,
  ArrowUpRight,
  Leaf,
  Activity,
} from "lucide-react";

interface CropSolutionsProps {
  onOpenPlotMap: (cropId: string) => void;
}

export const CropSolutions: React.FC<CropSolutionsProps> = ({
  onOpenPlotMap,
}) => {
  const [selectedCrop, setSelectedCrop] =
    useState<CropType>("durian");

  const [isVisible, setIsVisible] = useState(false);
  const [contentVisible, setContentVisible] = useState(true);

  const sectionRef = useRef<HTMLElement | null>(null);

  const currentCrop =
    cropSolutions.find((crop) => crop.id === selectedCrop) ||
    cropSolutions[0];

  // Reveal section when scrolling into view.
  useEffect(() => {
    const element = sectionRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.12,
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  // Smooth transition when switching crop types.
  const handleCropChange = (cropId: CropType) => {
    if (cropId === selectedCrop) return;

    setContentVisible(false);

    window.setTimeout(() => {
      setSelectedCrop(cropId);
      setContentVisible(true);
    }, 180);
  };

  return (
    <section
      ref={sectionRef}
      id="crops-section"
      className="relative mx-auto max-w-7xl overflow-hidden px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20"
    >
      {/* Decorative background glow */}
      <div className="pointer-events-none absolute left-0 top-24 -z-10 h-64 w-64 rounded-full bg-emerald-400/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-10 right-0 -z-10 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl" />

      {/* Section heading */}
      <div
        className={`mb-8 flex flex-col justify-between gap-6 transition-all duration-700 ease-out sm:mb-12 lg:flex-row lg:items-end ${
          isVisible
            ? "translate-y-0 opacity-100"
            : "translate-y-8 opacity-0"
        }`}
      >
        <div className="max-w-3xl space-y-3 sm:space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3.5 py-2 text-xs font-bold tracking-wide text-emerald-800 dark:border-emerald-800/70 dark:bg-emerald-950/60 dark:text-emerald-300">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500 text-white shadow-sm">
              <Sprout className="h-4 w-4" />
            </span>
            CHUYÊN SÂU TỪNG LOẠI CÂY
          </div>

          <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-slate-900 dark:text-white sm:text-4xl lg:text-[42px]">
            Giải Pháp Cho Cây Trồng{" "}
            <span className="text-emerald-600 dark:text-emerald-400">
              Chủ Lực
            </span>
          </h2>

          <p className="max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-300 sm:text-base">
            Mỗi loại cây có đặc tính sinh trưởng riêng. VWing kết hợp
            dữ liệu viễn thám và AI để hỗ trợ theo dõi sức khỏe cây
            trồng, tối ưu quá trình chăm sóc và quản lý vườn.
          </p>
        </div>

        {/* Crop selector */}
        <div className="w-full min-w-0 lg:w-auto lg:max-w-[52%]">
          <div className="flex max-w-full items-center gap-1.5 overflow-x-auto rounded-2xl border border-slate-200 bg-white/90 p-1.5 shadow-lg shadow-slate-900/5 backdrop-blur-sm dark:border-slate-700 dark:bg-slate-900/90 sm:rounded-full">
            {cropSolutions.map((crop) => {
              const isSelected = selectedCrop === crop.id;

              return (
                <button
                  key={crop.id}
                  type="button"
                  onClick={() =>
                    handleCropChange(crop.id as CropType)
                  }
                  aria-pressed={isSelected}
                  className={`flex min-h-11 shrink-0 cursor-pointer items-center gap-1.5 whitespace-nowrap rounded-xl px-4 py-2.5 text-xs font-semibold transition-all duration-300 sm:rounded-full sm:px-5 sm:text-sm ${
                    isSelected
                      ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/20"
                      : "text-slate-600 hover:bg-emerald-50 hover:text-emerald-700 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-emerald-400"
                  }`}
                >
                  {isSelected && <Leaf className="h-3.5 w-3.5" />}
                  <span>{crop.name}</span>
                  <span className="hidden text-[11px] font-normal opacity-75 sm:inline">
                    {crop.subName.split(" ")[0]}
                  </span>
                </button>
              );
            })}
          </div>
          <p className="mt-2 px-1 text-xs text-slate-400 lg:text-right">
            Chọn loại cây để khám phá giải pháp
          </p>
        </div>
      </div>

      {/* Main solution card */}
      <div
        className={`relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-xl shadow-slate-900/5 transition-all duration-700 dark:border-slate-800 dark:bg-[#0c1a26] sm:rounded-4xl lg:rounded-[2.5rem] ${
          isVisible
            ? "translate-y-0 opacity-100"
            : "translate-y-8 opacity-0"
        }`}
      >
        {/* Top accent line */}
        <div className="h-1 w-full bg-linear-to-r from-emerald-400 via-teal-500 to-cyan-400" />

        <div
          className={`grid grid-cols-1 items-center gap-8 p-5 transition-all duration-300 sm:gap-10 sm:p-8 lg:grid-cols-2 lg:gap-12 lg:p-12 ${
            contentVisible
              ? "translate-y-0 opacity-100"
              : "translate-y-2 opacity-0"
          }`}
        >
          {/* Left: crop information */}
          <div className="min-w-0 space-y-5 sm:space-y-6">
            <div className="flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 font-mono text-[10px] font-bold text-emerald-800 dark:border-emerald-800/70 dark:bg-emerald-950/60 dark:text-emerald-300 sm:text-xs">
                <Radio className="h-3.5 w-3.5 text-emerald-500" />
                {currentCrop.badge}
              </div>

              <span className="inline-flex items-center gap-1.5 text-xs text-slate-400">
                <Activity className="h-3.5 w-3.5 text-emerald-500" />
                Giải pháp nông nghiệp số
              </span>
            </div>

            <div className="space-y-3">
              <h3 className="text-2xl font-extrabold leading-tight tracking-tight text-slate-900 dark:text-white sm:text-3xl lg:text-4xl">
                {currentCrop.title}
              </h3>

              <p className="text-sm leading-7 text-slate-600 dark:text-slate-300 sm:text-base sm:leading-8">
                {currentCrop.description}
              </p>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {currentCrop.stats.map((stat, index) => (
                <div
                  key={`${currentCrop.id}-${index}`}
                  style={{
                    transitionDelay: contentVisible
                      ? `${index * 100}ms`
                      : "0ms",
                  }}
                  className={`group rounded-2xl border border-slate-200 bg-slate-50/80 p-4 transition-all duration-500 hover:-translate-y-1 hover:border-emerald-300 hover:bg-emerald-50/70 hover:shadow-lg hover:shadow-emerald-900/5 dark:border-slate-800 dark:bg-slate-900/70 dark:hover:border-emerald-800 dark:hover:bg-slate-900 sm:p-5 ${
                    contentVisible
                      ? "translate-y-0 opacity-100"
                      : "translate-y-4 opacity-0"
                  }`}
                >
                  <span
                    className={`block wrap-break-words font-mono text-xl font-extrabold tracking-tight transition-colors duration-300 sm:text-2xl lg:text-3xl ${
                      stat.isPositive
                        ? "text-emerald-600 group-hover:text-emerald-500 dark:text-emerald-400"
                        : "text-indigo-600 group-hover:text-indigo-500 dark:text-indigo-400"
                    }`}
                  >
                    {stat.value}
                  </span>

                  <span className="mt-2 block text-xs font-medium leading-relaxed text-slate-600 dark:text-slate-400 sm:text-sm">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Supporting note */}
            <div className="flex items-start gap-3 border-l-2 border-emerald-500 py-1 pl-4">
              <Sprout className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
              <p className="text-xs leading-6 text-slate-500 dark:text-slate-400 sm:text-sm">
                Dữ liệu được trình bày trực quan, giúp người quản lý
                vườn dễ theo dõi và đưa ra quyết định chăm sóc phù hợp.
              </p>
            </div>
          </div>

          {/* Right: pilot plot image */}
          <div className="min-w-0">
            <div className="group relative aspect-4/3 overflow-hidden rounded-2xl border border-slate-200 bg-slate-950 shadow-2xl shadow-slate-900/10 dark:border-slate-700 sm:aspect-16/12 lg:aspect-4/5">
              <img
                src={currentCrop.pilotPlot.image}
                alt={currentCrop.pilotPlot.title}
                loading="lazy"
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover object-center opacity-90 transition-transform duration-1000 ease-out group-hover:scale-110"
              />

              {/* Image gradient */}
              <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/10 to-slate-950/30" />

              {/* Image top badge */}
              <div className="absolute inset-x-3 top-3 flex items-start justify-between gap-2 sm:inset-x-4 sm:top-4">
                <div className="flex min-w-0 items-center gap-2 rounded-full border border-white/15 bg-slate-950/75 px-3 py-2 text-[10px] font-medium text-white shadow-lg backdrop-blur-md sm:text-xs">
                  <span className="relative flex h-2 w-2 shrink-0">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                  </span>
                  <span className="truncate">Cảm biến NDVI</span>
                </div>

                <span className="max-w-[55%] truncate rounded-full border border-emerald-400/30 bg-emerald-500/15 px-3 py-2 text-[10px] font-bold text-emerald-300 backdrop-blur-md sm:text-xs">
                  Độ ẩm: {currentCrop.pilotPlot.soilMoisture}
                </span>
              </div>

              {/* Image bottom information */}
              <div className="absolute inset-x-3 bottom-3 rounded-2xl border border-white/10 bg-slate-950/80 p-4 backdrop-blur-xl transition-all duration-300 sm:inset-x-4 sm:bottom-4 sm:p-5">
                <div className="flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="mb-1 font-mono text-[9px] font-semibold uppercase tracking-wider text-emerald-400 sm:text-[10px]">
                      KHU VỰC GIÁM SÁT
                    </p>

                    <h4 className="truncate text-sm font-bold tracking-tight text-white sm:text-lg">
                      {currentCrop.pilotPlot.title}
                    </h4>

                    <p className="mt-1 truncate text-[10px] text-slate-300 sm:text-xs">
                      {currentCrop.pilotPlot.subtitle}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => onOpenPlotMap(currentCrop.id)}
                    aria-label={`Xem bản đồ ${currentCrop.pilotPlot.title}`}
                    className="flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition-all duration-300 hover:rotate-45 hover:border-emerald-400 hover:bg-emerald-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-slate-950"
                  >
                    <ArrowUpRight className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>

            <p className="mt-3 text-center text-xs text-slate-400">
              Hình ảnh minh họa khu vực trồng trọt và giám sát cây trồng
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
