import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Coins, Gem, Info, ShieldCheck, X } from "lucide-react";
import styles from "../../pages/ExchangeCenter/ExchangeCenter.module.css";
import { infoExplanations } from "../../data/exchangeData";

export default function InfoModal({ onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div
      className={styles.modalBackdrop}
      onMouseDown={onClose}
      role="presentation"
    >
      <motion.div
        className={styles.infoModal}
        initial={{ opacity: 0, y: 20, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 15, scale: 0.96 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        onMouseDown={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="info-modal-title"
      >
        <button
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Close information modal"
        >
          <X size={19} />
        </button>
        <div className={styles.modalIcon}>
          <Info size={26} />
        </div>
        <h2 id="info-modal-title">How rewards work</h2>
        <div className={styles.infoRows}>
          <div>
            <Gem className={styles.infoGemIcon} size={22} />
            <span>
              <b>{infoExplanations.gems.title}</b>
              <small>{infoExplanations.gems.description}</small>
            </span>
          </div>
          <div>
            <Coins className={styles.infoVeIcon} size={22} />
            <span>
              <b>{infoExplanations.ves.title}</b>
              <small>{infoExplanations.ves.description}</small>
            </span>
          </div>
          <div>
            <ShieldCheck className={styles.infoShieldIcon} size={22} />
            <span>
              <b>{infoExplanations.rates.title}</b>
              <small>{infoExplanations.rates.description}</small>
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
