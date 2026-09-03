import React from "react";
import { motion } from "framer-motion";
import { FaArrowRight, FaChevronRight, FaCircleQuestion, FaCoins, FaFire, FaAward } from "react-icons/fa6";
import styles from "../../pages/ExchangeCenter/ExchangeCenter.module.css";

function RewardVisualMini() {
  return (
    <div className={styles.rewardVisual}>
      <motion.div
        className={styles.orbit}
        animate={{ rotate: 360 }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className={styles.gemOrb}
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <FaFire size={26} />
      </motion.div>
      <div className={styles.rewardArrow}>
        <FaArrowRight size={14} />
      </div>
      <motion.div
        className={styles.veOrb}
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
      >
        <FaCoins size={24} />
      </motion.div>
    </div>
  );
}

export default function ExchangeCard({ option, balance, onConvert, onEarnGems }) {
  const insufficient = balance.gems < option.requiredGems;
  const missingGems = option.requiredGems - balance.gems;

  const handleClick = () => {
    if (insufficient) {
      if (onEarnGems) onEarnGems(missingGems);
    } else {
      onConvert(option);
    }
  };

  return (
    <motion.article
      className={styles.exchangeCard}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.22 }}
    >
      <div className={styles.cardTop}>
        <span className={styles.badge}>{option.badge}</span>
        <span className={styles.cardLabel}>
          <FaAward size={12} />
          {option.label}
        </span>
      </div>

      <div className={styles.cardVisual} aria-hidden="true">
        <RewardVisualMini />
      </div>

      <div className={styles.cardContent}>
        <h3>{option.title}</h3>
        <p>{option.description}</p>

        <div className={styles.conversionBox}>
          <div>
            <span className={styles.miniLabel}>Required Gems</span>
            <strong>
              <FaFire size={15} /> {option.requiredGems}
            </strong>
          </div>
          <div className={styles.conversionLine}>
            <FaArrowRight size={16} />
          </div>
          <div className={styles.receive}>
            <span className={styles.miniLabel}>You receive</span>
            <strong>
              <FaCoins size={15} /> {option.receiveVEs} VEs
            </strong>
          </div>
        </div>

        {insufficient && (
          <div className={styles.warning} role="alert">
            <FaCircleQuestion size={14} />
            <span>You need <strong>{missingGems}</strong> more Gems to unlock this conversion.</span>
          </div>
        )}

        <button
          className={`${styles.convertButton} ${insufficient ? styles.earnButton : ""}`}
          onClick={handleClick}
          aria-label={insufficient ? `Earn ${missingGems} more Gems` : `Convert ${option.requiredGems} Gems to ${option.receiveVEs} VEs`}
        >
          {insufficient ? "Earn More Gems" : "Convert Rewards"}
          <FaChevronRight size={14} />
        </button>
      </div>
    </motion.article>
  );
}

