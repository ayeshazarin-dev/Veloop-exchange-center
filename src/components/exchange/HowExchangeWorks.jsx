import React from "react";
import { motion } from "framer-motion";
import { Gem, Sliders, ArrowLeftRight, Check, Coins } from "lucide-react";
import styles from "../../pages/ExchangeCenter/ExchangeCenter.module.css";

const steps = [
  {
    number: "01",
    title: "Earn Gems",
    text: "Collect reward Gems via milestones, streaks & ads.",
    icon: Gem,
  },
  {
    number: "02",
    title: "Choose Tier",
    text: "Select a conversion package matching your balance.",
    icon: Sliders,
  },
  {
    number: "03",
    title: "Review Rate",
    text: "Check exact Gems spent and VEs reward return.",
    icon: ArrowLeftRight,
  },
  {
    number: "04",
    title: "Confirm Swap",
    text: "Approve in one tap with zero transaction fees.",
    icon: Check,
  },
  {
    number: "05",
    title: "Receive VEs",
    text: "Instant wallet balance credit ready for redemption.",
    icon: Coins,
    isFinal: true,
  },
];

export default function HowExchangeWorks() {
  return (
    <section className={styles.howSection}>
      <div className={styles.sectionHeading}>
        <div>
          <h2>How Exchange Works</h2>
          <p className={styles.sectionSubtext}>
            Convert your earned Gems into VEs in 5 easy steps.
          </p>
        </div>
      </div>

      <div className={styles.howCardsRow}>
        {steps.map((step) => {
          const Icon = step.icon;
          const isFinal = step.isFinal;

          return (
            <motion.div
              key={step.number}
              className={`${styles.howCard} ${styles.howCard_green} ${isFinal ? styles.howCard_final : ""}`}
              whileHover={{ y: -4, scale: 1.02 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <div className={styles.howCardAura} />

              <div className={styles.howCardHeader}>
                <div className={styles.howStepIconGreen}>
                  <Icon size={14} strokeWidth={2.5} />
                </div>
                <div className={`${styles.howStepPill} ${styles.howStepPill_green}`}>
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
