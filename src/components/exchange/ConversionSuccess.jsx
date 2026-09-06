import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import coinImg from "../../assets/images/ves_coin.png";
import styles from "../../pages/ExchangeCenter/ExchangeCenter.module.css";

export default function ConversionSuccess({ option, onContinue }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" || e.key === "Enter") onContinue();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onContinue]);

  return (
    <div className={styles.modalBackdrop} role="presentation">
      <motion.div
        className={`${styles.modal} ${styles.successModal}`}
        initial={{ opacity: 0, scale: 0.88, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 15 }}
        transition={{ type: "spring", stiffness: 300, damping: 22 }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="success-modal-title"
      >
        <div className={styles.successCoinShowcase}>
          <div className={styles.successCoinGlow} />
          <motion.img
            src={coinImg}
            alt="VEs Coins"
            className={styles.successCoinImg}
            initial={{ scale: 0.5, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 320, damping: 18, delay: 0.1 }}
          />
          <motion.div
            className={styles.successBadgeCheck}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 400, damping: 15, delay: 0.25 }}
          >
            <Check size={18} strokeWidth={3} />
          </motion.div>
        </div>

        <p className={styles.eyebrow}>REWARD CLAIMED</p>
        <h2 id="success-modal-title">Exchange Successful!</h2>
        <p className={styles.successText}>
          You converted <strong>{option.gems} Gems</strong> into{" "}
          <strong className={styles.successGoldNumber}>+{option.ves.toLocaleString()} VEs</strong>.
        </p>

        <div className={styles.rewardBurst} aria-hidden="true">
          <motion.span animate={{ scale: [1, 1.4, 1], opacity: [0.5, 1, 0.5] }} transition={{ duration: 1.5, repeat: Infinity }}>✨</motion.span>
          <motion.span animate={{ scale: [1, 1.4, 1], opacity: [0.5, 1, 0.5] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}>💎</motion.span>
          <motion.span animate={{ scale: [1, 1.4, 1], opacity: [0.5, 1, 0.5] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.6 }}>🪙</motion.span>
          <motion.span animate={{ scale: [1, 1.4, 1], opacity: [0.5, 1, 0.5] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.9 }}>⚡</motion.span>
        </div>

        <button className={styles.confirmButton} onClick={onContinue}>
          Back to Exchange Center
        </button>
      </motion.div>
    </div>
  );
}
