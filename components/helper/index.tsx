"use client";

import Image from "next/image";
import s from "./helper.module.scss";

export interface HelperProps {
  title?: string;
  subtitle?: string;
}

// Reusable Helper section (formerly "Why Chronos")
export const Helper = ({
  title = "Why Chronos",
  subtitle = "Purpose built infrastructure for bulletproof on-chain scheduling",
}: HelperProps) => {
  return (
    <section className={s.helperSection}>
      <div className={s.helperContent}>
        <h2 className={s.helperTitle}>{title}</h2>
        <p className={s.helperSubtitle}>{subtitle}</p>

        <div className={s.helperGrid}>
          <div className={s.helperCard}>
            <div className={s.helperHeader}>
              <div className={s.helperIcon}>
                <Image
                  src="/img/helper5.png"
                  alt="Audited & Transparent"
                  width={21}
                  height={26}
                />
              </div>
              <h3 className={s.helperCardTitle}>Audited & Transparent</h3>
            </div>
            <p className={s.helperCardDesc}>
              Independent audits and open docs — no black boxes. Verify
              execution on chain.
            </p>
          </div>

          <div className={s.helperCard}>
            <div className={s.helperHeader}>
              <div className={s.helperIcon}>
                <Image
                  src="/img/helper6.png"
                  alt="Timing Precision"
                  width={29}
                  height={29}
                />
              </div>
              <h3 className={s.helperCardTitle}>Timing Precision</h3>
            </div>
            <p className={s.helperCardDesc}>
              Deterministic cadence with safeguards for missed slots and
              retries.
            </p>
          </div>

          <div className={s.helperCard}>
            <div className={s.helperHeader}>
              <div className={s.helperIcon}>
                <Image
                  src="/img/helper4.png"
                  alt="Gas Optimized"
                  width={34}
                  height={34}
                />
              </div>
              <h3 className={s.helperCardTitle}>Gas Optimized</h3>
            </div>
            <p className={s.helperCardDesc}>
              Smart execution pathing minimizes overhead while preserving
              reliability.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
