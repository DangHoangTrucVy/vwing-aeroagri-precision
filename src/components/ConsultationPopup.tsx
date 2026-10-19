import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  X,
  Sprout,
  Phone,
  UserRound,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import icon from "../assets/images/icon.png";

type ConsultationForm = {
  fullName: string;
  phone: string;
  cropType: string;
};

type ConsultationPopupProps = {
  onSuccess: (formData: ConsultationForm) => void;
  delay?: number;
};

const DISMISSED_KEY = "vwing-consultation-popup-dismissed";

const cropOptions = [
  "Sầu riêng",
  "Cà phê",
  "Hồ tiêu",
  "Bơ",
  "Macadamia",
  "Cây trồng khác",
];

export default function ConsultationPopup({
  onSuccess,
  delay = 150_000,
}: ConsultationPopupProps) {
  const [visible, setVisible] = useState(false);
  const [formData, setFormData] = useState<ConsultationForm>({
    fullName: "",
    phone: "",
    cropType: "Sầu riêng",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const dismissedAtRef = useRef<number | null>(null);

  useEffect(() => {
    // Không hiện lại nếu khách đã đóng popup trong phiên này.
    try {
      if (sessionStorage.getItem(DISMISSED_KEY) === "true") return;
    } catch {
      // Tiếp tục hoạt động nếu trình duyệt không cho dùng sessionStorage.
    }

    const timer = window.setTimeout(() => {
      setVisible(true);
    }, delay);

    return () => window.clearTimeout(timer);
  }, [delay]);

  useEffect(() => {
    const initialDelay = 20_000;
    const reopenDelay = 60_000;

    const dismissedAt = dismissedAtRef.current;

    const delay =
      dismissedAt === null
        ? initialDelay
        : Math.max(0, reopenDelay - (Date.now() - dismissedAt));

    const timer = window.setTimeout(() => {
      setVisible(true);
    }, delay);

    return () => window.clearTimeout(timer);
  }, [visible]);

  const closePopup = () => {
    dismissedAtRef.current = Date.now();
    setVisible(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (!formData.fullName.trim()) {
      setError("Bạn vui lòng nhập họ và tên.");
      return;
    }

    if (!/^[0-9+() -]{9,15}$/.test(formData.phone.trim())) {
      setError("Vui lòng nhập số điện thoại hoặc Zalo hợp lệ.");
      return;
    }

    setLoading(true);

    try {
      onSuccess({
        ...formData,
        fullName: formData.fullName.trim(),
        phone: formData.phone.trim(),
      });

      closePopup();
    } catch {
      setError("Chưa gửi được thông tin. Bạn vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  if (!visible || typeof document === "undefined") return null;

  return createPortal(
    <div
      className="fixed inset-0 z-9999 flex items-center justify-center overflow-y-auto bg-slate-950/65 p-4 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) closePopup();
      }}
      onTouchStart={(event) => {
        if (event.target === event.currentTarget) closePopup();
      }}
      role="presentation"
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="consultation-popup-title"
        className="relative my-auto w-full max-w-md overflow-hidden rounded-[28px] border border-white/60 bg-white shadow-2xl shadow-black/25 dark:border-slate-700 dark:bg-[#0C1A26]"
        onMouseDown={(event) => event.stopPropagation()}
        onTouchStart={(event) => event.stopPropagation()}
      >
        <div className="h-1.5 bg-linear-to-r from-emerald-600 via-emerald-400 to-teal-300" />

        <button
          type="button"
          onClick={closePopup}
          aria-label="Đóng cửa sổ tư vấn"
          className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition hover:bg-slate-200 hover:text-slate-900 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="p-5 sm:p-6">
           <div className="flex items-center cursor-pointer group shrink-0 select-none">
            {/* Logo thu gọn */}
            <div className="flex h-15 w-8 shrink-0 items-center justify-center overflow-hidden">
              <img
                src={icon}
                alt="VWing Logo"
                className="object-cover w-full h-full"
              />
            </div>

            <div className="flex flex-col">
              <span className="font-extrabold text-lg sm:text-3xl tracking-tight text-emerald-900 dark:text-white leading-none flex items-center ml-1">
                VWing      
              </span>
            </div>
         </div>

          <h2
            id="consultation-popup-title"
            className="mt-1.5 pr-6 text-xl font-extrabold leading-tight tracking-tight text-slate-950 dark:text-white sm:text-2xl"
          >
            Cùng VWing chăm sóc vườn tốt hơn
          </h2>

          <p className="mt-1.5 text-xs leading-5 text-slate-600 dark:text-slate-400">
            Để lại thông tin, đội ngũ VWing sẽ trao đổi với bạn về giải pháp phù hợp cho nông trại.
          </p>

          <form onSubmit={handleSubmit} className="mt-4 space-y-3" noValidate>
            <div>
              <label
                htmlFor="popup-full-name"
                className="mb-1 block text-xs font-semibold text-slate-700 dark:text-slate-200"
              >
                Họ và tên
              </label>

              <div className="relative">
                <UserRound className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  id="popup-full-name"
                  autoComplete="name"
                  value={formData.fullName}
                  onChange={(event) =>
                    setFormData((previous) => ({
                      ...previous,
                      fullName: event.target.value,
                    }))
                  }
                  placeholder="Nguyễn Văn A"
                  className="min-h-10 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 pl-10 text-xs sm:text-sm text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 dark:border-slate-700 dark:bg-[#0B1B24] dark:text-white"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="popup-phone"
                className="mb-1 block text-xs font-semibold text-slate-700 dark:text-slate-200"
              >
                Số điện thoại / Zalo
              </label>

              <div className="relative">
                <Phone className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  id="popup-phone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  value={formData.phone}
                  onChange={(event) =>
                    setFormData((previous) => ({
                      ...previous,
                      phone: event.target.value,
                    }))
                  }
                  placeholder="0912 345 678"
                  className="min-h-10 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 pl-10 text-xs sm:text-sm text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 dark:border-slate-700 dark:bg-[#0B1B24] dark:text-white"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="popup-crop"
                className="mb-1 block text-xs font-semibold text-slate-700 dark:text-slate-200"
              >
                Loại cây trồng
              </label>

              <select
                id="popup-crop"
                value={formData.cropType}
                onChange={(event) =>
                  setFormData((previous) => ({
                    ...previous,
                    cropType: event.target.value,
                  }))
                }
                className="min-h-10 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs sm:text-sm text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 dark:border-slate-700 dark:bg-[#0B1B24] dark:text-white"
              >
                {cropOptions.map((crop) => (
                  <option key={crop} value={crop}>
                    {crop}
                  </option>
                ))}
              </select>
            </div>

            {error && (
              <p role="alert" className="text-xs font-medium text-rose-500">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="flex min-h-10 w-full items-center justify-center gap-2 rounded-xl bg-linear-to-r from-emerald-600 to-emerald-500 px-4 py-2.5 text-xs sm:text-sm font-bold text-white shadow-lg shadow-emerald-600/20 transition hover:from-emerald-700 hover:to-emerald-600 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Đang gửi..." : "Đăng ký tư vấn miễn phí"}
              {!loading && <ArrowRight className="h-4 w-4" />}
            </button>
          </form>

          <div className="mt-3 flex items-start justify-center gap-1.5 text-center text-[11px] leading-4 text-slate-500 dark:text-slate-400">
            <ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-600" />
            <p>Thông tin chỉ được sử dụng để liên hệ tư vấn.</p>
          </div>

          <button
            type="button"
            onClick={closePopup}
            className="mt-2 w-full py-1.5 text-xs font-medium text-slate-500 transition hover:text-slate-800 dark:text-slate-400 dark:hover:text-white"
          >
            Để tôi xem trang web tiếp
          </button>
        </div>
      </section>
    </div>,
    document.body,
  );
}
