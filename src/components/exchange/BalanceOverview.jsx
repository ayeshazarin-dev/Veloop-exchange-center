import React from "react";
import { FaClockRotateLeft, FaCircleInfo, FaArrowTrendUp } from "react-icons/fa6";
import gemImg from "../../assets/images/gem_crystal.png";
import coinImg from "../../assets/images/ves_coin.png";
import styles from "../../pages/ExchangeCenter/ExchangeCenter.module.css";

export default function BalanceOverview({ balance, totalConversions, onOpenInfo }) {
  return (
    <section className={styles.balanceSection}>
      <div className={styles.sectionHeading}>
        <div>
          <p className={styles.eyebrow}>YOUR WALLET</p>
          <h2>Balance Overview</h2>
        </div>
        <button
          className={styles.infoOutline}
          onClick={onOpenInfo}
          aria-label="How rewards work"
        >
          <FaCircleInfo size={13} /> Exchange Guide
        </button>
      </div>

      <div className={styles.balanceGrid}>
        {/* Gems Card */}
        <div className={`${styles.balanceCard} ${styles.balanceCardGem}`}>
          <div className={styles.balanceAssetAvatarWrapper}>
            <img src={gemImg} alt="Gems" className={styles.balanceAssetAvatar} />
            <span className={styles.balanceAssetGlowPurple} />
          </div>
          <div className="flex-grow-1">
            <div className={styles.balanceLabel}>
              <span>Available Gems</span>
              <button
                className={styles.infoButton}
                onClick={onOpenInfo}
                title="Gems earned from milestones and ads"
                aria-label="Information about Gems"
              >
                <FaCircleInfo size={11} />
              </button>
            </div>
            <div className={styles.balanceValue}>
              {balance.gems.toLocaleString()} <span className={styles.balanceUnitGem}>Gems</span>
            </div>
          </div>
        </div>

        {/* VEs Card */}
        <div className={`${styles.balanceCard} ${styles.balanceCardVe}`}>
          <div className={styles.balanceAssetAvatarWrapper}>
            <img src={coinImg} alt="VEs" className={styles.balanceAssetAvatar} />
            <span className={styles.balanceAssetGlowGold} />
          </div>
          <div className="flex-grow-1">
            <div className={styles.balanceLabel}>
              <span>Available VEs</span>
              <button
                className={styles.infoButton}
                onClick={onOpenInfo}
                title="VEs virtual reward balance"
                aria-label="Information about VEs"
              >
                <FaCircleInfo size={11} />
              </button>
            </div>
            <div className={styles.balanceValue}>
              {balance.ves.toLocaleString()} <span className={styles.balanceUnitGold}>VEs</span>
            </div>
          </div>
        </div>

        {/* Conversions Mini Card */}
        <div className={styles.balanceMini}>
          <div className={styles.miniIcon}>
            <FaClockRotateLeft size={18} />
          </div>
          <div>
            <span>Conversions</span>
            <strong>{totalConversions}</strong>
          </div>
          <div className={styles.balanceMiniGrowth}>
            <FaArrowTrendUp size={11} /> Active
          </div>
        </div>
      </div>
    </section>
  );
}
