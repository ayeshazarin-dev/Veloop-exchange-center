import React from "react";
import { motion } from "framer-motion";
import { FaArrowRight, FaCheck, FaClock, FaCircleExclamation } from "react-icons/fa6";
import styles from "../../pages/ExchangeCenter/ExchangeCenter.module.css";

export default function ExchangeHistory({ history }) {
  const getStatusIcon = (status) => {
    switch (status) {
      case "Completed":
        return <FaCheck size={14} />;
      case "Processing":
      case "Pending":
        return <FaClock size={14} />;
      case "Failed":
        return <FaCircleExclamation size={14} />;
      default:
        return <FaCheck size={14} />;
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
          <p className={styles.eyebrow}>YOUR ACTIVITY</p>
          <h2>Recent conversions</h2>
        </div>
      </div>

      <div className={styles.historyList}>
        {history.map((item) => (
          <motion.div
            className={styles.historyItem}
            key={item.id}
            whileHover={{ x: 6, backgroundColor: "rgba(255, 255, 255, 0.035)" }}
            transition={{ duration: 0.2 }}
          >
            <div className={`${styles.historyIcon} ${getStatusClass(item.status)}`}>
              {getStatusIcon(item.status)}
            </div>
            <div className="flex-grow-1">
              <strong>
                {item.gems} Gems <FaArrowRight size={12} /> {item.ves} VEs
              </strong>
              <span>{item.date}</span>
            </div>
            <span className={getStatusClass(item.status)}>
              {getStatusIcon(item.status)} {item.status}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
