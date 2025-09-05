"use client";

import { CronScheduler } from "@/components/cron-scheduler";
import { useAccount } from "wagmi";
import { useAppKit } from "@reown/appkit/react";
import Image from "next/image";
import s from "./page.module.scss";

const HeliosIcon = () => (
  <Image
    src="/favicon.png"
    alt="Helios"
    className={s.heliosIcon}
    width={20}
    height={20}
  />
);

export default function SchedulePage() {
  const { isConnected } = useAccount();
  const { open: openConnectModal } = useAppKit();

  return (
    <div className={s.container}>
      {/* Hero Section */}
      <section className={s.heroSection}>
        <div className={s.heroBackground}>
          <Image
            src="/img/abst51.png"
            alt="Abstract background"
            fill
            className={s.abstractImage}
            priority
          />
        </div>
        <div className={s.heroContent}>
          <div className={s.badge}>
            <HeliosIcon />
            <span>Powered by Helios</span>
          </div>
          <div className={s.heroText}>
            <h1 className={s.heroTitle}>Schedule Automation Tasks</h1>
            <p className={s.heroSubtitle}>
              Create smart automated tasks that run 24/7 on the Helios
              blockchain.
              <br />
              No servers, no maintenance - just set it and forget it!
            </p>
          </div>
          <div className={s.featuresPanel}>
            <div className={s.features}>
              <div className={s.feature}>
                <div className={s.featureIcon}>
                  <Image
                    src="/img/icon1.png"
                    alt="Instant Setup"
                    width={60}
                    height={60}
                  />
                </div>
                <span>Instant Setup</span>
              </div>
              <div className={s.feature}>
                <div className={s.featureIcon}>
                  <Image
                    src="/img/icon3.png"
                    alt="Secure & Reliable"
                    width={60}
                    height={60}
                  />
                </div>
                <span>Secure & Reliable</span>
              </div>
              <div className={s.feature}>
                <div className={s.featureIcon}>
                  <Image
                    src="/img/icon2.png"
                    alt="Cost Effective"
                    width={60}
                    height={60}
                  />
                </div>
                <span>Cost Effective</span>
              </div>
              <div className={s.feature}>
                <div className={s.featureIcon}>
                  <Image
                    src="/img/icon4.png"
                    alt="24/7 Automation"
                    width={60}
                    height={60}
                  />
                </div>
                <span>24/7 Automation</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className={isConnected ? s.mainSectionConnected : s.mainSection}>
        <div className={s.mainContent}>
          {isConnected ? (
            <CronScheduler />
          ) : (
            <div className={s.walletPrompt}>
              <h2 className={s.walletPromptTitle}>Connect Your Wallet</h2>
              <div className={s.walletIcon}>
                <svg
                  viewBox="0 0 24 24"
                  width="48"
                  height="48"
                  fill="currentColor"
                >
                  <path d="M21 18v1c0 1.1-.9 2-2 2H5c-1.11 0-2-.9-2-2V5c0-1.1.89-2 2-2h14c1.1 0 2 .9 2 2v1h-9c-1.11 0-2 .9-2 2v8c0 1.1.89 2 2 2h9zm-9-2h10V8H12v8zm4-2.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
                </svg>
              </div>
              <div className={s.walletPromptText}>
                <p className={s.walletPromptSubtitle1}>
                  Wallet Connection required
                </p>
                <p className={s.walletPromptSubtitle2}>
                  Connect securely to create and manage your schedule on-chain
                  tasks.
                </p>
              </div>
              <button
                className={s.connectWalletButton}
                onClick={() => openConnectModal()}
              >
                <svg
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  fill="currentColor"
                >
                  <path d="M21 18v1c0 1.1-.9 2-2 2H5c-1.11 0-2-.9-2-2V5c0-1.1.89-2 2-2h14c1.1 0 2 .9 2 2v1h-9c-1.11 0-2 .9-2 2v8c0 1.1.89 2 2 2h9zm-9-2h10V8H12v8zm4-2.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
                </svg>
                Connect Wallet
              </button>
              <p className={s.secureConnection}>Secure connection ~ 30 sec</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
