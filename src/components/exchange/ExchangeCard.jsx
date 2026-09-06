import React from "react";
import { motion } from "framer-motion";
import { FaArrowRight, FaChevronRight, FaBolt } from "react-icons/fa6";
import { Sparkles } from "lucide-react";
import gemImg from "../../assets/images/gem_crystal.png";
import coinImg from "../../assets/images/ves_coin.png";
import styles from "../../pages/ExchangeCenter/ExchangeCenter.module.css";

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
      className={`${styles.exchangeCard} ${option.popular ? styles.cardPopularHighlight : ""} ${option.badge === "Exclusive" ? styles.cardExclusiveHighlight : ""}`}
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ duration: 0.2 }}
    >
      <div className={styles.cardTop}>
        <div className={styles.cardBadgeGroup}>
          <span className={`${styles.badge} ${option.popular ? styles.badgePopular : option.badge === "Exclusive" ? styles.badgeExclusive : ""}`}>
            {option.badge}
          </span>
          {option.bonus && (
            <span className={styles.bonusTag}>
              <FaBolt size={10} /> {option.bonus}
            </span>
          )}
        </div>
      </div>

      <div className={styles.cardVisual} aria-hidden="true">
        <div className={styles.cardAssetShowcase}>
          <div className={styles.cardAssetCluster}>
            <div className={styles.cardAssetGemWrapper}>
              <img src={gemImg} alt="Gems" className={styles.cardGemImg} />
            </div>

            <div className={styles.cardAssetFlowConnector}>
              <div className={styles.cardFlowArrow}>
                <FaArrowRight size={14} />
              </div>
            </div>

            <div className={styles.cardAssetCoinWrapper}>
              <img src={coinImg} alt="VEs Coins" className={styles.cardCoinImg} />
            </div>
          </div>
        </div>
      </div>

      <div className={styles.cardContent}>
        <div className={styles.cardHeader}>
          <h3>{option.title}</h3>
        </div>

        <div className={styles.conversionBox}>
          <div className={styles.conversionFrom}>
            <span className={styles.miniLabel}>Exchange</span>
            <div className={styles.conversionItemValue}>
              <img src={gemImg} alt="Gems" className={styles.miniAssetIcon} />
              <strong>{option.requiredGems} Gems</strong>
            </div>
          </div>

          <div className={styles.conversionLine}>
            <FaArrowRight size={13} />
          </div>

          <div className={styles.conversionTo}>
            <span className={styles.miniLabel}>Receive</span>
            <div className={styles.conversionItemValue}>
              <img src={coinImg} alt="VEs" className={styles.miniAssetIcon} />
              <strong className={styles.receiveGold}>+{option.receiveVEs.toLocaleString()} VEs</strong>
            </div>
          </div>
        </div>

        {insufficient && (
          <div className={styles.lockedBox}>
            <div className={styles.progressRow}>
              <span className={styles.progressLabel}>
                Need {missingGems} more Gems
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
          </div>
        )}

        <button
          className={`${styles.convertButton} ${insufficient ? styles.earnButton : ""}`}
          onClick={handleClick}
          aria-label={insufficient ? `Earn ${missingGems} more Gems` : `Convert ${option.requiredGems} Gems to ${option.receiveVEs} VEs`}
        >
          {insufficient ? (
            <>
              <Sparkles size={14} /> Earn +{Math.max(50, missingGems + 10)} Gems (Watch Ad)
            </>
          ) : (
            <>
              Instant Convert <FaChevronRight size={12} />
            </>
          )}
        </button>
      </div>
    </motion.article>
  );
}
