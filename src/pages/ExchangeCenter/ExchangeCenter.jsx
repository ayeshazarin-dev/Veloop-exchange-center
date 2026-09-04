import React, { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Info, RefreshCw, Sparkles, Vault, Zap } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { exchangeOptions, initialBalance, recentConversions } from "../../data/exchangeData";
import styles from "./ExchangeCenter.module.css";

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

  const pageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        `.${styles.navbar}`,
        { y: -25, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 }
      )
      .fromTo(
        `.${styles.hero}`,
        { y: 30, opacity: 0, scale: 0.98 },
        { y: 0, opacity: 1, scale: 1, duration: 0.7 },
        "-=0.3"
      )
      .fromTo(
        `.${styles.balanceCard}, .${styles.balanceMini}`,
        { y: 25, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.55, stagger: 0.1, ease: "back.out(1.4)" },
        "-=0.3"
      );

      const revealSections = document.querySelectorAll(`.${styles.gsapSection}`);
      revealSections.forEach((sec) => {
        gsap.fromTo(
          sec,
          { y: 40, opacity: 0, scale: 0.98 },
          {
            scrollTrigger: {
              trigger: sec,
              start: "top 90%",
              end: "bottom 15%",
              toggleActions: "play reverse play reverse",
            },
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.7,
            ease: "power2.out",
          }
        );
      });

      ScrollTrigger.create({
        trigger: `.${styles.exchangeGrid}`,
        start: "top 88%",
        end: "bottom 10%",
        toggleActions: "play reverse play reverse",
        onEnter: () => {
          gsap.fromTo(
            `.${styles.exchangeCard}`,
            { y: 35, opacity: 0, scale: 0.94 },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              stagger: 0.12,
              duration: 0.6,
              ease: "back.out(1.3)",
            }
          );
        },
        onEnterBack: () => {
          gsap.fromTo(
            `.${styles.exchangeCard}`,
            { y: -25, opacity: 0, scale: 0.96 },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              stagger: 0.08,
              duration: 0.5,
              ease: "power2.out",
            }
          );
        },
      });

      ScrollTrigger.create({
        trigger: `.${styles.howCardsRow}`,
        start: "top 88%",
        end: "bottom 10%",
        toggleActions: "play reverse play reverse",
        onEnter: () => {
          gsap.fromTo(
            `.${styles.howCard}`,
            { y: 30, opacity: 0, scale: 0.92 },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              stagger: 0.09,
              duration: 0.55,
              ease: "back.out(1.3)",
            }
          );
        },
        onEnterBack: () => {
          gsap.fromTo(
            `.${styles.howCard}`,
            { y: -20, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              stagger: 0.06,
              duration: 0.45,
              ease: "power2.out",
            }
          );
        },
      });

      ScrollTrigger.create({
        trigger: `.${styles.historyList}`,
        start: "top 88%",
        end: "bottom 10%",
        toggleActions: "play reverse play reverse",
        onEnter: () => {
          gsap.fromTo(
            `.${styles.historyItem}`,
            { x: -30, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              stagger: 0.08,
              duration: 0.45,
              ease: "power2.out",
            }
          );
        },
      });

      gsap.to(".backgroundGlowOne", {
        scrollTrigger: {
          trigger: pageRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.2,
        },
        y: 280,
        rotate: 15,
        ease: "none",
      });

      gsap.to(".backgroundGlowTwo", {
        scrollTrigger: {
          trigger: pageRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.2,
        },
        y: -220,
        rotate: -15,
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
      <div className={styles.gridBackdrop} aria-hidden="true" />
      <div className={`${styles.backgroundGlowOne} backgroundGlowOne`} />
      <div className={`${styles.backgroundGlowTwo} backgroundGlowTwo`} />

      <div className={styles.container}>
        <Navbar balance={balance} />

        <div>
          <ExchangeHero />
        </div>

        <div className={styles.gsapSection}>
          <BalanceOverview
            balance={balance}
            totalConversions={totalConversions}
            onOpenInfo={() => setShowInfo(true)}
          />
        </div>

        <div className={styles.gsapSection}>
          <YieldCalculator balance={balance} onSelectAmount={(gems) => {}} />
        </div>

        <div className={styles.gsapSection}>
          <section className={styles.conversionsSection}>
            <div className={styles.sectionHeading}>
              <div>
                <p className={styles.eyebrow}>REWARD VAULT</p>
                <h2>Available conversions</h2>
                <p className={styles.sectionSubtext}>
                  Choose an eligible reward conversion option below.
                </p>
              </div>

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

        <div className={styles.gsapSection}>
          <HowExchangeWorks />
        </div>

        <div className={styles.gsapSection}>
          <ExchangeHistory history={history} />
        </div>

        <div className={styles.gsapSection}>
          <ExchangeRules />
        </div>

        <div className={styles.gsapSection}>
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