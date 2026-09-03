import React from "react";
import { motion } from "framer-motion";
import { Vault } from "lucide-react";
import styles from "../../pages/ExchangeCenter/ExchangeCenter.module.css";

export default function ExchangeLoader({ message = "Preparing your reward conversions..." }) {
  return (
    <div className={styles.stateCard}>
      <motion.div
        className={styles.loaderVault}
        animate={{ rotate: [0, -8, 8, 0], scale: [1, 1.05, 1] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <Vault size={32} />
      </motion.div>
      <h3>{message}</h3>
      <p>Please wait a moment while we process your request.</p>
    </div>
  );
}
