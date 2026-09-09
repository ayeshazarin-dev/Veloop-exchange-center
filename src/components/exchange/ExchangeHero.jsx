import React from "react";
import { motion } from "framer-motion";
import { FaShieldHalved, FaBolt, FaCoins } from "react-icons/fa6";
import ExchangeOrbitVisual from "./ExchangeOrbitVisual";
import styles from "../../pages/ExchangeCenter/ExchangeCenter.module.css";

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut", staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function ExchangeHero() {
  return (
    <motion.section
      className={styles.hero}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div className={styles.heroCopy} variants={itemVariants}>
        <div className={styles.kicker}>
          <span /> VELOOP REWARDS VAULT
        </div>
        <h1>Exchange Center</h1>
        <p className={styles.heroTitle}>Convert earned Gems into VEs instantly.</p>
        <p className={styles.heroDescription}>
          Select your conversion tier to exchange Gems for VEs virtual rewards with zero fees and immediate wallet credit.
        </p>

        <div className={styles.heroPills}>
          <span>
            <FaBolt size={12} /> Instant Credit
          </span>
          <span>
            <FaShieldHalved size={12} /> Zero Network Fee
          </span>
          <span>
            <FaCoins size={12} /> Live VIP Multipliers
          </span>
        </div>
      </motion.div>

      <div className={styles.heroVisual} aria-hidden="true">
        <ExchangeOrbitVisual size="hero" />
      </div>
    </motion.section>
  );
}
