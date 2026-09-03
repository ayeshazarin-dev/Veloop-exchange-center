import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaArrowRight, FaCoins, FaFire, FaSpinner, FaVault, FaXmark } from "react-icons/fa6";
import styles from "../../pages/ExchangeCenter/ExchangeCenter.module.css";

export default function ExchangeModal({ option, balance, onClose, onConfirm }) {
  const [isConverting, setIsConverting] = useState(false);
  const afterGems = Math.max(0, balance.gems - option.requiredGems);
  const afterVEs = balance.ves + option.receiveVEs;

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && !isConverting) onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose, isConverting]);

  const handleConfirmClick = () => {
    if (isConverting) return;
    setIsConverting(true);
    setTimeout(() => {
      onConfirm(option);
    }, 850);
  };

  return (
    <div
      className={styles.modalBackdrop}
      onMouseDown={!isConverting ? onClose : undefined}
      role="presentation"
    >
      <motion.div
        className={styles.modal}
        initial={{ opacity: 0, y: 22, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 18, scale: 0.96 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        onMouseDown={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirm-modal-title"
      >
        <button
          className={styles.closeButton}
          onClick={onClose}
          disabled={isConverting}
          aria-label="Close modal"
        >
          <FaXmark size={17} />
        </button>

        <div className={styles.modalIcon}>
          <FaVault size={24} />
        </div>

        <p className={styles.eyebrow}>REWARD CONVERSION</p>
        <h2 id="confirm-modal-title">Confirm Conversion</h2>
        <p className={styles.modalSubtext}>
          Review your reward conversion details before confirming.
        </p>

        <div className={styles.confirmFlow}>
          <div>
            <FaFire size={22} />
            <strong>{option.requiredGems} Gems</strong>
          </div>
          <FaArrowRight size={20} />
          <div>
            <FaCoins size={22} />
            <strong>{option.receiveVEs} VEs</strong>
          </div>
        </div>

        <div className={styles.afterBox}>
          <div>
            <span>Gems after conversion</span>
            <strong>{afterGems.toLocaleString()}</strong>
          </div>
          <div>
            <span>VEs after conversion</span>
            <strong>{afterVEs.toLocaleString()}</strong>
          </div>
        </div>

        <div className={styles.modalActions}>
          <button
            className={styles.cancelButton}
            onClick={onClose}
            disabled={isConverting}
          >
            Cancel
          </button>
          <button
            className={styles.confirmButton}
            onClick={handleConfirmClick}
            disabled={isConverting}
          >
            {isConverting ? (
              <>
                <FaSpinner className={styles.spinner} size={16} /> Converting...
              </>
            ) : (
              "Confirm Conversion"
            )}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
