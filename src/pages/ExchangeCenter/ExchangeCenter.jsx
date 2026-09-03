import React, { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Info, RefreshCw, Sparkles, Vault, Zap } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { exchangeOptions, initialBalance, recentConversions } from "../../data/exchangeData";
import styles from "./ExchangeCenter.module.css";

// Modular Components
import Navbar from "../../components/exchange/Navbar";
import ExchangeHero from "../../components/exchange/ExchangeHero";
import BalanceOverview from "../../components/exchange/BalanceOverview";
import YieldCalculator from "../../components/exchange/YieldCalculator";
import ExchangeCard from "../../components/exchange/ExchangeCard";
import ExchangeModal from "../../components/exchange/ExchangeModal";
import ConversionSuccess from "../../components/exchange/ConversionSuccess";
import ExchangeHistory from "../../components/exchange/ExchangeHistory";
import ExchangeRules from "../../components/exchange/ExchangeRules";
import HowExchangeWorks from "../../components/exchange/HowExchangeWorks";
import ExchangeLoader from "../../components/exchange/ExchangeLoader";
import InfoModal from "../../components/exchange/InfoModal";

gsap.registerPlugin(ScrollTrigger);

export default function ExchangeCenter() {
  const [balance, setBalance] = useState(initialBalance);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [lastConversion, setLastConversion] = useState(null);
  const [showInfo, setShowInfo] = useState(false);
  const [history, setHistory] = useState(recentConversions);
  const [activeCategory, setActiveCategory] = useState("all");

  // Interactive UI state toggles for full testing
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [simulateEmpty, setSimulateEmpty] = useState(false);

  const totalConversions = useMemo(() => history.length, [history]);

  const displayedOptions = useMemo(() => {
    if (simulateEmpty) return [];
    if (activeCategory === "all") return exchangeOptions;
    if (activeCategory === "popular") return exchangeOptions.filter((opt) => opt.popular || opt.badge === "Popular");
    if (activeCategory === "high") return exchangeOptions.filter((opt) => opt.category === "high" || opt.badge === "High Yield");
    if (activeCategory === "exclusive") return exchangeOptions.filter((opt) => opt.category === "exclusive" || opt.badge === "Exclusive");
    return exchangeOptions;
  }, [simulateEmpty, activeCategory]);

  // GSAP Refs
  const pageRef = useRef(null);
  const heroRef = useRef(null);
  const balanceRef = useRef(null);
  const calcRef = useRef(null);
  const conversionsRef = useRef(null);
  const howRef = useRef(null);
  const historyRef = useRef(null);
  const rulesRef = useRef(null);
  const footerRef = useRef(null);

  // GSAP ScrollTrigger Stack & Entrance Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero entrance
      gsap.fromTo(
        heroRef.current,
        { opacity: 0, y: 30, scale: 0.98 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "power2.out" }
      );

      // Section animations
      const sections = [
        balanceRef.current,
        calcRef.current,
        conversionsRef.current,
        howRef.current,
        historyRef.current,
        rulesRef.current,
        footerRef.current,
      ];

      sections.forEach((section) => {
        if (!section) return;

        gsap.fromTo(
          section,
          { opacity: 0, y: 35 },
          {
            scrollTrigger: {
              trigger: section,
              start: "top 88%",
              toggleActions: "play none none none",
            },
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power2.out",
          }
        );
      });

      // Parallax glow orbs
      gsap.to(".backgroundGlowOne", {
        scrollTrigger: {
          trigger: pageRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.5,
        },
        y: 200,
        ease: "none",
      });

      gsap.to(".backgroundGlowTwo", {
        scrollTrigger: {
          trigger: pageRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.5,
        },
        y: -150,
        ease: "none",
      });
    }, pageRef);

    return () => ctx.revert();
  }, [displayedOptions]);

  const handleConvertClick = (option) => {
    if (balance.gems < option.requiredGems) return;
    setSelectedOption(option);
  };

  const handleEarnGems = (missingGems) => {
    // Add bonus gems to user balance so they can test unlocked conversions
    const bonus = Math.max(50, missingGems + 10);
    setBalance((prev) => ({
      ...prev,
      gems: prev.gems + bonus,
    }));
  };

  const handleConfirmConversion = (option) => {
    setSelectedOption(null);

    setBalance((current) => ({
      gems: Math.max(0, current.gems - option.requiredGems),
      ves: current.ves + option.receiveVEs,
    }));

    const newHistoryItem = {
      id: `hist-${Date.now()}`,
      date: "Just now",
      gems: option.requiredGems,
      ves: option.receiveVEs,
      status: "Completed",
    };

    setHistory((current) => [newHistoryItem, ...current]);
    setLastConversion({ gems: option.requiredGems, ves: option.receiveVEs });
    setShowSuccess(true);
  };

  const handleRetry = () => {
    setError(false);
  };

  return (
    <main className={styles.page} ref={pageRef}>
      {/* Background Cyber Mesh Grid and Ambient Lighting */}
      <div className={styles.gridBackdrop} aria-hidden="true" />
      <div className={`${styles.backgroundGlowOne} backgroundGlowOne`} />
      <div className={`${styles.backgroundGlowTwo} backgroundGlowTwo`} />

      <div className={styles.container}>
        {/* Modern Top Header / Navbar */}
        <Navbar balance={balance} />

        {/* 1. Hero Header */}
        <div ref={heroRef}>
          <ExchangeHero />
        </div>

        {/* 2. User Balance Overview */}
        <div ref={balanceRef} className={styles.gsapSection}>
          <BalanceOverview
            balance={balance}
            totalConversions={totalConversions}
            onOpenInfo={() => setShowInfo(true)}
          />
        </div>

        {/* 3. Interactive Yield Simulator / Calculator */}
        <div ref={calcRef} className={styles.gsapSection}>
          <YieldCalculator balance={balance} onSelectAmount={(gems) => {}} />
        </div>

        {/* 4. Available Conversions Section with Category Filter Tabs */}
        <div ref={conversionsRef} className={styles.gsapSection}>
          <section className={styles.conversionsSection}>
            <div className={styles.sectionHeading}>
              <div>
                <p className={styles.eyebrow}>REWARD VAULT</p>
                <h2>Available conversions</h2>
                <p className={styles.sectionSubtext}>
                  Choose an eligible reward conversion option below.
                </p>
              </div>

              {/* Category Filter Pills */}
              <div className={styles.filterPillsGroup}>
                <button
                  type="button"
                  className={`${styles.filterPill} ${activeCategory === "all" ? styles.filterPillActive : ""}`}
                  onClick={() => setActiveCategory("all")}
                >
                  All (4)
                </button>
                <button
                  type="button"
                  className={`${styles.filterPill} ${activeCategory === "popular" ? styles.filterPillActive : ""}`}
                  onClick={() => setActiveCategory("popular")}
                >
                  🔥 Popular
                </button>
                <button
                  type="button"
                  className={`${styles.filterPill} ${activeCategory === "high" ? styles.filterPillActive : ""}`}
                  onClick={() => setActiveCategory("high")}
                >
                  ⚡ High Yield
                </button>
                <button
                  type="button"
                  className={`${styles.filterPill} ${activeCategory === "exclusive" ? styles.filterPillActive : ""}`}
                  onClick={() => setActiveCategory("exclusive")}
                >
                  💎 Exclusive
                </button>
              </div>
            </div>

            {error ? (
              <div className={styles.stateCard}>
                <div className={styles.stateIcon}>
                  <RefreshCw size={28} />
                </div>
                <h3>Unable to load exchange options.</h3>
                <p>Please check your connection and try again.</p>
                <button className={styles.confirmButton} onClick={handleRetry}>
                  Retry
                </button>
              </div>
            ) : loading ? (
              <ExchangeLoader message="Processing your reward conversion..." />
            ) : displayedOptions.length === 0 ? (
              <div className={styles.stateCard}>
                <div className={styles.stateIcon}>
                  <Vault size={28} />
                </div>
                <h3>No conversions in this category right now.</h3>
                <p>Try selecting another category or check back soon.</p>
                <button
                  className={styles.filterPillActive}
                  style={{ marginTop: 12, padding: "8px 16px", borderRadius: 8, cursor: "pointer", border: 0 }}
                  onClick={() => setActiveCategory("all")}
                >
                  View All Conversions
                </button>
              </div>
            ) : (
              <div className={styles.exchangeGrid}>
                {displayedOptions.map((option) => (
                  <ExchangeCard
                    key={option.id}
                    option={option}
                    balance={balance}
                    onConvert={handleConvertClick}
                    onEarnGems={handleEarnGems}
                  />
                ))}
              </div>
            )}
          </section>
        </div>

        {/* 5. How Exchange Works (5 Steps Walkthrough) */}
        <div ref={howRef} className={styles.gsapSection}>
          <HowExchangeWorks />
        </div>

        {/* 6. Recent Conversions Activity */}
        <div ref={historyRef} className={styles.gsapSection}>
          <ExchangeHistory history={history} />
        </div>

        {/* 7. Platform Exchange Rules */}
        <div ref={rulesRef} className={styles.gsapSection}>
          <ExchangeRules />
        </div>

        {/* 8. Footer */}
        <div ref={footerRef} className={styles.gsapSection}>
          <footer className={styles.footer}>
            <div className={styles.footerBottom}>
              <p>© 2025-2026 VELOOP Rewards · All rights reserved</p>
              <div className={styles.footerLinks}>
                <a href="#exchange">Exchange Center</a>
                <span>·</span>
                <a href="#terms">Terms</a>
                <span>·</span>
                <a href="#privacy">Privacy</a>
                <span>·</span>
                <a href="#support">Support</a>
              </div>
            </div>
          </footer>
        </div>
      </div>

      {/* Interactive Modals */}
      <AnimatePresence>
        {selectedOption && (
          <ExchangeModal
            option={selectedOption}
            balance={balance}
            onClose={() => setSelectedOption(null)}
            onConfirm={handleConfirmConversion}
          />
        )}

        {showSuccess && lastConversion && (
          <ConversionSuccess
            option={lastConversion}
            onContinue={() => setShowSuccess(false)}
          />
        )}

        {showInfo && <InfoModal onClose={() => setShowInfo(false)} />}
      </AnimatePresence>
    </main>
  );
}