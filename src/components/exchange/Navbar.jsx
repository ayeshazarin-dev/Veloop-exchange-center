import React from "react";
import { motion } from "framer-motion";
import { FaBolt, FaCoins, FaFire, FaGem, FaShieldHalved, FaWallet } from "react-icons/fa6";
import styles from "../../pages/ExchangeCenter/ExchangeCenter.module.css";

export default function Navbar({ balance }) {
  return (
    <header className={styles.navbar}>
      <div className={styles.navLeft}>
        <motion.div
          className={styles.brandLogo}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className={styles.brandIcon}>
            <FaFire className={styles.brandFire} />
          </div>
          <div className={styles.brandText}>
            <span className={styles.brandName}>VELOOP</span>
            <span className={styles.brandTag}>REWARDS VAULT</span>
          </div>
        </motion.div>

        {/* Live Market Ticker */}
        <div className={styles.liveRateBadge}>
          <span className={styles.liveBeacon} />
          <span className={styles.rateText}>
            <strong>1 GEM</strong> = 5.42 VEs
          </span>
          <span className={styles.rateGain}>+3.8%</span>
        </div>
      </div>

      <div className={styles.navRight}>
        {/* VIP Tier Badge */}
        <div className={styles.vipPill}>
          <FaGem className={styles.vipIcon} />
          <span>Diamond Tier</span>
        </div>

        {/* User Mini Balance Pill */}
        <div className={styles.navWallet}>
          <div className={styles.walletItem}>
            <FaFire className={styles.walletGemIcon} />
            <span>{balance.gems}</span>
          </div>
          <div className={styles.walletDivider} />
          <div className={styles.walletItem}>
            <FaCoins className={styles.walletVeIcon} />
            <span>{balance.ves.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </header>
  );
}
