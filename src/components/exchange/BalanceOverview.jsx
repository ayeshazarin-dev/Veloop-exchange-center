import React from "react";
import { FaCoins, FaFire, FaClockRotateLeft, FaCircleInfo } from "react-icons/fa6";
import styles from "../../pages/ExchangeCenter/ExchangeCenter.module.css";

export default function BalanceOverview({ balance, totalConversions, onOpenInfo }) {
  return (
    <section className={styles.balanceSection}>
      <div className={styles.sectionHeading}>
        <div>
          <p className={styles.eyebrow}>YOUR REWARDS</p>
          <h2>Balance overview</h2>
        </div>
        <button
          className={styles.infoOutline}
          onClick={onOpenInfo}
          aria-label="How rewards work"
        >
          <FaCircleInfo size={14} /> How it works
        </button>
      </div>

      <div className={styles.balanceGrid}>
        <div className={styles.balanceCard}>
          <div className={styles.balanceIcon}>
            <FaFire size={24} />
          </div>
          <div className="flex-grow-1">
            <div className={styles.balanceLabel}>
              Available Gems
              <button
                className={styles.infoButton}
                onClick={onOpenInfo}
                title="Gems are reward credits earned through eligible activities."
                aria-label="Information about Gems"
              >
                <FaCircleInfo size={12} />
              </button>
            </div>
            <div className={styles.balanceValue}>
              {balance.gems.toLocaleString()} <span>Gems</span>
            </div>
          </div>
        </div>

        <div className={styles.balanceCard}>
          <div className={styles.balanceIcon}>
            <FaCoins size={24} />
          </div>
          <div className="flex-grow-1">
            <div className={styles.balanceLabel}>
              Available VEs
              <button
                className={styles.infoButton}
                onClick={onOpenInfo}
                title="VEs are VELOOP Rewards' virtual reward currency."
                aria-label="Information about VEs"
              >
                <FaCircleInfo size={12} />
              </button>
            </div>
            <div className={styles.balanceValue}>
              {balance.ves.toLocaleString()} <span>VEs</span>
            </div>
          </div>
        </div>

        <div className={styles.balanceMini}>
          <div className={styles.miniIcon}>
            <FaClockRotateLeft size={20} />
          </div>
          <div>
            <span>Conversions</span>
            <strong>{totalConversions}</strong>
          </div>
          <small>successful rewards</small>
        </div>
      </div>
    </section>
  );
}
