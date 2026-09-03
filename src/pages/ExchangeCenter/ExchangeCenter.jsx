import React, { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Info, RefreshCw, Vault } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { exchangeOptions, initialBalance, recentConversions } from "../../data/exchangeData";
import styles from "./ExchangeCenter.module.css";

// Modular Components
import ExchangeHero from "../../components/exchange/ExchangeHero";
import BalanceOverview from "../../components/exchange/BalanceOverview";
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

  // Interactive UI state toggles for full testing
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [simulateEmpty, setSimulateEmpty] = useState(false);

  const totalConversions = useMemo(() => history.length, [history]);

  const displayedOptions = useMemo(() => {
    if (simulateEmpty) return [];
    return exchangeOptions;
  }, [simulateEmpty]);

  // GSAP Refs
  const pageRef = useRef(null);
  const heroRef = useRef(null);
  const balanceRef = useRef(null);
  const conversionsRef = useRef(null);
  const howRef = useRef(null);
  const historyRef = useRef(null);
  const rulesRef = useRef(null);
  const footerRef = useRef(null);

  // GSAP ScrollTrigger Stack Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero entrance animation (no scroll trigger — plays on mount)
      gsap.fromTo(
        heroRef.current,
        { opacity: 0, y: 60, scale: 0.96 },
        { opacity: 1, y: 0, scale: 1, duration: 1, ease: "power3.out" }
      );

      // Stack animation sections
      const stackSections = [
        balanceRef.current,
        conversionsRef.current,
        howRef.current,
        historyRef.current,
        rulesRef.current,
        footerRef.current,
      ];

      stackSections.forEach((section, index) => {
        if (!section) return;

        // Set initial state
        gsap.set(section, {
          opacity: 0,
          y: 80,
          scale: 0.94,
          transformOrigin: "center top",
        });

        // Scroll-triggered stack-in animation
        gsap.to(section, {
          scrollTrigger: {
            trigger: section,
            start: "top 88%",
            end: "top 35%",
            scrub: 0.8,
            toggleActions: "play none none reverse",
          },
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: "power2.out",
        });
      });

      // Parallax glow orbs
      gsap.to(".backgroundGlowOne", {
        scrollTrigger: {
          trigger: pageRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.5,
        },
        y: 300,
        ease: "none",
      });

      gsap.to(".backgroundGlowTwo", {
        scrollTrigger: {
          trigger: pageRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.5,
        },
        y: -200,
        ease: "none",
      });

      // Stagger exchange cards within the grid
      ScrollTrigger.create({
        trigger: conversionsRef.current,
        start: "top 75%",
        onEnter: () => {
          gsap.fromTo(
            `.${styles.exchangeCard}`,
            { opacity: 0, y: 50, scale: 0.92 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.6,
              stagger: 0.15,
              ease: "back.out(1.4)",
            }
          );
        },
        once: true,
      });

      // Stagger balance cards
      ScrollTrigger.create({
        trigger: balanceRef.current,
        start: "top 80%",
        onEnter: () => {
          gsap.fromTo(
            `.${styles.balanceCard}, .${styles.balanceMini}`,
            { opacity: 0, y: 40, scale: 0.92 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.55,
              stagger: 0.12,
              ease: "back.out(1.2)",
            }
          );
        },
        once: true,
      });

      // Stagger history items
      ScrollTrigger.create({
        trigger: historyRef.current,
        start: "top 80%",
        onEnter: () => {
          gsap.fromTo(
            `.${styles.historyItem}`,
            { opacity: 0, x: -30 },
            {
              opacity: 1,
              x: 0,
              duration: 0.45,
              stagger: 0.1,
              ease: "power2.out",
            }
          );
        },
        once: true,
      });

      // Stagger how-it-works steps
      ScrollTrigger.create({
        trigger: howRef.current,
        start: "top 80%",
        onEnter: () => {
          gsap.fromTo(
            `.${styles.howCard}`,
            { opacity: 0, y: 30, scale: 0.9 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.5,
              stagger: 0.12,
              ease: "back.out(1.3)",
            }
          );
        },
        once: true,
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
      <div className={`${styles.backgroundGlowOne} backgroundGlowOne`} />
      <div className={`${styles.backgroundGlowTwo} backgroundGlowTwo`} />

      <div className={styles.container}>
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

        {/* 3. Available Conversions Section */}
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
              <div className={styles.rateNote}>
                <Info size={15} /> Predefined exchange values
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
                <h3>No conversions available right now.</h3>
                <p>New reward conversion opportunities will appear here when available.</p>
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

        {/* 4. How Exchange Works (5 Steps Walkthrough) */}
        <div ref={howRef} className={styles.gsapSection}>
          <HowExchangeWorks />
        </div>

        {/* 5. Recent Conversions Activity */}
        <div ref={historyRef} className={styles.gsapSection}>
          <ExchangeHistory history={history} />
        </div>

        {/* 6. Platform Exchange Rules */}
        <div ref={rulesRef} className={styles.gsapSection}>
          <ExchangeRules />
        </div>

        {/* 7. Footer */}
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