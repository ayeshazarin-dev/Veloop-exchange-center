import React from "react";
import { motion } from "framer-motion";
import { FaArrowRight, FaCoins, FaFire, FaShieldHalved, FaAward, FaRocket } from "react-icons/fa6";
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
        <p className={styles.heroTitle}>Turn your earned Gems into VEs.</p>
        <p className={styles.heroDescription}>
          Convert your eligible Gems into VEs and continue your reward journey.
          Simple, transparent, and built strictly around your earned rewards.
        </p>

        <div className={styles.heroPills}>
          <span>
            <FaShieldHalved size={13} /> Secure conversion
          </span>
          <span>
            <FaAward size={13} /> Reward focused
          </span>
          <span>
            <FaRocket size={13} /> Instant balance update
          </span>
        </div>
      </motion.div>

      <div className={styles.heroVisual} aria-hidden="true">
        <div className={styles.heroHalo} />

        <div className={`${styles.rewardVisual} ${styles.rewardVisualLarge}`}>
          <motion.div
            className={styles.orbit}
            animate={{ rotate: 360 }}
            transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className={styles.gemOrb}
            animate={{ y: [0, -10, 0], rotate: [0, 5, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <FaFire size={38} />
          </motion.div>

          <motion.div
            className={styles.rewardArrow}
            animate={{ x: [0, 4, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          >
            <FaArrowRight size={19} />
          </motion.div>

          <motion.div
            className={styles.veOrb}
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          >
            <FaCoins size={35} />
          </motion.div>
        </div>

        <motion.div
          className={styles.heroFloatingGem}
          animate={{ y: [0, -12, 0], opacity: [0.4, 0.9, 0.4] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          ◆
        </motion.div>
        <motion.div
          className={styles.heroFloatingCoin}
          animate={{ y: [0, 12, 0], opacity: [0.4, 0.9, 0.4] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut", delay: 0.7 }}
        >
          ✦
        </motion.div>
      </div>
    </motion.section>
  );
}
