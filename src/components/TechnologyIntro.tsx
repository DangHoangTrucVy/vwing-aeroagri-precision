
import React, { useEffect, useRef, useState } from "react";
import { Layers, ScanLine, Sprout, ArrowDownRight } from "lucide-react";

export const TechnologyIntro: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  const reveal = (delay: number): React.CSSProperties => ({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? "translateY(0)" : "translateY(28px)",
    transition: `opacity 800ms ease ${delay}ms, transform 800ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms`,
  });

  return (
    <section
      id="intro-section"
      ref={sectionRef}
      className="relative mx-auto max-w-7xl overflow-hidden px-5 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-32"
    >
      {/* Decorative background */}
      <div className="pointer-events-none absolute right-0 top-10 -z-10 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-0 -z-10 h-48 w-48 rounded-full bg-teal-400/10 blur-3xl" />

      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
        {/* Left: Main introduction */}
        <div className="lg:col-span-7">
          {/* Kicker */}
          <div
            style={reveal(0)}
            className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-xs font-bold tracking-wider text-emerald-800 dark:border-emerald-800/70 dark:bg-emerald-950/50 dark:text-emerald-300 sm:text-sm"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-600 text-white shadow-sm">
              <Layers className="h-3.5 w-3.5" />
            </span>
            HỆ SINH THÁI SỐ HÓA VƯỜN
          </div>

          {/* Heading */}
          <h2
            style={reveal(150)}
            className="max-w-3xl text-3xl font-extrabold leading-[1.15] tracking-tight text-slate-900 dark:text-white sm:text-4xl lg:text-5xl"
          >
            Thấu Hiểu Từng Tán Cây.
            <br />
            <span className="bg-linear-gradient-to-r from-emerald-600 via-teal-500 to-emerald-400 bg-clip-text text-transparent">
              Kiến Tạo Vườn Cây Số.
            </span>
          </h2>

          {/* Description */}
          <p
            style={reveal(300)}
            className="mt-6 max-w-2xl text-base leading-8 text-slate-600 dark:text-slate-300 sm:text-lg"
          >
            Khác biệt hoàn toàn so với nông nghiệp lúa nước, vườn cây lâu năm
            đòi hỏi phân tích cấu trúc tán 3D, độ ẩm sâu và lịch sử dinh dưỡng
            theo từng năm của từng cá thể cây. VWing kết hợp công nghệ viễn
            thám và AI để biến dữ liệu phức tạp thành thông tin hữu ích cho
            người làm nông nghiệp.
          </p>

          {/* Supporting line */}
          <div
            style={reveal(450)}
            className="mt-8 flex items-center gap-3 border-l-2 border-emerald-500 pl-4"
          >
            <ScanLine className="h-5 w-5 shrink-0 text-emerald-600 dark:text-emerald-400" />
            <p className="text-sm font-medium leading-relaxed text-slate-700 dark:text-slate-200 sm:text-base">
              Từ dữ liệu viễn thám đến góc nhìn chi tiết trên từng gốc cây.
            </p>
          </div>
        </div>

        {/* Right: Technology highlight */}
        <div
          style={reveal(250)}
          className="relative lg:col-span-5"
        >
          <div className="relative overflow-hidden rounded-3xl border border-emerald-900/10 bg-linear-to-br from-[#0b1d25] via-[#102c31] to-[#071820] p-6 text-white shadow-[0_24px_70px_rgba(15,23,42,0.16)] sm:p-8 lg:p-9">
            {/* Decorative rings */}
            <div className="pointer-events-none absolute -right-16 -top-16 h-52 w-52 rounded-full border border-emerald-400/15" />
            <div className="pointer-events-none absolute -right-8 -top-8 h-36 w-36 rounded-full border border-emerald-400/20" />

            <div className="relative">
              <div className="flex items-center justify-between gap-3">
                <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-emerald-300 sm:text-xs">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
                  Smart Agriculture
                </span>
                <Sprout className="h-6 w-6 text-emerald-400" />
              </div>

              <div className="mt-10">
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-400">
                  DATA-DRIVEN FARMING
                </p>

                <h3 className="mt-3 text-2xl font-bold leading-snug tracking-tight sm:text-3xl">
                  Mỗi dữ liệu
                  <br />
                  <span className="text-emerald-400">mở ra một góc nhìn.</span>
                </h3>

                <p className="mt-4 text-sm leading-7 text-slate-300 sm:text-base">
                  Kết nối hình ảnh drone, dữ liệu cây trồng và lịch sử chăm sóc
                  để hỗ trợ quản lý vườn khoa học hơn.
                </p>
              </div>

              <div className="mt-8 border-t border-white/10 pt-5">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs text-slate-400">Công nghệ cốt lõi</p>
                    <p className="mt-1 text-sm font-semibold text-white sm:text-base">
                      Remote Sensing + AI
                    </p>
                  </div>

                  <div className="flex h-11 w-11 items-center justify-center rounded-full border border-emerald-400/25 bg-emerald-400/10 text-emerald-300">
                    <ArrowDownRight className="h-5 w-5" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Floating accent */}
          <div className="pointer-events-none absolute -bottom-4 -left-3 -z-10 h-24 w-24 rounded-2xl bg-emerald-500/15 blur-xl sm:-left-5" />
        </div>
      </div>
    </section>
  );
};
