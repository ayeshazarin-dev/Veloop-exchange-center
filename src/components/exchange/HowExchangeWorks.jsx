import React from "react";
import { motion } from "framer-motion";
import styles from "../../pages/ExchangeCenter/ExchangeCenter.module.css";

const steps = [
  {
    number: "01",
    title: "Earn Gems",
    text: "Collect reward Gems via milestones, streaks & ads.",
    color: "purple",
  },
  {
    number: "02",
    title: "Choose Tier",
    text: "Select a conversion package matching your balance.",
    color: "cyan",
  },
  {
    number: "03",
    title: "Review Rate",
    text: "Check exact Gems spent and VEs reward return.",
    color: "blue",
  },
  {
    number: "04",
    title: "Confirm Swap",
    text: "Approve in one tap with zero transaction fees.",
    color: "green",
  },
  {
    number: "05",
    title: "Receive VEs",
    text: "Instant wallet balance credit ready for redemption.",
    color: "gold",
    isFinal: true,
  },
];

export default function HowExchangeWorks() {
  return (
    <section className={styles.howSection}>
      <div className={styles.sectionHeading}>
        <div>
          <p className={styles.eyebrow}>SIMPLE & TRANSPARENT</p>
          <h2>How Exchange Works</h2>
          <p className={styles.sectionSubtext}>
            Convert your earned Gems into VEs in 5 easy steps.
          </p>
        </div>
      </div>

      <div className={styles.howCardsRow}>
        {steps.map((step) => {
          const isFinal = step.isFinal;

          return (
            <motion.div
              key={step.number}
              className={`${styles.howCard} ${styles[`howCard_${step.color}`]} ${isFinal ? styles.howCard_final : ""}`}
              whileHover={{ y: -4, scale: 1.02 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <div className={styles.howCardAura} />

              <div className={styles.howCardHeader}>
                <div className={`${styles.howStepPill} ${styles[`howStepPill_${step.color}`]}`}>
                  <span className={styles.howStepDot} />
                  <span>STEP {step.number}</span>
                </div>
              </div>

              <div className={styles.howCardBody}>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
