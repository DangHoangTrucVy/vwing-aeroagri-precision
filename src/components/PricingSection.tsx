import { ArrowUpRight, Check } from "lucide-react";

const plans = [
  {
    name: "Gói cơ bản S",
    subtitle: "Dành cho vườn dưới 1 ha",
    description: "Giải pháp quản lý vườn cơ bản, phù hợp với quy mô canh tác nhỏ.",
    price: "25.000đ",
    unit: "/ha/tháng",
    features: ["Đầy đủ tính năng cơ bản", "Tư vấn và hỗ trợ kỹ thuật thiết lập vườn"],
    featured: false,
  },
  {
    name: "Gói cơ bản L",
    subtitle: "Dành cho vườn từ 1 ha",
    description: "Quản lý vườn hiệu quả với mức chi phí theo diện tích canh tác.",
    price: "15.000đ",
    unit: "/ha/tháng",
    features: ["Đầy đủ tính năng cơ bản", "Tư vấn và hỗ trợ kỹ thuật thiết lập vườn"],
    featured: false,
  },
  {
    name: "Gói nâng cao",
    subtitle: "Tối ưu quản lý nông trại",
    description: "Tăng cường hỗ trợ công nghệ và tối ưu chi phí vận hành vườn.",
    price: "799.000đ",
    unit: "/năm",
    features: ["Tối ưu chi phí vận hành", "Hỗ trợ AI nâng cao", "Hỗ trợ kỹ thuật và thiết lập", "Hướng dẫn vận hành trực tiếp tại vườn"],
    featured: true,
  },
];

export function PricingSection() {
  const scrollToBooking = () => {
    document.getElementById("booking-section")?.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
      block: "start",
    });
  };

  return (
    <section id="pricing-section" className="scroll-mt-8 px-5 py-8 sm:px-8 lg:px-10">
      <div className="mb-6">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#6b8175]">Đầu tư cho vườn cây</p>
        <h2 className="text-2xl font-medium tracking-[-0.03em] text-[#243d31] sm:text-3xl">Một giải pháp phù hợp với bạn.</h2>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-[#718077]">Lựa chọn theo quy mô canh tác và nhu cầu quản lý. Đội ngũ VWing luôn sẵn sàng tư vấn thêm.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {plans.map((plan) => (
          <article key={plan.name} className={`flex min-w-0 flex-col rounded-[28px] border p-5 lg:p-6 ${plan.featured ? "border-[#426f5b] bg-[#426f5b] text-white" : "border-white/80 bg-white/70 text-[#243d31] backdrop-blur-sm"}`}>
            <div className="flex min-h-7 flex-wrap items-center justify-between gap-2">
              <p className="text-sm font-medium">{plan.name}</p>
              {plan.featured && <span className="rounded-full bg-[#c8dcaa] px-2.5 py-1 text-[10px] font-medium text-[#426044]">Nâng cao</span>}
            </div>
            <h3 className="mt-5 text-xl font-medium leading-snug tracking-tight">{plan.subtitle}</h3>
            <p className={`mt-3 text-sm leading-6 ${plan.featured ? "text-[#ceddd2]" : "text-[#78857b]"}`}>{plan.description}</p>

            <div className={`my-6 border-y py-5 ${plan.featured ? "border-white/15" : "border-[#dfe7de]"}`}>
              <span className="block text-3xl font-medium tracking-[-0.045em]">{plan.price}</span>
              <span className={`mt-1 block text-xs ${plan.featured ? "text-[#c1d2c4]" : "text-[#8b978a]"}`}>{plan.unit}</span>
            </div>

            <ul className="flex-1 space-y-3">
              {plan.features.map((feature) => (
                <li key={feature} className={`flex items-start gap-2.5 text-xs leading-6 ${plan.featured ? "text-[#d9e5dc]" : "text-[#6e7d70]"}`}>
                  <Check className={`mt-1 h-4 w-4 shrink-0 ${plan.featured ? "text-[#c8dcaa]" : "text-[#6d926d]"}`} strokeWidth={1.75} aria-hidden="true" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <button type="button" onClick={scrollToBooking} aria-label={`Đăng ký tư vấn ${plan.name.toLowerCase()}`} className={`mt-7 flex min-h-11 w-full items-center justify-between gap-2 rounded-full px-4 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 ${plan.featured ? "bg-[#d4e4bf] text-[#385640] hover:bg-[#e1edcf] focus-visible:outline-white" : "bg-[#e8eee2] text-[#4e7053] hover:bg-[#dce7d3] focus-visible:outline-[#426f5b]"}`}>
              Đăng ký tư vấn<ArrowUpRight className="h-4 w-4 shrink-0" aria-hidden="true" />
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}

export default PricingSection;
