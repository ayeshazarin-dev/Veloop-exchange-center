import React from "react";
import { ShieldCheck } from "lucide-react";
import styles from "../../pages/ExchangeCenter/ExchangeCenter.module.css";
import { exchangeRules } from "../../data/exchangeData";

export default function ExchangeRules() {
  return (
    <section className={styles.rulesSection}>
      <div className={styles.rulesIcon}>
        <ShieldCheck size={26} />
      </div>
      <div className={styles.rulesContent}>
        <p className={styles.eyebrow}>EXCHANGE POLICY</p>
        <h2>Exchange Rules & Security</h2>
        <ul className={styles.rulesList}>
          {exchangeRules.map((rule, idx) => (
            <li key={idx} className={styles.ruleItem}>
              <span className={styles.ruleBullet}>•</span>
              <span>{rule}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
