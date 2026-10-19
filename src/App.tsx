import React, { useState, useEffect } from "react";
import { ArrowUpRight } from "lucide-react";

import { Navbar } from "./components/Navbar";
import { HeroSection } from "./components/HeroSection";
import { TechnologyIntro } from "./components/TechnologyIntro";
import { FeatureShowcase } from "./components/FeatureShowcase";
import { CropSolutions } from "./components/CropSolutions";
import { PressResearch } from "./components/PressResearch";
import { TrialBooking } from "./components/TrialBooking";
import { Footer } from "./components/Footer";
import { MobileBottomBar } from "./components/MobileBottomBar";

import { MissionTelemetryModal } from "./components/modals/MissionTelemetryModal";
import { PathogenScanModal } from "./components/modals/PathogenScanModal";
import { TerrainFollowModal } from "./components/modals/TerrainFollowModal";
import { DigitalPassportModal } from "./components/modals/DigitalPassportModal";
import { ArticleModal } from "./components/modals/ArticleModal";
import { AuthModal } from "./components/modals/AuthModal";
import { SuccessModal } from "./components/modals/SuccessModal";

import { activeMission } from "./data/mockData";
import { NewsArticle, CropType } from "./types";

import PricingSection from "./components/PricingSection";

export default function App() {
  const [selectedCrop, setSelectedCrop] = useState<CropType>('durian');
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("vwing_theme");

      if (saved) return saved === "dark";

      return false;
    }

    return false;
  });

  // Modal states
  const [isTelemetryOpen, setIsTelemetryOpen] = useState(false);
  const [isPathogenOpen, setIsPathogenOpen] = useState(false);
  const [isTerrainOpen, setIsTerrainOpen] = useState(false);
  const [isPassportOpen, setIsPassportOpen] = useState(false);

  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(
    null,
  );

  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [submittedBooking, setSubmittedBooking] = useState<any | null>(null);

  const modalOpen = isTelemetryOpen || isPathogenOpen || isTerrainOpen || isPassportOpen || !!selectedArticle || isAuthOpen || !!submittedBooking;
  useEffect(() => {
    if (!modalOpen) return;
    const previousOverflow = document.body.style.overflow;
    const returnFocus = document.activeElement as HTMLElement | null;
    document.body.style.overflow = 'hidden';
    const dialog = document.querySelector<HTMLElement>('[role="dialog"]');
    const focusable = () => Array.from(dialog?.querySelectorAll<HTMLElement>('button, a[href], input, select, textarea, [tabindex="0"]') || []).filter(el => el.getClientRects().length && !el.hasAttribute('disabled'));
    focusable()[0]?.focus();
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsTelemetryOpen(false); setIsPathogenOpen(false); setIsTerrainOpen(false); setIsPassportOpen(false); setSelectedArticle(null); setIsAuthOpen(false); setSubmittedBooking(null);
      }
      if (event.key === 'Tab') {
        const elements = focusable();
        const first = elements[0]; const last = elements[elements.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
        if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
      }
    };
    document.addEventListener('keydown', handleKey);
    return () => { document.body.style.overflow = previousOverflow; document.removeEventListener('keydown', handleKey); returnFocus?.focus(); };
  }, [modalOpen]);

  // Sync dark mode
  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("vwing_theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  // Smooth scrolling for navigation
  const scrollToSection = (sectionId: string) => {
    if (sectionId === 'hero-section') {
      window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
      return;
    }
    const element = document.getElementById(sectionId);

    if (element) {
      element.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "auto"
          : "smooth",
        block: "start",
      });
    }
  };

  return (
    <div className="vwing-app">
      {/* Navigation */}
      <Navbar
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
        onOpenAuth={() => setIsAuthOpen(true)}
        onOpenDemoMission={() => setIsTelemetryOpen(true)}
        onScrollToSection={scrollToSection}
      />

      <div className="workspace-content">
        <header className="workspace-header">
          <div><h2>Tổng quan</h2><p>Chào bạn, cùng chăm một khu vườn tốt hơn.</p></div>
          <div className="workspace-tools"><span className="workspace-tag">VWing / Nông nghiệp số</span><button className="header-demo" onClick={() => setIsTelemetryOpen(true)}>Trải nghiệm demo <ArrowUpRight size={14} /></button><button className="account-button" onClick={() => setIsAuthOpen(true)} aria-label="Mở tài khoản">VW</button></div>
        </header>
      <main>
        {/* Hero is visible immediately */}
        <HeroSection
          onConsultClick={() => scrollToSection("booking-section")}
          onExploreFeatures={() => scrollToSection("features-section")}
          onOpenLiveTelemetry={() => setIsTelemetryOpen(true)}
          onExploreCrop={(crop) => { setSelectedCrop(crop); scrollToSection('crops-section'); }}
        />

        {/* Technology introduction */}

          <TechnologyIntro />

        {/* Technology showcases */}

          <FeatureShowcase
            onOpenLidarModal={() => setIsTelemetryOpen(true)}
            onOpenPathogenModal={() => setIsPathogenOpen(true)}
            onOpenTerrainModal={() => setIsTerrainOpen(true)}
            onOpenPassportModal={() => setIsPassportOpen(true)}
          />

        {/* Crop solutions */}

          <CropSolutions onOpenPlotMap={() => setIsTelemetryOpen(true)} selectedCrop={selectedCrop} onSelectCrop={setSelectedCrop} />

        {/* Press and research */}
        <PressResearch
          onSelectArticle={(article) => setSelectedArticle(article)}
        />

          <PricingSection />

        {/* Trial booking */}
        <TrialBooking onSuccess={(formData) => setSubmittedBooking(formData)} />
      </main>

      {/* Footer */}

        <Footer
          onNavClick={scrollToSection}
          onOpenTelemetry={() => setIsTelemetryOpen(true)}
          onOpenAuth={() => setIsAuthOpen(true)}
        />

      </div>

      {/* Mobile navigation */}
      <MobileBottomBar
        onScrollToSection={scrollToSection}
        onOpenTelemetry={() => setIsTelemetryOpen(true)}
      />

      {/* Mission telemetry modal */}
      <MissionTelemetryModal
        isOpen={isTelemetryOpen}
        onClose={() => setIsTelemetryOpen(false)}
        mission={activeMission}
      />

      {/* Pathogen scan modal */}
      <PathogenScanModal
        isOpen={isPathogenOpen}
        onClose={() => setIsPathogenOpen(false)}
      />

      {/* Terrain follow modal */}
      <TerrainFollowModal
        isOpen={isTerrainOpen}
        onClose={() => setIsTerrainOpen(false)}
      />

      {/* Digital passport modal */}
      <DigitalPassportModal
        isOpen={isPassportOpen}
        onClose={() => setIsPassportOpen(false)}
      />

      {/* Article modal */}
      <ArticleModal
        isOpen={!!selectedArticle}
        onClose={() => setSelectedArticle(null)}
        article={selectedArticle}
      />

      {/* Authentication modal */}
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />

      {/* Booking success modal */}
      <SuccessModal
        isOpen={!!submittedBooking}
        onClose={() => setSubmittedBooking(null)}
        bookingData={submittedBooking}
      />

    </div>
  );
}
