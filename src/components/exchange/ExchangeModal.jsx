import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaSpinner, FaVault, FaXmark } from "react-icons/fa6";
import ExchangeOrbitVisual from "./ExchangeOrbitVisual";
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
    }, 750);
  };

  return (
    <div
      className={styles.modalBackdrop}
      onMouseDown={!isConverting ? onClose : undefined}
      role="presentation"
    >
      <motion.div
        className={styles.modal}
        initial={{ opacity: 0, y: 22, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 18, scale: 0.95 }}
        transition={{ type: "spring", damping: 25, stiffness: 320 }}
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
          <FaXmark size={16} />
        </button>

        <div className={styles.modalHeaderStage}>
          <div className={styles.modalIcon}>
            <FaVault size={22} />
          </div>
          <div>
            <p className={styles.eyebrow}>REWARD CONVERSION</p>
            <h2 id="confirm-modal-title">Confirm Exchange</h2>
          </div>
        </div>

        <p className={styles.modalSubtext}>
          Review your conversion details below before completing this transaction.
        </p>

        {/* Orbit Visual Showcase matching screenshot */}
        <div style={{ margin: "10px 0 16px" }}>
          <ExchangeOrbitVisual size="modal" />
        </div>

        <div className={styles.afterBox}>
          <div>
            <span>Balance after exchange</span>
            <strong>{afterGems.toLocaleString()} Gems</strong>
          </div>
          <div>
            <span>New VEs Balance</span>
            <strong className={styles.confirmGoldText}>{afterVEs.toLocaleString()} VEs</strong>
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
                <FaSpinner className={styles.spinner} size={15} /> Converting...
              </>
            ) : (
              "Confirm & Convert"
            )}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
