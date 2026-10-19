import React from "react";
import { ArrowUpRight, Compass, FileCheck2, ScanLine, ShieldCheck } from "lucide-react";

interface FeatureShowcaseProps {
  onOpenLidarModal: () => void;
  onOpenPathogenModal: () => void;
  onOpenTerrainModal: () => void;
  onOpenPassportModal: () => void;
}

export const FeatureShowcase: React.FC<FeatureShowcaseProps> = ({
  onOpenLidarModal,
  onOpenPathogenModal,
  onOpenTerrainModal,
  onOpenPassportModal,
}) => {
  const features = [
    {
      number: "01",
      icon: ScanLine,
      category: "Quan sát",
      title: "Bản đồ NDVI & tán cây 3D",
      description:
        "Đọc sức khỏe cây trồng qua dữ liệu đa phổ và cấu trúc tán cây. Nhìn rõ sự khác biệt giữa các khu vực trong vườn.",
      action: "Khám phá bản đồ",
      onClick: onOpenLidarModal,
      featured: true,
    },
    {
      number: "02",
      icon: ShieldCheck,
      category: "Phân tích",
      title: "Nhận diện dấu hiệu bất thường",
      description:
        "AI hỗ trợ rà soát dấu hiệu bệnh và xác định khu vực cần kiểm tra, giúp bạn chủ động theo dõi và chăm sóc cây trồng.",
      action: "Tìm hiểu cảnh báo AI",
      onClick: onOpenPathogenModal,
      featured: false,
    },
    {
      number: "03",
      icon: Compass,
      category: "Vận hành",
      title: "Hiểu địa hình, tối ưu đường bay",
      description:
        "Khám phá cách dữ liệu địa hình hỗ trợ lập kế hoạch đường bay và duy trì khoảng cách phù hợp trên vườn cây đồi dốc.",
      action: "Xem công nghệ bay bám",
      onClick: onOpenTerrainModal,
      featured: false,
    },
    {
      number: "04",
      icon: FileCheck2,
      category: "Quản lý",
      title: "Hồ sơ số cho từng vùng trồng",
      description:
        "Tập hợp vị trí vườn, nhật ký chăm sóc và dữ liệu canh tác trong một hồ sơ, hỗ trợ quản lý và truy xuất nguồn gốc.",
      action: "Khám phá hồ sơ vùng trồng",
      onClick: onOpenPassportModal,
      featured: false,
    },
  ];

  return (
    <section id="features-section" className="scroll-mt-8 px-5 pb-10 pt-3 sm:px-8 lg:px-10">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#6b8175]">
            Công nghệ trong tầm tay
          </p>
          <h2 className="text-2xl font-medium tracking-[-0.03em] text-[#243d31] sm:text-3xl">
            Chăm vườn từ một góc nhìn toàn diện.
          </h2>
        </div>
        <span className="text-sm text-[#77867c]">04 giải pháp · Một hệ sinh thái</span>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {features.map(({ number, icon: Icon, category, title, description, action, onClick, featured }) => (
          <article
            key={number}
            className={`flex flex-col rounded-[28px] border p-6 transition-colors sm:p-8 ${
              featured
                ? "border-[#426f5b] bg-[#426f5b] text-white"
                : "border-white/80 bg-white/70 text-[#243d31] backdrop-blur-sm hover:bg-white/90"
            }`}
          >
            <div className="mb-7 flex items-center justify-between gap-4">
              <span className={`flex h-11 w-11 items-center justify-center rounded-2xl ${featured ? "bg-white/10 text-[#e4f0de]" : "bg-[#e7eee5] text-[#55765d]"}`}>
                <Icon className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
              </span>
              <span className={`text-xs tabular-nums ${featured ? "text-[#c2d6c9]" : "text-[#89988d]"}`}>
                {number} / {category}
              </span>
            </div>

            <h3 className="text-xl font-medium leading-snug tracking-[-0.025em] sm:text-2xl">{title}</h3>
            <p className={`mt-3 max-w-lg text-sm leading-7 ${featured ? "text-[#d1dfd5]" : "text-[#718077]"}`}>
              {description}
            </p>

            <div className={`mt-7 border-t pt-5 ${featured ? "border-white/15" : "border-[#e0e7e0]"}`}>
              <button
                type="button"
                onClick={onClick}
                className={`group flex min-h-11 w-full items-center justify-between gap-4 rounded-xl px-1 text-left text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 ${featured ? "text-[#f1f5eb] hover:text-[#d4edaa] focus-visible:outline-white" : "text-[#426f5b] hover:text-[#243d31] focus-visible:outline-[#426f5b]"}`}
              >
                {action}
                <ArrowUpRight className="h-5 w-5 shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={1.5} aria-hidden="true" />
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default FeatureShowcase;
