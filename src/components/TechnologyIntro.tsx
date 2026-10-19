import React from "react";
import { ArrowUpRight, Layers3, ScanLine, Sprout } from "lucide-react";

const capabilities = [
  { icon: ScanLine, label: "Quan sát từ trên cao" },
  { icon: Layers3, label: "Hiểu dữ liệu vườn cây" },
  { icon: Sprout, label: "Chăm sóc có cơ sở" },
];

export const TechnologyIntro: React.FC = () => (
  <section id="intro-section" className="scroll-mt-8 px-5 py-8 sm:px-8 lg:px-10">
    <div className="rounded-[28px] border border-white/80 bg-white/65 p-6 backdrop-blur-sm sm:p-8 lg:p-10">
      <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr] lg:items-end lg:gap-12">
        <div>
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-[#6b8175]">
            Hệ sinh thái VWing
          </p>
          <h2 className="max-w-xl text-3xl font-medium leading-[1.18] tracking-[-0.035em] text-[#243d31] sm:text-4xl">
            Một góc nhìn mới.
            <br />
            Một vườn cây thấu hiểu hơn.
          </h2>
        </div>
        <p className="max-w-xl text-base leading-7 text-[#6b776f]">
          Kết nối dữ liệu drone, bản đồ và trí tuệ nhân tạo để quan sát sức khỏe
          cây trồng. VWing giúp bạn theo dõi từng khu vực và chủ động hơn trong
          mỗi quyết định chăm sóc.
        </p>
      </div>

      <div className="mt-8 grid gap-3 border-t border-[#dce4de] pt-6 sm:grid-cols-3">
        {capabilities.map(({ icon: Icon, label }) => (
          <div key={label} className="flex items-center gap-3 text-sm text-[#466454]">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#e5ede5]">
              <Icon className="h-[18px] w-[18px]" strokeWidth={1.5} aria-hidden="true" />
            </span>
            <span>{label}</span>
            <ArrowUpRight className="ml-auto h-4 w-4 text-[#95a699]" aria-hidden="true" />
          </div>
        ))}
      </div>
    </div>
  </section>
);
