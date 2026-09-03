import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
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
        transition={{ type: "spring", stiffness: 280, damping: 22 }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="success-modal-title"
      >
        <motion.div
          className={styles.successIcon}
          initial={{ scale: 0, rotate: -45 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 350, damping: 18, delay: 0.15 }}
        >
          <Check size={36} strokeWidth={2.5} />
        </motion.div>

        <p className={styles.eyebrow}>REWARD RECEIVED</p>
        <h2 id="success-modal-title">Conversion Complete</h2>
        <p className={styles.successText}>
          <strong>{option.gems} Gems</strong> converted successfully.
          <br />
          <strong>+{option.ves} VEs</strong> added to your balance.
        </p>

        <div className={styles.rewardBurst} aria-hidden="true">
          <motion.span animate={{ scale: [1, 1.4, 1], opacity: [0.5, 1, 0.5] }} transition={{ duration: 1.5, repeat: Infinity }}>✦</motion.span>
          <motion.span animate={{ scale: [1, 1.4, 1], opacity: [0.5, 1, 0.5] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}>◆</motion.span>
          <motion.span animate={{ scale: [1, 1.4, 1], opacity: [0.5, 1, 0.5] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.6 }}>✦</motion.span>
          <motion.span animate={{ scale: [1, 1.4, 1], opacity: [0.5, 1, 0.5] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.9 }}>◆</motion.span>
          <motion.span animate={{ scale: [1, 1.4, 1], opacity: [0.5, 1, 0.5] }} transition={{ duration: 1.5, repeat: Infinity, delay: 1.2 }}>✦</motion.span>
        </div>

        <button className={styles.confirmButton} onClick={onContinue}>
          Continue
        </button>
      </motion.div>
    </div>
  );
}
