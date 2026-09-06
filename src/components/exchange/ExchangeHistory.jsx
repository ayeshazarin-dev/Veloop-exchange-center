import React from "react";
import { motion } from "framer-motion";
import { FaArrowRight, FaCheck, FaClock, FaCircleExclamation } from "react-icons/fa6";
import gemImg from "../../assets/images/gem_crystal.png";
import coinImg from "../../assets/images/ves_coin.png";
import styles from "../../pages/ExchangeCenter/ExchangeCenter.module.css";

export default function ExchangeHistory({ history }) {
  const getStatusIcon = (status) => {
    switch (status) {
      case "Completed":
        return <FaCheck size={12} />;
      case "Processing":
      case "Pending":
        return <FaClock size={12} />;
      case "Failed":
        return <FaCircleExclamation size={12} />;
      default:
        return <FaCheck size={12} />;
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "Completed":
        return styles.completed;
      case "Processing":
      case "Pending":
        return styles.pending;
      case "Failed":
        return styles.failed;
      default:
        return styles.completed;
    }
  };

  return (
    <section className={styles.historySection}>
      <div className={styles.sectionHeading}>
        <div>
          <p className={styles.eyebrow}>TRANSACTIONS</p>
          <h2>Recent Conversions</h2>
        </div>
      </div>

      <div className={styles.historyList}>
        {history.map((item) => (
          <motion.div
            className={styles.historyItem}
            key={item.id}
            whileHover={{ x: 4, backgroundColor: "rgba(255, 255, 255, 0.04)" }}
            transition={{ duration: 0.2 }}
          >
            <div className={styles.historyDetails}>
              <div className={styles.historyAmountRow}>
                <span className={styles.historyGemBadge}>
                  <img src={gemImg} alt="Gems" className={styles.historyAssetThumb} />
                  {item.gems} Gems
                </span>
                <FaArrowRight size={11} className={styles.historyArrow} />
                <span className={styles.historyVeBadge}>
                  <img src={coinImg} alt="VEs" className={styles.historyAssetThumb} />
                  +{item.ves} VEs
                </span>
              </div>
              <span className={styles.historyDate}>{item.date}</span>
            </div>

            <span className={`${styles.historyStatusBadge} ${getStatusClass(item.status)}`}>
              {getStatusIcon(item.status)} {item.status}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
