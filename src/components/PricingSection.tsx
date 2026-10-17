
const plans = [
  {
    name: "Gói cơ bản S",
    subtitle: "Dành cho vườn dưới 1 ha",
    description:
      "Giải pháp quản lý vườn cơ bản, phù hợp với quy mô canh tác nhỏ.",
    price: "25.000đ",
    unit: "/ha/tháng",
    features: [
      "Đầy đủ tính năng cơ bản",
      "Tư vấn và hỗ trợ kỹ thuật thiết lập vườn",
    ],
    featured: false,
  },
  {
    name: "Gói cơ bản L",
    subtitle: "Dành cho vườn từ 1 ha",
    description:
      "Quản lý vườn hiệu quả với mức chi phí theo diện tích canh tác.",
    price: "15.000đ",
    unit: "/ha/tháng",
    features: [
      "Đầy đủ tính năng cơ bản",
      "Tư vấn và hỗ trợ kỹ thuật thiết lập vườn",
    ],
    featured: false,
  },
  {
    name: "Gói nâng cao",
    subtitle: "Tối ưu quản lý nông trại",
    description:
      "Tăng cường hỗ trợ công nghệ và tối ưu chi phí vận hành vườn.",
    price: "799.000đ",
    unit: "/năm",
    features: [
      "Tối ưu chi phí vận hành",
      "Hỗ trợ AI nâng cao",
      "Hỗ trợ kỹ thuật và thiết lập",
      "Hướng dẫn vận hành trực tiếp tại vườn",
    ],
    featured: true,
  },
];

function CheckIcon({ featured = false }: { featured?: boolean }) {
  return (
    <span
      className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
        featured
          ? "bg-blue-500 text-white"
          : "bg-emerald-500/15 text-emerald-600 dark:bg-emerald-400/15 dark:text-emerald-400"
      }`}
      aria-hidden="true"
    >
      <svg viewBox="0 0 20 20" fill="none" className="h-3.5 w-3.5">
        <path
          d="m4 10 4 4 8-8"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

export function PricingSection() {
  return (
    <section
      id="pricing-section"
      className="relative w-full overflow-hidden bg-[#F7F8F5] px-5 py-16 text-slate-950 transition-colors duration-300 dark:bg-[#07131E] dark:text-slate-100 sm:px-8 sm:py-20 lg:px-12 lg:py-24 xl:px-16"
    >
      <div className="mx-auto w-full max-w-360">
        {/* Heading */}
        <div className="mb-10 lg:mb-12">
          <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-emerald-700 dark:text-emerald-400 sm:text-sm">
            VWING · PRICING
          </p>

          <h2 className="mt-3 text-3xl font-black leading-tight tracking-tight text-slate-950 dark:text-white sm:text-4xl lg:text-5xl">
            Bảng giá giải pháp VWing
          </h2>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-300 sm:text-base">
            Lựa chọn giải pháp phù hợp với quy mô canh tác và nhu cầu
            quản lý nông trại của bạn.
          </p>
        </div>

        {/* Pricing cards */}
        <div className="grid grid-cols-1 items-stretch gap-5 md:grid-cols-2 xl:grid-cols-3 xl:gap-6">
          {plans.map((plan) => (
            <article
              key={plan.name}
              className={`relative flex h-full min-w-0 flex-col rounded-3xl border p-6 transition duration-300 hover:-translate-y-1 hover:shadow-xl sm:p-7 lg:p-8 ${
                plan.featured
                  ? "border-blue-300 bg-linear-to-b from-white to-blue-50 shadow-md shadow-blue-900/5 dark:border-blue-500/50 dark:from-[#122438] dark:to-[#0D1B2C] dark:shadow-blue-950/20"
                  : "border-slate-200 bg-white shadow-sm shadow-slate-900/5 dark:border-slate-700 dark:bg-[#0D1D2A] dark:shadow-black/10"
              }`}
            >
              {/* Plan name */}
              <div className="flex min-h-8 items-center justify-between gap-2">
                <span
                  className={`text-sm font-bold ${
                    plan.featured
                      ? "text-blue-700 dark:text-blue-300"
                      : "text-slate-900 dark:text-slate-100"
                  }`}
                >
                  {plan.name}
                </span>

                {plan.featured && (
                  <span className="rounded-full bg-blue-100 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-blue-700 dark:bg-blue-400/15 dark:text-blue-300 sm:text-xs">
                    Nâng cao
                  </span>
                )}
              </div>

              {/* Title and description */}
              <h3 className="mt-7 text-2xl font-bold leading-tight tracking-tight text-slate-950 dark:text-white sm:text-3xl">
                {plan.subtitle}
              </h3>

              <p className="mt-3 min-h-14 text-sm leading-6 text-slate-600 dark:text-slate-300">
                {plan.description}
              </p>

              {/* Price */}
              <div className="mt-6 border-t border-slate-200/80 pt-6 dark:border-slate-700">
                <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                  <span className="text-3xl font-semibold tracking-tight text-slate-950 dark:text-white sm:text-4xl">
                    {plan.price}
                  </span>

                  <span className="text-sm text-slate-500 dark:text-slate-400">
                    {plan.unit}
                  </span>
                </div>
              </div>

              {/* Features */}
              <ul className="mt-7 flex-1 space-y-4">
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-3 text-sm leading-6 text-slate-700 dark:text-slate-300"
                  >
                    <CheckIcon featured={plan.featured} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              {/* Bottom label */}
              <div
                className={`mt-8 rounded-xl px-4 py-3 text-center text-sm font-semibold transition-colors ${
                  plan.featured
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "border border-slate-200 bg-slate-50 text-slate-700 dark:border-slate-700 dark:bg-[#142737] dark:text-slate-200"
                }`}
              >
                {plan.featured
                  ? "Giải pháp nâng cao"
                  : "Giải pháp cơ bản"}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default PricingSection;
