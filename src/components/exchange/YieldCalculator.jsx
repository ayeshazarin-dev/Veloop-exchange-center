import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { FaArrowRight, FaBolt, FaCoins, FaFire, FaSliders } from "react-icons/fa6";
import { Sparkles } from "lucide-react";
import styles from "../../pages/ExchangeCenter/ExchangeCenter.module.css";

export default function YieldCalculator({ balance, onSelectAmount }) {
  const [gemInput, setGemInput] = useState(100);

  // Dynamic multiplier logic for simulation
  const { estimatedVEs, bonusPercent, tierLabel } = useMemo(() => {
    let rate = 5.4;
    let bonus = 0;
    let tier = "Standard Rate";

    if (gemInput >= 400) {
      rate = 6.8;
      bonus = 25;
      tier = "🌟 VIP Vault Bonus";
    } else if (gemInput >= 200) {
      rate = 6.2;
      bonus = 15;
      tier = "🔥 High Yield Bonus";
    } else if (gemInput >= 50) {
      rate = 5.8;
      bonus = 8;
      tier = "⚡ Boosted Rate";
    }

    const calculated = Math.round(gemInput * rate);
    return { estimatedVEs: calculated, bonusPercent: bonus, tierLabel: tier };
  }, [gemInput]);

  const setPreset = (percentage) => {
    const maxGems = balance.gems > 0 ? balance.gems : 500;
    const value = Math.max(10, Math.round((maxGems * percentage) / 100));
    setGemInput(value);
  };

  return (
    <div className={styles.calculatorCard}>
      <div className={styles.calcHeader}>
        <div className={styles.calcTitleBox}>
          <div className={styles.calcIconBadge}>
            <FaSliders />
          </div>
          <div>
            <h3>Live Yield Simulator</h3>
            <p>Slide or simulate any amount to preview real-time VE yield & VIP bonus rates</p>
          </div>
        </div>

        <div className={styles.calcRatePill}>
          <FaSparkles className={styles.sparkleIcon} />
          <span>{tierLabel}</span>
          {bonusPercent > 0 && <span className={styles.calcBonusBadge}>+{bonusPercent}%</span>}
        </div>
      </div>

      <div className={styles.calcBody}>
        {/* Slider & Controls */}
        <div className={styles.calcControls}>
          <div className={styles.calcSliderHeader}>
            <span>Exchange Amount</span>
            <strong className={styles.calcValueDisplay}>
              <FaFire className={styles.calcGemColor} /> {gemInput} Gems
            </strong>
          </div>

          <input
            type="range"
            min="10"
            max={Math.max(500, balance.gems)}
            step="5"
            value={gemInput}
            onChange={(e) => setGemInput(Number(e.target.value))}
            className={styles.calcSlider}
          />

          {/* Quick Preset Buttons */}
          <div className={styles.calcPresets}>
            <button type="button" onClick={() => setPreset(25)}>25%</button>
            <button type="button" onClick={() => setPreset(50)}>50%</button>
            <button type="button" onClick={() => setPreset(75)}>75%</button>
            <button type="button" onClick={() => setPreset(100)}>MAX</button>
          </div>
        </div>

        {/* Live Return Card */}
        <div className={styles.calcResultBox}>
          <div className={styles.calcResultLabel}>ESTIMATED RETURN</div>
          <div className={styles.calcResultValue}>
            <FaCoins className={styles.calcVeColor} />
            <strong>{estimatedVEs.toLocaleString()}</strong>
            <span>VEs</span>
          </div>
          <div className={styles.calcResultNote}>
            Instant balance credit • Zero network fee
          </div>
        </div>
      </div>
    </div>
  );
}
