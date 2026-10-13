import React, { useEffect, useRef, useState } from "react";
import { newsArticles } from "../data/mockData";
import { NewsArticle } from "../types";
import {
  Newspaper,
  ArrowUpRight,
  CalendarDays,
  Clock3,
  Sparkles,
  Satellite,
  Sprout,
  Drone,
  ChevronRight,
} from "lucide-react";

interface PressResearchProps {
  onSelectArticle: (article: NewsArticle) => void;
}

const categories = [
  "Tất cả",
  "AI & Drone",
  "Viễn thám",
  "Nông nghiệp chính xác",
  "Nghiên cứu",
];

const articleImages = [
  {
    image:
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=85",
    category: "Nông nghiệp chính xác",
    readTime: "5 phút đọc",
  },
  {
    image:
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=900&q=85",
    category: "Viễn thám",
    readTime: "7 phút đọc",
  },
  {
    image:
      "https://images.unsplash.com/photo-1499529112087-3cb3b73cec95?auto=format&fit=crop&w=900&q=85",
    category: "AI & Drone",
    readTime: "4 phút đọc",
  },
  {
    image:
      "https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=900&q=85",
    category: "Nghiên cứu",
    readTime: "6 phút đọc",
  },
  {
    image:
      "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=900&q=85",
    category: "Nông nghiệp chính xác",
    readTime: "5 phút đọc",
  },
];

