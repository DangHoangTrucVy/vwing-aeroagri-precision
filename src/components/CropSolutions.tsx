import React from "react";
import { ArrowUpRight, Droplets, Leaf } from "lucide-react";
import { cropSolutions } from "../data/mockData";
import { CropType } from "../types";
import orchardImage from "../assets/images/hero_drone_orchard_1791883988500.jpg";

interface CropSolutionsProps {
  onOpenPlotMap: (cropId: string) => void;
  selectedCrop: CropType;
  onSelectCrop: (crop: CropType) => void;
}

export const CropSolutions: React.FC<CropSolutionsProps> = ({ onOpenPlotMap, selectedCrop, onSelectCrop }) => {
  const currentCrop = cropSolutions.find((crop) => crop.id === selectedCrop) || cropSolutions[0];

  return (
    <section id="crops-section" className="scroll-mt-8 px-5 py-8 sm:px-8 lg:px-10">
      <div className="mb-6">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#6b8175]">Chuyên sâu từng loại cây</p>
        <h2 className="text-2xl font-medium tracking-[-0.03em] text-[#243d31] sm:text-3xl">Giải pháp dành cho vườn của bạn.</h2>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-[#718077]">Mỗi loại cây có một nhu cầu riêng. Chọn cây trồng để khám phá cách VWing hỗ trợ theo dõi và chăm sóc vườn.</p>
      </div>

      <div className="rounded-[28px] border border-white/80 bg-white/70 p-4 backdrop-blur-sm sm:p-6 lg:p-7">
        <div className="mb-6 flex flex-wrap gap-2" aria-label="Chọn loại cây trồng">
          {cropSolutions.map((crop) => (
            <button
              key={crop.id}
              type="button"
              onClick={() => onSelectCrop(crop.id as CropType)}
              aria-pressed={selectedCrop === crop.id}
              className={`flex min-h-11 items-center gap-2 rounded-full px-4 py-2 text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#426f5b] ${selectedCrop === crop.id ? "bg-[#426f5b] text-white" : "bg-[#edf1eb] text-[#6b7c6e] hover:bg-[#e0e8db]"}`}
            >
              {selectedCrop === crop.id && <Leaf className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />}
              {crop.name}
            </button>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr] lg:gap-8" aria-live="polite">
          <div className="min-w-0">
            <p className="text-[10px] font-semibold leading-5 tracking-[0.06em] text-[#7a8d72]">{currentCrop.badge}</p>
            <h3 className="mt-3 text-2xl font-medium leading-snug tracking-[-0.025em] text-[#243d31]">{currentCrop.title}</h3>
            <p className="mt-3 text-xs text-[#849082]">{currentCrop.subName}</p>
            <p className="mt-4 text-sm leading-7 text-[#718077]">{currentCrop.description}</p>
            <div className="mt-6 grid grid-cols-2 gap-3">
              {currentCrop.stats.map((stat) => (
                <div key={stat.label} className="rounded-2xl bg-[#eaf0e5] p-4">
                  <span className="block text-2xl font-medium tracking-tight text-[#426f5b]">{stat.value}</span>
                  <span className="mt-2 block text-xs leading-5 text-[#78846e]">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="min-w-0 overflow-hidden rounded-[22px] bg-[#edf1e8]">
            <div className="relative aspect-[16/10] overflow-hidden">
              <img src={orchardImage} alt="Hình ảnh minh họa drone quan sát vườn cây" loading="lazy" className="h-full w-full object-cover" />
              <span className="absolute left-4 top-4 flex items-center gap-2 rounded-full bg-white/90 px-3 py-2 text-xs text-[#426f5b] backdrop-blur-sm"><Droplets className="h-3.5 w-3.5" strokeWidth={1.5} aria-hidden="true" />Độ ẩm: {currentCrop.pilotPlot.soilMoisture}</span>
            </div>
            <div className="p-5">
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#87927e]">Khu vực giám sát</p>
              <h4 className="mt-2 text-base font-medium leading-6 text-[#304d3a]">{currentCrop.pilotPlot.title}</h4>
              <p className="mt-2 text-xs leading-6 text-[#78846e]">{currentCrop.pilotPlot.subtitle}</p>
              <button type="button" onClick={() => onOpenPlotMap(currentCrop.id)} className="mt-4 flex min-h-11 w-full items-center justify-between gap-3 rounded-xl border border-[#cfdacb] px-4 text-sm font-medium text-[#426f5b] transition-colors hover:bg-[#e0e8db] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#426f5b]">
                Xem bản đồ vùng trồng<ArrowUpRight className="h-4 w-4 shrink-0" aria-hidden="true" />
              </button>
              <p className="mt-3 text-[10px] leading-5 text-[#909b86]">Hình ảnh minh họa vườn cây và hoạt động giám sát.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
