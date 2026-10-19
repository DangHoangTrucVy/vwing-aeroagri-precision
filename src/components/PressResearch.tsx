import React, { useState } from "react";
import { ArrowUpRight, Clock3 } from "lucide-react";
import { newsArticles } from "../data/mockData";
import { NewsArticle } from "../types";
import droneOrchard from "../assets/images/hero_drone_orchard_1791883988500.jpg";
import orchardCanopy from "../assets/images/orchard_canopy_lidar_1791883989473.jpg";
import daklakMap from "../assets/images/daklak.png";

interface PressResearchProps {
  onSelectArticle: (article: NewsArticle) => void;
}

const categories = ["Tất cả", "AI & Drone", "Viễn thám", "Nông nghiệp chính xác", "Nghiên cứu"];
const articleTopics = ["Nông nghiệp chính xác", "Viễn thám", "AI & Drone", "Nghiên cứu", "Nông nghiệp chính xác"];
const articleImages = [
  { src: droneOrchard, alt: "Hình minh họa drone quan sát vườn cây" },
  { src: daklakMap, alt: "Hình minh họa bản đồ khu vực Đắk Lắk" },
  { src: orchardCanopy, alt: "Hình minh họa dữ liệu tán cây" },
];

export const PressResearch: React.FC<PressResearchProps> = ({ onSelectArticle }) => {
  const [activeCategory, setActiveCategory] = useState("Tất cả");
  const articles = newsArticles.map((article, index) => ({
    article,
    topic: articleTopics[index % articleTopics.length],
    image: articleImages[index % articleImages.length],
  }));
  const filteredArticles = activeCategory === "Tất cả" ? articles : articles.filter(({ topic }) => topic === activeCategory);

  return (
    <section id="news-section" className="scroll-mt-8 px-5 py-8 sm:px-8 lg:px-10">
      <div className="mb-6">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#6b8175]">Góc nhìn VWing</p>
        <h2 className="text-2xl font-medium tracking-[-0.03em] text-[#243d31] sm:text-3xl">Tin tức & tri thức nông nghiệp.</h2>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-[#718077]">Khám phá những góc nhìn về drone, viễn thám và ứng dụng dữ liệu trong chăm sóc vườn cây.</p>
      </div>

      <div className="mb-5 flex flex-wrap gap-2" aria-label="Lọc bài viết theo chủ đề">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setActiveCategory(category)}
            aria-pressed={activeCategory === category}
            className={`min-h-11 rounded-full px-4 py-2 text-xs transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#426f5b] sm:text-sm ${activeCategory === category ? "bg-[#426f5b] text-white" : "bg-white/70 text-[#718077] hover:bg-[#e2eadc]"}`}
          >
            {category}
          </button>
        ))}
      </div>

      <p className="mb-4 text-xs text-[#879283]" role="status">{filteredArticles.length} bài viết</p>
      <div className="grid gap-4 sm:grid-cols-2">
        {filteredArticles.map(({ article, topic, image }) => (
          <article key={article.id} className="flex min-w-0 flex-col overflow-hidden rounded-[28px] border border-white/80 bg-white/70 backdrop-blur-sm">
            <div className="relative h-32 overflow-hidden bg-[#e1e9dc]">
              <img src={image.src} alt={image.alt} loading="lazy" className="h-full w-full object-cover" />
              <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1.5 text-[10px] font-medium text-[#426f5b] backdrop-blur-sm">{topic}</span>
            </div>
            <div className="flex flex-1 flex-col p-5 sm:p-6">
              <div className="mb-3 flex flex-wrap items-center justify-between gap-x-3 gap-y-1 text-[10px] leading-5 text-[#8a9787]">
                <span className="font-medium text-[#6d836b]">{article.publisher}</span>
                <span>{article.date}</span>
              </div>
              <h3 className="text-lg font-medium leading-snug tracking-[-0.02em] text-[#304b38]">{article.title}</h3>
              <p className="mt-3 flex-1 text-xs leading-6 text-[#788575]">{article.summary}</p>
              <div className="mt-4 flex items-center justify-between gap-3 border-t border-[#e0e7db] pt-3">
                <span className="flex shrink-0 items-center gap-1.5 text-[10px] text-[#8c9888]"><Clock3 className="h-3 w-3" aria-hidden="true" />{article.readTime} đọc</span>
                <button type="button" onClick={() => onSelectArticle(article)} aria-label={`Đọc bài viết: ${article.title}`} className="flex min-h-11 items-center gap-2 rounded-lg px-1 text-xs font-medium text-[#426f5b] transition-colors hover:text-[#243d31] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#426f5b]">
                  Đọc bài viết<ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      {filteredArticles.length === 0 && (
        <div className="rounded-[28px] border border-white/80 bg-white/70 p-8 text-center text-sm text-[#718077]">
          <p>Chưa có bài viết trong chủ đề này.</p>
          <button type="button" onClick={() => setActiveCategory("Tất cả")} className="mt-4 min-h-11 rounded-full bg-[#e2eadc] px-5 text-[#426f5b] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#426f5b]">Xem tất cả bài viết</button>
        </div>
      )}
    </section>
  );
};

export default PressResearch;
