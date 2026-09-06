import React from "react";
import { motion } from "framer-motion";
import { FaArrowRight, FaShieldHalved, FaBolt, FaCoins } from "react-icons/fa6";
import gemImg from "../../assets/images/gem_crystal.png";
import coinImg from "../../assets/images/ves_coin.png";
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
        <div className={styles.heroCircleStage}>
          <motion.div
            className={styles.heroAssetBox}
            animate={{ y: [0, -5, 0], rotate: [0, 1, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <img src={gemImg} alt="Gems" className={styles.heroAssetImg} />
            <span className={styles.heroAssetLabel}>Gems</span>
          </motion.div>

          <div className={styles.heroFlowConduit}>
            <motion.div
              className={styles.heroFlowPulse}
              animate={{ x: [-6, 6, -6], opacity: [0.35, 1, 0.35] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <FaArrowRight size={16} />
            </motion.div>
            <span className={styles.heroFlowRate}>Fixed 5.4x</span>
          </div>

          <motion.div
            className={styles.heroAssetBox}
            animate={{ y: [0, 5, 0], rotate: [0, -1, 0] }}
            transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
          >
            <img src={coinImg} alt="VEs Coins" className={styles.heroAssetImg} />
            <span className={styles.heroAssetLabelGold}>VEs Coins</span>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
