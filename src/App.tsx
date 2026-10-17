import React, { useState, useEffect } from "react";

import { Navbar } from "./components/Navbar";
import { HeroSection } from "./components/HeroSection";
import { TechnologyIntro } from "./components/TechnologyIntro";
import { FeatureShowcase } from "./components/FeatureShowcase";
import { CropSolutions } from "./components/CropSolutions";
import { PressResearch } from "./components/PressResearch";
import { TrialBooking } from "./components/TrialBooking";
import { Footer } from "./components/Footer";
import { MobileBottomBar } from "./components/MobileBottomBar";
import ScrollReveal from "./components/ScrollReveal";

import { MissionTelemetryModal } from "./components/modals/MissionTelemetryModal";
import { PathogenScanModal } from "./components/modals/PathogenScanModal";
import { TerrainFollowModal } from "./components/modals/TerrainFollowModal";
import { DigitalPassportModal } from "./components/modals/DigitalPassportModal";
import { ArticleModal } from "./components/modals/ArticleModal";
import { AuthModal } from "./components/modals/AuthModal";
import { SuccessModal } from "./components/modals/SuccessModal";

import { activeMission } from "./data/mockData";
import { NewsArticle } from "./types";

import ScrollDrivenDrone from "./components/ScrollDrivenDrone";

import SplashScreen from "./components/SplashScreen";

import ConsultationPopup from "./components/ConsultationPopup";

import FloatingContact from "./components/FloatingContact";

import PricingSection from "./components/PricingSection";

export default function App() {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("vwing_theme");

      if (saved) return saved === "dark";

      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }

    return false;
  });

  const [showSplash, setShowSplash] = useState(true);
  const [landingVisible, setLandingVisible] = useState(false);

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

  // Sync dark mode
  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("vwing_theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  useEffect(() => {
    if (showSplash) return;

    const timer = window.setTimeout(() => {
      setLandingVisible(true);
    }, 50);

    return () => window.clearTimeout(timer);
  }, [showSplash]);
  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  // Smooth scrolling for navigation
  const scrollToSection = (sectionId: string) => {
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
    <div
      className="
        min-h-screen
        bg-[#f8f9ff] text-[#0b1c30]
        transition-colors duration-300
        selection:bg-emerald-500 selection:text-white
        dark:bg-[#07131e] dark:text-slate-100
      "
    >
      <div
        className={`
    transition-all duration-1200
    ease-[cubic-bezier(0.22,1,0.36,1)]
    ${
      landingVisible
        ? "translate-y-0 scale-100 opacity-100 blur-0"
        : "translate-y-5 scale-[0.985] opacity-0 blur-sm"
    }
  `}
      >
        <ScrollDrivenDrone />
      </div>
      {/* Navigation */}
      <Navbar
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
        onOpenAuth={() => setIsAuthOpen(true)}
        onOpenDemoMission={() => setIsTelemetryOpen(true)}
        onScrollToSection={scrollToSection}
      />

      {/* Main content */}
      <main className="space-y-2 sm:space-y-4">
        {/* Hero is visible immediately */}
        <HeroSection
          onConsultClick={() => scrollToSection("booking-section")}
          onExploreFeatures={() => scrollToSection("features-section")}
          onOpenLiveTelemetry={() => setIsTelemetryOpen(true)}
        />

        {/* Technology introduction */}
        <ScrollReveal>
          <TechnologyIntro />
        </ScrollReveal>

        {/* Technology showcases */}
        <ScrollReveal delay={80}>
          <FeatureShowcase
            onOpenLidarModal={() => setIsTelemetryOpen(true)}
            onOpenPathogenModal={() => setIsPathogenOpen(true)}
            onOpenTerrainModal={() => setIsTerrainOpen(true)}
            onOpenPassportModal={() => setIsPassportOpen(true)}
          />
        </ScrollReveal>

        {/* Crop solutions */}
        <ScrollReveal delay={80}>
          <CropSolutions onOpenPlotMap={() => setIsTelemetryOpen(true)} />
        </ScrollReveal>

        {/* Press and research */}
        <PressResearch
          onSelectArticle={(article) => setSelectedArticle(article)}
        />

        <ScrollReveal>
          <PricingSection />
        </ScrollReveal>

        {/* Trial booking */}
        <TrialBooking onSuccess={(formData) => setSubmittedBooking(formData)} />
      </main>

      {landingVisible && !showSplash && <FloatingContact />}
      {/* Footer */}
      <ScrollReveal>
        <Footer
          onNavClick={scrollToSection}
          onOpenTelemetry={() => setIsTelemetryOpen(true)}
          onOpenAuth={() => setIsAuthOpen(true)}
        />
      </ScrollReveal>

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

      {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}

      {landingVisible && !showSplash && (
        <ConsultationPopup
          delay={10_000}
          onSuccess={(formData) => {
            console.log("Thông tin đăng ký tư vấn:", formData);
          }}
        />
      )}
    </div>
  );
}