export const PressResearch: React.FC<PressResearchProps> = ({
  onSelectArticle,
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState("Tất cả");

  
useEffect(() => {
  const section = sectionRef.current;
  if (!section) return;

  const observer = new IntersectionObserver(
    ([entry]) => {
      setIsVisible(entry.isIntersecting);
    },
    {
      threshold: 0.08,
      rootMargin: "0px 0px -40px 0px",
    },
  );

  observer.observe(section);

  return () => observer.disconnect();
}, []);


  const articles = newsArticles.map((article, index) => ({
    article,
    image: articleImages[index % articleImages.length],
    index,
  }));

  const filteredArticles =
    activeCategory === "Tất cả"
      ? articles
      : articles.filter(
          ({ image }) => image.category === activeCategory,
        );

  const featuredArticle = filteredArticles[0];
  const remainingArticles = filteredArticles.slice(1);

  const getReadLabel = (index: number) => {
    const labels = [
      "Đọc bài phân tích",
      "Xem tài liệu nghiên cứu",
      "Khám phá công nghệ",
      "Đọc bài phóng sự",
      "Xem phân tích chuyên sâu",
    ];

    return labels[index % labels.length];
  };

  const animationStyle = (index: number) => ({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? "translateX(0)" : "translateX(64px)",
    transition: `
      opacity 700ms ease ${index * 130}ms,
      transform 700ms cubic-bezier(0.22, 1, 0.36, 1) ${index * 130}ms
    `,
  });

  return (
    <section
      ref={sectionRef}
      id="news-section"
      className="relative w-full overflow-hidden bg-[#F6F8FC] px-4 py-14 transition-colors duration-300 dark:bg-[#07131D] sm:px-6 sm:py-20 lg:px-8 xl:px-10"
    >
      {/* Decorative background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 top-0 h-80 w-80 rounded-full bg-emerald-400/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 bottom-0 h-72 w-72 rounded-full bg-sky-400/10 blur-3xl"
      />

      <div className="relative mx-auto max-w-[1600px]">
        {/* Header */}
        <div
          style={animationStyle(0)}
          className="mb-8 flex flex-col justify-between gap-5 lg:mb-10 lg:flex-row lg:items-end"
        >
          <div className="max-w-3xl">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white/80 px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-700 shadow-sm dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-400 sm:text-xs">
              <Newspaper className="h-4 w-4" />
              Tin tức & tri thức
              <span className="h-1 w-1 rounded-full bg-emerald-500" />
              VWing Insights
            </div>

            <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-slate-950 dark:text-white sm:text-4xl lg:text-5xl">
              Báo chí & Nghiên cứu
              <span className="mt-1 block bg-linear-to-r from-emerald-600 via-emerald-500 to-teal-400 bg-clip-text text-transparent">
                Viễn thám nông nghiệp
              </span>
            </h2>

            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-400 sm:text-base">
              Cập nhật xu hướng AI, drone, dữ liệu vệ tinh và những giải pháp
              công nghệ đang thay đổi nền nông nghiệp hiện đại.
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              if (newsArticles.length > 0) {
                onSelectArticle(newsArticles[0]);
              }
            }}
            className="group inline-flex min-h-11 w-fit items-center gap-2 rounded-full border border-emerald-200 bg-white px-5 py-3 text-sm font-bold text-emerald-700 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-emerald-500 hover:bg-emerald-50 hover:shadow-lg dark:border-emerald-900 dark:bg-[#0C1A26] dark:text-emerald-400 dark:hover:bg-emerald-950/50"
          >
            Xem tất cả bài viết
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>

        {/* Category filters */}
        <div
          style={animationStyle(1)}
          className="mb-7 flex gap-2 overflow-x-auto pb-2"
        >
          {categories.map((category) => {
            const active = activeCategory === category;

            return (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`shrink-0 rounded-full border px-4 py-2.5 text-xs font-semibold transition-all duration-300 sm:text-sm ${
                  active
                    ? "border-emerald-600 bg-emerald-600 text-white shadow-md shadow-emerald-600/20"
                    : "border-slate-200 bg-white/80 text-slate-600 hover:border-emerald-300 hover:text-emerald-700 dark:border-slate-800 dark:bg-[#0C1A26] dark:text-slate-300 dark:hover:border-emerald-800 dark:hover:text-emerald-400"
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* Featured article */}
        {featuredArticle && (
          <article
            key={`featured-${activeCategory}-${featuredArticle.article.id}`}
            role="button"
            tabIndex={0}
            aria-label={`Đọc bài viết: ${featuredArticle.article.title}`}
            onClick={() => onSelectArticle(featuredArticle.article)}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                onSelectArticle(featuredArticle.article);
              }
            }}
            style={animationStyle(2)}
            className="group mb-8 grid cursor-pointer overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-sm transition-all duration-500 hover:-translate-y-1 hover:border-emerald-300 hover:shadow-2xl hover:shadow-emerald-950/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 dark:border-slate-800 dark:bg-[#0C1A26] dark:hover:border-emerald-800 lg:grid-cols-[1.15fr_1fr]"
          >
            {/* Featured image */}
            <div className="relative min-h-62.5 overflow-hidden sm:min-h-85 lg:min-h-97.5">
              <img
                src={featuredArticle.image.image}
                alt="Khung cảnh nông nghiệp và vùng canh tác"
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-linear-to-t from-slate-950/75 via-slate-950/10 to-transparent" />

              <div className="absolute left-5 top-5 flex items-center gap-2 rounded-full border border-white/30 bg-slate-950/35 px-3 py-2 text-xs font-semibold text-white backdrop-blur-md sm:left-6 sm:top-6">
                <Sparkles className="h-4 w-4 text-emerald-300" />
                Bài viết nổi bật
              </div>

              <div className="absolute bottom-5 left-5 right-5 sm:bottom-6 sm:left-6 sm:right-6">
                <span className="mb-3 inline-flex rounded-full bg-emerald-500 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-white sm:text-xs">
                  {featuredArticle.image.category}
                </span>

                <p className="flex items-center gap-2 text-xs font-medium text-white/80 sm:text-sm">
                  <CalendarDays className="h-3.5 w-3.5" />
                  {featuredArticle.article.date}
                  <span className="h-1 w-1 rounded-full bg-white/60" />
                  <Clock3 className="h-3.5 w-3.5" />
                  {featuredArticle.image.readTime}
                </p>
              </div>
            </div>

            {/* Featured content */}
            <div className="flex flex-col justify-center p-5 sm:p-8 lg:p-10">
              <div className="mb-4 flex items-center gap-2 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                <span className="h-px w-7 bg-emerald-500" />
                {featuredArticle.article.publisher}
              </div>

              <h3 className="text-xl font-extrabold leading-snug tracking-tight text-slate-950 transition-colors group-hover:text-emerald-700 dark:text-white dark:group-hover:text-emerald-400 sm:text-2xl lg:text-3xl">
                {featuredArticle.article.title}
              </h3>

              <p className="mt-4 line-clamp-4 text-sm leading-7 text-slate-600 dark:text-slate-400 sm:text-base">
                {featuredArticle.article.summary}
              </p>

              <div className="mt-7 flex items-center justify-between border-t border-slate-100 pt-5 dark:border-slate-800">
                <span className="text-sm font-bold text-emerald-700 dark:text-emerald-400">
                  {getReadLabel(featuredArticle.index)}
                </span>

                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-50 text-emerald-700 transition-all duration-300 group-hover:bg-emerald-600 group-hover:text-white dark:bg-emerald-950/60 dark:text-emerald-400">
                  <ArrowUpRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </div>
            </div>
          </article>
        )}

        {/* Remaining articles */}
        {remainingArticles.length > 0 && (
          <div className="mb-5 flex items-center justify-between gap-3">
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white sm:text-xl">
                Khám phá thêm
              </h3>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 sm:text-sm">
                Những góc nhìn mới về công nghệ nông nghiệp
              </p>
            </div>

            <div className="hidden items-center gap-1 text-xs font-medium text-slate-500 dark:text-slate-400 sm:flex">
              <Satellite className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              Agriculture intelligence
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {remainingArticles.map(({ article, image, index }, cardIndex) => (
            <article
              key={article.id}
              role="button"
              tabIndex={0}
              aria-label={`Đọc bài viết: ${article.title}`}
              onClick={() => onSelectArticle(article)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  onSelectArticle(article);
                }
              }}
              style={animationStyle(cardIndex + 3)}
              className="group flex min-w-0 cursor-pointer flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-300 hover:shadow-xl hover:shadow-slate-900/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 dark:border-slate-800 dark:bg-[#0C1A26] dark:hover:border-emerald-800 dark:hover:shadow-black/20"
            >
              {/* Thumbnail */}
              <div className="relative aspect-video overflow-hidden bg-slate-100 dark:bg-slate-900">
                <img
                  src={image.image}
                  alt={`Ảnh minh họa: ${article.title}`}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-linear-to-t from-slate-950/45 to-transparent opacity-70 transition-opacity group-hover:opacity-100" />

                <span className="absolute left-3 top-3 rounded-full border border-white/30 bg-slate-950/40 px-2.5 py-1.5 text-[10px] font-semibold text-white backdrop-blur-md">
                  {image.category}
                </span>

                <span className="absolute bottom-3 right-3 flex h-9 w-9 translate-y-2 items-center justify-center rounded-full bg-white text-emerald-700 opacity-0 shadow-lg transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </div>

              {/* Card content */}
              <div className="flex flex-1 flex-col p-4 sm:p-5">
                <div className="mb-3 flex items-center justify-between gap-2 text-[10px] text-slate-500 dark:text-slate-400 sm:text-xs">
                  <span className="flex min-w-0 items-center gap-1.5 font-semibold text-slate-700 dark:text-slate-300">
                    <Newspaper className="h-3.5 w-3.5 shrink-0 text-emerald-600 dark:text-emerald-400" />
                    <span className="truncate">{article.publisher}</span>
                  </span>

                  <span className="shrink-0">{article.date}</span>
                </div>

                <h4 className="line-clamp-3 text-base font-bold leading-snug text-slate-900 transition-colors group-hover:text-emerald-700 dark:text-white dark:group-hover:text-emerald-400 sm:text-lg">
                  {article.title}
                </h4>

                <p className="mt-3 line-clamp-3 flex-1 text-xs leading-6 text-slate-600 dark:text-slate-400 sm:text-sm">
                  {article.summary}
                </p>

                <div className="mt-5 flex items-center justify-between gap-2 border-t border-slate-100 pt-4 text-xs font-bold text-slate-700 transition-colors group-hover:text-emerald-700 dark:border-slate-800 dark:text-slate-300 dark:group-hover:text-emerald-400 sm:text-sm">
                  <span>{getReadLabel(index)}</span>
                  <ChevronRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Empty state */}
        {filteredArticles.length === 0 && (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white/70 px-5 py-12 text-center dark:border-slate-700 dark:bg-[#0C1A26]">
            <Sprout className="mx-auto h-9 w-9 text-emerald-600 dark:text-emerald-400" />
            <p className="mt-3 font-semibold text-slate-800 dark:text-white">
              Chưa có bài viết trong danh mục này
            </p>
            <button
              type="button"
              onClick={() => setActiveCategory("Tất cả")}
              className="mt-3 text-sm font-semibold text-emerald-700 hover:underline dark:text-emerald-400"
            >
              Xem tất cả bài viết
            </button>
          </div>
        )}

        {/* Bottom note */}
        <div
          style={animationStyle(articles.length + 3)}
          className="mt-8 flex flex-col gap-3 rounded-2xl border border-emerald-100 bg-linear-to-r from-emerald-50 via-white to-sky-50 p-4 dark:border-emerald-950 dark:from-emerald-950/30 dark:via-[#0C1A26] dark:to-sky-950/20 sm:flex-row sm:items-center sm:justify-between sm:p-5"
        >
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-400">
              <Satellite className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900 dark:text-white">
                Nông nghiệp thông minh bắt đầu từ dữ liệu
              </p>
              <p className="mt-1 text-xs leading-5 text-slate-600 dark:text-slate-400 sm:text-sm">
                Cùng VWing khám phá những ứng dụng công nghệ mới trong quản lý
                và phát triển vùng trồng.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              if (newsArticles.length > 0) {
                onSelectArticle(newsArticles[0]);
              }
            }}
            className="group inline-flex min-h-10 shrink-0 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-xs font-bold text-white transition-all hover:bg-emerald-700 hover:shadow-lg hover:shadow-emerald-600/20 sm:text-sm"
          >
            Khám phá VWing
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>

      {/* Reduced-motion accessibility */}
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          #news-section [style] {
            opacity: 1 !important;
            transform: none !important;
            transition: none !important;
          }

          #news-section img {
            transition: none !important;
          }
        }
      `}</style>
    </section>
  );
};

export default PressResearch;