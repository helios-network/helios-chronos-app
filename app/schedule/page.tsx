"use client";

import { CronScheduler } from "@/components/cron-scheduler";
import { Heading } from "@/components/heading";
import { useAccount } from "wagmi";
import { Card } from "@/components/card";
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

  return (
    <div className={s.container}>
      <header className={s.pageHeader}>
        <div className={s.headerContent}>
          <div className={s.titleSection}>
            <Heading level={1} size="large" className={s.title}>
              Schedule Automation Tasks
            </Heading>
            <div className={s.heliosBadge}>
              <HeliosIcon />
              <span>Powered by Helios</span>
            </div>
          </div>
          <p className={s.subtitle}>
            Create smart automated tasks that run 24/7 on the Helios blockchain.
            No servers, no maintenance - just set it and forget it! ✨
          </p>

          <div className={s.features}>
            <div className={s.feature}>
              <div className={s.featureIcon}>
                <svg
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  fill="currentColor"
                >
                  <path d="M13 3L4 14h7v7l9-11h-7V3z" />
                </svg>
              </div>
              <span>Instant Setup</span>
            </div>
            <div className={s.feature}>
              <div className={s.featureIcon}>
                <svg
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  fill="currentColor"
                >
                  <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" />
                </svg>
              </div>
              <span>Secure & Reliable</span>
            </div>
            <div className={s.feature}>
              <div className={s.featureIcon}>
                <svg
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  fill="currentColor"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              </div>
              <span>Cost Effective</span>
            </div>
            <div className={s.feature}>
              <div className={s.featureIcon}>
                <svg
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  fill="currentColor"
                >
                  <path d="M12 6v6l4 2-4-2V6zm0-4C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
                </svg>
              </div>
              <span>24/7 Automation</span>
            </div>
          </div>
        </div>
      </header>

      <div className={s.content}>
        {isConnected ? (
          <CronScheduler />
        ) : (
          <Card className={s.connectPrompt}>
            <div className={s.connectContent}>
              <div className={s.walletIcon}>
                <svg viewBox="0 0 24 24" width="48" height="48">
                  <path
                    d="M21 18v1c0 1.1-.9 2-2 2H5c-1.11 0-2-.9-2-2V5c0-1.1.89-2 2-2h14c1.1 0 2 .9 2 2v1h-9c-1.11 0-2 .9-2 2v8c0 1.1.89 2 2 2h9zm-9-2h10V8H12v8zm4-2.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <h2 className={s.connectTitle}>Connect Your Wallet</h2>
              <p className={s.connectMessage}>
                Connect your wallet to start creating automated tasks. Your
                tasks will be linked to your wallet address for security and
                will execute automatically on the Helios blockchain.
              </p>
              <div className={s.connectInstructions}>
                <div className={s.instructionStep}>
                  <div className={s.stepNumber}>1</div>
                  <span>
                    Click the &quot;Connect Wallet&quot; button in the top
                    navigation
                  </span>
                </div>
                <div className={s.instructionStep}>
                  <div className={s.stepNumber}>2</div>
                  <span>Select your preferred wallet provider</span>
                </div>
                <div className={s.instructionStep}>
                  <div className={s.stepNumber}>3</div>
                  <span>Authorize the connection to start scheduling</span>
                </div>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
