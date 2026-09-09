import React from "react";
import { motion } from "framer-motion";
import gemImg from "../../assets/images/gem_crystal.png";
import coinImg from "../../assets/images/ves_coin.png";
import styles from "./ExchangeOrbitVisual.module.css";

export default function ExchangeOrbitVisual({
  size = "hero", // "hero" | "modal" | "card"
  leftImg = gemImg,
  rightImg = coinImg,
  className = "",
}) {
  const isHero = size === "hero";
  const isModal = size === "modal";
  const isCard = size === "card";

  return (
    <div
      className={`${styles.orbitContainer} ${styles[size]} ${className}`}
      aria-hidden="true"
    >
      {/* Background ambient glow */}
      <div className={styles.ambientGlow} />

      {/* SVG Animated Dotted Orbit Rings */}
      <svg
        className={styles.orbitSvg}
        viewBox="0 0 320 220"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="orbitGradHero" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#c084fc" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#72b9ff" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#f7c96b" stopOpacity="0.4" />
          </linearGradient>
          <linearGradient id="circleGradHero" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#72b9ff" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#c084fc" stopOpacity="0.15" />
          </linearGradient>
        </defs>

        {/* Outer Circular Solid Ring (Complete Line) */}
        <circle
          cx="160"
          cy="110"
          r={isHero ? "105" : isModal ? "95" : "85"}
          stroke="url(#circleGradHero)"
          strokeWidth="1.2"
          opacity="0.6"
        />

        {/* Tilted Elliptical Dotted Orbit Ring (Exact match to screenshot) */}
        <g
          className={styles.spinCounterClockwise}
          style={{ transformOrigin: "160px 110px" }}
        >
          <ellipse
            cx="160"
            cy="110"
            rx={isHero ? "138" : isModal ? "126" : "110"}
            ry={isHero ? "58" : isModal ? "50" : "42"}
            transform="rotate(-18 160 110)"
            stroke="url(#orbitGradHero)"
            strokeWidth="1.4"
            strokeDasharray="5 7"
            strokeLinecap="round"
            className={styles.dashPulse}
          />
        </g>
      </svg>

      {/* Decorative Floating Diamond */}
      <motion.div
        className={styles.sparkleDiamond}
        animate={{
          scale: [1, 1.25, 1],
          opacity: [0.5, 0.9, 0.5],
          rotate: [45, 55, 45],
        }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
      >
        ◆
      </motion.div>

      {/* Center Flow Elements */}
      <div className={styles.orbitContent}>
        {/* Left Item: Gems */}
        <motion.div
          className={styles.assetSquirclePurple}
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <img src={leftImg} alt="Gems" className={styles.assetImg} />
        </motion.div>

        {/* Right Item: Coins */}
        <motion.div
          className={styles.assetSquircleGold}
          animate={{ y: [0, 4, 0] }}
          transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
        >
          <img src={rightImg} alt="Coins" className={styles.assetImg} />
        </motion.div>
      </div>
    </div>
  );
}
