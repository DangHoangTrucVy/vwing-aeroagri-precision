import React from "react";
import { CropType } from "../types";
import {
  ArrowUpRight,
  ArrowRight,
  MapPin,
  MoveUpRight,
  Leaf,
  ScanLine,
  Satellite,
  Sprout,
} from "lucide-react";
import heroImage from "../assets/images/hero_drone_orchard_1791883988500.jpg";
import mapImage from "../assets/images/daklak.png";
interface HeroSectionProps {
  onConsultClick: () => void;
  onExploreFeatures: () => void;
  onOpenLiveTelemetry: () => void;
  onExploreCrop: (crop: CropType) => void;
}
export const HeroSection: React.FC<HeroSectionProps> = ({
  onConsultClick,
  onExploreFeatures,
  onOpenLiveTelemetry,
  onExploreCrop,
}) => {
  const showCrops = () =>
    document
      .getElementById("crops-section")
      ?.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "auto"
          : "smooth",
      });
  return (
    <section id="hero-section" className="overview-section">
      <div className="overview-background" aria-hidden="true">
        <img src={heroImage} alt="" />
      </div>
      <div className="overview-topline">
        <span className="eyebrow">
          <span className="status-dot" /> DỮ LIỆU TỐT HƠN. MÙA VỤ TỐT HƠN.
        </span>
        <span className="region-label">
          <MapPin size={14} />
          Từ Tây Nguyên, cho nhà vườn Việt
        </span>
      </div>
      <div className="overview-grid">
        <div className="hero-copy">
          <p className="hero-kicker">Cùng bạn chăm từng tán cây</p>
          <h1>
            Hiểu vườn,
            <br />
            <span>chăm cây tốt hơn.</span>
          </h1>
          <p className="hero-description">
            Kết nối dữ liệu drone, viễn thám và AI. Biến những điều khó thấy
            thành quyết định dễ dàng cho khu vườn của bạn.
          </p>
          <div className="hero-actions">
            <button className="primary-button" onClick={onConsultClick}>
              Tư vấn giải pháp <ArrowUpRight size={18} />
            </button>
            <button className="text-button" onClick={onExploreFeatures}>
              Khám phá công nghệ <ArrowRight size={17} />
            </button>
          </div>
          <div className="hero-stats">
            <div>
              <strong>
                01<span> nền tảng</span>
              </strong>
              <p>Kết nối cả khu vườn</p>
            </div>
            <div>
              <strong>
                04<span> công nghệ</span>
              </strong>
              <p>Thấu hiểu từng tán cây</p>
            </div>
            <div>
              <strong>
                03<span> nhóm cây</span>
              </strong>
              <p>Giải pháp chuyên biệt</p>
            </div>
          </div>
        </div>
        <article className="garden-card glass-card">
          <div className="card-heading">
            <h2>Khu vườn trong tầm mắt</h2>
            <button
              onClick={onOpenLiveTelemetry}
              className="icon-button"
              aria-label="Mở bản demo khu vườn"
            >
              <ArrowUpRight size={19} />
            </button>
          </div>
          <div className="garden-image">
            <img src={mapImage} alt="Bản đồ khu vườn minh họa tại Đắk Lắk" />
            <span>
              <span className="status-dot" /> Bản demo
            </span>
            <button
              onClick={onOpenLiveTelemetry}
              className="map-expand"
              aria-label="Khám phá bản đồ khu vườn"
            >
              <MoveUpRight size={19} />
            </button>
          </div>
          <div className="garden-location">
            <div>
              <strong>Vườn Krông Pắc</strong>
              <p>
                <MapPin size={12} /> Đắk Lắk, Việt Nam
              </p>
            </div>
            <span className="soft-badge">Vườn sầu riêng</span>
          </div>
          <div className="garden-capabilities">
            <span>
              <Satellite size={15} /> Viễn thám
            </span>
            <span>
              <ScanLine size={15} /> Quét tán cây
            </span>
          </div>
        </article>
      </div>
      <div className="overview-cards">
        <article className="insight-card">
          <div className="card-heading">
            <h2>Nhìn sâu hơn. Chăm đúng hơn.</h2>
            <button
              className="icon-button"
              aria-label="Khám phá công nghệ phân tích"
              onClick={onExploreFeatures}
            >
              <ArrowUpRight size={19} />
            </button>
          </div>
          <strong className="insight-title">
            Một góc nhìn mới
            <br />
            cho khu vườn của bạn.
          </strong>
          <p>Từ tán cây đến sức khỏe mùa vụ.</p>
          <img
            className="insight-photo"
            src={heroImage}
            alt="Drone quan sát vườn cây từ trên cao"
          />
          <div className="insight-bottom">
            <span>
              <span className="status-dot" /> Quan sát · Phân tích · Tối ưu
            </span>
            <Leaf size={18} />
          </div>
        </article>
        <article className="journey-card glass-card">
          <div className="card-heading">
            <h2>Bắt đầu cùng VWing</h2>
            <button
              className="icon-button"
              onClick={onConsultClick}
              aria-label="Đăng ký tư vấn"
            >
              <ArrowUpRight size={19} />
            </button>
          </div>
          <strong className="card-large-title">Đơn giản từ bước đầu.</strong>
          <p className="muted-copy">Cùng bạn tìm giải pháp phù hợp.</p>
          <ol className="journey-list">
            {[
              ["Chia sẻ về khu vườn", "Loại cây, diện tích & nhu cầu"],
              ["Tư vấn giải pháp", "Đồng hành cùng đội ngũ VWing"],
              ["Trải nghiệm thực tế", "Khám phá dữ liệu khu vườn"],
            ].map(([title, text], i) => (
              <li key={title}>
                <span>0{i + 1}</span>
                <div>
                  <strong>{title}</strong>
                  <p>{text}</p>
                </div>
                <ArrowUpRight size={16} />
              </li>
            ))}
          </ol>
          <button className="text-button" onClick={onConsultClick}>
            Đặt lịch tư vấn <ArrowRight size={16} />
          </button>
        </article>
        <article className="crop-overview-card glass-card">
          <div className="card-heading">
            <h2>Dành cho vườn cây của bạn</h2>
            <button
              className="icon-button"
              onClick={showCrops}
              aria-label="Khám phá giải pháp cây trồng"
            >
              <ArrowUpRight size={19} />
            </button>
          </div>
          <strong className="card-large-title">Hiểu từng loại cây.</strong>
          <p className="muted-copy">Chuyên biệt cho cây lâu năm.</p>
          <div className="crop-tiles">
            <button
              onClick={() => onExploreCrop("durian")}
              className="crop-tile durian"
            >
              <Sprout size={24} />
              <span>Sầu riêng</span>
              <small>Chăm sóc từ gốc đến tán</small>
              <ArrowUpRight size={20} />
            </button>
            <button
              onClick={() => onExploreCrop("coffee")}
              className="crop-tile coffee"
            >
              <Leaf size={20} />
              <span>Cà phê</span>
              <ArrowUpRight size={16} />
            </button>
            <button
              onClick={() => onExploreCrop("avocado")}
              className="crop-tile macadamia"
            >
              <Sprout size={20} />
              <span>Macca & bơ</span>
              <ArrowUpRight size={16} />
            </button>
          </div>
        </article>
      </div>
      <div className="overview-footnote">
        <span>VWING · PRECISION AGRICULTURE</span>
        <span>Công nghệ gần gũi hơn. Canh tác chủ động hơn.</span>
      </div>
    </section>
  );
};
