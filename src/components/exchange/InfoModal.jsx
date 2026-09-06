import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Info, ShieldCheck, X } from "lucide-react";
import gemImg from "../../assets/images/gem_crystal.png";
import coinImg from "../../assets/images/ves_coin.png";
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
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 15, scale: 0.95 }}
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
          <X size={18} />
        </button>

        <div className={styles.modalHeaderStage}>
          <div className={styles.modalIcon}>
            <Info size={24} />
          </div>
          <div>
            <p className={styles.eyebrow}>HELP & GUIDE</p>
            <h2 id="info-modal-title">How Rewards Work</h2>
          </div>
        </div>

        <div className={styles.infoRows}>
          <div className={styles.infoRowItem}>
            <div className={styles.infoAvatarWrapPurple}>
              <img src={gemImg} alt="Gems" className={styles.infoAvatarImg} />
            </div>
            <div className={styles.infoRowText}>
              <b>{infoExplanations.gems.title}</b>
              <p>{infoExplanations.gems.description}</p>
            </div>
          </div>

          <div className={styles.infoRowItem}>
            <div className={styles.infoAvatarWrapGold}>
              <img src={coinImg} alt="VEs" className={styles.infoAvatarImg} />
            </div>
            <div className={styles.infoRowText}>
              <b>{infoExplanations.ves.title}</b>
              <p>{infoExplanations.ves.description}</p>
            </div>
          </div>

          <div className={styles.infoRowItem}>
            <div className={styles.infoAvatarWrapShield}>
              <ShieldCheck size={22} />
            </div>
            <div className={styles.infoRowText}>
              <b>{infoExplanations.rates.title}</b>
              <p>{infoExplanations.rates.description}</p>
            </div>
          </div>
        </div>

        <button className={styles.confirmButton} onClick={onClose} style={{ marginTop: 20 }}>
          Got It
        </button>
      </motion.div>
    </div>
  );
}
