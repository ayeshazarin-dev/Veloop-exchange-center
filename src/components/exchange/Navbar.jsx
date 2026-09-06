import React from "react";
import { motion } from "framer-motion";
import { FaGem } from "react-icons/fa6";
import gemImg from "../../assets/images/gem_crystal.jpg";
import coinImg from "../../assets/images/ves_coin.jpg";
import styles from "../../pages/ExchangeCenter/ExchangeCenter.module.css";

export default function Navbar({ balance }) {
  return (
    <header className={styles.navbar}>
      <div className={styles.navLeft}>
        <motion.div
          className={styles.brandLogo}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          <div className={styles.brandIcon}>
            <img src={gemImg} alt="VELOOP" className={styles.brandAvatarImg} />
          </div>
          <div className={styles.brandText}>
            <span className={styles.brandName}>VELOOP</span>
            <span className={styles.brandTag}>REWARDS VAULT</span>
          </div>
        </motion.div>

        <div className={styles.liveRateBadge}>
          <span className={styles.liveBeacon} />
          <span className={styles.rateText}>
            <strong>1 Gem</strong> ≈ 5.42 VEs
          </span>
          <span className={styles.rateGain}>+3.8%</span>
        </div>
      </div>

      <div className={styles.navRight}>
        <div className={styles.vipPill}>
          <FaGem className={styles.vipIcon} />
          <span>VIP Diamond</span>
        </div>

        <div className={styles.navWallet}>
          <div className={styles.walletItem} title="Available Gems">
            <img src={gemImg} alt="Gems" className={styles.walletAssetImg} />
            <span className={styles.walletGemText}>{balance.gems.toLocaleString()}</span>
          </div>
          <div className={styles.walletDivider} />
          <div className={styles.walletItem} title="Available VEs">
            <img src={coinImg} alt="VEs" className={styles.walletAssetImg} />
            <span className={styles.walletVeText}>{balance.ves.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </header>
  );
}
