import React from "react";
import { motion } from "framer-motion";
import { 
  FaFire, 
  FaSliders, 
  FaReceipt, 
  FaShieldHalved, 
  FaCoins 
} from "react-icons/fa6";
import styles from "../../pages/ExchangeCenter/ExchangeCenter.module.css";

const steps = [
  {
    number: "01",
    tag: "EARN",
    title: "Earn Gems",
    text: "Collect reward Gems through eligible activities, streak milestones, and rewards.",
    icon: FaFire,
    color: "purple",
    progress: "20%",
  },
  {
    number: "02",
    tag: "CHOOSE",
    title: "Choose Conversion",
    text: "Select an eligible reward tier tailored to your available balance.",
    icon: FaSliders,
    color: "cyan",
    progress: "40%",
  },
  {
    number: "03",
    tag: "REVIEW",
    title: "Review Exchange",
    text: "Check the exact predefined Gems required and VEs you will receive.",
    icon: FaReceipt,
    color: "blue",
    progress: "60%",
  },
  {
    number: "04",
    tag: "CONFIRM",
    title: "Confirm",
    text: "Approve the reward conversion in the secure confirmation dialog.",
    icon: FaShieldHalved,
    color: "green",
    progress: "80%",
  },
  {
    number: "05",
    tag: "REWARD",
    title: "Receive VEs",
    text: "Your VEs balance is updated immediately upon successful completion.",
    icon: FaCoins,
    color: "gold",
    progress: "100%",
    isFinal: true,
  },
];

export default function HowExchangeWorks() {
  return (
    <section className={styles.howSection}>
      <div className={styles.sectionHeading}>
        <div>
          <p className={styles.eyebrow}>SIMPLE BY DESIGN</p>
          <h2>How exchange works</h2>
          <p className={styles.sectionSubtext}>
            Follow the 5-step conversion pathway to turn your earned Gems into VEs.
          </p>
        </div>
      </div>

      <div className={styles.howCardsRow}>
        {steps.map((step, index) => {
          const IconComponent = step.icon;
          const isFinal = step.isFinal;

          return (
            <motion.div
              key={step.number}
              className={`${styles.howCard} ${styles[`howCard_${step.color}`]} ${isFinal ? styles.howCard_final : ""}`}
              whileHover={{ y: -6, scale: 1.015 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              {/* Ambient Top Glow Layer */}
              <div className={styles.howCardAura} />

              {/* Top Badge Row */}
              <div className={styles.howCardHeader}>
                <div className={`${styles.howStepPill} ${styles[`howStepPill_${step.color}`]}`}>
                  <span className={styles.howStepDot} />
                  <span>STEP {step.number}</span>
                </div>
              </div>

              {/* Center 3D Glowing Icon Orb */}
              <div className={styles.howIconStage}>
                <motion.div
                  className={`${styles.howIconOrb} ${styles[`howIconOrb_${step.color}`]}`}
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: index * 0.2 }}
                >
                  <IconComponent size={22} />
                </motion.div>
              </div>

              {/* Content Section */}
              <div className={styles.howCardBody}>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>

              {/* Bottom Progress Bar */}
              <div className={styles.howCardFooter}>
                <div className={styles.howProgressBarTrack}>
                  <div 
                    className={`${styles.howProgressBarFill} ${styles[`howProgressBarFill_${step.color}`]}`}
                    style={{ width: step.progress }}
                  />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}


