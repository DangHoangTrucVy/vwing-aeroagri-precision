import { useEffect, useState } from "react";
import icon from "../assets/images/home.png";
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
    overflow-hidden bg-[#1b2220] text-white
    transition-all duration-850 ease-[cubic-bezier(0.22,1,0.36,1)]
    ${
      isExiting
        ? "pointer-events-none scale-[1.04] opacity-0 blur-sm"
        : "scale-100 opacity-100 blur-0"
    }
  `}
    >
      {/* Vòng tròn ánh sáng phía sau logo */}
      <div className="vwing-orbit absolute left-1/2 top-1/2 h-75 w-75 -translate-x-1/2 -translate-y-1/2 rounded-full border border-emerald-400/30 sm:h-90 sm:w-90">
        {/* Vòng tròn bên trong */}
        <div className="vwing-orbit-inner absolute inset-8 rounded-full border border-emerald-300/15" />

        {/* Vòng sáng xoay */}
        <div className="vwing-orbit-glow absolute -inset-3 rounded-full border border-transparent border-t-emerald-400/80 border-r-emerald-300/30" />

        {/* Hạt sáng trên quỹ đạo */}
        <div className="vwing-orbit-dot absolute left-1/2 -top-1 h-2 w-2 rounded-full bg-emerald-300" />
      </div>

      {/* Nội dung loading */}
      <div className="relative z-10 w-[min(420px,calc(100%-40px))]">
        <div className="mb-10 flex flex-col items-center">
          {/* Logo icon - Căn giữa tuyệt đối bằng flex và tăng kích thước khung/ảnh */}
          <div className="flex h-56 w-56 items-center justify-center overflow-hidden">
            <img
              src={icon}
              alt=""
              style={{
                height: "380px", // Tăng kích thước ảnh bự lên tùy ý
                width: "auto",
                maxWidth: "none",
                objectFit: "contain",
                marginTop: "80px",
              }}
            />
          </div>

          <p className="mt-2 text-center text-[10px] font-medium text-emerald-400 sm:text-xs">
            Phát triển thông minh hơn cùng VWING
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
    </div>
  );
}
