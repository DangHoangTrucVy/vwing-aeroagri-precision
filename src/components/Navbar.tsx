import React, { useEffect, useState } from "react";
import {
  LayoutGrid,
  Layers3,
  ScanLine,
  Sprout,
  Newspaper,
  CreditCard,
  Headphones,
  ArrowUpRight,
  Menu,
  X,
  Sun,
  Moon,
  UserRound,
} from "lucide-react";
import logo from "../assets/images/logoV.png";
interface NavbarProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
  onOpenAuth: () => void;
  onOpenDemoMission: () => void;
  onScrollToSection: (id: string) => void;
}
const items = [
  { target: "hero-section", label: "Tổng quan", icon: LayoutGrid },
  { target: "intro-section", label: "Về VWing", icon: Layers3 },
  { target: "features-section", label: "Công nghệ", icon: ScanLine },
  { target: "crops-section", label: "Giải pháp cây trồng", icon: Sprout },
  { target: "news-section", label: "Góc kiến thức", icon: Newspaper },
  { target: "pricing-section", label: "Gói dịch vụ", icon: CreditCard },
];
export const Navbar: React.FC<NavbarProps> = ({
  darkMode,
  toggleDarkMode,
  onOpenAuth,
  onOpenDemoMission,
  onScrollToSection,
}) => {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("hero-section");
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-8% 0px -55% 0px", threshold: 0 },
    );
    [...items.map((i) => i.target), "booking-section"].forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (!open) return;
    const close = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", close);
    return () => document.removeEventListener("keydown", close);
  }, [open]);
  const navigate = (id: string) => {
    setActive(id);
    setOpen(false);
    onScrollToSection(id);
  };
  return (
    <>
      <header className="mobile-header">
        <button
          className="brand"
          onClick={() => navigate("hero-section")}
          aria-label="VWing — Trang chủ"
        >
          <img src={logo} alt="" />
          VWing<span className="brand-dot">.</span>
        </button>
        <button
          className="icon-button"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Đóng menu" : "Mở menu"}
          aria-expanded={open}
          aria-controls="main-sidebar"
        >
          {open ? <X size={21} /> : <Menu size={21} />}
        </button>
      </header>
      {open && (
        <button
          className="sidebar-backdrop"
          aria-label="Đóng menu"
          onClick={() => setOpen(false)}
        />
      )}
      <aside
        className={`sidebar ${open ? "is-open" : ""}`}
        id="main-sidebar"
        aria-label="Điều hướng chính"
      >
        <button
          className="brand desktop-brand"
          onClick={() => navigate("hero-section")}
          aria-label="VWing — Trang chủ"
          style={{
            width: "100%",
            height: "70px",
            padding: "0 16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src={logo}
            alt=""
            style={{
              height: "250px",
              width: "auto",
              maxWidth: "none",
              objectFit: "contain",
            }}
          />
        </button>
        <p className="sidebar-caption"></p>
        <nav>
          {items.map(({ target, label, icon: Icon }) => (
            <button
              key={target}
              className={`nav-item ${active === target ? "is-active" : ""}`}
              aria-current={active === target ? "location" : undefined}
              onClick={() => navigate(target)}
            >
              <Icon size={19} strokeWidth={1.6} />
              <span>{label}</span>
              {target === "features-section" && (
                <span className="nav-count">4</span>
              )}
            </button>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <button
            className={`nav-item ${active === "booking-section" ? "is-active" : ""}`}
            onClick={() => navigate("booking-section")}
          >
            <Headphones size={19} strokeWidth={1.6} />
            Tư vấn & hỗ trợ
          </button>
          <button className="nav-item" onClick={onOpenAuth}>
            <UserRound size={19} strokeWidth={1.6} />
            Tài khoản
          </button>
          <button className="nav-item" onClick={toggleDarkMode}>
            {darkMode ? (
              <Sun size={19} strokeWidth={1.6} />
            ) : (
              <Moon size={19} strokeWidth={1.6} />
            )}
            {darkMode ? "Giao diện sáng" : "Giao diện tối"}
          </button>
          <button
            className="sidebar-demo"
            onClick={() => {
              setOpen(false);
              onOpenDemoMission();
            }}
          >
            <span>
              Vườn thông minh, trong tầm tay <ArrowUpRight size={17} />
            </span>
            <strong>Khám phá VWing</strong>
            <small>Trải nghiệm bản demo</small>
            <div className="demo-meter" aria-hidden="true">
              {Array.from({ length: 25 }, (_, i) => (
                <i key={i} className={i > 19 ? "muted" : ""} />
              ))}
            </div>
          </button>
        </div>
      </aside>
    </>
  );
};
