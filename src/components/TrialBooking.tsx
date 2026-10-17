import React, { useEffect, useRef, useState } from "react";
import {
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Loader2,
  UserRound,
  Phone,
  MapPin,
  Ruler,
  Sprout,
  Satellite,
  ScanLine,
  Sparkles,
  Clock3,
  ChevronDown,
} from "lucide-react";

interface TrialBookingProps {
  onSuccess: (formData: any) => void;
}

const cropOptions = [
  "Sầu Riêng (Ri6 / Musang King)",
  "Cà Phê Robusta / Arabica",
  "Hồ Tiêu Vĩnh Linh",
  "Bơ Booth 7 & Bơ 034",
  "Cây Macadamia & Cao Su",
];

export const TrialBooking: React.FC<TrialBookingProps> = ({ onSuccess }) => {
  const sectionRef = useRef<HTMLElement>(null);

  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    cropType: "Sầu Riêng (Ri6 / Musang King)",
    area: "",
    location: "",
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  
useEffect(() => {
  const section = sectionRef.current;
  if (!section) return;

  const observer = new IntersectionObserver(
    ([entry]) => {
      setIsVisible(entry.isIntersecting);
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    },
  );

  observer.observe(section);

  return () => observer.disconnect();
}, []);


  const validate = () => {
    const nextErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      nextErrors.fullName = "Vui lòng nhập họ và tên";
    }

    if (
      !formData.phone.trim() ||
      !/^[0-9+() -]{9,15}$/.test(formData.phone.trim())
    ) {
      nextErrors.phone = "Vui lòng nhập số điện thoại hoặc Zalo hợp lệ";
    }

    if (!formData.area.trim()) {
      nextErrors.area = "Vui lòng nhập diện tích vườn";
    }

    if (!formData.location.trim()) {
      nextErrors.location = "Vui lòng nhập địa chỉ / khu vực vườn";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (loading || !validate()) return;

    setLoading(true);

    setTimeout(() => {
      onSuccess(formData);

      setFormData({
        fullName: "",
        phone: "",
        cropType: "Sầu Riêng (Ri6 / Musang King)",
        area: "",
        location: "",
      });

      setErrors({});
      setLoading(false);
    }, 700);
  };

  const reveal = (delay: number) => ({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? "translateY(0)" : "translateY(36px)",
    transition: `
    opacity 700ms ease ${delay}ms,
    transform 700ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms
  `,
  });

  const inputClass = (field: string) =>
    `w-full min-h-[50px] rounded-xl border bg-slate-50/80 px-4 py-3 text-sm text-slate-900 outline-none transition-all duration-300 placeholder:text-slate-400 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 dark:bg-[#0B1B24] dark:text-white dark:focus:bg-[#10242D] ${
      errors[field]
        ? "border-rose-400 focus:border-rose-500"
        : "border-slate-200 hover:border-slate-300 focus:border-emerald-500 dark:border-slate-700 dark:hover:border-slate-600 dark:focus:border-emerald-500"
    }`;

  const labelClass =
    "mb-2 block text-xs font-bold tracking-wide text-slate-700 dark:text-slate-300";

  return (
    <section
      ref={sectionRef}
      id="booking-section"
      className="relative isolate overflow-hidden bg-[#F5F8F5] px-4 py-16 transition-colors duration-500 dark:bg-[#071510] sm:px-6 sm:py-20 lg:px-8 lg:py-28"
    >
      {/* Background decoration */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-20 -z-10 h-96 w-96 rounded-full bg-emerald-400/10 blur-[100px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 bottom-0 -z-10 h-96 w-96 rounded-full bg-teal-400/10 blur-[100px]"
      />

      <div className="mx-auto max-w-360">
        {/* Section heading */}
        <div
          style={reveal(0)}
          className="mb-10 flex flex-col justify-between gap-5 lg:mb-14 lg:flex-row lg:items-end"
        >
          <div className="max-w-3xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white/80 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.16em] text-emerald-700 shadow-sm dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-400">
              <Sparkles className="h-4 w-4" />
              Trải nghiệm công nghệ VWing
            </div>

            <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-slate-950 dark:text-white sm:text-4xl lg:text-5xl">
              Đưa công nghệ đến
              <span className="mt-1 block bg-linear-to-r from-emerald-600 via-emerald-500 to-teal-400 bg-clip-text text-transparent">
                tận vườn của bạn
              </span>
            </h2>

            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-400 sm:text-base">
              Đăng ký khảo sát thử nghiệm để khám phá cách dữ liệu viễn thám,
              bản đồ 3D và AI hỗ trợ quản lý nông trại hiệu quả hơn.
            </p>
          </div>

          <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-emerald-100 bg-white text-emerald-600 shadow-sm dark:border-emerald-900 dark:bg-[#0D2119] dark:text-emerald-400">
              <ShieldCheck className="h-5 w-5" />
            </span>
            <div>
              <p className="font-bold text-slate-900 dark:text-white">
                Đăng ký miễn phí
              </p>
              <p className="mt-1 text-xs">Đội ngũ VWing sẽ liên hệ tư vấn</p>
            </div>
          </div>
        </div>

        {/* Main layout */}
        <div className="grid items-stretch gap-6 lg:grid-cols-12 lg:gap-8 xl:gap-10">
          {/* Left: Visual and benefits */}
          <div
            style={reveal(150)}
            className="flex min-w-0 flex-col lg:col-span-7"
          >
            <div className="group relative min-h-80 flex-1 overflow-hidden rounded-[28px] bg-[#10271D] shadow-xl shadow-emerald-950/10 sm:min-h-107.5 lg:min-h-125">
              <img
                src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1600&q=85"
                alt="Cảnh quan nông trại xanh nhìn từ trên cao"
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-125 ease-out group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-linear-to-t from-[#061710] via-[#061710]/45 to-[#061710]/5" />
              <div className="absolute inset-0 bg-linear-to-r from-[#061710]/45 via-transparent to-transparent" />

              {/* Floating satellite indicator */}
              <div className="absolute left-5 top-5 flex items-center gap-2 rounded-full border border-white/20 bg-black/25 px-3 py-2 text-xs font-semibold text-white shadow-lg backdrop-blur-xl sm:left-7 sm:top-7">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-300 opacity-70" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                </span>
                VWING FIELD INTELLIGENCE
              </div>

              {/* Bottom image content */}
              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-8 lg:p-10">
                <div className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-emerald-300">
                  <Satellite className="h-4 w-4" />
                  Nông nghiệp chính xác
                </div>

                <h3 className="max-w-xl text-2xl font-extrabold leading-tight text-white sm:text-3xl lg:text-4xl">
                  Hiểu rõ từng vùng trồng.
                  <span className="block text-emerald-300">
                    Chăm sóc đúng từng cây.
                  </span>
                </h3>

                <p className="mt-4 max-w-lg text-sm leading-6 text-white/80 sm:text-base sm:leading-7">
                  Biến dữ liệu nông trại thành thông tin trực quan, giúp bạn
                  nhận diện vấn đề và chủ động hơn trong từng quyết định.
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {["Bản đồ 3D", "Phân tích NDVI", "Dữ liệu AI"].map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-white/20 bg-white/10 px-3 py-2 text-xs font-semibold text-white backdrop-blur-md transition-colors hover:bg-white/20"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Benefit cards */}
            <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
              {[
                {
                  icon: ScanLine,
                  title: "Bản đồ sức khỏe",
                  description: "Quan sát tình trạng tán lá và vùng trồng",
                },
                {
                  icon: Satellite,
                  title: "Dữ liệu trực quan",
                  description: "Hỗ trợ xác định khu vực cần theo dõi",
                },
                {
                  icon: Sprout,
                  title: "Chăm sóc chủ động",
                  description: "Hỗ trợ lập kế hoạch chăm sóc vườn",
                },
              ].map((item, index) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    style={reveal(250 + index * 100)}
                    className="group rounded-2xl border border-slate-200/80 bg-white/80 p-4 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-300 hover:shadow-lg hover:shadow-emerald-950/5 dark:border-slate-800 dark:bg-[#0C2119]/80 dark:hover:border-emerald-900"
                  >
                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 transition-colors group-hover:bg-emerald-600 group-hover:text-white dark:bg-emerald-950/70 dark:text-emerald-400">
                      <Icon className="h-5 w-5" />
                    </div>

                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                      {item.title}
                    </h4>
                    <p className="mt-1.5 text-xs leading-5 text-slate-500 dark:text-slate-400">
                      {item.description}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Service promise */}
            <div className="mt-5 flex items-start gap-3 rounded-2xl border border-emerald-200/80 bg-emerald-50/70 p-4 dark:border-emerald-950 dark:bg-emerald-950/25 sm:p-5">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600 dark:text-emerald-400" />
              <div>
                <p className="text-sm font-bold text-slate-900 dark:text-white">
                  Bắt đầu với một buổi khảo sát thử nghiệm
                </p>
                <p className="mt-1 text-xs leading-6 text-slate-600 dark:text-slate-400 sm:text-sm">
                  Đội ngũ VWing sẽ trao đổi thông tin vườn và tư vấn phương án
                  phù hợp trước khi triển khai.
                </p>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div style={reveal(300)} className="min-w-0 lg:col-span-5">
            <div className="relative h-full overflow-hidden rounded-[28px] border border-slate-200/80 bg-white shadow-xl shadow-slate-900/5 transition-colors duration-300 dark:border-slate-800 dark:bg-[#0C1A26]">
              {/* Form accent */}
              <div className="h-1.5 w-full bg-linear-to-r from-emerald-600 via-emerald-400 to-teal-300" />

              <div className="p-5 sm:p-7 lg:p-8">
                <div className="mb-7">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400">
                    <Sprout className="h-6 w-6" />
                  </div>

                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-700 dark:text-emerald-400">
                    Trial registration
                  </p>

                  <h3 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-950 dark:text-white">
                    Đăng ký khảo sát vườn
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                    Cung cấp một vài thông tin để đội ngũ VWing có thể liên hệ
                    và tư vấn.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                  {/* Contact information */}
                  <div>
                    <div className="mb-4 flex items-center gap-2">
                      <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-slate-100 text-xs font-bold text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                        01
                      </span>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                        Thông tin liên hệ
                      </h4>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label htmlFor="trial-full-name" className={labelClass}>
                          Họ và tên <span className="text-rose-500">*</span>
                        </label>

                        <div className="relative">
                          <UserRound className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                          <input
                            id="trial-full-name"
                            type="text"
                            autoComplete="name"
                            placeholder="Nguyễn Văn A"
                            value={formData.fullName}
                            aria-invalid={Boolean(errors.fullName)}
                            aria-describedby={
                              errors.fullName ? "trial-name-error" : undefined
                            }
                            onChange={(e) =>
                              updateField("fullName", e.target.value)
                            }
                            className={`${inputClass("fullName")} pl-11`}
                          />
                        </div>

                        {errors.fullName && (
                          <p
                            id="trial-name-error"
                            role="alert"
                            className="mt-1.5 text-xs font-medium text-rose-500"
                          >
                            {errors.fullName}
                          </p>
                        )}
                      </div>

                      <div>
                        <label htmlFor="trial-phone" className={labelClass}>
                          Số điện thoại / Zalo{" "}
                          <span className="text-rose-500">*</span>
                        </label>

                        <div className="relative">
                          <Phone className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                          <input
                            id="trial-phone"
                            type="tel"
                            autoComplete="tel"
                            inputMode="tel"
                            placeholder="0912 345 678"
                            value={formData.phone}
                            aria-invalid={Boolean(errors.phone)}
                            aria-describedby={
                              errors.phone ? "trial-phone-error" : undefined
                            }
                            onChange={(e) =>
                              updateField("phone", e.target.value)
                            }
                            className={`${inputClass("phone")} pl-11`}
                          />
                        </div>

                        {errors.phone && (
                          <p
                            id="trial-phone-error"
                            role="alert"
                            className="mt-1.5 text-xs font-medium text-rose-500"
                          >
                            {errors.phone}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-slate-100 dark:border-slate-800" />

                  {/* Farm information */}
                  <div>
                    <div className="mb-4 flex items-center gap-2">
                      <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-slate-100 text-xs font-bold text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                        02
                      </span>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                        Thông tin nông trại
                      </h4>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label htmlFor="trial-crop" className={labelClass}>
                          Loại cây trồng
                        </label>

                        <div className="relative">
                          <Sprout className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-emerald-600 dark:text-emerald-400" />

                          <select
                            id="trial-crop"
                            value={formData.cropType}
                            onChange={(e) =>
                              updateField("cropType", e.target.value)
                            }
                            className={`${inputClass("cropType")} appearance-none pl-11 pr-10`}
                          >
                            {cropOptions.map((crop) => (
                              <option key={crop} value={crop}>
                                {crop}
                              </option>
                            ))}
                          </select>

                          <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="trial-area" className={labelClass}>
                          Diện tích vườn{" "}
                          <span className="text-rose-500">*</span>
                        </label>

                        <div className="relative">
                          <Ruler className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                          <input
                            id="trial-area"
                            type="text"
                            inputMode="decimal"
                            placeholder="Ví dụ: 15 ha"
                            value={formData.area}
                            aria-invalid={Boolean(errors.area)}
                            aria-describedby={
                              errors.area ? "trial-area-error" : undefined
                            }
                            onChange={(e) =>
                              updateField("area", e.target.value)
                            }
                            className={`${inputClass("area")} pl-11`}
                          />
                        </div>

                        {errors.area && (
                          <p
                            id="trial-area-error"
                            role="alert"
                            className="mt-1.5 text-xs font-medium text-rose-500"
                          >
                            {errors.area}
                          </p>
                        )}
                      </div>

                      <div>
                        <label htmlFor="trial-location" className={labelClass}>
                          Địa chỉ / khu vực vườn{" "}
                          <span className="text-rose-500">*</span>
                        </label>

                        <div className="relative">
                          <MapPin className="pointer-events-none absolute left-4 top-4 h-4 w-4 text-slate-400" />

                          <input
                            id="trial-location"
                            type="text"
                            autoComplete="street-address"
                            placeholder="Huyện Cư M'gar, Đắk Lắk"
                            value={formData.location}
                            aria-invalid={Boolean(errors.location)}
                            aria-describedby={
                              errors.location
                                ? "trial-location-error"
                                : undefined
                            }
                            onChange={(e) =>
                              updateField("location", e.target.value)
                            }
                            className={`${inputClass("location")} pl-11`}
                          />
                        </div>

                        {errors.location && (
                          <p
                            id="trial-location-error"
                            role="alert"
                            className="mt-1.5 text-xs font-medium text-rose-500"
                          >
                            {errors.location}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Submit */}
                  <div className="pt-1">
                    <button
                      type="submit"
                      disabled={loading}
                      className="group relative flex min-h-13.5 w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-linear-to-r from-emerald-600 to-emerald-500 px-5 py-4 text-sm font-bold text-white shadow-lg shadow-emerald-600/20 transition-all duration-300 hover:-translate-y-0.5 hover:from-emerald-700 hover:to-emerald-600 hover:shadow-xl hover:shadow-emerald-600/25 active:translate-y-0 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      <span className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/15 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

                      {loading ? (
                        <>
                          <Loader2 className="relative h-5 w-5 animate-spin" />
                          <span className="relative">
                            Đang xử lý thông tin...
                          </span>
                        </>
                      ) : (
                        <>
                          <span className="relative">
                            Đăng ký khảo sát miễn phí
                          </span>
                          <ArrowRight className="relative h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </>
                      )}
                    </button>

                    <div className="mt-4 flex items-start justify-center gap-2 text-center text-[11px] leading-5 text-slate-500 dark:text-slate-400">
                      <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
                      <p>
                        Thông tin của bạn được sử dụng để liên hệ tư vấn khảo
                        sát.
                      </p>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom service steps */}
        <div
          style={reveal(450)}
          className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3"
        >
          {[
            {
              number: "01",
              title: "Gửi thông tin",
              description: "Cung cấp thông tin cơ bản về vườn.",
            },
            {
              number: "02",
              title: "Trao đổi tư vấn",
              description: "VWing liên hệ để trao đổi nhu cầu.",
            },
            {
              number: "03",
              title: "Lên kế hoạch khảo sát",
              description: "Thống nhất phương án và lịch phù hợp.",
            },
          ].map((step) => (
            <div
              key={step.number}
              className="flex items-start gap-4 rounded-2xl border border-slate-200/70 bg-white/70 p-4 transition-all duration-300 hover:border-emerald-200 hover:bg-white dark:border-slate-800 dark:bg-[#0C2119]/60 dark:hover:border-emerald-900 dark:hover:bg-[#0C2119]"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-xs font-extrabold text-emerald-700 dark:bg-emerald-950/70 dark:text-emerald-400">
                {step.number}
              </span>

              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                  {step.title}
                </h4>
                <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div
          style={reveal(550)}
          className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-500 dark:text-slate-400"
        >
          <Clock3 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
          Đội ngũ VWing sẽ trao đổi với bạn về nhu cầu khảo sát sau khi nhận
          được thông tin.
        </div>
      </div>

      {/* Reduced-motion accessibility */}
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          #booking-section [style] {
            opacity: 1 !important;
            transform: none !important;
            transition: none !important;
          }

          #booking-section img,
          #booking-section button,
          #booking-section .group {
            animation: none !important;
            transition: none !important;
          }

          #booking-section .animate-ping {
            animation: none !important;
          }
        }
      `}</style>
    </section>
  );
};

export default TrialBooking;
