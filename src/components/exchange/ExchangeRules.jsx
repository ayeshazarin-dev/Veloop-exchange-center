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
      <div>
        <p className={styles.eyebrow}>GOOD TO KNOW</p>
        <h2>Exchange rules</h2>
        <ul>
          {exchangeRules.map((rule, idx) => (
            <li key={idx}>{rule}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
