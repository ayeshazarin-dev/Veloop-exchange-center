import React from "react";
import { motion } from "framer-motion";
import { FaArrowRight, FaChevronRight, FaCircleQuestion, FaCoins, FaFire, FaAward, FaBolt } from "react-icons/fa6";
import { Sparkles } from "lucide-react";
import styles from "../../pages/ExchangeCenter/ExchangeCenter.module.css";

function RewardVisualMini({ isFeatured, isPopular }) {
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
        <FaFire size={24} />
      </motion.div>
      <div className={styles.rewardArrow}>
        <FaArrowRight size={14} />
      </div>
      <motion.div
        className={styles.veOrb}
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
      >
        <FaCoins size={22} />
      </motion.div>
    </div>
  );
}

export default function ExchangeCard({ option, balance, onConvert, onEarnGems }) {
  const insufficient = balance.gems < option.requiredGems;
  const missingGems = option.requiredGems - balance.gems;
  const progressPercent = Math.min(100, Math.round((balance.gems / option.requiredGems) * 100));

  const handleClick = () => {
    if (insufficient) {
      if (onEarnGems) onEarnGems(missingGems);
    } else {
      onConvert(option);
    }
  };

  return (
    <motion.article
      className={`${styles.exchangeCard} ${option.popular ? styles.cardPopularHighlight : ""}`}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.22 }}
    >
      <div className={styles.cardTop}>
        <div className={styles.cardBadgeGroup}>
          <span className={styles.badge}>{option.badge}</span>
          {option.bonus && (
            <span className={styles.bonusTag}>
              <FaBolt size={10} /> {option.bonus}
            </span>
          )}
        </div>
        <span className={styles.cardLabel}>
          <FaAward size={12} />
          {option.label}
        </span>
      </div>

      <div className={styles.cardVisual} aria-hidden="true">
        <RewardVisualMini isFeatured={option.category === "high"} isPopular={option.popular} />
      </div>

      <div className={styles.cardContent}>
        <h3>{option.title}</h3>
        <p>{option.description}</p>

        <div className={styles.conversionBox}>
          <div>
            <span className={styles.miniLabel}>Required Gems</span>
            <strong>
              <FaFire size={14} /> {option.requiredGems}
            </strong>
          </div>
          <div className={styles.conversionLine}>
            <FaArrowRight size={14} />
          </div>
          <div className={styles.receive}>
            <span className={styles.miniLabel}>You receive</span>
            <strong>
              <FaCoins size={14} /> {option.receiveVEs} VEs
            </strong>
          </div>
        </div>

        {insufficient ? (
          <div className={styles.lockedBox}>
            <div className={styles.progressRow}>
              <span className={styles.progressLabel}>
                <FaCircleQuestion size={12} /> Unlock Progress
              </span>
              <span className={styles.progressVal}>
                {balance.gems} / {option.requiredGems} ({progressPercent}%)
              </span>
            </div>
            <div className={styles.progressTrack}>
              <div
                className={styles.progressFill}
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <div className={styles.warningMini}>
              Need <strong>{missingGems}</strong> more Gems to unlock this reward
            </div>
          </div>
        ) : null}

        <button
          className={`${styles.convertButton} ${insufficient ? styles.earnButton : ""}`}
          onClick={handleClick}
          aria-label={insufficient ? `Earn ${missingGems} more Gems` : `Convert ${option.requiredGems} Gems to ${option.receiveVEs} VEs`}
        >
          {insufficient ? (
            <>
              <Sparkles size={13} /> Earn More Gems
            </>
          ) : (
            <>
              Convert Rewards <FaChevronRight size={13} />
            </>
          )}
        </button>
      </div>
    </motion.article>
  );
}
