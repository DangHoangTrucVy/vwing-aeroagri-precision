import { useEffect, useState } from "react";

type SplashScreenProps = {
  onComplete: () => void;
};

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    let finishTimer: ReturnType<typeof setTimeout> | undefined;

    const progressTimer = setInterval(() => {
      setProgress((current) => {
        if (current >= 100) {
          clearInterval(progressTimer);

          finishTimer = setTimeout(() => {
            setIsExiting(true);

            // Chờ hiệu ứng fade-out hoàn tất rồi mới chuyển màn hình
            finishTimer = setTimeout(onComplete, 550);
          }, 250);

          return 100;
        }

        return Math.min(current + 1, 100);
      });
    }, 25);

    return () => {
      clearInterval(progressTimer);
      if (finishTimer) clearTimeout(finishTimer);
    };
  }, [onComplete]);

  return (
    <div
      className={`
    fixed inset-0 z-100
    flex min-h-svh items-center justify-center
    overflow-hidden bg-[#010b09] text-white
    transition-all duration-850 ease-[cubic-bezier(0.22,1,0.36,1)]
    ${
      isExiting
        ? "pointer-events-none scale-[1.04] opacity-0 blur-sm"
        : "scale-100 opacity-100 blur-0"
    }
  `}
    >
      {/* Vòng tròn ánh sáng phía sau logo */}
      <div className="absolute left-1/2 top-1/2 h-75 w-75 -translate-x-1/2 -translate-y-1/2 rounded-full border border-emerald-400/20 sm:h-90 sm:w-90">
        <div className="absolute inset-8 rounded-full border border-emerald-300/6" />
      </div>

      {/* Nội dung loading */}
      <div className="relative z-10 w-[min(420px,calc(100%-40px))]">
        <div className="mb-10 flex flex-col items-center">
          {/* Logo icon */}
          <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-emerald-400/25 bg-emerald-400/6 text-emerald-400 shadow-[0_0_35px_rgba(16,185,129,0.12)]">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="h-8 w-8"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 21V12" />
              <path d="M12 15C5 15 4 10 4 7c5 0 8 2 8 8Z" />
              <path d="M12 12c0-5 3-8 8-8 0 5-2 8-8 8Z" />
            </svg>
          </div>

          {/* VWing brand */}
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">
            VW<span className="text-emerald-400">ING</span>
          </h1>

          <p className="mt-2 text-center text-[10px] font-medium tracking-[0.22em] text-slate-400 sm:text-xs">
            AEROAGRI SYSTEM · PRECISION FLIGHT
          </p>
        </div>

        {/* Progress bar */}
        <div className="h-1.75 overflow-hidden rounded-full border border-emerald-400/30 bg-emerald-950/80 p-0.5">
          <div
            className="h-full rounded-full bg-linear-to-r from-emerald-700 via-emerald-400 to-green-300 shadow-[0_0_12px_rgba(52,211,153,0.65)] transition-[width] duration-100 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="mt-4 flex items-center justify-between gap-3 text-xs">
          <span className="text-slate-400">
            {progress < 100
              ? "Đang khởi tạo hệ thống..."
              : "Hoàn tất giao diện..."}
          </span>

          <span className="font-semibold tabular-nums text-emerald-400">
            {progress}%
          </span>
        </div>
      </div>

      {/* Footer */}
      <p className="absolute bottom-6 left-4 right-4 text-center text-[9px] tracking-[0.14em] text-slate-600 sm:bottom-7 sm:text-[10px]">
        SMART AGRICULTURE AUTOMATION FRAMEWORK
      </p>
    </div>
  );
}
